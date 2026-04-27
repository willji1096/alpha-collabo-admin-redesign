/**
 * Alphacollabo V2 — App
 * V1과 완전 분리. V2 페이지에서만 로드.
 */

(function () {
  'use strict';

  /* ---------- Lucide icon set — 모든 [data-lucide]를 SVG로 자동 변환 ---------- */
  function paintIcons() {
    if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
      window.lucide.createIcons({
        attrs: { 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
      });
    }
  }
  document.addEventListener('DOMContentLoaded', paintIcons);
  // 동적 삽입 컨텐츠 대응 — 외부에서 호출
  window.repaintIcons = paintIcons;

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
    if (chip) {
      // chip-x (제거) 클릭 시 칩 자체 제거
      if (e.target.closest('.filter-chip-x')) {
        e.stopPropagation();
        chip.remove();
        return;
      }
      chip.classList.toggle('is-active');
    }
  });

  /* ---------- Filter panel toggle (요약 바 → expandable 패널) ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter-toggle]');
    if (!btn) return;
    const id = btn.getAttribute('aria-controls');
    const panel = document.getElementById(id);
    if (!panel) return;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      panel.classList.remove('is-open');
      setTimeout(() => { panel.hidden = true; }, 320);
    } else {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
    }
  });

  /* ---------- Filter section accordion ---------- */
  document.addEventListener('click', (e) => {
    const head = e.target.closest('[data-section-toggle]');
    if (!head) return;
    const section = head.closest('.filter-section');
    if (!section) return;
    const open = section.classList.toggle('is-open');
    head.setAttribute('aria-expanded', String(open));
  });

  /* ---------- Save toggle (inf-card) ---------- */
  document.addEventListener('click', (e) => {
    const save = e.target.closest('.inf-card-save');
    if (!save) return;
    e.preventDefault();
    save.classList.toggle('is-saved');
  });

  /* ---------- Range slider live label + fill ---------- */
  function paintRange(r) {
    const min = Number(r.min || 0);
    const max = Number(r.max || 100);
    const v = Number(r.value);
    const pct = ((v - min) / (max - min)) * 100;
    r.style.setProperty('--fill', pct + '%');
    const id = r.dataset.target;
    if (id) {
      const out = document.getElementById(id);
      if (out) out.textContent = r.dataset.format === 'won' ? formatWon(v) : v.toLocaleString();
    }
  }
  document.addEventListener('input', (e) => {
    if (e.target.matches('.range-track')) paintRange(e.target);
  });
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.range-track').forEach(paintRange);
  });

  function formatWon(n) {
    if (n >= 100000000) return (n / 100000000).toFixed(n % 100000000 === 0 ? 0 : 1) + '억';
    if (n >= 10000) return (n / 10000).toFixed(0) + '만';
    return n.toLocaleString();
  }
  window.formatWon = formatWon;

})();
