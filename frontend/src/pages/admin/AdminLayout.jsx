import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Lock } from 'lucide-react';

// ponytail: client-side passcode only, not real auth — replace with real admin login if this ships beyond internal use
const ADMIN_PASSCODE = 'klfood2026';

const tabs = [
    { to: '/admin/members', label: '회원 관리' },
    { to: '/admin/billing', label: '청구 관리' },
];

const AdminLayout = () => {
    const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('klfood-admin') === 'true');
    const [passcodeInput, setPasscodeInput] = useState('');
    const [passcodeError, setPasscodeError] = useState('');

    const handleUnlock = (e) => {
        e.preventDefault();
        if (passcodeInput === ADMIN_PASSCODE) {
            sessionStorage.setItem('klfood-admin', 'true');
            setUnlocked(true);
            setPasscodeError('');
        } else {
            setPasscodeError('비밀번호가 올바르지 않습니다.');
        }
    };

    if (!unlocked) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-background-warm)] px-4">
                <form onSubmit={handleUnlock} className="max-w-sm w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center text-[var(--color-primary)]">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-1">관리자 페이지</h1>
                    <p className="text-sm text-gray-500 mb-6">비밀번호를 입력해 주세요.</p>
                    <input
                        type="password"
                        value={passcodeInput}
                        onChange={(e) => setPasscodeInput(e.target.value)}
                        placeholder="비밀번호"
                        className="w-full rounded-xl border border-gray-200 py-3 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100 mb-3"
                    />
                    {passcodeError && <p className="text-sm text-red-600 mb-3">{passcodeError}</p>}
                    <button type="submit" className="w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-white hover:bg-[var(--color-primary-hover)] transition-colors">
                        입장하기
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-[var(--color-background-warm)] min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <nav className="flex gap-2 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            className={({ isActive }) => `px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                                isActive ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-800'
                            }`}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
