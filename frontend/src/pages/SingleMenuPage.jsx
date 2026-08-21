import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, SlidersHorizontal, ChevronDown, Trophy, Sparkles, X, Search, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import CustomerReviews from '../components/CustomerReviews';

const bestSellers = [
    {
        id: 1,
        name: "참반찬 광주별미소고기육전(240g)",
        price: 14900,
        rating: 4.8,
        reviews: 1262,
        satisfaction: 85,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "참반찬 모둠두메산나물(219g)",
        price: 10900,
        rating: 4.7,
        reviews: 1505,
        satisfaction: 92,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "참반찬 고추장소스진미채(180g)",
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
        name: "참반찬 동원참치 미역국(550g)",
        price: 6500,
        rating: 4.9,
        reviews: 124,
        satisfaction: 98,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "참반찬 싱글부대찌개(550g)",
        price: 8900,
        rating: 4.6,
        reviews: 89,
        satisfaction: 90,
        delivery: "2/24(화)",
        imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed35a4d3?q=80&w=600&auto=format&fit=crop",
    }
];

const SingleMenuPage = () => {
    const [data, setData] = useState({ categories: [], products: [] });
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('전체');
    const [previewProduct, setPreviewProduct] = useState(null);
    const [previewQty, setPreviewQty] = useState(1);
    const { addItem } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';

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

    const categories = (data.categories || []).filter(cat => cat !== '정기구독');

    const filteredProducts = (data.products || []).filter(p => {
        if (p.category === '정기구독') return false;
        const matchCategory = activeCategory === '전체' || p.category === activeCategory;
        const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const clearSearch = () => setSearchParams({});

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
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
                            {categories.map((cat, idx) => (
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
                    {searchQuery && (
                        <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-orange-50 border border-orange-100 rounded-xl text-sm text-gray-700">
                            <Search className="w-4 h-4 text-[var(--color-primary)]" />
                            <span><span className="font-bold text-[var(--color-primary)]">"{searchQuery}"</span> 검색 결과 {filteredProducts.length}건</span>
                            <button onClick={clearSearch} className="ml-auto text-gray-400 hover:text-gray-700">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            {searchQuery ? '검색 결과' : activeCategory} <span className="text-[var(--color-primary)]">{filteredProducts.length}</span>건
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
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center gap-3 text-gray-400">
                            <Search className="w-12 h-12 opacity-30" />
                            <p className="text-base font-medium">검색 결과가 없습니다.</p>
                            <button onClick={clearSearch} className="text-sm text-[var(--color-primary)] hover:underline">전체 상품 보기</button>
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
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-red-500 shadow-sm text-gray-400">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        {/* Dark overlay on hover with quick action */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <button onClick={() => { setPreviewProduct(product); setPreviewQty(1); }} className="bg-white text-gray-900 text-sm font-bold px-6 py-2 rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
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
                                            <button onClick={() => addItem(product)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-gray-200 hover:border-transparent shrink-0">
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

            {/* Product Preview Modal (Figma: product-detail layout) */}
            {previewProduct && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                        <button
                            onClick={() => setPreviewProduct(null)}
                            className="absolute top-4 right-4 z-10 rounded-full p-2 bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="aspect-square bg-gray-100">
                                <img src={previewProduct.imageUrl} alt={previewProduct.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="p-8 flex flex-col">
                                <span className="text-xs font-semibold text-orange-500 mb-1">{previewProduct.category}</span>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{previewProduct.name}</h2>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6">신선한 재료로 만든 든든한 한 끼</p>

                                <div className="text-2xl font-extrabold text-gray-900 mb-6">
                                    {previewProduct.price.toLocaleString()}<span className="text-base font-medium text-gray-500 ml-0.5">원</span>
                                </div>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-2">
                                        <button onClick={() => setPreviewQty(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-gray-900">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-5 text-center font-semibold">{previewQty}</span>
                                        <button onClick={() => setPreviewQty(q => q + 1)} className="text-gray-500 hover:text-gray-900">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            for (let i = 0; i < previewQty; i++) addItem(previewProduct);
                                            setPreviewProduct(null);
                                        }}
                                        className="flex-1 bg-[var(--color-primary)] hover:bg-[#ff7a59] text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" /> 장바구니 담기
                                    </button>
                                </div>
                            </div>
                        </div>

                        {(data.products || []).filter(p => p.id !== previewProduct.id && p.category !== '정기구독').length > 0 && (
                            <div className="border-t border-gray-100 p-6">
                                <div className="flex gap-4 overflow-x-auto">
                                    {(data.products || [])
                                        .filter(p => p.id !== previewProduct.id)
                                        .slice(0, 4)
                                        .map(p => (
                                            <button
                                                key={p.id}
                                                onClick={() => { setPreviewProduct(p); setPreviewQty(1); }}
                                                className="flex-none w-20 text-center group"
                                            >
                                                <div className="relative mb-1.5">
                                                    <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-white shadow-sm group-hover:border-[var(--color-primary)] transition-colors" />
                                                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                                        {p.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-medium text-gray-700 line-clamp-1">{p.name}</p>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <CustomerReviews />
        </div>
    );
};

export default SingleMenuPage;
