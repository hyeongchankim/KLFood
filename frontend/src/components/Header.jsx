import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, Search } from 'lucide-react';

const Header = () => {
    const location = useLocation();
    const isB2B = location.pathname === '/';

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-6">
                        <button className="p-2 -ml-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors lg:hidden">
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#ff8f73] flex items-center justify-center text-white font-bold text-xl shadow-md">
                                L&K
                            </div>
                            <span className="font-bold text-2xl text-[var(--color-text-dark)] tracking-tight">
                                L&K Food
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
                                참반찬 새벽배송
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
                        <Link to="#" className="text-sm font-medium text-[var(--color-text-gray)] hover:text-[var(--color-text-dark)] transition-colors hidden sm:block ml-2">
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
