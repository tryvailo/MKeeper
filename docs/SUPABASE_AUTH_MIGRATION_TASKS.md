# Список задач: Миграция на Supabase Auth и удаление Clerk

**Дата:** Январь 2025  
**Статус:** План миграции  
**Приоритет:** Высокий

---

## 📋 ОБЗОР ЗАДАЧ

**Всего задач:** 45  
**Ориентировочное время:** 12-16 часов  
**Приоритет:** Критический (MVP блокер)

---

## 🎯 ЭТАП 1: НАСТРОЙКА SUPABASE AUTH (2-3 часа)

### 1.1 Настройка в Supabase Dashboard

- [ ] **1.1.1** Войти в Supabase Dashboard
- [ ] **1.1.2** Перейти в Authentication → Providers
- [ ] **1.1.3** Убедиться что Email provider включен
- [ ] **1.1.4** Включить "Confirm email" (требовать подтверждение email)
- [ ] **1.1.5** Включить "Secure email change"
- [ ] **1.1.6** Настроить Site URL: `https://legacywords.co.uk` (или локальный для dev)
- [ ] **1.1.7** Добавить Redirect URLs:
  - `https://legacywords.co.uk/dashboard`
  - `https://legacywords.co.uk/onboarding`
  - `https://legacywords.co.uk/auth/callback`
  - `http://localhost:3000/dashboard` (для dev)
  - `http://localhost:3000/onboarding` (для dev)
  - `http://localhost:3000/auth/callback` (для dev)

### 1.2 Настройка SMTP (для production)

- [ ] **1.2.1** Создать аккаунт на Resend.com (или другой SMTP провайдер)
- [ ] **1.2.2** Получить API ключ
- [ ] **1.2.3** В Supabase Dashboard → Settings → Auth → SMTP Settings:
  - [ ] SMTP Host: `smtp.resend.com`
  - [ ] SMTP Port: `465` (или `587`)
  - [ ] SMTP User: `resend`
  - [ ] SMTP Password: `[ваш API ключ]`
  - [ ] Sender Email: `no-reply@legacywords.co.uk`
  - [ ] Sender Name: `Memory Keeper`
- [ ] **1.2.4** Сохранить настройки

### 1.3 Кастомизация Email шаблонов

- [ ] **1.3.1** Перейти в Authentication → Email Templates
- [ ] **1.3.2** Обновить шаблон "Confirm signup":
  - [ ] Добавить брендинг Memory Keeper
  - [ ] Английский язык
  - [ ] Дружелюбный тон
- [ ] **1.3.3** Обновить шаблон "Magic Link" (если будет использоваться)
- [ ] **1.3.4** Обновить шаблон "Reset Password"
- [ ] **1.3.5** Обновить шаблон "Change Email Address"
- [ ] **1.3.6** Протестировать отправку тестового email

### 1.4 Настройка Rate Limits (опционально)

- [ ] **1.4.1** Перейти в Authentication → Rate Limits
- [ ] **1.4.2** Настроить лимиты для Magic Link (если используется)
- [ ] **1.4.3** Настроить лимиты для OTP (если используется)
- [ ] **1.4.4** Настроить лимиты для Password Reset

### 1.5 Настройка CAPTCHA (рекомендуется для production)

- [ ] **1.5.1** Создать аккаунт Google reCAPTCHA v3 (или hCaptcha)
- [ ] **1.5.2** Получить Site Key и Secret Key
- [ ] **1.5.3** В Supabase Dashboard → Auth → Providers → Email → CAPTCHA:
  - [ ] Включить CAPTCHA
  - [ ] Ввести Site Key и Secret Key
- [ ] **1.5.4** Сохранить настройки

---

## 🔧 ЭТАП 2: УСТАНОВКА И НАСТРОЙКА ЗАВИСИМОСТЕЙ (30 минут)

### 2.1 Проверка зависимостей

- [ ] **2.1.1** Убедиться что `@supabase/supabase-js` установлен (уже есть в package.json)
- [ ] **2.1.2** Установить `@supabase/ssr` для Next.js SSR:
  ```bash
  npm install @supabase/ssr
  ```
- [ ] **2.1.3** Проверить версию `@supabase/supabase-js` (должна быть >= 2.39.3)

### 2.2 Настройка переменных окружения

- [ ] **2.2.1** Проверить наличие `.env.local` файла
- [ ] **2.2.2** Убедиться что есть переменные:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] **2.2.3** Удалить переменные Clerk (если есть):
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- [ ] **2.2.4** Обновить `.env.example` (удалить Clerk, оставить Supabase)

---

## 💻 ЭТАП 3: СОЗДАНИЕ УТИЛИТ ДЛЯ АВТОРИЗАЦИИ (1-2 часа)

### 3.1 Создание клиента Supabase для клиента

- [ ] **3.1.1** Создать `lib/supabase/client.ts`:
  ```typescript
  import { createBrowserClient } from '@supabase/ssr'
  
  export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  ```

### 3.2 Создание клиента Supabase для сервера

- [ ] **3.2.1** Создать `lib/supabase/server.ts`:
  ```typescript
  import { createServerClient } from '@supabase/ssr'
  import { cookies } from 'next/headers'
  
  export async function createClient() {
    const cookieStore = await cookies()
    
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  }
  ```

### 3.3 Обновление `lib/api.ts`

- [ ] **3.3.1** Удалить комментарии про Clerk из `getCurrentUserId()`
- [ ] **3.3.2** Реализовать получение user ID через Supabase Auth:
  ```typescript
  import { createClient } from '@/lib/supabase/server'
  
  export async function getCurrentUserId(): Promise<string | null> {
    try {
      const supabase = await createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return null
      }
      
      return user.id
    } catch (error) {
      console.error("Error getting current user ID:", error)
      return null
    }
  }
  ```
- [ ] **3.3.3** Добавить функцию `getCurrentUser()` для получения полного объекта пользователя
- [ ] **3.3.4** Протестировать функции

### 3.4 Создание хуков для React

- [ ] **3.4.1** Создать `lib/hooks/useAuth.ts`:
  ```typescript
  'use client'
  
  import { useEffect, useState } from 'react'
  import { createClient } from '@/lib/supabase/client'
  import type { User } from '@supabase/supabase-js'
  
  export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    
    useEffect(() => {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )
      
      return () => subscription.unsubscribe()
    }, [])
    
    return { user, loading }
  }
  ```

---

## 🎨 ЭТАП 4: СОЗДАНИЕ UI КОМПОНЕНТОВ (3-4 часа)

### 4.1 Страница Sign Up

- [ ] **4.1.1** Обновить `app/sign-up/[[...sign-up]]/page.tsx`:
  - [ ] Удалить редирект на onboarding
  - [ ] Создать форму регистрации:
    - [ ] Email input
    - [ ] Password input (с валидацией)
    - [ ] Confirm Password input
    - [ ] Full Name input (опционально)
    - [ ] Terms checkbox
    - [ ] Submit button
  - [ ] Реализовать `handleSignUp()`:
    ```typescript
    const handleSignUp = async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: {
            full_name: fullName
          }
        }
      })
    }
    ```
  - [ ] Обработка ошибок
  - [ ] Показ сообщения "Проверьте email для подтверждения"
  - [ ] Редирект после успешной регистрации

### 4.2 Страница Sign In

- [ ] **4.2.1** Обновить `app/sign-in/[[...sign-in]]/page.tsx`:
  - [ ] Удалить редирект на dashboard
  - [ ] Создать форму входа:
    - [ ] Email input
    - [ ] Password input
    - [ ] "Remember me" checkbox
    - [ ] Submit button
    - [ ] "Forgot password?" link
  - [ ] Реализовать `handleSignIn()`:
    ```typescript
    const handleSignIn = async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
    }
    ```
  - [ ] Обработка ошибок
  - [ ] Редирект на dashboard после успешного входа
  - [ ] (Опционально) Добавить вкладку "Magic Link" для passwordless входа

### 4.3 Страница Forgot Password

- [ ] **4.3.1** Создать `app/forgot-password/page.tsx`:
  - [ ] Email input
  - [ ] Submit button
  - [ ] Реализовать `handleResetPassword()`:
    ```typescript
    const handleResetPassword = async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
    }
    ```
  - [ ] Показ сообщения "Проверьте email для сброса пароля"
  - [ ] Ссылка "Вернуться к входу"

### 4.4 Страница Reset Password

- [ ] **4.4.1** Создать `app/reset-password/page.tsx`:
  - [ ] Проверка токена из URL
  - [ ] New Password input
  - [ ] Confirm Password input
  - [ ] Submit button
  - [ ] Реализовать `handleUpdatePassword()`:
    ```typescript
    const handleUpdatePassword = async (newPassword: string) => {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
    }
    ```
  - [ ] Редирект на sign-in после успешного сброса

### 4.5 Страница Email Verification

- [ ] **4.5.1** Создать `app/auth/callback/page.tsx`:
  - [ ] Обработка токена из URL
  - [ ] Верификация через `supabase.auth.verifyOtp()`
  - [ ] Показ статуса (успех/ошибка)
  - [ ] Редирект на onboarding или dashboard

### 4.6 Компонент UserButton (замена Clerk UserButton)

- [ ] **4.6.1** Создать `components/auth/UserButton.tsx`:
  - [ ] Показ email пользователя
  - [ ] Dropdown меню:
    - [ ] Profile
    - [ ] Settings
    - [ ] Sign Out
  - [ ] Реализовать `handleSignOut()`:
    ```typescript
    const handleSignOut = async () => {
      await supabase.auth.signOut()
      router.push('/sign-in')
    }
    ```

---

## 🛡️ ЭТАП 5: ОБНОВЛЕНИЕ MIDDLEWARE (30 минут)

### 5.1 Обновление `middleware.ts`

- [ ] **5.1.1** Установить `@supabase/ssr` (если еще не установлен)
- [ ] **5.1.2** Обновить `middleware.ts`:
  ```typescript
  import { createServerClient } from '@supabase/ssr'
  import { NextResponse, type NextRequest } from 'next/server'
  
  export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
      request,
    })
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )
    
    // Refresh session if expired
    const { data: { user } } = await supabase.auth.getUser()
    
    // Protect routes
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    
    if (user && (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    return supabaseResponse
  }
  
  export const config = {
    matcher: [
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  }
  ```
- [ ] **5.1.3** Протестировать защиту routes

---

## 🔌 ЭТАП 6: ОБНОВЛЕНИЕ API ROUTES (1-2 часа)

### 6.1 Обновление всех API routes

- [ ] **6.1.1** Обновить `app/api/preferences/route.ts`:
  - [ ] Использовать `getCurrentUserId()` из `lib/api.ts` (уже обновлен)
  - [ ] Убедиться что проверка авторизации работает
- [ ] **6.1.2** Обновить `app/api/activity/route.ts`
- [ ] **6.1.3** Обновить `app/api/activity/log/route.ts`
- [ ] **6.1.4** Обновить `app/api/shareable-link/route.ts`
- [ ] **6.1.5** Обновить `app/api/share/route.ts`
- [ ] **6.1.6** Обновить `app/api/family/invite/route.ts`:
  - [ ] Заменить получение inviter name с Clerk на Supabase Auth
  - [ ] Использовать `getCurrentUser()` для получения имени
- [ ] **6.1.7** Обновить `app/api/family/accept/route.ts`
- [ ] **6.1.8** Обновить `app/api/family/revoke/route.ts`
- [ ] **6.1.9** Обновить `app/api/family/members/route.ts`
- [ ] **6.1.10** Обновить все остальные API routes

### 6.2 Обновление получения данных пользователя

- [ ] **6.2.1** В `app/api/family/invite/route.ts` заменить:
  ```typescript
  // Старый код (Clerk):
  // TODO: Get from Clerk when integrated
  inviterName = "Guest User";
  
  // Новый код (Supabase):
  const user = await getCurrentUser();
  inviterName = user?.user_metadata?.full_name || user?.email || "Someone";
  ```

---

## 📱 ЭТАП 7: ОБНОВЛЕНИЕ КЛИЕНТСКИХ КОМПОНЕНТОВ (2-3 часа)

### 7.1 Обновление Dashboard

- [ ] **7.1.1** Обновить `app/dashboard/page.tsx`:
  - [ ] Удалить мок пользователя `{ id: "temp-user", ... }`
  - [ ] Использовать `useAuth()` хук:
    ```typescript
    const { user, loading } = useAuth()
    ```
  - [ ] Показывать loading состояние
  - [ ] Редирект на sign-in если не авторизован
  - [ ] Использовать `user.id` вместо `"temp-user"`
  - [ ] Использовать `user.email` для отображения

### 7.2 Обновление других страниц Dashboard

- [ ] **7.2.1** Обновить `app/dashboard/preferences/page.tsx`
- [ ] **7.2.2** Обновить `app/dashboard/family/page.tsx`
- [ ] **7.2.3** Обновить `app/dashboard/sharing/page.tsx`
- [ ] **7.2.4** Обновить `app/dashboard/history/page.tsx`
- [ ] **7.2.5** Обновить `app/dashboard/comments/page.tsx`
- [ ] **7.2.6** Обновить `app/dashboard/notifications/page.tsx`
- [ ] **7.2.7** Обновить `app/dashboard/reminders/page.tsx`
- [ ] **7.2.8** Обновить все остальные страницы dashboard

### 7.3 Обновление Onboarding

- [ ] **7.3.1** Обновить `app/onboarding/page.tsx`:
  - [ ] Проверка авторизации
  - [ ] Использование `user.id` для сохранения данных
  - [ ] Редирект на sign-in если не авторизован

### 7.4 Обновление Layout

- [ ] **7.4.1** Обновить `app/layout.tsx`:
  - [ ] Удалить Clerk providers (если есть)
  - [ ] Добавить AuthProvider (если нужен для глобального состояния)

### 7.5 Обновление Navigation

- [ ] **7.5.1** Найти компонент навигации (если есть)
- [ ] **7.5.2** Заменить Clerk UserButton на кастомный UserButton
- [ ] **7.5.3** Обновить логику показа/скрытия элементов для авторизованных пользователей

---

## 🗑️ ЭТАП 8: УДАЛЕНИЕ КОДА CLERK (1 час)

### 8.1 Удаление зависимостей

- [ ] **8.1.1** Проверить `package.json` на наличие `@clerk/nextjs` или других Clerk пакетов
- [ ] **8.1.2** Если найдены, удалить:
  ```bash
  npm uninstall @clerk/nextjs @clerk/clerk-react
  ```
- [ ] **8.1.3** Удалить `node_modules` и переустановить:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### 8.2 Удаление упоминаний Clerk из кода

- [ ] **8.2.1** Удалить комментарии про Clerk из `lib/api.ts`
- [ ] **8.2.2** Удалить комментарии про Clerk из `app/api/family/invite/route.ts`
- [ ] **8.2.3** Удалить комментарии про Clerk из `app/page.tsx`
- [ ] **8.2.4** Найти все файлы с упоминанием Clerk:
  ```bash
  grep -r "clerk\|Clerk\|CLERK" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" .
  ```
- [ ] **8.2.5** Удалить или обновить все найденные упоминания

### 8.3 Удаление backup файлов

- [ ] **8.3.1** Удалить `app/api/family/invite/route.ts.backup` (если содержит Clerk код)
- [ ] **8.3.2** Удалить все другие `.backup` файлы с Clerk кодом

### 8.4 Обновление документации

- [ ] **8.4.1** Обновить `README.md`:
  - [ ] Удалить секцию про Clerk
  - [ ] Добавить секцию про Supabase Auth
  - [ ] Обновить переменные окружения
- [ ] **8.4.2** Обновить `docs/TASKS_FOR_PRODUCTION.md`:
  - [ ] Удалить задачи про Clerk
  - [ ] Добавить задачи про Supabase Auth
- [ ] **8.4.3** Обновить `docs/DEPLOYMENT.md`:
  - [ ] Удалить секцию про Clerk
  - [ ] Добавить секцию про Supabase Auth
- [ ] **8.4.4** Обновить `docs/COST_ANALYSIS.md`:
  - [ ] Удалить упоминания Clerk
  - [ ] Обновить стоимость (Supabase Auth бесплатно)
- [ ] **8.4.5** Обновить другие документы с упоминанием Clerk

---

## 🧪 ЭТАП 9: ТЕСТИРОВАНИЕ (2-3 часа)

### 9.1 Тестирование авторизации

- [ ] **9.1.1** Тест регистрации:
  - [ ] Создать новый аккаунт
  - [ ] Проверить получение email подтверждения
  - [ ] Подтвердить email
  - [ ] Проверить редирект на onboarding
- [ ] **9.1.2** Тест входа:
  - [ ] Войти с правильными credentials
  - [ ] Проверить редирект на dashboard
  - [ ] Войти с неправильными credentials
  - [ ] Проверить показ ошибки
- [ ] **9.1.3** Тест выхода:
  - [ ] Выйти из аккаунта
  - [ ] Проверить редирект на sign-in
  - [ ] Проверить что сессия удалена

### 9.2 Тестирование защищенных routes

- [ ] **9.2.1** Тест доступа к dashboard без авторизации:
  - [ ] Попытаться открыть `/dashboard`
  - [ ] Проверить редирект на `/sign-in`
- [ ] **9.2.2** Тест доступа к API без авторизации:
  - [ ] Попытаться вызвать `/api/preferences`
  - [ ] Проверить возврат 401 Unauthorized
- [ ] **9.2.3** Тест доступа с авторизацией:
  - [ ] Войти в систему
  - [ ] Открыть `/dashboard`
  - [ ] Проверить что данные загружаются

### 9.3 Тестирование RLS политик

- [ ] **9.3.1** Создать preferences для пользователя A
- [ ] **9.3.2** Войти как пользователь B
- [ ] **9.3.3** Попытаться получить preferences пользователя A
- [ ] **9.3.4** Проверить что доступ запрещен (RLS работает)

### 9.4 Тестирование функциональности

- [ ] **9.4.1** Тест создания preferences
- [ ] **9.4.2** Тест обновления preferences
- [ ] **9.4.3** Тест семейного шаринга
- [ ] **9.4.4** Тест отправки email инвайтов
- [ ] **9.4.5** Тест всех остальных функций

### 9.5 Тестирование edge cases

- [ ] **9.5.1** Тест истечения сессии
- [ ] **9.5.2** Тест refresh токена
- [ ] **9.5.3** Тест сброса пароля
- [ ] **9.5.4** Тест изменения email
- [ ] **9.5.5** Тест обработки ошибок сети

---

## 🚀 ЭТАП 10: DEPLOYMENT И PRODUCTION (1 час)

### 10.1 Подготовка к production

- [ ] **10.1.1** Убедиться что все переменные окружения настроены в Vercel
- [ ] **10.1.2** Убедиться что SMTP настроен в Supabase Dashboard
- [ ] **10.1.3** Убедиться что URL редиректы настроены для production домена
- [ ] **10.1.4** Убедиться что email шаблоны настроены

### 10.2 Deploy

- [ ] **10.2.1** Создать git commit со всеми изменениями
- [ ] **10.2.2** Push в main branch
- [ ] **10.2.3** Проверить что Vercel деплой прошел успешно
- [ ] **10.2.4** Проверить что нет ошибок в Vercel logs

### 10.3 Production тестирование

- [ ] **10.3.1** Протестировать регистрацию на production
- [ ] **10.3.2** Протестировать вход на production
- [ ] **10.3.3** Протестировать все основные функции
- [ ] **10.3.4** Проверить что email отправляются корректно

---

## 📝 ЭТАП 11: ДОКУМЕНТАЦИЯ И CLEANUP (30 минут)

### 11.1 Обновление документации

- [ ] **11.1.1** Создать `docs/SUPABASE_AUTH_SETUP.md` с инструкциями по настройке
- [ ] **11.1.2** Обновить `docs/SUPABASE_AUTH_EMAIL_OPTIONS.md` (если нужно)
- [ ] **11.1.3** Обновить `docs/AUTH_COMPARISON_SUPABASE_VS_CLERK.md` (отметить что миграция завершена)

### 11.2 Cleanup

- [ ] **11.2.1** Удалить неиспользуемые импорты
- [ ] **11.2.2** Удалить неиспользуемые функции
- [ ] **11.2.3** Запустить linter и исправить все ошибки:
  ```bash
  npm run lint
  ```
- [ ] **11.2.4** Запустить TypeScript проверку:
  ```bash
  npx tsc --noEmit
  ```

### 11.3 Финальная проверка

- [ ] **11.3.1** Убедиться что нет упоминаний Clerk в коде:
  ```bash
  grep -r "clerk\|Clerk\|CLERK" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . | grep -v node_modules | grep -v ".next" | grep -v "docs/AUTH_COMPARISON"
  ```
- [ ] **11.3.2** Убедиться что все тесты проходят
- [ ] **11.3.3** Убедиться что приложение работает локально
- [ ] **11.3.4** Убедиться что приложение работает на production

---

## ✅ КРИТЕРИИ ГОТОВНОСТИ

Миграция считается завершенной когда:

- [ ] ✅ Все UI компоненты авторизации работают
- [ ] ✅ Все API routes используют Supabase Auth
- [ ] ✅ Middleware защищает routes корректно
- [ ] ✅ RLS политики работают
- [ ] ✅ Нет упоминаний Clerk в коде (кроме документации сравнения)
- [ ] ✅ Все тесты проходят
- [ ] ✅ Приложение работает на production
- [ ] ✅ Email отправляются корректно
- [ ] ✅ Документация обновлена

---

## 📚 ПОЛЕЗНЫЕ РЕСУРСЫ

### Документация Supabase
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js Integration](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Email Auth](https://supabase.com/docs/guides/auth/passwords)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

### Примеры кода
- [Supabase Next.js Auth Example](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

---

**Дата создания:** Январь 2025  
**Статус:** Готов к выполнению  
**Приоритет:** Критический

