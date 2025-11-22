# Прогресс настройки Supabase Auth

**Дата:** Январь 2025  
**Проект:** MKeeper

---

## ✅ ВЫПОЛНЕНО

### Шаг 1: Email Provider ✅
- [x] Email provider включен
- [x] Email confirmation включен (предположительно)
- [x] Secure email change включен (предположительно)

### Шаг 2: URL Redirects ✅
- [x] Site URL настроен
- [x] Redirect URLs добавлены

---

## ⚠️ ОСТАЛОСЬ СДЕЛАТЬ

### Шаг 3: SMTP ✅

**Статус:** Домен `legacywords.co.uk` верифицирован в Resend ✅

**Проверьте SMTP в Supabase:**
- Supabase Dashboard → **Settings** → **Auth** → **SMTP Settings**
- Убедитесь что:
  ```
  SMTP Host: smtp.resend.com
  SMTP Port: 465
  SMTP User: resend
  SMTP Password: [ваш API ключ из Resend]
  Sender Email: no-reply@legacywords.co.uk
  Sender Name: Memory Keeper
  ```
- Нажмите **"Save"** (если еще не сохранили)

#### Быстрая настройка Resend:

1. **Создайте аккаунт Resend:**
   - Перейдите на [resend.com](https://resend.com)
   - Войдите через GitHub или создайте аккаунт

2. **Получите API ключ:**
   - В Resend Dashboard → **API Keys**
   - Нажмите **"Create API Key"**
   - Название: `Memory Keeper`
   - Скопируйте ключ (формат: `re_xxxxx`)

3. **Верифицируйте домен в Resend:**
   - Resend Dashboard → **Domains** → **Add Domain**
   - Введите: `legacywords.co.uk`
   - Добавьте DNS записи (TXT для DKIM, SPF)
   - Подождите верификации (5-30 минут)
   - Статус должен стать **"Verified"** ✅

4. **Проверьте SMTP в Supabase:**
   - Supabase Dashboard → **Settings** → **Auth** → **SMTP Settings**
   - Убедитесь что:
     ```
     SMTP Host: smtp.resend.com
     SMTP Port: 465
     SMTP User: resend
     SMTP Password: [ваш API ключ из Resend]
     Sender Email: no-reply@legacywords.co.uk
     Sender Name: Memory Keeper
     ```
   - Нажмите **"Save"**

**Время:** 10-30 минут (зависит от DNS провайдера)

**Альтернатива для разработки:**
- Используйте `onboarding@resend.dev` как Sender Email (не требует верификации)
- См. подробности в `docs/EMAIL_ERROR_FIX.md`

---

### Шаг 4: Email Templates (ВАЖНО!)

**Где найти:**
```
Supabase Dashboard → Authentication → Email Templates
```

#### 4.1 Confirm signup

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

#### 4.2 Magic Link

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

#### 4.3 Reset Password

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

**Время:** 5 минут

---

## 🎯 ПРИОРИТЕТЫ

1. **СНАЧАЛА:** Настройте SMTP (Шаг 3) - без этого email не работают!
2. **ПОТОМ:** Обновите Email Templates (Шаг 4) - для лучшего UX

---

## ✅ ПОСЛЕ НАСТРОЙКИ

После того как вы настроите SMTP и Templates, я могу:

1. ✅ Проверить логи Auth на ошибки
2. ✅ Помочь протестировать регистрацию
3. ✅ Проверить что email отправляются
4. ✅ Проверить работу RLS

**Сообщите когда закончите, и я проверю!** 🚀

