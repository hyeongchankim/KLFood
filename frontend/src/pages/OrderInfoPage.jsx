import { apiUrl } from '../lib/api';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, CheckCircle } from 'lucide-react';
import OrderDetailsFields, { initialOrderDetails } from '../components/OrderDetailsFields';

const OrderInfoPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const preselectedMenu = location.state?.menu || '';

    const [name, setName] = useState('');
    const [details, setDetails] = useState({ ...initialOrderDetails, menuChoice: preselectedMenu });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setDetails((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const response = await fetch(apiUrl('/api/orders'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, ...details }),
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || '주문 접수 중 오류가 발생했습니다.');
            }
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background-warm)] px-4">
                <div className="max-w-md text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">주문 요청이 접수되었습니다</h1>
                    <p className="text-gray-500 mb-6">담당자가 확인 후 빠르게 연락드리겠습니다.</p>
                    <button
                        onClick={() => navigate('/cham-banchan')}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                        정기 식단으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-background-warm)] min-h-screen pb-20">
            <section className="max-w-2xl mx-auto text-center px-4 pt-16 pb-10">
                <h1 className="text-4xl sm:text-5xl mb-4">
                    주문 <span className="italic text-[var(--color-primary)]">정보 입력</span>
                </h1>
                <p className="text-gray-500">
                    아래 정보를 입력해 주시면 오늘부터 참반찬 정기 식단을 시작할 수 있어요.
                </p>
            </section>

            <div className="max-w-lg mx-auto px-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                            required
                            className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100"
                        />
                    </div>

                    <OrderDetailsFields values={details} onChange={handleChange} />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-hover)] disabled:opacity-60"
                    >
                        {submitting ? '접수 중...' : '오늘부터 주문하기'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderInfoPage;
