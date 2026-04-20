# 알파 콜라보 어드민 — Design System v2

> 브랜드 컬러: 알파콜라보 레드(#EE2128) 기반
> 레퍼런스: Intercom / Linear (따뜻한 라이트 어드민) + StyleSeed (대시보드 규칙)
> 용도: 디자인 목업 제작 기준 — 개발팀 인수인계용
> 구현: `css/common.css` (토큰 + 공통) / `css/admin.css` (어드민 레이아웃)

---

## 0. Token 아키텍처

3티어 구조로 분리되어 있습니다. **직접 사용은 Tier 2 / Tier 3만** 쓰고 Tier 1은 토큰 정의부에서만 참조합니다.

```
Tier 1 — Primitive (raw color scales)
  --red-50 ~ --red-900
  --neutral-0 ~ --neutral-900
  --green-*, --amber-*, --error-*, --blue-*
         ↓ (참조)
Tier 2 — Semantic
  --bg-page, --text-primary, --accent, --status-success 등
         ↓ (참조)
Tier 3 — Component
  --radius-*, --shadow-*, --z-*, --duration-*, --ease-* 등
```

**Rule**: 새 화면에서 raw hex 값을 쓰지 말고, 반드시 Semantic/Component 토큰을 참조.

---

## 1. Visual Theme

**따뜻한 라이트 모드 어드민** — 클라이언트가 장시간 사용하는 관리 도구.

- 눈 피로를 줄이는 warm off-white 배경 (`#FAFAF8`)
- 알파콜라보 레드를 단일 브랜드 액센트로 사용 (소면적만)
- 데이터 중심 인터페이스에 맞는 명확한 계층 구조
- 불필요한 장식 없이 정보 전달에 집중
- 순수 블랙(#000) 사용 금지 — 오프블랙(`--neutral-900` = #111)

---

## 2. Color

### 2.1 Accent Scale (Tier 1)

| Token | Hex | 용도 |
|-------|-----|------|
| `--red-50`  | `#FEF2F2` | accent-light, 뱃지 배경, 활성 탭 배경 |
| `--red-100` | `#FEE2E3` | accent-subtle, 호버 강조 |
| `--red-200` | `#FCC6C8` | 보더 강조 |
| `--red-300` | `#F99A9E` | 보조 강조 |
| `--red-400` | `#F56267` | 중간 톤 |
| `--red-500` | `#EE2128` | **브랜드 Primary** (`--accent`) |
| `--red-600` | `#D41920` | accent-hover |
| `--red-700` | `#B11319` | accent-emphasis (링크, 강조 텍스트) |
| `--red-800` | `#800B1C` | accent-dark (로고 서브) |
| `--red-900` | `#5A0913` | 극제한적 사용 |

### 2.2 Neutral Scale

| Token | Hex | 용도 |
|-------|-----|------|
| `--neutral-0`   | `#FFFFFF` | surface |
| `--neutral-25`  | `#FAFAF8` | page 배경 (warm tint) |
| `--neutral-50`  | `#F5F5F3` | elevated, subtle |
| `--neutral-100` | `#F0F0EE` | hover, light border |
| `--neutral-200` | `#E5E5E3` | default border |
| `--neutral-300` | `#D0D0CE` | strong border, hover border |
| `--neutral-400` | `#B8B8B8` | disabled text |
| `--neutral-500` | `#8C8C8C` | tertiary text |
| `--neutral-600` | `#6E6E6E` | - |
| `--neutral-700` | `#4A4A4A` | secondary text |
| `--neutral-800` | `#2A2A2A` | - |
| `--neutral-900` | `#111111` | primary text, inverse bg |

### 2.3 Semantic Surface/Text (Tier 2 — 실사용 토큰)

| Token | 참조 | 설명 |
|-------|------|------|
| `--bg-page` | `--neutral-25` | 페이지 전체 |
| `--bg-surface` | `--neutral-0` | 카드/패널/모달 |
| `--bg-elevated` | `--neutral-50` | 사이드바/테이블 헤더 |
| `--bg-hover` | `--neutral-100` | 호버 상태 |
| `--bg-subtle` | `--neutral-50` | 섹션 구분용 |
| `--bg-inverse` | `--neutral-900` | 툴팁/다크 요소 |
| `--text-primary` | `--neutral-900` | 제목, 중요 텍스트 |
| `--text-secondary` | `--neutral-700` | 본문, 설명 |
| `--text-tertiary` | `--neutral-500` | 플레이스홀더, 메타 |
| `--text-disabled` | `--neutral-400` | 비활성 |
| `--text-inverse` | `--neutral-0` | 다크 배경 위 텍스트 |
| `--text-on-accent` | `--neutral-0` | 액센트 버튼 위 텍스트 |
| `--text-link` | `--accent` | 링크 |

### 2.4 Accent Semantic

| Token | 참조 | 설명 |
|-------|------|------|
| `--accent` | `--red-500` | 기본 액센트 (CTA, 활성 상태, 브랜드) |
| `--accent-hover` | `--red-600` | 호버 |
| `--accent-light` | `--red-50` | 뱃지 배경, 선택 행 |
| `--accent-subtle` | `--red-100` | 서브 강조 |
| `--accent-emphasis` | `--red-700` | 링크, 강조 텍스트 |
| `--accent-dark` | `--red-800` | 로고 서브 |

### 2.5 Status (Triple: strong / bg / border / emphasis)

각 상태는 4토큰 세트로 제공:

| 상태 | `-{state}` | `-{state}-bg` | `-{state}-border` | `-{state}-strong` |
|------|--------|-----------|--------------|--------------|
| success | `#2E7D4F` | `#ECFDF3` | `#D1FADF` | `#1F5C39` |
| warning | `#C27A1A` | `#FFF8EC` | `#FEEFD0` | `#92580F` |
| error   | `#D03E3E` | `#FEF2F2` | `#FEE2E3` | `#9A2A2A` |
| info    | `#3B82F6` | `#EFF6FF` | `#DBEAFE` | `#1E58C4` |

사용: 기본 뱃지는 `-bg + -strong`, 고대비 뱃지는 `solid + inverse` 참조.

### 2.6 Overlay & Interactive

| Token | 값 | 용도 |
|-------|------|------|
| `--overlay-scrim` | `rgba(17,17,17,0.45)` | 모달/드로어 배경 |
| `--overlay-light` | `rgba(17,17,17,0.08)` | 가벼운 오버레이 |
| `--interactive-hover-bg` | `--neutral-100` | 일반 호버 |
| `--interactive-active-bg` | `--neutral-200` | 프레스/활성 |

### 2.7 SNS Channel Colors

전용 토큰 7종, 각 채널별 `--sns-{code}` / `--sns-{code}-bg` 페어.

| 채널 | 토큰 prefix | 배경 | 텍스트 | 아이콘 |
|------|-------------|------|--------|--------|
| 인스타그램 | `--sns-ig`  | `#FDF2F8` | `#C026D3` | 카메라 |
| 유튜브     | `--sns-yt`  | `#FEF2F2` | `#DC2626` | 플레이 |
| 틱톡       | `--sns-tt`  | `#F5F5F3` | `#111111` | 음표(굵음) |
| 샤오홍슈   | `--sns-xhs` | `#FEF2F2` | `#BE123C` | 책 펼침 |
| 페이스북   | `--sns-fb`  | `#EFF6FF` | `#2563EB` | F |
| 트위터/X   | `--sns-tw`  | `#F5F5F3` | `#111111` | X |
| 더우인     | `--sns-dy`  | `#FFF1F4` | `#FF0050` | 음표(얇음) |

**사용 클래스 3종**:
- `.tag-{channel}` — 풀 텍스트 태그 (예: `<span class="tag-sns tag-instagram">인스타그램</span>`)
- `.c-tag-{code}` — 테이블 셀 컴팩트 태그 (common admin list 페이지)
- `.sns-ico.tag-{channel}` — **SVG 아이콘 배지** (캘린더 테이블 등 밀도 높은 곳)

---

## 3. Typography

### 3.1 Fonts
- **Primary**: `Pretendard Variable` → `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`
- **Mono**: `Geist Mono` → `SF Mono, monospace`
- 모든 숫자에 `font-variant-numeric: tabular-nums`

### 3.2 Scale

| Token | Size | 용도 |
|-------|------|------|
| `--fs-xs`, `--fs-caption` | 11px | 메타, 오버라인 |
| `--fs-sm` | 12px | 캡션, 태그 |
| `--fs-base` | 14px | **본문 기본** |
| `--fs-md` | 15px | 폼 인풋 |
| `--fs-lg` | 16px | 카드 타이틀 |
| `--fs-xl` | 18px | 섹션 제목 |
| `--fs-2xl` | 24px | 페이지 제목 |
| `--fs-3xl` | 28px | KPI 숫자 |
| `--fs-display` | 36px | 디스플레이 (login 등) |

### 3.3 Weight
`--fw-regular: 400` / `--fw-medium: 500` / `--fw-semibold: 600` / `--fw-bold: 700`

### 3.4 Letter Spacing
`--tracking-tight: -0.3px` / `--tracking-normal: 0` / `--tracking-wide: 0.2px` / `--tracking-caps: 0.3px`

### 3.5 Utility Classes

```html
<h1 class="text-display">36px Display</h1>
<h1 class="text-h1">24px Page Title</h1>
<h2 class="text-h2">18px Section</h2>
<h3 class="text-h3">16px Card</h3>
<p class="text-body">14px 본문</p>
<p class="text-body-medium">14px medium</p>
<p class="text-small">13px small</p>
<span class="text-caption">12px Caption</span>
<span class="text-overline">11px OVERLINE</span>
<span class="text-kpi">28px 24,521</span>
<span class="text-data">mono 24,521</span>
```

Color variants: `.text-{primary|secondary|tertiary|disabled|accent|success|warning|error|info}`

---

## 4. Spacing & Layout

### 4.1 Spacing (8px base)
`0 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 40 / 48 / 56 / 64 / 80 / 96`

토큰: `--space-0` ~ `--space-24`

### 4.2 Layout
- 사이드바: 240px (접힘 64px)
- 헤더: 56px
- 콘텐츠 최대폭: 1280px
- 페이지 패딩: 32px (반응형에서 축소)
- 테이블 행: 48~56px

### 4.3 Radius

| Token | 값 | 요소 |
|-------|------|------|
| `--radius-xs` | 4px | 체크박스 |
| `--radius-sm` | 6px | 뱃지, 태그 |
| `--radius-md` | 8px | 버튼, 인풋 |
| `--radius-lg` | 12px | 카드 |
| `--radius-xl` | 16px | 모달, 드로어 |
| `--radius-2xl` | 24px | 히어로 이미지 |
| `--radius-full` | 9999px | 아바타, 원형 뱃지 |

### 4.4 Breakpoints
| Name | px | 동작 |
|------|-----|------|
| laptop | 1280 | 패딩 축소 |
| tablet | 1024 | 사이드바 축소(64px), 검색창 숨김 |
| mobile | 768 | 사이드바 드로어, 테이블 가로 스크롤 |

---

## 5. Elevation (Shadow & z-index)

### 5.1 Shadow Scale

| Token | 용도 |
|-------|------|
| `--shadow-xs` | 작은 카드, 호버 힌트 |
| `--shadow-1` | 카드, 인풋 |
| `--shadow-2` | 드롭다운, 호버 카드 |
| `--shadow-3` | 모달 (기본) |
| `--shadow-4` | 드로어 (슬라이드오버) |
| `--shadow-inner` | 인셋 (프레스 상태) |

**Colored shadows** — 브랜드 요소에만 사용:
- `--shadow-accent` — Primary 버튼 호버
- `--shadow-success` / `--shadow-error` — 상태 피드백

### 5.2 Z-index Scale

```
base      1
sticky   10
header   15
sidebar  20
drawer   80
modal   100
popover 120
toast   150
tooltip 200
```

---

## 6. Motion

### 6.1 Duration
- `--duration-instant`: 80ms — 즉각 피드백
- `--duration-fast`: 150ms — hover/focus
- `--duration`: 200ms — 기본 transition
- `--duration-slow`: 250ms — 모달 진입
- `--duration-slower`: 400ms — 대형 전환

### 6.2 Easing
- `--ease` — standard `cubic-bezier(0.4, 0, 0.2, 1)`
- `--ease-out` — enter `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-in` — exit `cubic-bezier(0.4, 0, 1, 1)`
- `--ease-spring` — 탄성 `cubic-bezier(0.34, 1.56, 0.64, 1)`

### 6.3 규칙
- 모달/드로어 진입 `250ms ease-out`
- 모달 퇴장 `200ms ease-in`
- 호버/포커스 `150ms ease`
- 스태거드 진입 항목당 `30ms` 딜레이
- `transform` / `opacity`만 애니메이션 (GPU 가속)
- `prefers-reduced-motion` 대응 내장

---

## 7. Component Patterns

### 7.1 Buttons — 단일 세트 체계

**조합**: `.btn` + **크기** + **변형** + (수정자)

```html
<!-- 기본 사용 -->
<button class="btn btn-md btn-primary">Primary</button>
<button class="btn btn-md btn-secondary">Secondary</button>
<button class="btn btn-md btn-ghost">Ghost</button>
<button class="btn btn-md btn-danger">Danger</button>
<a class="btn btn-link">자세히 보기</a>

<!-- 아이콘 전용 -->
<button class="btn btn-sm btn-secondary btn-icon" aria-label="필터">
  <svg>…</svg>
</button>

<!-- Full-width -->
<button class="btn btn-lg btn-primary btn-block">확인</button>

<!-- 로딩 -->
<button class="btn btn-md btn-primary is-loading">저장</button>

<!-- 그룹 (세그먼트) -->
<div class="btn-group">
  <button class="btn btn-sm btn-secondary">좌</button>
  <button class="btn btn-sm btn-secondary">중</button>
  <button class="btn btn-sm btn-secondary">우</button>
</div>
```

#### Variants

| Variant | Background | Text | Border | 용도 |
|---------|-----------|------|--------|------|
| Primary | `--accent` | `--text-on-accent` | accent | 주요 CTA (제출, 확인, 등록) |
| Secondary | `--bg-surface` | `--text-primary` | `--border-default` | 보조 액션 (취소, 엑셀다운) |
| Ghost | transparent | `--text-secondary` | none | 부차 액션 (툴바, 서브 메뉴) |
| Danger | `--status-error` | `--text-on-accent` | error | 파괴 액션 (삭제, 거절) |
| Link | transparent | `--text-link` | none | 인라인 텍스트 액션 (테이블 셀) |

#### Sizes

| Class | Height | 용도 |
|-------|--------|------|
| `.btn-sm` | 32px | 테이블 툴바, 필터 영역, inline 액션 |
| `.btn-md` | 40px | **기본** (대부분의 폼/카드) |
| `.btn-lg` | 48px | 로그인 제출, 히어로 CTA |

#### Modifiers

| Class | 설명 |
|-------|------|
| `.btn-icon` | 정사각형 아이콘 전용 — 크기 클래스와 조합 (sm=32 / md=40 / lg=48) |
| `.btn-block` | `width: 100%` — 폼 제출, 모바일 풀폭 |
| `.is-loading` | 로딩 스피너 표시 (JS로 토글) |
| `.btn-link.btn-danger` | 인라인 거절/삭제 링크 |

#### 상태

- **hover**: `translateY(-1px)` + colored shadow (primary: shadow-accent, danger: shadow-error)
- **active**: `scale(0.98)`
- **focus-visible**: `--focus-ring` (accent-light 3px shadow) — 전 variant 공통
- **disabled / [aria-disabled="true"]**: opacity 0.5, pointer-events none

#### Button Group

```html
<div class="btn-group">
  <button class="btn btn-sm btn-secondary is-active">일간</button>
  <button class="btn btn-sm btn-secondary">주간</button>
  <button class="btn btn-sm btn-secondary">월간</button>
</div>
```

연속된 버튼을 하나의 컴포넌트로 감싼 것. radius 자동 처리.

#### 예전에 분산됐던 컨텍스트 버튼 (여전히 존재, 그러나 선호 순서 낮음)

이 아래 버튼들은 **컨텍스트별 특수 스타일**이라 별도 유지. 신규 기능엔 **위 세트를 우선** 사용.

- `.c-btn`, `.c-link` — 테이블 셀 내부 버튼 (→ `.btn btn-sm btn-secondary` / `.btn-link`로 마이그레이션 권장)
- `.f-pre`, `.f-pre.on` — 날짜 프리셋 토글 (토글 그룹 특수)
- `.pg-btn`, `.pg-btn.active` — 페이지네이션 (숫자 정렬 특수)
- `.density-btn` — 세그먼트 아이콘 그룹 (3개 고정)
- `.pt-country` — 포인트 계산기 국가 선택 (작은 칩)
- `.tab` — 탭 네비게이션 (의미 다름)
- `.modal-close`, `.toast-close`, `.bulk-close` — 닫기 버튼 (위치 특수)
- `.filter-chip-add`, `.filter-chip-remove`, `.filter-chip-clear` — 칩 내부 버튼

### 7.2 Cards
- 배경: `--bg-surface`
- 테두리: `1px solid --border-default`
- 섀도우: `--shadow-1`
- 호버(클릭 가능): `--shadow-2`
- 패딩: 20~24px

### 7.3 Tables
- 헤더: `--bg-elevated`, weight 500
- 행 호버: `--bg-hover`
- 선택 행: `--accent-light`
- 숫자 우측 정렬 + `tabular-nums`
- 스트라이프 금지 — 호버/선택으로 구분

### 7.4 Status Badges

**3가지 variant** 지원:

```html
<!-- Subtle (기본) -->
<span class="badge badge-info"><span class="badge-dot"></span>모집중</span>

<!-- Solid (강조) -->
<span class="badge badge-solid-success">완료</span>

<!-- Outline -->
<span class="badge badge-outline-warning"><span class="badge-dot"></span>대기</span>
```

사이즈: `.badge-sm` / `.badge-md` / `.badge-lg`

| 상태 | 사용 |
|------|------|
| `badge-info` | 모집중, 진행중(초기) |
| `badge-warning` | 검수 대기, 수정 요청 |
| `badge-success` | 완료, 승인 |
| `badge-error` | 거절, 취소 |

### 7.5 Tabs

**Underline (기본)** — 주 네비게이션, 섹션 전환
```html
<div class="tabs" role="tablist">
  <button class="tab is-active">신청목록 <span class="tab-count">7</span></button>
  <button class="tab">선정목록</button>
</div>
```

**Pill** — 필터, 뷰 전환
```html
<div class="tabs tabs-pill" role="tablist">
  <button class="tab is-active">전체</button>
  <button class="tab">오늘</button>
  <button class="tab">이번 주</button>
</div>
```

### 7.6 Toast

```html
<div class="toast-region">
  <div class="toast toast-success" role="status">
    <svg class="toast-icon icon-stroke" viewBox="0 0 24 24">...</svg>
    <div class="toast-body">
      <div class="toast-title">저장되었습니다</div>
      <div class="toast-desc">변경사항이 자동으로 반영됩니다.</div>
    </div>
    <button class="toast-close" aria-label="닫기">✕</button>
  </div>
</div>
```

- 자동 해제 시간: 5초 (성공), 7초 (에러) 권장
- 우측 상단 고정, `--z-toast`
- 진입 `slide-in from right`, 퇴장 `.leaving` 클래스

### 7.7 Tooltip

```html
<span class="tooltip-wrap">
  <button class="btn-ghost">도움말</button>
  <span class="tooltip" role="tooltip">이 항목은 자동 계산됩니다</span>
</span>
```

`.tooltip-bottom` 클래스로 아래쪽 정렬.
- 반드시 텍스트 라벨과 병기 (아이콘 only 금지 원칙)

### 7.8 Skeleton

```html
<div class="skeleton skeleton-title"></div>
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-avatar"></div>
```

- 실제 컴포넌트의 형태를 미리 잡아주는 용도
- Shimmer 애니메이션 내장, `prefers-reduced-motion`에서 자동 정지

### 7.9 Drawer (Slide-over)

```html
<div class="drawer-backdrop open"></div>
<aside class="drawer open" role="dialog" aria-modal="true">
  <div class="drawer-header">
    <h2 class="drawer-title">인플루언서 상세</h2>
    <button class="modal-close">✕</button>
  </div>
  <div class="drawer-body">...</div>
  <div class="drawer-footer">
    <button class="btn btn-ghost btn-sm">닫기</button>
    <button class="btn btn-primary btn-sm">저장</button>
  </div>
</aside>
```

- 기본: 우측에서 슬라이드인 (`.drawer-left`로 좌측 변형)
- 폭 540px (모바일에서 `calc(100vw - 48px)`)
- 모달보다 많은 정보량을 유지해야 할 때 사용

**Variant**: `.drawer-wide` — 폭 960px. 컴팩트 테이블처럼 가로 공간이 많이 필요한 경우.
```html
<aside class="drawer drawer-wide" role="dialog">...</aside>
```

### 7.10 Progress

```html
<div class="progress"><div class="progress-bar" style="width:42%"></div></div>
<div class="progress progress-indeterminate"><div class="progress-bar"></div></div>
```

사이즈: `.progress-sm` (4px) / `.progress-lg` (10px)
상태: `.is-success` / `.is-warning` / `.is-error`

### 7.11 Icons

- stroke 1.5px, 24px grid, `round` join
- 크기 클래스: `.icon-xs/sm/md/lg/xl` (12/14/16/20/24)
- 공통 속성 클래스 `.icon-stroke` 적용 시 `fill:none; stroke:currentColor`

```html
<svg class="icon icon-md icon-stroke" viewBox="0 0 24 24"><!-- path --></svg>
```

### 7.12 Divider

```html
<hr class="divider">          <!-- light -->
<hr class="divider divider-strong">
<span class="divider-vertical"></span>
```

### 7.13 Navigation (Sidebar)

- 배경 `--bg-surface`, 폭 240px
- 메뉴 아이템 높이 40px, 좌측 패딩 12px
- **활성 메뉴**: `--accent-light` 배경 + `--accent` 텍스트 + **좌측 3px 액센트 바** (`::before`)
- 그룹 헤딩: `.text-overline` 스타일
- 카운트 배지: `.nav-count` — min-width 20px, 활성 시 `--accent` 솔리드

### 7.14 Header
- 배경 `--bg-surface`, 높이 56px, 하단 `1px solid --border-default`
- 로고 28px (사이드바 내부) / 헤더 탭 underline은 `--accent` 2px
- 유저 아바타 32px (`--avatar-md`)
- 모바일에서 `.h-menu-btn` 햄버거 표시

### 7.15 Country Selector — Primary 필터

다국가 데이터를 다루는 페이지(캘린더, 인플루언서 탐색 등)에서 **항상 하나의 국가가 선택된** primary 필터.

```html
<div class="country-selector-wrap">
  <button class="country-selector" aria-haspopup="listbox" aria-expanded="false">
    <svg><!-- globe --></svg>
    <span class="country-selector-label">국가</span>
    <span class="country-selector-value" data-code="JP">일본</span>
    <svg><!-- chevron --></svg>
  </button>
  <ul class="country-dropdown" role="listbox">
    <li role="option" data-code="KR">한국<span class="country-dropdown-code">KR</span></li>
    <li role="option" data-code="JP" aria-selected="true">일본<span class="country-dropdown-code">JP</span></li>
    ...
  </ul>
</div>
```

- 좌측 globe 아이콘(accent 컬러), `국가` overline 라벨, 선택된 값, ▾ chevron
- 호버 시 border-strong, 포커스 시 accent focus ring
- 드롭다운은 `--z-popover` 레벨, max-height 360px 스크롤
- **× 제거 버튼 없음** — 국가는 필수 필터, 항상 1개 선택
- 선택 시 `aria-selected="true"` + accent-light 배경 + 체크마크
- ESC / 백드롭 클릭으로 닫힘
- 일반 filter chip과 구분: filter-chip은 optional, country-selector는 required

### 7.16 Calendar System

3개의 하위 컴포넌트로 구성:

**(a) Month Navigation** — `.cal-monthnav`

3분할 그리드 (이전 달 | 현재 달 | 다음 달 + 오늘 버튼):

```html
<div class="cal-monthnav">
  <button class="cal-monthnav-side cal-monthnav-prev">
    <svg><!-- ‹ --></svg>
    <span><small>이전 달</small>2026년 3월</span>
  </button>
  <h2 class="cal-monthnav-title">2026년 4월</h2>
  <div class="cal-monthnav-actions">
    <button class="cal-today-btn">오늘</button>
    <button class="cal-monthnav-side cal-monthnav-next">
      <span><small>다음 달</small>2026년 5월</span>
      <svg><!-- › --></svg>
    </button>
  </div>
</div>
```

**(b) Month Grid** — `.cal`

- 7열 그리드 (일~토)
- `.cal-dow` 요일 헤더 (일=error, 토=info)
- `.cal-cell` 셀 (120px min-height), `[data-day]` 있으면 클릭 가능(role=button)
- `.cal-day` 날짜 숫자 (`.today` = accent 배경 원형, `.sun`/`.sat` 요일 색)
- `.cal-cell.is-selected` = accent 2px 인셋 보더 + accent-light 배경
- `.cal-cell.other-month` = 전후 달 뮤트

**(c) Event Pills** — `.cal-event`

```html
<button class="cal-event cal-event-accent">
  <span class="cal-event-dot"></span>캠페인 시작
</button>
```

Variant: `cal-event-{accent|info|warning|success}` — 이벤트 타입별 컬러

**(d) Day Detail Table** — `.day-tbl` (Drawer 내부)

날짜 클릭 시 `.drawer-wide` 안에 렌더되는 테이블. 원본 어드민의 9컬럼 테이블을 현대화.

```html
<div class="day-tbl-wrap">
  <table class="day-tbl">
    <thead>
      <tr>
        <th class="col-campaign">캠페인</th>
        <th>상태 / 모집</th>
        <th>신청</th><th>선정</th><th>리뷰 등록</th>
        <th>리뷰 마감</th><th>결과 발표</th>
        <th>등록 / 수정</th><th>조회</th>
      </tr>
    </thead>
    <tbody><!-- 행들 --></tbody>
  </table>
</div>
```

행 구조 (`.col-campaign` 셀):
- `.day-tbl-thumb` — 36x36 썸네일
- `.day-tbl-camp-name` — 캠페인 이름
- `.day-tbl-camp-meta` — `<code>` 캠페인코드 (mono badge)
- `.day-tbl-sns` — 별도 줄에 SVG SNS 아이콘 나열 (wrap)

날짜 셀 (`.day-tbl-date`):
- 첫 줄: 날짜 `04-17`
- 둘째 줄 `<small>`: 인원 수 `2/7`
- `.is-today` → 좌측 accent dot + accent 컬러로 오늘에 해당하는 단계 강조

**(e) Event Type Filter Tabs** — `.day-event-filter`

Drawer 상단에 표시되는 이벤트 타입 필터 (pill-style):

```html
<div class="day-event-filter" role="tablist">
  <button class="day-event-filter-btn is-active" data-type="all">전체<span class="count">3</span></button>
  <button class="day-event-filter-btn" data-type="accent">신청<span class="count">1</span></button>
  <button class="day-event-filter-btn" data-type="info">진행<span class="count">1</span></button>
  <button class="day-event-filter-btn" data-type="warning">마감<span class="count">1</span></button>
</div>
```

- 액티브 시 `--bg-surface` 배경 + `--shadow-xs`
- 카운트는 accent-light 배경 (액티브) / bg-elevated (비액티브)

---

## 8. Focus & Accessibility

- 모든 인터랙티브 요소 `:focus-visible` → 2px accent outline + 2px offset
- 버튼/인풋 포커스 링: `--focus-ring` (`0 0 0 3px var(--accent-light)`)
- 스킵링크(`.skip-link`) 필수 (Tab 첫 이동으로 도달 가능)
- 모달/드로어: `role="dialog" aria-modal="true" aria-labelledby="..."`
- `prefers-reduced-motion` 기본 대응

---

## 9. Do's and Don'ts

### Do
- Pretendard + 숫자 `tabular-nums`
- 알파콜라보 레드를 **소면적** 단일 액센트로
- Status는 dot + text 조합
- Empty State + CTA 포함 (모든 리스트/검색 화면)
- 한국어 샘플 데이터 (김민지, 박지영) — 실제같은 이름 사용
- SNS 채널은 정해진 컬러만

### Don't
- 순수 블랙 `#000` 금지 → `--neutral-900` 또는 `--text-primary`
- 액센트를 넓은 면적에 채우지 않기 (사이드바 활성도 accent-light + 3px bar)
- 3개 이상 강조색 혼용 금지
- 국기 이모지를 디자인 요소로 사용 금지 → `country-code` 칩 사용
- 모달 남용 금지 — 정보 많으면 Drawer, 간단 편집은 인라인
- 아이콘만으로 의미 전달 금지 → 텍스트 라벨 병기
- Lorem Ipsum / AI 클리셰("혁신적", "원활한", "Elevate", "Seamless") 금지
- 다크 배경 금지 (로그인 포함 전체 라이트)
- Cyan/Teal 등 정의되지 않은 컬러 금지

---

## 10. 2025 Modern Admin Patterns

현대 어드민(Linear / Notion / Vercel / Raycast / Airtable) 레퍼런스 기반.
전 컴포넌트는 `common.css` 내 "2025 Patterns" 섹션에 정의.

### 10.1 Command Palette (⌘K)

```html
<!-- 자동 주입: js/components.js 로드 시 body 끝에 #cmdk 생성 -->
<!-- 단축키: ⌘K (Mac) / Ctrl+K (Win) / "/" (focus body) -->
```

- ↑↓로 이동, ↵로 실행, Esc로 닫기
- 그룹별 섹션 헤딩 (네비게이션 / 액션 / 디자인 시스템 등)
- 헤더의 `.h-search` 입력란이 자동으로 ⌘K 트리거로 변환됨

**권장**: 각 페이지 전역 동작이므로 신규 메뉴 추가 시 `components.js`의 `COMMANDS` 배열만 수정.

### 10.2 Bulk Action Toolbar

```html
<div class="tbl-wrap" data-bulk-scope="#my-bulk-bar">
  <table class="tbl">
    <thead><tr><th class="c-chk"><input type="checkbox"></th>...</tr></thead>
    <tbody><tr><td class="c-chk"><input type="checkbox"></td>...</tr></tbody>
  </table>
</div>

<div class="bulk-bar" id="my-bulk-bar">
  <span class="bulk-count"><strong data-bulk-count>0</strong>개 선택</span>
  <span class="bulk-divider"></span>
  <button class="bulk-action">일괄 채택</button>
  <button class="bulk-action bulk-action-danger">거절</button>
  <button class="bulk-close">×</button>
</div>
```

- 선택 행이 있을 때만 스프링 모션으로 등장
- `bulk-close` 클릭 시 전체 체크 해제
- 검정 배경 + 둥근 pill 형태 (Linear/Notion 스타일)

### 10.3 Filter Chips — Legacy (deprecated)

> **본 프로젝트에서는 `chip-bar-summary` 패턴으로 대체됨** (10.14 참조).
> 이 섹션은 참조용으로만 남아 있으며, 편집 가능한 필터 칩이 필요한 다른 프로젝트용 레퍼런스입니다.

```html
<div class="filter-chips">
  <div class="filter-chip">
    <strong>국적</strong>일본
    <button class="filter-chip-remove">×</button>
  </div>
  <button class="filter-chip-add">+ 필터 추가</button>
  <button class="filter-chip-clear">전체 해제</button>
</div>
```

- 이 패턴의 제한: × 버튼은 제거만 가능하고 값 편집 UI가 별도 팝오버로 필요함
- 편집 팝오버를 구현하지 않을 경우 칩 본체 클릭이 무동작이라 혼란
- 본 프로젝트는 read-only 요약 텍스트(`chip-bar-summary`)로 전환

### 10.4 Density Toggle

```html
<div class="density-group" role="group" aria-label="테이블 밀도">
  <button class="density-btn" data-density="compact">≡≡</button>
  <button class="density-btn" data-density="default" aria-pressed="true">≡</button>
  <button class="density-btn" data-density="comfortable">= =</button>
</div>
```

- `body[data-density="compact"]` → 테이블 row padding 6px
- `body[data-density="comfortable"]` → padding 16px
- 사용자 설정은 `localStorage`에 저장 (페이지 전환 후에도 유지)

### 10.5 Kbd (Keyboard Hint)

```html
<kbd class="kbd">⌘</kbd><kbd class="kbd">K</kbd>
<span class="kbd-group">
  <kbd class="kbd">G</kbd><span class="kbd-sep">then</span><kbd class="kbd">L</kbd>
</span>
```

사이즈: `.kbd-sm` (16px).
메뉴 / 툴팁 / 빈 상태 등 어디든 단축키 명시에 사용.

### 10.6 Avatar Stack

```html
<div class="avatar-stack">
  <span class="avatar avatar-md" style="background:#FCE7F3;color:#BE185D">민</span>
  <span class="avatar avatar-md" style="background:#DBEAFE;color:#1D4ED8">지</span>
  <span class="avatar avatar-md" style="background:#DCFCE7;color:#15803D">수</span>
  <span class="avatar-stack-more">+4</span>
</div>
```

- 마우스 오버 시 약간 상승(`translateY(-2px)`)
- 오버플로우는 `.avatar-stack-more`로 표시
- 이미지 대신 이니셜+배경색 조합 권장 (실제 업로드 전 mockup)

### 10.7 Inline Copy Button

```html
<div class="copyable" data-copy="1739439117">
  <span class="text-data">1739439117</span>
  <button class="copy-btn" aria-label="코드 복사">📋</button>
</div>
```

- 호버/포커스 시에만 버튼 표시
- 복사 성공 시 체크 아이콘으로 1.4초간 피드백
- `components.js`의 `wireCopyButtons`가 자동으로 클립보드 API 연결

### 10.8 Status Pulse (Live indicator)

```html
<span class="badge badge-info badge-md">
  <span class="status-pulse is-info"></span>진행중
</span>
```

- 진행 중 / 라이브 상태에만 사용 — 완료/거절은 일반 `.badge-dot`
- 과용 금지. 페이지당 3개 이하 권장

### 10.9 KPI Card + Sparkline

```html
<div class="kpi-card">
  <div class="kpi-head">
    <span class="kpi-label">활성 캠페인</span>
    <span class="kpi-icon"><svg>...</svg></span>
  </div>
  <div class="kpi-row">
    <span class="kpi-value">47</span>
    <span class="kpi-delta kpi-delta-up">↑ 12%</span>
  </div>
  <div class="kpi-sub">지난 주 대비</div>
  <svg class="kpi-spark" viewBox="0 0 240 40" preserveAspectRatio="none">
    <path class="spark-area" d="..."/>
    <path class="spark-line" d="..."/>
  </svg>
</div>
```

- SVG 경량 스파크라인 (차트 라이브러리 불필요)
- `.kpi-delta-up/down`으로 증감 컬러 반전
- `viewBox="0 0 240 40"` 고정 — 반응형은 CSS width로만

### 10.10 Activity Timeline

```html
<ul class="timeline">
  <li class="timeline-item">
    <span class="timeline-dot timeline-dot-accent"></span>
    <span class="timeline-title">김민지 님이 리뷰를 제출했습니다</span>
    <span class="timeline-meta">2026-04-17 오전 9:42 · 로담한의원</span>
    <div class="timeline-body">추가 설명 텍스트</div>
  </li>
</ul>
```

- 좌측 dot + 연결선 자동 렌더
- Dot 변종: `.timeline-dot-accent / success / warning`
- 캠페인 상태 변경 히스토리에 사용

### 10.11 Glass Sticky Header

```css
.header.glass {
  background: color-mix(in srgb, var(--bg-surface) 80%, transparent);
  backdrop-filter: saturate(180%) blur(10px);
}
```

- 스크롤이 헤더를 지나면 `.glass` 클래스 토글 (JS)
- iOS/Safari 호환 위해 `-webkit-backdrop-filter` 함께 지정됨

### 10.12 Staggered Entry

```html
<ul class="stagger">
  <li>첫 번째</li>
  <li>두 번째</li>
  ...
</ul>
```

- 자식 요소가 30ms 간격으로 순차 진입
- 리스트/카드 그리드에 적용
- `prefers-reduced-motion`에서 자동 비활성

### 10.14 Chip Bar Summary — 활성 필터 요약

Filter Chips(편집 팝오버 요구)의 대체 패턴. read-only 텍스트로 활성 조건 표시.

```html
<div class="chip-bar">
  <div class="chip-bar-summary">
    <span class="f-summary-label">현재 조건</span>
    기간 <strong>전체</strong>
    <span class="f-summary-sep">·</span>
    접속기기 <strong>전체</strong>
  </div>
  <div class="chip-bar-right">
    <!-- 필터 토글 아이콘 + 밀도 토글 -->
  </div>
</div>
```

**장점**
- 편집 불가 → "누를 수 있는 것처럼 보이지만 안 됨" 혼란 제거
- 편집은 **전체 필터 패널**(우측 깔때기 아이콘) 하나의 경로로 통합
- chip-bar 좌우 비율 안정

**본 프로젝트 적용 범위** — 11개 리스트·필터 페이지 전부

**Variant** — `.f-summary` 는 필터 패널 내부 요약용 (동일 스타일, 하단 border로 구분). 현 프로젝트는 chip-bar 버전만 사용.

### 10.13 Subtle Grain Overlay (optional)

```html
<body class="has-grain">...</body>
```

- 2.5% 투명도의 SVG 노이즈 텍스처 풀스크린 오버레이
- 플랫한 디지털 느낌을 완화하고 깊이감 부여
- `pointer-events: none` — 인터랙션 영향 없음

---

## 11. 개발자 인수인계 체크리스트

- [ ] `css/common.css` + `css/admin.css` 복제 후 Tier 1/2/3 토큰만 프로젝트 테마에 맞춰 조정
- [ ] HTML 파일의 `<div id="sidebar-slot">` / `<div id="header-slot">`은 서버 사이드 include로 대체
- [ ] `js/components.js`의 `fetch` 로직은 백엔드 템플릿 엔진으로 대체 가능
- [ ] Status Badge / Tabs / Toast / Drawer 컴포넌트는 라이브러리 없이 순수 CSS로 동작
- [ ] `prefers-reduced-motion` / `:focus-visible` / ARIA 속성은 그대로 유지
- [ ] 신규 컴포넌트 추가 시 반드시 Semantic 토큰 사용, raw hex 직접 사용 금지

참고: `design-system.html`에서 모든 토큰과 컴포넌트의 실제 렌더링을 확인할 수 있습니다.
