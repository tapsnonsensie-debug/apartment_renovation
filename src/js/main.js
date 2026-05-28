import '../scss/style.scss';

import { initHeader } from './modules/header.js';
import { initMenu } from './modules/menu.js';
import { initAccordion } from './modules/accordion.js';
import { initModals } from './modules/modal.js';
import { initPhoneMasks } from './modules/phoneMask.js';
import { initForms } from './modules/forms.js';
import { initCookieBanner } from './modules/cookies.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initPortfolio } from './modules/portfolio.js';
import { initQuiz } from './modules/quiz.js';
import { initAnalytics } from './modules/analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMenu();
  initAccordion();
  initModals();
  initPhoneMasks();
  initForms();
  initCookieBanner();
  initScrollTop();
  initPortfolio();
  initQuiz();
  initAnalytics();
});
