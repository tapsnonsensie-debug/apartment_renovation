# integration-contract.md — Квадрат+

## Что нужно заполнить перед публикацией

Скопировать `.env.example` в `.env.local` и заполнить:

| Переменная | Описание | Пример |
|---|---|---|
| `VITE_METRIKA_ID` | ID счётчика Яндекс.Метрики | `98765432` |
| `VITE_FORM_ENDPOINT` | URL POST-эндпоинта формы | `https://api.example.com/lead` |

---

## Форма — ожидаемый контракт

**Метод:** `POST`  
**Content-Type:** `application/json`

```json
{
  "source": "modal_calc | quiz",
  "name": "string",
  "phone": "+7 (9XX) XXX-XX-XX",
  "consent": true,

  // Только для квиза:
  "objectType": "new | secondary | studio",
  "area": "48",
  "stage": "rough | prefinish | turnkey",
  "level": "economy | comfort | design",
  "timing": "now | 1m | 3m | later"
}
```

**Ожидаемый ответ:**
- `2xx` → успех → показывается success-сообщение, трекается `form_submit_success`
- `4xx / 5xx` → ошибка → показывается error-сообщение, трекается `form_submit_error`

---

## Яндекс.Метрика — события

| Событие | Когда | Параметры |
|---|---|---|
| `form_submit_success` | Форма отправлена успешно | `{ form: "modal_calc" \| "quiz" }` |
| `form_submit_error` | Ошибка отправки | `{ form: "..." }` |
| `phone_click` | Клик на `tel:` ссылку | — |
| `quiz_complete` | Квиз пройден до конца | `{ level: "economy \| comfort \| design" }` |

---

## Замены плейсхолдеров

Все `[placeholder]` в `index.html` и `footer` заменяются заказчиком:

```
[phone]             → +7 (812) XXX-XX-XX
[email]             → info@kvadratplus.ru
[address]           → ул. Примерная, д. 1, оф. 10
[Название компании] → ООО «Квадрат Плюс»
[ИНН]               → 7800000000
[ОГРН]              → 1187800000000
[Юридический адрес] → ул. Юридическая, д. 1
[год]               → 2025
[цифра]             → реальные показатели
[цена]              → актуальные цены за м²
[map]               → embed-код карты
```

Изображения: заменить `.placeholder-img` на `<img src="..." alt="...">` с реальными фото.

---

## Legal-страницы

Три заглушки в `/legal/` требуют финального текста от юриста перед публикацией:
- `legal/privacy.html` — Политика конфиденциальности (152-ФЗ)
- `legal/offer.html` — Публичная оферта
- `legal/cookies.html` — Политика Cookie
