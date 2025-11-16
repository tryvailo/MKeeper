-- SQL схема для Supabase

-- Таблица пользовательских предпочтений
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  age INTEGER,
  location TEXT,
  funeral_type TEXT CHECK (funeral_type IN ('cremation', 'traditional', 'eco', 'other')),
  preferred_location TEXT,
  memorial_service_type TEXT,
  wishes TEXT,
  music_preferences TEXT,
  flower_preferences TEXT,
  guest_preferences TEXT,
  text_preferences TEXT,
  files TEXT[], -- массив URL файлов
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица для шаринга доступа
CREATE TABLE IF NOT EXISTS shared_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  preference_id UUID NOT NULL REFERENCES user_preferences(id) ON DELETE CASCADE,
  shared_with_email TEXT NOT NULL,
  access_token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица логов активности
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_access_token ON shared_access(access_token);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) политики
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи могут видеть только свои предпочтения
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid()::text = user_id);

-- Политика: пользователи могут создавать свои предпочтения
CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Политика: пользователи могут обновлять свои предпочтения
CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Политика: пользователи могут удалять свои предпочтения
CREATE POLICY "Users can delete own preferences"
  ON user_preferences FOR DELETE
  USING (auth.uid()::text = user_id);

-- Политика для shared_access: доступ по токену
CREATE POLICY "Shared access by token"
  ON shared_access FOR SELECT
  USING (true); -- будет проверяться через API

-- Политика для activity_logs: пользователи видят только свои логи
CREATE POLICY "Users can view own activity logs"
  ON activity_logs FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

