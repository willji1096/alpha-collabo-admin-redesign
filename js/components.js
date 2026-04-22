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
  wireInfluencerModal();
});

/** 인플루언서 상세 모달 — 지연 로드 + 전역 단일 인스턴스 */
function wireInfluencerModal() {
  // 이 페이지에 트리거가 하나도 없으면 로드 스킵
  const triggers = () => document.querySelectorAll('.js-open-influencer');
  if (triggers().length === 0) return;

  let loaded = false;
  let root = null;

  async function ensureLoaded() {
    if (loaded) return;
    const bust = `?v=${Date.now()}`;
    const res = await fetch('components/modal-influencer.html' + bust, { cache: 'no-store' });
    const html = await res.text();
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    root = wrap.firstElementChild;
    document.body.appendChild(root);

    // SNS 탭 전환
    const tabs = root.querySelectorAll('.tabs [data-sns]');
    const panels = root.querySelectorAll('[data-sns-panel]');
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

    // 닫기 버튼 · 백드롭 · ESC
    root.querySelectorAll('.js-close-influencer').forEach(b =>
      b.addEventListener('click', close)
    );
    root.addEventListener('click', (e) => {
      if (e.target === root) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!root.hidden && e.key === 'Escape') close();
    });

    loaded = true;
  }

  function extractRowData(triggerEl) {
    const data = {};
    // 1) 트리거에 명시적으로 지정된 값이 있으면 그것을 우선
    if (triggerEl.dataset.influencerName)    data.name    = triggerEl.dataset.influencerName;
    if (triggerEl.dataset.influencerCountry) data.country = triggerEl.dataset.influencerCountry;
    if (triggerEl.dataset.influencerMbno)    data.mbno    = triggerEl.dataset.influencerMbno;

    // 2) 행에서 자동 추출
    const row = triggerEl.closest('tr');
    if (row) {
      // 국가: c-country-code 칩에서
      if (!data.country) {
        data.country = row.querySelector('.c-country-code')?.textContent.trim();
      }
      // 인플루언서 핸들: 헤더에 '인플루언서' 또는 '회원정보' 가 들어간 컬럼의 셀 텍스트
      if (!data.name) {
        const table = row.closest('table');
        const headers = table ? Array.from(table.querySelectorAll('thead th')) : [];
        const idx = headers.findIndex(h => /인플루언서|회원정보/.test(h.textContent.trim()));
        if (idx >= 0 && row.cells[idx]) {
          // 캠페인명/코드 같은 복합 셀이 아닌, 단순 텍스트 셀 기준
          data.name = row.cells[idx].textContent.trim().split(/\s+/)[0];
        }
      }
      // 관리번호 후보: 신청번호 컬럼이 있다면
      if (!data.mbno) {
        const table = row.closest('table');
        const headers = table ? Array.from(table.querySelectorAll('thead th')) : [];
        const idx = headers.findIndex(h => /신청번호|관리번호/.test(h.textContent.trim()));
        if (idx >= 0 && row.cells[idx]) {
          data.mbno = row.cells[idx].textContent.trim();
        }
      }
    }
    return data;
  }

  function populate(data) {
    if (!root) return;
    if (data.name) {
      root.querySelectorAll('[data-influencer-name]').forEach(el => el.textContent = data.name);
      root.querySelectorAll('[data-influencer-handle]').forEach(el => el.textContent = '@' + data.name);
      root.querySelectorAll('[data-influencer-initial]').forEach(el => el.textContent = (data.name[0] || 'M').toUpperCase());
    }
    if (data.country) {
      root.querySelectorAll('[data-influencer-country]').forEach(el => el.textContent = data.country);
    }
    if (data.mbno) {
      root.querySelectorAll('[data-influencer-mbno]').forEach(el => el.textContent = '관리번호 ' + data.mbno);
    }
  }

  function open(triggerEl) {
    if (triggerEl && root) {
      populate(extractRowData(triggerEl));
    }
    root.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!root) return;
    root.hidden = true;
    document.body.style.overflow = '';
  }

  // 이벤트 위임: 동적으로 붙는 트리거까지 대응
  document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('.js-open-influencer');
    if (!trigger) return;
    e.preventDefault();
    await ensureLoaded();
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
        btn.matches('.js-open-influencer, .modal-close, .toast-close, .bulk-close, .filter-chip-remove, .filter-chip-add, .country-selector, .cmdk-item, .tab, .density-btn, .btn-icon, .copy-btn, .cal-event, .cal-cell, .day-event-card, .day-event-filter-btn, .cal-nav-btn, .cal-monthnav-side, .cal-today-btn, .pg-btn, .f-pre, .pt-country, .sidebar-user-btn, .sidebar-ws-switch, .h-icon-btn, .tool-toggle, .h-menu-btn, .sidebar-cmdk, [data-cmdk-trigger], .widget-toggle, .htab, .nav-item, .ds-side-link, .modal-close, .h-popover-action, .notif-item, .user-menu-item')) return;
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
