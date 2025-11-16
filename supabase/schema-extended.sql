-- Расширенная схема базы данных для DearAfter Registry
-- Выполнить после базовой схемы schema.sql

-- Таблица пользователей (расширенная)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL,
  age_range VARCHAR CHECK (age_range IN ('45-54', '55-64', '65-74', '75+')),
  location VARCHAR,
  tier VARCHAR DEFAULT 'free' CHECK (tier IN ('free', 'premium')),
  tier_started_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE -- soft delete
);

-- Расширенная таблица предпочтений
CREATE TABLE IF NOT EXISTS preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Основная информация
  funeral_type VARCHAR CHECK (funeral_type IN ('traditional', 'cremation_service', 'direct_cremation', 'eco', 'unsure')),
  budget_range VARCHAR CHECK (budget_range IN ('1000-2000', '2000-3500', '3500-5000', '5000+', 'unsure')),
  
  -- Executor информация
  executor_name VARCHAR,
  executor_email VARCHAR,
  executor_relationship VARCHAR CHECK (executor_relationship IN ('spouse', 'partner', 'child', 'friend', 'solicitor', 'other')),
  
  -- Детали церемонии (JSON для гибкости)
  ceremony_details JSONB,
  
  -- Музыка и чтения
  music_preferences TEXT,
  readings_preferences TEXT,
  eulogy_by VARCHAR,
  
  -- Цветы и декор
  flower_preferences TEXT,
  color_preferences TEXT,
  decoration_preferences TEXT,
  
  -- Еда и прием
  reception_wanted BOOLEAN,
  reception_venue TEXT,
  reception_food TEXT,
  reception_budget INTEGER,
  
  -- Другие пожелания
  charity_donations TEXT,
  dress_code TEXT,
  other_wishes TEXT,
  things_not_wanted TEXT,
  
  -- Метаданные
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Семейные члены с доступом
CREATE TABLE IF NOT EXISTS family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  preferences_id UUID NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  relationship VARCHAR CHECK (relationship IN ('spouse', 'partner', 'child', 'friend', 'solicitor', 'other')),
  access_level VARCHAR DEFAULT 'view' CHECK (access_level IN ('view', 'view_and_comment', 'executor')),
  sharing_link_token VARCHAR UNIQUE NOT NULL,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Файлы и медиа
CREATE TABLE IF NOT EXISTS files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  preferences_id UUID NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  file_name VARCHAR NOT NULL,
  file_type VARCHAR CHECK (file_type IN ('image', 'audio', 'document', 'other')),
  file_size INTEGER NOT NULL,
  storage_path VARCHAR NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Комментарии от семьи
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  preferences_id UUID NOT NULL REFERENCES preferences(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Уведомления
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL CHECK (type IN ('annual_reminder', 'family_update', 'share_accepted', 'new_comment', 'preferences_updated')),
  message TEXT NOT NULL,
  metadata JSONB,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Подписки
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_preferences_id ON family_members(preferences_id);
CREATE INDEX IF NOT EXISTS idx_family_members_token ON family_members(sharing_link_token);
CREATE INDEX IF NOT EXISTS idx_files_preferences_id ON files(preferences_id);
CREATE INDEX IF NOT EXISTS idx_comments_preferences_id ON comments(preferences_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- RLS политики
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Политики для users
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = id);

-- Политики для preferences
CREATE POLICY "Users can view own preferences" ON preferences FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can insert own preferences" ON preferences FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "Users can update own preferences" ON preferences FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "Users can delete own preferences" ON preferences FOR DELETE USING (auth.uid()::text = user_id);

-- Политики для notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid()::text = user_id);

-- Политики для subscriptions
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid()::text = user_id);

