import { useState } from 'react';
import { ArrowRight, CheckCircle, Mail, Phone } from 'lucide-react';

const B2BMainPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        facilityType: '',
        phone: '',
        details: ''
    });
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:5000/api/b2b-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', facilityType: '', phone: '', details: '' });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-[var(--color-background-warm)] w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 py-20 lg:py-32">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200 opacity-40 blur-3xl mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-red-200 opacity-40 blur-3xl mix-blend-multiply"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[var(--color-primary)] font-bold text-sm tracking-wide mb-4">
                            신선한 식재료, 정직한 맛
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            건강한 한 끼를 위한 <br className="hidden md:block" />
                            <span className="text-[var(--color-primary)]">맞춤형 대량 급식 솔루션</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
                            어린이집, 유치원, 병원, 요양원 등 단체 급식 시설을 위한 KL Food의 프리미엄 식단을 만나보세요. 매일 새벽, 직접 조리한 따뜻한 반찬을 배송해 드립니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#inquiry-form" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                                단가 및 식단 문의하기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#features" className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full shadow-md transition-all flex items-center justify-center border border-gray-200">
                                서비스 자세히 보기
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 relative group w-full max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-red-500 rounded-3xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                        <img
                            src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop"
                            alt="맛있고 건강한 단체 급식"
                            className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover border-4 border-white aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce shrink-0" style={{ animationDuration: '3s' }}>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">HACCP 인증 시설</p>
                                <p className="text-sm font-bold text-gray-900">100% 위생 조리</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">KL Food만의 특별한 약속</h2>
                        <p className="text-gray-600 text-lg">깐깐하게 고른 식재료로 정성을 다해, 우리 아이, 우리 가족이 먹는다는 생각으로 조리합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-orange-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-orange-100">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-orange-500">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">맞춤형 영양 식단</h3>
                            <p className="text-gray-600 leading-relaxed">
                                전문 영양사가 설계한 연령별, 시설별 맞춤형 식단표를 제공합니다. 맛과 영양의 완벽한 밸런스를 맞춰드립니다.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-red-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-red-100">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-red-500">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">안전한 새벽 배송</h3>
                            <p className="text-gray-600 leading-relaxed">
                                당일 조리된 신선한 반찬을 철저한 콜드체인 시스템을 통해 매일 아침 안전하게 문 앞까지 배송해 드립니다.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-yellow-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-yellow-100">
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-yellow-500">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">투명하고 합리적인 단가</h3>
                            <p className="text-gray-600 leading-relaxed">
                                대량 식자재 직거래 네트워크를 통해 고품질의 반찬을 예산에 맞는 합리적이고 투명한 가격으로 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section id="inquiry-form" className="py-24 bg-gray-50 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-5/12 bg-gradient-to-br from-[#FF5A5F] to-orange-400 p-10 text-white flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">식단 및 단가 문의</h2>
                                <p className="text-orange-50 opacity-90 leading-relaxed mb-8">
                                    시설 내 급식 도입을 고민 중이신가요?
                                    <br />간단한 정보를 남겨주시면, 담당자가 확인 후 시설별 맞춤 제안서를 보내드립니다.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-orange-100 font-medium">상담 문의 (평일 09시 ~ 18시)</p>
                                            <p className="text-lg font-bold tracking-wide">1588-0000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-orange-100 font-medium">이메일 문의</p>
                                            <p className="text-lg font-bold tracking-wide">b2b@lnkfood.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-7/12 p-10 lg:p-12">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">문의가 접수되었습니다.</h3>
                                    <p className="text-gray-600 mb-8">영업일 기준 1~2일 내에 담당자가 연락드리겠습니다.</p>
                                    <button
                                        onClick={() => setStatus(null)}
                                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
                                    >
                                        새로운 문의 작성하기
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">당당자 성함 (혹은 시설명) *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                            placeholder="홍길동 원장"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="facilityType" className="block text-sm font-bold text-gray-700 mb-2">시설 유형 *</label>
                                            <select
                                                id="facilityType"
                                                name="facilityType"
                                                required
                                                value={formData.facilityType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                            >
                                                <option value="">선택해주세요</option>
                                                <option value="어린이집/유치원">어린이집 / 유치원</option>
                                                <option value="초중고등학교">초·중·고등학교</option>
                                                <option value="병원/요양원">병원 / 요양원</option>
                                                <option value="기업구내식당">기업 구내식당</option>
                                                <option value="기타">기타 시설</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">연락처 *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                                placeholder="010-0000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="details" className="block text-sm font-bold text-gray-700 mb-2">문의 상세 내용</label>
                                        <textarea
                                            id="details"
                                            name="details"
                                            rows={4}
                                            value={formData.details}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                                            placeholder="예상 식수 인원, 원하는 예산 등 상세한 내용을 적어주시면 더 정확한 상담이 가능합니다."
                                        ></textarea>
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                                            문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg mt-4"
                                    >
                                        {status === 'submitting' ? '제출 중...' : '문의하기'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default B2BMainPage;
