## 감사 A 결과

대상: `app/phone/*.html` 실제 32개, `app/index.html`, `app/js/sheets.js`  
로컬 상대경로 링크 검사 결과: 끊긴 파일 링크 0건.

[P0] app/phone/inspection-detail.html:203-246 | 수정 요청 화면이 대화 스레드·메시지 입력·보내기 버튼을 제공 → 직접 메시징 UI 제거 및 구조화된 수정요청 액션으로 대체 | 도메인 규칙 2, `보내기` 버튼에 핸들러 없음

[P0] app/phone/balance-charge.html:59-68,99-115 | 금액 선택·직접 입력값과 무관하게 요약·확인 문구가 항상 1,000,000원 → 선택값으로 요약·확인값 연동 | 재현: 500,000 또는 직접 입력 선택 후에도 115라인 CTA가 1,000,000원 고정

[P0] app/phone/settlement-request.html:122-136 | 직접 입력값과 무관하게 정산 신청 문구가 2,180,000원 고정 → 입력값 검증·연동 | 재현: 125라인 값을 변경해도 136라인 확인 문구는 고정

[P0] app/phone/settlement-request.html:108 | `계좌 변경` 셀프서비스 버튼 → 버튼 제거 | 도메인 규칙 3, 계정 self-service 금지 및 핸들러 없음

[P0] app/phone/notice.html:111 | `인플루언서와의 연락은 담당 매니저를 통해 진행` → 해당 직접소통 유도 문구 삭제 | 도메인 규칙 2

[P1] app/phone/dashboard.html:445-449 | 하단 탭이 `홈/일정/신청서관리/인플루언서/더보기` → `홈/캠페인/인플루언서/일정/더보기` 및 화면별 active 정합 | SERVICE-FLOW §4, 동일: app/phone/balance-charge.html, balance-history.html, campaign-calendar.html, campaign-detail.html, campaign-edit.html, campaign-schedule-list.html, dashboard.html, guide.html, influencer-detail.html, influencer-search.html, inspection-detail.html, list-cancel-influencer.html, list-cancel-selected.html, list-completed.html, list-inspection.html, list-revision.html, list-selection.html, list-unselected.html, list.html, more.html, notice.html, notification-center.html, pricing-account.html, pricing-it.html, pricing-korea.html, pricing-superpass.html, pricing-translation.html, pricing.html, saved-influencer.html, settlement-request.html, visit-planned.html

[P1] app/phone/list.html:123 / app/js/sheets.js:44-59 | 확인 다이얼로그 확인 후 선정·목록·카운트 변화 없음 → 실제 액션 콜백 또는 상태 반영 연결 | `confirmDialog`는 `onOk`가 있을 때만 후속 처리하며 호출부에 `onOk` 없음, 동일: campaign-detail.html, campaign-edit.html, list-selection.html, list-revision.html, list-inspection.html, balance-charge.html, influencer-detail.html, influencer-search.html, saved-influencer.html, visit-planned.html, settlement-request.html, inspection-detail.html

[P1] app/phone/list.html:103-107 | 데이터 목록에 빈 상태·로딩·에러 마크업 없음 → 세 상태 마크업 제공 | styleseed-rules §30, 동일: campaign-schedule-list.html, list-selection.html, list-inspection.html, list-revision.html, list-completed.html, list-unselected.html, list-cancel-selected.html, notice.html, notification-center.html

[P1] app/phone/saved-influencer.html:188-193 | 빈 상태만 있고 로딩·에러 상태 없음 → loading/empty/error 상태 세트 제공 | styleseed-rules §30, 동일: balance-history.html, campaign-calendar.html, influencer-search.html, visit-planned.html, list-cancel-influencer.html

[P1] app/phone/list.html:108-123 | 모든 신청 카드가 정적 `influencer-detail.html`로 이동하고 상세 화면은 `kumi_osaka` 고정 → 신청자 식별자에 맞는 상세 데이터 전달 | 재현: `pianmy` 카드 클릭 후 `influencer-detail.html:69-77`에서 `kumi_osaka` 표시, 동일: campaign-detail.html, list-selection.html, list-completed.html, list-unselected.html, list-cancel-selected.html, influencer-search.html, saved-influencer.html, visit-planned.html

[P1] app/phone/list-inspection.html:33-46 | 각 검수 카드가 정적 `inspection-detail.html`로 이동하고 상세 신청자가 `pianmy`로 고정 → 신청번호·인플루언서별 상세 연결 | 재현: `yuki_tokyo`·`natasha_mood` 카드도 `inspection-detail.html:72-84`의 `pianmy` 표시, 동일: list-revision.html

[P1] app/phone/list.html:108-123 | 웹 원본의 회원정보·상세정보·인기게시물·수퍼패스·상태변경 필드가 폰 카드에서 누락 → 기존 원본 필드 복원 또는 상세 연결 | 비교 근거: 루트 `list.html:127-139`, 폰 `list.html:108-123`

[P1] app/phone/list.html:124 | `정보보기` 버튼에 핸들러가 없어 부모 링크의 정적 인플루언서 상세로만 이동 → 버튼을 실제 상세 액션에 연결 | 동일: list-selection.html:59, list-completed.html:57,80, list-unselected.html:46, list-cancel-selected.html:56

[P1] app/phone/campaign-detail.html:45-46 | `공유`, `더보기` 버튼에 핸들러 없음 → 실제 동작 연결 또는 버튼 제거 | `<button>`에 onclick·data-action 없음

[P1] app/phone/influencer-detail.html:61-62 | `저장`, `더보기` 버튼에 핸들러 없음 → 저장 토글·메뉴 동작 연결 또는 버튼 제거 | `<button>`에 핸들러 없음

[P1] app/phone/influencer-detail.html:86-90 | 인스타그램·틱톡 채널 링크가 모두 `href="#"` → 실제 채널 URL 연결 또는 링크 제거 | 죽은 링크

[P1] app/phone/influencer-detail.html:267-270 | `원본 게시물 보기`가 외부 URL 이동 없이 시안용 토스트만 표시 → 실제 원본 게시물 링크 연결 | 재현: 클릭 시 `인스타그램 원본으로 이동합니다 (시안)`만 표시

[P1] app/phone/login.html:68 | `비밀번호 찾기`가 `href="#"` → 실제 복구 동선 연결 또는 링크 제거 | 죽은 링크

[P1] app/phone/notice.html:29-31 | 전체/공지/이벤트 탭이 모두 `href="#"` → 분류별 목록 필터 연결 | 죽은 탭 링크

[P1] app/phone/visit-planned.html:25-29 | 국가 탭이 모두 `href="#"` → 국가별 방문 예정 목록 필터 연결 | 죽은 탭 링크

[P1] app/phone/influencer-search.html:110-115 | 국가 탭이 모두 `href="#"` → 국가별 검색 결과 필터 연결 | 죽은 탭 링크

[P1] app/phone/saved-influencer.html:29-32 | 전체/즐겨찾기/제안 대상/우수 탭이 모두 `href="#"` → 저장 목록 필터 연결 | 죽은 탭 링크

[P1] app/phone/balance-history.html:115,156,168,169,183,184,197,209,210,223,236,237,251,264,277,278,304,330,344,358,371 | 계정 URL·리뷰 URL이 모두 `href="#"` → 실제 URL 연결 또는 비활성 텍스트 처리 | 죽은 링크

[P1] app/phone/list.html:93-95 | 정렬 select에 onchange·스크립트 연결 없음 → 선택값으로 목록 재정렬 | 재현: 옵션 변경 후 목록 순서 불변, 동일: campaign-schedule-list.html:24-28, list-selection.html:35, list-completed.html:31, influencer-search.html:119

[P1] app/phone/list.html:435-444 | 검색 입력 후 `검색` 버튼이 시트만 닫음 → 검색어로 목록 갱신 | `sheets.js`에는 입력 클리어만 있고 검색 실행 로직 없음, 동일: dashboard.html, list-selection.html, list-completed.html, saved-influencer.html, notice.html

[P1] app/phone/list.html:447-485 | 필터 선택 후 `적용` 버튼이 시트만 닫음 → 선택 필터로 결과 목록 갱신 | 적용 핸들러가 `closeSheet`뿐, 동일: campaign-schedule-list.html, list-selection.html, list-inspection.html, list-revision.html, list-completed.html, list-unselected.html, list-cancel-influencer.html, saved-influencer.html, influencer-search.html, visit-planned.html, balance-history.html, campaign-calendar.html

[P1] app/phone/balance-history.html:417-429 | 국가·충전회차 필터 버튼에 핸들러 없음 → 선택 상태와 결과·요약 갱신 | `<button>`에 onclick·이벤트 연결 없음

[P1] app/phone/campaign-calendar.html:51 | 국가 버튼에 핸들러 없음 → 국가 선택 시 일정 필터 연결 또는 버튼 제거 | `<button>`에 onclick·data-action 없음

[P1] app/phone/inspection-detail.html:66-67,89-91 | 이전/다음 및 전체·피드·스토리 탭에 핸들러 없음 → 콘텐츠 전환·신청자 이동 연결 | `<button>`에 onclick·이벤트 연결 없음

[P1] app/phone/influencer-search.html:96 | `저장한 목록` 헤더 버튼에 핸들러 없음 → `saved-influencer.html` 연결 | `<button>`에 onclick·href 없음

[P1] app/phone/notification-center.html:208 | `모두 읽음` 버튼에 핸들러 없음 → 알림 읽음 상태 갱신 | `<button>`에 onclick·이벤트 연결 없음

[P1] app/phone/notification-center.html:236 | `충전하러 가기`가 `balance-history.html`로 이동 → `balance-charge.html` 연결 | CTA 라벨과 목적지 불일치

[P1] app/phone/notification-center.html:237 | `나중에` 버튼에 핸들러 없음 → 해당 알림 숨김·읽음 처리 연결 | `<button>`에 onclick·이벤트 연결 없음

[P1] app/phone/visit-planned.html:25-31 | `전체` 탭이 active인데 요약은 `국적 일본`으로 표시 → active 필터와 요약 조건 일치 | 재현: 전체 탭 active 상태에서 국가별 카드가 함께 노출됨

[P1] app/phone/influencer-detail.html:225-228 | 제안 메시지 textarea가 연결된 label/aria-label 없이 placeholder만 제공 → 접근 가능한 명칭·검증 영역 연결 | 폼 체크 항목 6, 동일: influencer-search.html:503-508, saved-influencer.html:257-262, visit-planned.html:294-299

[P1] app/phone/list.html:433-436 | 검색 input이 label/aria-label 없이 placeholder만 제공 → label 또는 aria-label 추가 | 폼 체크 항목 6, 동일: dashboard.html:460-463, list-selection.html:157-160, list-completed.html:101-104, saved-influencer.html:297-300, notice.html:61-64, influencer-search.html:103-106

[P1] app/phone/list-selection.html:105-125 | 택배사·송장번호에 시각적 필수표시만 있고 `required`·에러 문구·저장 전 검증 없음 → 필수 속성·에러 영역·저장 검증 연결 | 폼 체크 항목 6, 재현: 빈 상태로 저장 버튼 실행 가능

[P1] app/phone/settlement-request.html:125 | 정산 금액 input이 label/aria-label·에러 영역 없이 placeholder와 value만 제공 → 접근 가능한 명칭과 금액 검증 영역 추가 | 폼 체크 항목 6

## 화면별 판정표

| 화면 | 결함수(P0/P1/P2) | 한 줄 총평 |
|---|---:|---|
| balance-charge.html | 1/2/0 | 충전 금액이 고정되어 결제 전 검증 불가 |
| balance-history.html | 0/4/0 | URL·필터·데이터 상태 동선 미완성 |
| campaign-calendar.html | 0/4/0 | 국가·상단 필터가 실제 일정에 반영되지 않음 |
| campaign-detail.html | 0/4/0 | 공유·메뉴·상태 반영·상세 식별 연결 부재 |
| campaign-edit.html | 0/2/0 | 저장 확인 후 실제 변경 반영 없음 |
| campaign-schedule-list.html | 0/4/0 | 정렬·필터·상태 화면·탭 구조 미완성 |
| dashboard.html | 0/2/0 | 검색이 시트 닫기만 수행 |
| guide.html | 0/1/0 | 하단 탭 구조만 정합성 결함 |
| influencer-detail.html | 0/6/0 | 채널·게시물·저장·제안 폼 일부 미동작 |
| influencer-search.html | 0/10/0 | 검색·필터·탭·상세 식별·접근성 결함 집중 |
| inspection-detail.html | 1/3/0 | 직접 메시징 UI와 검수 이동 컨트롤 결함 |
| list-cancel-influencer.html | 0/3/0 | 필터와 로딩·에러 상태 부재 |
| list-cancel-selected.html | 0/5/0 | 상세 식별·필터·빈 상태 부재 |
| list-completed.html | 0/6/0 | 상세 버튼·정렬·필터·상태 화면 결함 |
| list-inspection.html | 0/5/0 | 정적 상세 연결과 상태 액션 no-op |
| list-revision.html | 0/5/0 | 정적 검수 연결과 상태 화면 결함 |
| list-selection.html | 0/8/0 | 배송 저장 검증·상세·필터 결함 |
| list-unselected.html | 0/5/0 | 상세·필터·빈 상태 결함 |
| list.html | 0/8/0 | 신청자 정보 손실과 주요 액션 미완성 |
| login.html | 0/1/0 | 비밀번호 찾기 동선이 죽어 있음 |
| more.html | 0/1/0 | 하단 탭 구조 결함 |
| notice.html | 1/5/0 | 정책 문구·탭·검색·상태 화면 결함 |
| notification-center.html | 0/4/0 | 알림 액션과 상태 화면 결함 |
| pricing-account.html | 0/1/0 | 하단 탭 구조 결함 |
| pricing-it.html | 0/1/0 | 하단 탭 구조 결함 |
| pricing-korea.html | 0/1/0 | 하단 탭 구조 결함 |
| pricing-superpass.html | 0/1/0 | 하단 탭 구조 결함 |
| pricing-translation.html | 0/1/0 | 하단 탭 구조 결함 |
| pricing.html | 0/1/0 | 하단 탭 구조 결함 |
| saved-influencer.html | 0/8/0 | 저장 필터·검색·제안 폼·상태 결함 |
| settlement-request.html | 2/3/0 | 계좌 셀프서비스와 정산 금액 고정 |
| visit-planned.html | 0/8/0 | 국가 필터·요약 불일치와 제안 폼 결함 |
| app/index.html | 0/0/0 | 등록 불일치 제외 항목 외 결함 없음 |
| app/js/sheets.js | 0/0/0 | 시트 열기·닫기·ESC 동작은 정상 |

Codex session ID: 01a06135-a7ea-7740-b1c9-eccb1efb47ba
Resume in Codex: codex resume 01a06135-a7ea-7740-b1c9-eccb1efb47ba
