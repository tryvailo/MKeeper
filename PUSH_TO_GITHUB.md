# Инструкция: Отправка кода на GitHub

## Текущая ситуация

✅ Git репозиторий инициализирован  
✅ Удаленный репозиторий подключен  
✅ Все файлы добавлены в коммит  
✅ Коммит создан  
⏳ Осталось только отправить на GitHub

---

## Способ 1: Через GitHub Desktop (РЕКОМЕНДУЕТСЯ)

### Шаг 1: Открыть GitHub Desktop

1. Запустите **GitHub Desktop**
2. Если репозиторий уже открыт — переходите к шагу 2
3. Если нет — выберите `File` → `Add Local Repository`
4. Выберите папку: `/Users/alexandertryvailo/Documents/Products/MKeeper`

### Шаг 2: Отправить код

1. В верхней панели GitHub Desktop вы увидите:
   - **"1 commit to push to origin"** или
   - Кнопку **"Push origin"** или **"Publish branch"**

2. Нажмите **`Push origin`** (или **`Publish branch`**)

3. GitHub Desktop попросит авторизоваться (если еще не авторизованы):
   - Войдите в аккаунт `tryvailo`
   - Разрешите доступ

4. Дождитесь завершения загрузки

### Шаг 3: Проверить результат

1. Откройте: [https://github.com/tryvailo/MKeeper](https://github.com/tryvailo/MKeeper)
2. Убедитесь, что все файлы загружены

---

## Способ 2: Через командную строку (с Personal Access Token)

Если предпочитаете командную строку:

### Шаг 1: Создать Personal Access Token

1. Откройте: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Нажмите **"Generate new token"** → **"Generate new token (classic)"**
3. Заполните:
   - **Note:** `MemoryK Local Push`
   - **Expiration:** Выберите срок действия (например, 90 дней)
   - **Scopes:** Отметьте **`repo`** (полный доступ к репозиториям)
4. Нажмите **"Generate token"**
5. **Скопируйте токен** (он показывается только один раз!)

### Шаг 2: Отправить код

Выполните команду (замените `YOUR_TOKEN` на ваш токен):

```bash
cd /Users/alexandertryvailo/Documents/Products/MKeeper
git push -u origin main
```

Когда попросит ввести пароль:
- **Username:** `tryvailo`
- **Password:** Вставьте ваш Personal Access Token (не пароль от GitHub!)

### Альтернатива: Использовать токен в URL

```bash
git push https://YOUR_TOKEN@github.com/tryvailo/MKeeper.git main
```

---

## Способ 3: Настроить SSH ключ (для постоянного использования)

Если планируете часто работать через командную строку:

### Шаг 1: Проверить наличие SSH ключа

```bash
ls -al ~/.ssh
```

Если видите `id_rsa.pub` или `id_ed25519.pub` — ключ есть, переходите к шагу 3.

### Шаг 2: Создать SSH ключ

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Нажмите Enter для всех вопросов (можно задать пароль для ключа).

### Шаг 3: Добавить SSH ключ на GitHub

1. Скопируйте публичный ключ:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   (или `id_rsa.pub` если использовали RSA)

2. Откройте: [https://github.com/settings/keys](https://github.com/settings/keys)
3. Нажмите **"New SSH key"**
4. Вставьте ключ и сохраните

### Шаг 4: Изменить URL репозитория на SSH

```bash
cd /Users/alexandertryvailo/Documents/Products/MKeeper
git remote set-url origin git@github.com:tryvailo/MKeeper.git
git push -u origin main
```

---

## Проверка результата

После успешной отправки:

1. Откройте: [https://github.com/tryvailo/MKeeper](https://github.com/tryvailo/MKeeper)
2. Убедитесь, что видите:
   - ✅ Все файлы проекта
   - ✅ README.md отображается
   - ✅ Структура папок правильная
   - ✅ Нет `.env.local` файла
   - ✅ Нет `node_modules/` папки

---

## Если что-то пошло не так

### Ошибка: "Authentication failed"

**Решение:** Используйте GitHub Desktop или настройте Personal Access Token

### Ошибка: "Repository not found"

**Решение:** 
1. Проверьте URL: `git remote -v`
2. Должно быть: `https://github.com/tryvailo/MKeeper.git`
3. Если нет — исправьте: `git remote set-url origin https://github.com/tryvailo/MKeeper.git`

### Ошибка: "Permission denied"

**Решение:** Убедитесь, что вы используете правильный аккаунт `tryvailo`

---

## Рекомендация

**Используйте GitHub Desktop** — это самый простой способ:
- Автоматическая аутентификация
- Визуальный интерфейс
- Простота использования
- Не нужно настраивать токены или SSH

