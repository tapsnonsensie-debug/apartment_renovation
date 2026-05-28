export function applyPhoneMask(input) {
  const MASK = '+7 (___) ___-__-__';
  // Indices of digit slots inside the mask string
  const DIGIT_POSITIONS = [4, 5, 6, 8, 9, 10, 12, 13, 15, 16];

  function getDigits(value) {
    return value.replace(/\D/g, '').slice(0, 10);
  }

  function applyMask(digits) {
    let result = MASK;
    for (let i = 0; i < digits.length; i++) {
      result = result.replace('_', digits[i]);
    }
    return result;
  }

  function cursorAfterDigits(digits) {
    if (digits.length === 0) return 4;
    const idx = Math.min(digits.length - 1, DIGIT_POSITIONS.length - 1);
    return DIGIT_POSITIONS[idx] + 1;
  }

  // Defer setSelectionRange to the next microtask so the browser
  // doesn't overwrite it after the 'input' event completes.
  function setCursor(pos) {
    // Use setTimeout to run after the browser finishes processing the event
    setTimeout(() => {
      if (document.activeElement === input) {
        input.setSelectionRange(pos, pos);
      }
    }, 0);
  }

  input.addEventListener('focus', () => {
    if (!input.value) {
      input.value = '+7 (';
      setCursor(4);
    }
  });

  input.addEventListener('blur', () => {
    if (input.value === '+7 (') input.value = '';
  });

  input.addEventListener('input', () => {
    const raw = input.value;
    const digits = getDigits(raw.startsWith('+7') ? raw.slice(2) : raw);
    input.value = applyMask(digits);
    setCursor(cursorAfterDigits(digits));
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const digits = getDigits(input.value.slice(2));
      const newDigits = digits.slice(0, -1);
      input.value = applyMask(newDigits);
      setCursor(cursorAfterDigits(newDigits));
    }
  });
}

export function initPhoneMasks() {
  document.querySelectorAll('input[type="tel"]').forEach(applyPhoneMask);
}
