import { useState } from 'react';
import { ShoppingCart, Star, Heart, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';

const BRANDS = ['전체검색', '밴드배송', '밴드프레시', 'KL Food', 'GNC', '츄츄'];
const CATEGORIES = ['전체', '육류반찬', '나물', '국/찌개', '해산물', '김치', '특별상품'];

const products = [
    {
        id: 1,
        name: "KL Food 광주별미소고기육전(240g)",
        normalPrice: 16900,
        salePrice: 14900,
        rating: 4.8,
        reviews: 1262,
        discount: 12,
        badge: "Best",
        category: "육류반찬",
        imageUrl: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "KL Food 모둠두메산나물(219g)",
        normalPrice: 12900,
        salePrice: 10900,
        rating: 4.7,
        reviews: 1505,
        discount: 15,
        category: "나물",
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "KL Food 고추장소스진미채(180g)",
        normalPrice: 12900,
        salePrice: 10900,
        rating: 4.7,
        reviews: 630,
        discount: 15,
        category: "나물",
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "KL Food 한우곱창(200g)",
        normalPrice: 21900,
        salePrice: 18900,
        rating: 4.5,
        reviews: 312,
        discount: 14,
        badge: "New",
        category: "육류반찬",
        imageUrl: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "KL Food 한우버터스테이크(150g)",
        normalPrice: 18900,
        salePrice: 16900,
        rating: 4.9,
        reviews: 892,
        discount: 11,
        badge: "Best",
        category: "육류반찬",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 6,
        name: "KL Food 떡갈비(250g)",
        normalPrice: 14900,
        salePrice: 12900,
        rating: 4.6,
        reviews: 723,
        discount: 13,
        category: "육류반찬",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561a1b?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 7,
        name: "KL Food 오이소박이(300g)",
        normalPrice: 9900,
        salePrice: 8400,
        rating: 4.4,
        reviews: 567,
        discount: 15,
        category: "김치",
        imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 8,
        name: "KL Food 총각김치(400g)",
        normalPrice: 8900,
        salePrice: 7500,
        rating: 4.7,
        reviews: 889,
        discount: 16,
        badge: "New",
        category: "김치",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 9,
        name: "KL Food 된장찌개(400g)",
        normalPrice: 11900,
        salePrice: 10200,
        rating: 4.5,
        reviews: 445,
        discount: 14,
        category: "국/찌개",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 10,
        name: "KL Food 영양밥(450g)",
        normalPrice: 13900,
        salePrice: 11900,
        rating: 4.8,
        reviews: 612,
        discount: 15,
        category: "국/찌개",
        imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 11,
        name: "KL Food 고등어자반(200g)",
        normalPrice: 10900,
        salePrice: 9200,
        rating: 4.6,
        reviews: 534,
        discount: 16,
        category: "해산물",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 12,
        name: "KL Food 새우젓(250g)",
        normalPrice: 12900,
        salePrice: 10900,
        rating: 4.7,
        reviews: 778,
        discount: 15,
        category: "해산물",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 13,
        name: "KL Food 참가지볶음(230g)",
        normalPrice: 9900,
        salePrice: 8500,
        rating: 4.7,
        reviews: 445,
        discount: 14,
        category: "나물",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 14,
        name: "KL Food 고등어구이(300g)",
        normalPrice: 15900,
        salePrice: 13900,
        rating: 4.8,
        reviews: 634,
        discount: 13,
        category: "해산물",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 15,
        name: "KL Food 오징어채무침(200g)",
        normalPrice: 12900,
        salePrice: 10900,
        rating: 4.6,
        reviews: 456,
        discount: 15,
        category: "해산물",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
    {
        id: 16,
        name: "KL Food 열무김치(400g)",
        normalPrice: 8900,
        salePrice: 7500,
        rating: 4.7,
        reviews: 721,
        discount: 16,
        category: "김치",
        imageUrl: "https://images.unsplash.com/photo-1585518419759-87d0c26d53d6?q=80&w=600&auto=format&fit=crop",
    },
];

const B2CMainPage = () => {
    const [activeBrand, setActiveBrand] = useState('KL Food');
    const [activeCategory, setActiveCategory] = useState('전체');
    const [sortBy, setSortBy] = useState('popular');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(p => {
        const matchCategory = activeCategory === '전체' || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return b.id - a.id;
            case 'bestselling':
                return b.reviews - a.reviews;
            case 'lowprice':
                return a.salePrice - b.salePrice;
            case 'highprice':
                return b.salePrice - a.salePrice;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Brand Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {BRANDS.map(brand => (
                            <button
                                key={brand}
                                onClick={() => setActiveBrand(brand)}
                                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
                                    activeBrand === brand
                                        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Banner */}
            <section className="relative bg-gradient-to-r from-orange-50 to-red-50 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <span className="text-[var(--color-primary)]">KL Food</span> 참반찬
                    </h1>
                    <p className="text-gray-600 mb-6">신선한 재료로 만든 정성스러운 반찬, 매일 새벽 배송해 드립니다</p>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-4">
                        <input
                            type="text"
                            placeholder="어떤 반찬을 찾으세요?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <div className="bg-gray-50 border-b border-gray-200 sticky top-[146px] z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center overflow-x-auto gap-2 py-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                                    activeCategory === cat
                                        ? 'bg-[var(--color-primary)] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter and Sort Bar */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                            필터
                        </button>
                        <span className="text-sm text-gray-600">
                            총 <span className="font-bold text-[var(--color-primary)]">{sortedProducts.length}</span>개
                        </span>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
                    >
                        <option value="popular">인기순</option>
                        <option value="newest">신상품순</option>
                        <option value="bestselling">판매량순</option>
                        <option value="rating">높은평점순</option>
                        <option value="lowprice">낮은가격순</option>
                        <option value="highprice">높은가격순</option>
                    </select>
                </div>

                {/* Product Grid */}
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                {/* Product Image */}
                                <div className="relative aspect-[1/1] bg-gray-100 overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Badge */}
                                    {product.badge && (
                                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold ${
                                            product.badge === 'Best' ? 'bg-red-500' : 'bg-blue-500'
                                        }`}>
                                            {product.badge}
                                        </div>
                                    )}
                                    {/* Discount Badge */}
                                    {product.discount > 0 && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            {product.discount}%
                                        </div>
                                    )}
                                    {/* Wishlist Button */}
                                    <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md hover:text-red-500 text-gray-600">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="inline-block px-2 py-1 bg-orange-50 text-[var(--color-primary)] text-xs font-semibold rounded">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-[var(--color-primary)] transition-colors">
                                        {product.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="mb-3">
                                        {product.normalPrice !== product.salePrice && (
                                            <div className="text-gray-400 text-xs line-through mb-1">
                                                {product.normalPrice.toLocaleString()}원
                                            </div>
                                        )}
                                        <div className="text-2xl font-extrabold text-gray-900">
                                            {product.salePrice.toLocaleString()}
                                            <span className="text-sm font-medium text-gray-600 ml-1">원</span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-4 text-xs text-gray-600">
                                        <div className="flex items-center gap-0.5">
                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-gray-900">{product.rating}</span>
                                        </div>
                                        <span className="text-gray-400">({product.reviews.toLocaleString()})</span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button className="w-full bg-[var(--color-primary)] hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group/btn">
                                        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        담기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-gray-400 mb-4 text-6xl">🔍</div>
                        <p className="text-gray-600 text-lg font-medium">검색 결과가 없습니다</p>
                        <p className="text-gray-400 text-sm mt-2">다른 검색어나 카테고리를 시도해보세요</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default B2CMainPage;
