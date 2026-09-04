후속 확인 요청 (같은 주제, 읽기 전용, 파일 수정 금지, 출력은 표/불릿만).

너의 1차 보고를 재판정해 아래처럼 적용했다. 항목 4(호버는 캠페인 행 단위)는 반려했다 — rowspan 셀(인플루언서·묶음·기준 일정)이 첫 행에만 붙어 있어 2·3번째 캠페인 행에 hover하면 왼쪽 절반은 흰색, 오른쪽만 회색인 반쪽 하이라이트가 되기 때문. 체크박스가 묶음 단위이므로 hover도 묶음 단위 유지.

적용 규칙(어드민 전체):
- 행 hover = --bg-subtle(neutral-50)
- 선택 행 = --bg-subtle + 첫 셀 box-shadow: inset 3px 0 0 var(--accent)
- 선택 행 hover = --bg-hover(neutral-100)  ← 너는 "동일 유지"라 했지만 선택 행에서 마우스 반응이 사라져 한 단계 올렸다
- 선택이 hover보다 우선. --accent-light는 --status-error-bg와 같은 값(#FEF2F2)이라 행 선택에 사용 금지.

적용 파일: css/admin.css 1343-1358(행 상태), 1368-1370·1385-1387(has-sticky 고정 컬럼), css/superpass.css 47-52(묶음 단위), docs/DESIGN.md §7.3.

확인할 것 (각 항목 `파일:라인 + 판정(OK/수정) + 근거` 형식):
1. 위 CSS를 실제로 읽고, 선택 우선순위가 cascade 순서나 specificity에 의존하지 않고 보장되는지. 깨지는 조합이 있으면 정확한 셀렉터로 지적.
2. has-sticky 고정 컬럼(td.c-chk, td.sticky-col)은 배경을 따로 가지는데 3가지 상태 모두 본체 행과 같은 값인지.
3. 좌측 3px 바를 첫 셀 inset box-shadow로 넣은 방식의 리스크(sticky z-index, border-collapse, 셀 padding과 체크박스 겹침). 더 안전한 토큰 기반 대안이 있으면.
4. 선택 행 hover를 neutral-100으로 올린 내 보정에 대한 판정.
5. DESIGN.md §7.3에 넣을 최종 규칙 문장을 3줄 이내로 확정해라 (토큰명만 사용).
