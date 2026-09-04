[P0] components/modal-message.html:24,30,35 | 인플루언서 ID 입력·메시지 작성·메시지 발송 → 메시지 모달 및 발송 동선 제거 | 근거(CLAUDE.md 직접소통 금지); 동일: campaign-schedule-list.html:204,221,238,255,272,289,306,323,340,357,374,391,408,425

[P0] modal-applicant.html:144-145 | 인플루언서 연락처 전체값 노출 → 연락처 필드 제거 | 근거(CLAUDE.md 직접소통·연락처 노출 금지)

[P0] components/modal-address.html:33-38 | 인플루언서 연락처·이메일 전체값 노출 → 연락처·이메일 필드 제거 | 근거(CLAUDE.md 직접소통·개인정보 노출 금지)

[P0] components/drawer-influencer.html:43-55 | 이메일·연락처 필드와 “매니저를 통해” 문구 → 필드 제거 및 제안은 앱 직접 푸시 문구로 교체 | 근거(CLAUDE.md 직접소통 금지, 제안 예외 정책)

[P0] guide.html:641,892 | “메시지는 매니저 경유”, “담당 매니저를 통해 전합니다” → 직접소통 문장 제거, 제안은 인플루언서 앱 직접 전달로 통일 | 근거(CLAUDE.md 직접소통·‘매니저를 통해 전달’ 문구 금지)

[P0] app/phone/guide.html:451 | “전달할 내용은 담당 매니저를 통해 전합니다” → 해당 문장 제거 | 근거(CLAUDE.md 직접소통·‘매니저를 통해 전달’ 문구 금지)

[P0] app/phone/notice.html:111 | “인플루언서와의 연락은 담당 매니저를 통해 진행” → 직접 연락 관련 문장 제거 | 근거(CLAUDE.md 직접소통 금지)

[P0] app/phone/visit-planned.html:306 | “선택한 제안은 매니저를 통해 인플루언서에게 전달됩니다” → “선택한 제안은 인플루언서 앱으로 바로 전달됩니다” | 근거(CLAUDE.md 제안은 앱 직접 푸시); 동일: app/phone/saved-influencer.html:269, app/phone/influencer-search.html:515

[P0] app/phone/notification-center.html:218,316 | “메시지” 탭·“인플루언서 메시지” 섹션 → 알림 범위에서 인플루언서 메시지 동선 제거 | 근거(CLAUDE.md 실시간 채팅·쪽지 금지)

[P0] login.html:412 | “글로벌 인플루언서와 직접 연결하세요” → “인플루언서를 탐색하고 캠페인을 운영하세요” | 근거(CLAUDE.md 직접소통 금지)

[P0] v2/campaign-new.html:487,497-518 | “새 캠페인” 5단계 생성 폼 → 화면 및 생성 동선 제거 | 근거(CLAUDE.md 캠페인 생성 주체는 매니저, 신규 생성 UI 금지)

[P0] v2/settings.html:444,546-601 | 계정 설정·연락처 편집 화면 → 설정 메뉴·편집 폼 제거 | 근거(CLAUDE.md 계정 self-service 금지)

[P0] v2/messages.html:672,905 | 메시지함·자동번역 입력창·발송 버튼 → 화면 및 발송 동선 제거 | 근거(CLAUDE.md 인플루언서 직접소통 금지); 동일: v2/dashboard.html:135-137, v2/explore.html:212-214, v2/campaign-list.html:318-320, v2/campaign-detail.html:453-455, v2/settings.html:388-390, v2/billing.html:493-495, v2/report.html:405-407, v2/inspect.html:407-409, v2/saved.html:290-292, v2/campaign-new.html:421-423

[P0] design-system.html:712 | “새 캠페인 등록” 버튼 → 금지된 생성 액션 데모 제거 | 근거(CLAUDE.md 브랜드사 어드민에 풀스펙 캠페인 생성 UI 금지)

[P1] app/css/app-mobile.css:15-20 | common.css 토큰과 다른 radius·shadow·font-weight 재정의 → 앱도 common.css 단일 토큰 사용 | 근거(docs/DESIGN.md §0 단일 토큰 기준); 동일: `--radius-sm/md/lg/xl`, `--app-card-shadow`, `--fw-semibold`

[P1] v2/css/tokens.css:139-143 | `--fw-semibold:600`, `--fw-heavy:800` → 400/500/700 체계로 통합 | 근거(감사 C 폰트 웨이트 3단 기준)

[P1] css/common.css:327-328 | `font-size:13px` → 의미별 `var(--fs-sm)` 또는 `var(--fs-base)` | 근거(docs/DESIGN.md §3 토큰 폰트); 동일: css/common.css:424,576,620,635,745,783,851,1007,1110,1166,1212,1573

[P1] css/common.css:1016-1022,1266,1616-1642 | raw rgba 색상 직접 사용 → semantic color/overlay token 사용 | 근거(docs/DESIGN.md §0·§2 raw 색상 금지)

[P1] app/css/app-mobile.css:56,76-77,449,453,851,868,984,997-1012,1327,1413,1508 | raw hex·rgba·shadow 직접 사용 → common.css 색상·shadow token 사용 | 근거(docs/DESIGN.md §0·§2); 동일: app/phone 인라인 `<style>`의 동일 패턴

[P1] css/admin.css:635,834,1475,1508,1523,1530-1553,1801,2065,2755,2788,3182-3187,3276,4003-4081,4207,4459-4626 | raw 색상·rgba·gradient·shadow 직접 사용 → semantic token 또는 currentColor 사용 | 근거(docs/DESIGN.md §0·§2)

[P1] css/admin.css:130,1152,1303,1370 | `border-radius:3px/5px/10px` → `var(--radius-*)` | 근거(docs/DESIGN.md §4 라운드 4단 체계)

[P1] css/admin.css:28, css/common.css:1010,1135,1368 | width/top/right 전환 → transform/opacity 기반 전환 | 근거(docs/DESIGN.md §6 motion 규칙)

[P1] list.html:59-80 | inline `width:110px~200px`, `margin-left:16px` → 토큰화된 modifier class로 이동 | 근거(docs/DESIGN.md §0 raw px·inline style 금지); 동일: list-revision.html:59-80, list-inspection.html:67-88, list-completed.html:59-80, list-unselected.html:56-77, list-cancel-selected.html:56-77, list-cancel-influencer.html:42-63, campaign-schedule-list.html:81-98, notice.html:64-81, influencer-search.html:56-83, saved-influencer.html:56-83, visit-planned.html:153-180

[P1] influencer-search.html:781-786 | skeleton inline `height:88px`, `margin-bottom:12px` → 공통 skeleton class와 spacing token 사용 | 근거(docs/DESIGN.md §0); 동일: saved-influencer.html:782-787, visit-planned.html:881-886

[P1] v2/dashboard.html:254,266,278 | 샘플 진행률 `50%·60%·100%` inline 값 → 유기적 샘플값 및 공통 progress class 사용 | 근거(CLAUDE.md 둥근 샘플 숫자 금지); 동일: v2/campaign-list.html:465,493,521,549,577,605,634

[P1] design-system.html:250,377-396,666-671 | inline `-0.6px`, raw spacing/radius/width/percentage demo → 토큰 참조형 데모로 변경 | 근거(docs/DESIGN.md §0 raw px 금지)

[P1] css/common.css:310 | 미사용 `.text-section-title` 선택자 → 삭제 또는 실제 HTML에 연결 | 근거(전 HTML·JS exact class 검색 결과 0건); 동일: `.text-card-title`, `.text-body-medium`, `.text-body-strong`, `.text-small-medium`, `.text-success`, `.text-warning`, `.text-error`, `.text-info`, `.btn-loading`, `.input-lg`, `.card-clickable`, `.table-wrap`, `.skeleton-line`, `.skeleton-circle`, `.badge-solid-accent`, `.skeleton-thumb`, `.drawer-left`, `.progress-sm`, `.divider-strong`, `.avatar-xs`, `.avatar-lg`, `.glass`, `.has-grain`

[P1] css/common.css:74-75,81 | tertiary 3.36:1·disabled 1.98:1·accent 4.30:1 on white → 본문 소형 텍스트는 4.5:1 이상 semantic strong token 사용 | 근거(docs/DESIGN.md §2·§8, 대비 계산)

[P1] components/sidebar.html:64-87, components/header.html:6-11 | active nav에 `aria-current` 없음 → 현재 페이지 링크에 `aria-current="page"` 부여 | 근거(docs/DESIGN.md §8 접근성); 동일: root 전역 nav 링크

[P1] design-system.html:849-851 | 아이콘 전용 density 버튼에 `aria-label` 없음 → `aria-label="컴팩트/기본/여유 밀도"` 추가 | 근거(docs/DESIGN.md §8 접근성)

[P1] app/css/app-mobile.css:110,112 | `.btn-sm`·`.btn-icon.btn-sm` 높이 40px → 최소 44px | 근거(styleseed-rules.md §41 앱 터치 타깃); 동일: 앱 전체 `btn-sm` 사용 화면

[P1] app/css/app-mobile.css:438-453 | 검색 초기화 버튼 20×20px → 시각 아이콘만 20px로 두고 hit area는 44×44px 확보 | 근거(styleseed-rules.md §41 앱 터치 타깃)

[P1] app/phone/list.html:14, app/phone/influencer-search.html:12 | view 버튼 38×30px → 44×44px | 근거(styleseed-rules.md §41 앱 터치 타깃)

[P1] app/phone/list.html:42, app/phone/influencer-search.html:59 | deck 닫기 버튼 32×32px → 44×44px | 근거(styleseed-rules.md §41 앱 터치 타깃)

[P1] app/phone/campaign-calendar.html:15 | 월 이동 버튼 32×32px → 44×44px | 근거(styleseed-rules.md §41 앱 터치 타깃)

[P1] app/phone/more.html:191-194 | switch 높이 28px → 최소 44px hit area를 가진 label/switch로 확장 | 근거(styleseed-rules.md §41 앱 터치 타깃)

[P1] app/workflow-map.html:195-207 | “메시지 inbox” 신규 노드 → 메시지 노드 제거 | 근거(CLAUDE.md 신규 화면·직접소통 금지); 동일: app/guide-map.html:241,261-263,310-312

[P1] app/phone/notification-center.html:135,315-316 | 인플루언서 메시지 전용 시각 계층 → 시스템/매니저 알림만 유지 | 근거(CLAUDE.md 직접소통 금지)

[P1] app/phone/list.html:112 | 국기 이모지 `🇯🇵` → `<span class="c-country-code">JP</span>` | 근거(CLAUDE.md 샘플데이터 국기 이모지 금지); 동일: app/phone/list-revision.html:35, app/phone/notification-center.html:323,337, app/phone/list-inspection.html:37,64,89,114,139,163,187,211,235,260,357,382, app/phone/inspection-detail.html:211, app/phone/campaign-detail.html:54, app/phone/pricing*.html, app/phone/list-unselected.html:35, app/phone/saved-influencer.html:49,78,107,136,165, app/phone/list-completed.html:40,66, app/phone/list-selection.html:45,99, app/phone/campaign-schedule-list.html:40,75,95,127,147,173,203, app/phone/list-cancel-selected.html:36, app/phone/visit-planned.html:40,69,98,127,156, app/phone/influencer-detail.html:76,179, app/phone/influencer-search.html:139,167,195,223,251,279,307,335

[P1] list.html:209 | `youtube.com/@test` → 유기적인 핸들값 | 근거(CLAUDE.md 테스트 이름·샘플값 금지); 동일: list.html:224, campaign-schedule-list.html:262

[P2] pricing.html:55-68 | 반복 `10,000·50,000·100,000원` → 유기적 금액값 | 근거(CLAUDE.md 둥근 샘플 숫자 금지); 동일: pricing-it.html:55-68, pricing-korea.html:55-68, app/phone/pricing.html, app/phone/pricing-it.html, app/phone/pricing-korea.html

[P2] balance-history.html:433,481-483,497,530-531,578-579,626-627,658-659 | `50,000·250,000·1,000원` → 유기적 거래값 | 근거(CLAUDE.md 둥근 샘플 숫자 금지); 동일: components/drawer-balance.html:122, components/modal-propose.html:114

[P2] components/chatbot.html:73 | FAQ 아이콘 이모지 사용 → SVG/icon token 사용 | 근거(docs/DESIGN.md §9 이모지 디자인 요소 금지); 동일: components/chatbot.html:77,81,85,89,93,97,101

| 화면 | 결함수(P0/P1/P2) | 한 줄 총평 |
|---|---:|---|
| 공통 CSS/토큰 | 0/9/0 | 토큰·대비·모션·죽은 CSS 정리가 필요함 |
| V1 운영 화면 | 4/4/3 | 정책 위반 카피와 raw inline/sample 값이 반복됨 |
| components | 4/1/1 | 직접소통·개인정보 노출 동선이 남아 있음 |
| App phone | 4/8/2 | 제안 카피·메시지 동선과 터치 타깃 문제가 큼 |
| V2 | 3/3/1 | 생성·설정·메시지 기능이 범위를 벗어남 |
| design-system.html | 1/2/0 | 금지 액션 데모와 접근성·raw demo가 존재함 |

Codex session ID: 01a060d9-fbea-7953-80df-7d7d57c4485e
Resume in Codex: codex resume 01a060d9-fbea-7953-80df-7d7d57c4485e
