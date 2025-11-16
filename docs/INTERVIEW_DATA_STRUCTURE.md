# Memory Keeper: Interview Data Structure Documentation

**Версия:** 2.0  
**Дата:** 13 января 2025  
**Статус:** Implementation Complete

---

## Обзор

Новая структура данных для Guided Interview (32 вопроса, 5 категорий) полностью реализована и готова к использованию.

---

## Структура файлов

### 1. `lib/interview.ts`
**Назначение:** Определение структуры интервью и вопросов

**Экспорты:**
- `INTERVIEW_CATEGORIES` - массив из 5 категорий с 32 вопросами
- `InterviewStep` - тип для шагов (1-6)
- `InterviewCategory` - интерфейс категории
- `InterviewQuestion` - интерфейс вопроса
- Helper функции: `getCategoryByStep()`, `getTotalQuestions()`, `validateAnswer()`, etc.

**Использование:**
```typescript
import { INTERVIEW_CATEGORIES, getCategoryByStep } from "@/lib/interview";

const category = getCategoryByStep(1); // Category 1: ЖИЗНЕННЫЕ МОМЕНТЫ
const totalQuestions = getTotalQuestions(); // 32
```

---

### 2. `lib/memory-data.ts`
**Назначение:** Типы данных для хранения ответов интервью

**Экспорты:**
- `MemoryInterviewData` - интерфейс с 32 полями для ответов
- `MemoryPreferences` - расширенный интерфейс с метаданными
- `getInterviewDataFromPreferences()` - извлечение данных интервью
- `calculateInterviewStats()` - расчет статистики

**Структура полей:**

```typescript
interface MemoryInterviewData {
  // Category 1: ЖИЗНЕННЫЕ МОМЕНТЫ (8 questions)
  happiest_memory?: string;
  favorite_trip?: string;
  unforgettable_day?: string;
  proudest_moment?: string;
  biggest_laugh?: string;
  loved_moment?: string;
  best_friend?: string;
  overcame_difficulty?: string;

  // Category 2: СЕМЕЙНЫЕ ИСТОРИИ (6 questions)
  met_partner?: string;
  children_young?: string;
  funny_family_moment?: string;
  passed_to_children?: string;
  relationship_parents?: string;
  family_together?: string;

  // Category 3: ЦЕННОСТИ И МУДРОСТЬ (8 questions)
  matters_most?: string;
  most_proud?: string;
  life_lessons?: string;
  brings_peace?: string;
  how_remembered?: string;
  regret_not_telling?: string;
  greatest_strength?: string;
  love_means?: string;

  // Category 4: ИНТЕРЕСЫ И ЛИЧНОСТЬ (5 questions)
  favorite_hobbies?: string;
  important_people?: string;
  places_love?: string;
  favorite_things?: string;
  personality?: string;

  // Category 5: ФИНАЛЬНЫЕ ПОСЛАНИЯ (5 questions)
  message_children?: string;
  message_spouse?: string;
  message_grandchildren?: string;
  message_family?: string;
  message_other?: string;
}
```

---

### 3. `lib/pdf-generator.ts`
**Назначение:** Генерация PDF из ответов интервью

**Экспорты:**
- `generateMemoryPDF()` - основная функция генерации PDF
- `generatePDF()` - legacy compatibility функция

**Использование:**
```typescript
import { generateMemoryPDF } from "@/lib/pdf-generator";

await generateMemoryPDF(interviewData, {
  userName: "Their Story",
  includeCoverPage: true,
  includeTableOfContents: true,
});
```

**Особенности:**
- Красивый дизайн с обложкой
- Оглавление
- Pull-quotes для вопросов
- Автоматические разрывы страниц
- Статистика в начале документа

---

### 4. `app/onboarding/page.tsx`
**Назначение:** Страница онбординга с новым интервью

**Особенности:**
- 6 шагов (5 категорий + Review)
- Валидация (минимум 10 символов)
- Таймер и прогресс
- Auto-save при переходе между шагами

---

### 5. `app/dashboard/preferences/page-new.tsx`
**Назначение:** Новая страница просмотра истории

**Особенности:**
- Отображение ответов по категориям
- Статистика (вопросы, слова, дата обновления)
- Генерация PDF
- Красивый UI с pull-quotes

---

## API Endpoints

### `POST /api/preferences`
**Текущее состояние:** ✅ Работает с новой структурой

API автоматически сохраняет все поля из `MemoryInterviewData`, так как использует `Partial<UserPreferences>` и сохраняет все переданные поля.

**Пример запроса:**
```json
{
  "happiest_memory": "My wedding day...",
  "favorite_trip": "We went to Paris...",
  "met_partner": "We met at university...",
  "interview_version": 2,
  "interview_completed_at": "2025-01-13T10:30:00Z",
  "interview_total_time": 2340,
  "interview_total_words": 3247
}
```

**Рекомендация:** API уже поддерживает новую структуру. Можно добавить валидацию полей интервью, но это не обязательно.

---

## Миграция данных

### Текущее состояние
- Старые данные хранятся в `data/preferences.json`
- Новые данные сохраняются в том же файле с новыми полями
- Backward compatibility: старые поля остаются доступными

### План миграции (если нужен)
1. Создать скрипт миграции для преобразования старых полей в новые
2. Запустить миграцию для существующих пользователей
3. Обновить типы для поддержки обоих форматов

**Примечание:** Миграция не критична, так как API поддерживает оба формата.

---

## Использование в коде

### Сохранение ответов интервью
```typescript
// В онбординге
const formData = {
  happiest_memory: "...",
  favorite_trip: "...",
  // ... все 32 поля
  interview_version: 2,
  interview_completed_at: new Date().toISOString(),
};

await fetch("/api/preferences", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Загрузка и отображение
```typescript
// Загрузка
const response = await fetch("/api/preferences");
const { preferences } = await response.json();

// Расчет статистики
import { calculateInterviewStats } from "@/lib/memory-data";
const stats = calculateInterviewStats(preferences);
// { totalWords: 3247, totalQuestions: 32, answeredQuestions: 28, categories: {...} }

// Генерация PDF
import { generateMemoryPDF } from "@/lib/pdf-generator";
await generateMemoryPDF(preferences, { userName: "Their Story" });
```

---

## Следующие шаги

### 1. Обновить существующие страницы
- [ ] Заменить `app/dashboard/preferences/page.tsx` на `page-new.tsx`
- [ ] Обновить другие страницы, использующие старую структуру

### 2. Тестирование
- [ ] Протестировать полный flow онбординга
- [ ] Проверить генерацию PDF
- [ ] Проверить сохранение и загрузку данных

### 3. Оптимизация
- [ ] Добавить индексацию для быстрого поиска
- [ ] Оптимизировать размер PDF
- [ ] Добавить кэширование статистики

---

## Структура данных в файле

Текущий формат хранения в `data/preferences.json`:

```json
{
  "user_123": {
    "id": "pref_1234567890",
    "user_id": "user_123",
    "happiest_memory": "...",
    "favorite_trip": "...",
    "interview_version": 2,
    "interview_completed_at": "2025-01-13T10:30:00Z",
    "interview_total_time": 2340,
    "interview_total_words": 3247,
    "created_at": "2025-01-13T09:00:00Z",
    "updated_at": "2025-01-13T10:30:00Z"
  }
}
```

---

## Заметки

- Все изменения сохранены локально в файлы
- API уже поддерживает новую структуру
- PDF генератор готов к использованию
- Страница просмотра истории готова (как `page-new.tsx`)
- Обратная совместимость сохранена

**Готово к тестированию!** ✅

