import { apiUrl } from '../lib/api';
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomerReviews from '../components/CustomerReviews';

const B2CMainPage = () => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('전체');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(apiUrl('/api/cham-products'));
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
        <div className="bg-[var(--color-background-warm)] min-h-screen pb-20">
            {/* Page Header */}
            <section className="max-w-3xl mx-auto text-center px-4 pt-16 pb-10">
                <h1 className="text-4xl sm:text-5xl mb-4">
                    정기 <span className="italic text-[var(--color-primary)]">식단</span>
                </h1>
                <p className="text-gray-500">
                    맞춤 식단표대로, 당일 조리한 신선한 반찬을 매일 새벽 문 앞으로 배송해 드립니다.
                </p>
            </section>

            {/* Delivery info */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 pb-12">
                <div className="text-left bg-white rounded-2xl px-6 py-5 border border-[var(--color-border)] md:w-72 flex-shrink-0">
                    <p className="text-sm font-bold text-[var(--color-primary)] mb-2">배송정보</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>· 배송가능 지역: 도봉, 노원, 중랑구 일대</li>
                        <li>· 배송시간대: 오전 12시 ~ 오전 6시</li>
                    </ul>
                </div>

                <div className="text-left bg-white rounded-2xl px-6 py-5 border border-[var(--color-border)] flex-1">
                    <p className="text-sm font-bold text-[var(--color-primary)] mb-2">이용 안내</p>
                    <ul className="text-sm text-gray-700 space-y-1.5">
                        <li>· A세트, B세트는 가정별 배송 횟수에 따라 월말에 청구 됩니다.</li>
                        <li>· A세트, B세트 외 별도 맞춤 주문 가능합니다.</li>
                        <li>· 토요일, 일요일, 법정 공휴일은 배송이 없습니다.</li>
                        <li>· 주문 변경 및 취소는 당일 오전 12시 이전까지 전화 또는 문자 남겨주세요.</li>
                        <li className="font-semibold text-gray-800">· 문의: 010-2420-4465</li>
                    </ul>
                </div>
            </div>

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
                            {['전체', '정기구독'].map((cat) => (
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
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center gap-3 text-gray-400">
                        <p className="text-base font-medium">상품이 없습니다.</p>
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

            <CustomerReviews />
        </div>
    );
};

export default B2CMainPage;
