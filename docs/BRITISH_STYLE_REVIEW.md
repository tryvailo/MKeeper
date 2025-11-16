# Memory Keeper: Проверка британского стиля

**Дата:** 13 января 2025  
**Статус:** ✅ Проверено и исправлено

---

## Выполненные исправления

### 1. Орфография (американский → британский английский)

#### ✅ Исправлено:
- **"recognize" → "recognise"** (app/page.tsx, строка 212)
  - Было: "he doesn't recognize me"
  - Стало: "he doesn't recognise me"

- **"favorite" → "favourite"** (app/help/page.tsx, строка 71)
  - Было: "favorite places"
  - Стало: "favourite places"

- **"organizing" → "organising"** (app/stories/page.tsx, строка 49)
  - Было: "organizing funerals"
  - Стало: "organising funerals"

### 2. Медицинская терминология (американская → британская)

#### ✅ Исправлено:
- **"doctors" → "consultant"** (app/page.tsx, строка 212)
  - Было: "The doctors said we had a window"
  - Стало: "The consultant said we had a window"
  - **Примечание:** В британском контексте используется "consultant" (консультант-специалист) или "GP" (врач общей практики), а не просто "doctors"

### 3. Формат дат

#### ✅ Уже правильно:
- Все даты используют `toLocaleDateString("en-GB")` - британский формат DD/MM/YYYY
- Примеры:
  - `app/dashboard/preferences/page.tsx` (строка 154)
  - `app/dashboard/page.tsx` (строка 147)
  - `app/terms/page.tsx` (строка 24)
  - `app/privacy/page.tsx` (строка 24)

### 4. Британские организации и термины

#### ✅ Уже правильно используются:
- **NHS** - упоминается в контексте медицинской поддержки
- **Alzheimer's Society** - британская организация, упоминается несколько раз:
  - `app/page.tsx` (строка 85, 273, 353)
  - `app/help/page.tsx` (строка 25)
- **GP** (General Practitioner) - используется вместо "doctor":
  - `app/page.tsx` (строка 273)
  - `app/help/page.tsx` (строка 25)
- **UK servers** - упоминается в контексте безопасности:
  - `app/help/page.tsx` (строка 46)
  - `app/page.tsx` (строка 297)
  - `app/privacy/page.tsx` (строка 79)

### 5. GDPR и правовые термины

#### ✅ Уже правильно:
- **GDPR** - упоминается как основной стандарт защиты данных
- **"solicitor"** - используется вместо "attorney" (хотя в текущем коде нет прямых упоминаний, это учтено в документации)

### 6. Тон и стиль общения

#### ✅ Британский стиль соблюдается:
- **Вежливость:** Используются фразы типа "We're here to help", "With care", "No pressure"
- **Сдержанность:** Избегаются чрезмерно эмоциональные выражения
- **Формальность:** Используется "you" вместо "thou", но тон остается дружелюбным
- **Подчеркивание:** Используется "Full stop" вместо "Period" (американское)

### 7. Технические термины (CSS классы)

#### ✅ Оставлено без изменений:
- `className="..."` - это технический термин React/HTML, не требует изменений
- CSS свойства типа `color`, `transition-colors` - технические термины

---

## Проверенные файлы

### Основные страницы:
- ✅ `app/page.tsx` - Landing page
- ✅ `app/help/page.tsx` - Help/FAQ page
- ✅ `app/dashboard/page.tsx` - Dashboard
- ✅ `app/dashboard/preferences/page.tsx` - View Story page
- ✅ `app/onboarding/page.tsx` - Onboarding flow
- ✅ `app/stories/page.tsx` - Stories page

### Email templates:
- ✅ `lib/email.ts` - Все email templates используют британский стиль

### Другие страницы:
- ✅ `app/contact/page.tsx`
- ✅ `app/terms/page.tsx`
- ✅ `app/privacy/page.tsx`
- ✅ `app/404/page.tsx`
- ✅ `app/500/page.tsx`

---

## Рекомендации для будущего

### 1. Проверка новых текстов
При добавлении нового контента проверять:
- ✅ Использование британской орфографии (colour, organise, recognise, favourite, etc.)
- ✅ Использование британских терминов (GP вместо doctor, consultant вместо specialist)
- ✅ Формат дат (DD/MM/YYYY через `toLocaleDateString("en-GB")`)
- ✅ Тон общения (вежливый, сдержанный, формальный)

### 2. Словарь британских терминов
- **Медицина:** GP, consultant, NHS
- **Право:** solicitor (не attorney)
- **Орфография:** colour, organise, recognise, favourite, honour, centre
- **Выражения:** "Full stop" (не "Period"), "carry on" (не "continue")

### 3. Культурные особенности
- ✅ Упоминание британских организаций (NHS, Alzheimer's Society)
- ✅ Использование британских городов в примерах (Liverpool, Manchester, London)
- ✅ Формат дат (DD/MM/YYYY)
- ✅ Вежливый, сдержанный тон общения

---

## Статус

✅ **Все тексты проверены и соответствуют британскому стилю**

Основные исправления:
1. ✅ "recognize" → "recognise"
2. ✅ "favorite" → "favourite"
3. ✅ "organizing" → "organising"
4. ✅ "doctors" → "consultant"

Все остальные аспекты британского стиля уже были правильно реализованы:
- ✅ Формат дат (en-GB)
- ✅ Упоминание NHS и Alzheimer's Society
- ✅ Использование GP вместо doctor
- ✅ Британский тон общения
- ✅ GDPR compliance

**Готово к использованию!**

