# Инструкция по загрузке проекта на GitHub

## Подготовка к первому коммиту

### 1. Инициализация Git репозитория

```bash
# Инициализировать git репозиторий
git init

# Добавить все файлы (кроме тех, что в .gitignore)
git add .

# Создать первый коммит
git commit -m "Initial commit: MKeeper project with Supabase integration, error handling, and testing"
```

### 2. Создание репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Название: `MKeeper` или `memory-keeper`
4. Описание: "Free online tool for dementia families to preserve their loved one's story"
5. Выберите **Private** (рекомендуется для production проекта)
6. **НЕ** добавляйте README, .gitignore или license (они уже есть)
7. Нажмите "Create repository"

### 3. Подключение локального репозитория к GitHub

```bash
# Добавить remote (замените YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Переименовать ветку в main (если нужно)
git branch -M main

# Отправить код на GitHub
git push -u origin main
```

## Структура проекта

Проект готов к загрузке со следующей структурой:

```
MKeeper/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI/CD для тестов и build
│       └── codeql.yml     # CodeQL анализ безопасности
├── app/                    # Next.js App Router
├── components/             # React компоненты
├── lib/                    # Утилиты и API функции
├── supabase/              # SQL миграции
├── __tests__/              # Jest тесты
├── .env.example            # Пример переменных окружения
├── .gitignore             # Игнорируемые файлы
├── README.md               # Документация проекта
└── package.json           # Зависимости
```

## Важные файлы

### ✅ Уже в .gitignore (не будут загружены):
- `.env.local` - локальные переменные окружения
- `.env` - переменные окружения
- `node_modules/` - зависимости
- `.next/` - билд Next.js
- `*.backup` - backup файлы
- `data/*.json` - локальные данные
- `.vercel/` - конфигурация Vercel

### ✅ Будет загружено:
- `.env.example` - пример переменных окружения (без секретов)
- Все исходные файлы
- Тесты
- Документация

## Настройка GitHub Secrets

После загрузки на GitHub, настройте Secrets для CI/CD:

1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте следующие secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

## Настройка Vercel

После загрузки на GitHub:

1. Подключите репозиторий к Vercel
2. Добавьте все переменные окружения из `.env.example`
3. Деплой произойдет автоматически при push в main

## Проверка перед коммитом

Перед первым коммитом убедитесь:

```bash
# Проверить что нет секретов в коде
grep -r "sk_live\|sk_test" . --exclude-dir=node_modules
grep -r "supabase.co.*key" . --exclude-dir=node_modules

# Проверить что build проходит
npm run build

# Проверить что тесты проходят
npm test

# Проверить линтер
npm run lint
```

## Коммиты

Рекомендуемая структура коммитов:

```bash
# Основной коммит
git commit -m "Initial commit: MKeeper project

- Supabase database integration
- Complete error handling and validation
- Unit tests (43 tests)
- API routes with authentication checks
- Ready for production deployment"
```

## Ветки

Рекомендуемая структура веток:

- `main` - production код
- `develop` - development код
- `feature/*` - новые функции
- `fix/*` - исправления багов

## Лицензия

Если нужна лицензия, создайте файл `LICENSE` (MIT рекомендуется для open source).

## Дополнительные настройки

### Защита ветки main

В GitHub Settings → Branches:
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date

### GitHub Actions

CI/CD уже настроен в `.github/workflows/`:
- Автоматические тесты при push/PR
- CodeQL анализ безопасности
- Build проверка

## Полезные команды

```bash
# Проверить статус
git status

# Посмотреть что будет закоммичено
git status --short

# Добавить все изменения
git add .

# Создать коммит
git commit -m "Описание изменений"

# Отправить на GitHub
git push origin main

# Создать новую ветку
git checkout -b feature/new-feature
```

## Проблемы и решения

### Если забыли добавить в .gitignore

```bash
# Удалить файл из индекса, но оставить локально
git rm --cached файл

# Добавить в .gitignore
echo "файл" >> .gitignore

# Закоммитить изменения
git commit -m "Remove file from git tracking"
```

### Если случайно закоммитили секреты

1. Немедленно измените секреты в сервисах
2. Удалите файл из истории git (используйте BFG Repo-Cleaner или git filter-branch)
3. Добавьте в .gitignore

## Готово!

После выполнения всех шагов ваш проект будет на GitHub и готов к:
- ✅ CI/CD через GitHub Actions
- ✅ Деплою на Vercel
- ✅ Совместной работе команды
- ✅ Code review через Pull Requests
