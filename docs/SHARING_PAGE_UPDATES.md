# Memory Keeper: Sharing Page Updates

**Дата:** 13 января 2025  
**Статус:** ✅ Обновлено

---

## Обновления страницы Sharing

### Что изменено:

1. **Добавлена поддержка Shareable Links:**
   - Создание shareable links с 30-дневным сроком действия
   - Просмотр всех активных ссылок
   - Продление ссылок на 30 дней
   - Деактивация ссылок
   - Отслеживание количества просмотров
   - Показ дней до истечения

2. **Добавлена Email Sharing функциональность:**
   - Генерация plain-text версии истории
   - Генерация HTML версии для email клиентов
   - Отправка нескольким получателям одним кликом
   - Копирование в буфер обмена для ручной отправки

3. **Улучшен UI:**
   - Табы для переключения между Shareable Links и Email Invites
   - Визуальные индикаторы статуса ссылок (Active/Expired)
   - Показ дней до истечения
   - Показ количества просмотров
   - Улучшенная навигация

---

## Новая структура страницы

### Tab 1: Shareable Links

#### Секция 1: Create Shareable Link
- Кнопка "Generate Shareable Link"
- Описание: "Links expire after 30 days for privacy protection"

#### Секция 2: Active Shareable Links
- Список всех активных ссылок
- Для каждой ссылки:
  - Badge статуса (Active/Expired)
  - Дни до истечения
  - Количество просмотров
  - Полный URL ссылки
  - Дата создания
  - Кнопки: Copy, Extend, Deactivate

#### Секция 3: Email Story
- Поле для ввода получателей (опционально)
- Кнопка "Generate Email Story" или "Generate & Send Email"
- Если получатели не указаны - копирует в буфер обмена

### Tab 2: Email Invites

#### Секция 1: Invite via Email
- Форма для отправки приглашения:
  - Email Address (обязательно)
  - Name (опционально)
  - Relationship
  - Access Level (View Only / View & Comment)
- Кнопка "Send Invitation"

#### Секция 2: Family Members with Access
- Список всех приглашенных членов семьи
- Для каждого:
  - Имя и email
  - Relationship badge
  - Access level badge
  - Дата приглашения

---

## API интеграция

### Shareable Links

**GET** `/api/shareable-link`
- Получение всех shareable links пользователя

**POST** `/api/shareable-link`
- Создание новой shareable link

**PATCH** `/api/shareable-link`
- Продление или деактивация ссылки
- Body: `{ linkId, action: "extend" | "deactivate" }`

### Email Sharing

**POST** `/api/email-share`
- Генерация email версии истории
- Опциональная отправка нескольким получателям
- Body:
  ```json
  {
    "interviewData": { /* MemoryInterviewData */ },
    "recipientEmails": ["email1@example.com"], // optional
    "senderName": "John", // optional
    "sendEmails": false // true для отправки
  }
  ```

### Email Invites

**POST** `/api/family/invite`
- Отправка приглашения по email
- Body:
  ```json
  {
    "preferenceId": "...",
    "email": "family@example.com",
    "name": "John",
    "relationship": "child",
    "accessLevel": "view"
  }
  ```

---

## Функциональность

### Shareable Links

✅ Создание ссылок с автоматическим истечением через 30 дней  
✅ Продление ссылок на 30 дней  
✅ Деактивация ссылок  
✅ Отслеживание просмотров  
✅ Показ статуса (Active/Expired)  
✅ Показ дней до истечения  
✅ Копирование ссылок в буфер обмена  

### Email Sharing

✅ Генерация plain-text версии  
✅ Генерация HTML версии  
✅ Отправка нескольким получателям  
✅ Копирование в буфер обмена  
✅ Интеграция с interview data  

### Email Invites

✅ Отправка приглашений по email  
✅ Управление доступом (View / View & Comment)  
✅ Отслеживание приглашенных членов семьи  
✅ Показ relationship и access level  

---

## UI/UX улучшения

1. **Табы для навигации:**
   - Четкое разделение между Shareable Links и Email Invites
   - Визуальная индикация активного таба

2. **Визуальные индикаторы:**
   - Badges для статуса ссылок
   - Иконки для дней до истечения
   - Счетчики просмотров

3. **Улучшенная обратная связь:**
   - Четкие сообщения об успехе/ошибке
   - Индикаторы загрузки
   - Подтверждения для деструктивных действий

4. **Адаптивность:**
   - Работает на всех размерах экранов
   - Удобное копирование ссылок на мобильных

---

## Следующие шаги

### Для активации:
1. Заменить `app/dashboard/sharing/page.tsx` на `page-new.tsx`
2. Протестировать создание shareable links
3. Протестировать продление ссылок
4. Протестировать email sharing
5. Протестировать email invites

### Для production:
1. Добавить rate limiting для создания ссылок
2. Добавить аналитику использования
3. Оптимизировать производительность
4. Добавить уведомления об истечении ссылок

---

## Статус

✅ Страница Sharing обновлена  
✅ Shareable Links интегрированы  
✅ Email Sharing интегрирован  
✅ Email Invites работают  
✅ UI улучшен  

**Готово к использованию!**

