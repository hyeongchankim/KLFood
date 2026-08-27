import { apiUrl } from '../../lib/api';
import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

const AdminMembersPage = () => {
    const [users, setUsers] = useState([]);
    const [usersError, setUsersError] = useState('');
    const [promotingId, setPromotingId] = useState(null);

    const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('klfood-token') || ''}` });

    const fetchUsers = async () => {
        setUsersError('');
        try {
            const response = await fetch(apiUrl('/api/users'), { headers: authHeaders() });
            const result = await response.json();
            if (!response.ok) {
                setUsersError(result.message || '회원 목록을 불러올 수 없습니다.');
                return;
            }
            setUsers(result.users || []);
        } catch (err) {
            console.error('Failed to fetch users', err);
            setUsersError('서버 연결에 실패했습니다.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const promoteUser = async (id) => {
        setPromotingId(id);
        try {
            const response = await fetch(apiUrl(`/api/users/${id}/promote`), {
                method: 'PATCH',
                headers: authHeaders(),
            });
            const result = await response.json();
            if (response.ok) {
                setUsers((prev) => prev.map((u) => (u.id === id ? result.user : u)));
            } else {
                setUsersError(result.message || '승격에 실패했습니다.');
            }
        } catch (err) {
            console.error('Failed to promote user', err);
            setUsersError('서버 연결에 실패했습니다.');
        } finally {
            setPromotingId(null);
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
            <h1 className="text-3xl mb-1">회원 <span className="italic text-[var(--color-primary)]">관리</span></h1>
            <p className="text-sm text-gray-500 mb-6">회원 계정에 관리자 권한을 부여하세요.</p>

            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" /> 관리자 권한 부여
            </h2>
            {usersError && <p className="text-sm text-red-600 mb-3">{usersError}</p>}
            {users.length === 0 ? (
                <p className="text-sm text-gray-400">
                    {usersError ? '관리자 계정으로 로그인해야 회원 목록을 볼 수 있습니다.' : '등록된 회원이 없습니다.'}
                </p>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 text-left text-gray-500">
                                <th className="px-4 py-3 font-medium">이름</th>
                                <th className="px-4 py-3 font-medium">이메일</th>
                                <th className="px-4 py-3 font-medium text-center">권한</th>
                                <th className="px-4 py-3 font-medium text-center">작업</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-gray-50 last:border-0">
                                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{u.name}</td>
                                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{u.email}</td>
                                    <td className="px-4 py-3 text-center">
                                        {u.isAdmin ? (
                                            <span className="text-xs font-semibold text-green-600">관리자</span>
                                        ) : (
                                            <span className="text-xs text-gray-400">일반회원</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {!u.isAdmin && (
                                            <button
                                                onClick={() => promoteUser(u.id)}
                                                disabled={promotingId === u.id}
                                                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold px-3 py-1.5 transition-colors disabled:opacity-40"
                                            >
                                                {promotingId === u.id ? '처리 중...' : '관리자로 승격'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default AdminMembersPage;
