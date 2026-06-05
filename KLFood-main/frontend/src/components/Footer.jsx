const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-[var(--color-border)] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
                                KL
                            </div>
                            <span className="font-bold text-xl text-gray-800">KL Food</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            매일 아침 건강한 식탁을 책임지는 KL Food입니다.<br />
                            B2B 대량 급식부터 프리미엄 수제반찬 새벽배송까지,<br />
                            엄선된 식재료로 정성을 다해 만듭니다.
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>상호명: (주)엘앤케이푸드 | 대표자: 홍길동</p>
                            <p>사업자등록번호: 123-45-67890</p>
                            <p>주소: 서울특별시 강남구 테헤란로 123, 엘앤케이타워 4층</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">고객센터</h3>
                        <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">1588-0000</p>
                        <p className="text-sm text-gray-500 mb-4">
                            평일 09:00 - 18:00<br />
                            (점심시간 12:00 - 13:00)<br />
                            주말 및 공휴일 휴무
                        </p>
                        <div className="flex flex-col gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-fit">
                                1:1 문의하기
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors w-fit">
                                자주 묻는 질문
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">이용안내</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">이용약관</a></li>
                            <li><a href="#" className="font-bold text-gray-800 hover:text-[var(--color-primary)] transition-colors">개인정보처리방침</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">이용안내</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">단체주문 문의</a></li>
                            <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">입점 문의</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        © 2026 KL Food Corp. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
