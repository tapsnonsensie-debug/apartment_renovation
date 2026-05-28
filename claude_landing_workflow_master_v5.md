# Мастер-файл v5: workflow для Claude Code по созданию коммерческих лендингов РФ

> **Инструмент:** Claude Code (расширение VS Code / CLI)
> **Рынок:** РФ — русский язык, 152-ФЗ
> **Режимы:** `vite-static` | `next-react` (основные), `static-html` (резервный)
> **Запуск:** одним мастер-промптом из раздела 6
> **ТЗ проекта:** передаётся через отдельный `.md`-файл

---

## Что изменено в v5

- **Скилл:** `frontendSKILL.md` удалён из workflow. Используется только `WebDesignPrototypeSkill.md` — он содержит полный процесс, Pre-delivery Checklist и технические требования. Эстетические принципы из `frontendSKILL.md` интегрированы как блок `Commercial trust override` внутри этого документа.
- **Вынесены в отдельные файлы:** деплой → `deploy-guide.md`, тёмная тема → `dark-mode-guide.md`, интеграции → `integrations-guide.md`.
- **Аналитические события:** базовые (form_submit, phone_click) реализуются автоматически. Дополнительные события — на усмотрение заказчика, фиксируются в `integration-contract.md`.
- **Мастер-промпт** обновлён: ссылается на отдельные guide-файлы вместо дублирования содержимого.
- **v5:** добавлен сценарий запуска из брифа (без готового `project-tz.md`), дефолты переменных, точный шаблон burger-меню в Фазе 3.

---

## 1. Структура файлов workflow

```
/workflow-files
  claude_landing_workflow_master_v4.md   ← этот файл
  deploy-guide.md                        ← деплой (GitHub Pages / Netlify / Vercel)
  dark-mode-guide.md                     ← тёмная тема (CSS-переменные, next-themes)
  integrations-guide.md                  ← формы, CRM, Яндекс.Метрика, GA4
  WebDesignPrototypeSkill.md             ← основной скилл дизайна и разработки
  00_master_tz_landing.md               ← базовый стандарт лендингов РФ
```

`frontendSKILL.md` — не используется как отдельный файл в workflow. Его эстетические принципы включены в раздел 3.1 ниже.

---

## 2. Почему WebDesignPrototypeSkill.md — основной скилл

`WebDesignPrototypeSkill.md` содержит:
- Полный процесс из 6 шагов: от понимания требований до верификации.
- Правило v0-черновика — показать направление до полной реализации.
- Pre-delivery Checklist — конкретный список проверок перед сдачей.
- Технические спецификации под каждый тип проекта.
- Правила работы с существующим кодом.
- Критерии: когда задавать вопросы, а когда начинать сразу.

`frontendSKILL.md` — манифест об эстетике без процесса и чеклистов. Его принцип «выбирай смелое направление и исполняй точно» включён ниже как `Commercial trust override`.

---

## 3. Ключевые правила и дополнения

### 3.1 Commercial trust override (эстетика для коммерческих лендингов РФ)

Источник: принципы `frontendSKILL.md`, адаптированные для коммерческого контекста.

Перед написанием кода зафиксировать эстетическое направление:
- **Ниша определяет тон.** Стоматология — доверие и чистота. Фитнес — энергия и динамика. Юридические услуги — авторитет и надёжность. Выбрать направление явно, не по умолчанию.
- **Типографика.** Выбирать характерные шрифты, которые соответствуют нише. Запрещены как основной шрифт: Inter, Roboto, Arial, system-ui.
- **Цвет.** Доминирующий цвет + резкий акцент работает лучше, чем равномерно распределённая палитра.
- **Анимации.** Одна хорошо срежиссированная загрузка страницы лучше десяти разрозненных микроанимаций. Всегда `prefers-reduced-motion`.

Запрещено:
- Заменять legal-блоки декоративными элементами.
- Визуальные эффекты, ухудшающие Performance, Accessibility или мобильную версию.
- Выдуманные отзывы, кейсы, цифры, лицензии, логотипы клиентов.
- AI-клише: фиолетово-розовые градиенты, emoji-иконки, предсказуемые card-паттерны с левым акцентом.

### 3.2 Правило неоднозначности

Если в ТЗ есть хотя бы одна из ситуаций:
- не указан `PROJECT_MODE`;
- не указана ниша (`NICHE`);
- противоречие между требованиями;
- неясен endpoint формы при наличии формы;

Claude Code **обязан остановиться** и задать вопрос:

```
⚠️ Уточнение перед стартом

Обнаружена неоднозначность: [описание].
Варианты:
1. [вариант А]
2. [вариант Б]

Какой выбрать?
```

Не продолжать без ответа.

### 3.3 Правило скилла WebDesignPrototypeSkill.md

При работе над лендингом Claude Code следует процессу из `WebDesignPrototypeSkill.md`:

- **Шаг 3 (Design system declaration):** перед написанием кода зафиксировать дизайн-систему в Markdown и получить подтверждение (или зафиксировать в `setup.md` при `RUN_MODE=auto`).
- **Шаг 4 (v0 draft):** при `RUN_MODE=step-by-step` показать v0 с плейсхолдерами перед полной реализацией.
- **Шаг 6 (Verification):** пройти Pre-delivery Checklist перед сдачей каждой фазы.

Pre-delivery Checklist из `WebDesignPrototypeSkill.md` обязателен для фазы 4 (Finalization).

---

## 4. Переменные проекта

```md
PROJECT_MODE:    vite-static | next-react | static-html
NICHE:           [ниша проекта]
TZ_FILE:         [имя файла с ТЗ, например: project-tz.md]
RUN_MODE:        auto | step-by-step
DARK_MODE:       auto | light-only | dark-only
INTEGRATIONS:    форма-email | форма-telegram | crm-amocrm | crm-bitrix | metrika | ga4 | none
ALLOW_FAKE_DATA: false
LANGUAGE:        ru
LEGAL_REGION:    РФ
```

**Дефолты если переменная не указана:**

| Переменная | Дефолт | Когда менять |
|---|---|---|
| `DARK_MODE` | `light-only` | Заказчик явно просит тёмную тему → `auto` |
| `INTEGRATIONS` | `форма-email` | Заказчик называет конкретный канал или CRM |
| `RUN_MODE` | `step-by-step` | Уверен в ТЗ, хочешь один прогон → `auto` |
| `deploy-guide.md` | не подключать | Подключать только на Фазе 4 после локального просмотра |

**Правила выбора PROJECT_MODE:**

| Режим | Когда использовать |
|---|---|
| `vite-static` | HTML/SCSS/JS + Vite. Стандартный выбор по умолчанию. |
| `next-react` | Next.js + React + TypeScript. SEO, масштабирование, CRM. |
| `static-html` | Тильда / Zero Block, прототип, явное «без сборщика». |

---

## 5. Матрица входных файлов

| Файл | Использовать? | Роль |
|---|---|---|
| `project-tz.md` | **Да, обязательно** | ТЗ конкретного проекта (если нет — Claude создаёт из брифа) |
| Заполненный бриф заказчика | Да, если нет `project-tz.md` | Claude создаёт `project-tz.md` из брифа как первое действие перед Фазой 0 |
| `00_master_tz_landing.md` | Да | Базовый стандарт лендингов РФ |
| `WebDesignPrototypeSkill.md` | **Да, основной скилл** | Процесс, дизайн-система, checklist |
| `deploy-guide.md` | Да, на фазе 4 | Деплой GitHub Pages / Netlify / Vercel |
| `dark-mode-guide.md` | Да, если `DARK_MODE ≠ light-only` | Реализация тёмной темы |
| `integrations-guide.md` | Да, если `INTEGRATIONS ≠ none` | Формы, CRM, аналитика |
| `AGENTS.md` | Частично | Только: git, project-state, проверки файлов |
| `BackendSkill.md` | По условию | Только если есть серверные задачи |
| `frontendSKILL.md` | **Нет** | Принципы включены в раздел 3.1 |

---

## 6. Мастер-промпт для Claude Code (один запуск, AUTO режим)

> Скопировать целиком. Заполнить переменные в блоке `## Переменные проекта`.

```md
# Claude Code — Мастер-промпт: коммерческий лендинг РФ

## Роль

Ты — Claude Code. Работай как frontend-orchestrator, архитектор, design-system lead, разработчик и QA для коммерческого лендинга РФ.

## Переменные проекта

PROJECT_MODE:    [vite-static | next-react | static-html]
NICHE:           [ниша проекта]
TZ_FILE:         [имя файла с ТЗ, например: project-tz.md]
RUN_MODE:        auto
DARK_MODE:       [auto | light-only | dark-only]
INTEGRATIONS:    [форма-email | форма-telegram | crm-amocrm | crm-bitrix | metrika | ga4 | none]
ALLOW_FAKE_DATA: false
LANGUAGE:        ru
LEGAL_REGION:    РФ

## Входные файлы

Прочитай и используй:
- `[TZ_FILE]` — ТЗ проекта (обязательно)
- `00_master_tz_landing.md` — базовый стандарт
- `WebDesignPrototypeSkill.md` — основной скилл: процесс, дизайн-система, Pre-delivery Checklist

Прочитай и используй по условию:
- `deploy-guide.md` — на фазе 4 (деплой)
- `dark-mode-guide.md` — если DARK_MODE ≠ light-only
- `integrations-guide.md` — если INTEGRATIONS ≠ none
- `AGENTS.md` — только как операционный overlay (git, project-state, проверки)
- `BackendSkill.md` — только если INTEGRATIONS требует серверных задач

## Правило неоднозначности

Если в ТЗ есть противоречия или пропущены критичные данные — остановись:

```
⚠️ Уточнение перед стартом
Обнаружена неоднозначность: [описание].
Варианты: 1. [...] 2. [...]
Какой выбрать?
```

Не продолжай без ответа.

## Жёсткие правила

1. Не выдумывай факты, реквизиты, отзывы, логотипы, рейтинги, цифры.
2. Используй placeholders: `[icon]`, `[16:9 image]`, `[client-logo]`, `[ИНН]`, `[ОГРН]`, `[Юридический адрес]`.
3. Все интерфейсные тексты — на русском языке.
4. Соблюдай 152-ФЗ (frontend-слой): consent checkbox unchecked, privacy links, cookie banner, legal footer, блокировка submit без согласия.
5. Не заявляй полное юридическое соответствие без проверки юристом.
6. Не используй scrollIntoView.
7. Не используй emoji как иконки.
8. Не используй Inter / Roboto / Arial / system-ui как основной шрифт.
9. Не добавляй тяжёлые библиотеки без прямой пользы.
10. Токены, API-ключи, счётчики — только через `.env.example`. Не хардкодить.
11. После каждой фазы обновляй `project-state.md`.
12. Если `.git` существует — делай commit после каждой фазы.
13. Если `.git` отсутствует — не инициализируй без прямого указания.
14. Следуй Pre-delivery Checklist из `WebDesignPrototypeSkill.md` на фазе 4.
15. Аналитика: базовые события (form_submit, phone_click) реализовать автоматически. Дополнительные события — зафиксировать как пустой шаблон в `integration-contract.md` для заполнения заказчиком.

## Workflow

Выполни фазы последовательно.

---

### Фаза 0. Preflight

1. Прочитай `[TZ_FILE]` и все входные файлы по матрице выше.
2. Проверь структуру проекта.
3. Определи `PROJECT_MODE`. Если неясен — задай вопрос.
4. Создай/обнови `project-state.md`.

`project-state.md` включает:
- текущую фазу, режим, основания, нишу, интеграции, dark mode;
- список активных/отключённых файлов;
- открытые вопросы, риски, план.

```bash
git add project-state.md
git commit -m "docs: add project preflight state"
# только если .git существует
```

---

### Фаза 1. Architecture

Создай `setup.md` (только Markdown, без кода реализации).

Содержание:
- project mode и дерево проекта под режим (с `.env.example` и `integration-contract.md`);
- дизайн-система: эстетическое направление под нишу, color tokens (включая dark mode если нужно), типографика (не Inter/Roboto/Arial/system-ui), spacing 8px-base, radius, shadow, motion;
- grid, containers, breakpoints: 320 / 480 / 768 / 1200 / 1440+;
- логика секций (Hero → Footer) с целями, CTA, placeholders;
- UI-kit: кнопки, inputs, cards, accordion, modal, cookie-banner, form-status;
- матрица состояний: default / hover / focus-visible / active / disabled / loading / success / error;
- legal 152-ФЗ (frontend-слой): consent, privacy links, cookie banner, реквизиты-заглушки;
- план интеграций по `integrations-guide.md` (если INTEGRATIONS ≠ none);
- naming conventions.

```bash
git add setup.md project-state.md
git commit -m "docs: add landing setup architecture"
```

---

### Фаза 2. Structure

Создай структуру страницы под `PROJECT_MODE`.

Для всех режимов:
- `lang="ru"`, полные meta, og-теги;
- placeholder аналитики в `<head>` (из `integrations-guide.md` если нужно);
- комментарии-якоря секций: `<!-- SECTION: HERO -->` и т.д.;
- формы: consent checkbox=false, aria-атрибуты, label, aria-live="polite";
- footer: реквизиты-заглушки, ссылки на legal-страницы;
- placeholder philosophy: `[icon]`, `[16:9 image]`, `[client-logo]`, `[ИНН]`, `[ОГРН]`;
- no fake data, no inline styles, no inline scripts, no emoji-иконок.

**vite-static:** `index.html` (Vite entrypoints), пустые `src/js/main.js`, `src/scss/style.scss`, `legal/*.html`.
**next-react:** `layout.tsx`, `page.tsx`, компоненты, `landing-content.ts`, `legal/*/page.tsx`.
**static-html:** `index.html`, `legal/*.html`.

Legal-заглушки для всех режимов: структура политики, оферты, cookie notice.

```bash
git add .
git commit -m "feat: add landing structure"
```

---

### Фаза 3. Implementation

Реализуй стили, интерактив и интеграции.

**Styling:**
- CSS-переменные из tokens, reset, `clamp()`-типографика, CSS Grid + Flexbox;
- все breakpoints, все состояния компонентов;
- `@media (prefers-reduced-motion: reduce)`;
- тёмная тема по `dark-mode-guide.md` если `DARK_MODE ≠ light-only`.

**Interactions:**
- burger menu — реализовывать строго по шаблону из `WebDesignPrototypeSkill.md`: `position:fixed`, `width:min(320px,85vw)`, `height:100dvh`, slide справа, overlay отдельным элементом с собственным `z-index`, `body.menu-open` с `position:fixed; width:100%` для блокировки скролла на iOS, закрытие по overlay / пункту меню / Escape;
- FAQ accordion (keyboard);
- modal (focus trap, Esc, overlay close, return focus, role="dialog", aria-modal="true");
- form validation (blur/input, consent required, double submit prevention, aria-live="polite", loading/success/error);
- cookie banner (localStorage, первый визит);
- запрет scrollIntoView.

**По режимам:**
- vite-static: SCSS partials + JS modules (`menu.js`, `accordion.js`, `modal.js`, `forms.js`, `cookies.js`, `analytics.js`). Каждый модуль: безопасный init.
- next-react: CSS Modules, client components, `src/lib/analytics.ts`.
- static-html: `style.css` + `script.js` (ES6, DOMContentLoaded, проверка элементов).

**Интеграции:**
Реализовать по `integrations-guide.md` согласно `INTEGRATIONS`.
Создать `.env.example` со всеми переменными.
Создать `integration-contract.md` (шаблон в `integrations-guide.md`).
Для аналитики: базовые события реализовать. Раздел «Дополнительные события» оставить пустым шаблоном для заказчика.

```bash
git add .
git commit -m "feat: add landing styles and interactions"
```

---

### Фаза 4. Finalization

Создай `finalize.md`.

Включи:

**1. Acceptance checklist** (все пункты из Pre-delivery Checklist `WebDesignPrototypeSkill.md`, плюс):
- все секции реализованы;
- 152-ФЗ frontend-слой соблюдён;
- legal-ссылки в footer и под формами;
- `.env.example` содержит все переменные;
- тёмная тема работает (если DARK_MODE=auto);
- аналитические базовые события реализованы;
- нет console errors/warnings.

**2. Lighthouse targets:**
- Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.

**3. Asset specification:**
- AVIF/WebP + fallback, srcset/sizes, lazy/eager для LCP, naming `section-purpose-size.ext`.

**4. Placeholder replacement guide:**
- список всех `[placeholder]` → что нужно, где находится;
- список всех переменных из `.env.example` → где получить значение.

**5. Legal readiness checklist:**
- тексты требуют проверки юристом;
- оператор ПД проверяет необходимость уведомления Роскомнадзора;
- серверное логирование согласия описано в `integration-contract.md`.

**6. Local QA commands** — по `deploy-guide.md` под выбранный режим.

**7. Deploy guide** — ссылка на `deploy-guide.md` + конкретный раздел под `PROJECT_MODE`.

**8. Security/performance headers** — по `deploy-guide.md`.

**9. Final report:**
- что готово;
- что заменить перед публикацией (ассеты, реквизиты, legal-тексты, переменные окружения, счётчики аналитики, дополнительные аналитические события);
- какие проверки нужны вручную;
- какие legal-пункты требуют юриста.

Не меняй код. Не выдумывай Lighthouse-результаты. Не заявляй соответствие 152-ФЗ без юриста.

```bash
git add finalize.md project-state.md
git commit -m "docs: add final QA and deploy checklist"
```

---

## Формат отчёта после завершения

```md
# Отчёт Claude Code

## Создано/обновлено
- ...

## Выбранный режим
PROJECT_MODE=...

## Интеграции реализованы
- ...

## Коммиты
- ...

## Требует ручной замены перед публикацией
- Ассеты (изображения, иконки, шрифты)
- Реквизиты компании (ИНН, ОГРН, адрес)
- Legal-тексты (проверка юристом)
- Переменные окружения (.env.example → .env)
- Счётчики аналитики (Метрика ID, GA4 Measurement ID)
- Дополнительные аналитические события (заполнить с заказчиком в integration-contract.md)
- Endpoint формы (если не настроен)
- CRM-маппинг (если не реализован)

## Риски
- ...
```
```

---

## 7. Чек-лист качества перед запуском

- [ ] `TZ_FILE` существует в проекте.
- [ ] `PROJECT_MODE` указан или Claude Code уточнит.
- [ ] `INTEGRATIONS` заполнен (или `none`).
- [ ] `DARK_MODE` указан.
- [ ] `WebDesignPrototypeSkill.md` присутствует в проекте.
- [ ] `deploy-guide.md`, `dark-mode-guide.md`, `integrations-guide.md` присутствуют.
- [ ] Legal-требования не заменяют юридическую проверку.
- [ ] `BackendSkill.md` не активируется без серверных задач.
- [ ] `ALLOW_FAKE_DATA=false`.
- [ ] Запрет `scrollIntoView`.
- [ ] `.env.example` будет создан.
- [ ] Коммиты — только если `.git` существует.
- [ ] Pre-delivery Checklist из `WebDesignPrototypeSkill.md` пройдён на фазе 4.
- [ ] Дополнительные аналитические события оставлены как шаблон для заказчика.

---

## 8. Мини-команда запуска

```md
Прочитай `claude_landing_workflow_master_v4.md` и выполни workflow для Claude Code.

PROJECT_MODE:    vite-static
NICHE:           [ниша]
TZ_FILE:         project-tz.md
RUN_MODE:        auto
DARK_MODE:       auto
INTEGRATIONS:    форма-email, metrika
ALLOW_FAKE_DATA: false

Соблюдай все правила из мастер-файла.
```

---

## 9. Имя файла

```
claude_landing_workflow_master_v4.md
```