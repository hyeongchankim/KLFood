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
        <footer className="bg-[#6B714B] text-white">
            {/* Newsletter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <h2 className="text-3xl mb-6">
                    <span className="italic">Thrive</span> With KL FOOD
                </h2>
                <form onSubmit={handleSubscribe} className="flex max-w-md rounded-full overflow-hidden bg-white">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 px-5 py-3 text-sm text-gray-800 outline-none"
                    />
                    <button type="submit" className="px-5 flex items-center justify-center text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="flex gap-4 mt-6">
                    <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Link columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 divide-white/20">
                    <div className="py-6 md:pr-8">
                        <h3 className="font-bold mb-3">Discover</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li><a href="/" className="hover:text-white transition-colors">B2B 대량급식</a></li>
                            <li><a href="/cham-banchan" className="hover:text-white transition-colors">정기 식단</a></li>
                            <li><a href="/cham-banchan/single" className="hover:text-white transition-colors">단품 반찬</a></li>
                        </ul>
                    </div>
                    <div className="py-6 md:px-8 md:border-l md:border-white/20">
                        <h3 className="font-bold mb-3">Customer Support</h3>
                        <p className="text-2xl font-bold mb-1">1588-0000</p>
                        <p className="text-sm text-white/80">평일 09:00 - 18:00<br />(점심시간 12:00 - 13:00)<br />주말 및 공휴일 휴무</p>
                    </div>
                    <div className="py-6 md:pl-8 md:border-l md:border-white/20">
                        <h3 className="font-bold mb-3">Explore</h3>
                        <ul className="space-y-2 text-sm text-white/80">
                            <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">단체주문 문의</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70">
                <div className="flex items-center gap-3">
                    <img src={klfoodLogo} alt="KL FOOD 로고" className="h-6 w-auto object-contain brightness-0 invert opacity-90" />
                    <span>© 2026 KL FOOD | 상호명: (주)케이엘푸드 | 대표자: 강준혁 | 사업자등록번호: 678-31-01830</span>
                </div>
                <span>경기도 남양주시 오남읍 양지로 46번길 140-1</span>
            </div>
        </footer>
    );
};

export default Footer;
