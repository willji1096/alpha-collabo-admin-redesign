/**
 * Alphacollabo Admin — Component Loader
 * 사이드바/헤더를 외부 파일에서 불러와 삽입하고, 현재 페이지에 맞춰 활성 상태를 설정
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 캐시 버스팅: 개발 중 sidebar/header 변경이 즉시 반영되도록
  const bust = `?v=${Date.now()}`;

  // 사이드바 로드
  const sidebarSlot = document.getElementById('sidebar-slot');
  if (sidebarSlot) {
    const res = await fetch('components/sidebar.html' + bust, { cache: 'no-store' });
    sidebarSlot.innerHTML = await res.text();
    activateSidebarNav();
  }

  // 헤더 로드
  const headerSlot = document.getElementById('header-slot');
  if (headerSlot) {
    const res = await fetch('components/header.html' + bust, { cache: 'no-store' });
    headerSlot.innerHTML = await res.text();
    activateHeaderTab();
    wireMobileSidebar();
  }

  // 전역 패턴 (2025)
  wireCommandPalette();
  wireCopyButtons();
  wireDensityToggle();
  wireBulkBar();
  wireToastAutoTriggers();
  wireSortableHeaders();
  wireHeaderPopovers();
  wireInfluencerDrawer();
  wireMessageModal();
  wireImageLightbox();

  // 챗봇 자동 주입 + 활성화
  if (!document.getElementById('chatbot')) {
    const res = await fetch('components/chatbot.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireChatbot();
});

/** Chatbot Widget — 상태 머신 + 마우스 추적 + 패널 */
function wireChatbot() {
  const root = document.getElementById('chatbot');
  if (!root) return;

  const bubble = root.querySelector('.chatbot-bubble');
  const panel = root.querySelector('.chatbot-panel');
  const closeBtn = root.querySelector('.chatbot-panel-close');
  const pupilWraps = root.querySelectorAll('.chatbot-face .pupil-wrap');
  const faqItems = root.querySelectorAll('.chatbot-faq-item');
  const faqList = root.querySelector('.chatbot-faq');
  const greeting = root.querySelector('.chatbot-greeting');
  const answer = root.querySelector('.chatbot-answer');
  const answerContent = root.querySelector('.chatbot-answer-content');
  const backBtn = root.querySelector('.chatbot-back');

  let state = 'idle';
  let lastInteraction = Date.now();
  let yawnTimer, sleepTimer, blinkTimer, talkTimer, alertTimer;

  function setState(next) { state = next; root.dataset.state = next; }

  // 마우스 추적 — 동공이 마우스 방향으로 이동 (눈 흰자 안 반경 제한)
  const PUPIL_RANGE = 4;      // SVG viewBox 100 기준 동공 이동 반경
  const ALERT_DISTANCE = 200;
  function updatePupils(mx, my) {
    if (state === 'yawn' || state === 'sleep' || state === 'open') return;
    const rect = bubble.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mx - cx, dy = my - cy;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(1, Math.hypot(dx, dy) / 400);  // 400px 안에서 최대 이동
    const offX = Math.cos(angle) * PUPIL_RANGE * dist;
    const offY = Math.sin(angle) * PUPIL_RANGE * dist;
    pupilWraps.forEach(w => {
      w.setAttribute('transform', `translate(${offX} ${offY})`);
    });
  }

  document.addEventListener('mousemove', (e) => {
    lastInteraction = Date.now();
    updatePupils(e.clientX, e.clientY);
    if (state !== 'sleep') return;
    const rect = bubble.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) < ALERT_DISTANCE) {
      setState('alert');
      clearTimeout(alertTimer);
      alertTimer = setTimeout(() => { if (state === 'alert') setState('idle'); }, 1500);
    }
  });

  function scheduleBlink() {
    const d = 4000 + Math.random() * 3000;
    blinkTimer = setTimeout(() => {
      if (state === 'idle' || state === 'alert' || state === 'hover') {
        root.classList.add('blinking');
        setTimeout(() => root.classList.remove('blinking'), 220);
        if (Math.random() < 0.25) {
          setTimeout(() => { root.classList.add('blinking'); setTimeout(() => root.classList.remove('blinking'), 220); }, 320);
        }
      }
      scheduleBlink();
    }, d);
  }
  function scheduleYawn() {
    const d = 30000 + Math.random() * 60000;
    yawnTimer = setTimeout(() => {
      if (state === 'idle') { setState('yawn'); setTimeout(() => { if (state === 'yawn') setState('idle'); }, 1600); }
      scheduleYawn();
    }, d);
  }
  function scheduleTalk() {
    const d = 5000 + Math.random() * 7000;
    talkTimer = setTimeout(() => {
      if (state === 'idle' || state === 'alert' || state === 'hover') {
        root.classList.add('talking');
        setTimeout(() => root.classList.remove('talking'), 480);
      }
      scheduleTalk();
    }, d);
  }
  function checkSleep() {
    sleepTimer = setInterval(() => {
      if (document.hidden) return;
      if (state === 'idle' && Date.now() - lastInteraction > 12000) setState('sleep');
    }, 2000);
  }

  bubble.addEventListener('mouseenter', () => {
    if (state === 'sleep') { setState('alert'); clearTimeout(alertTimer); alertTimer = setTimeout(() => { if (state === 'alert') setState('idle'); }, 1500); }
    else if (state === 'idle') setState('hover');
    lastInteraction = Date.now();
  });
  bubble.addEventListener('mouseleave', () => {
    if (state === 'hover') setState('idle');
  });

  function openPanel() {
    root.classList.add('is-open'); setState('open');
    bubble.setAttribute('aria-expanded', 'true');
    lastInteraction = Date.now();
    panel.querySelector('button, [href]')?.focus();
  }
  function closePanel() {
    root.classList.remove('is-open'); setState('idle');
    bubble.setAttribute('aria-expanded', 'false');
    if (answer) answer.hidden = true;
    if (faqList) faqList.style.display = '';
    if (greeting) greeting.style.display = '';
  }
  bubble.addEventListener('click', () => {
    if (root.classList.contains('is-open')) closePanel(); else openPanel();
  });
  closeBtn?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) closePanel();
  });

  const ANSWERS = {
    'campaign-register': { title: '캠페인 등록 방법', body: '<p>좌측 메뉴 <strong>캠페인 일정 → 캠페인일정관리목록</strong>에서 새 캠페인을 등록할 수 있어요.</p><ul><li>캠페인명, 모집 인원, 채널, 기간 입력</li><li>방문형 / 배송형 / 리뷰형 중 선택</li><li>등록 후 인플루언서 신청을 받습니다</li></ul>' },
    'influencer-select': { title: '인플루언서 선정 기준', body: '<p>각 캠페인에 신청한 인플루언서를 <strong>신청목록</strong>에서 검토 후 선정합니다.</p><ul><li>채널, 팔로워, 진행 이력 확인</li><li>“인플루언서 보기”로 상세 프로필 열람</li><li>“리뷰어 선정” 버튼으로 확정</li></ul>' },
    'pricing': { title: '요금/결제 방식', body: '<p>요금은 카테고리별로 분리되어 있어요.</p><ul><li>제품형/방문형 — 등급별 단가</li><li>슈퍼패스 — 국가별 지원 금액</li><li>통역 — 시간 단위 (서울 한정)</li><li>계정/댓글 관리 — 월정액</li></ul><p>좌측 <strong>요금표</strong> 메뉴에서 확인하실 수 있어요.</p>' },
    'review': { title: '검수/리뷰 절차', body: '<p>인플루언서가 리뷰 URL을 등록하면 <strong>검수요청목록</strong>에 자동 표시돼요.</p><ul><li>“리뷰 감수”로 콘텐츠 확인</li><li>수정이 필요하면 “초안 수정 요청”</li><li>승인 후 <strong>등록완료목록</strong>으로 이동</li></ul>' },
    'cancel': { title: '캠페인 취소/환불 규정', body: '<p>캠페인 진행 단계에 따라 처리 방법이 달라요.</p><ul><li>모집 단계 — 자유 취소</li><li>선정 후 — 사유 검토 후 부분 환불</li><li>리뷰 등록 후 — 환불 불가</li></ul><p>자세한 환불 사유는 카카오 채널로 문의 주세요.</p>' },
  };
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const data = ANSWERS[item.dataset.topic];
      if (!data || !answer || !answerContent) return;
      answerContent.innerHTML = `<h4>${data.title}</h4>${data.body}`;
      answer.hidden = false;
      if (faqList) faqList.style.display = 'none';
      if (greeting) greeting.style.display = 'none';
    });
  });
  backBtn?.addEventListener('click', () => {
    if (answer) answer.hidden = true;
    if (faqList) faqList.style.display = '';
    if (greeting) greeting.style.display = '';
  });

  function stopTimers() { clearTimeout(blinkTimer); clearTimeout(yawnTimer); clearTimeout(talkTimer); clearTimeout(alertTimer); clearInterval(sleepTimer); }
  function startTimers() { scheduleBlink(); scheduleYawn(); scheduleTalk(); checkSleep(); }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimers(); else { stopTimers(); startTimers(); }
  });

  startTimers();
}

/** 이미지 라이트박스 — 드로어 내 post 썸네일 클릭 시 풀사이즈 확장 */
function wireImageLightbox() {
  let lb = null;
  let images = [];
  let idx = 0;

  function ensureEl() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'img-lightbox';
    lb.innerHTML = `
      <button class="img-lightbox-btn img-lightbox-close" aria-label="닫기">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18"/></svg>
      </button>
      <button class="img-lightbox-btn img-lightbox-prev" aria-label="이전">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="img-lightbox-btn img-lightbox-next" aria-label="다음">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <img class="img-lightbox-img" alt="">
      <div class="img-lightbox-counter"></div>
    `;
    document.body.appendChild(lb);
    lb.querySelector('.img-lightbox-close').addEventListener('click', close);
    lb.querySelector('.img-lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); nav(-1); });
    lb.querySelector('.img-lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); nav(1); });
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') nav(-1);
      if (e.key === 'ArrowRight') nav(1);
    });
  }

  function upscale(url) {
    // Unsplash URL의 w/h 400→1200, 600→1600 으로 확장
    return url.replace(/([?&])w=\d+/, '$1w=1200').replace(/([&?])h=\d+/, '$1h=1200');
  }

  function render() {
    if (!lb || !images[idx]) return;
    const img = lb.querySelector('.img-lightbox-img');
    img.src = upscale(images[idx]);
    lb.querySelector('.img-lightbox-counter').textContent = `${idx + 1} / ${images.length}`;
    lb.querySelector('.img-lightbox-prev').hidden = images.length <= 1;
    lb.querySelector('.img-lightbox-next').hidden = images.length <= 1;
  }

  function nav(delta) {
    idx = (idx + delta + images.length) % images.length;
    render();
  }

  function open(triggerEl) {
    ensureEl();
    // 같은 그리드 안의 모든 이미지 URL 수집
    const grid = triggerEl.closest('.di-grid');
    if (grid) {
      const posts = Array.from(grid.querySelectorAll('.di-post img'));
      images = posts.map(im => im.src);
      idx = Math.max(0, posts.findIndex(im => im === triggerEl.querySelector('img')));
    } else {
      images = [triggerEl.querySelector('img').src];
      idx = 0;
    }
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    if (!lb) return;
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // 드로어 내 포스트 클릭 시 라이트박스 오픈
  document.addEventListener('click', (e) => {
    const post = e.target.closest('.di-post');
    if (!post) return;
    if (!post.querySelector('img')) return;
    e.preventDefault();
    open(post);
  });
}

/** 메시지 모달 (슈퍼패스 보내기) — 페이지 로드 시 상주 */
async function wireMessageModal() {
  if (document.querySelectorAll('.js-open-message').length === 0) return;
  const bust = `?v=${Date.now()}`;
  const res = await fetch('components/modal-message.html' + bust, { cache: 'no-store' });
  const html = await res.text();
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  Array.from(wrap.children).forEach(el => document.body.appendChild(el));

  const backdrop = document.querySelector('.js-message-backdrop');
  const modal = backdrop && backdrop.querySelector('.modal-message');
  if (!backdrop || !modal) return;

  // 탭 전환
  const tabs = backdrop.querySelectorAll('[data-msg]');
  const panels = backdrop.querySelectorAll('[data-msg-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const code = tab.dataset.msg;
      panels.forEach(p => { p.hidden = p.dataset.msgPanel !== code; });
    });
  });

  // 메시지 카드 펼치기/접기 (헤더 클릭)
  backdrop.addEventListener('click', (e) => {
    if (e.target.closest('.mm-msg-chk, .mm-msg-actions, button')) return;
    const head = e.target.closest('.mm-msg-head');
    if (!head) return;
    const msg = head.closest('.mm-msg');
    const body = msg && msg.querySelector('.mm-msg-body');
    if (!msg || !body) return;
    const opening = body.hidden;
    body.hidden = !opening;
    msg.classList.toggle('is-open', opening);
    if (opening && msg.dataset.msgRead === 'false') {
      msg.dataset.msgRead = 'true';
      const unreadDot = msg.querySelector('.mm-msg-unread');
      if (unreadDot) unreadDot.remove();
    }
  });

  // 답장 버튼 — 작성 탭으로 전환 + 수신자 채움
  backdrop.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-msg-reply');
    if (!btn) return;
    const to = btn.dataset.msgTo;
    if (to) {
      backdrop.querySelectorAll('[data-message-recipient]').forEach(el => {
        if (el.tagName === 'INPUT') el.value = to;
        else el.textContent = to;
      });
    }
    activateTab('compose');
    const ta = backdrop.querySelector('.mm-textarea');
    if (ta) setTimeout(() => ta.focus(), 50);
  });

  // 텍스트 카운트
  const textarea = backdrop.querySelector('.mm-textarea');
  const counter = backdrop.querySelector('[data-message-count]');
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      counter.textContent = textarea.value.length;
    });
  }

  // 발송 버튼 — 토스트 + 모달 닫기 + textarea 리셋
  backdrop.querySelectorAll('.js-send-message').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = textarea && textarea.value.trim();
      if (!content) {
        if (typeof showToast === 'function') showToast('warning', '내용을 입력하세요');
        return;
      }
      if (typeof showToast === 'function') showToast('success', '메시지 발송 완료');
      if (textarea) { textarea.value = ''; if (counter) counter.textContent = '0'; }
      close();
    });
  });

  // 닫기
  backdrop.querySelectorAll('.js-close-message').forEach(b => b.addEventListener('click', close));
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  document.addEventListener('keydown', (e) => {
    if (!backdrop.hidden && e.key === 'Escape') close();
  });

  function activateTab(code) {
    tabs.forEach(t => {
      const on = t.dataset.msg === code;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });
    panels.forEach(p => { p.hidden = p.dataset.msgPanel !== code; });
  }

  function open(triggerEl) {
    // 트리거 행에서 인플루언서 이름 추출해서 수신자 자리에 표시
    let recipient = null;
    const row = triggerEl && triggerEl.closest('tr');
    if (row) {
      const table = row.closest('table');
      const headers = table ? Array.from(table.querySelectorAll('thead th')) : [];
      const idx = headers.findIndex(h => /인플루언서|회원정보/.test(h.textContent.trim()));
      if (idx >= 0 && row.cells[idx]) {
        const txt = row.cells[idx].textContent.trim().split(/\s+/)[0];
        if (txt) recipient = txt;
      }
    }
    if (recipient) {
      backdrop.querySelectorAll('[data-message-recipient]').forEach(el => {
        if (el.tagName === 'INPUT') el.value = recipient;
        else el.textContent = recipient;
      });
    }
    // 행에서 열렸으면 '작성' 탭, 그 외는 '받은 메시지' 탭
    activateTab(triggerEl ? 'compose' : 'inbox');
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (textarea) textarea.focus(); }, 50);
  }

  function close() {
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  // 트리거 버튼 클릭
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-message');
    if (!trigger) return;
    e.preventDefault();
    open(trigger);
  });
}

/** 인플루언서 상세 Drawer — 페이지 로드 시 상주 (이미지 preload 보장) */
async function wireInfluencerDrawer() {
  // 이 페이지에 트리거가 하나도 없으면 로드 스킵
  if (document.querySelectorAll('.js-open-influencer').length === 0) return;

  // 페이지 로드 시 즉시 주입 — 이미지가 초기 파싱에 바로 fetch 시작됨
  const bust = `?v=${Date.now()}`;
  const res = await fetch('components/drawer-influencer.html' + bust, { cache: 'no-store' });
  const html = await res.text();
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  Array.from(wrap.children).forEach(el => document.body.appendChild(el));

  const backdrop = document.querySelector('.js-drawer-influencer-backdrop');
  const drawer   = document.querySelector('.js-drawer-influencer');
  if (!drawer || !backdrop) return;

  // 모든 탭 이미지 fetch 기반 강제 preload (Chrome이 <img>만으론 skip할 때 대비)
  drawer.querySelectorAll('img').forEach(img => {
    fetch(img.src, { mode: 'no-cors' }).catch(() => {});
  });

  // SNS 탭 전환
  const tabs = drawer.querySelectorAll('[data-sns]');
  const panels = drawer.querySelectorAll('[data-sns-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const code = tab.dataset.sns;
      panels.forEach(p => { p.hidden = p.dataset.snsPanel !== code; });
    });
  });

  // 닫기 이벤트
  drawer.querySelectorAll('.js-close-influencer').forEach(b =>
    b.addEventListener('click', close)
  );
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (drawer.classList.contains('open') && e.key === 'Escape') close();
  });

  // 실제 구현 시 이 함수에서 `fetch('/api/influencer/' + mbNo)` 로 교체
  // 현재는 테이블 행에서 관리번호만 추출해서 반영 (데모)
  function extractRowData(triggerEl) {
    const data = {};
    if (triggerEl.dataset.influencerMbno) data.mbno = triggerEl.dataset.influencerMbno;

    const row = triggerEl.closest('tr');
    if (row && !data.mbno) {
      const table = row.closest('table');
      const headers = table ? Array.from(table.querySelectorAll('thead th')) : [];
      const idx = headers.findIndex(h => /신청번호|관리번호|번호/.test(h.textContent.trim()));
      if (idx >= 0 && row.cells[idx]) {
        const txt = row.cells[idx].textContent.trim();
        if (/^\d+$/.test(txt)) data.mbno = txt;
      }
    }
    return data;
  }

  function populate(data) {
    if (!drawer) return;
    if (data.mbno) {
      drawer.querySelectorAll('[data-influencer-mbno]').forEach(el => el.textContent = data.mbno);
    }
  }

  function open(triggerEl) {
    if (triggerEl && drawer) {
      populate(extractRowData(triggerEl));
    }
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // 트리거 버튼 클릭 시 드로어 오픈
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-influencer');
    if (!trigger) return;
    e.preventDefault();
    open(trigger);
  });

  // 행 어디를 눌러도 드로어 열기 (단, interactive element 클릭은 각자 처리)
  document.addEventListener('click', (e) => {
    // 이미 직접 트리거 버튼 클릭했거나 interactive 요소인 경우 skip
    if (e.target.closest('button, a, input, label, select, textarea')) return;
    const row = e.target.closest('tbody tr');
    if (!row) return;
    const trigger = row.querySelector('.js-open-influencer');
    if (!trigger) return;
    open(trigger);
  });
}

/** 헤더/사이드바 팝오버 (알림 벨, 유저 메뉴) */
function wireHeaderPopovers() {
  const pairs = [
    ['notif-btn', 'notif-popover'],
    ['user-menu-btn', 'user-menu-popover']
  ];
  pairs.forEach(([btnId, popId]) => {
    const btn = document.getElementById(btnId);
    const pop = document.getElementById(popId);
    if (!btn || !pop) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // 다른 팝오버 닫기
      pairs.forEach(([, otherId]) => {
        if (otherId !== popId) document.getElementById(otherId)?.classList.remove('open');
        const otherBtn = document.getElementById(pairs.find(p => p[1] === otherId)[0]);
        if (otherBtn && otherBtn !== btn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      const next = !pop.classList.contains('open');
      pop.classList.toggle('open', next);
      btn.setAttribute('aria-expanded', String(next));
    });
  });
  document.addEventListener('click', (e) => {
    pairs.forEach(([btnId, popId]) => {
      const btn = document.getElementById(btnId);
      const pop = document.getElementById(popId);
      if (!btn || !pop) return;
      if (!btn.contains(e.target) && !pop.contains(e.target)) {
        pop.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      pairs.forEach(([btnId, popId]) => {
        document.getElementById(popId)?.classList.remove('open');
        document.getElementById(btnId)?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/** Sortable column header — 클릭 시 none → asc → desc 순환 */
function wireSortableHeaders() {
  document.querySelectorAll('.tbl th.sortable').forEach(th => {
    th.setAttribute('role', 'button');
    th.setAttribute('tabindex', '0');
    th.addEventListener('click', () => toggleSort(th));
    th.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSort(th); }
    });
  });
}
function toggleSort(th) {
  const curAsc = th.classList.contains('is-asc');
  const curDesc = th.classList.contains('is-desc');
  // 같은 테이블의 다른 헤더 초기화
  th.closest('table').querySelectorAll('th.sortable').forEach(o => {
    o.classList.remove('is-asc', 'is-desc');
    o.setAttribute('aria-sort', 'none');
  });
  if (!curAsc && !curDesc) {
    th.classList.add('is-asc');
    th.setAttribute('aria-sort', 'ascending');
  } else if (curAsc) {
    th.classList.add('is-desc');
    th.setAttribute('aria-sort', 'descending');
  } else {
    th.setAttribute('aria-sort', 'none');
  }
}

/* ============================================================
   Toast system (global)
   사용: window.showToast('success', '저장됨', '설명 옵션')
   ============================================================ */
const TOAST_ICONS = {
  success: '<svg class="toast-icon icon-stroke" viewBox="0 0 24 24" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg>',
  error:   '<svg class="toast-icon icon-stroke" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  warning: '<svg class="toast-icon icon-stroke" viewBox="0 0 24 24" width="20" height="20"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  info:    '<svg class="toast-icon icon-stroke" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

window.showToast = function(type, title, desc, duration) {
  if (duration === undefined) duration = type === 'error' ? 7000 : 4500;
  let region = document.querySelector('.toast-region');
  if (!region) {
    region = document.createElement('div');
    region.className = 'toast-region';
    document.body.appendChild(region);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.innerHTML = `
    ${TOAST_ICONS[type] || TOAST_ICONS.info}
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${desc ? `<div class="toast-desc">${desc}</div>` : ''}
    </div>
    <button class="toast-close" aria-label="닫기">
      <svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  `;
  region.appendChild(toast);
  const dismiss = () => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 250);
  };
  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  if (duration) setTimeout(dismiss, duration);
};

/** 주요 버튼 자동 트리거 — 텍스트 기반 매칭 */
function wireToastAutoTriggers() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (!btn) return;
    // 모달/드로어/필터 토글/복사버튼 등 기능성 버튼은 제외
    if (btn.closest('.modal, .drawer, .cmdk, .toast') ||
        btn.matches('.js-open-influencer, .js-open-message, .js-close-message, .js-send-message, .modal-close, .toast-close, .bulk-close, .filter-chip-remove, .filter-chip-add, .country-selector, .cmdk-item, .tab, .density-btn, .btn-icon, .copy-btn, .cal-event, .cal-cell, .day-event-card, .day-event-filter-btn, .cal-nav-btn, .cal-monthnav-side, .cal-today-btn, .pg-btn, .f-pre, .pt-country, .sidebar-user-btn, .sidebar-ws-switch, .h-icon-btn, .tool-toggle, .h-menu-btn, .sidebar-cmdk, [data-cmdk-trigger], .widget-toggle, .htab, .nav-item, .ds-side-link, .modal-close, .h-popover-action, .notif-item, .user-menu-item')) return;
    // href가 있는 a 태그면 네비게이션이므로 제외
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href') !== '#') return;

    const text = (btn.textContent || '').replace(/\s+/g, ' ').trim();
    const map = {
      '검색하기':     ['info',    '검색 완료',        '조건에 맞는 결과를 불러왔습니다'],
      '검색':         ['info',    '검색 완료',        '조건에 맞는 결과를 불러왔습니다'],
      '엑셀다운':     ['success', '엑셀 다운로드',    '파일이 준비되었습니다'],
      '엑셀 다운':    ['success', '엑셀 다운로드',    '파일이 준비되었습니다'],
      '메모저장':     ['success', '메모 저장됨'],
      '저장':         ['success', '저장되었습니다'],
      '초기화':       ['info',    '필터 초기화됨'],
      '새 일정':      ['info',    '새 일정 작성',     '일정 등록 폼이 열립니다'],
      '공지 등록':    ['info',    '새 공지 작성',     '공지사항 작성 폼이 열립니다'],
      '새 캠페인':    ['info',    '새 캠페인 등록'],
      '상세보기':     ['info',    '상세 정보',         '상세 페이지로 이동합니다'],
      '정보보기':     ['info',    '정보 조회'],
      '리뷰어선정':   ['warning', '리뷰어 선정',       '선정 화면으로 이동합니다'],
      '리뷰어 선정':  ['warning', '리뷰어 선정',       '선정 화면으로 이동합니다'],
      '리뷰 감수':    ['info',    '리뷰 감수 페이지'],
      '초안수정요청': ['warning', '초안 수정 요청',    '요청 사유를 입력해 주세요'],
      '리뷰어 미선정':['warning', '리뷰어 미선정 처리'],
      '알림 발송':    ['success', '알림 발송 완료'],
      '일괄 채택':    ['success', '일괄 채택 완료'],
      '일괄 저장':    ['success', '일괄 저장 완료'],
      '제안 보내기':  ['info',    '제안 전송 완료'],
      '제안하기':     ['info',    '제안 전송 완료'],
      '거절':         ['error',   '거절 처리됨'],
      '채택':         ['success', '채택 완료'],
      '로그아웃':     ['info',    '로그아웃 처리', '세션이 종료됩니다']
    };
    const entry = map[text];
    if (entry) {
      e.preventDefault();
      showToast(entry[0], entry[1], entry[2]);
    }
  });
}

/** 현재 페이지 파일명 기준으로 사이드바 메뉴 활성화 + 탭별 그룹 필터링 */
function activateSidebarNav() {
  const currentFile = location.pathname.split('/').pop() || 'list.html';
  const activeTab = document.body.dataset.activeTab || '신청서관리';

  // 탭에 맞는 nav-group/nav-sep만 표시
  document.querySelectorAll('.nav-group[data-tab], .nav-sep[data-tab]').forEach(el => {
    el.style.display = el.dataset.tab === activeTab ? '' : 'none';
  });

  // 현재 페이지 활성화
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentFile) {
      item.classList.add('active');
    }
  });
}

/** data-active-tab 속성 기준으로 헤더 탭 활성화 */
function activateHeaderTab() {
  const activeTab = document.body.dataset.activeTab || '신청서관리';
  document.querySelectorAll('.htab').forEach(tab => {
    if (tab.dataset.tab === activeTab) {
      tab.classList.add('active');
    }
  });
}

/* ============================================================
   2025 Modern Admin Patterns
   ============================================================ */

/** ⌘K Command Palette — 전역 단축키 + 검색 필터 + ↑↓ Enter 네비게이션 */
function wireCommandPalette() {
  // 페이지에 이미 palette가 없으면 자동 주입
  let backdrop = document.getElementById('cmdk');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'cmdk';
    backdrop.className = 'cmdk-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');
    backdrop.setAttribute('aria-label', '명령 팔레트');
    backdrop.innerHTML = `
      <div class="cmdk" role="combobox" aria-expanded="true" aria-haspopup="listbox">
        <div class="cmdk-input-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input class="cmdk-input" type="text" placeholder="메뉴, 캠페인, 액션 검색…" aria-label="명령 검색">
          <span class="cmdk-esc"><kbd class="kbd kbd-sm">ESC</kbd></span>
        </div>
        <div class="cmdk-list" role="listbox"></div>
        <div class="cmdk-footer">
          <span class="cmdk-footer-item"><kbd class="kbd kbd-sm">↑</kbd><kbd class="kbd kbd-sm">↓</kbd> 이동</span>
          <span class="cmdk-footer-item"><kbd class="kbd kbd-sm">↵</kbd> 실행</span>
          <span class="cmdk-footer-item" style="margin-left:auto"><kbd class="kbd kbd-sm">⌘</kbd><kbd class="kbd kbd-sm">K</kbd> 열기</span>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);
  }

  const input = backdrop.querySelector('.cmdk-input');
  const list = backdrop.querySelector('.cmdk-list');

  const COMMANDS = [
    { group: '네비게이션', title: '대시보드', desc: 'KPI · 매출 · 최근 활동', icon: '◫', href: 'dashboard.html' },
    { group: '네비게이션', title: '캠페인 일정', desc: '월별 캠페인 타임라인', icon: '📅', href: 'campaign-calendar.html' },
    { group: '네비게이션', title: '캠페인일정관리목록', desc: '전체 일정 테이블 뷰', icon: '📊', href: 'campaign-schedule-list.html' },
    { group: '네비게이션', title: '신청목록', desc: '전체 리뷰 신청 관리', icon: '📋', href: 'list.html' },
    { group: '네비게이션', title: '선정목록', desc: '채택된 인플루언서', icon: '✓', href: 'list-selection.html' },
    { group: '네비게이션', title: '검수요청목록', desc: '리뷰 검수 대기', icon: '🔍', href: 'list-inspection.html' },
    { group: '네비게이션', title: '수정요청목록', desc: '수정 요청된 리뷰', icon: '✎', href: 'list-revision.html' },
    { group: '네비게이션', title: '등록완료목록', desc: '완료된 리뷰', icon: '✓', href: 'list-completed.html' },
    { group: '네비게이션', title: '선정후 취소목록', desc: '선정 후 취소된 건', icon: '✕', href: 'list-cancel-selected.html' },
    { group: '네비게이션', title: '인플루언서 취소 목록', desc: '인플루언서가 취소한 건', icon: '✕', href: 'list-cancel-influencer.html' },
    { group: '네비게이션', title: '미선정목록', desc: '선정되지 않은 지원자', icon: '○', href: 'list-unselected.html' },
    { group: '네비게이션', title: '인플루언서 탐색', desc: 'SNS 채널·국가별 검색', icon: '🔎', href: 'influencer-search.html' },
    { group: '네비게이션', title: '공지사항', desc: '입점업체 공지', icon: '📢', href: 'notice.html' },
    { group: '네비게이션', title: '요금표', desc: '제품형/방문형', icon: '₩', href: 'pricing.html' },
    { group: '액션', title: '새 캠페인 등록', desc: '캠페인을 만듭니다', icon: '+', kbd: ['N'] },
    { group: '액션', title: '엑셀 다운로드', desc: '현재 목록을 엑셀로', icon: '⬇', kbd: ['⌘','E'] },
    { group: '액션', title: '밀도 변경 (Compact)', desc: '테이블을 조밀하게', icon: '≡', action: () => setDensity('compact') },
    { group: '액션', title: '밀도 변경 (Comfortable)', desc: '테이블을 여유롭게', icon: '≡', action: () => setDensity('comfortable') },
    { group: '디자인 시스템', title: 'Design System 보기', desc: '모든 토큰과 컴포넌트', icon: '◇', href: 'design-system.html' },
    { group: '로그아웃', title: '로그아웃', desc: '현재 세션 종료', icon: '⏻' },
  ];

  let selectedIndex = 0;
  let filtered = COMMANDS;

  function render(items) {
    if (!items.length) {
      list.innerHTML = '<div class="cmdk-empty">일치하는 항목이 없습니다</div>';
      return;
    }
    const byGroup = items.reduce((acc, cmd) => {
      (acc[cmd.group] = acc[cmd.group] || []).push(cmd);
      return acc;
    }, {});

    list.innerHTML = Object.entries(byGroup).map(([g, cmds]) => `
      <div class="cmdk-group-title">${g}</div>
      ${cmds.map((c) => {
        const i = items.indexOf(c);
        return `
          <div class="cmdk-item" role="option" data-index="${i}" aria-selected="${i === selectedIndex}">
            <div class="cmdk-item-icon">${c.icon || '•'}</div>
            <div class="cmdk-item-body">
              <div class="cmdk-item-title">${c.title}</div>
              ${c.desc ? `<div class="cmdk-item-desc">${c.desc}</div>` : ''}
            </div>
            ${c.kbd ? `<span class="cmdk-item-kbd kbd-group">${c.kbd.map(k => `<kbd class="kbd kbd-sm">${k}</kbd>`).join('')}</span>` : ''}
          </div>
        `;
      }).join('')}
    `).join('');
  }

  function openPalette() {
    backdrop.classList.add('open');
    input.value = '';
    selectedIndex = 0;
    filtered = COMMANDS;
    render(filtered);
    setTimeout(() => input.focus(), 50);
  }
  function closePalette() {
    backdrop.classList.remove('open');
  }
  function runAt(i) {
    const cmd = filtered[i];
    if (!cmd) return;
    closePalette();
    if (cmd.href) location.href = cmd.href;
    else if (cmd.action) cmd.action();
  }

  // Keyboard: ⌘K / Ctrl+K / "/" to open, ESC to close
  document.addEventListener('keydown', (e) => {
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) closePalette();
      else openPalette();
      return;
    }
    if (e.key === '/' && document.activeElement === document.body) {
      e.preventDefault();
      openPalette();
      return;
    }
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closePalette(); }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
      render(filtered);
      list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      render(filtered);
      list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter') { e.preventDefault(); runAt(selectedIndex); }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    filtered = q
      ? COMMANDS.filter(c =>
          c.title.toLowerCase().includes(q) ||
          (c.desc && c.desc.toLowerCase().includes(q)) ||
          c.group.toLowerCase().includes(q))
      : COMMANDS;
    selectedIndex = 0;
    render(filtered);
  });

  list.addEventListener('click', (e) => {
    const item = e.target.closest('.cmdk-item');
    if (!item) return;
    runAt(Number(item.dataset.index));
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  // 사이드바 CMDK 트리거 + 기타 [data-cmdk-trigger] 전부
  document.querySelectorAll('[data-cmdk-trigger]').forEach(el => {
    el.addEventListener('click', openPalette);
  });
}

/** 인라인 복사 버튼 — [data-copy="값"] 요소에 자동 부착 */
function wireCopyButtons() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    const target = btn.closest('[data-copy]') || btn;
    const text = target.dataset.copy || btn.dataset.copy;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('copied');
      const original = btn.innerHTML;
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = original; }, 1400);
    } catch (err) {
      console.warn('clipboard unavailable', err);
    }
  });
}

/** 밀도 토글 — [data-density-toggle] 그룹에서 compact/comfortable 버튼 */
function setDensity(mode) {
  document.body.dataset.density = mode;
  try { localStorage.setItem('alpha-density', mode); } catch {}
  document.querySelectorAll('.density-btn').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.density === mode));
  });
}
function wireDensityToggle() {
  const saved = (() => { try { return localStorage.getItem('alpha-density'); } catch { return null; } })();
  if (saved) setDensity(saved);
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.density-btn');
    if (!btn) return;
    setDensity(btn.dataset.density);
  });
}

/** 벌크 액션 바 — 테이블 체크박스 선택 개수에 따라 표시/숨김 */
function wireBulkBar() {
  document.querySelectorAll('[data-bulk-scope]').forEach(scope => {
    const bar = document.querySelector(scope.dataset.bulkScope);
    if (!bar) return;
    const countEl = bar.querySelector('[data-bulk-count]');
    const checkboxes = () => scope.querySelectorAll('tbody input[type="checkbox"]');
    const headCheckbox = scope.querySelector('thead input[type="checkbox"]');

    function update() {
      const n = [...checkboxes()].filter(c => c.checked).length;
      if (countEl) countEl.textContent = String(n);
      bar.classList.toggle('visible', n > 0);
    }
    scope.addEventListener('change', (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        if (e.target === headCheckbox) {
          checkboxes().forEach(c => { c.checked = headCheckbox.checked; });
        }
        update();
      }
    });
    bar.querySelector('.bulk-close')?.addEventListener('click', () => {
      checkboxes().forEach(c => c.checked = false);
      if (headCheckbox) headCheckbox.checked = false;
      update();
    });
  });
}

/** 모바일에서 햄버거 버튼으로 사이드바 드로어 토글 */
function wireMobileSidebar() {
  const btn = document.querySelector('.h-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;

  // 백드롭 생성
  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  const close = () => {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };
  const toggle = () => {
    const opening = !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', opening);
    backdrop.classList.toggle('open', opening);
    btn.setAttribute('aria-expanded', String(opening));
  };

  btn.addEventListener('click', toggle);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
