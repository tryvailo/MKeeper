# Memory Keeper: Email Sharing & Shareable Links

**Дата:** 13 января 2025  
**Статус:** ✅ Реализовано

---

## Обзор

Реализованы две ключевые функции для бесплатного продукта:
1. **Email Sharing** - генерация plain-text и HTML версий истории для отправки по email
2. **Shareable Links** - создание публичных ссылок с 30-дневным сроком действия

---

## Email Sharing

### Функциональность

**Файл:** `lib/email-sharing.ts`

**Функции:**
- `generateEmailStory()` - генерация plain-text версии
- `generateEmailStoryHTML()` - генерация HTML версии для email клиентов
- `generateFamilyEmail()` - генерация email для отправки нескольким получателям

**Особенности:**
- Красивое форматирование для email клиентов
- Clickable sections
- Статистика (вопросы, слова, категории)
- Поддержка всех 5 категорий вопросов
- Plain-text fallback для старых email клиентов

### API Endpoint

**POST** `/api/email-share`

**Request:**
```json
{
  "interviewData": { /* MemoryInterviewData */ },
  "recipientEmails": ["email1@example.com", "email2@example.com"], // optional
  "senderName": "John", // optional, если отправляем
  "sendEmails": false // true для отправки, false для генерации только
}
```

**Response:**
```json
{
  "success": true,
  "emailText": "...", // plain-text версия
  "emailHTML": "...", // HTML версия
  "emailsSent": 2, // если отправляли
  "emailsFailed": 0
}
```

### Использование

```typescript
import { generateEmailStory, generateEmailStoryHTML } from "@/lib/email-sharing";

// Генерация plain-text
const textVersion = generateEmailStory(interviewData);

// Генерация HTML
const htmlVersion = generateEmailStoryHTML(interviewData, {
  userName: "Their Story",
  includeStatistics: true,
  includeAllCategories: true,
});

// Отправка нескольким получателям
const emails = generateFamilyEmail(
  interviewData,
  ["family1@example.com", "family2@example.com"],
  "John"
);
```

---

## Shareable Links (30-day expiration)

### Функциональность

**Файл:** `lib/shareable-links.ts`

**Функции:**
- `createShareableLink()` - создание новой ссылки с 30-дневным сроком
- `isLinkValid()` - проверка валидности ссылки
- `extendShareableLink()` - продление ссылки на 30 дней
- `generateShareableURL()` - генерация URL
- `getExpirationMessage()` - форматированное сообщение об истечении

**Особенности:**
- Автоматическое истечение через 30 дней
- Возможность продления
- Отслеживание количества просмотров
- Безопасные случайные токены

### API Endpoints

#### GET `/api/shareable-link`
Получить все shareable links пользователя

**Response:**
```json
{
  "links": [
    {
      "id": "link_123",
      "link_token": "abc123...",
      "shareUrl": "https://memorykeeper.app/share/abc123...",
      "isValid": true,
      "daysRemaining": "Expires in 2 weeks",
      "created_at": "2025-01-13T10:00:00Z",
      "expires_at": "2025-02-12T10:00:00Z",
      "access_count": 5
    }
  ]
}
```

#### POST `/api/shareable-link`
Создать новую shareable link

**Response:**
```json
{
  "success": true,
  "link": {
    "id": "link_123",
    "link_token": "abc123...",
    "shareUrl": "https://memorykeeper.app/share/abc123...",
    "daysRemaining": "Expires in 4 weeks"
  }
}
```

#### PATCH `/api/shareable-link`
Продлить или деактивировать ссылку

**Request:**
```json
{
  "linkId": "link_123",
  "action": "extend" // или "deactivate"
}
```

**Response:**
```json
{
  "success": true,
  "link": { /* обновленная ссылка */ }
}
```

### Просмотр через Shareable Link

**Страница:** `/share/[token]`

**Особенности:**
- Нет необходимости в логине
- Автоматическая проверка истечения
- Красивый UI для просмотра истории
- Статистика и категории

**API:** `GET /api/share/[token]`

**Response:**
```json
{
  "interviewData": { /* MemoryInterviewData */ },
  "linkInfo": {
    "created_at": "2025-01-13T10:00:00Z",
    "expires_at": "2025-02-12T10:00:00Z",
    "access_count": 5
  }
}
```

**Ошибки:**
- `404` - ссылка не найдена
- `410 Gone` - ссылка истекла

---

## Email Templates

### Обновленные Templates

**Файл:** `lib/email.ts`

#### Welcome Email
- Обновлен для новой структуры интервью
- Упоминание 35-40 минут, 32 вопроса, 5 категорий
- CTA к онбордингу

#### Share Invite Email
- Уже обновлен ранее
- Красивый HTML дизайн
- Информация о Memory Keeper

#### Annual Reminder Email
- Обновлен для новой структуры
- Мягкий тон, без давления
- CTA к dashboard

---

## Структура данных

### ShareableLink Interface

```typescript
interface ShareableLink {
  id: string;
  user_id: string;
  link_token: string; // random 64-char hex string
  created_at: string;
  expires_at: string; // created_at + 30 days
  is_active: boolean;
  access_count?: number;
  last_accessed_at?: string;
}
```

### Хранение

**Файл:** `data/shareable_links.json`

```json
[
  {
    "id": "link_1234567890_abc123",
    "user_id": "user_123",
    "link_token": "a1b2c3d4e5f6...",
    "created_at": "2025-01-13T10:00:00Z",
    "expires_at": "2025-02-12T10:00:00Z",
    "is_active": true,
    "access_count": 5,
    "last_accessed_at": "2025-01-15T14:30:00Z"
  }
]
```

---

## Безопасность

### Shareable Links
- ✅ Случайные токены (64 символа hex)
- ✅ Автоматическое истечение через 30 дней
- ✅ Возможность деактивации
- ✅ Отслеживание доступа
- ✅ Проверка валидности перед показом данных

### Email Sharing
- ✅ Только авторизованные пользователи могут генерировать
- ✅ Данные не сохраняются в открытом виде
- ✅ Контроль над получателями

---

## Использование в UI

### Создание Shareable Link

```typescript
const createLink = async () => {
  const response = await fetch("/api/shareable-link", {
    method: "POST",
  });
  const { link } = await response.json();
  // link.shareUrl - готовая ссылка для копирования
};
```

### Продление ссылки

```typescript
const extendLink = async (linkId: string) => {
  const response = await fetch("/api/shareable-link", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ linkId, action: "extend" }),
  });
};
```

### Генерация Email версии

```typescript
const generateEmail = async () => {
  const response = await fetch("/api/email-share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      interviewData: preferences,
      sendEmails: false, // только генерация
    }),
  });
  const { emailText, emailHTML } = await response.json();
  // Использовать emailText или emailHTML
};
```

### Отправка Email нескольким получателям

```typescript
const sendToFamily = async () => {
  const response = await fetch("/api/email-share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      interviewData: preferences,
      recipientEmails: ["family1@example.com", "family2@example.com"],
      senderName: "John",
      sendEmails: true, // отправка
    }),
  });
  const { emailsSent, emailsFailed } = await response.json();
};
```

---

## Следующие шаги

### Для интеграции в UI:
1. Добавить кнопку "Generate Shareable Link" на странице Sharing
2. Добавить кнопку "Email Story" на странице View Story
3. Показывать список активных shareable links с датами истечения
4. Добавить возможность продления ссылок

### Для production:
1. Интегрировать реальный email сервис (Resend, SendGrid)
2. Добавить rate limiting для shareable links
3. Добавить аналитику просмотров
4. Оптимизировать производительность

---

## Статус

✅ Email Sharing реализовано  
✅ Shareable Links реализовано  
✅ 30-day expiration работает  
✅ API endpoints готовы  
✅ Страница просмотра через shareable link готова  
✅ Email templates обновлены  

**Готово к использованию!**

