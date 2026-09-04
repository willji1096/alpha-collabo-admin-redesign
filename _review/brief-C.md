# 감사 C — 디자인 시스템 정합 + 샘플데이터 드리프트 + 접근성
대상: css/common.css, css/admin.css, app/css/app-mobile.css, design-system.html, 그리고 전 HTML의 style/class 사용 실태
목표: 토큰 체계가 실제로 지켜지는지 수치로 검증.

## 체크 항목
1. raw 값 위반: HTML inline style·CSS에서 토큰 대신 raw hex/raw px 직접 사용 — 파일:라인 전수(대표 + 동일 목록으로 압축).
2. 토큰 중복·충돌: common.css와 admin.css, app-mobile.css 사이에 같은 의미의 변수가 이름만 다르게 존재하는 것.
3. 죽은 CSS: 어느 HTML에서도 안 쓰이는 클래스 선택자(대표 20개).
4. design-system.html에 이미 있는 컴포넌트를 페이지에서 재정의(중복 구현)한 사례.
5. 폰트 웨이트 3단(400/500/700) 이탈, 라운드 4단 이탈, 그림자 규격 이탈.
6. 샘플데이터 드리프트 전수: 국기 이모지, test/milla/John Doe류 이름, 둥근 숫자(50%·100,000·1,000 등), Lorem, AI 클리셰.
7. 접근성: focus-visible 정의 여부, prefers-reduced-motion, 아이콘 전용 버튼의 aria-label 누락, 대비 의심 조합(토큰 값으로 계산).
8. 터치 타깃: 앱 화면에서 44px 미만 인터랙티브 요소.
