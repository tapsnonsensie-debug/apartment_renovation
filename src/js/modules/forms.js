import { track } from './analytics.js';

function validatePhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('7');
}

function validateName(value) {
  return value.trim().length >= 2;
}

export function initForms() {
  document.querySelectorAll('[data-form]').forEach(form => {
    const formType = form.getAttribute('data-form');
    const submitBtn = form.querySelector('[type="submit"]');
    const consentCheckbox = form.querySelector('[name="consent"]');
    const statusEl = form.querySelector('[data-form-status]');

    if (consentCheckbox && submitBtn) {
      const updateSubmitState = () => {
        submitBtn.disabled = !consentCheckbox.checked;
      };
      consentCheckbox.addEventListener('change', updateSubmitState);
      updateSubmitState();
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (submitBtn.disabled) return;

      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      let isValid = true;

      if (nameInput) {
        const nameError = form.querySelector('[data-error="name"]');
        if (!validateName(nameInput.value)) {
          nameInput.classList.add('has-error');
          if (nameError) nameError.classList.add('is-visible');
          isValid = false;
        } else {
          nameInput.classList.remove('has-error');
          if (nameError) nameError.classList.remove('is-visible');
        }
      }

      if (phoneInput) {
        const phoneError = form.querySelector('[data-error="phone"]');
        if (!validatePhone(phoneInput.value)) {
          phoneInput.classList.add('has-error');
          if (phoneError) phoneError.classList.add('is-visible');
          isValid = false;
        } else {
          phoneInput.classList.remove('has-error');
          if (phoneError) phoneError.classList.remove('is-visible');
        }
      }

      if (!isValid) return;

      const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
      if (!endpoint) {
        showStatus(statusEl, 'error', 'Форма не настроена. Укажите VITE_FORM_ENDPOINT.');
        track('form_submit_error', { form: formType });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправка…';

      const payload = {
        name: nameInput?.value.trim() ?? '',
        phone: phoneInput?.value ?? '',
        consent: true,
        source: formType,
      };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        showStatus(statusEl, 'success', 'Заявка отправлена! Перезвоним в ближайшее время.');
        form.reset();
        track('form_submit_success', { form: formType });
      } catch {
        showStatus(statusEl, 'error', 'Не удалось отправить. Позвоните нам напрямую.');
        track('form_submit_error', { form: formType });
      } finally {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = originalText;
      }
    });
  });
}

function showStatus(el, type, message) {
  if (!el) return;
  el.className = `form-status is-${type}`;
  el.textContent = message;
  el.setAttribute('aria-live', 'polite');
}
