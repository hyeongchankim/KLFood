import { useState, useEffect, useMemo } from 'react';
import { Minus, Plus, Send, Lock, RefreshCw } from 'lucide-react';

const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

// ponytail: client-side passcode only, not real auth — replace with real admin login if this ships beyond internal use
const ADMIN_PASSCODE = 'klfood2026';

const AdminPage = () => {
    const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('klfood-admin') === 'true');
    const [passcodeInput, setPasscodeInput] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(getCurrentMonth());

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const result = await response.json();
            setOrders(result.orders || []);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (unlocked) fetchOrders();
    }, [unlocked]);

    const handleUnlock = (e) => {
        e.preventDefault();
        if (passcodeInput === ADMIN_PASSCODE) {
            sessionStorage.setItem('klfood-admin', 'true');
            setUnlocked(true);
            setPasscodeError('');
        } else {
            setPasscodeError('비밀번호가 올바르지 않습니다.');
        }
    };

    const updateCount = async (id, delta) => {
        // optimistic update
        setOrders((prev) => prev.map((o) => o.id === id
            ? { ...o, counts: { ...o.counts, [month]: Math.max(0, (o.counts[month] || 0) + delta) } }
            : o));

        try {
            await fetch(`http://localhost:5000/api/orders/${id}/count`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, delta }),
            });
        } catch (err) {
            console.error('Failed to update count', err);
            fetchOrders();
        }
    };

    const sendInvoice = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}/invoice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month }),
            });
            const result = await response.json();
            if (response.ok) {
                setOrders((prev) => prev.map((o) => o.id === id
                    ? { ...o, invoices: { ...o.invoices, [month]: result.invoice } }
                    : o));
            }
        } catch (err) {
            console.error('Failed to send invoice', err);
        }
    };

    const totalRevenue = useMemo(
        () => orders.reduce((sum, o) => sum + (o.counts[month] || 0) * (o.unitPrice || 0), 0),
        [orders, month]
    );

    if (!unlocked) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background-warm)] px-4">
                <form onSubmit={handleUnlock} className="max-w-sm w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center text-[var(--color-primary)]">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-1">관리자 페이지</h1>
                    <p className="text-sm text-gray-500 mb-6">비밀번호를 입력해 주세요.</p>
                    <input
                        type="password"
                        value={passcodeInput}
                        onChange={(e) => setPasscodeInput(e.target.value)}
                        placeholder="비밀번호"
                        className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100 mb-3"
                    />
                    {passcodeError && <p className="text-sm text-red-600 mb-3">{passcodeError}</p>}
                    <button type="submit" className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-hover)] transition-colors">
                        입장하기
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-background-warm)] min-h-screen pb-20">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl mb-1">회원 <span className="italic text-[var(--color-primary)]">관리</span></h1>
                        <p className="text-sm text-gray-500">회원별 이번달 식사 횟수를 체크하고 청구서를 발송하세요.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className="rounded-xl border border-gray-200 py-2 px-3 text-sm outline-none focus:border-[var(--color-primary)]"
                        />
                        <button onClick={fetchOrders} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="mt-4 bg-white rounded-2xl border border-gray-100 px-6 py-4 inline-flex items-center gap-2">
                    <span className="text-sm text-gray-500">{month} 예상 청구 총액</span>
                    <span className="text-lg font-bold text-gray-900">{totalRevenue.toLocaleString()}원</span>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">등록된 회원 주문이 없습니다.</div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-left text-gray-500">
                                    <th className="px-4 py-3 font-medium">이름</th>
                                    <th className="px-4 py-3 font-medium">연락처</th>
                                    <th className="px-4 py-3 font-medium">주소</th>
                                    <th className="px-4 py-3 font-medium">메뉴</th>
                                    <th className="px-4 py-3 font-medium">배달 요일</th>
                                    <th className="px-4 py-3 font-medium text-center">이번달 횟수</th>
                                    <th className="px-4 py-3 font-medium text-right">청구 금액</th>
                                    <th className="px-4 py-3 font-medium text-center">청구서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    const count = order.counts?.[month] || 0;
                                    const total = count * (order.unitPrice || 0);
                                    const invoice = order.invoices?.[month];

                                    return (
                                        <tr key={order.id} className="border-b border-gray-50 last:border-0">
                                            <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{order.name}</td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.phone}</td>
                                            <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{order.address}</td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{order.menuChoice}</td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{(order.deliveryDays || []).join(', ') || '-'}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button onClick={() => updateCount(order.id, -1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-6 text-center font-semibold">{count}</span>
                                                    <button onClick={() => updateCount(order.id, 1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold text-gray-900 whitespace-nowrap">{total.toLocaleString()}원</td>
                                            <td className="px-4 py-3 text-center">
                                                {invoice?.sent ? (
                                                    <span className="text-xs font-semibold text-green-600">발송완료</span>
                                                ) : (
                                                    <button
                                                        onClick={() => sendInvoice(order.id)}
                                                        disabled={count === 0}
                                                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-3 py-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                                    >
                                                        <Send className="w-3 h-3" /> 청구서 발송
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
