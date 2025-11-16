# План Реализации: DearAfter Registry → Memory Keeper Adaptation

**Версия:** 1.0  
**Дата:** Декабрь 2024  
**Статус:** План реализации

---

## ОБЗОР ПРОЕКТА

### Цель
Адаптировать текущий продукт DearAfter Registry для целевой аудитории семей с деменцией, изменив:
- Тональность и копирайтинг
- Структуру онбординга
- Фокус с "funeral wishes" на "memories preservation"
- Удаление pricing и PDF download
- Британская чувствительность и эмпатия

### Ключевые изменения
- **Терминология:** "Wishes" → "Memories", "Funeral" → "When the time comes"
- **Фокус:** Funeral planning → Personality capture
- **Монетизация:** Pricing visible → FREE only
- **Output:** PDF download → Online-only platform
- **Аудитория:** Broad (45-75) → Dementia families (55-80)

---

## ЭТАП 1: ЛЕНДИНГ ПЕРЕДЕЛКА (Приоритет: ВЫСОКИЙ)

### 1.1. Header/Navbar
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Изменить логотип/название на "Memory Keeper" (или добавить подтекст "for dementia families")
- [ ] Обновить меню навигации:
  - Удалить "Pricing"
  - Оставить: "How it works", "Stories" (вместо "Testimonials"), "Help", "FAQ"
- [ ] Изменить CTA кнопку: "Sign Up Free" → "Start Remembering"
- [ ] Обновить стили для более мягкого, эмпатичного вида

**Оценка:** 2-3 часа

### 1.2. Hero Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Заменить headline: "Make sure your wishes are known" → "Save what matters before memories fade"
- [ ] Заменить subheadline на dementia-specific версию
- [ ] Изменить CTA: "Create Your Wishes Now" → "Start Remembering"
- [ ] Обновить secondary text: "Five minutes..." → "Completely free. Takes 15 minutes. Your family will treasure this."
- [ ] Обновить trust indicators:
  - "Trusted by 1,000+ families" → "Trusted by 200+ dementia families"
  - Добавить: "Recommended by Alzheimer's Society members"
- [ ] Обновить визуал (если есть изображение) - теплая семейная сцена, НЕ похоронная

**Оценка:** 3-4 часа

### 1.3. Problem Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Переписать все 3 карточки с dementia focus:
  - Карточка 1: "Dementia changes everything" / "Their memories are slipping away"
  - Карточка 2: "Your family needs to hear their voice" / "Not just facts. Their *why*."
  - Карточка 3: "There's a window, and it's closing" / "The time to capture this is now"
- [ ] Обновить иконки (Brain, Heart+Voice, Hourglass)
- [ ] Применить британскую тональность (understated, compassionate)

**Оценка:** 4-5 часов

### 1.4. Solution Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Переписать 3 шага:
  - Шаг 1: "Help them tell their story" / "In their own words"
  - Шаг 2: "Your family sees them clearly" / "Understanding, not just information"
  - Шаг 3: "Their voice stays forever" / "Permanently preserved"
- [ ] Обновить описания с акцентом на online-only (без упоминания PDF)
- [ ] Изменить CTA: "Create Your Registry Now" → "Help Them Remember Now"
- [ ] Обновить иконки

**Оценка:** 4-5 часов

### 1.5. Testimonials Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Заменить все 3 отзыва на dementia-specific истории:
  - Отзыв 1: Wife documenting husband's dementia (Anne, 62 | Liverpool)
  - Отзыв 2: Adult child capturing aging parent (James, 45 | Manchester)
  - Отзыв 3: Dementia care worker perspective (Dr. Sarah Chen, London)
- [ ] Обновить заголовок: "Families love DearAfter" → "Dementia families trust Memory Keeper"

**Оценка:** 2-3 часа

### 1.6. FAQ Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Полностью переписать все FAQ вопросы для dementia context:
  - Q1: "Is this a medical thing? Will it help with dementia?"
  - Q2: "My parent is in advanced dementia. Is it too late?"
  - Q3: "How long does this take? I'm exhausted."
  - Q4: "Will my family actually use this, or will it just sit there?"
  - Q5: "Is my data really private?"
  - Q6: "What happens if they pass away while we're using it?"
- [ ] Применить британскую тональность (честные, но сочувственные ответы)

**Оценка:** 5-6 часов

### 1.7. Удаление Pricing Section
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Удалить всю секцию Pricing (4 ценовых плана)
- [ ] Заменить на простой блок:
  - "This is always free. Always will be."
  - CheckCircle badge
  - Одна CTA: "Start Remembering"
- [ ] Обновить стили для нового блока

**Оценка:** 1-2 часа

### 1.8. Footer
**Файл:** `app/page.tsx`

**Задачи:**
- [ ] Обновить описание: "Memory Keeper helps dementia families preserve what matters before memories fade. Free, private, forever."
- [ ] Обновить social links messaging (dementia awareness focus)
- [ ] Обновить newsletter: "Get tips for dementia conversations and memory preservation"

**Оценка:** 1-2 часа

**ИТОГО ЭТАП 1:** 22-30 часов

---

## ЭТАП 2: ОНБОРДИНГ ПЕРЕДЕЛКА (Приоритет: ВЫСОКИЙ)

### 2.1. Структура шагов
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Изменить количество шагов: 6 → 7
- [ ] Переписать все шаги:
  - Step 1: "Let's start at the beginning" / "Who are you? (In your own words)"
  - Step 2: "Your proudest moments" / "Tell us about times you're proud of"
  - Step 3: "What makes you laugh?" / "The lighter side"
  - Step 4: "What matters most?" / "Your values and what you care about"
  - Step 5: "For the people who love you" / "Messages for your family"
  - Step 6: "Your wishes when the time comes" / "When it's time, here's what matters to me"
  - Step 7: "Review & Celebrate" / "Your story, captured"
- [ ] Обновить progress indicator для 7 шагов

**Оценка:** 8-10 часов

### 2.2. Step 1: Beginning
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Удалить вопрос "Funeral Type"
- [ ] Добавить вопросы:
  - "What's your name? And how do you like to be called?"
  - "Where were you born?"
  - "What do you remember about your childhood?"
  - "Who are the people you love most?"
- [ ] Обновить UI для текстовых полей (не radio buttons)
- [ ] Применить теплый, welcoming tone

**Оценка:** 3-4 часа

### 2.3. Step 2: Proudest Moments
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Удалить вопрос "Budget"
- [ ] Добавить вопросы:
  - "What have you achieved in your life?"
  - "A time you overcame something difficult?"
  - "What would you want your family to know about your strength?"
  - "A time you made someone else proud?"
- [ ] Обновить UI (textarea для развернутых ответов)

**Оценка:** 3-4 часа

### 2.4. Step 3: Humor
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Создать новый шаг с вопросами:
  - "Tell me something funny about yourself"
  - "A memory that always makes you smile"
  - "What's your sense of humor?"
  - "A joke or funny thing people say about you?"
- [ ] Применить легкий, позитивный tone

**Оценка:** 3-4 часа

### 2.5. Step 4: Values
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Адаптировать существующие вопросы о values:
  - "What values matter most to you?"
  - "How do you want to be remembered?"
  - "What brings you peace?"
  - "What would you regret NOT telling your family?"
- [ ] Убрать funeral-specific вопросы

**Оценка:** 3-4 часа

### 2.6. Step 5: Messages for Family
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Создать новый шаг с вопросами:
  - "To your children: what do you want them to know?"
  - "To your spouse/partner: what has this meant?"
  - "To your grandchildren: a lesson or memory?"
  - "Anything else?"
- [ ] Сделать все поля optional
- [ ] Применить loving, personal tone

**Оценка:** 3-4 часа

### 2.7. Step 6: Funeral Wishes (Simplified)
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Упростить funeral questions:
  - "Type of service: ceremony or quiet goodbye?"
  - "Music or readings you love"
  - "People you want there"
  - "Anything else about the day itself?"
- [ ] Убрать budget questions
- [ ] Убрать executor questions (переместить в отдельный раздел или убрать)
- [ ] Применить мягкий tone: "When it's time" вместо "When I die"

**Оценка:** 4-5 часов

### 2.8. Step 7: Review & Celebrate
**Файл:** `app/onboarding/page.tsx`

**Задачи:**
- [ ] Изменить заголовок: "Review Your Preferences" → "Your story, captured"
- [ ] Изменить подзаголовок: "Nothing here is set in stone. Change your mind anytime. Update your wishes whenever you want."
- [ ] Изменить CTA: "Save My Wishes" → "Save My Memories"
- [ ] Обновить completion message (в `app/onboarding/complete/page.tsx`)

**Оценка:** 2-3 часа

### 2.9. Обновление данных
**Файл:** `lib/supabase.ts` или соответствующий файл типов

**Задачи:**
- [ ] Обновить типы данных для новых полей онбординга
- [ ] Добавить поля для memories (childhood, proudest moments, humor, values, messages)
- [ ] Сохранить совместимость с существующими данными (migration)

**Оценка:** 4-6 часов

**ИТОГО ЭТАП 2:** 33-42 часа

---

## ЭТАП 3: ДАШБОРД АДАПТАЦИЯ (Приоритет: СРЕДНИЙ)

### 3.1. Welcome Banner
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Изменить заголовок: "Welcome. You've got this covered now." → "Welcome. Their story is safe."
- [ ] Обновить подтекст: "You've captured something precious. Your loved one's voice. Their values. Who they are. This will mean everything to your family."
- [ ] Обновить действия:
  - Удалить: "Download PDF"
  - Оставить: "Share with Family"
  - Добавить: "Add More Stories", "Invite Others to Remember"

**Оценка:** 2-3 часа

### 3.2. Status Card
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Изменить заголовок: "Your Wishes Are Saved" → "Their Story Lives Here"
- [ ] Обновить информацию:
  - "Last updated" → "Memories captured: [X stories documented]"
  - Добавить: "Last updated: [date] + (remembering: [topic])"
  - "Shared with" → "[X family members] + (they can read, comment, add their own)"
  - "Status" → "Their voice is preserved. Your family has access."
- [ ] Изменить CTA: "Edit Preferences" → "Add More Memories" + "Share with Someone Else"

**Оценка:** 3-4 часа

### 3.3. Primary Actions Cards
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Переписать Карточку 1:
  - Заголовок: "Share It With Family"
  - Иконка: Users + Heart
  - Описание: "Let the people who love them read their stories. They can comment, add their own memories, feel connected."
  - CTA: "Share Now"
- [ ] Переписать Карточку 2:
  - Заголовок: "Add More Memories"
  - Иконка: BookOpen + Plus
  - Описание: "Remember something new? Want to capture more stories? Come back anytime. Their story grows with you."
  - CTA: "Add Memory"
- [ ] Переписать Карточку 3:
  - Заголовок: "Print a Copy" (или скрыть, если Premium не готов)
  - Иконка: Printer
  - Описание: "Love their story in print? Create a beautiful keepsake version to share or keep close."
  - CTA: "Create Keepsake" (или скрыть)
  - Подтекст: "Coming soon as Premium option"

**Оценка:** 4-5 часов

### 3.4. Premium Upgrade Card
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Скрыть или удалить Premium Upgrade Card
- [ ] Если оставляем для будущего:
  - Изменить messaging: "Help us keep this free for families"
  - Убрать агрессивный upsell
  - Position как: "Support dementia families worldwide"

**Оценка:** 1 час

### 3.5. Quick View Section
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Изменить заголовок: "Your Preferences at a Glance" → "Their Beautiful Story"
- [ ] Обновить отображаемую информацию:
  - Удалить: Funeral Type, Budget, Executor, Key Wish
  - Добавить: Number of memories captured, Latest memory captured, Who has access, Highlights (meaningful quote)
- [ ] Изменить CTA: "View Full Details" → "View Full Story"

**Оценка:** 3-4 часа

### 3.6. Activity Log
**Файл:** `app/dashboard/page.tsx`

**Задачи:**
- [ ] Обновить типы действий для memories context
- [ ] Обновить сообщения действий (memories вместо preferences)
- [ ] Обновить empty state: "Your log is empty..." → "Their story is just beginning..."

**Оценка:** 2-3 часа

**ИТОГО ЭТАП 3:** 15-20 часов

---

## ЭТАП 4: СТРАНИЦЫ ДАШБОРДА (Приоритет: СРЕДНИЙ)

### 4.1. View Preferences → View Memories
**Файл:** `app/dashboard/preferences/page.tsx`

**Задачи:**
- [ ] Переименовать страницу (или создать новую): "View Preferences" → "View Memories" / "Their Story"
- [ ] Переписать все секции для memories context:
  - "What kind of send-off" → "Their Beginning" (childhood, name, etc.)
  - "Who will lead the way" → убрать или адаптировать
  - "Ceremony" → "When the time comes" (simplified)
  - Добавить секции: Proudest Moments, Humor, Values, Messages for Family
- [ ] Обновить заголовки и описания
- [ ] Убрать кнопку "Download PDF" (или заменить на "Print Keepsake" с пометкой "Coming soon")

**Оценка:** 6-8 часов

### 4.2. Family Members Page
**Файл:** `app/dashboard/family/page.tsx`

**Задачи:**
- [ ] Обновить заголовок: "Family Members" → "Who Can See Their Story"
- [ ] Обновить messaging: "Who Has Access?" → "Who can read and remember with you?"
- [ ] Обновить форму добавления: "Add Family Member" → "Invite Someone to Remember"
- [ ] Обновить описания access levels для memories context
- [ ] Обновить empty state messaging

**Оценка:** 3-4 часа

### 4.3. Sharing & Permissions
**Файл:** `app/dashboard/sharing/page.tsx`

**Задачи:**
- [ ] Обновить заголовок: "Sharing & Permissions" → "Share Their Story"
- [ ] Обновить messaging: "Share via Email" → "Invite family to read their memories"
- [ ] Обновить описания для memories context
- [ ] Обновить success messages

**Оценка:** 2-3 часа

### 4.4. Onboarding Complete Page
**Файл:** `app/onboarding/complete/page.tsx`

**Задачи:**
- [ ] Изменить заголовок: "Your wishes are saved" → "Their story is saved"
- [ ] Обновить подзаголовок: "Well done. You've taken an important step." → "You've captured something precious."
- [ ] Обновить карточки действий:
  - Убрать "Download PDF"
  - Обновить "Share with Family" messaging
  - Обновить "Change your mind" → "Add More Memories"
- [ ] Обновить Premium card messaging (если оставляем)

**Оценка:** 3-4 часа

**ИТОГО ЭТАП 4:** 14-19 часов

---

## ЭТАП 5: УДАЛЕНИЯ И УПРОЩЕНИЯ (Приоритет: НИЗКИЙ)

### 5.1. Удаление страниц
**Задачи:**
- [ ] Скрыть или удалить `/dashboard/premium` (или адаптировать для будущего)
- [ ] Скрыть `/dashboard/video-message` (для MVP)
- [ ] Скрыть `/dashboard/legacy-letters` (для MVP)
- [ ] Скрыть `/dashboard/executor` (слишком funeral-focused)
- [ ] Обновить sidebar navigation (убрать ссылки на скрытые страницы)

**Оценка:** 2-3 часа

### 5.2. Удаление PDF функциональности
**Задачи:**
- [ ] Удалить все кнопки "Download PDF" из UI
- [ ] Скрыть или удалить функцию `generatePDF` из dashboard
- [ ] Обновить все упоминания PDF в копирайтинге
- [ ] Оставить код для будущего использования (закомментировать)

**Оценка:** 3-4 часа

### 5.3. Обновление Navigation
**Файл:** `app/dashboard/page.tsx` (sidebar)

**Задачи:**
- [ ] Обновить названия пунктов меню:
  - "My Registry" → "Their Story"
  - "View Preferences" → "View Memories"
  - "Family Members" → "Who Can See"
  - "Sharing & Permissions" → "Share Story"
- [ ] Убрать ссылки на скрытые страницы
- [ ] Обновить иконки где необходимо

**Оценка:** 2-3 часа

**ИТОГО ЭТАП 5:** 7-10 часов

---

## ЭТАП 6: КОПИРАЙТИНГ И ТОНАЛЬНОСТЬ (Приоритет: ВЫСОКИЙ)

### 6.1. Глобальная замена терминологии
**Файлы:** Все файлы с копирайтингом

**Задачи:**
- [ ] Заменить "wishes" → "memories" (где уместно)
- [ ] Заменить "funeral" → "when the time comes" / "journey"
- [ ] Заменить "preferences" → "story" / "memories"
- [ ] Заменить "executor" → "family" (где уместно)
- [ ] Заменить "your" → "their" (где речь о человеке с деменцией)
- [ ] Обновить все CTA кнопки

**Оценка:** 8-10 часов

### 6.2. Британская тональность
**Файлы:** Все файлы с копирайтингом

**Задачи:**
- [ ] Убрать восклицательные знаки (!)
- [ ] Заменить "Amazing!" → "This matters"
- [ ] Заменить "You've got this!" → "We understand how you're feeling"
- [ ] Применить understated emotion
- [ ] Добавить "quite straightforward", "you might find this helpful"
- [ ] Убрать агрессивные CTAs ("NOW!", "Don't wait!")
- [ ] Добавить уважение к уязвимости

**Оценка:** 6-8 часов

### 6.3. Эмпатия и чувствительность
**Файлы:** Все файлы с копирайтингом

**Задачи:**
- [ ] Убрать guilt-tripping language
- [ ] Заменить "before it's too late" → "while you can"
- [ ] Добавить упоминания NHS GP и Alzheimer's Society
- [ ] Убрать pathologizing dementia language
- [ ] Добавить class-neutral language
- [ ] Подчеркнуть privacy как sacred value

**Оценка:** 4-6 часов

**ИТОГО ЭТАП 6:** 18-24 часа

---

## ЭТАП 7: ТЕХНИЧЕСКИЕ ИЗМЕНЕНИЯ (Приоритет: СРЕДНИЙ)

### 7.1. Обновление типов данных
**Файлы:** `lib/supabase.ts`, типы TypeScript

**Задачи:**
- [ ] Добавить новые поля для memories:
  - childhood_memories
  - proudest_moments
  - humor_stories
  - values_and_beliefs
  - messages_for_family
- [ ] Сохранить обратную совместимость
- [ ] Создать migration script (если нужно)

**Оценка:** 4-6 часов

### 7.2. Обновление API endpoints
**Файлы:** `app/api/**/*.ts`

**Задачи:**
- [ ] Обновить `/api/preferences` для работы с новыми полями
- [ ] Обновить сообщения в responses
- [ ] Обновить валидацию

**Оценка:** 3-4 часа

### 7.3. Обновление email templates
**Файл:** `lib/email.ts`

**Задачи:**
- [ ] Обновить subject lines для memories context
- [ ] Обновить body тексты для dementia families
- [ ] Применить британскую тональность
- [ ] Убрать упоминания PDF

**Оценка:** 3-4 часа

### 7.4. Обновление Help/FAQ страницы
**Файл:** `app/help/page.tsx`

**Задачи:**
- [ ] Обновить все FAQ для dementia context
- [ ] Добавить новые вопросы из документа
- [ ] Обновить поиск placeholder

**Оценка:** 4-5 часов

**ИТОГО ЭТАП 7:** 14-19 часов

---

## ЭТАП 8: ТЕСТИРОВАНИЕ И ПОЛИРОВКА (Приоритет: ВЫСОКИЙ)

### 8.1. Функциональное тестирование
**Задачи:**
- [ ] Протестировать весь flow онбординга (7 шагов)
- [ ] Протестировать создание memories
- [ ] Протестировать sharing с family
- [ ] Протестировать viewing memories
- [ ] Протестировать все CTA кнопки
- [ ] Проверить отсутствие PDF download кнопок

**Оценка:** 6-8 часов

### 8.2. Копирайтинг review
**Задачи:**
- [ ] Проверить все тексты на британскую тональность
- [ ] Проверить отсутствие агрессивных CTAs
- [ ] Проверить эмпатию и чувствительность
- [ ] Проверить правильность терминологии
- [ ] Проверить упоминания NHS/Alzheimer's Society

**Оценка:** 4-6 часов

### 8.3. UX/UI проверка
**Задачи:**
- [ ] Проверить визуальную теплоту (не похоронная тематика)
- [ ] Проверить accessibility
- [ ] Проверить responsive design
- [ ] Проверить loading states
- [ ] Проверить error messages

**Оценка:** 4-6 часов

### 8.4. Performance проверка
**Задачи:**
- [ ] Проверить скорость загрузки страниц
- [ ] Проверить оптимизацию изображений
- [ ] Проверить bundle size

**Оценка:** 2-3 часа

**ИТОГО ЭТАП 8:** 16-23 часа

---

## ОБЩАЯ ОЦЕНКА ВРЕМЕНИ

| Этап | Оценка времени | Приоритет |
|------|----------------|-----------|
| Этап 1: Лендинг | 22-30 часов | ВЫСОКИЙ |
| Этап 2: Онбординг | 33-42 часа | ВЫСОКИЙ |
| Этап 3: Дашборд | 15-20 часов | СРЕДНИЙ |
| Этап 4: Страницы дашборда | 14-19 часов | СРЕДНИЙ |
| Этап 5: Удаления | 7-10 часов | НИЗКИЙ |
| Этап 6: Копирайтинг | 18-24 часа | ВЫСОКИЙ |
| Этап 7: Технические | 14-19 часов | СРЕДНИЙ |
| Этап 8: Тестирование | 16-23 часа | ВЫСОКИЙ |
| **ИТОГО** | **139-187 часов** | |

**Примерно:** 3.5-4.5 недели работы (при 40 часах в неделю)

---

## ПРИОРИТИЗАЦИЯ РЕАЛИЗАЦИИ

### MVP (Минимально жизнеспособный продукт)
**Время:** ~80-100 часов

1. **Этап 1: Лендинг** (22-30 часов) - КРИТИЧНО
2. **Этап 2: Онбординг** (33-42 часов) - КРИТИЧНО
3. **Этап 6: Копирайтинг** (18-24 часа) - КРИТИЧНО
4. **Этап 3: Дашборд** (15-20 часов) - ВАЖНО
5. **Этап 8: Тестирование** (16-23 часа) - ВАЖНО

### Phase 2 (Дополнительные улучшения)
**Время:** ~60-90 часов

1. **Этап 4: Страницы дашборда** (14-19 часов)
2. **Этап 7: Технические** (14-19 часов)
3. **Этап 5: Удаления** (7-10 часов)
4. Дополнительное тестирование и полировка

---

## РИСКИ И ЗАВИСИМОСТИ

### Риски:
1. **Изменение структуры данных** - может потребовать migration существующих данных
2. **Обратная совместимость** - нужно сохранить работу для существующих пользователей
3. **Копирайтинг** - требует глубокого понимания британской культуры и dementia context
4. **Время** - оценка может быть занижена из-за сложности изменений

### Зависимости:
1. Дизайн-система должна поддерживать новые компоненты
2. Backend API должен поддерживать новые поля
3. Email сервис должен быть готов к новым шаблонам
4. Тестирование требует понимания dementia context

---

## РЕКОМЕНДАЦИИ ПО РЕАЛИЗАЦИИ

### Подход:
1. **Итеративный:** Начать с MVP, затем добавлять улучшения
2. **Feature flags:** Использовать feature flags для постепенного rollout
3. **A/B тестирование:** Протестировать новую версию на небольшой группе пользователей
4. **Feedback loop:** Собрать feedback от dementia families перед полным rollout

### Порядок выполнения:
1. Неделя 1: Лендинг + базовая копирайтинг замена
2. Неделя 2: Онбординг переделка
3. Неделя 3: Дашборд адаптация + тестирование
4. Неделя 4: Полировка + дополнительные страницы

---

## МЕТРИКИ УСПЕХА

### Ключевые метрики:
1. **Конверсия:** % пользователей, завершивших онбординг
2. **Engagement:** Количество memories, добавленных на пользователя
3. **Sharing:** % пользователей, поделившихся с family
4. **Retention:** Возвращаемость пользователей
5. **Feedback:** Оценка от dementia families

### Целевые показатели:
- Конверсия онбординга: >60%
- Среднее количество memories: >5 на пользователя
- Sharing rate: >40%
- Retention (30 дней): >30%

---

**Конец плана реализации**

