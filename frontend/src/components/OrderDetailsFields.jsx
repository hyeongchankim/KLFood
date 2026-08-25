import { Phone, MapPin, UtensilsCrossed, KeyRound, DoorOpen } from 'lucide-react';

const MENU_OPTIONS = ['정기구독 A세트(2인용)', '정기구독 B세트(3인용)'];
const WEEKDAYS = ['월', '화', '수', '목', '금'];

const inputClass = 'w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-orange-100';

const OrderDetailsFields = ({ values, onChange }) => {
    const toggleDay = (day) => {
        const next = values.deliveryDays.includes(day)
            ? values.deliveryDays.filter((d) => d !== day)
            : [...values.deliveryDays, day];
        onChange('deliveryDays', next);
    };

    return (
        <>
            <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                    type="tel"
                    value={values.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    placeholder="연락처 (010-0000-0000)"
                    required
                    className={inputClass}
                />
            </div>

            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={values.address}
                    onChange={(e) => onChange('address', e.target.value)}
                    placeholder="배송 주소"
                    required
                    className={inputClass}
                />
            </div>

            <div className="relative">
                <UtensilsCrossed className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <select
                    value={values.menuChoice}
                    onChange={(e) => onChange('menuChoice', e.target.value)}
                    required
                    className={`${inputClass} appearance-none bg-white`}
                >
                    <option value="" disabled>선택 메뉴 (정기 식단)</option>
                    {MENU_OPTIONS.map((menu) => (
                        <option key={menu} value={menu}>{menu}</option>
                    ))}
                </select>
            </div>

            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">원하는 배달 요일</p>
                <div className="flex gap-2">
                    {WEEKDAYS.map((day) => (
                        <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`w-10 h-10 rounded-full text-sm font-semibold border transition-colors ${values.deliveryDays.includes(day)
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--color-primary)]'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-gray-700 mb-2">현관 출입 여부</p>
                <div className="relative">
                    <DoorOpen className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                    <select
                        value={values.entryAllowed}
                        onChange={(e) => onChange('entryAllowed', e.target.value)}
                        required
                        className={`${inputClass} appearance-none bg-white`}
                    >
                        <option value="" disabled>선택해 주세요</option>
                        <option value="가능">출입 가능 (공동현관 비밀번호 필요)</option>
                        <option value="불가능">출입 불가능 (문 앞 배송)</option>
                    </select>
                </div>
            </div>

            {values.entryAllowed === '가능' && (
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={values.doorPassword}
                        onChange={(e) => onChange('doorPassword', e.target.value)}
                        placeholder="현관 비밀번호"
                        className={inputClass}
                    />
                </div>
            )}
        </>
    );
};

export const initialOrderDetails = {
    phone: '',
    address: '',
    menuChoice: '',
    deliveryDays: [],
    entryAllowed: '',
    doorPassword: '',
};

export default OrderDetailsFields;
