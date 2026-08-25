import { useState, useRef } from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CustomerReviews from '../components/CustomerReviews';

const categories = ['전체', '기본 도시락', '스페셜 도시락', '채식 도시락', '추가메뉴', '품목', '곁들임식품'];

const products = [
    { id: 'lb-1', category: '기본 도시락', name: '제육김치도시락', price: 8900, imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-2', category: '기본 도시락', name: '불고기더블고기도시락', price: 9900, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-3', category: '기본 도시락', name: '고등어구이한상도시락', price: 10900, imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-4', category: '기본 도시락', name: '수제돈까스도시락', price: 8500, imageUrl: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-5', category: '기본 도시락', name: '오징어볶음도시락', price: 9500, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-6', category: '기본 도시락', name: '닭갈비도시락', price: 9900, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-7', category: '기본 도시락', name: '함박스테이크도시락', price: 10500, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-8', category: '기본 도시락', name: '숙주불고기도시락', price: 9200, imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed35a4d3?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-s1', category: '스페셜 도시락', name: '한우불고기 스페셜도시락', price: 16900, imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-s2', category: '스페셜 도시락', name: '전복장 스페셜도시락', price: 18900, imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-s3', category: '스페셜 도시락', name: '연어스테이크 스페셜도시락', price: 15900, imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-s4', category: '스페셜 도시락', name: '갈비찜 스페셜도시락', price: 17900, imageUrl: 'https://images.unsplash.com/photo-1544378730-8b510ed9c878?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-v1', category: '채식 도시락', name: '두부스테이크 채식도시락', price: 8900, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-v2', category: '채식 도시락', name: '나물비빔 채식도시락', price: 8500, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-v3', category: '채식 도시락', name: '병아리콩카레 채식도시락', price: 9500, imageUrl: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a1', category: '추가메뉴', name: '계란말이 추가', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a2', category: '추가메뉴', name: '치즈 추가', price: 1500, imageUrl: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a3', category: '추가메뉴', name: '흑미밥 변경', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a4', category: '추가메뉴', name: '미역국 추가', price: 2500, imageUrl: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a5', category: '추가메뉴', name: '순두부찌개 추가', price: 3000, imageUrl: 'https://images.unsplash.com/photo-1583224964978-2257b960c3d3?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-a6', category: '추가메뉴', name: '김치 추가', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed35a4d3?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-i1', category: '품목', name: '일회용 수저세트', price: 300, imageUrl: 'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-i2', category: '품목', name: '보냉백', price: 2000, imageUrl: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-i3', category: '품목', name: '아이스팩', price: 500, imageUrl: 'https://images.unsplash.com/photo-1610450949065-1f2841536c88?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-i4', category: '품목', name: '종이컵 2개', price: 500, imageUrl: 'https://images.unsplash.com/photo-1589187151053-5ec8818e661b?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-d1', category: '곁들임식품', name: '단무지', price: 800, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-d2', category: '곁들임식품', name: '요구르트', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?q=80&w=300&auto=format&fit=crop' },
    { id: 'lb-d3', category: '곁들임식품', name: '바나나', price: 1000, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop' },
];

const LunchboxPage = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { addItem } = useCart();
    const newArrivalsRef = useRef(null);

    const filteredProducts = activeCategory === '전체' ? products : products.filter((p) => p.category === activeCategory);
    const newArrivals = products.slice(-6);

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
                    정기 <span className="italic text-[var(--color-primary)]">도시락</span>
                </h1>
                <p className="text-gray-500">
                    매일 아침 새롭게 준비하는 참반찬 도시락 메뉴를 확인해 보세요.
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

            {/* New Arrivals Section */}
            {newArrivals.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-64 flex-shrink-0">
                        <h2 className="text-3xl mb-3">New <span className="italic">도시락</span></h2>
                        <p className="text-sm text-gray-500 mb-6">새로 들어온 도시락 메뉴를 확인해 보세요.</p>
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

export default LunchboxPage;
