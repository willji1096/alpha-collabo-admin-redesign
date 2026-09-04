/* =========================================================
   슈퍼패스 화면 인터랙션 (모달·토스트·전체선택)
   셸(사이드바/헤더)은 js/components.js 가 주입한다. 이 파일은 그 뒤에 로드.
   ========================================================= */

/* ---------- 1. 모달 ---------- */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.hidden = false;
  document.body.style.overflow = 'hidden';
  m.querySelectorAll('.sp-chat-log').forEach(l => { l.scrollTop = l.scrollHeight; });
  const first = m.querySelector('.modal-close');
  if (first) first.focus();
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.hidden = true;
  document.body.style.overflow = '';
}

/* ---------- 2. 토스트 ---------- */
function notify(title, desc) {
  if (typeof window.showToast === 'function') window.showToast('success', title, desc);
}

/* ---------- 3. 페이지 공통 이벤트 위임 ---------- */
document.addEventListener('click', e => {
  const open = e.target.closest('[data-modal-open]');
  if (open) { e.preventDefault(); openModal(open.dataset.modalOpen); return; }

  const close = e.target.closest('[data-modal-close]');
  /* 배경(backdrop)은 배경 자체를 눌렀을 때만 닫는다 — 모달 안 버튼 클릭이 버블링으로 닫히지 않게 */
  if (close && (!close.classList.contains('modal-backdrop') || e.target === close)) {
    e.preventDefault(); closeModal(close.dataset.modalClose); return;
  }

  const toast = e.target.closest('[data-toast-title]');
  if (toast) { notify(toast.dataset.toastTitle, toast.dataset.toastDesc || ''); }

  /* 추천 발송(반자동): 시스템이 뽑아둔 후보를 운영팀이 확인 후 발송 → 이후엔 '수정 저장 및 재발송' 상태 */
  if (e.target.closest('[data-send-action]')) setSendState('sent');
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-backdrop:not([hidden])').forEach(m => closeModal(m.id));
});

/* 전체 선택 체크박스 + 선택 개수 표시 */
document.addEventListener('change', e => {
  const all = e.target.closest('[data-check-all]');
  if (all) {
    const scope = document.getElementById(all.dataset.checkAll);
    if (scope) scope.querySelectorAll('input[type="checkbox"]').forEach(c => { c.checked = all.checked; });
  }
  syncSelectionCount();
});

function syncSelectionCount() {
  document.querySelectorAll('[data-count-of]').forEach(out => {
    const scope = document.getElementById(out.dataset.countOf);
    if (!scope) return;
    out.textContent = scope.querySelectorAll('input[type="checkbox"]:checked').length + '개';
  });
}

function setSendState(state) {
  document.querySelectorAll('[data-send-state]').forEach(el => { el.hidden = el.dataset.sendState !== state; });
}

document.addEventListener('DOMContentLoaded', () => {
  syncSelectionCount();
});
