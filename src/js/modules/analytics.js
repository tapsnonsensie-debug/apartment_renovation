// Yandex.Metrika wrapper — safe when counter hasn't loaded yet
export function track(eventName, params = {}) {
  const id = import.meta.env.VITE_METRIKA_ID;
  if (!id) return;
  try {
    window[`yaCounter${id}`]?.reachGoal(eventName, params);
  } catch {
    // counter not yet ready
  }
}

export function initAnalytics() {
  const id = import.meta.env.VITE_METRIKA_ID;
  if (!id) return;

  // Phone click tracking
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => track('phone_click'));
  });
}
