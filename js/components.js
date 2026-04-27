/**
 * Alphacollabo Admin — Component Loader
 * 사이드바/헤더를 외부 파일에서 불러와 삽입하고, 현재 페이지에 맞춰 활성 상태를 설정
 */

// ===== Auth Guard — login.html 외 모든 페이지에서 세션 체크 =====
(function authGuard() {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const PUBLIC = ['login.html', 'index.html', 'design-system.html', ''];
  if (PUBLIC.includes(file)) return;
  let ok = false;
  try { ok = sessionStorage.getItem('alpha-auth') === '1'; } catch(_) {}
  if (!ok) location.replace('login.html');
})();

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
  wireViewToggle();

  // Confirm 모달 자동 주입
  if (!document.querySelector('.js-confirm-backdrop')) {
    const res = await fetch('components/modal-confirm.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireConfirmModal();

  // Propose 모달 자동 주입
  if (!document.querySelector('.js-propose-backdrop')) {
    const res = await fetch('components/modal-propose.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireProposeModal();

  // Shipping 모달 자동 주입
  if (!document.querySelector('.js-shipping-backdrop')) {
    const res = await fetch('components/modal-shipping.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireShippingModal();

  // Address 모달 자동 주입
  if (!document.querySelector('.js-address-backdrop')) {
    const res = await fetch('components/modal-address.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireAddressModal();

  // Review 모달 자동 주입
  if (!document.querySelector('.js-review-backdrop')) {
    const res = await fetch('components/modal-review.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      const el = wrap.firstElementChild;
      if (el) document.body.appendChild(el);
    }
  }
  wireReviewModal();

  // Revision Drawer 자동 주입 (backdrop + drawer 2개 요소)
  if (!document.querySelector('.js-revision-backdrop')) {
    const res = await fetch('components/modal-revision.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      Array.from(wrap.children).forEach(el => document.body.appendChild(el));
    }
  }
  wireRevisionModal();

  // Balance Drawer 자동 주입 (backdrop + drawer 2개 요소)
  if (!document.querySelector('.js-balance-backdrop')) {
    const res = await fetch('components/drawer-balance.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      Array.from(wrap.children).forEach(el => document.body.appendChild(el));
    }
  }
  wireBalanceDrawer();

  // Memo Drawer 자동 주입 (사이드바 [관리메모] 미니 + 풀 편집 Drawer)
  if (!document.querySelector('.js-memo-backdrop')) {
    const res = await fetch('components/drawer-memo.html' + bust, { cache: 'no-store' });
    if (res.ok) {
      const wrap = document.createElement('div');
      wrap.innerHTML = await res.text();
      Array.from(wrap.children).forEach(el => document.body.appendChild(el));
    }
  }
  wireMemoTool();

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
  wireLogout();
});

/** 로그아웃 — 헤더의 로그아웃 버튼 클릭 시 세션 제거 + login.html 이동 */
function wireLogout() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (!btn) return;
    const text = (btn.textContent || '').trim();
    if (text !== '로그아웃') return;
    e.preventDefault();
    if (typeof window.showConfirm === 'function') {
      window.showConfirm({
        title: '로그아웃 하시겠습니까?',
        desc: '세션이 종료되며 로그인 화면으로 이동합니다.',
        variant: 'warning',
      }).then(ok => {
        if (!ok) return;
        try { sessionStorage.removeItem('alpha-auth'); } catch(_) {}
        location.href = 'login.html';
      });
    } else {
      try { sessionStorage.removeItem('alpha-auth'); } catch(_) {}
      location.href = 'login.html';
    }
  });
}

/** View Toggle — 리스트/카드 뷰 전환 */
function wireViewToggle() {
  const toggle = document.querySelector('.view-toggle');
  if (!toggle) return;
  const listEl = document.getElementById('view-list');
  const cardEl = document.getElementById('view-card');
  if (!listEl || !cardEl) return;

  toggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-toggle-btn');
    if (!btn) return;
    const view = btn.dataset.view;

    toggle.querySelectorAll('.view-toggle-btn').forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    if (view === 'list') {
      listEl.hidden = false;
      cardEl.hidden = true;
    } else {
      listEl.hidden = true;
      cardEl.hidden = false;
    }
  });
}

/** Confirm 모달 — window.showConfirm({title, desc, variant, okText, cancelText}) Promise<boolean> */
function wireConfirmModal() {
  const backdrop = document.querySelector('.js-confirm-backdrop');
  if (!backdrop) return;
  const modal = backdrop.querySelector('.modal-confirm');
  const titleEl = backdrop.querySelector('[data-confirm-title]');
  const descEl = backdrop.querySelector('[data-confirm-desc]');
  const okBtn = backdrop.querySelector('[data-confirm-ok]');
  const cancelBtn = backdrop.querySelector('[data-confirm-cancel]');

  let resolver = null;
  function close(result) {
    backdrop.hidden = true;
    if (resolver) { resolver(result); resolver = null; }
  }

  window.showConfirm = function(opts = {}) {
    // 이미 열려 있으면 중복 호출 차단 (이전 Promise overwrite 방지)
    if (!backdrop.hidden) return Promise.resolve(false);
    return new Promise(resolve => {
      resolver = resolve;
      titleEl.textContent = opts.title || '작업을 진행하시겠습니까?';
      descEl.textContent = opts.desc || '';
      okBtn.textContent = opts.okText || '확인';
      cancelBtn.textContent = opts.cancelText || '취소';
      modal.dataset.variant = opts.variant || 'warning';  // warning | danger | info | success
      backdrop.hidden = false;
      requestAnimationFrame(() => okBtn.focus());
    });
  };

  okBtn.addEventListener('click', () => close(true));
  cancelBtn.addEventListener('click', () => close(false));
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) close(false);
  });
}

/** Propose 모달 — 제안하기 버튼 클릭 시 열기 */
function wireProposeModal() {
  const backdrop = document.querySelector('.js-propose-backdrop');
  if (!backdrop) return;

  function open(recipient) {
    if (recipient) {
      const nameEl = backdrop.querySelector('[data-propose-recipient-name]');
      const countryEl = backdrop.querySelector('[data-propose-recipient-country]');
      const subEl = backdrop.querySelector('[data-propose-recipient-sub]');
      if (nameEl && recipient.name) nameEl.textContent = recipient.name;
      if (countryEl && recipient.country) countryEl.textContent = recipient.country;
      if (subEl && recipient.sub) subEl.textContent = recipient.sub;
    }
    backdrop.hidden = false;
    setTimeout(() => backdrop.querySelector('.modal-close')?.focus(), 50);
  }
  function close() { backdrop.hidden = true; }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-propose');
    if (trigger) {
      e.preventDefault();
      const row = trigger.closest('tr');
      const recipient = row ? {
        name: row.dataset.name || row.querySelector('[data-name]')?.textContent?.trim(),
        country: row.dataset.country || row.querySelector('.c-country-code')?.textContent?.trim(),
        sub: row.dataset.sub,
      } : null;
      open(recipient);
      return;
    }
    if (e.target.closest('.js-close-propose')) close();
    if (e.target === backdrop) close();
  });

  // 체크박스 개수 실시간 카운트 + 버튼 활성화
  backdrop.addEventListener('change', () => {
    const checked = backdrop.querySelectorAll('.mp-camp-chk:checked').length;
    const countEl = backdrop.querySelector('[data-propose-selected]');
    const sendBtn = backdrop.querySelector('.js-send-propose');
    if (countEl) countEl.textContent = checked;
    if (sendBtn) sendBtn.disabled = checked === 0;
  });
  // 메시지 글자수
  backdrop.addEventListener('input', (e) => {
    if (e.target.matches('.mp-textarea')) {
      const counter = backdrop.querySelector('[data-propose-count]');
      if (counter) counter.textContent = e.target.value.length;
    }
  });
  // 제안 보내기
  backdrop.querySelector('.js-send-propose')?.addEventListener('click', () => {
    close();
    if (typeof window.showToast === 'function') window.showToast('success', '제안 전송 완료');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) close();
  });
}

/** Shipping Modal — 배송정보 입력. 버튼 .js-open-shipping 자동 연결 + window.showShipping(opts) */
function wireShippingModal() {
  const backdrop = document.querySelector('.js-shipping-backdrop');
  if (!backdrop) return;

  const form = {
    carrier: backdrop.querySelector('#ms-carrier'),
    carrierOther: backdrop.querySelector('#ms-carrier-other'),
    carrierOtherField: backdrop.querySelector('.ms-field-other'),
    tracking: backdrop.querySelector('#ms-tracking'),
    nameEl: backdrop.querySelector('[data-shipping-recipient-name]'),
    countryEl: backdrop.querySelector('[data-shipping-recipient-country]'),
    subEl: backdrop.querySelector('[data-shipping-recipient-sub]'),
    titleEl: backdrop.querySelector('#modal-shipping-title'),
    saveBtn: backdrop.querySelector('.js-save-shipping'),
  };

  function resetForm() {
    if (form.carrier) form.carrier.selectedIndex = 0;
    if (form.carrierOther) form.carrierOther.value = '';
    if (form.carrierOtherField) form.carrierOtherField.hidden = true;
    if (form.tracking) form.tracking.value = '';
  }

  function open(recipient, prefill) {
    resetForm();
    if (recipient) {
      if (form.nameEl && recipient.name) form.nameEl.textContent = recipient.name;
      if (form.countryEl && recipient.country) form.countryEl.textContent = recipient.country;
      if (form.subEl && recipient.sub) form.subEl.textContent = recipient.sub;
    }
    const isEdit = !!(prefill && (prefill.carrier || prefill.tracking));
    if (isEdit) {
      if (prefill.carrier && form.carrier) {
        const hasOption = Array.from(form.carrier.options).some(o => o.value === prefill.carrier);
        form.carrier.value = hasOption ? prefill.carrier : 'other';
        if (form.carrier.value === 'other' && form.carrierOtherField) {
          form.carrierOtherField.hidden = false;
          if (form.carrierOther && prefill.carrierOther) form.carrierOther.value = prefill.carrierOther;
        }
      }
      if (prefill.tracking && form.tracking) form.tracking.value = prefill.tracking;
    }
    if (form.titleEl) form.titleEl.textContent = isEdit ? '배송정보 수정' : '배송정보 입력';
    if (form.saveBtn) form.saveBtn.textContent = isEdit ? '수정 저장' : '저장';
    backdrop.hidden = false;
    setTimeout(() => form.carrier?.focus(), 50);
  }
  function close() { backdrop.hidden = true; }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-shipping');
    if (trigger) {
      e.preventDefault();
      const row = trigger.closest('tr');
      const recipient = row ? {
        name: row.dataset.name,
        country: row.dataset.country,
        sub: row.dataset.sub,
      } : null;
      const prefill = (trigger.dataset.prefillCarrier || trigger.dataset.prefillTracking) ? {
        carrier: trigger.dataset.prefillCarrier,
        carrierOther: trigger.dataset.prefillCarrierOther,
        tracking: trigger.dataset.prefillTracking,
      } : null;
      open(recipient, prefill);
      return;
    }
    if (e.target.closest('.js-close-shipping')) close();
    if (e.target === backdrop) close();
  });

  // 택배사 "기타" 선택 시 직접입력 필드 표시
  form.carrier?.addEventListener('change', () => {
    if (!form.carrierOtherField) return;
    const isOther = form.carrier.value === 'other';
    form.carrierOtherField.hidden = !isOther;
    if (isOther) setTimeout(() => form.carrierOther?.focus(), 30);
  });

  // 저장
  backdrop.querySelector('.js-save-shipping')?.addEventListener('click', () => {
    const carrierVal = form.carrier?.value;
    const trackingVal = form.tracking?.value?.trim();
    const otherVal = form.carrierOther?.value?.trim();

    if (!carrierVal) {
      if (typeof window.showToast === 'function') window.showToast('warning', '택배사를 선택해주세요');
      form.carrier?.focus();
      return;
    }
    if (carrierVal === 'other' && !otherVal) {
      if (typeof window.showToast === 'function') window.showToast('warning', '택배사명을 입력해주세요');
      form.carrierOther?.focus();
      return;
    }
    if (!trackingVal) {
      if (typeof window.showToast === 'function') window.showToast('warning', '송장번호를 입력해주세요');
      form.tracking?.focus();
      return;
    }

    close();
    if (typeof window.showToast === 'function') window.showToast('success', '배송정보 저장 완료');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) close();
  });

  // 외부 API
  window.showShipping = (opts = {}) => open(opts);
}

/** Address Modal — 배송지 정보 조회 + 메모. .js-open-address 버튼 자동 연결 */
function wireAddressModal() {
  const backdrop = document.querySelector('.js-address-backdrop');
  if (!backdrop) return;

  const slots = {
    name: backdrop.querySelector('[data-address-recipient-name]'),
    country: backdrop.querySelector('[data-address-recipient-country]'),
    sub: backdrop.querySelector('[data-address-recipient-sub]'),
    addrName: backdrop.querySelector('[data-address-name]'),
    addrPhone: backdrop.querySelector('[data-address-phone]'),
    addrEmail: backdrop.querySelector('[data-address-email]'),
    addrZip: backdrop.querySelector('[data-address-zip]'),
    addrAddr: backdrop.querySelector('[data-address-addr]'),
    memo: backdrop.querySelector('#ma-memo-input'),
  };

  function open(data) {
    if (data) {
      if (slots.name && data.name) slots.name.textContent = data.name;
      if (slots.country && data.country) slots.country.textContent = data.country;
      if (slots.sub && data.sub) slots.sub.textContent = data.sub;
      if (slots.addrName && data.recipientName) slots.addrName.textContent = data.recipientName;
      if (slots.addrPhone && data.phone) slots.addrPhone.textContent = data.phone;
      if (slots.addrEmail && data.email) slots.addrEmail.textContent = data.email;
      if (slots.addrZip && data.zip) slots.addrZip.textContent = data.zip;
      if (slots.addrAddr && data.addr) slots.addrAddr.textContent = data.addr;
    }
    backdrop.hidden = false;
    setTimeout(() => backdrop.querySelector('.modal-close')?.focus(), 50);
  }
  function close() { backdrop.hidden = true; }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-address');
    if (trigger) {
      e.preventDefault();
      const row = trigger.closest('tr');
      const data = row ? {
        name: row.dataset.name,
        country: row.dataset.country,
        sub: row.dataset.sub,
      } : null;
      open(data);
      return;
    }
    if (e.target.closest('.js-close-address')) close();
    if (e.target === backdrop) close();
  });

  backdrop.querySelector('.js-save-address-memo')?.addEventListener('click', () => {
    close();
    if (typeof window.showToast === 'function') window.showToast('success', '배송 메모 저장됨');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) close();
  });

  window.showAddress = (opts = {}) => open(opts);
}

/** Review Modal — 리뷰 검수. .js-open-review 버튼 자동 연결 */
function wireReviewModal() {
  const backdrop = document.querySelector('.js-review-backdrop');
  if (!backdrop) return;

  const slots = {
    campaign: backdrop.querySelector('[data-review-campaign]'),
    recipient: backdrop.querySelector('[data-review-recipient]'),
    country: backdrop.querySelector('[data-review-country]'),
    date: backdrop.querySelector('[data-review-date]'),
    ack: backdrop.querySelector('.js-review-ack'),
    confirmBtn: backdrop.querySelector('.js-review-confirm'),
  };

  function resetForm() {
    if (slots.ack) slots.ack.checked = false;
    if (slots.confirmBtn) slots.confirmBtn.disabled = true;
  }

  function open(data) {
    resetForm();
    if (data) {
      if (slots.campaign && data.campaign) slots.campaign.textContent = data.campaign;
      if (slots.recipient && data.recipient) slots.recipient.textContent = data.recipient;
      if (slots.country && data.country) slots.country.textContent = data.country;
      if (slots.date && data.date) slots.date.textContent = data.date;
    }
    backdrop.hidden = false;
    setTimeout(() => backdrop.querySelector('.modal-close')?.focus(), 50);
  }
  function close() { backdrop.hidden = true; }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-review');
    if (trigger) {
      e.preventDefault();
      const row = trigger.closest('tr');
      let campaign, recipient, country, date;
      if (row) {
        campaign = row.dataset.campaign || row.querySelector('.c-camp-name')?.textContent?.trim();
        recipient = row.dataset.recipient || row.dataset.name;
        country = row.dataset.country || row.querySelector('.c-country-code')?.textContent?.trim();
        date = row.dataset.date;
      }
      open({ campaign, recipient, country, date });
      return;
    }
    if (e.target.closest('.js-close-review')) close();
    if (e.target === backdrop) close();
  });

  // 체크박스 → 버튼 활성
  slots.ack?.addEventListener('change', () => {
    if (slots.confirmBtn) slots.confirmBtn.disabled = !slots.ack.checked;
  });

  // 컨펌 완료 → 확인 다이얼로그 → 성공 토스트
  slots.confirmBtn?.addEventListener('click', async () => {
    if (!slots.ack?.checked) return;
    const ok = typeof window.showConfirm === 'function'
      ? await window.showConfirm({
          title: '컨펌 완료 처리하시겠습니까?',
          desc: '처리 후에는 재수정이 불가능합니다.',
          variant: 'warning',
        })
      : true;
    if (!ok) return;
    close();
    if (typeof window.showToast === 'function') window.showToast('success', '리뷰 컨펌 완료');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.hidden) close();
  });

  window.showReview = (opts = {}) => open(opts);
}

/** Revision Drawer — 초안 수정 요청 (클라이언트 ↔ 스태프 메시지). .js-open-revision 자동 연결 */
function wireRevisionModal() {
  const backdrop = document.querySelector('.js-revision-backdrop');
  const drawer = document.querySelector('.js-revision-drawer');
  if (!backdrop || !drawer) return;

  const slots = {
    campaign: drawer.querySelector('[data-revision-campaign]'),
    recipient: drawer.querySelector('[data-revision-recipient]'),
    country: drawer.querySelector('[data-revision-country]'),
    thread: drawer.querySelector('[data-revision-thread]'),
    input: drawer.querySelector('.dv-input'),
  };

  function open(data) {
    if (data) {
      if (slots.campaign && data.campaign) slots.campaign.textContent = data.campaign;
      if (slots.recipient && data.recipient) slots.recipient.textContent = data.recipient;
      if (slots.country && data.country) slots.country.textContent = data.country;
    }
    if (slots.input) slots.input.value = '';
    backdrop.hidden = false;
    drawer.hidden = false;
    // 다음 프레임에 open 클래스 부여해서 슬라이드 애니메이션 작동
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
      drawer.classList.add('open');
    });
    setTimeout(() => {
      if (slots.thread) slots.thread.scrollTop = slots.thread.scrollHeight;
      slots.input?.focus();
    }, 250);
  }
  function close() {
    backdrop.classList.remove('open');
    drawer.classList.remove('open');
    setTimeout(() => {
      backdrop.hidden = true;
      drawer.hidden = true;
    }, 220);
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-revision');
    if (trigger) {
      e.preventDefault();
      const row = trigger.closest('tr');
      const data = row ? {
        campaign: row.querySelector('.c-camp-name')?.textContent?.trim(),
        recipient: row.dataset.name || row.cells?.[4]?.textContent?.trim(),
        country: row.dataset.country || row.querySelector('.c-country-code')?.textContent?.trim(),
      } : null;
      open(data);
      return;
    }
    if (e.target.closest('.js-close-revision')) close();
    if (e.target === backdrop) close();
  });

  // 보내기 — 스레드에 클라이언트 메시지 append + 입력창 초기화 + 토스트
  drawer.querySelector('.js-send-revision')?.addEventListener('click', () => {
    const text = slots.input?.value?.trim();
    if (!text) {
      if (typeof window.showToast === 'function') window.showToast('warning', '메시지를 입력해주세요');
      slots.input?.focus();
      return;
    }
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const ts = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const hhmm = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    const msg = document.createElement('div');
    msg.className = 'dv-msg dv-msg--client';
    msg.innerHTML = `
      <div class="dv-msg-content">
        <div class="dv-msg-meta">
          <span class="dv-msg-author">milla_company</span>
        </div>
        <div class="dv-msg-bubble"></div>
        <div class="dv-msg-time">${hhmm}</div>
      </div>
      <span class="dv-msg-avatar" aria-hidden="true">M</span>`;
    msg.querySelector('.dv-msg-bubble').textContent = text;
    slots.thread?.appendChild(msg);
    slots.thread.scrollTop = slots.thread.scrollHeight;
    slots.input.value = '';
    if (typeof window.showToast === 'function') window.showToast('success', '수정 요청이 전달되었습니다');
  });

  slots.input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      drawer.querySelector('.js-send-revision')?.click();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });

  window.showRevision = (opts = {}) => open(opts);
}

/** Balance Drawer — 헤더 ".h-balance" 클릭 → 차감 현황 요약 드로어 */
function wireBalanceDrawer() {
  const backdrop = document.querySelector('.js-balance-backdrop');
  const drawer = document.querySelector('.js-balance-drawer');
  if (!backdrop || !drawer) return;

  function open() {
    backdrop.hidden = false;
    drawer.hidden = false;
    requestAnimationFrame(() => {
      backdrop.classList.add('open');
      drawer.classList.add('open');
    });
  }
  function close() {
    backdrop.classList.remove('open');
    drawer.classList.remove('open');
    setTimeout(() => {
      backdrop.hidden = true;
      drawer.hidden = true;
    }, 220);
  }

  document.addEventListener('click', (e) => {
    // 헤더 잔액 pill 전체 또는 js-open-balance 클래스 요소
    const trigger = e.target.closest('.h-balance, .js-open-balance');
    if (trigger) {
      // 드로어가 이미 열린 balance-history.html 내부 링크는 그대로 동작
      const isFullPageLink = trigger.classList.contains('db-footer-link');
      if (isFullPageLink) return;
      e.preventDefault();
      open();
      return;
    }
    if (e.target.closest('.js-close-balance')) close();
    if (e.target === backdrop) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
  });

  window.showBalance = () => open();
}

/** Memo Tool — 사이드바 [관리메모] 미니 리스트 + Drawer 풀 편집. localStorage 영속 */
function wireMemoTool() {
  const STORAGE_KEY = 'alpha-admin-memos-v2';
  const sidebar = document.querySelector('.sidebar-tools');
  if (!sidebar) return;

  const list = sidebar.querySelector('[data-memo-list]');
  const empty = sidebar.querySelector('[data-memo-empty]');
  const search = sidebar.querySelector('[data-memo-search]');
  if (!list || !empty) return;

  const drawerBackdrop = document.querySelector('.js-memo-backdrop');
  const drawer = document.querySelector('.js-memo-drawer');
  if (!drawerBackdrop || !drawer) return;

  const titleInput = drawer.querySelector('[data-memo-title]');
  const bodyInput = drawer.querySelector('[data-memo-body]');
  const tagsWrap = drawer.querySelector('[data-memo-tags]');
  const tagInput = drawer.querySelector('[data-memo-tag-input]');
  const pinBtn = drawer.querySelector('[data-memo-pin]');
  const saveBtn = drawer.querySelector('[data-memo-save]');
  const deleteBtn = drawer.querySelector('[data-memo-delete]');
  const metaEl = drawer.querySelector('[data-memo-meta]');
  const titleEl = drawer.querySelector('#drawer-memo-title');

  let memos = loadMemos();
  let currentId = null;
  let editingTags = [];

  function loadMemos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}
    // 시연용 시드 — 실제 운영 데이터 톤. 처음 1회만 주입 후 저장 → 이후 사용자 편집 결과만 유지
    const seed = [
      {
        id: 'memo_seed_1',
        title: '#1769756657 배송 URL 재확인',
        body: 'mei_xian 신청건에서 배송 URL 누락된 채 검수 요청됨. 클라이언트에 재확인 메시지 발송 (4월 24일 16:43).',
        pinned: true,
        tags: ['검수', '배송'],
        createdAt: '2026-04-24T16:43:00.000Z',
        updatedAt: '2026-04-24T16:43:00.000Z',
      },
      {
        id: 'memo_seed_2',
        title: 'natasha_mood — 제안서 회신 마감 4/30',
        body: '추가 협의 회신 필요. 일정 재확정 / 단가 조율 / 콘텐츠 톤 가이드 첨부.',
        pinned: false,
        tags: ['제안', 'natasha_mood'],
        createdAt: '2026-04-22T15:48:00.000Z',
        updatedAt: '2026-04-23T09:20:00.000Z',
      },
      {
        id: 'memo_seed_3',
        title: '검수 가이드 — 영양정보 표기 의무화',
        body: '식품 카테고리 캠페인부터 영양정보 표기 의무화. 인플루언서 안내문 4월 말 배포 예정.',
        pinned: false,
        tags: ['가이드'],
        createdAt: '2026-04-18T11:02:00.000Z',
        updatedAt: '2026-04-18T11:02:00.000Z',
      },
    ];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(seed)); } catch (_) {}
    return seed;
  }

  function saveMemos() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(memos)); } catch (_) {}
  }

  function escapeHtml(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    })[c]);
  }

  function fmtRelative(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return '방금';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}일 전`;
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear().toString().slice(2)}.${pad(d.getMonth()+1)}.${pad(d.getDate())}`;
  }

  function fmtAbsolute(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function getQuery() { return (search?.value || '').trim().toLowerCase(); }

  function filterMemos() {
    const sorted = [...memos].sort((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
    const q = getQuery();
    if (!q) return sorted;
    return sorted.filter(m =>
      (m.title || '').toLowerCase().includes(q) ||
      (m.body || '').toLowerCase().includes(q) ||
      (m.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  function renderList() {
    list.innerHTML = '';
    if (memos.length === 0) {
      empty.hidden = false;
      list.hidden = true;
      return;
    }
    empty.hidden = true;
    list.hidden = false;

    const filtered = filterMemos();
    if (filtered.length === 0) {
      const li = document.createElement('li');
      li.className = 'memo-empty-search';
      li.textContent = '검색 결과 없음';
      list.appendChild(li);
      return;
    }
    filtered.forEach(m => {
      const li = document.createElement('li');
      li.className = 'memo-item' + (m.pinned ? ' is-pinned' : '');
      li.dataset.id = m.id;
      li.tabIndex = 0;
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', `메모 편집: ${m.title || '제목 없음'}`);
      li.innerHTML = `
        ${m.pinned ? '<svg class="memo-item-pin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17v5"/><path d="M9 10.76V6h6v4.76l3 3.24v3H6v-3z"/></svg>' : ''}
        <span class="memo-item-title">${escapeHtml(m.title || '제목 없음')}</span>
        <span class="memo-item-time">${fmtRelative(m.updatedAt)}</span>
      `;
      const open = () => openDrawer(m.id);
      li.addEventListener('click', open);
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
      list.appendChild(li);
    });
  }

  function renderTagChips() {
    tagsWrap.querySelectorAll('.dm-tag-chip').forEach(c => c.remove());
    editingTags.forEach((t, i) => {
      const chip = document.createElement('span');
      chip.className = 'dm-tag-chip';
      chip.innerHTML = `${escapeHtml(t)}<button class="dm-tag-chip-remove" type="button" aria-label="${escapeHtml(t)} 태그 제거"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18"/></svg></button>`;
      chip.querySelector('.dm-tag-chip-remove').addEventListener('click', () => {
        editingTags.splice(i, 1);
        renderTagChips();
      });
      tagsWrap.insertBefore(chip, tagInput);
    });
  }

  function openDrawer(id) {
    const memo = id ? memos.find(m => m.id === id) : null;
    currentId = memo ? memo.id : null;
    titleInput.value = memo?.title || '';
    bodyInput.value = memo?.body || '';
    editingTags = memo ? [...(memo.tags || [])] : [];
    pinBtn.setAttribute('aria-pressed', String(!!memo?.pinned));
    titleEl.textContent = memo ? '메모 편집' : '새 메모';
    metaEl.textContent = memo ? `최근 저장 ${fmtAbsolute(memo.updatedAt)}` : '저장 전';
    deleteBtn.disabled = !memo;
    renderTagChips();
    drawerBackdrop.hidden = false;
    drawer.hidden = false;
    requestAnimationFrame(() => {
      drawerBackdrop.classList.add('open');
      drawer.classList.add('open');
      setTimeout(() => titleInput.focus(), 80);
    });
  }

  function closeDrawer() {
    drawerBackdrop.classList.remove('open');
    drawer.classList.remove('open');
    setTimeout(() => {
      drawerBackdrop.hidden = true;
      drawer.hidden = true;
    }, 250);
  }

  function saveMemo() {
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title && !body) {
      if (typeof window.showToast === 'function') window.showToast('warning', '내용을 입력해주세요');
      return;
    }
    const now = new Date().toISOString();
    const pinned = pinBtn.getAttribute('aria-pressed') === 'true';
    if (currentId) {
      const m = memos.find(x => x.id === currentId);
      if (m) {
        m.title = title || '제목 없음';
        m.body = body;
        m.tags = [...editingTags];
        m.pinned = pinned;
        m.updatedAt = now;
      }
    } else {
      memos.push({
        id: 'memo_' + Math.random().toString(36).slice(2, 10),
        title: title || '제목 없음',
        body,
        tags: [...editingTags],
        pinned,
        createdAt: now,
        updatedAt: now,
      });
    }
    saveMemos();
    renderList();
    if (typeof window.showToast === 'function') window.showToast('success', '메모 저장됨');
    closeDrawer();
  }

  function deleteMemo() {
    if (!currentId) return;
    const proceed = () => {
      memos = memos.filter(m => m.id !== currentId);
      saveMemos();
      renderList();
      if (typeof window.showToast === 'function') window.showToast('success', '메모 삭제됨');
      closeDrawer();
    };
    if (typeof window.showConfirm === 'function') {
      window.showConfirm({
        title: '이 메모를 삭제할까요?',
        desc: '삭제한 메모는 복구되지 않아요.',
        variant: 'danger',
        okText: '삭제',
      }).then(ok => { if (ok) proceed(); });
    } else if (window.confirm('이 메모를 삭제할까요?')) {
      proceed();
    }
  }

  // Wire — 검색
  search?.addEventListener('input', renderList);

  // Wire — 신규 (사이드바 + 빈 상태 모두)
  document.addEventListener('click', (e) => {
    const newBtn = e.target.closest('[data-memo-new]');
    if (newBtn) { e.preventDefault(); openDrawer(null); }
  });

  // Wire — Drawer 닫기
  drawer.querySelectorAll('.js-close-memo').forEach(btn => btn.addEventListener('click', closeDrawer));
  drawerBackdrop.addEventListener('click', e => { if (e.target === drawerBackdrop) closeDrawer(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    // Cmd/Ctrl+S 저장 (Drawer 활성 시)
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && drawer.classList.contains('open')) {
      e.preventDefault();
      saveMemo();
    }
  });

  // Wire — 핀 토글
  pinBtn.addEventListener('click', () => {
    const cur = pinBtn.getAttribute('aria-pressed') === 'true';
    pinBtn.setAttribute('aria-pressed', String(!cur));
  });

  // Wire — 태그 입력
  tagInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const v = tagInput.value.trim().replace(/^,+|,+$/g, '');
      if (v && !editingTags.includes(v) && editingTags.length < 8) {
        editingTags.push(v);
        renderTagChips();
      }
      tagInput.value = '';
    } else if (e.key === 'Backspace' && !tagInput.value && editingTags.length) {
      editingTags.pop();
      renderTagChips();
    }
  });
  tagInput.addEventListener('blur', () => {
    const v = tagInput.value.trim();
    if (v && !editingTags.includes(v) && editingTags.length < 8) {
      editingTags.push(v);
      renderTagChips();
      tagInput.value = '';
    }
  });

  saveBtn.addEventListener('click', saveMemo);
  deleteBtn.addEventListener('click', deleteMemo);

  renderList();
}

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
    'no-visit': {
      title: '인플루언서가 방문하지 않았어요',
      body: '<p>업체에서 <strong>미방문 처리</strong> 후 실제 방문이 이루어지지 않은 경우, 해당 인플루언서 차감금은 복구됩니다.</p>',
    },
    'draft-delay': {
      title: '초안 제출이 딜레이 되고 있어요',
      body: '<p>초안 제출의 경우 약 <strong>7~14일</strong> 정도 소요됩니다.</p><ul><li>14일 이후 — 인플루언서 경고 및 패널티</li><li>30일 이상 장기 딜레이 — 제품(시술) 비용 반환 청구 진행</li></ul>',
    },
    'publish-period': {
      title: '방문 후 평균 게시 기간',
      body: '<p>한국 방문의 경우 평균 <strong>약 2~3주</strong> 정도 소요됩니다.</p>',
    },
    'no-publish': {
      title: '방문 후 최종 미게시의 경우',
      body: '<p><strong>30일 이상 장기 미제출</strong>의 경우 제품(시술) 비용 반환 청구가 진행됩니다.</p><p>반환에 필요한 절차를 위해 <strong>채널톡</strong>으로 문의 주세요.</p>',
    },
    'cancel-selection': {
      title: '선정한 인플루언서를 취소하고 싶어요',
      body: '<p>선정한 인플루언서는 취소 처리 시 <strong>차감금은 복구되지 않습니다</strong>.</p>',
    },
    'change-recruit': {
      title: '모집 국가/등급을 변경하고 싶어요',
      body: '<p>모집 국가/등급 변경은 <strong>수동 등록</strong>으로 진행됩니다. <strong>채널톡</strong>으로 연락 주시면 빠르게 도와드릴게요.</p>',
    },
    'popular-post': {
      title: '인기게시물이 뭔가요?',
      body: '<p>인플루언서 게시물에 대한 <strong>바이럴 작업</strong>이에요. 순간적으로 많은 사람들이 시청하는 게시물로 인식하게 하여, 더 많은 피드의 알고리즘에 노출될 수 있도록 하는 서비스입니다.</p><p>노출은 100% 보장은 아니며, 평균적으로 <strong>10건 중 3~4건</strong>은 상단 노출됩니다.</p>',
    },
    'superpass': {
      title: '슈퍼패스가 뭔가요?',
      body: '<p>인플루언서에게 제공되는 <strong>항공권 구매비 지원 제도</strong>입니다.</p><p>국가별 지원 금액은 좌측 <strong>요금표 → 슈퍼패스</strong> 메뉴에서 확인하실 수 있어요.</p>',
    },
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

  // 트리거 버튼 클릭 시만 드로어 오픈 (행 빈 공간 클릭은 무시)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-open-influencer');
    if (!trigger) return;
    e.preventDefault();
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
        btn.matches('.js-open-influencer, .js-open-message, .js-close-message, .js-send-message, .js-open-propose, .js-close-propose, .js-send-propose, .js-open-shipping, .js-close-shipping, .js-save-shipping, .js-open-address, .js-close-address, .js-save-address-memo, .js-open-review, .js-close-review, .js-review-confirm, .js-review-ack, .js-open-lightbox, .js-open-revision, .js-close-revision, .js-send-revision, .js-confirm-ok, .js-confirm-cancel, .modal-close, .toast-close, .bulk-close, .filter-chip-remove, .filter-chip-add, .country-selector, .cmdk-item, .tab, .density-btn, .btn-icon, .copy-btn, .cal-event, .cal-cell, .day-event-card, .day-event-filter-btn, .cal-nav-btn, .cal-monthnav-side, .cal-today-btn, .pg-btn, .f-pre, .pt-country, .sidebar-user-btn, .sidebar-ws-switch, .h-icon-btn, .tool-toggle, .h-menu-btn, .sidebar-cmdk, [data-cmdk-trigger], .widget-toggle, .htab, .nav-item, .ds-side-link, .modal-close, .h-popover-action, .notif-item, .user-menu-item')) return;
    // href가 있는 a 태그면 네비게이션이므로 제외
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href') !== '#') return;

    // 저장 버튼 (influencer-search 저장하기) — 찜 목록 toast
    if (btn.matches('.js-toast-save')) {
      e.preventDefault();
      showToast('success', '찜 목록에 저장되었습니다');
      return;
    }

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
      '리뷰어선정':   ['confirm:warning', '인플루언서를 선정하시겠습니까?', '선정 후에는 취소할 수 없어요.', 'success', '리뷰어 선정 완료'],
      '리뷰어 선정':  ['confirm:warning', '인플루언서를 선정하시겠습니까?', '선정 후에는 취소할 수 없어요.', 'success', '리뷰어 선정 완료'],
      '인플루언서미방문': ['confirm:danger', '미방문 처리하시겠습니까?', '차감금은 복구됩니다', 'error', '미방문 처리됨'],
      '리뷰어 미선정':['warning', '리뷰어 미선정 처리'],
      '알림 발송':    ['success', '알림 발송 완료'],
      '일괄 채택':    ['success', '일괄 채택 완료'],
      '일괄 저장':    ['success', '일괄 저장 완료'],
      '거절':         ['confirm:danger', '정말 거절하시겠습니까?', '거절한 내역은 복구되지 않습니다', 'error', '거절 처리됨'],
      '채택':         ['success', '채택 완료'],
    };
    const entry = map[text];
    if (!entry) return;
    e.preventDefault();
    // confirm:variant 형식 → Confirm 모달 → OK 시 Toast
    if (typeof entry[0] === 'string' && entry[0].startsWith('confirm:')) {
      const variant = entry[0].split(':')[1];
      window.showConfirm({ title: entry[1], desc: entry[2], variant })
        .then(ok => { if (ok) showToast(entry[3] || 'success', entry[4] || '처리되었습니다', entry[5]); });
    } else {
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

/** data-active-tab 속성 기준으로 헤더 탭 활성화 ("계정"은 탭 외 영역 — 강조 생략) */
function activateHeaderTab() {
  const activeTab = document.body.dataset.activeTab || '신청서관리';
  if (activeTab === '계정') return;
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
