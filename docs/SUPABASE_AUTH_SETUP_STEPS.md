# Пошаговая инструкция: Настройка Supabase Auth

**Время выполнения:** 15-30 минут  
**Сложность:** Легкая

---

## 🎯 ОБЗОР

Вам нужно настроить 4 основные вещи:
1. ✅ Email Provider (включить)
2. ✅ URL Redirects (добавить URLs)
3. ✅ SMTP (настроить отправку email)
4. ✅ Email Templates (обновить тексты)

---

## 📍 ШАГ 1: EMAIL PROVIDER

### Где найти:
```
Supabase Dashboard → Authentication → Providers → Email
```

### Что сделать:
1. Откройте страницу Providers
2. Найдите секцию **"Email"**
3. Включите 3 переключателя:
   - ✅ **Enable Email provider** (должен быть включен)
   - ✅ **Confirm email** (включите)
   - ✅ **Secure email change** (включите)

**Готово!** Переходите к следующему шагу.

---

## 📍 ШАГ 2: URL РЕДИРЕКТЫ

### Где найти:
```
Supabase Dashboard → Authentication → URL Configuration
```

### Что сделать:

#### 2.1 Site URL
В поле **"Site URL"** введите:
```
https://legacywords.co.uk
```
(Для разработки: `http://localhost:3000`)

#### 2.2 Redirect URLs
В секции **"Redirect URLs"** (или **"Additional Redirect URLs"**) добавьте:

**Production URLs:**
```
https://legacywords.co.uk/dashboard
https://legacywords.co.uk/onboarding
https://legacywords.co.uk/auth/callback
https://legacywords.co.uk/reset-password
```

**Development URLs:**
```
http://localhost:3000/dashboard
http://localhost:3000/onboarding
http://localhost:3000/auth/callback
http://localhost:3000/reset-password
```

**Как добавить:**
- Нажмите **"Add URL"** или **"+"**
- Вставьте URL
- Нажмите **"Save"**
- Повторите для каждого URL

**Готово!** Переходите к следующему шагу.

---

## 📍 ШАГ 3: SMTP (ОТПРАВКА EMAIL)

### Где найти:
```
Supabase Dashboard → Settings → Auth → SMTP Settings
```

### Вариант A: Resend (рекомендуется, бесплатно)

#### 3.1 Создайте аккаунт Resend
1. Перейдите на [resend.com](https://resend.com)
2. Нажмите **"Sign Up"**
3. Войдите через GitHub (или создайте аккаунт)

#### 3.2 Получите API ключ
1. В Resend Dashboard перейдите: **API Keys** (в меню слева)
2. Нажмите **"Create API Key"**
3. Название: `Memory Keeper`
4. Права: **Full Access**
5. Нажмите **"Add"**
6. **Скопируйте ключ** (показывается только один раз!)
   - Формат: `re_xxxxxxxxxxxxx`

#### 3.3 Настройте в Supabase
1. В Supabase: **Settings** → **Auth** → **SMTP Settings**
2. Включите **"Custom SMTP"** (переключатель)
3. Заполните поля:

```
SMTP Host: smtp.resend.com
SMTP Port: 465
SMTP User: resend
SMTP Password: [вставьте ваш API ключ из Resend]
Sender Email: no-reply@legacywords.co.uk
Sender Name: Memory Keeper
```

4. Нажмите **"Save"**

**Готово!** Теперь email будут отправляться через Resend.

---

## 📍 ШАГ 4: EMAIL ШАБЛОНЫ

### Где найти:
```
Supabase Dashboard → Authentication → Email Templates
```

### Что обновить:

#### 4.1 Confirm signup (Подтверждение регистрации)

**Subject:**
```
Confirm your Memory Keeper account
```

**Body (HTML):**
```html
<h2>Welcome to Memory Keeper</h2>
<p>Thank you for signing up! Please confirm your email address to get started.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email address</a></p>
<p>Or enter this code: {{ .Token }}</p>
<p>This link will expire in 1 hour.</p>
<hr>
<p style="color: #666; font-size: 12px;">
  If you didn't create an account, you can safely ignore this email.
</p>
```

#### 4.2 Magic Link (Вход без пароля)

**Subject:**
```
Your Memory Keeper login link
```

**Body (HTML):**
```html
<h2>Sign in to Memory Keeper</h2>
<p>Click the link below to sign in to your account:</p>
<p><a href="{{ .ConfirmationURL }}">Sign in to Memory Keeper</a></p>
<p>Or enter this code: {{ .Token }}</p>
<p>This link will expire in 1 hour.</p>
```

#### 4.3 Reset Password (Сброс пароля)

**Subject:**
```
Reset your Memory Keeper password
```

**Body (HTML):**
```html
<h2>Reset your password</h2>
<p>We received a request to reset your password. Click the link below to set a new password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset password</a></p>
<p>Or enter this code: {{ .Token }}</p>
<p>This link will expire in 1 hour.</p>
<hr>
<p style="color: #666; font-size: 12px;">
  If you didn't request a password reset, you can safely ignore this email.
</p>
```

**Как обновить:**
1. Нажмите на шаблон для редактирования
2. Вставьте новый Subject и Body
3. Нажмите **"Save"**
4. Повторите для каждого шаблона

**Готово!** Email шаблоны обновлены.

---

## ✅ ФИНАЛЬНАЯ ПРОВЕРКА

### Тест 1: Регистрация
1. Откройте `http://localhost:3000/sign-up`
2. Заполните форму
3. Нажмите **"Create Account"**
4. Проверьте email (включая Spam)
5. Нажмите на ссылку
6. ✅ Должен открыться `/onboarding`

### Тест 2: Вход
1. Откройте `http://localhost:3000/sign-in`
2. Введите email и password
3. Нажмите **"Sign in"**
4. ✅ Должен открыться `/dashboard`

### Тест 3: Сброс пароля
1. Откройте `http://localhost:3000/forgot-password`
2. Введите email
3. Проверьте email
4. Нажмите на ссылку
5. Введите новый пароль
6. ✅ Должен работать вход с новым паролем

---

## 🚨 ЧАСТЫЕ ПРОБЛЕМЫ

### Email не приходит
- ✅ Проверьте папку Spam
- ✅ Убедитесь, что SMTP настроен
- ✅ Проверьте логи: **Logs** → **Auth Logs**

### "Invalid redirect URL"
- ✅ Убедитесь, что URL добавлен в Redirect URLs
- ✅ Проверьте, что URL точно совпадает

### "Email address not authorized"
- ✅ Это значит SMTP не настроен
- ✅ Настройте SMTP (см. Шаг 3)

---

## 📋 ЧЕКЛИСТ

Проверьте, что все сделано:

- [ ] Email provider включен
- [ ] Email confirmation включен
- [ ] Site URL: `https://legacywords.co.uk`
- [ ] 8 Redirect URLs добавлены
- [ ] SMTP настроен (Resend или другой)
- [ ] 3 Email шаблона обновлены
- [ ] Тестовая регистрация работает
- [ ] Тестовый вход работает

---

## 🎉 ГОТОВО!

Если все тесты прошли успешно - настройка завершена!

**Следующие шаги:**
- Протестируйте на production
- Настройте мониторинг (опционально)

---

**Нужна помощь?** См. полное руководство: [SUPABASE_AUTH_SETUP_GUIDE.md](./SUPABASE_AUTH_SETUP_GUIDE.md)

