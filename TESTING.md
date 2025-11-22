# Testing Guide

Этот документ описывает структуру тестов и как их запускать.

## Структура тестов

Тесты находятся в директории `__tests__/` и следуют структуре исходного кода:

```
__tests__/
  lib/
    supabase-error-handler.test.ts
    validation.test.ts
```

## Запуск тестов

```bash
# Запустить все тесты
npm test

# Запустить тесты в watch mode
npm run test:watch

# Запустить тесты с coverage отчетом
npm run test:coverage
```

## Покрытие тестами

Текущее покрытие:
- ✅ Обработка ошибок Supabase (`lib/supabase-error-handler.ts`)
- ✅ Валидация данных (`lib/validation.ts`)
- ⏳ API функции (`lib/api.ts`) - в разработке
- ⏳ API routes (`app/api/**`) - в разработке

## Написание новых тестов

### Пример теста для функции валидации

```typescript
import { validateData, preferencesSchema } from "@/lib/validation";

describe("preferencesSchema", () => {
  it("should validate valid preferences", () => {
    const valid = { age: 65 };
    const result = validateData(preferencesSchema, valid);
    expect(result.success).toBe(true);
  });
});
```

### Пример теста для обработки ошибок

```typescript
import { formatSupabaseError } from "@/lib/supabase-error-handler";

describe("formatSupabaseError", () => {
  it("should handle PGRST116 error", () => {
    const error = { code: "PGRST116" };
    const result = formatSupabaseError(error);
    expect(result.message).toBe("Resource not found");
  });
});
```

## Mocking

Для тестирования API routes используется мокирование Supabase клиента. См. `jest.setup.js` для конфигурации моков.

## Best Practices

1. **Изоляция**: Каждый тест должен быть независимым
2. **Чистота**: Используйте `beforeEach` и `afterEach` для очистки состояния
3. **Именование**: Используйте описательные имена тестов
4. **Покрытие**: Стремитесь к покрытию критических путей выполнения кода

## Continuous Integration

Тесты автоматически запускаются при:
- Push в main branch
- Pull requests
- Перед деплоем на Vercel (если настроено)

