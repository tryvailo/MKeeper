# Быстрая настройка Supabase Auth - Чеклист

**Время:** 15-30 минут  
**Уровень:** Пошаговое руководство

---

## ✅ ШАГ 1: ВКЛЮЧИТЬ EMAIL PROVIDER (2 минуты)

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard)
2. Выберите ваш проект
3. Перейдите: **Authentication** → **Providers**
4. Найдите секцию **"Email"**
5. ✅ Включите **"Enable Email provider"**
6. ✅ Включите **"Confirm email"**
7. ✅ Включите **"Secure email change"**

---

## ✅ ШАГ 2: НАСТРОИТЬ URL РЕДИРЕКТЫ (3 минуты)

1. Перейдите: **Authentication** → **URL Configuration**
2. В поле **"Site URL"** введите:
   ```
   https://legacywords.co.uk
   ```
   (или `http://localhost:3000` для разработки)

3. В секции **"Redirect URLs"** добавьте каждый URL:
   - `https://legacywords.co.uk/dashboard`
   - `https://legacywords.co.uk/onboarding`
   - `https://legacywords.co.uk/auth/callback`
   - `https://legacywords.co.uk/reset-password`
   - `http://localhost:3000/dashboard` (для dev)
   - `http://localhost:3000/onboarding` (для dev)
   - `http://localhost:3000/auth/callback` (для dev)
   - `http://localhost:3000/reset-password` (для dev)

4. Нажмите **"Save"** после каждого URL

---

## ✅ ШАГ 3: НАСТРОИТЬ SMTP (10-15 минут)

### Вариант A: Resend (рекомендуется)

1. Создайте аккаунт на [resend.com](https://resend.com)
2. Перейдите в **"API Keys"**
3. Нажмите **"Create API Key"**
4. Скопируйте API ключ (формат: `re_xxxxx`)
5. В Supabase: **Settings** → **Auth** → **SMTP Settings**
6. Включите **"Custom SMTP"**
7. Заполните:
   ```
   SMTP Host: smtp.resend.com
   SMTP Port: 465
   SMTP User: resend
   SMTP Password: [ваш API ключ]
   Sender Email: no-reply@legacywords.co.uk
   Sender Name: Memory Keeper
   ```
8. Нажмите **"Save"**

### Вариант B: SendGrid

1. Создайте аккаунт на [sendgrid.com](https://sendgrid.com)
2. Создайте API Key
3. В Supabase используйте:
   ```
   SMTP Host: smtp.sendgrid.net
   SMTP Port: 587
   SMTP User: apikey
   SMTP Password: [ваш SendGrid API ключ]
   ```

---

## ✅ ШАГ 4: ОБНОВИТЬ EMAIL ШАБЛОНЫ (5 минут)

1. Перейдите: **Authentication** → **Email Templates**

2. **Confirm signup:**
   - Subject: `Confirm your Memory Keeper account`
   - Body: Используйте шаблон из полного руководства

3. **Magic Link:**
   - Subject: `Your Memory Keeper login link`
   - Body: Используйте шаблон из полного руководства

4. **Reset Password:**
   - Subject: `Reset your Memory Keeper password`
   - Body: Используйте шаблон из полного руководства

5. Нажмите **"Save"** для каждого шаблона

---

## ✅ ШАГ 5: ПРОТЕСТИРОВАТЬ (5 минут)

1. Откройте `http://localhost:3000/sign-up`
2. Зарегистрируйте тестового пользователя
3. Проверьте email (включая Spam)
4. Нажмите на ссылку подтверждения
5. Убедитесь, что редирект работает

---

## 🎯 БЫСТРЫЙ ЧЕКЛИСТ

- [ ] Email provider включен
- [ ] Email confirmation включен
- [ ] Site URL настроен
- [ ] Redirect URLs добавлены (8 URLs)
- [ ] SMTP настроен
- [ ] Email шаблоны обновлены
- [ ] Тестовая регистрация работает

---

## 📖 ПОЛНОЕ РУКОВОДСТВО

Для детальных инструкций см. [SUPABASE_AUTH_SETUP_GUIDE.md](./SUPABASE_AUTH_SETUP_GUIDE.md)

---

**Готово!** 🎉

