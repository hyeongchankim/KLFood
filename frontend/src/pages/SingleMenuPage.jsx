import { apiUrl } from '../lib/api';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, ChevronDown, ArrowRight, ArrowLeft, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import CustomerReviews from '../components/CustomerReviews';

const SingleMenuPage = () => {
    const [data, setData] = useState({ categories: [], products: [] });
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('전체');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { addItem } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const newArrivalsRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrl('/api/cham-products'));
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
    const singleProducts = (data.products || []).filter(p => p.category !== '정기구독');

    const filteredProducts = singleProducts.filter(p => {
        const matchCategory = activeCategory === '전체' || p.category === activeCategory;
        const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const newArrivals = singleProducts.slice(-6);

    const clearSearch = () => setSearchParams({});

    const scrollNewArrivals = (dir) => {
        const el = newArrivalsRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * 340, behavior: 'smooth' });
    };

    return (
        <div className="bg-[var(--color-background-warm)] min-h-screen pb-20">
            {/* Page Header */}
            <section className="max-w-3xl mx-auto text-center px-4 pt-16 pb-10">
                <h1 className="text-4xl sm:text-5xl mb-4">
                    단품 <span className="italic text-[var(--color-primary)]">반찬</span>
                </h1>
                <p className="text-gray-500">
                    엄선된 재료로 정성껏 만든 참반찬의 단품 메뉴를 만나보세요.
                </p>
            </section>

            {/* Filter / Sort Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-[var(--color-border)]">
                <div className="flex items-center justify-between py-4 relative">
                    <button
                        onClick={() => setIsFilterOpen((v) => !v)}
                        className="flex items-center gap-2 text-sm font-semibold tracking-wide text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        FILTERS
                    </button>

                    <p className="text-sm text-gray-500 absolute left-1/2 -translate-x-1/2 hidden sm:block">
                        Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
                    </p>

                    <div className="relative">
                        <select
                            className="appearance-none bg-transparent text-sm font-semibold tracking-wide text-gray-700 pr-6 cursor-pointer focus:outline-none"
                            defaultValue="추천순"
                        >
                            <option>추천순</option>
                            <option>낮은가격순</option>
                            <option>높은가격순</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] z-20">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeCategory === cat
                                        ? 'text-[var(--color-primary)] font-bold bg-orange-50'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {searchQuery && (
                    <div className="flex items-center gap-2 pb-4 text-sm text-gray-700">
                        <Search className="w-4 h-4 text-[var(--color-primary)]" />
                        <span><span className="font-bold text-[var(--color-primary)]">"{searchQuery}"</span> 검색 결과</span>
                        <button onClick={clearSearch} className="text-gray-400 hover:text-gray-700">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group">
                                <div className="relative aspect-square bg-[#EFEBE3] rounded-sm overflow-hidden mb-4">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:text-red-500 transition-colors shadow-sm text-gray-400">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>

                                <span className="text-xs font-bold tracking-wide text-[var(--color-primary)] underline underline-offset-2">
                                    {product.category}
                                </span>
                                <h3 className="text-sm text-gray-700 mt-1 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm font-semibold text-gray-900 mb-3">
                                    {product.price.toLocaleString()}원
                                </p>
                                <button
                                    onClick={() => addItem(product)}
                                    className="w-full border border-gray-800 rounded-full py-2.5 text-xs font-bold tracking-wide text-gray-800 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-3.5 h-3.5" /> ADD TO CART
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* New Arrivals Section */}
            {newArrivals.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-64 flex-shrink-0">
                        <h2 className="text-3xl mb-3">New <span className="italic">Arrivals</span></h2>
                        <p className="text-sm text-gray-500 mb-6">새로 들어온 참반찬 메뉴를 확인해 보세요.</p>
                        <button
                            onClick={() => setActiveCategory('전체')}
                            className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors mb-6"
                        >
                            SHOP THE COLLECTION <ArrowRight className="w-4 h-4" />
                        </button>
                        <div className="flex gap-2">
                            <button onClick={() => scrollNewArrivals(-1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => scrollNewArrivals(1)} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div ref={newArrivalsRef} className="flex-1 flex gap-5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {newArrivals.map((product) => (
                            <div key={product.id} className="flex-none w-[220px] group">
                                <div className="relative aspect-square bg-[#EFEBE3] rounded-sm overflow-hidden mb-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:text-red-500 transition-colors shadow-sm text-gray-400">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="text-xs font-bold tracking-wide text-[var(--color-primary)] underline underline-offset-2">
                                    {product.category}
                                </span>
                                <h3 className="text-sm text-gray-700 mt-1 mb-2 line-clamp-2">{product.name}</h3>
                                <p className="text-sm font-semibold text-gray-900 mb-3">{product.price.toLocaleString()}원</p>
                                <button
                                    onClick={() => addItem(product)}
                                    className="w-full border border-gray-800 rounded-full py-2.5 text-xs font-bold tracking-wide text-gray-800 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-3.5 h-3.5" /> ADD TO CART
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <CustomerReviews />
        </div>
    );
};

export default SingleMenuPage;
