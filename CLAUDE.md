# 알파 콜라보 어드민 개선 프로젝트

## 프로젝트 개요
- **목적**: 기존 알파 콜라보 어드민의 화면 디자인 개선
- **우리 역할**: 디자인(HTML/CSS 목업) 산출물 제작 — 개발은 개발팀이 직접 수행
- **산출물**: 개선된 화면 디자인 (HTML/CSS, 필요 시 Figma)
- **전달 방식**: 코드가 Source of Truth — `docs/DESIGN.md` + `css/common.css` + `css/admin.css` + 개별 화면 HTML

## 서비스 플로우
1. **클라이언트(고객)**: 어드민에서 상품/캠페인 등록
2. **인플루언서**: 알파콜라보 앱으로 캠페인 지원 (예: 10명 모집에 100명 지원)
3. **클라이언트**: 어드민에서 인플루언서 채택
4. **캠페인 진행**: 채택된 인플루언서가 캠페인 수행

## 디자인 원칙 (필수 준수)
- **`docs/DESIGN.md`가 단일 기준** — raw hex·raw px 직접 사용 금지, Semantic/Component 토큰만 사용
- **`docs/redesign-skill.md`** 체크리스트로 AI 클리셰·일반 패턴 제거 여부 검증
- **`docs/styleseed-rules.md`** 대시보드·테이블 공통 규칙 적용
- `design-system.html`에 이미 존재하는 컴포넌트는 **그대로 재사용** (중복 생성 금지)

## 샘플 데이터 규칙 (위반 = drift)
- **국기 이모지 사용 금지** (🇯🇵 🇰🇷 🇷🇺 등) — `<span class="c-country-code">JP</span>` 칩으로만
- **테스트성 이름 금지** (`milla`, `milla2`, `test`, `test5`) — 실제같은 글로벌 인플루언서 핸들 사용
  - 예: `mika_seoul`, `natasha_mood`, `yuki_tokyo`, `kumi_osaka`, `lina_k`
- 숫자는 둥근 값(`50%`, `100,000`) 대신 유기적 값(`47.2%`, `180,000`) 사용
- Lorem Ipsum / `John Doe` / AI 클리셰(`Elevate`, `Seamless`, `Next-gen`) 금지

## 작업 규칙
1. **진단 → 개선** — 기존 화면 자료를 받으면 먼저 문제 진단, 그 다음 개선안 제작
2. **Before/After 비교 가능한 형태**로 작업
3. **컴포넌트 단위** — 사이드바·헤더는 `components/*.html`에 한 번만, 페이지별 inline 금지
4. **인수인계 고려** — CSS 변수, 컴포넌트 클래스, 네이밍 규칙 통일
5. **접근성** — ARIA, `:focus-visible`, `prefers-reduced-motion` 유지

## AI 에이전트 활용 (~/Desktop/prompt-vault/personas)

### 작업 중 수시 호출
- **`drift-watcher`** — 편집한 HTML 붙여넣기 + DESIGN.md 기준으로 일탈(국기 이모지, 테스트 이름, raw px 등) 즉시 탐지
- **`scope-watcher`** — 새 화면 착수 직전 "이 작업이 디자인 범위 내인가" 판정

### 마무리 단계
- **`design-qa-inspector`** — 화면 완성 직후 8개 카테고리 Ship/Not Ship 판정
- **`handoff-inspector`** — 커밋 직전 "개발팀 전달 가능한 형식인가" 검수

### 신규 화면 제작 시
- **`designer-ui-microcopy`** — 빈 상태/에러/로딩 문구 일괄 초안
- **`designer-mobile-ux-checklist`** — 1280/1024/768 브레이크포인트 검증

## 커밋 규율
- **작업 단위로 커밋** — 한 화면 추가, 한 카테고리 리팩터링 등
- 메시지 형식: `[scope]: 행위` 예: `list: 국기 이모지 → country-code 칩 치환`
- 대형 일괄 수정은 근거(DESIGN.md §9 등)를 본문에 기재

## 배포
- Netlify 설정: `netlify.toml`
- 프리뷰 공유는 커밋 푸시 후 Netlify가 자동 빌드
