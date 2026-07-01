import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

const weekdayLabels = ['일', '월', '화', '수', '목', '금', '토'];

const MealPlanPage = () => {
    const today = new Date();
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(today);
    const [monthDays, setMonthDays] = useState({});
    const [loading, setLoading] = useState(true);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    useEffect(() => {
        const fetchMealPlan = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/meal-plan?year=${year}&month=${month + 1}`);
                const result = await response.json();
                setMonthDays(result.days || {});
            } catch (err) {
                console.error('Failed to fetch meal plan', err);
                setMonthDays({});
            } finally {
                setLoading(false);
            }
        };

        fetchMealPlan();
    }, [year, month]);

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const goPrevMonth = () => {
        setViewDate(new Date(year, month - 1, 1));
        setSelectedDate(new Date(year, month - 1, 1));
    };
    const goNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1));
        setSelectedDate(new Date(year, month + 1, 1));
    };

    const isSameDay = (a, b) =>
        a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    const getMenuForDay = (day) => monthDays[day];

    const isSelectedInViewMonth = selectedDate.getFullYear() === year && selectedDate.getMonth() === month;
    const selectedMenu = isSelectedInViewMonth ? getMenuForDay(selectedDate.getDate()) : null;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <section className="bg-[#F2F7EC] py-12 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[var(--color-primary)] font-bold text-sm rounded-full shadow-sm mb-4 border border-[#D7E4D4]">
                        <CalendarDays className="w-4 h-4" />
                        식단표
                    </span>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        참반찬 이달의 식단표
                    </h1>
                    <p className="text-gray-600">날짜를 선택하면 그날의 추천 메뉴를 확인할 수 있어요.</p>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                {/* Calendar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={goPrevMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900">
                            {year}년 {month + 1}월
                        </h2>
                        <button onClick={goNextMonth} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 mb-2">
                        {weekdayLabels.map((label, idx) => (
                            <div
                                key={label}
                                className={`text-center text-xs font-semibold py-2 ${idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-gray-400'
                                    }`}
                            >
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {cells.map((day, idx) => {
                            if (day === null) return <div key={`empty-${idx}`} />;
                            const cellDate = new Date(year, month, day);
                            const isSelected = isSameDay(cellDate, selectedDate);
                            const isToday = isSameDay(cellDate, today);
                            const menu = getMenuForDay(day);

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(cellDate)}
                                    className={`aspect-square rounded-xl p-1.5 flex flex-col items-center justify-start gap-1 border transition-all text-left ${isSelected
                                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md'
                                        : isToday
                                            ? 'border-[var(--color-primary)] bg-orange-50'
                                            : 'border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                                        {day}
                                    </span>
                                    <span
                                        className={`text-[10px] leading-tight line-clamp-2 ${isSelected ? 'text-white/90' : 'text-gray-400'
                                            }`}
                                    >
                                        {loading ? '' : menu?.main}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected day detail */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-28">
                    <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-1">
                        {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 ({weekdayLabels[selectedDate.getDay()]})
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mb-6">오늘의 추천 식단</p>

                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
                        </div>
                    ) : selectedMenu ? (
                        <>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-400">메인요리</span>
                                    <span className="text-sm font-medium text-gray-800">{selectedMenu.main}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-400">밑반찬</span>
                                    <span className="text-sm font-medium text-gray-800">{selectedMenu.side}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-16 shrink-0 text-xs font-semibold text-gray-400">국/찌개</span>
                                    <span className="text-sm font-medium text-gray-800">{selectedMenu.soup}</span>
                                </li>
                            </ul>

                            <button className="w-full mt-8 bg-[var(--color-primary)] hover:bg-[#ff7a59] text-white font-bold py-3 rounded-xl transition-colors text-sm">
                                이 식단으로 주문하기
                            </button>
                        </>
                    ) : (
                        <p className="text-sm text-gray-400 py-8 text-center">달력에서 날짜를 선택해 주세요.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealPlanPage;
