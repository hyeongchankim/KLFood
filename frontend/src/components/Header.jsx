import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X, Mail, Lock, User, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
const klfoodLogo = '/KLfood_로고.jpeg';
const chamBanchanLogo = '/참반찬_로고.jpeg';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isB2B = location.pathname === '/';
    const [searchQuery, setSearchQuery] = useState('');
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [authMessage, setAuthMessage] = useState('');
    const [authError, setAuthError] = useState('');
    const { items, removeItem, updateQty, totalCount, totalPrice } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;
        navigate(`/cham-banchan?q=${encodeURIComponent(q)}`);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('klfood-user');
        const storedToken = localStorage.getItem('klfood-token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setAuthMessage('');
        setAuthError('');
        setFormData({ name: '', email: '', password: '' });
        setIsAuthOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthOpen(false);
        setAuthMessage('');
        setAuthError('');
        setFormData({ name: '', email: '', password: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthMessage('');
        setAuthError('');

        try {
            const response = await fetch(`http://localhost:5000/api/auth/${authMode === 'register' ? 'register' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setAuthError(result.message || '인증 처리 중 문제가 발생했습니다.');
                return;
            }

            localStorage.setItem('klfood-token', result.token);
            localStorage.setItem('klfood-user', JSON.stringify(result.user));
            setUser(result.user);
            setAuthMessage(authMode === 'register' ? '회원가입이 완료되었습니다.' : '로그인되었습니다.');

            window.setTimeout(() => {
                closeAuthModal();
            }, 800);
        } catch (error) {
            console.error('Auth request failed:', error);
            setAuthError('서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('klfood-token');
        localStorage.removeItem('klfood-user');
        setUser(null);
    };

    return (
        <>
            <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-6">
                            <button className="p-2 -ml-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors lg:hidden">
                                <Menu className="w-6 h-6" />
                            </button>
                            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                                <img src={klfoodLogo} alt="KL FOOD 로고" className="h-16 w-auto object-contain" />
                                <span className="font-bold text-2xl text-[var(--color-text-dark)] tracking-tight">
                                    KL FOOD
                                </span>
                            </Link>
                            <nav className="hidden lg:flex items-center gap-8 ml-8 h-full">
                                <Link
                                    to="/"
                                    className={`h-full flex items-center text-[17px] font-medium transition-colors ${isB2B
                                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                                        : 'text-[var(--color-text-gray)] hover:text-[#333]'
                                        }`}
                                >
                                    B2B 대량급식
                                </Link>
                                <div className="relative group/menu h-full flex items-center">
                                    <Link
                                        to="/cham-banchan"
                                        className={`h-full flex items-center text-[17px] font-medium transition-colors ${!isB2B
                                            ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]'
                                            : 'text-[var(--color-text-gray)] hover:text-[#333]'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <img src={chamBanchanLogo} alt="참반찬 로고" className="h-7 w-7 object-contain" />
                                            <span>참반찬</span>
                                        </span>
                                    </Link>

                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible translate-y-1 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-200 z-50">
                                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px]">
                                            <Link
                                                to="/cham-banchan/meal-plan"
                                                className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] hover:bg-orange-50 transition-colors whitespace-nowrap"
                                            >
                                                식단표
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <form onSubmit={handleSearch} className="relative hidden md:block">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="어떤 반찬을 찾으세요?"
                                    className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                />
                                <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-[var(--color-primary)]">
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>
                            {!isB2B && (
                                <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                                    <ShoppingCart className="w-6 h-6" />
                                    {totalCount > 0 && (
                                        <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                                            {totalCount}
                                        </span>
                                    )}
                                </button>
                            )}

                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/mypage" className="hidden sm:block text-sm font-medium text-[var(--color-primary)] hover:text-[#ff7a59] transition-colors">
                                        마이페이지
                                    </Link>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                                        안녕하세요, {user.name}님
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-[var(--color-text-gray)] hover:text-[var(--color-text-dark)] transition-colors"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => openAuthModal('register')}
                                        className="hidden sm:inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:bg-orange-50 transition-colors"
                                    >
                                        회원가입
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => openAuthModal('login')}
                                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ff7a59] transition-colors"
                                    >
                                        로그인
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
                    <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
                                장바구니
                                {totalCount > 0 && (
                                    <span className="ml-1 text-sm font-semibold text-[var(--color-primary)]">({totalCount})</span>
                                )}
                            </h3>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-gray-400">
                                    <ShoppingCart className="w-12 h-12 opacity-30" />
                                    <p className="text-sm">장바구니가 비어있습니다.</p>
                                    <p className="text-xs">참반찬 상품을 담아보세요!</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {items.map(item => (
                                        <li key={item.id} className="flex gap-4 items-start border-b border-gray-50 pb-4">
                                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-gray-100" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{item.name}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-1">{(item.price * item.qty).toLocaleString()}원</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="p-1 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-100 bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm text-gray-600 font-medium">총 결제금액</span>
                                    <span className="text-xl font-extrabold text-gray-900">{totalPrice.toLocaleString()}원</span>
                                </div>
                                <button className="w-full bg-[var(--color-primary)] hover:bg-[#ff7a59] text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                                    주문하기
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isAuthOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    {authMode === 'register' ? '회원가입' : '로그인'}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {authMode === 'register' ? 'KL FOOD 회원이 되어 더 빠른 서비스를 이용하세요.' : '계정으로 로그인해 서비스를 이용해 보세요.'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeAuthModal}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            {authMode === 'register' && (
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="이름"
                                        required
                                        className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100"
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="이메일"
                                    required
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="비밀번호"
                                    minLength="4"
                                    required
                                    className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100"
                                />
                            </div>

                            {authError && <p className="text-sm text-red-600">{authError}</p>}
                            {authMessage && <p className="text-sm text-green-600">{authMessage}</p>}

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ff7a59]"
                            >
                                {authMode === 'register' ? '회원가입하기' : '로그인하기'}
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm text-gray-500">
                            {authMode === 'login' ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAuthMode('register');
                                        setAuthError('');
                                        setAuthMessage('');
                                        setFormData({ name: '', email: '', password: '' });
                                    }}
                                    className="font-medium text-[var(--color-primary)]"
                                >
                                    아직 계정이 없으신가요? 회원가입
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAuthMode('login');
                                        setAuthError('');
                                        setAuthMessage('');
                                        setFormData({ name: '', email: '', password: '' });
                                    }}
                                    className="font-medium text-[var(--color-primary)]"
                                >
                                    이미 계정이 있으신가요? 로그인
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
