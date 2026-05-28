export function initAccordion() {
  const buttons = document.querySelectorAll('[data-faq-btn]');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);

      // Close all others
      buttons.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
        }
      });

      btn.setAttribute('aria-expanded', String(!isExpanded));
      if (answer) answer.setAttribute('aria-hidden', String(isExpanded));
    });
  });
}
