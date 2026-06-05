import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, Heart, SlidersHorizontal, ChevronDown, Trophy, Sparkles } from 'lucide-react';

const themeBanners = [
    {
        id: 1,
        title: "집밥의 완성,\n더반찬의 수제 국세트",
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

const bestSellers = [
    {
        id: 1,
        name: "더반찬 광주별미소고기육전(240g)",
        price: 14900,
        rating: 4.8,
        reviews: 1262,
        satisfaction: 85,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "더반찬 모둠두메산나물(219g)",
        price: 10900,
        rating: 4.7,
        reviews: 1505,
        satisfaction: 92,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "더반찬 고추장소스진미채(180g)",
        price: 10900,
        rating: 4.7,
        reviews: 630,
        satisfaction: 85,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&auto=format&fit=crop",
    }
];

const newArrivals = [
    {
        id: 1,
        name: "청어람 한우곱창(200g)",
        price: 18900,
        rating: 4.5,
        reviews: 12,
        satisfaction: 80,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1544378730-8b510ed9c878?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "더반찬 동원참치 미역국(550g)",
        price: 6500,
        rating: 4.9,
        reviews: 124,
        satisfaction: 98,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "더반찬 싱글부대찌개(550g)",
        price: 8900,
        rating: 4.6,
        reviews: 89,
        satisfaction: 90,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed35a4d3?q=80&w=600&auto=format&fit=crop",
    }
];

const B2CMainPage = () => {
    const [data, setData] = useState({ categories: [], products: [] });
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('전체');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cham-products');
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch products', err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = activeCategory === '전체'
        ? data.products
        : data.products?.filter(p => p.category === activeCategory) || [];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Banner Section */}
            <section className="bg-[#FFEFE5] py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-white text-[var(--color-primary)] font-bold text-sm rounded-full shadow-sm mb-4 border border-orange-100">
                        참반찬 정기구독
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        내일의 건강한 식탁, <br className="md:hidden" />
                        <span className="text-[var(--color-primary)]">매일 새벽 문 앞</span>으로
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                        전문 영양사가 설계한 맞춤 식단표대로, 당일 조리한 신선한 반찬을 배송해 드립니다. <br className="hidden md:block" />
                        매일 아침 식사 고민, 참반찬이 해결해 드릴게요.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-600">
                        <div className="flex items-center gap-1.5 bg-white/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                            <Clock className="w-4 h-4 text-orange-500" />
                            밤 10시 전 주문 시 내일 새벽 도착
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
                            <Star className="w-4 h-4 text-orange-500" />
                            첫 구매 100원 딜 이벤트 진행 중
                        </div>
                    </div>
                </div>
            </section>

            {/* Theme Banners Section (Horizontal Scroll) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 overflow-hidden">
                <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {themeBanners.map(banner => (
                        <div key={banner.id} className={`relative flex-none w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[350px] rounded-2xl overflow-hidden snap-center group shadow-sm`}>
                            {/* Background image filling half the banner, or customized layout */}
                            <img src={banner.imageUrl} alt="Theme Banner" className="absolute right-0 top-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay opacity-60" />
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
                </div>
            </section>

            {/* Best Sellers Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-gray-900">요즘 이게 잘 나가요</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {bestSellers.map((product) => (
                        <div key={product.id} className="flex-none w-[280px] sm:w-[320px] snap-start group cursor-pointer">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-[#0066FF] text-white text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm flex items-center gap-1 tracking-wide">
                                    <span className="font-extrabold">B+</span> SAVE
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className="font-medium text-gray-800 text-[16px] mb-1.5 line-clamp-1 group-hover:underline decoration-gray-300 underline-offset-4">{product.name}</h3>
                                <div className="text-xl font-extrabold text-gray-900 mb-2">
                                    {product.price.toLocaleString()}<span className="text-[15px] font-medium ml-0.5">원</span>
                                </div>
                                <div className="flex items-center text-[13px] text-gray-500 mb-1.5 gap-1.5">
                                    <div className="flex items-center text-gray-800 font-semibold gap-1">
                                        <Star className="w-3.5 h-3.5 fill-gray-800 text-gray-800" />
                                        {product.rating} <span className="text-gray-400 font-normal">({product.reviews.toLocaleString()}건)</span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <span>{product.satisfaction}% 만족</span>
                                </div>
                                <div className="text-[13px] text-gray-500">
                                    {product.delivery} 도착 가능
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* New Arrivals Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-b border-gray-100 pb-12">
                <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-gray-900">새로 들어왔어요</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-8 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {newArrivals.map((product) => (
                        <div key={product.id} className="flex-none w-[280px] sm:w-[320px] snap-start group cursor-pointer">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 bg-[#0066FF] text-white text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-sm flex items-center gap-1 tracking-wide">
                                    <span className="font-extrabold">B+</span> SAVE
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className="font-medium text-gray-800 text-[16px] mb-1.5 line-clamp-1 group-hover:underline decoration-gray-300 underline-offset-4">{product.name}</h3>
                                <div className="text-xl font-extrabold text-gray-900 mb-2">
                                    {product.price.toLocaleString()}<span className="text-[15px] font-medium ml-0.5">원</span>
                                </div>
                                {product.reviews > 0 ? (
                                    <div className="flex items-center text-[13px] text-gray-500 mb-1.5 gap-1.5">
                                        <div className="flex items-center text-gray-800 font-semibold gap-1">
                                            <Star className="w-3.5 h-3.5 fill-gray-800 text-gray-800" />
                                            {product.rating} <span className="text-gray-400 font-normal">({product.reviews.toLocaleString()}건)</span>
                                        </div>
                                        <span className="text-gray-300">|</span>
                                        <span>{product.satisfaction}% 만족</span>
                                    </div>
                                ) : (
                                    <div className="h-[21px] mb-1.5"></div>
                                )}
                                <div className="text-[13px] text-gray-500">
                                    {product.delivery} 도착 가능
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col lg:flex-row gap-8">

                {/* Sidebar Filter */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <SlidersHorizontal className="w-5 h-5 text-[var(--color-primary)]" />
                                카테고리 필터
                            </h2>
                        </div>

                        <ul className="space-y-1.5">
                            {data.categories?.map((cat, idx) => (
                                <li key={idx}>
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

                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex justify-between items-center text-sm">
                                가격대
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </h3>
                            <div className="space-y-3">
                                {['전체', '1만원 이하', '1만원 ~ 3만원', '3만원 이상'].map((price, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="radio" name="price" className="w-4 h-4 text-[var(--color-primary)] border-gray-300 focus:ring-[var(--color-primary)] accent-[var(--color-primary)]" defaultChecked={idx === 0} />
                                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {activeCategory} <span className="text-[var(--color-primary)]">{filteredProducts.length}</span>건
                        </h2>
                        <select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent cursor-pointer">
                            <option>추천순</option>
                            <option>신상품순</option>
                            <option>판매량순</option>
                            <option>낮은가격순</option>
                            <option>높은가격순</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.badge && (
                                            <div className="absolute top-3 left-3 bg-[#FF4500] text-white text-[11px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                                                {product.badge}
                                            </div>
                                        )}
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500 shadow-sm text-gray-400">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        {/* Dark overlay on hover with quick action */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button className="bg-white text-gray-900 text-sm font-bold px-6 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                                미리보기
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <span className="text-xs font-semibold text-orange-500 mb-1.5">{product.category}</span>
                                        <h3 className="font-bold text-gray-900 text-[17px] mb-1 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-xs mb-4 line-clamp-1">신선한 재료로 만든 든든한 한 끼</p>

                                        <div className="mt-auto flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                                                    {product.price.toLocaleString()}<span className="text-sm font-medium mr-1 text-gray-500">원</span>
                                                </span>
                                            </div>
                                            <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-gray-200 hover:border-transparent shrink-0">
                                                <ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default B2CMainPage;
