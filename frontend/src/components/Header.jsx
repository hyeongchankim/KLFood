import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Search, X, Mail, Lock, User } from 'lucide-react';
const klfoodLogo = '/KLfood_로고.jpeg';
const chamBanchanLogo = '/참반찬_로고.jpeg';

const Header = () => {
    const location = useLocation();
    const isB2B = location.pathname === '/';
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [authMessage, setAuthMessage] = useState('');
    const [authError, setAuthError] = useState('');

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
                            <nav className="hidden lg:flex gap-8 ml-8">
                                <Link
                                    to="/"
                                    className={`text-[17px] font-medium transition-colors ${isB2B
                                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] py-7'
                                        : 'text-[var(--color-text-gray)] hover:text-[#333] py-7'
                                        }`}
                                >
                                    B2B 대량급식
                                </Link>
                                <Link
                                    to="/cham-banchan"
                                    className={`text-[17px] font-medium transition-colors ${!isB2B
                                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] py-7'
                                        : 'text-[var(--color-text-gray)] hover:text-[#333] py-7'
                                        }`}
                                >
                                    <span className="flex items-center gap-2.5">
                                        <img src={chamBanchanLogo} alt="참반찬 로고" className="h-7 w-7 object-contain" />
                                        <span>참반찬</span>
                                    </span>
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="어떤 반찬을 찾으세요?"
                                    className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            </div>
                            {!isB2B && (
                                <button className="relative p-2 text-gray-600 hover:text-[var(--color-primary)] transition-colors">
                                    <ShoppingCart className="w-6 h-6" />
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                                        3
                                    </span>
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
