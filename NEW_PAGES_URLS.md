# Адреса новых страниц DearAfter Registry

**Базовый URL:** http://localhost:3000

---

## 🆕 НОВЫЕ СТРАНИЦЫ (созданные в последней сессии)

### Dashboard подстраницы

1. **Детальный просмотр Preferences**
   - URL: `http://localhost:3000/dashboard/preferences`
   - Описание: Полное отображение всех preferences в читаемом формате
   - Функции: Edit, Download PDF, Share

2. **Уведомления**
   - URL: `http://localhost:3000/dashboard/notifications`
   - Описание: Список всех уведомлений с фильтрами (All, Unread, Read)
   - Функции: Mark as read, Delete, Filter

3. **Управление файлами**
   - URL: `http://localhost:3000/dashboard/files`
   - Описание: Загрузка и управление файлами (Photos, Music, Documents, Other)
   - Функции: Upload, Download, Delete, Preview

4. **Premium Upgrade**
   - URL: `http://localhost:3000/dashboard/premium`
   - Описание: Страница сравнения Free vs Premium и upgrade
   - Функции: Feature comparison, Upgrade button, FAQ

5. **Video Message Recording**
   - URL: `http://localhost:3000/dashboard/video-message`
   - Описание: Запись 2-минутного видео сообщения (Premium feature)
   - Функции: Record, Stop, Play, Delete, Save, Upload

6. **Legacy Letters**
   - URL: `http://localhost:3000/dashboard/legacy-letters`
   - Описание: Создание и управление письмами для близких (Premium feature)
   - Функции: Create, Edit, Delete, Auto-deliver toggle

7. **Executor Dashboard**
   - URL: `http://localhost:3000/dashboard/executor`
   - Описание: Специальный dashboard для executor
   - Функции: View Preferences, Contact Family, Add Notes, Family Members list

8. **Comments Management**
   - URL: `http://localhost:3000/dashboard/comments`
   - Описание: Управление комментариями и обсуждениями
   - Функции: Add comment, Reply, Edit, Delete, Filter

---

### Legal & Info страницы

9. **Privacy Policy**
   - URL: `http://localhost:3000/privacy`
   - Описание: Полная политика конфиденциальности (GDPR compliant)

10. **Terms of Service**
    - URL: `http://localhost:3000/terms`
    - Описание: Полные условия использования сервиса

11. **Contact Support**
    - URL: `http://localhost:3000/contact`
    - Описание: Контактная форма и информация для связи
    - Функции: Contact form, Email, Phone, Office hours

---

### Onboarding

12. **Thank You / Complete**
    - URL: `http://localhost:3000/onboarding/complete?from=onboarding`
    - Описание: Страница завершения onboarding с next steps
    - Доступ: После завершения onboarding формы

---

### Error Pages

13. **404 Not Found**
    - URL: `http://localhost:3000/404`
    - Описание: Страница для несуществующих страниц

14. **500 Server Error**
    - URL: `http://localhost:3000/500`
    - Описание: Страница для серверных ошибок

---

## 📋 СУЩЕСТВУЮЩИЕ СТРАНИЦЫ (были созданы ранее)

### Основные страницы

- **Landing Page**: `http://localhost:3000/`
- **Sign In**: `http://localhost:3000/sign-in`
- **Sign Up**: `http://localhost:3000/sign-up`
- **Onboarding**: `http://localhost:3000/onboarding`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Settings**: `http://localhost:3000/settings`
- **Help/FAQ**: `http://localhost:3000/help`

### Dashboard подстраницы (существующие)

- **Family Members**: `http://localhost:3000/dashboard/family`
- **Sharing & Permissions**: `http://localhost:3000/dashboard/sharing`
- **Reminders**: `http://localhost:3000/dashboard/reminders`
- **History & Activity**: `http://localhost:3000/dashboard/history`

### Дополнительные страницы

- **Legal**: `http://localhost:3000/legal`
- **Stories**: `http://localhost:3000/stories`
- **Partners**: `http://localhost:3000/partners`
- **Family View (shared)**: `http://localhost:3000/family/[token]`

---

## 🔗 БЫСТРЫЙ ДОСТУП К НОВЫМ СТРАНИЦАМ

### Для тестирования Dashboard страниц:
1. Войдите в систему: `http://localhost:3000/sign-in`
2. Перейдите в Dashboard: `http://localhost:3000/dashboard`
3. Используйте sidebar навигацию для доступа к новым страницам

### Для тестирования Public страниц:
- Privacy: `http://localhost:3000/privacy`
- Terms: `http://localhost:3000/terms`
- Contact: `http://localhost:3000/contact`

### Для тестирования Error страниц:
- 404: `http://localhost:3000/404`
- 500: `http://localhost:3000/500`
- Или перейдите на несуществующую страницу: `http://localhost:3000/nonexistent`

---

## 📝 ПРИМЕЧАНИЯ

- Все новые страницы используют **mock данные** и **заглушки** для API
- Premium функции (video-message, legacy-letters) показывают alert о необходимости Premium
- Файлы сохраняются в localStorage (для files и legacy-letters)
- Комментарии сохраняются в localStorage
- Email отправка - заглушка (console.log)
- Stripe checkout - заглушка (alert)

---

**Сервер запущен на:** http://localhost:3000

