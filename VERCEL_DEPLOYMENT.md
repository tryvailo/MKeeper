# Vercel Deployment Guide

Этот документ описывает процесс деплоя MKeeper на Vercel и необходимые настройки.

## Требования

- Аккаунт на Vercel
- Проект Supabase настроен
- (Опционально) Аккаунт Clerk для аутентификации
- (Опционально) Аккаунт Resend для отправки email

## Environment Variables

Все следующие переменные окружения должны быть настроены в Vercel Dashboard:

### Обязательные переменные

```bash
# Supabase (ОБЯЗАТЕЛЬНО)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# App URL (ОБЯЗАТЕЛЬНО для production)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Опциональные переменные

```bash
# Clerk Authentication (для будущей интеграции)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# Resend для отправки email (для будущей интеграции)
RESEND_API_KEY=re_your_api_key

# Node Environment
NODE_ENV=production
```

## Настройка в Vercel

1. **Импорт проекта:**
   - Подключите репозиторий GitHub/GitLab/Bitbucket к Vercel
   - Vercel автоматически определит Next.js проект

2. **Настройка Environment Variables:**
   - Перейдите в Settings → Environment Variables
   - Добавьте все переменные из списка выше
   - Убедитесь что они доступны для Production, Preview и Development

3. **Настройка Build Settings:**
   - Build Command: `npm run build` (по умолчанию)
   - Output Directory: `.next` (по умолчанию)
   - Install Command: `npm install` (по умолчанию)

4. **Настройка Supabase:**
   - Убедитесь что RLS политики настроены правильно
   - Проверьте что все таблицы созданы
   - Убедитесь что Storage bucket "files" создан

## Проверка после деплоя

После успешного деплоя проверьте:

1. **API Routes:**
   - `/api/preferences` - должен возвращать данные из Supabase
   - `/api/activity/log` - должен логировать активность
   - `/api/shareable-link` - должен создавать shareable links

2. **База данных:**
   - Проверьте подключение к Supabase через Vercel logs
   - Убедитесь что RLS политики работают корректно

3. **Environment Variables:**
   - Проверьте что все переменные доступны в runtime
   - Убедитесь что `NEXT_PUBLIC_*` переменные доступны на клиенте

## Troubleshooting

### Ошибка подключения к Supabase

Если видите ошибки подключения к Supabase:

1. Проверьте что `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY` установлены
2. Проверьте что URL правильный (без trailing slash)
3. Проверьте что ANON_KEY правильный (не service_role key)
4. Проверьте Vercel logs для деталей ошибки

### Ошибки сборки

Если build падает:

1. Проверьте что все зависимости установлены (`npm install`)
2. Проверьте TypeScript ошибки локально (`npm run build`)
3. Проверьте что нет проблем с импортами
4. Убедитесь что все файлы закоммичены в git

### RLS Policy Errors

Если видите ошибки доступа к данным:

1. Проверьте что RLS политики настроены для всех таблиц
2. Убедитесь что политики используют правильные условия
3. Проверьте что user_id правильно передается в запросах

## Важные замечания

- **Файловая система:** Vercel не поддерживает постоянное файловое хранилище. Все данные должны храниться в Supabase.
- **Environment Variables:** Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте. Не храните секреты в таких переменных.
- **Serverless Functions:** Все API routes выполняются как serverless functions с ограничением времени выполнения.
- **Cold Starts:** Первый запрос может быть медленнее из-за cold start. Это нормально для serverless функций.

## Мониторинг

Рекомендуется настроить:

1. **Vercel Analytics** - для мониторинга производительности
2. **Supabase Dashboard** - для мониторинга запросов к БД
3. **Error Tracking** - Sentry или аналогичный сервис (опционально)

## Дополнительные ресурсы

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

