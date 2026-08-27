// 백엔드 API 베이스 URL.
// 개발/배포 환경에 따라 .env(.local) 의 VITE_API_BASE_URL 로 덮어쓴다.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';

// apiUrl('/api/orders') -> 'http://localhost:5000/api/orders'
export const apiUrl = (path) => `${API_BASE_URL}${path}`;
