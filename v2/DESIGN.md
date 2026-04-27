# Alphacollabo V2 — Curated Light Design System

**단일 기준.** 모든 V2 화면은 이 문서를 따른다. raw hex/px 직접 사용 금지 — `css/tokens.css` 변수만.

## 0. 정체성

| 항목 | V1 (기존 화면 개선) | V2 (이 문서) |
|---|---|---|
| 톤 | 도구적 · Linear-tone | 큐레이션 · Stripe-light |
| 액센트 | 빨강 #EE2128 | **와인 #7C2D3D** |
| 보더 | 강조 (1px 회색) | 최소 (입력만) |
| 깊이 표현 | 라인 분리 | **Surface 톤 + Soft shadow** |
| 데이터 밀도 | 높음 | 보통 (탐색 톤) |
| 타이포 | Sans 단일 | Sans + Serif (헤딩) |
| 정체성 | 인수인계 도구 | **셀프서비스 매칭 플랫폼** |

V2는 V1의 어떤 자산도 참조하지 않는다 (`../css/`, `../components/` 금지). 완전 독립 트랙.

## 1. 자원 모델

가치 단위가 "사람의 손길" → "**매칭 횟수**"로 이동.

- **구독 (정액)** — 월 매칭 N회 포함. 탐색 권한. 자산 게이팅.
- **캠페인 충전금** — 인플루언서 비용 (캠페인 단위 차감). 자동결제 가능.

매칭 횟수가 자산 보호 메커니즘. 매칭 이전엔 정보 마스킹 (이름 ●●●●, 아바타 blur, 핸들 ●●●), 매칭 시점에 정보 풀림 + 매칭 카운트 1회 차감.

## 2. 토큰

핵심 파일: `v2/css/tokens.css`. 직접 참조하지 말고 시맨틱 변수 사용.

### Color
- `--bg-page` (#FBFBFA), `--bg-surface` (#FFFFFF), `--bg-elevated` (#F6F5F2), `--bg-hover` (#EFEEEA)
- `--text-primary` (#131210), `--text-secondary` (#51504A), `--text-tertiary` (#6E6B63), `--text-disabled` (#97948C)
- `--accent` (#7C2D3D), `--accent-hover` (#5F1F2C), `--accent-light` (#FAF1F2)

### Typography
- `--font-sans` Pretendard Variable (본문)
- `--font-serif` Noto Serif KR (큐레이션 헤딩 한정 — 페이지 타이틀, 카드 타이틀, 인플루언서 이름·가격)
- Scale: 11/12/13/14/15/17/20/24/30/40 (`--fs-2xs` … `--fs-display`)

### Spacing (8pt scale, V1 대비 1.3~1.5배)
- `--space-1` 4px … `--space-11` 96px

### Radius
- `--radius-sm` 6 / `--radius-md` 10 / `--radius-lg` 14 / `--radius-xl` 20 / `--radius-full`

### Shadow
- `--shadow-xs` (카드 default) / `--shadow-sm` (elevated) / `--shadow-md` (hover lift) / `--shadow-lg` (toast/modal)

## 3. 컴포넌트 규율

### 보더 사용 영역
- ✅ Input / Textarea / Select 의 1px border
- ✅ Divider · 점선 분리선
- ✅ Match-meter / Within-budget 표시 등 **의도적 강조**
- ❌ Card · Section · Table — `box-shadow + bg 톤 차이`로만 분리

### Card
- `.card` shadow-xs (기본)
- `.card-elevated` shadow-sm (헤로/중요)
- `.card-soft` elevated bg only (정보 그룹)
- `.card-hoverable` hover lift (translateY(-1px) + shadow-sm)

### Button
- 4종만: `btn-primary` (filled wine) · `btn-secondary` (filled neutral) · `btn-subtle` (wine tint) · `btn-ghost`
- Outline 버튼 사용 금지
- 사이즈: `btn-sm` 32px / default 40px / `btn-lg` 48px

### Badge
- filled chip만. outline-badge 폐기.
- 색 변형: default / accent / success / warning / danger / info / solid

### Influencer Card (Explore 핵심)
- `.inf-card` 기본 (보더 없음, shadow-xs)
- `.inf-card.is-within` 예산 영역 안 — accent-light shadow ring
- `.inf-card.is-matched` 이미 매칭됨 — accent shadow ring (1px)
- 마스킹: `.is-masked` (이름 ●●●●), `.inf-card-cover-blur` (blur 14px filter)

## 4. 화면 라인업

| 번호 | 파일 | 상태 | 역할 |
|---|---|---|---|
| 01 | `login.html` | ✅ Ready | 로그인 (data: contact@glowlab.kr / alpha2025) |
| 02 | `dashboard.html` | ✅ Ready | KPI · 진행 캠페인 · 최근 활동 · 매칭 미터 |
| 03 | `explore.html` | ⭐ Headline | 인플루언서 마스킹 그리드 + 예산 슬라이더 + 필터 |
| 04 | `campaign-new.html` | Drafting | 예산 → 매칭 후보 자동 큐레이션 (캠페인 생성) |
| 05 | `match-detail.html` | Drafting | 매칭 시점 정보 풀림 + 메시지 시작 게이트 |
| 06 | `messages.html` | Drafting | 자동 번역 채팅 (해외 언어 대응) |
| 07 | `billing.html` | Drafting | 플랜 변경 · 매칭 충전 · 캠페인 비용 영수증 |
| DS | `design-system.html` | ✅ Ready | 컴포넌트 라이브러리 |

## 5. 작업 규율

- **V1 자산 참조 금지** — `../css/`, `../components/`, `../js/` import 금지
- **컴포넌트 단위 작업** — 새 컴포넌트는 `v2/css/components.css`에 추가, inline `<style>`은 화면 specific만
- **샘플 데이터** — `glowlab_kr` 클라이언트, 글로벌 인플루언서 핸들 (`yuki_tokyo`, `natasha_mood`, `mei_xian`, `mika_seoul` 등). 테스트 이름·국기 이모지 금지 (V1과 동일 규율)
- **타이포 mix** — 헤딩만 serif, 본문/UI는 sans. serif 남용 금지.

## 6. 라우팅

V2 페이지 간 이동은 모두 `v2/` 내부 상대경로. V1으로 돌아가려면 `../index-v1.html` 또는 `../login.html`. 게이트 = `../index.html` (parent root).

각 V2 페이지 우상단에 fixed track-toggle pill — 한 번 클릭으로 V1↔V2 round-trip.
