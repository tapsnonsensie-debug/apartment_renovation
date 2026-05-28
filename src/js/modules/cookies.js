const STORAGE_KEY = 'cookie_accepted';

export function initCookieBanner() {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.querySelector('[data-cookie-banner]');
  if (!banner) return;

  // Small delay so it doesn't pop immediately on load
  setTimeout(() => banner.classList.add('is-visible'), 1200);

  const acceptBtn = banner.querySelector('[data-cookie-accept]');
  const declineBtn = banner.querySelector('[data-cookie-decline]');

  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, '1');
    banner.classList.remove('is-visible');
  });

  declineBtn?.addEventListener('click', () => {
    banner.classList.remove('is-visible');
  });
}
