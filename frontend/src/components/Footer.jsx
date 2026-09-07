import { useState } from 'react';
import { ArrowRight, Instagram, Linkedin, MessageCircle } from 'lucide-react';
const klfoodLogo = '/KLfood_로고.png';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setEmail('');
    };

    return (
        <footer className="bg-white border-t border-gray-100 text-[var(--color-text-dark)]">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
                <h2 className="text-2xl mb-5">
                    <span className="italic text-[var(--color-primary)]">Thrive</span> With KL FOOD
                </h2>
                <form onSubmit={handleSubscribe} className="flex max-w-md rounded-full overflow-hidden bg-gray-50 border border-gray-200 focus-within:border-[var(--color-primary)] transition-colors">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 px-5 py-3 text-sm bg-transparent outline-none"
                    />
                    <button type="submit" className="px-5 flex items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="flex gap-3 mt-6">
                    <a href="#" className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full border border-gray-200 text-gray-400 flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                        <MessageCircle className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Link columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-gray-100">
                    <div className="py-6 md:pr-8">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Discover</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="/" className="hover:text-[var(--color-primary)] transition-colors">B2B 대량급식</a></li>
                            <li><a href="/cham-banchan" className="hover:text-[var(--color-primary)] transition-colors">정기 식단</a></li>
                            <li><a href="/cham-banchan/single" className="hover:text-[var(--color-primary)] transition-colors">단품 반찬</a></li>
                        </ul>
                    </div>
                    <div className="py-6 md:px-8 md:border-l md:border-gray-100">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Customer Support</h3>
                        <p className="text-2xl font-bold mb-1">1588-0000</p>
                        <p className="text-sm text-gray-500">평일 09:00 - 18:00<br />(점심시간 12:00 - 13:00)<br />주말 및 공휴일 휴무</p>
                    </div>
                    <div className="py-6 md:pl-8 md:border-l md:border-gray-100">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Explore</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">이용약관</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">단체주문 문의</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-3">
                    <img src={klfoodLogo} alt="KL FOOD 로고" className="h-6 w-auto object-contain opacity-70" />
                    <span>© 2026 KL FOOD | 상호명: (주)케이엘푸드 | 대표자: 강준혁 | 사업자등록번호: 678-31-01830</span>
                </div>
                <span>경기도 남양주시 오남읍 양지로 46번길 140-1</span>
            </div>
        </footer>
    );
};

export default Footer;
