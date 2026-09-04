# 검토 요청: 어드민 테이블 행 호버·선택(체크) 상태 규칙 — 전체 어드민 기준

너는 읽기 전용 리뷰어다. 파일을 수정하지 말고 보고서만 써라. 웹 검색으로 레퍼런스(Linear, Stripe Dashboard, Airtable, Notion DB, Shopify Polaris IndexTable, Atlassian, Material Data Table 등)의 행 hover/selected 처리 관행을 1~3곳 확인해 근거로 붙여라.

## 맥락
- 프로젝트: 알파콜라보 브랜드사 어드민(광고주가 직접 쓰는 웹 어드민). 규칙 문서 docs/DESIGN.md, docs/styleseed-rules.md, 프로젝트 규칙 CLAUDE.md.
- 첨부 이미지 2장: 슈퍼패스 1차신청목록(superpass-first-review.html) 테이블.
  - 이미지 1 = 행 hover: 묶음(tbody.sp-bundle) 전체가 회색(--bg-hover = neutral-100 #F0F0F0)으로 채워짐.
  - 이미지 2 = 체크박스 선택: 묶음 전체가 레드 틴트(--accent-light = red-50 #FEF2F2). 브랜드 액센트가 레드(#E53935 계열)라 선택 행이 "에러/경고"처럼 읽힐 우려.
- 현재 규칙(전 테이블 공통): css/admin.css:1345 `.tbl tbody tr:hover{background:var(--bg-hover)}`, 1369/1385 선택 행 `--accent-light`. docs/DESIGN.md:390-391 "행 호버 --bg-hover / 선택 행 --accent-light". 슈퍼패스는 css/superpass.css:47-49에서 묶음(tbody) 단위로 같은 규칙 적용.
- 이 테이블은 한 인플루언서의 신청 묶음이 3개 캠페인 행으로 rowspan 되어 있고, 행 안에 버튼(1차 컨펌 완료 primary red, 미선정, 상세보기)·배지·날짜 칩이 많다.
- 절대 금지: 새 기능/새 컬럼/새 화면 제안. 토큰 밖 raw hex 제안 금지(있으면 토큰 이름으로).

## 질문 (각각 결론 + 근거 + 리스크)
1. 행 hover에 회색 전체 채움이 맞나? 정보 밀도가 높고 버튼·칩이 많은 행에서 hover 채움이 오히려 소음이 되는지. 대안: hover 제거 / 더 옅게(neutral-50) / 좌측 바만 / 행 경계만.
2. 선택 행에 브랜드 레드 틴트(red-50)가 맞나? 레드 = 에러 의미와 충돌하는지. 대안: 중립(neutral-100/50) + 좌측 accent 바 / 파랑 info-bg / 체크박스 컬럼만 색 / 테두리만. 레드 primary 버튼(1차 컨펌 완료)이 레드 틴트 위에 올라갈 때 대비·위계 문제.
3. hover와 selected가 동시에 걸릴 때(선택된 행 위에 마우스) 규칙. 지금은 hover(회색)가 선택(레드)을 덮을 수 있음.
4. 묶음(rowspan 3행) 단위 강조가 맞나, 캠페인 행 단위가 맞나? 1차 컨펌 버튼은 캠페인 행마다 있는데 선택은 묶음 단위인 불일치.
5. 위 결론을 어드민 전체 규칙 한 줄(DESIGN.md 7.x에 넣을 문장)로 써라. 토큰만 사용.

## 보고 형식 (고정)
- 항목마다: `파일:라인 + 현재값→제안값 + 근거(레퍼런스 URL 포함)`. 산문 금지, 표 또는 불릿.
- 마지막에 "우선순위 상위 3개"만 따로.
