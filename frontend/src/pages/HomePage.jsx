import { apiUrl } from '../lib/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Leaf, Sunrise, Truck } from 'lucide-react';
import CustomerReviews from '../components/CustomerReviews';

const img = (id) => `https://images.unsplash.com/${id}?q=80&w=800&auto=format&fit=crop`;

const trust = [
    { icon: Sunrise, label: '당일 조리 · 새벽 배송' },
    { icon: Truck, label: '도봉 · 노원 · 중랑 배송' },
    { icon: Leaf, label: '저염 · 저당 건강식' },
];

const benefits = [
    { title: '당일 조리', text: '그날 아침 만든 반찬만 담아요.', image: img('photo-1544025162-d76694265947') },
    { title: '새벽 문 앞 배송', text: '출근 전, 아침상에 맞춰 도착해요.', image: img('photo-1583224964978-2257b960c3d3') },
    { title: '영양사 설계 식단', text: '맛과 영양의 균형을 맞춘 식단표.', image: img('photo-1540420773420-3366772f4999') },
    { title: '부담 없는 가격', text: '먹은 횟수만큼만 월말에 청구해요.', image: img('photo-1512621776951-a57141f2eefd') },
];

const steps = [
    { title: '식단 고르기', text: 'A·B세트 중 우리 집에 맞는 식단을 선택해요.' },
    { title: '주문 정보 입력', text: '주소와 배달 요일을 남기면 접수 끝.' },
    { title: '새벽 조리 · 배송', text: '당일 조리한 반찬이 문 앞에 도착해요.' },
    { title: '맛있게 식사', text: '데우기만 하면 집밥 한 끼 완성.' },
];

const dayLabel = (d) => `${d.getMonth() + 1}/${d.getDate()} (${'일월화수목금토'[d.getDay()]})`;

// 이번 주 월~금 식단 (토·일에는 다음 주). 주가 두 달에 걸치면 두 달 식단을 모두 불러옴
const useWeeklyMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const today = new Date();
        const dow = today.getDay(); // 0=일 … 6=토
        const week = Array.from({ length: 5 }, (_, i) => {
            const offset = dow === 0 ? 1 : dow === 6 ? 2 : 1 - dow; // 월요일까지의 일수
            return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset + i);
        });
        const months = [...new Set(week.map((d) => `${d.getFullYear()}-${d.getMonth() + 1}`))];

        Promise.all(
            months.map((key) => {
                const [year, month] = key.split('-');
                return fetch(apiUrl(`/api/meal-plan?year=${year}&month=${month}`))
                    .then((r) => r.json())
                    .then((data) => [key, data.days || {}]);
            }),
        )
            .then((entries) => {
                const plans = Object.fromEntries(entries);
                setMenu(
                    week
                        .map((d) => ({ label: dayLabel(d), ...plans[`${d.getFullYear()}-${d.getMonth() + 1}`]?.[d.getDate()] }))
                        .filter((item) => item.main),
                );
            })
            .catch((err) => console.error('Failed to load weekly menu', err));
    }, []);

    return menu;
};

const HomePage = () => {
    const weeklyMenu = useWeeklyMenu();

    return (
        <div className="bg-[var(--color-background-warm)]">
            {/* Hero */}
            <section className="bg-[var(--color-primary)] text-[var(--color-background-warm)] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 grid lg:grid-cols-2 gap-10 items-end">
                    <div className="pb-12 lg:pb-20 text-center lg:text-left">
                        <p className="eyebrow text-[var(--color-accent-soft)] mb-5">KL FOOD · 참반찬</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6">
                            차리지 않아도 <br />
                            <span className="text-[var(--color-accent-soft)] italic">집밥</span> 그대로
                        </h1>
                        <p className="text-lg text-[var(--color-background-warm)]/70 max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
                            매일 새벽, 당일 조리한 반찬을 문 앞으로. 장보기도 요리도 고민도 덜어 드릴게요.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                            <Link to="/order-info" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-background-warm)] text-[var(--color-primary)] font-bold px-8 py-3.5 hover:bg-white transition-colors group">
                                정기 식단 시작하기
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/cham-banchan/meal-plan" className="inline-flex items-center justify-center rounded-full border border-[var(--color-background-warm)]/30 font-semibold px-8 py-3.5 hover:bg-white/10 transition-colors">
                                이달의 식단표
                            </Link>
                        </div>
                        <dl className="flex justify-center lg:justify-start gap-10">
                            {[['당일', '조리'], ['AM 6시 전', '배송 완료'], ['A · B', '두 가지 세트']].map(([big, small]) => (
                                <div key={big}>
                                    <dt className="font-display text-2xl text-[var(--color-accent-soft)]">{big}</dt>
                                    <dd className="text-xs text-[var(--color-background-warm)]/60 mt-1">{small}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="relative max-w-md w-full mx-auto lg:max-w-none">
                        <img
                            src={img('photo-1555939594-58d7cb561ad1')}
                            alt="당일 조리한 참반찬 닭갈비"
                            className="w-full aspect-[4/5] lg:aspect-[5/6] object-cover rounded-t-[999px]"
                        />
                    </div>
                </div>
            </section>

            {/* Trust strip */}
            <section className="border-b border-gray-200">
                <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
                    {trust.map((t) => (
                        <li key={t.label} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                            <t.icon className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                            {t.label}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Benefits */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="max-w-2xl mb-12">
                    <p className="eyebrow text-[var(--color-accent)] mb-4">Why 참반찬</p>
                    <h2 className="text-3xl sm:text-5xl leading-tight">집밥의 기준을 <br />새벽에 배달합니다</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {benefits.map((b) => (
                        <article key={b.title} className="relative aspect-[3/4] rounded-3xl overflow-hidden group">
                            <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/90 via-[var(--color-primary)]/20 to-transparent" />
                            <div className="absolute bottom-0 p-5 sm:p-6 text-[var(--color-background-warm)]">
                                <h3 className="text-xl sm:text-2xl mb-1.5">{b.title}</h3>
                                <p className="text-sm text-[var(--color-background-warm)]/80 leading-snug">{b.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Steps */}
            <section className="bg-gray-100 py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="eyebrow text-[var(--color-accent)] mb-4">How it works</p>
                        <h2 className="text-3xl sm:text-5xl">네 단계면 충분해요</h2>
                    </div>
                    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                        {steps.map((s, i) => (
                            <li key={s.title} className="border-t border-gray-300 pt-5">
                                <span className="font-display text-5xl text-[var(--color-accent)]">0{i + 1}</span>
                                <h3 className="text-xl mt-3 mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Two ways to order */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="text-center mb-12">
                    <p className="eyebrow text-[var(--color-accent)] mb-4">Choose your way</p>
                    <h2 className="text-3xl sm:text-5xl">우리 집에 맞게 골라 보세요</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="rounded-3xl bg-[var(--color-primary)] text-[var(--color-background-warm)] p-8 sm:p-10 flex flex-col">
                        <p className="eyebrow text-[var(--color-accent-soft)] mb-3">정기 식단</p>
                        <h3 className="text-3xl mb-2">매일 걱정 없이</h3>
                        <p className="text-[var(--color-background-warm)]/70 mb-6">A세트 9,500원 · B세트 11,500원 (1끼 기준)</p>
                        <ul className="space-y-3 text-sm mb-8">
                            {['영양사가 짠 식단표대로 매일 배송', '먹은 횟수만큼 월말에 청구', '배달 요일 · 세트를 자유롭게 변경'].map((t) => (
                                <li key={t} className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[var(--color-accent-soft)] flex-shrink-0" />{t}</li>
                            ))}
                        </ul>
                        <Link to="/order-info" className="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--color-background-warm)] text-[var(--color-primary)] font-bold px-6 py-3 hover:bg-white transition-colors">
                            정기 식단 신청하기
                        </Link>
                    </div>
                    <div className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 flex flex-col">
                        <p className="eyebrow text-[var(--color-accent)] mb-3">단품 반찬</p>
                        <h3 className="text-3xl mb-2">필요한 만큼만</h3>
                        <p className="text-gray-600 mb-6">메인요리 · 밑반찬 · 국/찌개 · 샐러드</p>
                        <ul className="space-y-3 text-sm text-gray-700 mb-8">
                            {['한 가지씩 골라 장바구니에', '정기 식단에 곁들여도 좋아요', '당일 조리 후 새벽 배송'].map((t) => (
                                <li key={t} className="flex gap-3"><Check className="w-4 h-4 mt-0.5 text-[var(--color-accent)] flex-shrink-0" />{t}</li>
                            ))}
                        </ul>
                        <Link to="/cham-banchan/single" className="mt-auto inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold px-6 py-3 hover:bg-[var(--color-primary-hover)] transition-colors">
                            단품 반찬 보러가기
                        </Link>
                    </div>
                </div>
            </section>

            {/* Weekly menu */}
            {weeklyMenu.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
                    <div className="flex items-end justify-between gap-4 mb-8">
                        <div>
                            <p className="eyebrow text-[var(--color-accent)] mb-4">This week</p>
                            <h2 className="text-3xl sm:text-5xl">이번 주 식단</h2>
                        </div>
                        <Link to="/cham-banchan/meal-plan" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap">
                            전체 식단표 <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <ul className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {weeklyMenu.map((d) => (
                            <li key={d.label} className="rounded-3xl bg-white border border-gray-200 p-5 flex flex-col">
                                <span className="eyebrow !tracking-[0.16em] text-[var(--color-accent)] mb-4">{d.label}</span>
                                <h3 className="text-xl leading-snug mb-3">{d.main}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mt-auto">{d.side}<br />{d.soup}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <CustomerReviews />

            {/* Closing CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="rounded-[2rem] bg-[var(--color-accent)] text-white text-center px-6 py-14 sm:py-20">
                    <h2 className="text-3xl sm:text-5xl mb-4">오늘 저녁부터 달라지는 식탁</h2>
                    <p className="text-white/80 mb-8">주문 변경 · 취소는 당일 오전 12시 전까지 전화 또는 문자로 남겨 주세요.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/order-info" className="inline-flex items-center justify-center rounded-full bg-white text-[var(--color-accent)] font-bold px-8 py-3.5 hover:bg-[var(--color-background-warm)] transition-colors">
                            지금 시작하기
                        </Link>
                        <a href="tel:01024204465" className="inline-flex items-center justify-center rounded-full border border-white/50 font-semibold px-8 py-3.5 hover:bg-white/10 transition-colors">
                            문의 010-2420-4465
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
