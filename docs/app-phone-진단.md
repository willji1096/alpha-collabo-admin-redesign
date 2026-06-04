# app/phone 시안 진단 리포트 (32화면)

진단일: 2026-05-29 / 기준: docs/DESIGN.md + app/css/app-mobile.css

## 우선순위 묶음

### P0 — 명시 규칙 위반·노출 리스크 (즉시)
- `balance-history.html` — `.bal-card` 다크 배경(`--bg-inverse`). DESIGN.md §9 "전체 라이트" 위반. more.html은 흰 배경인데 동일 데이터 카드만 다크 → `--bg-surface` + accent 바로 교체
- `pricing-superpass.html` `.pr-hero`, `guide.html` `.gd-cover` — 넓은 면적 accent 그라디언트(§9 위반)
- `saved-influencer.html` L100 — `youtube.com/@test` 더미 핸들 노출
- `inspection-detail.html` L108 — 이모지 `👇` (이모지 금지)
- `notification-center.html` — primary CTA가 레드 아닌 검정(`--text-primary`) → 브랜드 계층 역전 + `#FFF6F6` raw hex 그라디언트

### P1 — 구조 부채 (작업량 최대, 핸드오프 핵심)
- **인라인 style 215+건** — 메타행 flex / SNS 아이콘 크기 / 상세 링크 span / 사유 박스 4개 패턴이 app-mobile.css에 없어 카드마다 중복. 상위: list*, campaign-schedule-list (각 25~29건)
- **raw px 236+건** — `font-size:12/14/22px` → `--fs-sm/base/...` 토큰화
- **페이지 `<style>` 블록 고립** — `.cb-* .cd-* .cal-* .vp-*`(캠페인 계열), pricing-*, login, more, guide, balance-history가 app-mobile.css 밖에 자체 정의 → 통합 필요

### P2 — 컴포넌트 불일치 (통합)
- 취소/수정 사유 박스 3종 배경 제각각(list-revision/list-cancel-influencer/list-cancel-selected) → `.app-reason-box` + severity modifier 단일화
- `.pr-card-head` 구조 분기 — pricing/korea/it는 flex, account/superpass는 block. 같은 클래스명 다른 렌더
- 채팅 말풍선 radius 14px 고아값, influencer-chat ↔ manager-chat 불일치 → 공통 bubble 클래스
- login-btn / notification CTA 버튼 DS `.btn` 미사용 자체 구현
- 미선정 뱃지 variant 미정의(list-unselected) → `badge-neutral` common.css 추가
- campaign-schedule-list 캠페인 코드 `#` 누락(형제는 `#1141`)

### P3 — 정보 손실 (설계 결정 필요)
- `influencer-search` — 데스크탑 원본의 플랫폼/팔로워/성별/방문일 필터 + 단가/승인여부 컬럼 전면 삭제. 필터 시트 패턴으로 복원 여부 결정
- `pricing.html` — 구간별 9컬럼 단가 테이블 → 4행 요약으로 축소(차등 단가 소실)
- `pricing-superpass.html` — 11개국 지원금액 테이블 소실
