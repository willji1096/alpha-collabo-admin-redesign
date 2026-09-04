## 1) 용어 목록

- `앱/CLAUDE.md:18 — UI 언어 영문 전용.`
- `앱/CLAUDE.md:19-23 — 상위 표기: "Super Pass" / 혜택 표기: "Air Pass", "Hotel Pass".`
- `앱/scripts/superpass.js:36 — "Air Pass" / "Hotel Pass"`
- `앱/scripts/superpass.js:44 — Air Pass · "Flight ticket covered" · "Round-trip flight" · reward: "flight ticket"`
- `앱/scripts/superpass.js:45 — Hotel Pass · "Hotel stay covered" · "Hotel stay" · reward: "hotel stay"`
- `앱/superpass-01-select.html:27-33 — "Super Pass" / "Air Pass" / "Hotel Pass" / "Choose one, not both. You book and pay first — refunded once your campaigns are complete."`
- `앱/scripts/superpass.js:203-205 — "Super Pass" / "Air Pass" 또는 "Hotel Pass" / 혜택 문구`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:136-139 — "패스권 혜택 선택" / "Choose your pass" / "슈퍼패스 / 호텔패스 중 1개" / "신청 후 변경 불가"`

- `앱/scripts/superpass.js:194 — 기준 일정의 앱 라벨: "Base dates"`
- `앱/superpass-08b-dates.html:64-69 — "Base dates" / "Window"`
- `앱/superpass-09-chat.html:56-58 — "Base dates" / "Window"`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:144-147 — 문서 표기: "기준 일정 3개 입력" / "Your base dates" / "추천 기간 자동 산정"`

- `앱/superpass-02-dates.html:51-54 — 추천 기간 라벨: "Recommended campaign window"`
- `앱/scripts/superpass.js:189-190 — 요약 카드 라벨: "Window" / "Bundle"`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:169-170 — 문서 표기: "신청 내용 확인" / "Review & submit"`

- `앱/superpass-05-confirm.html:37-38 — "My bundle" / "Each campaign is reviewed and booked separately."`
- `앱/superpass-06-done.html:45 — "My bundle"`
- `앱/superpass-08b-dates.html:64 — "Adding to bundle #..."`
- `앱/superpass-09-chat.html:48 — "Your manager · Bundle #..."`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:109-110 — "Bundle applications"`

- `앱/superpass-01-select.html:17 — "Pass campaigns"`
- `앱/superpass-01-select.html:50-51 — "Choose a pass treatment campaign" / "Pick only 1 clinic or treatment visit campaign."`
- `앱/superpass-03-recommend.html:40-42 — "Add regular campaigns" / "Only campaigns whose apply period overlaps your window."`
- `앱/scripts/superpass.js:152-153 — 패스 캠페인 칩: "Pass" / 일반 캠페인: 별도 칩 없음`
- `앱/notifications.html:82-83 — "Not selected for 1 regular campaign"`
- `앱/CLAUDE.md:21-23 — 캠페인 종류를 가리키는 표기는 "Super Pass"; 혜택 이름·비행기 배지는 "Air Pass"`

- `앱/CLAUDE.md:18 — 한국어 UI 라벨: 없음.`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:124-190 — 화면지도 문서에는 "패스권 캠페인 목록", "패스권 혜택 선택", "기준 일정", "신청 내용 확인", "신청 완료"가 있음.`

## 2) 상태 목록

1. `앱/superpass-06-done.html:17 — "Application submitted"`
2. `앱/superpass-06-done.html:36-39 — "1st review" → "2nd review" → "Scheduling" → "Booked"`
3. `앱/superpass-06-done.html:77 — "Awaiting 1st review"`
4. `앱/notifications.html:130-131 — "Application submitted" / "1 pass campaign and 2 regular campaigns are in review."`
5. `앱/notifications.html:114-115 — "Passed the first review" / "Bundle #SP-20261005-07 moved to the second review."`
6. `앱/notifications.html:98-99 — "Selected for your pass campaign" / "Lumi Clinic picked you."`
7. `앱/superpass-07-status.html:112-113 — "Scheduling" / "Clinic proposed Oct 23 · 15:00"`
8. `앱/superpass-07-status.html:108-110 — "Booked" / "Awaiting 1st review"`
9. `앱/notifications.html:66-67 — "Booking confirmed — verify it"`
10. `앱/superpass-verify.html:68-69 — "Booking" / "Booked"`
11. `앱/superpass-07-status.html:91 — "Partially booked"`
12. `앱/superpass-07-status.html:114-119 — "Not booked" / "Suggestions"`
13. `앱/superpass-07-status.html:109 — "Proof submitted"`
14. `앱/superpass-08-suggested.html:78 — "Already applied with a pass"`

- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:187-191 — "접수까지만" / "최종 선정은 아직"`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:200-207 — "Booking status" / "Submit proof" / "See suggested" / "Contact manager"`

## 3) 날짜 규칙

- `앱/superpass-02-dates.html:39-43 — "Enter 3 dates you can visit" / "The clinic confirms one of your three — 1st choice first."`
- `앱/superpass-02-dates.html:61-64 — "0 of 3" / "dates added" / "Find matching campaigns"`
- `앱/superpass-02-dates.html:84 — "Add 3 date and time options to see your recommended campaign window — we use it to find campaigns you can do on the same trip."`
- `앱/superpass-02-dates.html:93-95 — "Please choose 3 different dates." / "Choose 3 different dates" / "All set"`
- `앱/scripts/superpass.js:111 — 기본값 3개: `2026-10-20 11:00`, `2026-10-21 14:00`, `2026-10-22 11:00``
- `앱/scripts/superpass.js:94-99 — 첫 번째 날짜에서 14일 전부터 마지막 날짜에서 14일 후까지 계산`
- `앱/superpass-02-dates.html:51-54 — "Recommended campaign window" / "14 days before your 1st date – 14 days after your last"`
- `앱/superpass-04-extra-dates.html:39-41 — "Enter 3 dates per campaign. Dates are not copied between campaigns."`
- `앱/superpass-04-extra-dates.html:59-61 — "Every date must fall inside this window."`
- `앱/superpass-04-extra-dates.html:104-109 — "Two slots are identical. Change the date or time." / "Pick dates inside the window (...)."`
- `앱/superpass-08b-dates.html:68-69 — "Enter 3 dates per campaign, all inside ... Dates are not copied between campaigns."`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:144-147 — "기준 일정 3개 입력" / "3개 다 넣어야 다음"`

## 4) 자동 추천 로직 문구

- `앱/superpass-02-dates.html:84 — "we use it to find campaigns you can do on the same trip."`
- `앱/superpass-03-recommend.html:42 — "Only campaigns whose apply period overlaps your window."`
- `앱/superpass-08-suggested.html:73 — "Their apply period overlaps [window]."`
- `앱/superpass-08-suggested.html:82-83 — "Each campaign you add needs 3 visit dates, all inside [window]."`
- `앱/superpass-09-chat.html:66-72 — "Your dates didn't work out with the clinic, so I picked some campaigns for you." / "Picked to match your base dates."`
- `앱/notifications.html:146-147 — "We'll suggest 2nd-round campaigns based on your saved dates."`
- `앱/_concept/2026-09-02_슈퍼패스-화면지도/index.html:257-261 — "내 일정 맞춤 추천"은 "담당자 추천(08)으로 통합"`

## 5) 알림·채팅

- `앱/notifications.html:37 — 알림 탭: "Super Pass"`
- `앱/notifications.html:50-56 — "Your manager picked campaigns for you" / "Nest Clinic couldn't fit your dates. 2 replacement campaigns are waiting in bundle #SP-20261005-07." / "See picks" / "Contact manager"`
- `앱/notifications.html:66-72 — "Booking confirmed — verify it" / "Lumi Clinic booked you for Oct 20, 10:00. Submit your e-ticket to keep your flight benefit." / "Verify booking"`
- `앱/notifications.html:82-88 — "Not selected for 1 regular campaign" / "Dr. PL didn't pick you. ... you can add another regular campaign inside your window."`
- `앱/notifications.html:98-104 — "Selected for your pass campaign" / "Lumi Clinic picked you. Complete it on this trip to get your flight ticket."`
- `앱/notifications.html:114-120 — "Passed the first review" / "Bundle #SP-20261005-07 moved to the second review. We'll let you know the result."`
- `앱/notifications.html:130-136 — "Application submitted" / "Bundle #SP-20261005-07 — 1 pass campaign and 2 regular campaigns are in review."`
- `앱/notifications.html:146-155 — "Not selected for Super Pass campaigns" / "You weren't selected for your 3 campaigns. We'll suggest 2nd-round campaigns based on your saved dates."`

- `앱/superpass-09-chat.html:15-24 — 앱바 "Mina Park" / "Your manager"`
- `앱/superpass-09-chat.html:28-31 — 고정 신청 요약 영역 2행`
- `앱/superpass-09-chat.html:52-58 — "Not booked" / "Benefit" / "Base dates" / "Window"`
- `앱/superpass-09-chat.html:33-38 — 채팅 본문 / 입력창 "Type a message" / 버튼 "Send"`
- `앱/superpass-09-chat.html:65-77 — "Today" / "Your dates didn't work out with the clinic, so I picked some campaigns for you." / "[n] campaigns for you" / "Picked to match your base dates." / "See the list" / "For each one you add, enter 3 visit dates inside [window]." / "Got it, thanks!" / "I'll enter my 3 dates now."`
- `앱/superpass-07-status.html:63-68 — "Stuck on a campaign?" / "Mina can find campaigns open within your window, or answer anything about this bundle." / "Contact manager"`
- `앱/superpass-06-done.html:83 — "We'll notify you at each step. You can add campaigns until booking is confirmed."`

## 6) 샘플 데이터

### 인플루언서·핸들

- `앱/my-account.html:44-45 — Jessica Kim / "@jessicakim"`
- `앱/my-account.html:83-88 — Instagram / "@joanneffan"`
- `앱/my-account.html:90-95 — TikTok / "@justjjoanne"`
- `앱/detail-delivery.html:322-326 — "Tag @nestclinic_official"` (인플루언서 핸들이 아닌 병원 계정)
- `앱/superpass-*.html 및 scripts/superpass.js — 슈퍼패스 화면 전용 인플루언서 핸들: 없음`

### 캠페인·병원/브랜드

- `앱/scripts/superpass.js:64 — U-Line Clinic / Premium beauty treatment`
- `앱/scripts/superpass.js:65 — SNU Plastic Surgery / Skin booster & lifting consult`
- `앱/scripts/superpass.js:66 — Orta Clinic / Laser toning & aftercare`
- `앱/scripts/superpass.js:67 — Laviora / One-day aesthetic by dermatologist`
- `앱/scripts/superpass.js:68 — Glow Dermatology / Glow injection & regeneration`
- `앱/scripts/superpass.js:69 — Mine Plastic Surgery / Eye & nose consult & review`
- `앱/scripts/superpass.js:70 — Bloom Clinic / Botox & filler anti-aging`
- `앱/scripts/superpass.js:71 — Seoul Derma Gangnam / Acne scar laser care`
- `앱/scripts/superpass.js:72 — Lumi Clinic / Shrink lifting session`
- `앱/scripts/superpass.js:73 — Oreum Plastic Surgery / Liposuction consult & body care`
- `앱/scripts/superpass.js:74 — Nest Clinic / K-beauty expert care`
- `앱/scripts/superpass.js:75 — Juno Hair Cheongdam / Hair styling & scalp care`
- `앱/scripts/superpass.js:76 — Dr. PL / Glass skin facial`
- `앱/scripts/superpass.js:77 — Seoul Forest Cafe / Autumn dessert tasting`
- `앱/scripts/superpass.js:78 — Hanbok Studio Bukchon / Bukchon hanbok photo walk`
- `앱/scripts/superpass.js:79 — Han River Cruise / Night cruise vlog`
- `앱/scripts/superpass.js:80 — AI Stem Cell Center / Anti-aging consult visit`

### 관리자·신청 묶음 샘플

- `앱/scripts/superpass.js:220 — "Mina Park"`
- `앱/scripts/superpass.js:121 — 기본 묶음 번호 "SP-20261005-07"`
- `앱/notifications.html:51 — "bundle #SP-20261005-07"`
- `앱/superpass-07-status.html:59-60 — "Mina Park" / "Your manager"`

Codex session ID: 01a062b9-ed8c-71b2-8f02-31ab925e64ea
Resume in Codex: codex resume 01a062b9-ed8c-71b2-8f02-31ab925e64ea
