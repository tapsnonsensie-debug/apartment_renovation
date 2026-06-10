export function initPortfolio() {
  const slider = document.querySelector('[data-portfolio-slider]');
  if (!slider) return;

  const track = slider.querySelector('[data-portfolio-track]');
  const cards = Array.from(track?.querySelectorAll('[data-portfolio-card]') ?? []);
  // Controls live outside the slider element, so query from the section scope.
  const scope = slider.closest('.portfolio') ?? document;
  const prevBtn = scope.querySelector('[data-portfolio-prev]');
  const nextBtn = scope.querySelector('[data-portfolio-next]');
  const dotsContainer = scope.querySelector('[data-portfolio-dots]');

  if (!track || !cards.length) return;

  let current = 0;
  let perView = getPerView();

  function getPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Card widths are driven by JS so percentages in CSS don't cause issues
  // with the flex track having no fixed width.
  function getCardWidth() {
    const sliderW = slider.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return (sliderW - gap * (perView - 1)) / perView;
  }

  function setCardWidths() {
    const w = getCardWidth();
    if (!w) return;
    cards.forEach(c => { c.style.width = `${w}px`; });
  }

  function maxIndex() {
    return Math.max(0, cards.length - perView);
  }

  function goTo(index, animate = true) {
    current = Math.max(0, Math.min(index, maxIndex()));
    const w = getCardWidth();
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.classList.toggle('is-animated', animate);
    track.style.transform = `translateX(-${current * (w + gap)}px)`;
    updateDots();
    updateButtons();
  }

  function updateDots() {
    dotsContainer?.querySelectorAll('[data-dot]').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function updateButtons() {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= maxIndex();
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.setAttribute('data-dot', String(i));
      dot.setAttribute('aria-label', `Проект ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // ── Touch / swipe ───────────────────────────────────────────────────────
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging = false;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    // Only mark as horizontal drag if clearly more horizontal than vertical
    if (Math.abs(dx) > Math.abs(dy) + 5) isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = slider.getBoundingClientRect().width * 0.2;
    if (dx < -threshold) goTo(current + 1);
    else if (dx > threshold) goTo(current - 1);
    isDragging = false;
  });

  // ── Init & resize ───────────────────────────────────────────────────────
  function init() {
    setCardWidths();
    buildDots();
    goTo(0, false); // no animation on first render
    // Enable animation after first paint
    requestAnimationFrame(() => track.classList.add('is-animated'));
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newPerView = getPerView();
      if (newPerView !== perView) {
        perView = newPerView;
        buildDots();
      }
      setCardWidths();
      goTo(Math.min(current, maxIndex()), false); // no animation on resize
    }, 100);
  });

  init();

  // Recompute once images/fonts have loaded so widths match final layout.
  window.addEventListener('load', () => {
    setCardWidths();
    goTo(current, false);
  });

  // ── Before/After toggle per card ────────────────────────────────────────
  cards.forEach(card => {
    const toggleBtns = card.querySelectorAll('[data-ba-btn]');
    const before = card.querySelector('[data-ba="before"]');
    const after = card.querySelector('[data-ba="after"]');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-ba-btn');
        toggleBtns.forEach(b =>
          b.classList.toggle('is-active', b.getAttribute('data-ba-btn') === target)
        );
        if (before) before.style.opacity = target === 'before' ? '1' : '0';
        if (after) after.style.opacity = target === 'after' ? '1' : '0';
      });
    });
  });
}
