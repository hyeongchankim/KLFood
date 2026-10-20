// Vercel 서버리스 엔트리: /api/* 요청을 Express 앱이 그대로 처리 (vercel.json 의 rewrite 참고)
module.exports = require('../backend/app');
