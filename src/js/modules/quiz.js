import { track } from './analytics.js';
import { applyPhoneMask } from './phoneMask.js';

const STEPS = [
  {
    id: 'type',
    question: 'Тип объекта',
    type: 'options',
    options: [
      { value: 'new', title: 'Новостройка', desc: 'Без черновой отделки или с ней' },
      { value: 'secondary', title: 'Вторичка', desc: 'Требует демонтажа и обновления' },
      { value: 'studio', title: 'Студия', desc: 'Компактное пространство' },
    ],
  },
  {
    id: 'area',
    question: 'Площадь квартиры',
    type: 'input',
    placeholder: 'Например, 48',
    hint: 'Укажите общую площадь в кв. м',
    suffix: 'м²',
  },
  {
    id: 'stage',
    question: 'Стадия ремонта',
    type: 'options',
    options: [
      { value: 'rough', title: 'Черновая', desc: 'Только стены, пол, потолок' },
      { value: 'prefinish', title: 'Предчистовая', desc: 'Штукатурка и стяжка готовы' },
      { value: 'turnkey', title: 'Под ключ', desc: 'Полный цикл с нуля' },
    ],
  },
  {
    id: 'level',
    question: 'Уровень ремонта',
    type: 'options',
    options: [
      { value: 'economy', title: 'Эконом', desc: 'Практично и надёжно' },
      { value: 'comfort', title: 'Комфорт', desc: 'Качественные материалы' },
      { value: 'design', title: 'Дизайн', desc: 'Авторский проект' },
    ],
  },
  {
    id: 'contacts',
    question: 'Когда планируете начать и ваши контакты',
    type: 'contacts',
    timingOptions: [
      { value: 'now', title: 'Как можно скорее' },
      { value: '1m', title: 'Через 1–2 месяца' },
      { value: '3m', title: 'Через 3–6 месяцев' },
      { value: 'later', title: 'Ещё не решил' },
    ],
  },
];

export function initQuiz() {
  const quizEl = document.querySelector('[data-quiz]');
  if (!quizEl) return;

  const state = {
    step: 0,
    answers: {},
    submitting: false,
  };

  function render() {
    const step = STEPS[state.step];
    updateProgress();
    renderStep(step);
    updateNav();
  }

  function updateProgress() {
    const bars = quizEl.querySelectorAll('[data-quiz-bar]');
    bars.forEach((bar, i) => {
      bar.classList.toggle('is-done', i < state.step);
    });

    const label = quizEl.querySelector('[data-quiz-step-label]');
    if (label) label.textContent = `Шаг ${state.step + 1} из ${STEPS.length}`;
  }

  function renderStep(step) {
    const container = quizEl.querySelector('[data-quiz-step]');
    if (!container) return;

    container.innerHTML = '';

    const questionEl = document.createElement('div');
    questionEl.className = 'quiz__step-question';
    questionEl.textContent = step.question;
    container.appendChild(questionEl);

    if (step.type === 'options') {
      const grid = document.createElement('div');
      grid.className = 'quiz__options';

      step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz__option';
        btn.type = 'button';
        btn.innerHTML = `<span class="quiz__option-title">${opt.title}</span><span class="quiz__option-desc">${opt.desc}</span>`;
        if (state.answers[step.id] === opt.value) btn.classList.add('is-selected');

        btn.addEventListener('click', () => {
          state.answers[step.id] = opt.value;
          grid.querySelectorAll('.quiz__option').forEach(b => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          updateNav();
        });

        grid.appendChild(btn);
      });

      container.appendChild(grid);
    }

    if (step.type === 'input') {
      const wrap = document.createElement('div');
      wrap.className = 'quiz__area';

      const input = document.createElement('input');
      input.type = 'number';
      input.min = '10';
      input.max = '1000';
      input.className = 'quiz__area-input';
      input.placeholder = step.placeholder;
      input.value = state.answers[step.id] ?? '';
      input.addEventListener('input', () => {
        state.answers[step.id] = input.value;
        updateNav();
      });

      const hint = document.createElement('span');
      hint.className = 'quiz__area-hint';
      hint.textContent = step.hint;

      wrap.appendChild(input);
      wrap.appendChild(hint);
      container.appendChild(wrap);
    }

    if (step.type === 'contacts') {
      const wrap = document.createElement('div');
      wrap.className = 'quiz__contacts';

      // Timing options
      const timingGrid = document.createElement('div');
      timingGrid.className = 'quiz__options';
      timingGrid.style.marginBottom = '20px';

      step.timingOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz__option';
        btn.innerHTML = `<span class="quiz__option-title">${opt.title}</span>`;
        if (state.answers['timing'] === opt.value) btn.classList.add('is-selected');
        btn.addEventListener('click', () => {
          state.answers['timing'] = opt.value;
          timingGrid.querySelectorAll('.quiz__option').forEach(b => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          updateNav();
        });
        timingGrid.appendChild(btn);
      });

      wrap.appendChild(timingGrid);

      // Name field
      const nameField = document.createElement('div');
      nameField.className = 'quiz__field';
      nameField.innerHTML = '<label>Ваше имя</label>';
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'Иван';
      nameInput.value = state.answers['name'] ?? '';
      nameInput.autocomplete = 'given-name';
      nameInput.addEventListener('input', () => {
        state.answers['name'] = nameInput.value;
        updateNav();
      });
      nameField.appendChild(nameInput);
      wrap.appendChild(nameField);

      // Phone field
      const phoneField = document.createElement('div');
      phoneField.className = 'quiz__field';
      phoneField.innerHTML = '<label>Телефон</label>';
      const phoneInput = document.createElement('input');
      phoneInput.type = 'tel';
      phoneInput.placeholder = '+7 (___) ___-__-__';
      phoneInput.value = state.answers['phone'] ?? '';
      phoneInput.autocomplete = 'tel';
      phoneInput.addEventListener('input', () => {
        state.answers['phone'] = phoneInput.value;
        updateNav();
      });
      applyPhoneMask(phoneInput);
      phoneField.appendChild(phoneInput);
      wrap.appendChild(phoneField);

      // Consent
      const consentLabel = document.createElement('label');
      consentLabel.className = 'quiz__consent';
      const consentInput = document.createElement('input');
      consentInput.type = 'checkbox';
      consentInput.checked = state.answers['consent'] ?? false;
      consentInput.addEventListener('change', () => {
        state.answers['consent'] = consentInput.checked;
        updateNav();
      });
      consentLabel.appendChild(consentInput);
      const consentText = document.createTextNode(' Согласен с ');
      const consentLink = document.createElement('a');
      consentLink.href = '/legal/privacy.html';
      consentLink.target = '_blank';
      consentLink.textContent = 'политикой конфиденциальности';
      consentLabel.appendChild(consentText);
      consentLabel.appendChild(consentLink);
      wrap.appendChild(consentLabel);

      container.appendChild(wrap);
    }
  }

  function isCurrentStepValid() {
    const step = STEPS[state.step];
    if (step.type === 'options') return !!state.answers[step.id];
    if (step.type === 'input') {
      const v = Number(state.answers[step.id]);
      return v >= 10 && v <= 1000;
    }
    if (step.type === 'contacts') {
      const phone = state.answers['phone'] ?? '';
      const digits = phone.replace(/\D/g, '');
      return (
        state.answers['name']?.trim().length >= 2 &&
        digits.length === 11 &&
        digits.startsWith('7') &&
        state.answers['consent'] === true
      );
    }
    return false;
  }

  function updateNav() {
    const nextBtn = quizEl.querySelector('[data-quiz-next]');
    const backBtn = quizEl.querySelector('[data-quiz-back]');

    if (nextBtn) {
      nextBtn.disabled = !isCurrentStepValid();
      const isLast = state.step === STEPS.length - 1;
      nextBtn.textContent = isLast ? 'Получить расчёт' : 'Далее →';
    }

    if (backBtn) {
      backBtn.style.display = state.step === 0 ? 'none' : 'flex';
    }
  }

  async function submitQuiz() {
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
    if (!endpoint) {
      showSuccess();
      track('quiz_complete', state.answers);
      return;
    }

    const nextBtn = quizEl.querySelector('[data-quiz-next]');
    if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = 'Отправка…'; }

    const payload = {
      source: 'quiz',
      objectType: state.answers['type'],
      area: state.answers['area'],
      stage: state.answers['stage'],
      level: state.answers['level'],
      timing: state.answers['timing'],
      name: state.answers['name'],
      phone: state.answers['phone'],
      consent: true,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showSuccess();
      track('quiz_complete', { level: state.answers['level'] });
    } catch {
      showError();
    }
  }

  function showSuccess() {
    // quizEl itself has data-quiz-card — querySelector only finds descendants,
    // so we replace innerHTML on quizEl directly.
    quizEl.innerHTML = `
      <div class="quiz__success">
        <div class="quiz__success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3>Заявка принята!</h3>
        <p>Мы получили вашу заявку и свяжемся с вами в течение 30 минут в рабочее время.</p>
      </div>
    `;
  }

  function showError() {
    const statusEl = quizEl.querySelector('[data-quiz-status]');
    if (statusEl) {
      statusEl.textContent = 'Не удалось отправить заявку. Позвоните нам напрямую: +7 (812) 385-92-11';
      statusEl.className = 'quiz__status quiz__status--error';
    }
    const nextBtn = quizEl.querySelector('[data-quiz-next]');
    if (nextBtn) { nextBtn.disabled = false; nextBtn.textContent = 'Попробовать снова'; }
  }

  // Wire up navigation buttons
  const nextBtn = quizEl.querySelector('[data-quiz-next]');
  const backBtn = quizEl.querySelector('[data-quiz-back]');

  nextBtn?.addEventListener('click', async () => {
    if (state.step < STEPS.length - 1) {
      state.step++;
      render();
    } else {
      await submitQuiz();
    }
  });

  backBtn?.addEventListener('click', () => {
    if (state.step > 0) {
      state.step--;
      render();
    }
  });

  render();
}
