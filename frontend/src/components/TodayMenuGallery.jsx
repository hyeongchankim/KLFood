import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { INSTAGRAM_URL } from '../lib/links';
import { INSTAGRAM_POSTS, CHUSEOK_SLIDES } from '../lib/instagramPosts';

const TABS = [
    { key: 'daily', label: '오늘의 메뉴' },
    { key: 'weekly', label: '주간 식단표' },
    { key: 'chuseok', label: '추석 메뉴' },
];
const STEP = 8;
const fmt = (d) => `${Number(d.slice(5, 7))}/${Number(d.slice(8, 10))}`;

const TodayMenuGallery = () => {
    const [tab, setTab] = useState('daily');
    const [shown, setShown] = useState(STEP);

    const items = tab === 'chuseok'
        ? [
            ...CHUSEOK_SLIDES.map((s) => ({ src: s.src, label: s.name })),
            ...INSTAGRAM_POSTS.filter((p) => p.kind === 'chuseok').map((p) => ({ src: p.src, label: `추석 전 메뉴 (${fmt(p.date)})` })),
        ]
        : INSTAGRAM_POSTS.filter((p) => p.kind === tab).map((p) => ({ src: p.src, label: fmt(p.date) }));
    const visible = items.slice(0, shown);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                    <p className="eyebrow text-[var(--color-accent)] mb-4">From our kitchen</p>
                    <h2 className="text-3xl sm:text-5xl">오늘의 식단</h2>
                </div>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors whitespace-nowrap">
                    인스타그램에서 더 보기 <ArrowRight className="w-4 h-4" />
                </a>
            </div>

            <div className="flex gap-2 mb-8 border-b border-gray-200">
                {TABS.map((t) => (
                    <button
                        key={t.key}
                        onClick={() => { setTab(t.key); setShown(STEP); }}
                        className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${tab === t.key ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visible.map((it) => (
                    <li key={it.src}>
                        <img src={it.src} alt={`참반찬 ${TABS.find((t) => t.key === tab).label} ${it.label}`} loading="lazy" className="w-full aspect-[4/5] object-cover rounded-2xl border border-gray-200 bg-gray-100" />
                        <p className="mt-2 text-xs text-gray-500">{it.label}</p>
                    </li>
                ))}
            </ul>

            {shown < items.length && (
                <div className="mt-8 text-center">
                    <button onClick={() => setShown((n) => n + STEP)} className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                        더 보기 ({items.length - shown}장 남음)
                    </button>
                </div>
            )}
        </section>
    );
};

export default TodayMenuGallery;
