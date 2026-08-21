import { Clock } from 'lucide-react';

const ComingSoonPage = ({ title, description }) => (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-orange-50 flex items-center justify-center text-[var(--color-primary)]">
                <Clock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 leading-relaxed">{description || '더 맛있는 구성으로 준비 중입니다. 곧 만나보실 수 있어요!'}</p>
        </div>
    </div>
);

export default ComingSoonPage;
