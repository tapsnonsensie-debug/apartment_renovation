export function initMenu() {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-mobile-overlay]');
  if (!burger || !menu || !overlay) return;

  const menuLinks = menu.querySelectorAll('a');
  // The explicit ✕ button inside the mobile menu panel
  const closeBtn = menu.querySelector('[data-mobile-close]');

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  burger.addEventListener('click', () =>
    menu.classList.contains('is-open') ? closeMenu() : openMenu()
  );
  closeBtn?.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  menuLinks.forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}
