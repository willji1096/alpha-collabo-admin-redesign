# Alphacollabo V2 — Instagram Light Design System

**단일 기준.** 모든 V2 화면은 이 문서를 따른다. raw hex/px 직접 사용 금지 — `css/tokens.css` 변수만.

## 0. 정체성

| 항목 | V1 (기존 화면 개선) | V2 (이 문서) |
|---|---|---|
| 톤 | 도구적 · Linear-tone | **Instagram 라이트** |
| 폰트 | Sans 단일 | **Sans 단일** (명조·세리프 금지) |
| 액센트 | 빨강 #EE2128 (V1) | **V1 브랜드 레드 #EE2128 (sparingly)** — CTA·매칭 결정·강조에만 |
| 보더 | 강조 (1px 회색) | IG 페이드 1px (#DBDBDB) — 카드/섹션/입력 모두 |
| 배경 | 따뜻한 오프화이트 | **순백 #FFFFFF** + 페이드 #FAFAFA |
| 데이터 밀도 | 높음 | 보통 (탐색 톤) |
| 카드 | 텍스트 우선 | **사진 우선 (1:1 정사각형 커버)** |
| 정체성 | 인수인계 도구 | **셀프서비스 매칭 플랫폼** (IG 피드 톤) |

V2는 V1의 어떤 자산도 참조하지 않는다 (`../css/`, `../components/` 금지). 완전 독립 트랙.

## 1. 자원 모델 (제품 비전)

가치 단위가 "사람의 손길" → "**매칭 횟수**"로 이동.

- **구독 (정액)** — 월 매칭 N회 포함. 탐색 권한. 자산 게이팅.
- **캠페인 충전금** — 인플루언서 비용 (캠페인 단위 차감). 자동결제 가능.

매칭 횟수가 자산 보호 메커니즘. 매칭 이전엔 정보 마스킹 (이름 ●●●●, 아바타 blur, 핸들 ●●●), 매칭 시점에 정보 풀림 + 매칭 카운트 1회 차감.

## 2. 토큰

핵심 파일: `v2/css/tokens.css`. 직접 참조하지 말고 시맨틱 변수 사용.

### Color
- `--bg-page` (#FFFFFF), `--bg-surface` (#FFFFFF), `--bg-elevated` (#FAFAFA), `--bg-hover` (#F5F5F5)
- `--text-primary` (#262626 · IG 텍스트), `--text-secondary` (#8E8E8E · IG 보조), `--text-tertiary` (#A8A8A8)
- `--accent` (#EE2128 · V1 브랜드 레드, **sparingly** — CTA/매칭/강조), `--accent-hover` (#C81C22), `--accent-light` (#FDEDEE)
- 정보·보조: `--blue-500` (#0095F6) — info 상태, 포커스 외 보조 액센트로만
- `--like` (#ED4956 · IG 하트 빨강)
- `--grad-stories` — IG 브랜드 그라디언트 (FFC371 → F58529 → DD2A7B → 8134AF → 515BD4)
- `--border-default` (#DBDBDB · IG 기본 보더)

### Typography
- `--font-sans` Pretendard Variable (모든 영역) — IG는 system font 톤이지만 한글 가독성 위해 Pretendard
- 명조·세리프 금지
- weight: regular(400) · medium(500) · semibold(600) · bold(700) · **heavy(800)** — heavy는 페이지 타이틀·KPI 등 강조용
- Scale: 11/12/13/14/15/17/20/24/30/40 (`--fs-2xs` … `--fs-display`)

### Spacing (8pt scale)
- `--space-1` 4px … `--space-11` 96px

### Radius
- `--radius-md` 8px (IG 기본 — 사진/카드/버튼) / `--radius-lg` 12px / `--radius-full`

### Shadow
- 매우 가볍게 (IG는 그림자 거의 안 씀). `--shadow-xs/sm` 정도만.

## 3. 컴포넌트 규율

### 보더 사용
- IG는 모든 카드·인풋·섹션에 1px (#DBDBDB) 보더 사용 — 그림자 대체
- ✅ Card · Influencer Card · Filter Bar · Input · Sidebar (우측 1px)
- ❌ outline 버튼 폐기 (단, `.btn-outline`은 follow 버튼 톤 한정)

### Card
- `.card` border 1px (default — IG 톤)
- `.card-elevated` shadow-sm + 약한 보더 (헤로 영역)
- `.card-soft` elevated bg only (보더 없음 — 정보 그룹)
- `.card-hoverable` hover lift

### Button
- `btn-primary` (IG 블루 filled) · `btn-secondary` (gray filled) · `btn-ghost` · `btn-subtle` (blue tint) · `btn-outline` (follow 톤)
- 사이즈: `btn-sm` 30px / default 36px / `btn-lg` 44px
- font-weight: bold (IG는 두꺼운 weight)

### Avatar
- `.avatar-ring` — IG 스토리스 그라디언트 보더 (매칭 가능·신규 표시용)
- `.avatar-ring.is-seen` — 회색 보더 (이미 본 항목)
- `.verified` — 파란 체크 배지 (인증 인플루언서)

### Influencer Card (IG photo-first)
- 1:1 정사각형 커버 (사진 dominant)
- 커버 아래 액션 row: **하트 / 메시지 / 공유 / 저장** (IG 4종 액션 아이콘)
- 이름 + 핸들 (sans only)
- 메타 칩 (플랫폼 / 국가 / 카테고리)
- 통계 inline (팔로워, 참여율 — 숫자 bold)
- 가격 + 매칭 버튼 (footer)
- 마스킹 시 `.is-masked` (이름 ●●●●), `.inf-card-cover-blur` (filter blur 14px)
- 매칭됨: `is-matched` (파란 1px 보더 강조)

### Lock Pill (커버 좌상단)
- default — black overlay
- `.is-grad` — IG 브랜드 그라디언트 (예산 영역 안 카드)
- `.is-matched` — 파란 단색 (매칭됨)

### Match Meter
- 사이드바 잔여 매칭 표시
- bar fill = `var(--grad-stories)` (IG 그라디언트로 시각 강조)

## 4. 아이콘 규율

IG 스타일 라인 아이콘:
- stroke-width: **1.8** (default), **2** (가는 영역), **2.4** (작은 잠금/체크)
- stroke-linecap/linejoin: **round**
- 크기: 18-22px (UI), 14-16px (인라인)
- 4대 액션 아이콘 일관: **하트 (heart)** / **메시지 (paper plane chat)** / **공유 (paper plane outgoing)** / **저장 (bookmark)**
- 활성 상태: outline → filled (예: 하트 좋아요 시 빨강 fill, 저장 시 검정 fill)

## 5. 화면 라인업

| 번호 | 파일 | 상태 | 역할 |
|---|---|---|---|
| 01 | `login.html` | ✅ Ready | 로그인 (data: contact@glowlab.kr / alpha2025) |
| 02 | `dashboard.html` | ✅ Ready | KPI · 진행 캠페인 · 활동 타임라인 · 매칭 미터 |
| 03 | `explore.html` | ⭐ Headline | 인플루언서 마스킹 그리드 + 예산 슬라이더 + 필터 패널 |
| 04 | `campaign-list.html` | ✅ Ready | 캠페인 전체 목록 (진행/검수/완료/초안) + 탭 + 필터 |
| 05 | `campaign-new.html` | ⭐ Magic | 예산 → 매칭 후보 자동 큐레이션 (5단계 wizard) |
| 06 | `campaign-detail.html` | ✅ Ready | 캠페인 1건 깊이 — KPI + 진행 타임라인 + 매칭 인플루언서 |
| 07 | `match-detail.html` | ⭐ Trust | 매칭 직후 정보 풀림 + 신뢰 시그널 분해 |
| 08 | `messages.html` | ✅ Ready | 자동번역 채팅 + 진행 단계 트래킹 |
| 09 | `saved.html` | ✅ Ready | 저장한 인플루언서 컬렉션 — 모아 캠페인 만들기 |
| 10 | `inspect.html` | ✅ Ready | 콘텐츠 검수 — 가이드라인 체크리스트 |
| 11 | `report.html` | ✅ Ready | 종료 캠페인 리포트 — KPI + 인플루언서별 성과 |
| 12 | `billing.html` | ✅ Ready | 플랜 · 매칭 사용 · 캠페인 잔액 · 영수증 · 플랜 비교 |
| 13 | `settings.html` | ✅ Ready | 회사 정보 · 멤버 · 알림 · 보안 · API 5탭 |
| DS | `design-system.html` | ✅ Ready | 컴포넌트 라이브러리 쇼케이스 |
| 게이트 | `index.html` | ✅ Ready | V2 narrative + 14개 화면 인덱스 |

## 6. 작업 규율

- **V1 자산 참조 금지** — `../css/`, `../components/`, `../js/` import 금지
- **명조·세리프 금지** — `font-family: serif`, Noto Serif, Cormorant 등 일체 사용 금지. Sans only.
- **컴포넌트 단위 작업** — 새 컴포넌트는 `v2/css/components.css`에 추가
- **샘플 데이터** — `glowlab_kr` 클라이언트, 글로벌 인플루언서 핸들 (`yuki_tokyo`, `natasha_mood`, `mei_xian`, `mika_seoul` 등). 테스트 이름·국기 이모지 금지

## 7. 라우팅

V2 페이지 간 이동은 모두 `v2/` 내부 상대경로. V1으로 돌아가려면 `../index-v1.html` 또는 `../login.html`. 게이트 = `../index.html`.

각 V2 페이지 우상단 fixed track-toggle pill — 한 번 클릭으로 V1↔V2.
