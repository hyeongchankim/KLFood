import { useState, useEffect } from 'react';
import { ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomerReviews from '../components/CustomerReviews';
const chamBanchanLogo = '/참반찬_로고.jpeg';

const themeBanners = [
    {
        id: 1,
        title: "집밥의 완성,\n참반찬의 수제 국세트",
        subtitle: "냉동실에 챙겨두는 따뜻한 행복",
        bgColor: "bg-[#715438]",
        textColor: "text-white",
        imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "우리집 밥상을\n푸짐하게",
        subtitle: "손쉽게 차려지는 멋있는 한끼 식사",
        bgColor: "bg-[#F4EFE6]",
        textColor: "text-gray-900",
        imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "신선한 재료로 만든\n든든한 밑반찬",
        subtitle: "매일 먹어도 질리지 않는 맛",
        bgColor: "bg-[#E6F4EA]",
        textColor: "text-gray-900",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
    }
];

const B2CMainPage = () => {
    const [bannerIndex, setBannerIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('전체');
    const { addItem } = useCart();

    useEffect(() => {
        const timer = setInterval(() => {
            setBannerIndex(prev => (prev + 1) % themeBanners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cham-products');
                const result = await response.json();
                setProducts(result.products || []);
            } catch (err) {
                console.error('Failed to fetch products', err);
            }
        };

        fetchProducts();
    }, []);

    const subscriptionProducts = products.filter(p => p.category === '정기구독');
    const filteredProducts = activeCategory === '전체' ? subscriptionProducts : subscriptionProducts.filter(p => p.category === activeCategory);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Banner Section */}
            <section className="bg-[#F2F7EC] py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#CDE0C3] rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E7F0DF] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-flex items-center gap-3 px-4 py-2 bg-white text-[var(--color-primary)] font-bold text-sm rounded-full shadow-sm mb-4 border border-[#D7E4D4]">
                        <img src={chamBanchanLogo} alt="참반찬 로고" className="h-8 w-8 object-contain" />
                        참반찬
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        내일의 건강한 식탁, <br className="md:hidden" />
                        <span className="text-[var(--color-primary)]">매일 새벽 문 앞</span>으로
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                        맞춤 식단표대로, 당일 조리한 신선한 반찬을 배송해 드립니다. <br className="hidden md:block" />
                        매일 아침 식사 고민, 참반찬이 해결해 드릴게요.
                    </p>

                    <p className="text-base font-semibold text-gray-800 mb-6">
                        국(찌개) + 반찬 3가지 또는 4가지를 매일 배달해 드립니다.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center mb-8">
                        <div className="text-left bg-white/70 rounded-2xl px-6 py-5 border border-[#D7E4D4] md:w-72 flex-shrink-0">
                            <p className="text-sm font-bold text-[var(--color-primary)] mb-2">배송정보</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>· 배송가능 지역: 도봉, 노원, 중랑구 일대</li>
                                <li>· 배송시간대: 오전 12시 ~ 오전 6시</li>
                            </ul>
                        </div>

                        <div className="text-left bg-white/70 rounded-2xl px-6 py-5 border border-[#D7E4D4] md:w-[420px] flex-shrink-0">
                            <p className="text-sm font-bold text-[var(--color-primary)] mb-2">이용 안내</p>
                            <ul className="text-sm text-gray-700 space-y-1.5">
                                <li>· A세트, B세트는 가정별 배송 횟수에 따라 월말에 청구 됩니다.</li>
                                <li className="pl-3 text-gray-500 text-xs">(예: 매 주 월~금 / 월,수,금 / 화,목)</li>
                                <li>· A세트, B세트 외 별도 맞춤 주문 가능합니다.</li>
                                <li className="pl-3 text-gray-500 text-xs">(예: A/B세트+반찬 또는 국 추가 / 반찬세트 / 국세트 등)</li>
                                <li>· 토요일, 일요일, 법정 공휴일은 배송이 없습니다.</li>
                                <li>· 주문 변경 및 취소는 당일 오전 12시 이전까지 전화 또는 문자 남겨주세요.</li>
                                <li className="pt-1 font-semibold text-gray-800">· 문의: 010-2420-4465</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme Banners Section (Auto-rotating Carousel) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="relative w-full h-[300px] sm:h-[350px] rounded-2xl overflow-hidden shadow-sm group">
                    {themeBanners.map((banner, idx) => (
                        <div
                            key={banner.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === bannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img src={banner.imageUrl} alt="Theme Banner" className="absolute right-0 top-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                            <div className={`absolute inset-0 ${banner.bgColor} -z-10`}></div>

                            <div className="relative h-full flex flex-col justify-end p-8 z-10 w-full bg-gradient-to-t from-black/60 to-transparent">
                                <h3 className={`text-2xl sm:text-3xl font-bold whitespace-pre-line mb-3 leading-snug drop-shadow-md text-white`}>
                                    {banner.title}
                                </h3>
                                <p className={`text-sm sm:text-base opacity-90 text-white`}>
                                    {banner.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                        {themeBanners.map((banner, idx) => (
                            <button
                                key={banner.id}
                                onClick={() => setBannerIndex(idx)}
                                className={`h-1.5 rounded-full transition-all ${idx === bannerIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'}`}
                                aria-label={`배너 ${idx + 1}로 이동`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter + Subscription Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col lg:flex-row gap-8">
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5 text-[var(--color-primary)]" />
                                카테고리 필터
                            </h2>
                        </div>
                        <ul className="space-y-1.5">
                            {['전체', '정기구독'].map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-sm flex justify-between items-center ${activeCategory === cat
                                            ? 'bg-orange-50 text-[var(--color-primary)] font-bold'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {cat}
                                        {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <main className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {activeCategory} <span className="text-[var(--color-primary)]">{filteredProducts.length}</span>건
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <span className="text-xs font-semibold text-orange-500 mb-1.5">{product.category}</span>
                                    <h3 className="font-bold text-gray-900 text-[17px] mb-1 line-clamp-1">{product.name}</h3>
                                    <p className="text-gray-400 text-xs mb-4 line-clamp-1">신선한 재료로 만든 든든한 한 끼</p>
                                    <div className="mt-auto flex justify-between items-end">
                                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                                            {product.price.toLocaleString()}<span className="text-sm font-medium mr-1 text-gray-500">원</span>
                                        </span>
                                        <button onClick={() => addItem(product)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-gray-200 hover:border-transparent shrink-0">
                                            <ShoppingCart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <CustomerReviews />
        </div>
    );
};

export default B2CMainPage;
