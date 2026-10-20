# KLFood — 프로젝트 가이드

KL FOOD / 참반찬 — B2B 대량급식 + B2C 정기식단/도시락/반찬 커머스 데모.

## 구조

모노레포(워크스페이스 아님, 각 디렉터리가 독립 패키지).

```
backend/    Express 5 API. DB 없음 — data/*.json 파일에 읽고 씀
frontend/   React 19 + Vite 7 + Tailwind v4 + react-router 7
.claude/launch.json  두 서버 실행 설정 (backend:5001, frontend:5173) — 맥 기준
```

## 환경 (이 맥북)

- Node: **v24.20.0** — nvm 으로 설치됨 (`~/.nvm`, `default` alias = lts/*)
  - `~/.zshrc` 에 nvm 로드 라인 있음. 새 터미널에서 바로 `node`/`npm` 사용 가능
  - 버전 바꾸려면 `nvm install <ver> && nvm alias default <ver>`
- 이전 개발은 Windows 11 노트북에서 진행 → 맥북으로 이어받는 중

## 실행

```bash
cd backend && npm install && PORT=5001 node server.js   # http://localhost:5001
cd frontend && npm install && npm run dev                # http://localhost:5173
```

`npm install` 은 양쪽 다 이미 1회 실행됨. 백엔드가 먼저 떠 있어야 프런트 API 호출이 됨.

**맥은 백엔드를 5001 포트로 실행**: 기본 포트 5000 은 macOS AirPlay 수신기(AirTunes)가
점유해서 `localhost:5000` 요청이 403 으로 가로채임. 그래서
- `.claude/launch.json` 의 백엔드는 `env PORT=5001 node server.js` (macOS/Linux 전용 — Windows 에서는 `PORT` 를 다른 방식으로 지정)
- `frontend/.env.local`(gitignore, 커밋 안 됨)에 `VITE_API_BASE_URL=http://localhost:5001`
- 코드 기본값은 그대로 5000 (`server.js` 의 `PORT`, `src/lib/api.js`, `frontend/.env`) — Windows 등 5000 이 비어 있는 환경은 변경 불필요
- `.env.local` 이 없는 새 클론에서는 프런트가 5000 으로 호출하니 위 파일을 직접 만들어야 함

## 백엔드

- `server.js` → `routes/api.js` → `controllers/apiController.js` (전 로직이 이 한 파일)
- 영속화: `data/` 의 JSON 파일을 `fs.readFileSync`/`writeFileSync` 로 직접 조작
  - `users.json` — 회원(bcrypt 해시 비번, `isAdmin` 플래그). **커밋되어 있음** — 시드 겸용
  - `orders.json` — 주문 + 월별 배달 캘린더(`calendar`) + 입금/청구 상태(`payments`)
  - `mealPlans.json` — 날짜별 식단(없는 날짜는 `fallbackMenus` 순환)
  - `dummyData.json` — 참반찬 상품 카탈로그(읽기 전용)
  - `settings.json` — 사이트 설정. 현재 `hiddenTabs`(헤더에서 숨길 탭 key 배열)만 있음. **커밋되어 있음**(초기값 `b2b`, `lunchbox` 숨김)
- 인증: 로그인 시 `demo-token-<userId>` 문자열 발급(서명/만료 없음). 관리자 API는
  `Authorization: Bearer demo-token-<id>` 로 유저 조회 후 `isAdmin` 확인
- 가격: `PRICE_BY_SET = { A: 9500, B: 11500 }` 하드코딩
- `sendInvoice` 는 실제 발송 없이 `invoiceSent` 플래그만 세움(목)

### API

| Method | Path | 용도 |
|---|---|---|
| POST | `/api/auth/register` `/api/auth/login` | 회원가입/로그인 |
| GET/POST | `/api/cham-products` | 상품 카탈로그 |
| POST | `/api/b2b-inquiry` | B2B 문의(로그만) |
| GET/POST | `/api/meal-plan?year=&month=` | 식단표 조회 / 특정일 upsert |
| POST/GET | `/api/orders` | 주문 생성 / 목록(+가격표) |
| PATCH | `/api/orders/:id/day` | 캘린더 한 칸 A/B/해제 |
| PATCH | `/api/orders/:id/payment` `/payer` | 입금일 토글 / 입금인 |
| POST | `/api/orders/:id/invoice` | 청구서 발송(목) |
| GET | `/api/users` (admin) | 회원 목록 |
| PATCH | `/api/users/:id/promote` (admin) | 관리자 승격 |
| GET | `/api/settings` | 사이트 설정 조회 (`{ hiddenTabs: [...] }`, 공개) |
| PUT | `/api/settings/hidden-tabs` (admin) | 숨길 탭 목록 통째로 교체. body `{ hiddenTabs: [...] }`, 허용 key 외 값은 400 |

탭 key: `b2b`(대량급식) `meal`(정기 식단) `mealplan`(식단표) `lunchbox`(정기 도시락) `single`(단품 반찬).
백엔드 `VALID_TABS`(`apiController.js`) 와 프런트 `TABS`(`src/lib/tabSettings.js`) 를 같이 수정해야 함.

## 프런트엔드

- 라우팅: `App.jsx`. `/` = B2B, `/cham-banchan/*` = B2C(참반찬), `/admin/*`, `/mypage`
- **API 베이스 URL**: `src/lib/api.js` 의 `apiUrl(path)` 로 통일. `import.meta.env.VITE_API_BASE_URL`
  (없으면 `http://localhost:5000`, 맥에서는 `.env.local` 로 5001 지정). 환경별 값은 `frontend/.env` / `.env.local`(gitignore) 에.
  모든 `fetch` 호출은 `fetch(apiUrl('/api/...'))` 형태
- 상태: 장바구니는 `context/CartContext.jsx` (메모리만, 새로고침 시 소멸).
  로그인 유저/토큰은 `localStorage` (`klfood-user`, `klfood-token`)
- 헤더 탭 숨김: `lib/tabSettings.js` 가 `hiddenTabs` 를 모듈 단위 스토어(`useSyncExternalStore`)로 들고 있음.
  `Header` 가 마운트 시 `loadTabSettings()` 로 한 번 불러오고, `/admin/tabs`(`AdminTabsPage`) 에서 토글하면
  `saveHiddenTabs()` → PUT 후 같은 스토어를 갱신해 헤더에 즉시 반영. 로딩 전(`null`)에는 탭을 그리지 않음.
  **탭 링크만 숨길 뿐 라우트는 막지 않음** (`/`, `/cham-banchan/lunchbox` 등은 주소로 접속 가능)
- 관리자 페이지 진입: `AdminLayout.jsx` 의 클라이언트 패스코드 `klfood2026`
  (`sessionStorage`) — 서버 권한 체크와 별개. 헤더의 "어드민" 링크는 `user.isAdmin` 일 때만 노출
- 폼 공통: `components/OrderDetailsFields.jsx` (연락처/주소/메뉴/배달요일/현관출입).
  회원가입과 `OrderInfoPage` 가 공유
- 디자인 토큰: `src/index.css` 의 `@theme` (`--color-primary` #A97164 등). 폰트 DM Serif Display(제목)
- 아이콘: `lucide-react`

## 알려진 이슈 / 정리 후보

- ✅ `KLFood-main/` 중복 디렉터리 삭제됨 (`git rm -r`, 아직 커밋 안 함)
- ✅ API URL 환경변수화 완료 (`src/lib/api.js` + `.env`)
- **`data/*.json` 커밋됨** — 런타임에 변경되는 파일이 추적됨. 시드/실데이터 분리 고려
- 가짜 토큰 인증 — 실서비스 전 JWT 등으로 교체 (`getRequestingUser` 주석 참고)
- `ADMIN_PASSCODE` (`klfood2026`) 클라이언트 하드코딩
- backend `package.json` 에 `start` 스크립트 없음, `main` 이 존재하지 않는 `index.js`
- `Header.jsx` — eslint `react-hooks/set-state-in-effect` 경고 1건 (localStorage 로드 effect, 기존 코드)
- `index.css` — `@import`(폰트) 가 `@theme` 뒤에 있어 빌드 시 CSS 경고. 파일 맨 위로 옮기면 사라짐
- `App.css` 는 Vite 기본 템플릿 잔재 (거의 미사용), 루트 `package-lock.json` 은 빈 껍데기

## 브랜치

`main` 이 기본. `admin-management-features` 는 최근 머지됨(736b805).
