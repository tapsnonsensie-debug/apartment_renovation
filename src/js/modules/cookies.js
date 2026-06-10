const STORAGE_KEY = 'cookie-consent';
const CONSENT_VERSION = '1.0';

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveConsent({ analytics = false, advertising = false }) {
  const data = {
    technical: true, // всегда включены
    analytics,
    advertising,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  applyConsent(data);
  return data;
}

function applyConsent(consent) {
  // Аналитика подключается ТОЛЬКО после согласия
  if (consent.analytics) {
    // window.ym && ym(METRIKA_ID, 'init', { ... });
    // window.gtag && gtag('config', GA4_ID);
  }
  // Рекламные cookie подключаются ТОЛЬКО после согласия
  if (consent.advertising) {
    // загрузка ретаргетинга
  }
}

export function initCookieBanner() {
  const root = document.querySelector('[data-cookie]');
  if (!root) return;

  const mainScreen = root.querySelector('[data-cookie-screen="main"]');
  const settingsScreen = root.querySelector('[data-cookie-screen="settings"]');

  // Если согласие уже есть и версия актуальна — баннер не показываем
  const consent = getConsent();
  if (consent && consent.version === CONSENT_VERSION) {
    applyConsent(consent);
    return;
  }

  function showScreen(name) {
    if (mainScreen) mainScreen.hidden = name !== 'main';
    if (settingsScreen) settingsScreen.hidden = name !== 'settings';
  }

  function close() {
    root.classList.remove('is-visible');
  }

  // Небольшая задержка, чтобы баннер не появлялся мгновенно
  setTimeout(() => root.classList.add('is-visible'), 800);

  root.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-cookie-action]');
    if (!trigger) return;
    const action = trigger.dataset.cookieAction;

    if (action === 'accept-all') {
      saveConsent({ analytics: true, advertising: true });
      close();
    } else if (action === 'open-settings') {
      showScreen('settings');
    } else if (action === 'back') {
      showScreen('main');
    } else if (action === 'save-settings') {
      const analytics = root.querySelector('[data-cookie-category="analytics"]')?.checked ?? false;
      const advertising = root.querySelector('[data-cookie-category="advertising"]')?.checked ?? false;
      saveConsent({ analytics, advertising });
      close();
    }
  });

  // Раскрытие описаний категорий по клику
  root.querySelectorAll('.cookie-category__toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const descId = btn.getAttribute('aria-controls');
      const desc = descId ? root.querySelector('#' + descId) : null;
      if (desc) desc.hidden = expanded;
      btn.classList.toggle('is-open', !expanded);
    });
  });
}
