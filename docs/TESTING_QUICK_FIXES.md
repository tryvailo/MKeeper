# Быстрые исправления для улучшения надежности кода

## 🔴 Критические проблемы (исправить немедленно)

### 1. Добавить debounce для auto-save

**Файл:** `app/onboarding/page.tsx`

**Проблема:** Auto-save может вызываться слишком часто, создавая race conditions

**Исправление:**
```typescript
import { useMemo } from 'react';

// Добавить debounce функцию
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// В компоненте:
const debouncedAutoSave = useMemo(
  () => debounce(autoSave, 2000), // 2 секунды задержка
  [autoSave]
);

// Использовать debouncedAutoSave вместо autoSave
useEffect(() => {
  if (step > 1 && step < 6) {
    const hasData = Object.values(formData).some((value) => 
      value && typeof value === 'string' && value.trim().length >= 10
    );
    if (hasData) {
      debouncedAutoSave();
    }
  }
}, [step, formData, debouncedAutoSave]);
```

### 2. Добавить валидацию на клиенте

**Файл:** `app/dashboard/memories/page.tsx`

**Проблема:** Валидация только на сервере, плохой UX

**Исправление:**
```typescript
import { validateData } from "@/lib/validation";
import { preferencesSchema } from "@/lib/validation";

const handleSave = async () => {
  // Валидация на клиенте перед отправкой
  const validation = validateData(preferencesSchema, formData);
  if (!validation.success) {
    setErrors(
      validation.errors.reduce((acc, err) => {
        const field = err.split(':')[0];
        acc[field] = err;
        return acc;
      }, {} as Record<string, string>)
    );
    alert("Please fix the errors before saving");
    return;
  }

  setLoading(true);
  // ... остальной код
};
```

### 3. Добавить localStorage fallback

**Файл:** `app/onboarding/page.tsx`

**Проблема:** Данные теряются при ошибках сети или истекшей сессии

**Исправление:**
```typescript
// Сохранение в localStorage
const saveToLocalStorage = (data: Record<string, string>) => {
  try {
    localStorage.setItem('memories_draft', JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

// Загрузка из localStorage
const loadFromLocalStorage = (): Record<string, string> | null => {
  try {
    const stored = localStorage.getItem('memories_draft');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Проверяем, что данные не старше 7 дней
      if (Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
    }
  } catch (error) {
    console.warn("Failed to load from localStorage:", error);
  }
  return null;
};

// В loadExistingData:
const loadExistingData = async () => {
  if (!user?.id) return;
  
  // Сначала пытаемся загрузить из localStorage (быстрее)
  const localData = loadFromLocalStorage();
  if (localData && Object.keys(localData).length > 0) {
    setFormData(localData);
  }
  
  // Затем загружаем с сервера (актуальные данные)
  try {
    const response = await fetch("/api/preferences");
    if (response.ok) {
      const data = await response.json();
      if (data.preferences?.interview_data) {
        setFormData(data.preferences.interview_data);
        // Обновляем localStorage
        saveToLocalStorage(data.preferences.interview_data);
      }
    }
  } catch (error) {
    console.error("Error loading from server, using localStorage data");
  }
};

// В autoSave и handleSubmit:
const autoSave = useCallback(async () => {
  // Сохраняем в localStorage сразу
  saveToLocalStorage(formData);
  
  // Затем пытаемся сохранить на сервер
  try {
    const response = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      // Успешно сохранено, можно очистить localStorage
      localStorage.removeItem('memories_draft');
    }
  } catch (error) {
    console.warn("Auto-save failed, data saved to localStorage");
  }
}, [formData]);
```

### 4. Улучшить обработку дубликатов email

**Файл:** `lib/api.ts` - функция `createFamilyMember`

**Проблема:** Нет обработки дубликатов email

**Исправление:**
```typescript
export async function createFamilyMember(
  preferencesId: string,
  memberData: Omit<FamilyMember, "id" | "preferences_id" | "sharing_link_token" | "created_at" | "invited_at">
): Promise<FamilyMember | null> {
  // ... существующий код проверки ...

  const supabase = await createClient();
  
  // Проверяем, не существует ли уже член семьи с таким email
  const { data: existing } = await supabase
    .from("family_members")
    .select("id, email, name")
    .eq("preferences_id", preferencesId)
    .eq("email", memberData.email)
    .maybeSingle();
  
  if (existing) {
    console.warn("Family member with this email already exists");
    return existing; // Возвращаем существующего или null, в зависимости от логики
  }

  // Генерируем уникальный sharing token
  const sharingToken = generateSharingToken();

  const { data, error } = await supabase
    .from("family_members")
    .insert({
      preferences_id: preferencesId,
      name: memberData.name,
      email: memberData.email,
      relationship: memberData.relationship || "other",
      access_level: memberData.access_level || "view",
      sharing_link_token: sharingToken,
    })
    .select()
    .single();

  if (error) {
    // Обработка дубликатов
    if (error.code === '23505') {
      console.warn("Duplicate family member detected");
      // Попробуем найти существующего
      const { data: existingMember } = await supabase
        .from("family_members")
        .select("*")
        .eq("preferences_id", preferencesId)
        .eq("email", memberData.email)
        .single();
      
      if (existingMember) {
        return existingMember;
      }
    }
    console.error("Error creating family member:", error);
    return null;
  }

  // ... остальной код ...
}
```

### 5. Добавить retry для connection errors

**Файл:** `lib/api.ts` - функция `getUserPreferences`

**Проблема:** Нет retry для connection errors

**Исправление:**
```typescript
export async function getUserPreferences(userId: string): Promise<Preferences | null> {
  const maxRetries = 3;
  let lastError: any = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("preferences")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        // Not found is not an error
        if (error.code === "PGRST116" || error.message?.includes("No rows")) {
          return null;
        }
        
        // Retry for connection errors
        if (isConnectionError(error) && attempt < maxRetries - 1) {
          lastError = error;
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
          continue;
        }
        
        console.error("Error fetching preferences:", error);
        return null;
      }

      return data;
    } catch (error) {
      lastError = error;
      if (isConnectionError(error) && attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        continue;
      }
    }
  }
  
  console.error("Exception in getUserPreferences after retries:", lastError);
  return null;
}
```

---

## ⚠️ Важные улучшения (средний приоритет)

### 6. Добавить проверку на добавление самого себя

**Файл:** `app/api/family/invite/route.ts`

```typescript
// После получения userId
const currentUser = await getCurrentUser();
if (currentUser?.email && currentUser.email.toLowerCase() === email.toLowerCase()) {
  return NextResponse.json(
    { error: "You cannot invite yourself" },
    { status: 400 }
  );
}
```

### 7. Улучшить обработку ошибок email

**Файл:** `app/api/family/invite/route.ts`

```typescript
// После отправки email
if (!emailSent) {
  // Логируем, но не блокируем создание члена семьи
  console.error("Failed to send email, but member was created");
  // Можно добавить флаг для повторной отправки позже
}

return NextResponse.json({
  success: true,
  shareUrl,
  accessToken: newMember.sharing_link_token,
  member: newMember,
  emailSent,
  warning: !emailSent ? "Member created but email was not sent. You can resend the invitation later." : undefined,
});
```

### 8. Добавить индикатор сохранения

**Файл:** `app/dashboard/memories/page.tsx`

```typescript
const [saving, setSaving] = useState(false);
const [lastSaved, setLastSaved] = useState<Date | null>(null);

const handleSave = async () => {
  setSaving(true);
  try {
    // ... код сохранения ...
    if (response.ok) {
      setLastSaved(new Date());
      // Показываем успешное сообщение
    }
  } finally {
    setSaving(false);
  }
};

// В UI добавить:
{saving && <div className="text-sm text-gray-500">Saving...</div>}
{lastSaved && !saving && (
  <div className="text-sm text-green-600">
    Saved at {lastSaved.toLocaleTimeString()}
  </div>
)}
```

---

## 📊 Метрики для отслеживания

### Рекомендуется добавить:

1. **Использование fallback методов:**
   - Количество использований legacy shared_access
   - Количество retry попыток
   - Количество failed auto-saves

2. **Ошибки:**
   - Частота connection errors
   - Частота validation errors
   - Частота duplicate errors

3. **Производительность:**
   - Время сохранения воспоминаний
   - Время загрузки воспоминаний
   - Время создания члена семьи

---

## ✅ Чеклист для проверки

- [ ] Добавлен debounce для auto-save
- [ ] Добавлена валидация на клиенте
- [ ] Добавлен localStorage fallback
- [ ] Улучшена обработка дубликатов email
- [ ] Добавлен retry для connection errors
- [ ] Добавлена проверка на добавление самого себя
- [ ] Улучшена обработка ошибок email
- [ ] Добавлен индикатор сохранения
- [ ] Добавлены тесты для критических функций
- [ ] Добавлены метрики для отслеживания

---

**END OF QUICK FIXES**

Эти исправления значительно улучшат надежность и пользовательский опыт приложения.

