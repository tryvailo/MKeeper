# Memory Keeper: Требования для бесплатного продукта

**Дата:** 13 января 2025  
**Источник:** Memory-Keeper-Strategy-2025.md  
**Цель:** Определить минимальный жизнеспособный бесплатный продукт и необходимые изменения на лендинге

---

## 1. ЧТО НУЖНО ДЛЯ БЕСПЛАТНОГО ПРОДУКТА

### 1.1 Основные функции (MVP)

#### ✅ Guided Interview (32 вопроса, 5 категорий)
**Время:** 35-40 минут  
**Категории:**
1. **Жизненные моменты** (8 вопросов, 8 минут)
   - What's the happiest memory you have?
   - Tell me about a vacation or trip you loved
   - Describe a day you'll never forget
   - A time you felt most proud of yourself
   - What made you laugh the most in life?
   - A moment when you felt truly loved
   - Your best friend — tell me about them
   - A time you overcame something difficult

2. **Семейные истории** (6 вопросов, 6 минут)
   - How did you meet your partner/spouse?
   - Tell me about your children when they were young
   - A funny family moment you remember
   - The most important thing you've passed on to your children
   - Your relationship with your own parents
   - A time your family came together

3. **Ценности и мудрость** (8 вопросов, 8 минут)
   - What matters most to you in life?
   - What are you most proud of?
   - Life lessons you'd share with young people
   - What brings you peace?
   - How do you want to be remembered?
   - What would you regret not telling your family?
   - Your greatest strength
   - What does love mean to you?

4. **Интересы и личность** (5 вопросов, 5 минут)
   - What are your favorite hobbies?
   - People who are most important to you
   - Places you love
   - Your favorite things to do
   - How would you describe your personality?

5. **Финальные послания** (5 вопросов, 10 минут)
   - A message for your children
   - A message for your spouse/partner
   - A message for your grandchildren
   - Something you want your family to know
   - Anything else you'd like to say?

**Выход:** 3,500-5,500 слов личной истории

#### ✅ Beautiful PDF Export
**Включает:**
- Cover page with name + photo upload
- Table of contents
- Each story on separate page with nice typography
- Quotes from answers as pull-quotes
- Family tree page (optional fields)
- Print-friendly design
- Warm, classic design (not trendy)
- Works in B&W AND color printing

#### ✅ Email Sharing
**Позволяет:**
- Generate plain-text email version
- Beautifully formatted for email clients
- Clickable sections
- One-click "send to all family" option

#### ✅ Shareable Link (30-day expiration)
**Механика:**
- Generate unique, random link (e.g., memory-keeper.app/share/abc123xyz)
- Family members visit link, can read full story
- NO login required (low friction)
- Link expires after 30 days (privacy protection)
- Can extend link or generate new one

#### ✅ Basic Email Automation
- Welcome email after signup
- Email reminders (annual)
- Upgrade offer email (после завершения интервью)

#### ✅ Simple Landing Page
- Hero section с фокусом на деменцию
- Problem section (3 карточки)
- Solution section (3 шага)
- Testimonials section
- FAQ section
- Footer

#### ✅ FAQ + Help Docs
- Основные вопросы о деменции
- Как использовать Memory Keeper
- Privacy и security информация
- Support контакты

#### ✅ Email Support
- Бесплатный founder support
- Ответы в течение 24-48 часов

---

## 2. ЧТО НУЖНО ИЗМЕНИТЬ НА ЛЕНДИНГЕ

### 2.1 Hero Section
**Текущее состояние:** ⚠️ Нужны изменения  
**Что проверить:**
- Убедиться, что нет упоминаний Premium функций ✅
- Убедиться, что акцент на "completely free" ✅
- Проверить, что время указано правильно (35-40 минут, не 15) ❌

**Найдено:**
- Строка 76: "Takes 15 minutes" ❌ (неточно)

**Рекомендуемые изменения:**
- Изменить "Takes 15 minutes" → "Takes 35-40 minutes" (более честно)
- Или: "Takes about 40 minutes. You can pause anytime."

### 2.2 Solution Section ("How it works")
**Текущее состояние:** ⚠️ Нужны изменения  
**Что проверить:**
- Убедиться, что упоминается "32 questions" (соответствует стратегии) ❌
- Убедиться, что нет упоминаний видео или Premium функций ✅

**Найдено:**
- Строка 158: "30+ easy questions" ❌ (неточно)

**Рекомендуемые изменения:**
- Изменить "30+ easy questions" → "32 guided questions" (точнее)

### 2.3 Free Section
**Текущее состояние:** ✅ Хорошо  
**Что проверить:**
- Убедиться, что акцент на "always free"
- Убедиться, что нет упоминаний Premium или платных опций

### 2.4 FAQ Section
**Текущее состояние:** ✅ Хорошо  
**Что проверить:**
- Убедиться, что нет упоминаний Premium функций
- Убедиться, что все ответы соответствуют бесплатному продукту

**Рекомендуемые изменения:**
- Добавить вопрос: "Will this always be free?" → "Yes. Memory Keeper is completely free for dementia families. Always will be."

### 2.5 Footer
**Текущее состояние:** ✅ Хорошо  
**Что проверить:**
- Убедиться, что нет ссылок на Premium страницы
- Убедиться, что нет упоминаний платных функций

---

## 3. ЧТО ЛИШНЕГО УДАЛИТЬ (чтобы было только то, что актуально для бесплатного продукта)

### 3.1 Страницы, которые нужно скрыть/удалить

#### ❌ Premium Page (`app/dashboard/premium/page.tsx`)
**Действие:** Удалить или скрыть полностью  
**Причина:** Premium функции не запускаются до месяца 7-9 согласно стратегии  
**Альтернатива:** Можно оставить файл, но скрыть все ссылки на него  
**Найдено ссылок:** 3 места
- `app/dashboard/legacy-letters/page.tsx` (строка 160)
- `app/dashboard/video-message/page.tsx` (строка 163)
- `app/contact/page.tsx` (строка 233)

#### ❌ Legacy Letters Page (`app/dashboard/legacy-letters/page.tsx`)
**Действие:** Удалить или скрыть полностью  
**Причина:** Legacy letters — это Premium функция  
**Найдено:** Ссылка на Premium page внутри

#### ❌ Video Message Page (`app/dashboard/video-message/page.tsx`)
**Действие:** Удалить или скрыть полностью  
**Причина:** Video messages — это Premium функция  
**Найдено:** Ссылка на Premium page внутри

#### ❌ Executor Dashboard (`app/dashboard/executor/page.tsx`)
**Действие:** Удалить или скрыть полностью  
**Причина:** Executor dashboard — это Premium функция, не нужна для бесплатного продукта

#### ❌ Payment Processing
**Действие:** Удалить все упоминания платежей  
**Причина:** Бесплатный продукт не требует платежей  
**Где искать:**
- Stripe integration (если есть)
- Payment forms
- Checkout pages
- Billing pages

#### ❌ Video Recording Features
**Действие:** Удалить все упоминания видео  
**Причина:** Видео — это Premium функция (месяц 7-9)  
**Где искать:**
- Video upload components
- Video recording UI
- Video message pages
- Упоминания "video messages" в тексте

#### ❌ Advanced Collaboration Features
**Действие:** Удалить или скрыть  
**Причина:** Multi-user editing — это Premium функция  
**Где искать:**
- Multi-user editing UI
- Comment threads (если не базовая версия)
- Advanced permission controls

#### ❌ Legacy Letters Auto-Delivery
**Действие:** Удалить или скрыть  
**Причина:** Это Premium функция  
**Где искать:**
- Legacy letters pages
- Auto-delivery settings
- Scheduled email features

#### ❌ Professional Interview Service
**Действие:** Удалить  
**Причина:** Это Premium функция, требует support team  
**Где искать:**
- Professional interview booking
- Interview service pages

### 3.2 Навигация и ссылки

#### ❌ Ссылки на Premium страницы
**Действие:** Удалить из навигации  
**Где искать:**
- Dashboard sidebar ("Premium" ссылка)
- Header navigation
- Footer links
- CTA buttons ("Upgrade to Premium")

#### ❌ "Upgrade" кнопки и CTAs
**Действие:** Удалить или заменить  
**Где искать:**
- Dashboard cards ("Upgrade to Premium")
- Email templates (upgrade offers)
- Onboarding completion page

### 3.3 Текст и копирайтинг

#### ❌ Упоминания Premium функций в описаниях
**Действие:** Удалить или переписать  
**Где искать:**
- Landing page descriptions
- Help/FAQ pages
- Email templates
- Dashboard descriptions

**Примеры для удаления:**
- "Upgrade to Premium for video messages"
- "Premium features include..."
- "Get more with Premium"
- "Unlock Premium features"

### 3.4 Функциональность

#### ❌ PDF Download с ограничениями
**Действие:** Убрать ограничения (watermarks, etc.)  
**Причина:** PDF Export должен быть полностью бесплатным  
**Где искать:**
- PDF generation code
- Watermark logic
- Download restrictions

#### ❌ Ограничения на sharing
**Действие:** Убрать ограничения на количество family members  
**Причина:** Согласно стратегии, бесплатный продукт должен позволять sharing  
**Где искать:**
- Sharing limits
- Family member limits
- Access restrictions

---

## 4. СПИСОК ПРОВЕРКИ (CHECKLIST)

### 4.1 Лендинг (`app/page.tsx`)
- [ ] Нет упоминаний Premium функций
- [ ] Нет упоминаний видео
- [ ] Нет ссылок на Premium страницы
- [ ] Время указано правильно (35-40 минут)
- [ ] Количество вопросов указано правильно (32 вопроса)
- [ ] Акцент на "completely free"
- [ ] FAQ обновлены для бесплатного продукта

### 4.2 Dashboard (`app/dashboard/page.tsx`)
- [x] Нет карточки "Upgrade to Premium" ✅ (проверено)
- [x] Нет ссылок на Premium страницы ✅ (проверено)
- [ ] Все функции доступны бесплатно
- [ ] Нет упоминаний ограничений
- [ ] Sidebar навигация не содержит Premium ссылок ✅ (проверено)

### 4.3 Навигация
- [ ] Sidebar не содержит "Premium" ссылку (или она скрыта)
- [ ] Header не содержит Premium ссылок
- [ ] Footer не содержит Premium ссылок

### 4.4 Страницы
- [ ] Premium page (`app/dashboard/premium/page.tsx`) скрыта или удалена
- [ ] Legacy letters page (`app/dashboard/legacy-letters/page.tsx`) удалена или скрыта
- [ ] Video message page (`app/dashboard/video-message/page.tsx`) удалена или скрыта
- [ ] Executor dashboard (`app/dashboard/executor/page.tsx`) удалена или скрыта
- [ ] Payment pages удалены (если есть)
- [ ] Удалены ссылки на Premium из:
  - [ ] `app/dashboard/legacy-letters/page.tsx` (строка 160)
  - [ ] `app/dashboard/video-message/page.tsx` (строка 163)
  - [ ] `app/contact/page.tsx` (строка 233)

### 4.5 Функциональность
- [ ] PDF Export работает без ограничений
- [ ] Sharing работает без ограничений
- [ ] Email sharing работает
- [ ] Shareable links работают (30-day expiration)
- [ ] Нет payment processing кода

### 4.6 Email Templates
- [ ] Welcome email не упоминает Premium
- [ ] Reminder emails не упоминают Premium
- [ ] Нет upgrade offer emails (до месяца 7-9)

---

## 5. ПРИОРИТЕТЫ ИЗМЕНЕНИЙ

### Высокий приоритет (сделать сразу)
1. ✅ Удалить/скрыть Premium page
2. ✅ Удалить ссылки на Premium из навигации
3. ✅ Убрать "Upgrade" кнопки из dashboard
4. ✅ Обновить время на лендинге (35-40 минут)
5. ✅ Обновить количество вопросов (32 вопроса)

### Средний приоритет (сделать в течение недели)
1. Проверить и удалить все упоминания Premium функций из текста
2. Обновить FAQ с вопросом "Will this always be free?"
3. Убедиться, что PDF Export не имеет ограничений
4. Убедиться, что sharing не имеет ограничений

### Низкий приоритет (можно отложить)
1. Удалить неиспользуемый код для Premium функций
2. Очистить комментарии в коде
3. Обновить документацию

---

## 6. ЧТО ОСТАВИТЬ (важно!)

### ✅ Оставить эти функции (они бесплатные)
- Guided Interview (32 вопроса)
- PDF Export (без ограничений)
- Email Sharing
- Shareable Links (30-day expiration)
- Basic email automation
- FAQ + Help pages
- Email support

### ✅ Оставить эти страницы
- Landing page (`app/page.tsx`)
- Dashboard (`app/dashboard/page.tsx`)
- Onboarding (`app/onboarding/page.tsx`)
- View Story (`app/dashboard/preferences/page.tsx`)
- Sharing (`app/dashboard/sharing/page.tsx`)
- Family Members (`app/dashboard/family/page.tsx`)
- Help/FAQ (`app/help/page.tsx`)
- Contact (`app/contact/page.tsx`)
- Privacy (`app/privacy/page.tsx`)
- Terms (`app/terms/page.tsx`)

---

## 7. КОНТРОЛЬНЫЙ СПИСОК ДЛЯ РЕАЛИЗАЦИИ

### Шаг 1: Анализ текущего состояния
- [x] Изучить стратегию Memory-Keeper-Strategy-2025.md
- [x] Проанализировать текущий лендинг
- [x] Найти все упоминания Premium функций
- [x] Составить список изменений

### Шаг 2: Изменения на лендинге
- [ ] Обновить время в Hero Section (`app/page.tsx`, строка 76): "Takes 15 minutes" → "Takes 35-40 minutes"
- [ ] Обновить количество вопросов в Solution Section (`app/page.tsx`, строка 158): "30+ easy questions" → "32 guided questions"
- [ ] Добавить FAQ вопрос "Will this always be free?" в FAQ Section
- [ ] Проверить отсутствие упоминаний Premium ✅ (проверено)

### Шаг 3: Удаление Premium функций
- [ ] Скрыть/удалить Premium page (`app/dashboard/premium/page.tsx`)
- [ ] Удалить Legacy letters page (`app/dashboard/legacy-letters/page.tsx`)
- [ ] Удалить Video message page (`app/dashboard/video-message/page.tsx`)
- [ ] Удалить Executor dashboard (`app/dashboard/executor/page.tsx`)
- [ ] Удалить ссылки на Premium из:
  - [ ] `app/dashboard/legacy-letters/page.tsx` (строка 160)
  - [ ] `app/dashboard/video-message/page.tsx` (строка 163)
  - [ ] `app/contact/page.tsx` (строка 233)
- [ ] Убрать "Upgrade" кнопки (если есть)
- [ ] Удалить упоминания Premium из текста

### Шаг 4: Проверка функциональности
- [ ] Убедиться, что PDF Export работает без ограничений
- [ ] Убедиться, что sharing работает без ограничений
- [ ] Проверить, что нет payment processing кода

### Шаг 5: Финальная проверка
- [ ] Пройти весь user flow
- [ ] Проверить все страницы на отсутствие Premium упоминаний
- [ ] Проверить все ссылки
- [ ] Убедиться, что продукт полностью бесплатный

---

**Готово к реализации!** ✅

