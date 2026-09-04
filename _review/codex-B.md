[P0] components/header.html:22 | `모두 읽음` → 읽음 상태·알림 배지 갱신 연결 | 핸들러 없음, `js/components.js:1718`에서도 제외됨
[P0] components/header.html:54 | `href="#"` 모든 알림 보기 → 실제 알림 목록 경로 연결 또는 링크 제거 | 재현: 클릭 시 현재 문서 상단으로 이동
[P0] components/sidebar.html:152-170 | 아바타 계정 드롭다운·계정 이메일 노출 → 아바타 드롭다운 제거, 헤더는 잔액 pill·로그아웃만 유지 | CLAUDE.md:45-47
[P0] components/sidebar.html:170 | 도움말 버튼 → 기존 도움말 화면 연결 | 핸들러·href 없음
[P0] components/sidebar.html:133-145 | 환산 금액·국가 버튼 → 국가/금액 변경 시 결과 갱신 | `pt-input`, `pt-country` 전용 핸들러 없음, `js/components.js:1718`
[P0] login.html:445 | 비밀번호 보기 버튼 → 비밀번호 type·aria-label 토글 | 버튼 핸들러 없음
[P1] login.html:456-464 | 아이디 저장·자동로그인 체크박스 → 저장 동작 연결 | 체크 상태를 읽거나 저장하는 코드 없음
[P0] dashboard.html:177 | `href="#"` 전체 보기 → 최근 활동 기존 목록 경로 연결 또는 링크 제거 | 재현: 클릭 시 현재 문서 상단으로 이동
[P0] campaign-calendar.html:252 | 엑셀 다운 → 실제 다운로드 연결 또는 버튼 제거 | `.drawer` 내부이며 `js/components.js:1717`에서 자동 처리 제외, 별도 핸들러 없음
[P0] notice.html:129 | `href="#"` 입점업체 공지사항 → 기존 상세 경로 연결 | 공지 상세 파일·핸들러 없음
[P0] balance-history.html:302 | SNS/리뷰 URL `href="#"` → 실제 URL 연결 | 동일: `429,445-446,461-462,477,493-494,509,525-526,541,557,573-574,605,637,653,669,685`
[P0] balance-history.html:216 | `data-active-tab="계정"` → 기존 `요금표` 탭 키로 정합화 | `activateSidebarNav()`가 계정 그룹을 찾지 못하고 `activateHeaderTab()`은 계정에서 즉시 종료함 (`js/components.js:1769-1803`)
[P0] list.html:156 | 리뷰어선정 → 선정 완료 후 `list-selection.html`로 상태 이동 | `js/components.js:1743,1757-1763`은 confirm/toast만 실행
[P0] list.html:294 | 리뷰어 미선정 → `list-unselected.html`로 상태 이동 | `js/components.js:1746`은 toast만 실행
[P0] list.html:302-312 | 일괄 채택·거절 → 선택 행 상태 변경 및 후속 목록 반영 | `wireBulkBar()`는 선택 수만 갱신하고, 자동 트리거는 toast만 실행 (`js/components.js:2018-2043`)
[P0] list-selection.html:155 | 정보입력 저장 → 선정 행을 `list-inspection.html`로 이동 | 배송 저장 코드가 모달 닫기·toast만 실행 (`js/components.js:455-479`)
[P0] list-inspection.html:171-173 | 리뷰 검수·인플루언서미방문·초안수정요청 → 완료/취소/수정 목록으로 상태 이동 | 검수는 toast만 실행, 미방문은 confirm/toast만 실행, 수정 요청은 스레드 append/toast만 실행 (`js/components.js:607-620,688-716`)
[P0] list-revision.html:156-157 | 리뷰 검수 → `list-completed.html`로 완료 상태 이동 | 동일: `js/components.js:607-620`에서 모달 닫기·toast만 실행
[P0] influencer-search.html:594 | 카드형 제안하기 → 클릭한 카드의 실제 인플루언서 정보 표시 | 카드에는 `tr`이 없고 `wireProposeModal()`은 `closest('tr')`만 추출함 (`js/components.js:332-342`); 동일: `visit-planned.html:693`, `saved-influencer.html:595`
[P0] saved-influencer.html:592 | 카드 저장 해제 버튼 → 저장 목록에서 해당 카드 제거 | `aria-label`만 있고 텍스트 매칭도 별도 핸들러도 없음; 동일: `628,663,699,735,771`
[P0] campaign-schedule-list.html:204 | 보내기 → 제거하고 구조화된 제안 동선으로 대체 | `components/modal-message.html:13-35`가 받은/보낸/답장/자유 메시지를 제공하고 실제로 열림; 동일: `221,238,255,272,289,306,323,340,357,374,391,408,425`
[P0] components/modal-address.html:33-46 | 인플루언서 연락처·이메일·원문 주소 → 비노출 또는 배송 처리용 마스킹 | 도메인 규칙 2, CLAUDE.md:32-38
[P0] components/drawer-influencer.html:55 | “직접 연락은 … 매니저를 통해 진행됩니다” → 해당 직접연락 안내 문구 제거 | CLAUDE.md:36-38의 제안은 앱 직접 푸시이며 매니저 경유 문구 금지
[P0] guide.html:641 | “메시지는 매니저 경유” → 직접소통 금지와 앱 직접 제안만 남긴 정책 문구로 수정 | CLAUDE.md:32-38
[P0] guide.html:892 | “담당 매니저를 통해 전합니다” → 직접소통 금지·제안 앱 푸시 기준으로 수정 | 동일 정책 문구 반복
[P0] modal-applicant.html:144-145 | 지원자 전화번호 원문 → 연락처 제거 또는 마스킹 | 도메인 규칙 2, CLAUDE.md:32-38
[P0] modal-applicant.html:129,202-204 | 닫기·거절·채택 → 실제 모달 닫기·상태 처리 연결 | 파일 내 실행 스크립트·핸들러 없음
[P0] influencer-search.html:551-554 | 페이지네이션 → 실제 행/카드 페이지 전환 | `.pg-btn`이 `js/components.js:1718`에서 제외되고 핸들러 없음; 동일: `visit-planned.html:649-652`, `saved-influencer.html:551-554`, `campaign-schedule-list.html:476-481`
[P0] list.html:82-87 | 기간 프리셋 → 선택 기간으로 결과 갱신 | `.f-pre`가 `js/components.js:1718`에서 제외되고 핸들러 없음; 동일: `list-selection.html:79-84`, `list-inspection.html:90-95`, `list-revision.html:82-87`, `list-completed.html:82-87`, `list-unselected.html:79-84`, `list-cancel-selected.html:79-84`, `list-cancel-influencer.html:65-70`, `campaign-schedule-list.html:100-105`, `notice.html:83-88`
[P0] list.html:270,286 | 필터 초기화·다시 시도 → 필터 초기화/재조회 실행 | 텍스트 매칭 대상이 아니며 핸들러 없음; 동일: `list-selection.html:179,195`, `list-inspection.html:377,393`, `list-revision.html:181,197`, `list-completed.html:204,220`, `list-unselected.html:165,181`, `list-cancel-selected.html:167,183`, `list-cancel-influencer.html:150,166`, `campaign-schedule-list.html:450,466`, `influencer-search.html:526,542`, `visit-planned.html:624,640`, `saved-influencer.html:542`, `notice.html:170`, `balance-history.html:719,735`

[P1] list.html:59-99 | 검색·필터·엑셀다운 → 실제 결과 필터링·정렬·파일 생성 | `js/components.js:1729-1737`은 toast만 실행; 동일: 8개 신청목록 화면, `campaign-schedule-list.html`, `notice.html`, `influencer-search.html`, `visit-planned.html`, `saved-influencer.html`
[P1] list.html:128-136 | sortable 헤더 → 실제 행 순서 변경 | `wireSortableHeaders()`는 class·aria-sort만 변경하고 행을 재배열하지 않음 (`js/components.js:1641-1668`); 동일: `list-selection.html:123-126`, `list-inspection.html:135-146`, `list-revision.html:127-137`, `list-completed.html:134-136`, `list-unselected.html:123-129`, `list-cancel-selected.html:123-125`, `list-cancel-influencer.html:108-111`, `campaign-schedule-list.html:173-182`, `notice.html:121-122`, `influencer-search.html:125-137`, `visit-planned.html:222-234`, `saved-influencer.html:125-137`
[P1] components/drawer-influencer.html:35-48 | 모든 상세 열기에 고정된 `mika_seoul` 프로필 → 트리거 행의 이름·국가·프로필 정보 반영 | `js/components.js:1545-1567`은 관리번호만 추출·갱신
[P1] components/modal-propose.html:37-47 | 캠페인 검색·타입 필터 → 캠페인 목록 필터링 | `js/components.js:349-363`은 선택 개수·메모 글자 수만 처리
[P1] design-system.html:1220 | `테스트 캠페인 3` → 실제 운영형 샘플명으로 교체 | 샘플데이터 규칙의 테스트 이름 금지

| 화면 | 결함수(P0/P1/P2) | 한 줄 총평 |
|---|---:|---|
| 공용 헤더 | 2/0/0 | 알림 읽음·전체 알림 동선이 죽어 있음 |
| 공용 사이드바 | 3/0/0 | 계정 드롭다운 정책 위반과 환산 도구 미동작 |
| 로그인 | 1/1/0 | 로그인은 가능하나 보조 컨트롤 미연결 |
| 대시보드 | 1/0/0 | 최근 활동 전체 보기 단절 |
| 캠페인 캘린더 | 1/0/0 | 날짜·드로어는 동작하나 엑셀 버튼은 죽어 있음 |
| 신청목록 | 5/1/0 | 선정·미선정·일괄 처리와 상태 화면 동선 단절 |
| 선정목록 | 3/1/0 | 배송 저장 후 검수 단계로 이동하지 않음 |
| 검수목록 | 3/1/1 | 검수·미방문·수정 요청이 실제 상태 전이로 이어지지 않음 |
| 수정목록 | 2/1/0 | 완료 전환이 toast에 머묾 |
| 완료목록 | 2/2/0 | 종료 화면이지만 공통 필터·정렬이 껍데기 |
| 미선정목록 | 2/1/0 | 기간 프리셋과 상태 화면 재시도가 미동작 |
| 선정취소목록 | 2/1/0 | 동일한 필터·재시도 단절 |
| 인플루언서취소목록 | 2/1/0 | 동일한 필터·재시도 단절 |
| 캠페인 일정 리스트 | 3/2/0 | 직접 메시지 정책 위반과 페이지·일괄 동작 단절 |
| 인플루언서 검색 | 3/2/0 | 카드 제안 대상 오류, 페이지네이션·검색 미동작 |
| 방문 예정 | 2/2/0 | 방문 예정 의도는 맞지만 제안 카드·검색 동작 단절 |
| 저장한 인플루언서 | 3/2/0 | 카드 제안 대상·저장 해제·페이지네이션 오류 |
| 공지사항 | 3/1/0 | 공지 상세 링크와 필터 동작 단절 |
| 차감 현황 | 3/1/0 | URL 링크·탭 활성·상태 재시도 오류 |
| 지원자 모달 | 2/0/0 | 개인정보 노출과 모든 액션 미연결 |
| 공용 모달·드로어 | 3/2/0 | 메시지 모달 정책 위반, 주소 노출, 프로필 고정값 |
| 가이드 | 2/0/0 | 직접소통 정책 문구가 금지된 경유 표현을 사용 |
| 디자인 시스템 | 0/1/1 | 데모 링크와 테스트 샘플명 잔존 |
| 메뉴·내부 링크 매핑 | 0/0/0 | 확인된 메뉴 대상 파일 누락은 없고, 계정 활성화 불일치만 별도 결함 |

Codex session ID: 01a060d9-e806-7f53-91d3-7b56f6a851fe
Resume in Codex: codex resume 01a060d9-e806-7f53-91d3-7b56f6a851fe
