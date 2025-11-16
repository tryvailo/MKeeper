# Детальный план реализации DearAfter Registry

## 📋 ОГЛАВЛЕНИЕ

1. [Анализ текущего состояния](#анализ-текущего-состояния)
2. [Этап 1: Инфраструктура и зависимости](#этап-1-инфраструктура-и-зависимости)
3. [Этап 2: База данных](#этап-2-база-данных)
4. [Этап 3: Landing Page](#этап-3-landing-page)
5. [Этап 4: Onboarding](#этап-4-onboarding)
6. [Этап 5: Dashboard](#этап-5-dashboard)
7. [Этап 6: Settings](#этап-6-settings)
8. [Этап 7: Help/FAQ](#этап-7-helpfaq)
9. [Этап 8: Family Sharing](#этап-8-family-sharing)
10. [Этап 9: Загрузка файлов](#этап-9-загрузка-файлов)
11. [Этап 10: Email интеграция](#этап-10-email-интеграция)
12. [Этап 11: Premium Tier](#этап-11-premium-tier)
13. [Этап 12: Уведомления](#этап-12-уведомления)
14. [Этап 13: PDF улучшения](#этап-13-pdf-улучшения)
15. [Этап 14: Дизайн-система](#этап-14-дизайн-система)
16. [Этап 15: Валидация](#этап-15-валидация)
17. [Этап 16: Тестирование](#этап-16-тестирование)
18. [Этап 17: Деплой](#этап-17-деплой)
19. [Этап 18: Документация](#этап-18-документация)

---

## Анализ текущего состояния

### ✅ Реализовано:
- Базовая структура Next.js 14 + TypeScript + TailwindCSS
- Clerk аутентификация
- Базовая Supabase интеграция
- Упрощенная Landing страница
- Onboarding форма (4 шага)
- Базовый Dashboard
- Family sharing view
- PDF генерация (базовая)
- API endpoints (preferences, activity, share)
- Страницы Legal, Stories, Partners

### ❌ Требуется реализовать:
См. детальные этапы ниже.

---

## ЭТАП 1: Инфраструктура и зависимости

### Задачи:
1. Установить дополнительные зависимости
2. Настроить shadcn/ui
3. Настроить Resend для email
4. Настроить Stripe для billing
5. Обновить переменные окружения

### Команды:
```bash
# Формы и валидация
npm install react-hook-form zod @hookform/resolvers

# UI компоненты (Radix)
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-alert-dialog

# Email
npm install resend

# Billing
npm install stripe @stripe/stripe-js

# Утилиты
npm install date-fns
npm install @supabase/storage-js

# shadcn/ui инициализация
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea select accordion dialog dropdown-menu alert badge progress
```

### Файлы для создания:
- `.env.local` (обновить)
- `components/ui/` (shadcn компоненты)
- `lib/resend.ts` (email клиент)
- `lib/stripe.ts` (Stripe клиент)

**Время:** 2-3 часа

---

## ЭТАП 2: База данных

### Задачи:
1. Создать расширенную схему БД
2. Мигрировать существующие данные
3. Обновить RLS политики
4. Создать индексы

### Файлы для создания:
- `supabase/schema-extended.sql` - полная схема
- `supabase/migrations/001_extend_schema.sql`
- `supabase/migrations/002_migrate_data.sql`

### Таблицы:
1. `users` - расширенная (tier, age_range, location, deleted_at)
2. `preferences` - расширенная (budget_range, executor_*, ceremony_details JSON, version)
3. `family_members` - новая (access_level, sharing_link_token, accepted_at)
4. `files` - новая (file_name, file_type, storage_path)
5. `comments` - новая (family_member_id, content)
6. `notifications` - новая (type, message, read_at)
7. `subscriptions` - новая (stripe_*, plan, status)

**Время:** 4-6 часов

---

## ЭТАП 3: Landing Page

### Задачи:
1. Реализовать все секции согласно спецификации
2. Добавить компоненты
3. Настроить анимации
4. Оптимизировать для конверсии

### Компоненты для создания:
- `components/landing/HeroSection.tsx`
- `components/landing/ProblemSection.tsx`
- `components/landing/SolutionSection.tsx`
- `components/landing/TestimonialsSection.tsx`
- `components/landing/PricingSection.tsx`
- `components/landing/FAQSection.tsx`

### Секции:
1. ✅ Header/Navbar (улучшить)
2. ❌ Hero Section (расширить)
3. ❌ Problem Section (3 статистики)
4. ❌ Solution Section (3 шага)
5. ❌ Testimonials (3 отзыва)
6. ❌ Pricing (Free + Premium)
7. ❌ FAQ (аккордеон)
8. ✅ Footer (улучшить)

**Время:** 8-12 часов

---

## ЭТАП 4: Onboarding

### Задачи:
1. Расширить до 6 шагов
2. Добавить валидацию форм
3. Реализовать auto-save
4. Улучшить UX

### Шаги:
1. ✅ Basic Info
2. ✅ Funeral Type
3. ✅ Location & Service
4. ✅ Wishes
5. ❌ **Budget** (новый)
6. ❌ **Executor & Decision Maker** (новый)
7. ❌ **Media & Documents** (расширить)
8. ❌ **Review & Complete** (новый)

### Компоненты:
- `components/onboarding/BudgetStep.tsx`
- `components/onboarding/ExecutorStep.tsx`
- `components/onboarding/MediaStep.tsx`
- `components/onboarding/ReviewStep.tsx`
- `components/onboarding/ProgressBar.tsx`

**Время:** 12-16 часов

---

## ЭТАП 5: Dashboard

### Задачи:
1. Реализовать все виджеты
2. Создать Sidebar навигацию
3. Добавить подстраницы
4. Улучшить UX

### Виджеты:
1. ❌ Welcome Banner
2. ✅ Status Card (улучшить)
3. ✅ Primary Actions (улучшить)
4. ❌ Quick View Preferences
5. ❌ Family & Sharing Widget
6. ❌ Annual Reminder
7. ❌ Premium Upgrade Card
8. ✅ Activity Log (улучшить)

### Подстраницы:
- `/dashboard/preferences` - детальный просмотр
- `/dashboard/family` - управление доступом
- `/dashboard/sharing` - ссылки шаринга
- `/dashboard/reminders` - настройка напоминаний
- `/dashboard/history` - полная история

### Компоненты:
- `components/dashboard/Sidebar.tsx`
- `components/dashboard/WelcomeBanner.tsx`
- `components/dashboard/StatusCard.tsx`
- `components/dashboard/FamilyWidget.tsx`
- `components/dashboard/ReminderWidget.tsx`
- `components/dashboard/PremiumCard.tsx`

**Время:** 16-20 часов

---

## ЭТАП 6: Settings

### Задачи:
1. Создать страницу Settings
2. Реализовать все секции
3. Интегрировать Stripe для billing
4. Добавить GDPR функции

### Секции:
1. ❌ Account (profile, password, login activity)
2. ❌ Privacy & Security (2FA, session timeout, data export)
3. ❌ Billing (plan, payment, history)
4. ❌ Notifications (preferences, frequency)
5. ❌ Delete Account (с подтверждением)

### Компоненты:
- `components/settings/AccountSection.tsx`
- `components/settings/PrivacySection.tsx`
- `components/settings/BillingSection.tsx`
- `components/settings/NotificationsSection.tsx`
- `components/settings/DeleteAccountSection.tsx`

**Время:** 12-16 часов

---

## ЭТАП 7: Help/FAQ

### Задачи:
1. Расширить Help страницу
2. Добавить поиск
3. Реализовать аккордеон
4. Добавить contact form

### Секции FAQ:
1. ❌ General (4 вопроса)
2. ❌ Privacy & Security (4 вопроса)
3. ❌ Using DearAfter (4 вопроса)
4. ❌ Premium (3 вопроса)
5. ❌ What happens when you pass away (3 вопроса)
6. ❌ Technical (3 вопроса)
7. ❌ Contact & Support

### Компоненты:
- `components/help/FAQAccordion.tsx`
- `components/help/FAQSearch.tsx`
- `components/help/ContactForm.tsx`

**Время:** 6-8 часов

---

## ЭТАП 8: Family Sharing

### Задачи:
1. Улучшить Family View страницу
2. Добавить комментарии
3. Реализовать permission levels
4. Добавить actions для семьи

### Улучшения:
1. ❌ Deceased Info секция
2. ✅ Preferences Display (улучшить)
3. ❌ Actions (download, email, comment, contact, share)
4. ❌ Discussion Area (комментарии)
5. ❌ Permission levels

### API endpoints:
- `POST /api/comments`
- `GET /api/comments/:prefId`
- `DELETE /api/comments/:commentId`

**Время:** 10-12 часов

---

## ЭТАП 9: Загрузка файлов

### Задачи:
1. Интегрировать Supabase Storage
2. Реализовать загрузку
3. Добавить категории файлов
4. Реализовать просмотр/скачивание

### Компоненты:
- `components/files/FileUpload.tsx`
- `components/files/FileList.tsx`
- `components/files/FilePreview.tsx`

### API endpoints:
- `POST /api/files/upload`
- `GET /api/files/:prefId`
- `DELETE /api/files/:fileId`
- `GET /api/files/:fileId/download`

**Время:** 8-10 часов

---

## ЭТАП 10: Email интеграция

### Задачи:
1. Настроить Resend
2. Создать email шаблоны
3. Реализовать отправку
4. Настроить cron jobs

### Email шаблоны:
1. ❌ Welcome email
2. ❌ Share invite email
3. ❌ Annual reminder
4. ❌ Preferences updated
5. ❌ Share accepted

### Файлы:
- `lib/emails/templates/welcome.tsx`
- `lib/emails/templates/invite.tsx`
- `lib/emails/templates/reminder.tsx`
- `lib/email.ts` (email service)

### API endpoints:
- `POST /api/email/send-invite`
- `POST /api/email/send-reminder`

**Время:** 8-10 часов

---

## ЭТАП 11: Premium Tier

### Задачи:
1. Интегрировать Stripe
2. Реализовать checkout
3. Добавить webhook обработку
4. Реализовать Premium функции

### Premium функции:
- ❌ Unlimited family members
- ❌ Video message recording
- ❌ Legacy letters
- ❌ Quarterly reminders
- ❌ Priority support
- ❌ Ad-free

### API endpoints:
- `POST /api/billing/create-checkout`
- `POST /api/billing/webhook`
- `GET /api/billing/status`
- `POST /api/billing/cancel`

**Время:** 16-20 часов

---

## ЭТАП 12: Уведомления

### Задачи:
1. Создать систему уведомлений
2. Реализовать компоненты
3. Настроить cron jobs
4. Добавить настройки

### Компоненты:
- `components/notifications/NotificationBell.tsx`
- `components/notifications/NotificationDropdown.tsx`
- `components/notifications/NotificationSettings.tsx`

**Время:** 6-8 часов

---

## ЭТАП 13: PDF улучшения

### Задачи:
1. Улучшить дизайн PDF
2. Добавить все секции
3. Реализовать Premium stamp
4. Добавить watermark для Free

**Время:** 6-8 часов

---

## ЭТАП 14: Дизайн-система

### Задачи:
1. Реализовать цветовую палитру
2. Настроить типографику
3. Создать переиспользуемые компоненты
4. Документировать систему

### Компоненты:
- `components/ui/Button.tsx`
- `components/ui/Card.tsx`
- `components/ui/Alert.tsx`
- `components/ui/FormField.tsx`
- `components/ui/Modal.tsx`
- `components/ui/Accordion.tsx`
- `components/ui/Badge.tsx`

**Время:** 8-10 часов

---

## ЭТАП 15: Валидация

### Задачи:
1. Настроить React Hook Form + Zod
2. Добавить валидацию всех форм
3. Реализовать error handling
4. Добавить success states

**Время:** 6-8 часов

---

## ЭТАП 16: Тестирование

### Задачи:
1. Написать unit тесты
2. Написать E2E тесты
3. Провести тестирование
4. Исправить баги

**Время:** 20-30 часов

---

## ЭТАП 17: Деплой

### Задачи:
1. Настроить production environment
2. Деплой на Vercel
3. Настроить мониторинг
4. Настроить аналитику

**Время:** 4-6 часов

---

## ЭТАП 18: Документация

### Задачи:
1. Написать Privacy Policy
2. Написать Terms of Service
3. Создать техническую документацию
4. Создать user guide

**Время:** 8-12 часов

---

## 📊 ОБЩАЯ ОЦЕНКА ВРЕМЕНИ

### MVP (Этапы 1-10, частично 11-13):
- **Разработка:** 3-4 недели (1 разработчик full-time)
- **Тестирование:** 1 неделя
- **Деплой:** 3-5 дней
- **ИТОГО: ~5-6 недель**

### Phase 2 (Этапы 11-13 полностью, 14-15):
- **Разработка:** 2-3 недели
- **Тестирование:** 1 неделя
- **ИТОГО: ~3-4 недели**

---

## 🎯 ПРИОРИТЕТЫ РЕАЛИЗАЦИИ

### Неделя 1:
1. Этап 1 (Инфраструктура)
2. Этап 2 (База данных)
3. Этап 3 (Landing Page) - начало

### Неделя 2:
1. Этап 3 (Landing Page) - завершение
2. Этап 4 (Onboarding)
3. Этап 5 (Dashboard) - начало

### Неделя 3:
1. Этап 5 (Dashboard) - завершение
2. Этап 6 (Settings)
3. Этап 7 (Help/FAQ)

### Неделя 4:
1. Этап 8 (Family Sharing)
2. Этап 10 (Email)
3. Этап 9 (Файлы) - начало

### Неделя 5:
1. Этап 9 (Файлы) - завершение
2. Этап 11 (Premium) - начало
3. Этап 12 (Уведомления)

### Неделя 6:
1. Этап 11 (Premium) - завершение
2. Этап 13 (PDF)
3. Этап 14 (Дизайн-система)
4. Этап 15 (Валидация)

### Неделя 7:
1. Этап 16 (Тестирование)
2. Этап 17 (Деплой)
3. Этап 18 (Документация)

---

## ✅ ЧЕКЛИСТ ПЕРЕД ЗАПУСКОМ

### Функциональность:
- [ ] Все страницы работают
- [ ] Формы валидируются
- [ ] Email отправляются
- [ ] PDF генерируется
- [ ] Файлы загружаются
- [ ] Sharing работает
- [ ] Premium tier функционирует

### Качество:
- [ ] Нет критических багов
- [ ] Mobile responsive
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Performance (Lighthouse 90+)
- [ ] Security проверки пройдены

### Юридическое:
- [ ] Privacy Policy опубликована
- [ ] Terms of Service опубликованы
- [ ] GDPR compliance проверена

### Операционное:
- [ ] Мониторинг настроен
- [ ] Error tracking работает
- [ ] Analytics подключены
- [ ] Support email настроен

---

**Документ готов для использования Cursor AI для пошаговой реализации.**

