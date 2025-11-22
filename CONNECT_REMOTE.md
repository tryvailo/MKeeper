# Подключение существующего GitHub репозитория

## Текущий статус:
- ✅ Локальный репозиторий инициализирован
- ✅ Создано 2 коммита:
  - `814ec20` - docs: Add GitHub push instructions
  - `35e9c8b` - feat: Migrate from Clerk to Supabase Auth
- ⚠️ Удаленный репозиторий не подключен

## Подключение удаленного репозитория:

### Вариант 1: Если знаете URL репозитория

Выполните команду (замените URL на ваш):

**HTTPS:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**SSH:**
```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Вариант 2: Если нужно найти URL

1. Откройте ваш репозиторий на GitHub
2. Нажмите зеленую кнопку "Code"
3. Скопируйте URL (HTTPS или SSH)
4. Выполните команду выше

## После подключения:

### 1. Проверьте подключение:
```bash
git remote -v
```

### 2. Получите изменения с GitHub (если есть):
```bash
git fetch origin
git branch -r  # посмотреть удаленные ветки
```

### 3. Если на GitHub уже есть коммиты:

**Вариант A: Если хотите сохранить оба набора коммитов (merge):**
```bash
git pull origin main --allow-unrelated-histories
# Разрешите конфликты, если они есть
git push -u origin main
```

**Вариант B: Если хотите заменить историю на GitHub вашей (force push):**
```bash
# ⚠️ ВНИМАНИЕ: Это перезапишет историю на GitHub!
git push -u origin main --force
```

**Вариант C: Если на GitHub пустой репозиторий:**
```bash
git push -u origin main
```

## Рекомендация:

Если на GitHub уже есть важные коммиты, используйте **Вариант A** (merge).
Если репозиторий новый или пустой, используйте **Вариант C**.

---

**Следующий шаг:** Предоставьте URL вашего GitHub репозитория, и я помогу подключить его автоматически.

