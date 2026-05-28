let activeModal = null;

export function initModals() {
  const overlays = document.querySelectorAll('[data-modal-overlay]');

  overlays.forEach(overlay => {
    const modalId = overlay.getAttribute('data-modal-overlay');
    const modal = overlay.querySelector('[data-modal]');
    const closeBtns = overlay.querySelectorAll('[data-modal-close]');

    function openModal() {
      overlay.classList.add('is-open');
      document.body.classList.add('menu-open');
      activeModal = overlay;
      modal?.querySelector('input')?.focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      activeModal = null;
    }

    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    document.querySelectorAll(`[data-modal-open="${modalId}"]`).forEach(trigger => {
      trigger.addEventListener('click', openModal);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeModal) {
      activeModal.querySelector('[data-modal-close]')?.click();
    }
  });
}
