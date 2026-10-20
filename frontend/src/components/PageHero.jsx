// 참반찬 하위 페이지 공통 상단 히어로 (딥 그린 풀폭 밴드)
const PageHero = ({ eyebrow, title, accent, children }) => (
    <section className="bg-[var(--color-primary)] text-[var(--color-background-warm)]">
        <div className="max-w-4xl mx-auto text-center px-4 py-16 sm:py-20">
            {eyebrow && <p className="eyebrow text-[var(--color-accent-soft)] mb-5">{eyebrow}</p>}
            <h1 className="text-4xl sm:text-6xl leading-[1.15] mb-5">
                {title} <span className="text-[var(--color-accent-soft)]">{accent}</span>
            </h1>
            <p className="text-[var(--color-background-warm)]/70 max-w-xl mx-auto leading-relaxed">{children}</p>
        </div>
    </section>
);

export default PageHero;
