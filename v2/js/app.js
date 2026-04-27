/**
 * Alphacollabo V2 — App
 * V1과 완전 분리. V2 페이지에서만 로드.
 */

(function () {
  'use strict';

  /* ---------- Toast ---------- */
  function ensureRegion() {
    let region = document.querySelector('.toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'toast-region';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }
  window.toast = function (msg, opts) {
    opts = opts || {};
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', opts.role || 'status');
    el.textContent = msg;
    ensureRegion().appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 220ms, transform 220ms';
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      setTimeout(() => el.remove(), 240);
    }, opts.duration || 2400);
  };

  /* ---------- Year stamp ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-year]').forEach(el => {
      el.textContent = String(new Date().getFullYear());
    });
  });

  /* ---------- Filter chip toggle (Explore) ---------- */
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip[data-toggle]');
    if (!chip) return;
    chip.classList.toggle('is-active');
  });

  /* ---------- Range slider live label ---------- */
  document.addEventListener('input', (e) => {
    const r = e.target;
    if (!r.matches('.range-track')) return;
    const id = r.dataset.target;
    if (!id) return;
    const out = document.getElementById(id);
    if (!out) return;
    const fmt = r.dataset.format;
    const v = Number(r.value);
    out.textContent = fmt === 'won' ? formatWon(v) : v.toLocaleString();
  });

  function formatWon(n) {
    if (n >= 100000000) return (n / 100000000).toFixed(n % 100000000 === 0 ? 0 : 1) + '억';
    if (n >= 10000) return (n / 10000).toFixed(0) + '만';
    return n.toLocaleString();
  }
  window.formatWon = formatWon;

})();
