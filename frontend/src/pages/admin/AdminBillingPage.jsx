import { useState, useEffect, useMemo } from 'react';
import { RefreshCw, Check, Send } from 'lucide-react';

const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const pad2 = (n) => String(n).padStart(2, '0');
const daysInMonth = (month) => {
    const [year, m] = month.split('-').map(Number);
    return new Date(year, m, 0).getDate();
};
const dayOfWeek = (month, day) => {
    const [year, m] = month.split('-').map(Number);
    return new Date(year, m - 1, day).getDay(); // 0 = Sun, 6 = Sat
};

const AdminBillingPage = () => {
    const [orders, setOrders] = useState([]);
    const [prices, setPrices] = useState({ A: 9500, B: 11500 });
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(getCurrentMonth());
    const [openPaymentFor, setOpenPaymentFor] = useState(null);
    const [payerDraft, setPayerDraft] = useState('');
    const [sendingInvoiceFor, setSendingInvoiceFor] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const result = await response.json();
            setOrders(result.orders || []);
            if (result.prices) setPrices(result.prices);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // click cycles a day: empty -> A -> B -> empty, mirroring the excel sheet's per-day A/B marks
    const cycleDay = async (order, day) => {
        const current = order.calendar?.[month]?.[day];
        const next = current === undefined ? 'A' : current === 'A' ? 'B' : null;

        setOrders((prev) => prev.map((o) => {
            if (o.id !== order.id) return o;
            const monthCalendar = { ...(o.calendar?.[month] || {}) };
            if (next === null) delete monthCalendar[day];
            else monthCalendar[day] = next;
            return { ...o, calendar: { ...o.calendar, [month]: monthCalendar } };
        }));

        try {
            await fetch(`http://localhost:5000/api/orders/${order.id}/day`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, day: String(day), value: next }),
            });
        } catch (err) {
            console.error('Failed to update delivery day', err);
            fetchOrders();
        }
    };

    // click a date in the payment popover to check/uncheck it as the 입금일 for this month
    const togglePayment = async (order, day) => {
        const date = `${month}-${pad2(day)}`;

        try {
            const response = await fetch(`http://localhost:5000/api/orders/${order.id}/payment`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, date }),
            });
            const result = await response.json();
            if (response.ok) {
                setOrders((prev) => prev.map((o) => (o.id === order.id
                    ? { ...o, payments: { ...o.payments, [month]: result.payment } }
                    : o)));
            }
        } catch (err) {
            console.error('Failed to update payment date', err);
        }
    };

    const openPaymentPopover = (order) => {
        setPayerDraft(order.payments?.[month]?.payerName || '');
        setOpenPaymentFor(openPaymentFor === order.id ? null : order.id);
    };

    const savePayerName = async (order) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${order.id}/payer`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month, payerName: payerDraft.trim() }),
            });
            const result = await response.json();
            if (response.ok) {
                setOrders((prev) => prev.map((o) => (o.id === order.id
                    ? { ...o, payments: { ...o.payments, [month]: result.payment } }
                    : o)));
            }
        } catch (err) {
            console.error('Failed to update payer name', err);
        }
    };

    const sendInvoice = async (order) => {
        setSendingInvoiceFor(order.id);
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${order.id}/invoice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ month }),
            });
            const result = await response.json();
            if (response.ok) {
                setOrders((prev) => prev.map((o) => (o.id === order.id
                    ? { ...o, payments: { ...o.payments, [month]: result.payment } }
                    : o)));
            }
        } catch (err) {
            console.error('Failed to send invoice', err);
        } finally {
            setSendingInvoiceFor(null);
        }
    };

    const monthDays = useMemo(() => Array.from({ length: daysInMonth(month) }, (_, i) => i + 1), [month]);

    const rows = useMemo(() => orders.map((order) => {
        const calendar = order.calendar?.[month] || {};
        const aCount = Object.values(calendar).filter((v) => v === 'A').length;
        const bCount = Object.values(calendar).filter((v) => v === 'B').length;
        const total = aCount * prices.A + bCount * prices.B;
        const payment = order.payments?.[month] || {};
        return {
            order, calendar, aCount, bCount, deliveryCount: aCount + bCount, total,
            paidAt: payment.paidAt || null,
            payerName: payment.payerName || '',
            invoiceSent: !!payment.invoiceSent,
        };
    }), [orders, month, prices]);

    const totalRevenue = useMemo(() => rows.reduce((sum, r) => sum + r.total, 0), [rows]);

    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl mb-1">청구 <span className="italic text-[var(--color-primary)]">관리</span></h1>
                        <p className="text-sm text-gray-500">날짜별로 A/B세트 배달을 체크하고 입금일을 관리하세요.</p>
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
                ) : rows.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">등록된 회원 주문이 없습니다.</div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
                        <table className="text-xs border-collapse">
                            <thead>
                                <tr className="text-gray-500">
                                    <th className="sticky left-0 bg-white px-3 py-2 text-left font-medium border-b border-r border-gray-100 whitespace-nowrap">이름 / 주소</th>
                                    {monthDays.map((day) => {
                                        const dow = dayOfWeek(month, day);
                                        const weekend = dow === 0 || dow === 6;
                                        return (
                                            <th key={day} className={`px-1.5 py-2 font-medium border-b border-gray-100 text-center w-8 ${weekend ? 'bg-gray-50' : ''}`}>
                                                {day}
                                            </th>
                                        );
                                    })}
                                    <th className="px-3 py-2 font-medium border-b border-l border-gray-100 text-right whitespace-nowrap">합계</th>
                                    <th className="px-3 py-2 font-medium border-b border-gray-100 text-center whitespace-nowrap">배달횟수</th>
                                    <th className="px-3 py-2 font-medium border-b border-gray-100 text-center whitespace-nowrap">A개수</th>
                                    <th className="px-3 py-2 font-medium border-b border-gray-100 text-center whitespace-nowrap">B개수</th>
                                    <th className="px-3 py-2 font-medium border-b border-gray-100 text-center whitespace-nowrap">입금일 / 입금인</th>
                                    <th className="px-3 py-2 font-medium border-b border-gray-100 text-center whitespace-nowrap">청구서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(({ order, calendar, aCount, bCount, deliveryCount, total, paidAt, payerName, invoiceSent }) => (
                                    <tr key={order.id} className="border-b border-gray-50 last:border-0">
                                        <td className="sticky left-0 bg-white px-3 py-2 border-r border-gray-100 whitespace-nowrap">
                                            <div className="font-semibold text-gray-900">{order.name}</div>
                                            <div className="text-gray-400">{order.address}</div>
                                        </td>
                                        {monthDays.map((day) => {
                                            const value = calendar[day];
                                            const dow = dayOfWeek(month, day);
                                            const weekend = dow === 0 || dow === 6;
                                            return (
                                                <td key={day} className={`p-0.5 text-center ${weekend ? 'bg-gray-50' : ''}`}>
                                                    <button
                                                        onClick={() => cycleDay(order, day)}
                                                        className={`w-7 h-7 rounded-md text-[11px] font-bold transition-colors ${
                                                            value === 'A' ? 'bg-orange-100 text-[var(--color-primary)]'
                                                                : value === 'B' ? 'bg-blue-100 text-blue-600'
                                                                    : 'text-transparent hover:bg-gray-100'
                                                        }`}
                                                        title={`${month}-${pad2(day)}`}
                                                    >
                                                        {value || '·'}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                        <td className="px-3 py-2 border-l border-gray-100 text-right font-semibold text-gray-900 whitespace-nowrap">{total.toLocaleString()}원</td>
                                        <td className="px-3 py-2 text-center font-semibold">{deliveryCount}</td>
                                        <td className="px-3 py-2 text-center text-[var(--color-primary)] font-semibold">{aCount}</td>
                                        <td className="px-3 py-2 text-center text-blue-600 font-semibold">{bCount}</td>
                                        <td className="px-3 py-2 text-center relative">
                                            <button
                                                onClick={() => openPaymentPopover(order)}
                                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                                                    paidAt ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                            >
                                                {paidAt ? <><Check className="w-3 h-3" /> {paidAt.slice(5)}</> : '미입금'}
                                            </button>
                                            {payerName && <div className="text-[11px] text-gray-400 mt-0.5">{payerName}</div>}
                                            {openPaymentFor === order.id && (
                                                <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-xl shadow-lg border border-gray-100 p-3 w-56 text-left">
                                                    <div className="grid grid-cols-7 gap-1">
                                                        {monthDays.map((day) => {
                                                            const date = `${month}-${pad2(day)}`;
                                                            const isPaid = paidAt === date;
                                                            return (
                                                                <button
                                                                    key={day}
                                                                    onClick={() => togglePayment(order, day)}
                                                                    className={`w-6 h-6 rounded-md text-[10px] font-semibold ${
                                                                        isPaid ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 hover:bg-gray-100'
                                                                    }`}
                                                                >
                                                                    {day}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-1.5">
                                                        <input
                                                            type="text"
                                                            value={payerDraft}
                                                            onChange={(e) => setPayerDraft(e.target.value)}
                                                            placeholder="입금인 이름"
                                                            className="flex-1 min-w-0 rounded-lg border border-gray-200 px-2 py-1 text-xs outline-none focus:border-[var(--color-primary)]"
                                                        />
                                                        <button
                                                            onClick={() => { savePayerName(order); setOpenPaymentFor(null); }}
                                                            className="rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold px-2.5 py-1"
                                                        >
                                                            저장
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {invoiceSent ? (
                                                <span className="text-xs font-semibold text-green-600">발송완료</span>
                                            ) : (
                                                <button
                                                    onClick={() => sendInvoice(order)}
                                                    disabled={sendingInvoiceFor === order.id}
                                                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-3 py-1.5 transition-colors disabled:opacity-40"
                                                >
                                                    <Send className="w-3 h-3" /> {sendingInvoiceFor === order.id ? '발송 중...' : '청구서 발송'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBillingPage;
