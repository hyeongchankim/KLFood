import { useSyncExternalStore } from 'react';
import { apiUrl } from './api';

// 헤더 카테고리 탭. key 는 백엔드 VALID_TABS 와 맞춰야 함
export const TABS = [
    { key: 'b2b', to: '/', label: 'B2B 대량급식' },
    { key: 'meal', to: '/cham-banchan', label: '정기 식단' },
    { key: 'mealplan', to: '/cham-banchan/meal-plan', label: '식단표' },
    { key: 'lunchbox', to: '/cham-banchan/lunchbox', label: '정기 도시락' },
    { key: 'single', to: '/cham-banchan/single', label: '단품 반찬' },
];

// null = 아직 로딩 전 (숨길 탭이 깜빡이지 않도록 헤더는 이때 탭을 그리지 않음)
let hiddenTabs = null;
const listeners = new Set();
const setHidden = (next) => {
    hiddenTabs = next;
    listeners.forEach((l) => l());
};

export const useHiddenTabs = () =>
    useSyncExternalStore(
        (cb) => {
            listeners.add(cb);
            return () => listeners.delete(cb);
        },
        () => hiddenTabs,
    );

export const loadTabSettings = async () => {
    try {
        const res = await fetch(apiUrl('/api/settings'));
        const data = await res.json();
        setHidden(data.hiddenTabs || []);
    } catch (err) {
        console.error('Failed to load tab settings', err);
        setHidden([]);
    }
};

// 성공하면 true. 헤더가 같은 스토어를 구독하므로 바로 반영됨
export const saveHiddenTabs = async (next) => {
    const res = await fetch(apiUrl('/api/settings/hidden-tabs'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('klfood-token') || ''}`,
        },
        body: JSON.stringify({ hiddenTabs: next }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || '저장에 실패했습니다.');
    setHidden(data.hiddenTabs);
};
