import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { TABS, useHiddenTabs, saveHiddenTabs } from '../../lib/tabSettings';

const AdminTabsPage = () => {
    const hiddenTabs = useHiddenTabs();
    const [savingKey, setSavingKey] = useState(null);
    const [error, setError] = useState('');

    const toggle = async (key) => {
        const next = hiddenTabs.includes(key) ? hiddenTabs.filter((k) => k !== key) : [...hiddenTabs, key];
        setSavingKey(key);
        setError('');
        try {
            await saveHiddenTabs(next);
        } catch (err) {
            setError(err.message || '서버 연결에 실패했습니다.');
        } finally {
            setSavingKey(null);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
            <h1 className="text-3xl mb-1">탭 <span className="italic text-[var(--color-primary)]">설정</span></h1>
            <p className="text-sm text-gray-500 mb-6">사이트 상단에 보이는 탭을 숨기거나 다시 보이게 합니다. 숨겨도 페이지 주소로는 접속할 수 있습니다.</p>

            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
            {hiddenTabs === null ? (
                <p className="text-sm text-gray-400">불러오는 중...</p>
            ) : (
                <ul className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 max-w-xl">
                    {TABS.map((tab) => {
                        const hidden = hiddenTabs.includes(tab.key);
                        return (
                            <li key={tab.key} className="flex items-center justify-between gap-4 px-4 py-3">
                                <div className="min-w-0">
                                    <p className={`text-sm font-semibold ${hidden ? 'text-gray-400' : 'text-gray-900'}`}>{tab.label}</p>
                                    <p className="text-xs text-gray-400">{tab.to}</p>
                                </div>
                                <button
                                    onClick={() => toggle(tab.key)}
                                    disabled={savingKey === tab.key}
                                    className={`inline-flex items-center gap-1.5 rounded-full text-xs font-bold px-3 py-1.5 transition-colors disabled:opacity-40 ${
                                        hidden
                                            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]'
                                    }`}
                                >
                                    {hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    {hidden ? '숨김' : '표시 중'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default AdminTabsPage;
