# app/phone — 원본 어드민에 없는데 앱에 추가된 것

조사일: 2026-05-29 / 기준: 루트 *.html(원본 데스크탑 어드민) vs app/phone/*.html

## A. 원본에 없는 신규 화면 (전체화면으로 승격/신설)
- campaigns.html — 완전신규. 진행상태별 캠페인 허브 (원본은 calendar/schedule-list만)
- campaign-detail.html — 완전신규. 캠페인 단건 상세 (원본은 목록만)
- inspection-detail.html — 완전신규. 검수 상세 (원본은 modal-review)
- influencer-detail.html — 완전신규. 인플루언서 상세 (원본은 drawer-influencer)
- influencer-chat.html — 완전신규. 인플루언서 채팅 (원본에 채팅 없음)
- manager-chat.html — 완전신규. 매니저 1:1 채팅 (원본에 개념 없음)
- messages.html — 완전신규. 메시지 통합 inbox (탭바 4번째)
- notification-center.html — 완전신규. 알림 전체화면 (원본은 헤더 팝오버)
- more.html — 완전신규. 더보기 탭 (원본 사이드바 대체)
- guide.html — 완전신규. 사용 가이드 (원본에 없음)

## B. 원본엔 없는데 앱 화면에 추가된 요소

### 유지 확정 (2026-05-29 사용자 결정)
- balance-history — "충전하기/정산 신청" 버튼: 유지·진행
- pricing — 각 행 "수정" 링크, 헤더 "이전 요금표" 아이콘: 유지·진행

### 보류 (2026-05-29 사용자 결정: 일단 유지)
- manager-chat.html + dashboard 매니저 카드 — 매니저 소통이 카카오로 진행될 가능성. 카카오 여부 확인 시 "카카오 채널 연결" 대체 or 삭제 결정. 그전까지 화면 유지하고 P1 정리만 적용

### 재검토 권장 — 원본 근거 없는 그룹핑/분류
- saved-influencer — 즐겨찾기/제안대상/우수 하위 탭: 원본 데이터 모델에 없는 분류
- campaign-calendar + visit-planned — 캘린더/리스트/방문예정 3탭 묶음: 원본은 독립 메뉴
- balance-history — 충전/캠페인지출/정산 거래유형 탭: 원본 구조에 없음
- campaign-calendar/visit-planned — 헤더 국가 필터 아이콘: 원본 필터 체계와 상이
- influencer-search — 헤더 "저장한 목록" 북마크 아이콘: 진입 경로 이중화

### 재검토 권장 — 신규 개념(스코프 확인 필요)
- dashboard — 매니저 카드 섹션 (manager-chat과 세트). 알파콜라보 매니저 채팅 제공 여부 선확인
- dashboard — 검색 아이콘 / Quick actions 4버튼 (모바일 패턴이나 "캠페인 등록"이 등록폼 아닌 상세로 연결)
- manager-chat — 헤더 전화 아이콘: 기능 범위 미정
- influencer-detail / campaign-detail — 헤더 더보기(···)·공유 아이콘: 액션 불명확

### 연동 이슈 (버그성)
- campaigns / dashboard — "새 캠페인 등록" FAB·퀵액션이 campaign-detail(기존 상세)로 연결. 등록 폼이 아님

## 정리 방향 제안
- B-제거권장 3건은 P0~P1에서 같이 정리 (특히 결제 버튼 = 스코프 침범)
- A 신규화면은 "스코프 확장"이라 사용자/알파콜라보 확인 후 유지 여부 결정 (특히 manager-chat 세트)
- 헤더 임의 아이콘들(설정 톱니는 이미 제거)은 기능 정의 없는 것 일괄 정리
