/* 알파콜라보 앱 — 시트/확인 다이얼로그 공통 제어 (시안용 경량 스크립트)
   개발 핸드오프: 실제 데이터 바인딩/검증은 개발팀. 여기선 열고/닫기 동선만. */
(function () {
  'use strict';

  var openCount = 0;

  function lockScroll(on) {
    openCount = Math.max(0, openCount + (on ? 1 : -1));
    document.body.style.overflow = openCount > 0 ? 'hidden' : '';
  }

  window.openSheet = function (id) {
    var el = document.getElementById(id);
    if (!el || !el.hidden) return;
    el.hidden = false;
    lockScroll(true);
  };

  window.closeSheet = function (id) {
    var el = document.getElementById(id);
    if (!el || el.hidden) return;
    el.hidden = true;
    lockScroll(false);
  };

  /* 토스트 — window.showToast(message) */
  window.showToast = function (message) {
    var host = document.querySelector('.app-toast-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'app-toast-host';
      document.body.appendChild(host);
    }
    var el = document.createElement('div');
    el.className = 'app-toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    host.appendChild(el);
    setTimeout(function () { el.classList.add('is-leave'); }, 2400);
    setTimeout(function () { el.remove(); }, 2700);
  };

  /* 확인 다이얼로그 — window.confirmDialog({title, desc, tone, okLabel, onOk}) */
  window.confirmDialog = function (opts) {
    opts = opts || {};
    var root = document.getElementById('app-confirm');
    if (!root) return;
    var tone = opts.tone || 'warning';
    root.querySelector('[data-confirm-title]').textContent = opts.title || '진행하시겠습니까?';
    root.querySelector('[data-confirm-desc]').textContent = opts.desc || '';
    var icon = root.querySelector('.app-confirm-icon');
    icon.className = 'app-confirm-icon is-' + tone;
    icon.querySelectorAll('svg').forEach(function (s) { s.hidden = s.getAttribute('data-icon') !== tone; });
    var ok = root.querySelector('[data-confirm-ok]');
    ok.textContent = opts.okLabel || '확인';
    ok.className = 'btn btn-md ' + (tone === 'danger' ? 'btn-danger' : 'btn-primary');
    ok.onclick = function () { window.closeSheet('app-confirm'); if (opts.onOk) opts.onOk(); };
    window.openSheet('app-confirm');
  };

  /* 검색바 상태 시스템 — 입력값 있으면 클리어 버튼 자동 표시 */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.app-search-bar').forEach(function (bar) {
      var input = bar.querySelector('input');
      if (!input) return;
      var clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'app-search-clear';
      clear.setAttribute('aria-label', '입력 지우기');
      clear.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
      clear.addEventListener('click', function () {
        input.value = '';
        bar.classList.remove('has-value');
        input.focus();
      });
      bar.appendChild(clear);
      input.addEventListener('input', function () {
        bar.classList.toggle('has-value', input.value.length > 0);
      });
    });
  });

  /* ESC로 최상단 시트 닫기 */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = Array.prototype.slice.call(document.querySelectorAll('.app-sheet-root:not([hidden]), .app-confirm-root:not([hidden])'));
    if (open.length) { open[open.length - 1].hidden = true; lockScroll(false); }
  });
})();
