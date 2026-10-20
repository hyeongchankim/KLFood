// 홈 "장점" 카드용 일러스트 (직접 그린 단순 SVG). 색은 index.css 토큰과 같은 값.
const CREAM = '#FAF4E8';
const GREEN = '#1F3D2F';
const SAGE = '#A9B79A';
const TERRA = '#C2562E';
const PEACH = '#EBA781';
const SAND = '#E7DDC9';

const Svg = ({ children }) => (
    <svg viewBox="0 0 240 200" className="w-full h-full" role="img" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
    </svg>
);

// 당일 조리 — 아침 해 + 김 나는 냄비
export const CookArt = () => (
    <Svg>
        <circle cx="120" cy="112" r="62" fill={PEACH} opacity=".55" />
        <path d="M30 168h180" stroke={CREAM} strokeWidth="4" />
        <path d="M78 100h84v50a14 14 0 0 1-14 14H92a14 14 0 0 1-14-14z" fill={CREAM} stroke={GREEN} strokeWidth="4" />
        <path d="M72 100h96" stroke={GREEN} strokeWidth="6" />
        <path d="M104 92a16 8 0 0 1 32 0" fill={SAGE} stroke={GREEN} strokeWidth="4" />
        <path d="M78 116H64M162 116h14" stroke={GREEN} strokeWidth="5" />
        <path d="M98 78c-8-8 8-14 0-24M120 74c-8-8 8-14 0-24M142 78c-8-8 8-14 0-24" stroke={CREAM} strokeWidth="4" />
        <path d="M94 138h52" stroke={TERRA} strokeWidth="4" opacity=".7" />
    </Svg>
);

// 새벽 문 앞 배송 — 새벽 하늘, 달, 문 앞 상자
export const DeliveryArt = () => (
    <Svg>
        <path d="M168 40a24 24 0 1 0 12 44 20 20 0 0 1-12-44z" fill={CREAM} />
        <path d="M54 52l3 7 7 3-7 3-3 7-3-7-7-3 7-3zM196 108l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={CREAM} />
        <rect x="58" y="70" width="92" height="98" rx="6" fill={SAND} stroke={GREEN} strokeWidth="4" />
        <rect x="70" y="82" width="68" height="86" rx="4" fill={CREAM} stroke={GREEN} strokeWidth="4" />
        <circle cx="128" cy="128" r="4" fill={TERRA} />
        <path d="M30 168h180" stroke={GREEN} strokeWidth="4" />
        <rect x="150" y="136" width="44" height="32" rx="3" fill={PEACH} stroke={GREEN} strokeWidth="4" />
        <path d="M172 136v32M150 150h44" stroke={GREEN} strokeWidth="3" />
    </Svg>
);

// 영양사 설계 식단 — 균형 잡힌 접시 + 수저
export const PlanArt = () => (
    <Svg>
        <circle cx="120" cy="104" r="62" fill={CREAM} stroke={GREEN} strokeWidth="4" />
        <path d="M120 104V50a54 54 0 0 1 46.8 27z" fill={SAGE} stroke={GREEN} strokeWidth="3" />
        <path d="M120 104l46.8-27a54 54 0 0 1 0 54z" fill={PEACH} stroke={GREEN} strokeWidth="3" />
        <path d="M120 104l46.8 27A54 54 0 0 1 120 158z" fill={SAND} stroke={GREEN} strokeWidth="3" />
        <path d="M120 104v54a54 54 0 0 1-46.8-27z" fill={SAGE} opacity=".6" stroke={GREEN} strokeWidth="3" />
        <path d="M120 104l-46.8 27a54 54 0 0 1 0-54z" fill={TERRA} opacity=".75" stroke={GREEN} strokeWidth="3" />
        <path d="M120 104L73.2 77A54 54 0 0 1 120 50z" fill={CREAM} stroke={GREEN} strokeWidth="3" />
        <circle cx="120" cy="104" r="9" fill={GREEN} />
        <path d="M30 70v36a8 8 0 0 0 8 8v40M26 70v22M34 70v22M42 70v22" stroke={CREAM} strokeWidth="4" />
        <path d="M210 66c-10 8-12 28-4 44v52M210 66v96" stroke={CREAM} strokeWidth="4" />
    </Svg>
);

// 부담 없는 가격 — 달력 체크 + 동전
export const PriceArt = () => (
    <Svg>
        <rect x="40" y="46" width="126" height="116" rx="10" fill={CREAM} stroke={GREEN} strokeWidth="4" />
        <path d="M40 78h126" stroke={GREEN} strokeWidth="4" />
        <path d="M70 36v20M136 36v20" stroke={GREEN} strokeWidth="6" />
        <g stroke={GREEN} strokeWidth="3">
            <path d="M58 98l6 6 10-12" />
            <path d="M92 98l6 6 10-12" />
            <path d="M126 98l6 6 10-12" />
            <path d="M58 128l6 6 10-12" />
        </g>
        <g fill={SAND}>
            <circle cx="103" cy="130" r="5" />
            <circle cx="137" cy="130" r="5" />
            <circle cx="70" cy="150" r="0" />
        </g>
        <circle cx="172" cy="140" r="34" fill={PEACH} stroke={GREEN} strokeWidth="4" />
        <circle cx="172" cy="140" r="25" stroke={GREEN} strokeWidth="2.5" strokeDasharray="3 4" />
        <text x="172" y="150" textAnchor="middle" fontSize="28" fontWeight="700" fill={GREEN} stroke="none" fontFamily="sans-serif">₩</text>
    </Svg>
);

// 홈 히어로 — 집밥 한 상 (밥·국·반찬 세 가지, 수저, 김)
export const HomeMealArt = () => (
    <svg viewBox="0 0 400 500" className="w-full h-full" role="img" aria-label="집밥 한 상 일러스트" fill="none" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="500" fill={CREAM} />
        <circle cx="200" cy="190" r="150" fill={PEACH} opacity=".35" />
        <circle cx="200" cy="190" r="100" fill={PEACH} opacity=".35" />
        {/* 상 */}
        <rect y="318" width="400" height="182" fill={TERRA} />
        <path d="M0 318h400" stroke={GREEN} strokeWidth="4" />
        <path d="M0 360h400M0 410h400M0 460h400" stroke={CREAM} strokeWidth="2" opacity=".25" />
        {/* 김 */}
        <path d="M150 190c-10-12 10-20 0-36M178 184c-10-12 10-20 0-36M250 196c-10-12 10-20 0-36M276 190c-10-12 10-20 0-36" stroke={GREEN} strokeWidth="5" opacity=".55" />
        {/* 밥그릇 */}
        <path d="M104 224a64 38 0 0 1 128 0z" fill={CREAM} stroke={GREEN} strokeWidth="5" />
        <path d="M110 232h116l-12 62a22 14 0 0 1-22 16h-48a22 14 0 0 1-22-16z" fill={SAGE} stroke={GREEN} strokeWidth="5" />
        <path d="M126 262h84" stroke={CREAM} strokeWidth="4" opacity=".7" />
        {/* 국그릇 */}
        <path d="M236 232h104l-10 56a20 14 0 0 1-20 14h-44a20 14 0 0 1-20-14z" fill={CREAM} stroke={GREEN} strokeWidth="5" />
        <ellipse cx="288" cy="232" rx="52" ry="12" fill={PEACH} stroke={GREEN} strokeWidth="5" />
        <circle cx="270" cy="232" r="3.5" fill={GREEN} />
        <circle cx="290" cy="235" r="3.5" fill={GREEN} />
        <circle cx="308" cy="230" r="3.5" fill={GREEN} />
        <path d="M268 312h40" stroke={GREEN} strokeWidth="5" opacity=".0" />
        {/* 반찬 접시 3개 */}
        <ellipse cx="96" cy="372" rx="52" ry="22" fill={CREAM} stroke={GREEN} strokeWidth="5" />
        <ellipse cx="96" cy="368" rx="34" ry="12" fill="#6B3E26" />
        <ellipse cx="200" cy="396" rx="52" ry="22" fill={CREAM} stroke={GREEN} strokeWidth="5" />
        <path d="M168 394c8-18 20-8 28-16s20 6 28-2c6 8 4 20-6 26-12 6-36 6-50-8z" fill={SAGE} stroke={GREEN} strokeWidth="3" />
        <ellipse cx="304" cy="372" rx="52" ry="22" fill={CREAM} stroke={GREEN} strokeWidth="5" />
        <path d="M276 372c6-12 16-4 24-10s18 4 26-2c4 8 2 16-6 22-12 6-34 4-44-10z" fill="#B8412A" stroke={GREEN} strokeWidth="3" />
        {/* 수저 */}
        <path d="M118 444L282 444" stroke={GREEN} strokeWidth="7" />
        <path d="M126 458L290 458" stroke={CREAM} strokeWidth="7" />
        {/* 창가 화분 */}
        <path d="M44 96c0-24 18-40 30-44-2 20-6 40-30 44zM44 96c14-6 26-22 24-44" stroke={GREEN} strokeWidth="4" fill={SAGE} />
        <path d="M356 120c0-20-14-32-26-36 2 16 6 32 26 36z" fill={SAGE} stroke={GREEN} strokeWidth="4" />
    </svg>
);
