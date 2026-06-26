import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, ShieldCheck, ShoppingBag } from 'lucide-react';

const MyPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('klfood-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">로그인이 필요합니다</h1>
          <p className="mt-3 text-gray-600">마이페이지를 보려면 먼저 로그인해 주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-3xl bg-gradient-to-br from-[#ff7a59] to-[#ff5d3a] p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-orange-100">환영합니다</p>
              <h1 className="mt-2 text-3xl font-bold">{user.name}님</h1>
              <p className="mt-3 text-orange-50">KL FOOD의 맞춤 서비스와 주문 내역을 한눈에 관리해 보세요.</p>
            </div>
            <div className="rounded-2xl bg-white/20 px-4 py-3 backdrop-blur-sm">
              <p className="text-sm text-orange-100">가입 이메일</p>
              <p className="mt-1 font-semibold">{user.email}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-semibold text-gray-900">최근 활동</h2>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { title: '신규 가입 완료', desc: 'KL FOOD 회원으로 등록되었습니다.' },
                { title: '맞춤 식단 상담 요청', desc: '담당자가 빠른 시간 내에 연락드릴 예정입니다.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--color-primary)]" />
              <h2 className="text-lg font-semibold text-gray-900">계정 정보</h2>
            </div>
            <div className="mt-6 space-y-4 text-sm text-gray-600">
              <div className="rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-400">이름</p>
                <p className="mt-1 font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 p-4">
                <p className="text-gray-400">이메일</p>
                <p className="mt-1 font-semibold text-gray-900">{user.email}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[var(--color-primary)]" />
                  <p className="text-gray-400">가입 상태</p>
                </div>
                <p className="mt-1 font-semibold text-gray-900">정상 가입 완료</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
