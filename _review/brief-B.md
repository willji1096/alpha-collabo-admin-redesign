# 감사 B — 웹 어드민 화면 + 공용 컴포넌트 기능 단위 점검
대상: 리포 루트 *.html(app/ 제외 전부), components/*.html, js/components.js
목표: **화면 하나하나, 버튼 하나하나** 동작 가능성 코드 레벨 검증.

## 체크 항목
1. 죽은 컨트롤 전수: `href="#"`/빈 href/핸들러 없는 button/미구현 onclick.
2. 링크 무결성: href 대상 파일 실제 존재 여부.
3. 사이드바(components/sidebar.html)·헤더(components/header.html) 메뉴 항목 ↔ 실제 페이지 매핑표. 메뉴에 있는데 파일 없는 것 / 파일은 있는데 메뉴에 없는 고아 페이지.
4. js/components.js: 각 페이지가 기대하는 초기화 함수·셀렉터가 실제로 존재하는지. 참조하는 DOM id/class가 어느 페이지에도 없는 죽은 코드.
5. 모달/드로어(components/modal-*.html, drawer-*.html): 어느 화면에서 열리는지 추적. 아무 데서도 안 열리면 고아 → 보고.
6. 신청목록 파이프라인(list*.html 8개): 상태 전이(선정→검수→수정→완료→취소) 화면 간 이동 링크가 서로 맞물리는지, 끊긴 지점.
7. 테이블: 정렬/필터/페이지네이션 컨트롤이 껍데기인지 실제 동작하는지.
8. 정책 위반: 브리프 공통 1~7 항목. 특히 chatbot.html·modal-message.html이 직접소통 금지에 저촉되는지 판정.
