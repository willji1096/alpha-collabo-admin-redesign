# 어드민 웹 ↔ 앱 시안 화면 비교

기준일: 2026-05-29 / 원본: 루트 *.html(데스크탑 어드민) · 앱: app/phone/*.html(폰 390)

## A. 앱에만 새로 만든 화면 — 10개 (원본 어드민에 없음)

### A-1. 드로어/모달을 전체화면으로 "승격"
원본은 목록만 있고 상세는 팝업(모달/서랍)으로 처리 → 앱에선 독립 화면으로:
- **campaign-detail** — 캠페인 단건 상세 (원본은 캘린더/일정목록만, 상세 없음)
- **inspection-detail** — 검수 상세 (원본은 modal-review 팝업)
- **influencer-detail** — 인플루언서 상세 (원본은 drawer-influencer 서랍)
- **campaigns** — 진행상태별 캠페인 허브

### A-2. 기능 자체가 신규
- **manager-chat** — 매니저 1:1 채팅 ※ 보류 (원본 chatbot은 AI 상담봇이라 별개. 카카오 진행 가능성, 확인 후 결정)
- **notification-center** — 알림 전체화면 (원본은 헤더 팝오버만)
- **more** — 더보기 탭 (원본 사이드바를 모바일 탭으로 대체)
- **guide** — 사용 가이드 (원본에 없음)

### A-3. 원본 기능을 UI만 재해석 (기능 신규 아님 — 정정 2026-05-29)
- **influencer-chat** — 원본 `components/modal-message.html`(메시지함: 메시지 작성/받은/보낸/답장, 받는사람ID로 인플루언서에게 발송)이 근거. 비실시간 쪽지 → **실시간 채팅 말풍선 UI**로 발전시킨 것
- **messages**(통합 inbox) — 원본 modal-message의 받은/보낸함이 근거. 인플루언서 채팅 + (보류 중인)매니저 + 시스템알림을 한 inbox로 통합

> 주의: 원본 `chatbot.html`은 인플루언서 채팅이 아니라 우하단 AI 상담봇(알파봇)이다. 혼동 금지.

## B. 양쪽 다 있으나 형태가 완전히 다름
- **list 계열 8개** (신청/선정/미선정/검수/수정/완료/취소2) — 원본 **데스크탑 테이블** → 앱 **썸네일 카드 + 가로 상태탭**
- **influencer-search** — 원본 테이블 → 앱 카드 리스트
- **dashboard** — 원본 KPI+활동+일정 → 앱은 매니저카드·퀵액션·SNS그리드 추가 (일부 신규 개념)

## C. 원본엔 있으나 앱에 단독 화면이 없음 (흡수)
- **modal-applicant**(지원자 모달) — 앱에선 campaign-detail / influencer-detail 안으로 흡수

## D. 양쪽 동일 계열 (모바일 변환만, 구조 동일)
- pricing(+korea/it/account/superpass/translation), notice, login, balance-history,
  campaign-calendar, campaign-schedule-list, visit-planned, saved-influencer

---
**요약**: 화면 단위 신규 = A의 10개(전체화면화). 단 *기능까지 신규*인 건 **manager-chat(보류)·notification-center·guide** 뿐. influencer-chat/messages는 원본 메시지함 기능을 UI 재해석한 것(근거 있음).
상세 요소 단위 추가물·결정 로그는 [app-phone-원본대비-추가물.md] 참조.
시각 플로우는 [app/workflow-map.html] 참조.
