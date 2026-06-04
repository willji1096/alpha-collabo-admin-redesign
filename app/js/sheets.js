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

  /* ESC로 최상단 시트 닫기 */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = Array.prototype.slice.call(document.querySelectorAll('.app-sheet-root:not([hidden]), .app-confirm-root:not([hidden])'));
    if (open.length) { open[open.length - 1].hidden = true; lockScroll(false); }
  });
})();
