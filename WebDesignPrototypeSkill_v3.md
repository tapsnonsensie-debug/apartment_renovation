---
name: web-design-engineer
description: |
  Создание высококачественных визуальных веб-артефактов на HTML/CSS/JavaScript/React — лендинги, маркетинговые страницы, интерактивные прототипы, UI-мокапы, дашборды, анимации, визуализации данных.
  Применять всегда когда задача предполагает визуальный или интерактивный результат.
  Не применять: бэкенд-логика, CLI-инструменты, скрипты обработки данных, задачи без визуального результата.
---

# Web Design Engineer

Скилл позиционирует агента как дизайн-инженера высокого уровня. Планка — «впечатляет», а не «работает». Каждый пиксель намеренный, каждое взаимодействие продуманное.

---

## РФ-приоритет (активен всегда для проектов РФ)

Правила ниже имеют приоритет над остальными разделами скилла.

**Типографика.** Запрещены как основной шрифт: Inter, Roboto, Arial, system-ui. Выбирать характерные шрифты под нишу и визуальный тон проекта.

**Данные и контент.** `ALLOW_FAKE_DATA: false` — не выдумывать отзывы, кейсы, цифры, рейтинги, логотипы клиентов, реквизиты. Использовать плейсхолдеры из `00_master_tz_landing.md`.

**Юридический слой (152-ФЗ, frontend):**
- consent checkbox — `false` по умолчанию, блокирует submit без согласия
- ссылка на политику конфиденциальности под каждой формой
- cookie banner при первом визите
- footer с реквизитами-заглушками и legal-ссылками
- не заявлять полное юридическое соответствие без проверки юристом

**Технические запреты:**
- Не использовать `scrollIntoView`
- Не использовать emoji как иконки
- Не хардкодить токены, ключи, счётчики — только через `.env.example`

**Язык.** Все тексты интерфейса, комментарии в коде и отчёты — на русском языке.

---

## Применимость

✅ Применять: лендинги, маркетинговые страницы, прототипы, UI-мокапы, дашборды, анимации, дизайн-системы

❌ Не применять: бэкенд API, CLI-инструменты, скрипты обработки данных, задачи без визуального результата

---

## Шаг 1 — Понять задачу (решить нужно ли задавать вопросы)

Не задавать вопросы механически. Решение — по контексту:

| Сценарий | Вопросы? |
|---|---|
| Приложен заполненный бриф + все переменные заполнены | ❌ Данных достаточно — создать `project-tz.md` и начать Фазу 0 |
| Приложен бриф с заглушками `[ЗАГЛУШКА]` | ⚠️ Зафиксировать заглушки, продолжить — заказчик заполнит позже |
| Нет брифа, нет ТЗ, только общее описание | ✅ Задать вопросы: ниша, ЦА, цель, главное действие |
| Не указан `PROJECT_MODE` или `NICHE` | ✅ Остановиться и уточнить перед стартом |
| Есть `project-tz.md` + переменные заполнены | ❌ Начинать немедленно |

Если нужно уточнить — задавать не больше 3 вопросов за раз, только блокирующие старт.

---

## Шаг 2 — Собрать дизайн-контекст (по приоритету)

Хороший дизайн строится на существующем контексте. Никогда не начинать с нуля без исследования.

1. Материалы от заказчика (бриф, логотип, фирменные цвета, сайты-ориентиры) → изучить и извлечь токены
2. Сайты-ориентиры из брифа → проанализировать: цвета, типографика, отступы, анимации
3. Сайты конкурентов из брифа → определить от чего отличаться
4. Если ничего нет → явно сообщить что «отсутствие референсов влияет на качество» и выбрать направление на основе ниши

При анализе референсов фокус на: цветовая система, типографика, отступы, скругления, тени, анимации, плотность компонентов, тон текстов.

---

## Шаг 3 — Объявить дизайн-систему до написания кода

Перед первой строкой кода сформулировать дизайн-решения и дать пользователю подтвердить:

```
Дизайн-решения:
- Цветовая палитра: [основной / нейтральный / акцент]
- Типографика: [шрифт заголовков / шрифт тела]
- Система отступов: [базовая единица и кратные]
- Скругления: [большие / малые / острые]
- Анимации: [easing / длительность / триггер]
```

---

## Шаг 4 — Показать v0-черновик до полной реализации

До написания полных компонентов — показать «видимый v0» с плейсхолдерами и ключевым лейаутом.

Цель v0: дать возможность скорректировать направление раньше. Тон правильный? Лейаут верный?

Включает: структура + цвета/типографика + плейсхолдеры (`[фото]`, `[иконка]`) + список дизайн-допущений.
Не включает: детали контента, полная библиотека компонентов, все состояния, анимации.

---

## Шаг 5 — Полная реализация

После подтверждения v0 — писать полные компоненты, добавлять состояния, реализовывать анимации.

Если в процессе возникает важное решение (например, выбор между подходами к взаимодействию) — остановиться и уточнить, не продавливать молча.

---

## Технические требования

### HTML/CSS/JS (vite-static, static-html)

- Все цвета — только через CSS-переменные (`--color-*`). Hardcoded-цвета запрещены.
- Анимации — CSS-first: `transition`, `@keyframes`, `animation`. JS только когда CSS недостаточно.
- Адаптив: mobile-first. Брейкпоинты: 320px, 768px, 1024px, 1440px.
- Изображения: `loading="lazy"`, `width` и `height` атрибуты обязательны.
- Формы: валидация на клиенте + состояния loading/success/error + `aria-live="polite"`.
- Навигация по якорям: только `href="#section"`, не `scrollIntoView`.
- Иконки: SVG inline или библиотека (Lucide, Phosphor). Не emoji.
- Шрифты: Google Fonts через `<link>` с `display=swap`. Не Inter, не Roboto, не Arial.

### React / Next.js (next-react)

- Токены в `src/styles/tokens.css` — CSS-переменные, не Tailwind-классы.
- Компоненты: функциональные + хуки. Без `const styles = {...}`.
- Изображения: `next/image` с `width`, `height`, `priority` для Hero.
- Шрифты: `next/font` — загрузка без FOUT.
- Переменные окружения: `NEXT_PUBLIC_*` для клиента, остальные только сервер.

### Общие запреты

- Не хардкодить токены, ключи API, ID счётчиков — только `.env.example`
- Не использовать `scrollIntoView`
- Не использовать emoji как иконки
- Не выдумывать контент — только `[ЗАГЛУШКА]`
- Не заявлять соответствие 152-ФЗ без юридической проверки

---

## Мобильная версия — обязательные требования

Основной трафик РФ-лендингов — iPhone (375–390px). Мобиль проектируется первым, десктоп — адаптацией.

### Burger-меню — точные правила реализации

Частая точка отказа. Реализовывать строго по этому шаблону:

**HTML-структура:**
```html
<header class="header">
  <div class="header__inner">
    <a class="header__logo" href="/">...</a>
    <button class="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </button>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <nav class="mobile-menu__nav">...</nav>
</div>
<div class="mobile-menu__overlay" aria-hidden="true"></div>
```

**CSS — обязательные правила:**
```css
/* Меню — скрыто по умолчанию, slide справа */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100dvh; /* dvh а не vh — учитывает адресную строку Safari */
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Overlay */
.mobile-menu__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 999;
}

/* Открытое состояние */
.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-menu__overlay.is-open {
  opacity: 1;
  visibility: visible;
}

/* Блокировка скролла страницы */
body.menu-open {
  overflow: hidden;
  /* iOS Safari fix: */
  position: fixed;
  width: 100%;
}
```

**JS — обязательная логика:**
```js
const burger = document.querySelector('.burger');
const menu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-menu__overlay');
const links = menu.querySelectorAll('a');

function openMenu() {
  menu.classList.add('is-open');
  overlay.classList.add('is-open');
  document.body.classList.add('menu-open');
  burger.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  menu.classList.remove('is-open');
  overlay.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

burger.addEventListener('click', () => {
  menu.classList.contains('is-open') ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

// Закрыть при клике на пункт меню
links.forEach(link => link.addEventListener('click', closeMenu));

// Закрыть по Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});
```

**Критичные правила:**
- Использовать `100dvh` вместо `100vh` — исправляет Safari на iPhone где `100vh` не учитывает адресную строку
- `body.menu-open` должен получать `position: fixed; width: 100%` — иначе страница скроллится под открытым меню на iOS
- Overlay — отдельный элемент с `z-index` ниже меню, не псевдоэлемент
- Меню закрывается по: клику на overlay, клику на пункт меню, клавише Escape

### Типографика на мобиле

- Минимальный размер текста: `16px` — меньше iOS масштабирует input автоматически
- `font-size` на `<input>` и `<textarea>` — строго `16px` или больше, иначе Safari зумирует форму при фокусе
- Заголовки: `clamp()` для плавного масштабирования. Пример: `font-size: clamp(1.75rem, 5vw, 3rem)`
- Выравнивание текста: `text-align: left` по умолчанию. `text-align: center` только для коротких подписей и CTA-блоков
- Запрет: `text-align: justify` — даёт некрасивые пробелы на узких экранах

### Кнопки и касания на мобиле

- Минимальная область касания: `44×44px` (требование Apple HIG и WCAG)
- Кнопки-иконки без текста — добавлять `aria-label` и padding до нужного размера касания
- Расстояние между соседними кнопками: минимум `8px` — предотвращает случайные нажатия
- `cursor: pointer` на всех кликабельных элементах
- Состояние `:active` — обязательно, даёт тактильный отклик на тач

### Попапы и модальные окна на мобиле

```css
.modal {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: flex-end; /* на мобиле — sheet снизу */
  padding: 0;
}

.modal__content {
  width: 100%;
  max-height: 90dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 16px 16px 0 0;
  padding: env(safe-area-inset-bottom); /* notch-safe на iPhone */
}

@media (min-width: 768px) {
  .modal {
    align-items: center;
    padding: 1rem;
  }
  .modal__content {
    width: min(560px, 100%);
    max-height: 85dvh;
    border-radius: 16px;
  }
}
```

**Критичные правила попапов:**
- `body.menu-open` (та же техника что для бургера) — блокировать скролл страницы
- `max-height: 90dvh` + `overflow-y: auto` — попап не вылезает за экран
- `env(safe-area-inset-bottom)` — padding под notch на iPhone
- Закрытие: по overlay, по кнопке ×, по Escape
- Фокус при открытии — перевести на первый интерактивный элемент внутри попапа

### Формы на мобиле

- `font-size: 16px` на всех `<input>` — предотвращает автозум в Safari
- `autocomplete` атрибуты — `name`, `tel`, `email` для быстрого заполнения
- `inputmode="tel"` для телефона — открывает цифровую клавиатуру
- Кнопка submit — полная ширина на мобиле (`width: 100%`)
- Отступ снизу формы: `padding-bottom: env(safe-area-inset-bottom)` если форма у нижнего края

### Маска телефона — обязательная реализация

Поле телефона всегда реализовывать с маской. Без маски пользователь вводит произвольные символы.

```html
<input
  type="tel"
  id="phone"
  name="phone"
  inputmode="tel"
  autocomplete="tel"
  placeholder="+7 (___) ___-__-__"
  maxlength="18"
/>
```

```js
// Маска +7 (___) ___-__-__ без внешних библиотек
function phoneMask(input) {
  input.addEventListener('input', function (e) {
    let value = this.value.replace(/\D/g, ''); // только цифры

    // Всегда начинать с 7
    if (value.startsWith('8')) value = '7' + value.slice(1);
    if (!value.startsWith('7')) value = '7' + value;

    // Обрезать до 11 цифр (7 + 10)
    value = value.slice(0, 11);

    // Форматирование
    let formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.slice(1, 4);
    if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
    if (value.length >= 7) formatted += '-' + value.slice(7, 9);
    if (value.length >= 9) formatted += '-' + value.slice(9, 11);

    this.value = formatted;
  });

  // При фокусе — если пусто, проставить +7
  input.addEventListener('focus', function () {
    if (!this.value) this.value = '+7 ';
  });

  // При потере фокуса — если только +7, очистить
  input.addEventListener('blur', function () {
    if (this.value === '+7 ' || this.value === '+7') this.value = '';
  });
}

// Применить ко всем полям телефона
document.querySelectorAll('input[type="tel"]').forEach(phoneMask);
```

**Валидация телефона:**
```js
function isValidPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 11 && digits.startsWith('7');
}
```

**Критичные правила:**
- Поле всегда начинается с `+7` — пользователь не может ввести другой код
- `maxlength="18"` — ограничение длины с учётом маски
- Валидация: ровно 11 цифр начиная с 7
- Placeholder: `+7 (___) ___-__-__` — показывает формат до ввода

### Отступы и сетка на мобиле

- Боковые отступы контейнера: `padding-inline: 16px` (минимум) или `clamp(16px, 4vw, 24px)`
- Не использовать фиксированные `px`-ширины для колонок — только `%`, `fr`, `min()`, `max()`, `clamp()`
- Карточки в сетке: на мобиле всегда одна колонка если контент текстовый
- Изображения: `max-width: 100%` — запрет выхода за контейнер

---

## Специфика типов проектов

### Коммерческий лендинг (основной сценарий)

- Hero: H1 + подзаголовок + первичный CTA + вторичный CTA + визуал
- Все формы: consent checkbox `false` по умолчанию + ссылка на политику
- Footer: реквизиты-заглушки + legal-ссылки
- Мобиль проверять на 375px (iPhone SE/стандарт) и 390px (iPhone 14/15)
- Производительность: lazy loading, минимум внешних скриптов

### Логотип — размеры и поведение

Частая ошибка: логотип генерируется слишком маленьким и не масштабируется.

```css
.header__logo img,
.header__logo svg {
  /* Десктоп */
  height: 40px;
  width: auto; /* пропорциональная ширина */
  max-width: 200px;
  display: block;
}

@media (max-width: 768px) {
  .header__logo img,
  .header__logo svg {
    height: 32px;
    max-width: 160px;
  }
}
```

**Правила:**
- Логотип задаётся через `height` (фиксированная) + `width: auto` — сохраняет пропорции
- Десктоп: высота 36–48px. Мобиль: 28–36px
- Никогда не задавать фиксированную ширину без `height: auto` — логотип будет растянут
- Если логотип SVG — убедиться что у него нет жёстко заданных `width` и `height` в атрибутах тега, использовать только CSS
- `[logo]` заглушка — реализовать как текстовый wordmark или геометрическую SVG-фигуру соразмерного размера

### Квиз — вёрстка кнопок навигации

Частая ошибка: кнопка «Назад» смещает кнопку «Получить расчёт» на последнем экране квиза.

```css
.quiz__nav {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 24px;
}

.quiz__btn-back {
  flex-shrink: 0; /* не сжимать кнопку «Назад» */
  width: 44px;
  height: 44px;
  /* иконка стрелки или текст «←» */
}

.quiz__btn-submit {
  flex: 1; /* занимает оставшееся место */
  min-width: 0; /* предотвращает overflow */
}

@media (max-width: 480px) {
  .quiz__nav {
    flex-direction: row; /* не менять на column — кнопки должны быть в одной строке */
    gap: 8px;
  }

  .quiz__btn-back {
    flex-shrink: 0;
  }
}
```

**Правила:**
- Контейнер кнопок: `display: flex; gap: 12px; align-items: center`
- Кнопка «Назад»: `flex-shrink: 0` — не сжимается
- Кнопка CTA: `flex: 1` — занимает всё доступное пространство
- Никогда не использовать `position: absolute` для кнопки «Назад» внутри формы квиза
- На мобиле кнопки остаются в одной строке, не переносить в колонку

### Кнопка «Наверх» — обязательный элемент

Реализовывать на всех лендингах длиннее 3 экранов.

```html
<button class="scroll-top" aria-label="Наверх" hidden>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>
```

```css
.scroll-top {
  position: fixed;
  bottom: 32px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease;
  z-index: 900;
  box-shadow: var(--shadow-md);
}

.scroll-top:hover {
  transform: translateY(-2px);
}

.scroll-top.is-visible {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .scroll-top {
    bottom: 20px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}
```

```js
const scrollTopBtn = document.querySelector('.scroll-top');

// Показывать после прокрутки на 400px
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('is-visible', window.scrollY > 400);
}, { passive: true });

// Прокрутка наверх
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
```

**Правила:**
- `position: fixed`, правый нижний угол: `bottom: 32px; right: 24px`
- Появляется после скролла на 400px, скрывается при возврате наверх
- Размер: 44×44px (минимум для тач) — на мобиле допустимо 40×40px
- `z-index: 900` — ниже попапов (1100) и меню (1000), выше контента
- Не перекрывать cookie-баннер и fixed CTA — проверить конфликты `z-index`

### Прототип / мокап

- Показывать рабочий v0 раньше чем полную реализацию
- Tweaks Panel (панель параметров) в правом нижнем углу для итераций с заказчиком
- Плейсхолдеры явными маркерами: `[фото 16:9]`, `[иконка]`, `[логотип]`

### Дашборд / визуализация данных

- Chart.js (простые графики) или D3.js (сложные кастомные)
- Responsive контейнеры (`ResizeObserver`)
- Принцип data-ink ratio: убирать лишние сетки, 3D-эффекты, тени

---

## Чеклист перед сдачей

### Общее
- [ ] Консоль браузера — ноль ошибок и предупреждений
- [ ] Все цвета из объявленной дизайн-системы — нет посторонних
- [ ] Не использован `scrollIntoView`
- [ ] Нет AI-клише: фиолетовые градиенты, Inter/Roboto, card с левым бордером-акцентом
- [ ] Нет выдуманного контента — только плейсхолдеры
- [ ] Consent checkbox под каждой формой — `false` по умолчанию
- [ ] Footer содержит реквизиты-заглушки и legal-ссылки
- [ ] Cookie banner реализован
- [ ] `.env.example` содержит все переменные, реальных ключей нет
- [ ] Визуальное качество уровня Dribbble / Behance

### Мобиль (проверять на 375px и 390px — iPhone)
- [ ] Burger-меню: открывается slide справа, overlay перекрывает страницу полностью
- [ ] При открытом меню страница не скроллится (body.menu-open + position: fixed)
- [ ] Меню закрывается по: overlay, пункту меню, клавише Escape
- [ ] Попапы: не вылезают за экран, скролл внутри работает, страница заблокирована
- [ ] Все `<input>` и `<textarea>` — `font-size: 16px` минимум (нет автозума в Safari)
- [ ] Кнопки — минимум 44×44px область касания
- [ ] Текст выровнен по левому краю, нет `text-align: justify`
- [ ] Нет фиксированных px-ширин у колонок — только %, fr, clamp()
- [ ] Изображения не вылезают за контейнер — `max-width: 100%`
- [ ] Используется `100dvh` вместо `100vh` для full-screen элементов
- [ ] Отступы контейнера: минимум 16px с каждой стороны
- [ ] Корректное отображение на 375px (iPhone SE/стандарт) и 390px (iPhone 14/15)

### Формы и компоненты
- [ ] Поле телефона: маска `+7 (___) ___-__-__`, ввод только с +7, валидация 11 цифр
- [ ] Логотип: высота 36–48px десктоп / 28–36px мобиль, `width: auto`, SVG без жёстких атрибутов
- [ ] Квиз (если есть): кнопки «Назад» и CTA в одной строке flex, «Назад» — `flex-shrink:0`, CTA — `flex:1`
- [ ] Кнопка «Наверх»: `position:fixed` правый нижний угол, появляется после 400px скролла, `z-index:900`
