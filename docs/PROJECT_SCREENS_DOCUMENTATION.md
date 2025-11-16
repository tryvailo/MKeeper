# Memory Keeper - Полная Документация Экранов

**Версия:** 2.0 (Memory Keeper Adaptation)  
**Дата:** Декабрь 2024  
**Статус:** Production Ready - Dementia-Focused Product



## Содержание

1. [Лендинг (Landing Page)](#1-лендинг-landing-page)
2. [Дашборд (Dashboard)](#2-дашборд-dashboard)
3. [Онбординг (Onboarding)](#3-онбординг-onboarding)
4. [Страницы Дашборда](#4-страницы-дашборда)
5. [Вспомогательные Страницы](#5-вспомогательные-страницы)
6. [Страницы Ошибок](#6-страницы-ошибок)

---

## 1. Лендинг (Landing Page)

**Путь:** `/`  
**Файл:** `app/page.tsx`  
**Тип:** Публичная страница

### Структура страницы

#### 1.1. Header/Navbar
- **Логотип:** Memory Keeper (с иконкой)
- **Навигация:**
  - How it works
  - Stories (вместо Testimonials)
  - Help
  - FAQ
- **Правая часть:**
  - Для неавторизованных: "Login" и "Start Remembering"
  - Для авторизованных: "Dashboard" и UserButton

#### 1.2. Hero Section
**Заголовок:**
```
Save what matters before memories fade
```

**Подзаголовок:**
```
A simple way to capture what makes them who they are. Before dementia takes those memories away.
```

**CTA кнопка:**
- Для неавторизованных: "Start Remembering" (открывает модальное окно регистрации)
- Для авторизованных: "Go to Dashboard"

**Вторичный текст:**
```
Completely free. Takes 15 minutes. Your family will treasure this forever.
```

**Trust indicators:**
- ✓ Trusted by 200+ dementia families
- ✓ Recommended by Alzheimer's Society members
- ✓ Bank-level encryption

#### 1.3. Problem Section ("Why Memory Keeper?")
**Заголовок:** `Why Memory Keeper?`

**Три карточки:**

**Карточка 1:**
- **Иконка:** Brain
- **Заголовок:** "Their memories are slipping away"
- **Описание:** "As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. But you can save those things. Before it's too late."

**Карточка 2:**
- **Иконка:** Heart
- **Заголовок:** "Not just facts. Their *why*."
- **Описание:** "Your family needs to hear their voice—not just what they wanted, but why it mattered. Memory Keeper captures the person, not just the preferences."

**Карточка 3:**
- **Иконка:** Hourglass
- **Заголовок:** "The time to capture this is now"
- **Описание:** "Early dementia is a window. They can still tell coherent stories. Their personality is clear. In six months or a year, that might not be true. This is the moment."

#### 1.4. Solution Section ("How it works in 3 steps")
**Заголовок:** `How it works in 3 steps`

**Три карточки:**

**Шаг 1:**
- **Иконка:** FileText
- **Заголовок:** "Write down what matters"
- **Подзаголовок:** "Five minutes well spent"
- **Описание:** "A simple questionnaire walks you through the important decisions: what kind of send-off suits you, who should lead it, what music, readings, flowers matter. No jargon. No pressure. Just your story."

**Шаг 2:**
- **Иконка:** Share2
- **Заголовок:** "Invite the people who matter"
- **Подзаголовок:** "One click away"
- **Описание:** "Share your preferences privately with family members, your executor, or anyone you trust. They see exactly what you want. No surprises. No arguments. No guessing."

**Шаг 3:**
- **Иконка:** Lock
- **Заголовок:** "Your wishes, always at hand"
- **Подзаголовок:** "Forever accessible"
- **Описание:** "Encrypted, secure, always accessible. Whether it's tomorrow or twenty years from now, your family knows exactly where to find your wishes and what to do."

**CTA внизу:** "Create Your Registry Now"

#### 1.5. Testimonials Section
**Заголовок:** `Families love DearAfter`

**Три отзыва:**

**Отзыв 1:**
```
"When my mum was diagnosed, we weren't sure how to talk about what came next. With DearAfter, it became this beautiful conversation. She documented everything—from the music she wanted to how she wanted us to celebrate her life. When she passed, we weren't grieving alone, wondering what she'd have wanted. We knew. We felt her presence in every decision. It brought us closer, not apart."
— Sarah, 42 | Manchester
```

**Отзыв 2:**
```
"In 25 years of will-writing, I've seen families torn apart by not knowing what the deceased wanted. With DearAfter, clients are having these conversations early. They're putting their values down. When I see a client with their DearAfter registry saved alongside their will, I know that family is going to be okay. Not just legally, but emotionally. They've got a roadmap from their loved one."
— James, Solicitor | London
```

**Отзыв 3:**
```
"I spent years not wanting to burden my children with these conversations. With DearAfter, it didn't feel like a burden—it felt like I was giving them a gift. I wrote everything down: my wishes, yes, but also little notes about why I wanted things a certain way. Now my kids have a guide written in my own voice. Even after I'm gone, they can hear me. That gives me real peace."
— Margaret, 68 | Bristol
```

#### 1.6. Pricing Section
**Заголовок:** `Choose Your Path`  
**Подзаголовок:** `All plans include basic preferences. Choose how deep you want to go.`

**Четыре ценовых плана:**

##### STARTER (Free)
- **Цена:** Free
- **Tagline:** "Get your wishes documented"
- **Включено:**
  - ✓ Basic funeral preferences
  - ✓ PDF download (with DearAfter watermark)
  - ✓ Share with 1 family member
  - ✓ Access for 1 year
- **Не включено:**
  - ✗ Personal story section
  - ✗ Video messages
  - ✗ Email reminders
- **CTA:** "Start Free"
- **Подтекст:** "No credit card required. Get your wishes in writing today."

##### EMOTIONAL (£49/year) - MOST POPULAR
- **Бейдж:** "MOST POPULAR"
- **Цена:** £49/year (£4.08 per month • Billed annually)
- **Tagline:** "Your family understands you"
- **Включено:**
  - ✓ Everything in Starter, plus:
  - ✓ Complete personal story questionnaire (45+ prompts)
  - ✓ Memory capsule builder
  - ✓ Guided goodbye letter prompts
  - ✓ Executor emotional support guide
  - ✓ Share with up to 5 family members
  - ✓ PDF download (no watermark)
  - ✓ Annual reminder email
  - ✓ Basic family dashboard
  - ✓ Email support
- **Не включено:**
  - ✗ Video messages
  - ✗ Legacy letters (auto-delivery)
- **CTA:** "Choose Emotional Plan"
- **Подтекст:** "Most families choose this one. It's the complete experience."

##### COMPLETE (£99/year)
- **Цена:** £99/year (£8.25 per month • Billed annually)
- **Tagline:** "Your legacy, fully secured"
- **Включено:**
  - ✓ Everything in Emotional, plus:
  - ✓ Record HD video messages (multiple)
  - ✓ Legacy letters with auto-delivery
  - ✓ Unlimited family members
  - ✓ Monthly reminder emails
  - ✓ Advanced executor dashboard
  - ✓ Funeral director integration
  - ✓ Solicitor coordination tools
  - ✓ Phone support (UK hours)
  - ✓ Priority access to new features
- **CTA:** "Choose Complete Plan"
- **Подтекст:** "Perfect for families wanting full peace of mind."

##### PREMIUM PRINT (£149/year)
- **Цена:** £149/year (£12.42 per month • Billed annually)
- **Tagline:** "Your story, beautifully preserved"
- **Включено:**
  - ✓ Everything in Complete, plus:
  - ✓ Beautiful printed hardcover book (50-60 pages)
  - ✓ Full-color layout
  - ✓ Custom cover design
  - ✓ Shipped to your home
  - ✓ Digital backup included
  - ✓ Gift presentation ready
- **CTA:** "Choose Premium Print Plan"
- **Подтекст:** "Create a lasting physical legacy your family treasures."

**Футер секции:**
```
All plans are billed annually. Cancel anytime within 30 days.
```

#### 1.7. FAQ Section
**Заголовок:** `Frequently Asked Questions`

**Вопросы:**

1. **Is this as good as a proper will?**
   - "No, and we don't pretend it is. DearAfter documents your wishes about your funeral. A proper will handles your estate. You need both. We recommend: work with a solicitor on your will (if you haven't already), then use DearAfter to get specific about your funeral wishes. They work together."

2. **How do I know my information is private?**
   - "We take privacy seriously. Your data is encrypted, stored on secure UK servers, and complies fully with GDPR. You can download or delete all your data anytime. We don't sell your information. We don't share it with anyone. Full stop."

3. **What if my mind changes, or circumstances do?**
   - "Update whenever you want. Your family can be notified, or you can keep it private. Life changes. Your DearAfter should too."

4. **What happens to my DearAfter if I pass away?**
   - "Your family members or executor can access your preferences if you've shared the link with them (which we recommend). Or you can keep a copy of your password somewhere safe—like with your will or in a letter to your executor. Your DearAfter never disappears. It's there for your family, whenever they need it."

5. **Can I change my mind later?**
   - "Yes. You can update, edit, or delete anytime. Permanently delete your account and all data in your settings."

6. **I still have questions. Who do I talk to?**
   - "Email support@dearafter.com. Chat with us on the site. Ring us on +44(0)20 XXXX XXXX (9am-5pm, Mon-Fri GMT). We're here to help."

7. **Do I need to be worried or sad using DearAfter?**
   - "No. We designed this for people planning ahead calmly. Some use it with family (a beautiful conversation). Some do it quietly on their own. Either way, it feels less like death planning and more like legacy planning. You're in control."

#### 1.8. Footer
**Структура:**
- **Колонка 1:** О компании
  - Заголовок: "DearAfter"
  - Описание: "DearAfter helps families document funeral wishes and share them securely with loved ones."
- **Колонка 2:** Links
  - Privacy Policy
  - Terms
  - Contact
- **Колонка 3:** Social
  - Twitter
  - Facebook
  - LinkedIn
- **Колонка 4:** Newsletter
  - Поле ввода email
  - Кнопка "Subscribe"

**Копирайт:** "© 2025 DearAfter. All rights reserved."

---

## 2. Дашборд (Dashboard)

**Путь:** `/dashboard`  
**Файл:** `app/dashboard/page.tsx`  
**Тип:** Защищенная страница (требует авторизации)

### Структура страницы

#### 2.1. Header
- **Логотип:** DearAfter (с иконкой)
- **Правая часть:**
  - Кнопка "Help" (ведет на `/help`)
  - Кнопка "Settings" (ведет на `/settings`)

#### 2.2. Sidebar Navigation
**Список ссылок:**
- My Registry (активная)
- Family Members
- Sharing & Permissions
- Reminders
- History & Activity
- View Preferences
- Notifications
- Files
- Comments
- Premium
- Settings

#### 2.3. Main Content

##### Welcome Banner (условно показывается)
**Заголовок:** "Welcome. You've got this covered now."

**Текст:**
```
Your wishes are documented and safe. Here's what's next:
```

**Действия:**
- Download PDF
- Share with Family
- Edit Preferences

**Кнопка закрытия:** ×

##### Status Card
**Заголовок:** "Your Wishes Are Saved"

**Информация:**
- **Last updated:** Дата последнего обновления + "(feeling confident about that?)"
- **Next check-in:** Дата через год
- **Shared with:** "0 people who you trust"
- **Status:** "All set. Your family knows what to do." (с иконкой CheckCircle2)

**CTA:** "Edit Preferences"

##### Primary Actions (3 карточки)

**Карточка 1: "Save It Somewhere Safe"**
- **Иконка:** Download
- **Заголовок:** "Save It Somewhere Safe"
- **Описание:** "Your wishes in a format you can print, store with your will, or email to trusted people."
- **CTA:** "Download PDF"

**Карточка 2: "Let Them Know"**
- **Иконка:** Users
- **Заголовок:** "Let Them Know"
- **Описание:** "Give your family and executor access. They can read, comment, or just know where to find it when needed."
- **Форма:**
  - Поле ввода email: "Recipient email"
  - Кнопка: "Share Now" / "Sending that email..."

**Карточка 3: "Change Your Mind"**
- **Иконка:** Edit
- **Заголовок:** "Change Your Mind"
- **Описание:** "Life changes. Your wishes can too. Update anytime. Your family stays in the loop."
- **CTA:** "Edit Now"

##### Quick View: Your Preferences
**Заголовок:** "Your Preferences at a Glance"

**Отображаемые поля:**
- Funeral Type
- Budget
- Executor
- Key Wish (первая строка из music_preferences)

**CTA:** "View Full Details"

##### Premium Upgrade Card
**Стиль:** Желтая рамка, желтый фон

**Заголовок:** "Want to go deeper?" (с иконкой Crown)

**Бейдж:** "Free tier"

**Текст:**
```
Premium (£9/year) lets you record a message to your family. Write letters they'll receive after. Share with unlimited people.

Think of it as insurance for your legacy.
```

**Список преимуществ:**
- ✓ Unlimited family members
- ✓ Record video message (2 min)
- ✓ Legacy letters (auto-deliver to family)
- ✓ Priority support

**CTA:** "Upgrade Now - Only £9/year"

##### Activity Log
**Заголовок:** "Recent Activity"

**Отображает:**
- Последние 5 действий
- Тип действия (created_preferences, updated_preferences, generated_pdf, shared_preferences)
- Детали (если есть)
- Дата

**Пустое состояние:** "Your log is empty. Updates will show up here."

**CTA:** "View Full History"

---

## 3. Онбординг (Onboarding)

**Путь:** `/onboarding`  
**Файл:** `app/onboarding/page.tsx`  
**Тип:** Защищенная страница (требует авторизации)

### Структура страницы

#### 3.1. Header
**Заголовок:** "Let's get to know your wishes"

**Подзаголовок:** "Take your time. There's no rush. You can save after each step and come back anytime."

#### 3.2. Progress Indicator
- Текст: "Step X of 6"
- Процент: "X%"
- Прогресс-бар

#### 3.3. Шаги

##### Step 1: Funeral Type
**Вопрос:** "What kind of send-off feels right for you?"

**Подтекст:** "Don't worry if you're not sure. These are just starting points to help you think it through."

**Варианты:**
1. **Traditional Service** (Church icon)
   - "A full funeral with viewing, ceremony, and a service. Time for people to gather and say goodbye properly."
   - "Typical cost: £3,000-5,000"

2. **Cremation + Celebration** (Flame icon)
   - "Cremation followed by a memorial service with family and friends. More intimate."
   - "Typical cost: £2,000-3,500"

3. **Direct Cremation** (FileText icon)
   - "Cremation without a ceremony. Simple and straightforward. Your family can have a separate gathering if they choose."
   - "Most affordable: £1,000-1,500"

4. **Eco Funeral** (Leaf icon)
   - "Biodegradable coffin, woodland burial, or natural burial site. For those who want to give back to nature."
   - "Typical cost: £2,500-4,000"

5. **I haven't decided yet** (HelpCircle icon)
   - "And that's okay. We can explore options together."

**Навигация:** "Next" / "Back"

##### Step 2: Budget
**Вопрос:** "What's a comfortable budget for you?"

**Подтекст:** "This helps your family understand your expectations. No judgment. Just practical guidance."

**Варианты:**
- Under £2,000
- £2,000-3,500
- £3,500-5,000
- £5,000+
- I'm not sure yet

##### Step 3: Executor
**Вопрос:** "Who will lead the way?"

**Подтекст:** "This person will help carry out your wishes. They can be a family member, friend, or solicitor."

**Поля:**
- Name (текстовое поле)
- Email (email поле)
- Relationship (выпадающий список):
  - Spouse
  - Long-term partner
  - Adult son or daughter
  - Trusted friend
  - Solicitor
  - Other

##### Step 4: Funeral Wishes
**Вступление:** "Now for the fun part: tell us what matters to you"

**Подсекции:**

**4.1. Ceremony**
- **Вопрос:** "Would you like a ceremony?"
- **Варианты:** Yes / No / Maybe—let my family decide
- **Дополнительные поля:**
  - "Where do you imagine this happening?" (текстовое поле)
  - "Religious, cultural, or personal traditions" (текстовое поле)

**4.2. Music & Readings**
- **Вопрос:** "What music should play?" (textarea)
- **Вопрос:** "Poems, readings, or passages" (textarea)
- **Вопрос:** "Who would you trust to tell your story?" (текстовое поле)

**4.3. Flowers & Decorations**
- **Вопрос:** "What flowers or plants feel right?" (textarea)
- **Вопрос:** "What colours would you want?" (текстовое поле)
- **Вопрос:** "Any other decorations or details?" (textarea)

**4.4. Food & Reception**
- **Вопрос:** "Would you like a reception afterward?"
- **Варианты:** Yes / No / A small gathering at home
- **Если Yes:**
  - "Where would you want it?" (текстовое поле)
  - "What should people eat and drink?" (textarea)
  - "What's a comfortable budget?" (числовое поле)

**4.5. Other Wishes**
- **Вопрос:** "Charities or causes for donations" (textarea)
- **Вопрос:** "Dress code" (текстовое поле)
- **Вопрос:** "Anything else that would make this feel like *you*?" (textarea)
- **Вопрос:** "What would you *not* want?" (textarea)

##### Step 5: Personal Notes
**Вопрос:** "Add your own touch (optional)"

**Подтекст:** "Anything else you want your family to know? A personal message, a memory, or just your voice in your own words."

**Поле:** Большое textarea

##### Step 6: Review & Confirm
**Заголовок:** "Review Your Preferences"

**Подзаголовок:** "Nothing here is set in stone. Change your mind anytime. Update your wishes whenever you want."

**Отображение:** Все заполненные данные в читаемом формате

**Чекбокс:** "I've reviewed everything and I'm ready to save"

**CTA:** "Save My Wishes"

#### 3.4. Навигация
- Кнопки "Back" и "Next" на каждом шаге
- Автосохранение при переходе между шагами

---

## 4. Страницы Дашборда

### 4.1. View Preferences
**Путь:** `/dashboard/preferences`  
**Файл:** `app/dashboard/preferences/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Your Wishes"
  - Действия: Download PDF, Share, Edit

- **Main Content:**
  - Дата последнего обновления
  - Карточки с секциями:
    - What kind of send-off (с иконкой типа)
    - Who will lead the way (Executor)
    - The ceremony - or not
    - The soundtrack to your life (Music & Readings)
    - The beauty around you (Flowers & Decorations)
    - Gathering together (Reception)
    - The finishing touches (Other Wishes)

- **CTA внизу:**
  - "Change Your Mind" (Edit)
  - "Save It Somewhere Safe" (Download PDF)

### 4.2. Family Members
**Путь:** `/dashboard/family`  
**Файл:** `app/dashboard/family/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Family Members"

- **Main Content:**
  - **Карточка "Who Has Access?":**
    - Кнопка "Add Family Member"
    - **Форма добавления (условно показывается):**
      - Email (обязательное)
      - Name (опциональное)
      - Relationship (выпадающий список)
      - Access Level (выпадающий список):
        - View only
        - View & Comment
        - Executor
      - Кнопки: "Send Invitation", "Cancel"
    
    - **Список членов семьи:**
      - Аватар
      - Имя/Email
      - Relationship
      - Статус (Accepted/Pending)
      - Access Level badge
      - Действия: Edit, Delete

- **Пустое состояние:**
  - Иконка Users
  - Текст: "Looks like you haven't invited anyone yet. Add their names when you're ready."
  - Кнопка "Add Family Member"

### 4.3. Sharing & Permissions
**Путь:** `/dashboard/sharing`  
**Файл:** `app/dashboard/sharing/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Sharing & Permissions"

- **Main Content:**
  - **Карточка "Share via Email":**
    - Email Address (обязательное)
    - Name (опциональное)
    - Relationship (выпадающий список)
    - Access Level (выпадающий список)
    - Кнопка "Send Link"
  
  - **Карточка "Active Share Links":**
    - Список активных ссылок:
      - Email получателя
      - Полный URL ссылки
      - Дата создания
      - Действия: Copy, Delete
    - Пустое состояние: "No shared links yet. Create one to give someone access."

### 4.4. Notifications
**Путь:** `/dashboard/notifications`  
**Файл:** `app/dashboard/notifications/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Notifications"

- **Main Content:**
  - **Фильтры:**
    - All
    - Unread
    - Read
  
  - **Список уведомлений:**
    - Тип уведомления (иконка)
    - Заголовок
    - Описание
    - Дата/время
    - Статус (прочитано/не прочитано)
    - Действие: Mark as read/Delete

- **Пустое состояние:**
  - "No notifications yet"

### 4.5. Premium
**Путь:** `/dashboard/premium`  
**Файл:** `app/dashboard/premium/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Иконка Crown + "Premium"

- **Main Content:**
  - **Hero Section:**
    - Заголовок: "Premium (just £9/year)"
    - Подзаголовок: "The cost of two coffees. The value is immeasurable."
    - Текст: "Think of it as insurance for your legacy."
  
  - **Comparison (2 колонки):**
    - **Free Plan:**
      - Список функций
      - Кнопка "Current Plan" (disabled)
    
    - **Premium Plan:**
      - Список функций
      - Кнопка "Upgrade Now"
  
  - **Testimonials Section:**
    - 2-3 отзыва о Premium
  
  - **FAQ Section:**
    - Вопросы о Premium

### 4.6. Video Message
**Путь:** `/dashboard/video-message`  
**Файл:** `app/dashboard/video-message/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Video Message"

- **Main Content:**
  - **Инструкции:**
    - Текст о важности видео сообщения
  
  - **Запись:**
    - Видео превью
    - Кнопки: Start Recording, Stop Recording, Save, Delete
    - Или: File input для загрузки видео
  
  - **Сохраненные видео:**
    - Список записанных видео
    - Превью
    - Действия: Play, Delete

### 4.7. Legacy Letters
**Путь:** `/dashboard/legacy-letters`  
**Файл:** `app/dashboard/legacy-letters/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Legacy Letters"

- **Main Content:**
  - **Список писем:**
    - Заголовок письма
    - Получатель
    - Дата создания
    - Статус (Draft/Scheduled/Delivered)
    - Действия: Edit, Delete
  
  - **Форма создания/редактирования:**
    - Заголовок
    - Получатель (выпадающий список)
    - Rich text editor для текста письма
    - Toggle: "Auto-deliver after my passing"
    - Кнопки: Save, Cancel

### 4.8. Executor Dashboard
**Путь:** `/dashboard/executor`  
**Файл:** `app/dashboard/executor/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Executor Dashboard"

- **Main Content:**
  - **Quick Actions:**
    - View Preferences
    - Download PDF
    - Contact Family
  
  - **Executor Notes:**
    - Textarea для заметок
    - Кнопка "Save Notes"
  
  - **Family Members:**
    - Список членов семьи с контактами

### 4.9. Files
**Путь:** `/dashboard/files`  
**Файл:** `app/dashboard/files/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Files"

- **Main Content:**
  - **Категории загрузки:**
    - Legal Documents
    - Photos
    - Other Files
  
  - **Список файлов:**
    - Иконка типа файла
    - Название
    - Размер
    - Дата загрузки
    - Категория
    - Действия: Preview, Download, Delete
  
  - **Превью файла:**
    - Модальное окно с превью

### 4.10. Comments
**Путь:** `/dashboard/comments`  
**Файл:** `app/dashboard/comments/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Comments"

- **Main Content:**
  - **Секции комментариев:**
    - По секциям предпочтений (Ceremony, Music, etc.)
  
  - **Комментарий:**
    - Аватар автора
    - Имя автора
    - Текст комментария
    - Дата/время
    - Ответы (threaded)
    - Действия: Reply, Delete
  
  - **Форма добавления комментария:**
    - Textarea
    - Кнопка "Add Comment"

### 4.11. History & Activity
**Путь:** `/dashboard/history`  
**Файл:** `app/dashboard/history/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "History & Activity"

- **Main Content:**
  - **Фильтры:**
    - All
    - Preferences
    - Sharing
    - Downloads
  
  - **Список действий:**
    - Тип действия (иконка)
    - Описание
    - Дата/время
    - Детали (если есть)
  
  - **Пустое состояние:**
    - "Your log is empty. Updates will show up here."

### 4.12. Reminders
**Путь:** `/dashboard/reminders`  
**Файл:** `app/dashboard/reminders/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Reminders"

- **Main Content:**
  - **Настройки напоминаний:**
    - Frequency (Annual, Quarterly, Monthly)
    - Email notifications (toggle)
    - Next reminder date
  
  - **История напоминаний:**
    - Дата отправки
    - Статус (Sent, Opened)
    - Действие: Resend

---

## 5. Вспомогательные Страницы

### 5.1. Onboarding Complete
**Путь:** `/onboarding/complete`  
**Файл:** `app/onboarding/complete/page.tsx`

#### Структура
- **Hero:**
  - Иконка CheckCircle2 (зеленый круг)
  - Заголовок: "Your wishes are saved"
  - Подзаголовок: "Well done. You've taken an important step."
  - Текст: "Your preferences are documented and safe. Here's what you can do next:"

- **Три карточки действий:**
  1. **Save it somewhere safe**
     - Иконка: FileText
     - Описание: "Download your preferences as a PDF. Print it, store it with your will, or email it to trusted people."
     - CTA: "Download PDF"
  
  2. **Let them know**
     - Иконка: Users
     - Описание: "Share your preferences with family members or your executor. They can read, comment, or just know where to find it when needed."
     - CTA: "Share with Family"
  
  3. **Change your mind**
     - Иконка: Edit
     - Описание: "Life changes. Your wishes can too. Update anytime. Your family stays in the loop."
     - CTA: "Edit Preferences"

- **Premium Card:**
  - Иконка: Sparkles
  - Заголовок: "Want to go deeper?"
  - Текст: "Premium (£9/year) lets you record a message to your family. Write letters they'll receive after. Share with unlimited people."
  - CTA: "Learn More About Premium"

- **CTA внизу:**
  - "Go to Dashboard"

- **Подтекст:**
  - "Nothing here is set in stone. Change your mind anytime. Update your wishes whenever you want."

### 5.2. Help
**Путь:** `/help`  
**Файл:** `app/help/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Help & Support"

- **Search:**
  - Поле поиска: "Got a question? We probably covered it."
  - Иконка Search

- **FAQ Sections (Accordion):**
  1. **General**
     - What is DearAfter Registry?
     - Is this as good as a proper will?
     - Who should use DearAfter?
     - How much does it cost?
  
  2. **Privacy & Security**
     - How do I know my information is private?
     - Is DearAfter GDPR compliant?
     - Who can see my preferences?
     - Can DearAfter employees see my data?
  
  3. **Using DearAfter**
     - How do I create my preferences?
     - How do I share with family?
     - What if my mind changes, or circumstances do?
     - Can I change my mind later?
  
  4. **Premium**
     - What's included in Premium?
     - Is Premium worth it?
     - Can I cancel Premium?
  
  5. **What happens when you pass away**
     - What happens to my DearAfter if I pass away?
     - How do family members access my preferences?
     - Can I update my preferences after I'm gone?
  
  6. **Contact & Support**
     - How do I contact support?
     - What are your support hours?
     - Do I need to be worried or sad using DearAfter?

- **Contact Section:**
  - Email: support@dearafter.com
  - Phone: +44(0)20 XXXX XXXX
  - Hours: 9am-5pm, Mon-Fri GMT

### 5.3. Settings
**Путь:** `/settings`  
**Файл:** `app/settings/page.tsx`

#### Структура
- **Header:**
  - Кнопка "Back to Dashboard"
  - Логотип + "Settings"

- **Sidebar Navigation:**
  - Account
  - Privacy & Security
  - Billing
  - Notifications
  - Delete Account

- **Main Content (по табам):**

  **Account:**
  - Profile Information
    - Full Name
    - Email (disabled)
    - Кнопка "Save Changes"
  - Password
    - Кнопка "Change Password"
  - Login Activity
    - Last login date
    - Кнопка "View all login activity"

  **Privacy & Security:**
  - Two-Factor Authentication
    - Status: Off
    - Кнопка "Turn On"
  - Session Timeout
    - Выпадающий список (30 min, 1 hour, 2 hours)
  - Data Export
    - Кнопка "Download my data (GDPR download)"
  - GDPR Rights
    - Кнопки: View Privacy Policy, Download my data, Delete my account

  **Billing:**
  - Current Plan
    - Plan name (Free)
    - Кнопка "Upgrade to Premium (£9/year)"
  - Billing History
    - Список платежей или "No payments yet"

  **Notifications:**
  - Email Preferences
    - Чекбоксы:
      - Account updates
      - Annual reminders
      - Product updates
      - Marketing emails
    - Кнопка "Save preferences"
  - Notification Frequency
    - Выпадающий список (Immediately, Daily digest, Weekly digest)

  **Delete Account:**
  - Alert с предупреждением
  - Список того, что будет удалено
  - Кнопка "I understand, delete my account"
  - При подтверждении:
    - Текст: "This really will delete everything. Are you sure? This is permanent and we can't undo it."
    - Кнопки: "Yes, delete", "Cancel"

### 5.4. Privacy Policy
**Путь:** `/privacy`  
**Файл:** `app/privacy/page.tsx`

#### Структура
- **Header:**
  - Логотип + "Privacy Policy"

- **Main Content:**
  - GDPR-compliant privacy policy text
  - Разделы:
    - Data Collection
    - Data Usage
    - Data Storage
    - Your Rights
    - Contact Information

### 5.5. Terms of Service
**Путь:** `/terms`  
**Файл:** `app/terms/page.tsx`

#### Структура
- **Header:**
  - Логотип + "Terms of Service"

- **Main Content:**
  - Terms of Service text
  - Разделы:
    - Acceptance of Terms
    - Use of Service
    - User Responsibilities
    - Limitation of Liability
    - Changes to Terms

### 5.6. Contact
**Путь:** `/contact`  
**Файл:** `app/contact/page.tsx`

#### Структура
- **Header:**
  - Логотип + "Contact Support"

- **Main Content:**
  - **Contact Form:**
    - Name
    - Email
    - Subject
    - Message (textarea)
    - Кнопка "Send Message"
  
  - **Contact Information:**
    - Email: support@dearafter.com
    - Phone: +44(0)20 XXXX XXXX
    - Hours: 9am-5pm, Mon-Fri GMT
  
  - **Quick Links:**
    - Link to FAQ
    - Link to Help page

### 5.7. Family View (Shared Link)
**Путь:** `/family/[token]`  
**Файл:** `app/family/[token]/page.tsx`

#### Структура
- **Header:**
  - Логотип + "Shared Preferences"

- **Main Content:**
  - **Accept Invitation:**
    - Информация о том, кто поделился
    - Кнопка "Accept Invitation"
  
  - **View Preferences:**
    - Те же секции, что и в View Preferences
    - Но только для чтения (без редактирования)
  
  - **Comments Section:**
    - Если доступен уровень "view_and_comment" или "executor"
    - Форма добавления комментария
    - Список комментариев

---

## 6. Страницы Ошибок

### 6.1. 404 Not Found
**Путь:** `/404`  
**Файл:** `app/404/page.tsx`

#### Структура
- **Hero:**
  - Заголовок: "404"
  - Подзаголовок: "Page Not Found"
  - Текст: "The page you're looking for doesn't exist."
  - CTA: "Go to Dashboard" / "Go Home"

### 6.2. 500 Server Error
**Путь:** `/500`  
**Файл:** `app/500/page.tsx`

#### Структура
- **Hero:**
  - Заголовок: "500"
  - Подзаголовок: "Server Error"
  - Текст: "Something went wrong on our end. Please try again later."
  - CTA: "Go to Dashboard" / "Go Home"

---

## Технические Детали

### Компоненты UI
- Card, CardContent, CardDescription, CardHeader, CardTitle
- Button (разные варианты: default, outline, ghost, destructive)
- Input, Label
- Badge
- Accordion, AccordionContent, AccordionItem, AccordionTrigger
- Alert, AlertDescription

### Иконки (Lucide React)
- FileText, Users, Share2, Shield, Heart
- CheckCircle2, AlertCircle, Clock, Download, Lock
- Sparkles, X, Crown, MessageSquare, Folder
- Edit, ArrowLeft, Mail, Trash2, Search
- И другие по необходимости

### Аутентификация
- Clerk для управления пользователями
- SignedIn, SignedOut компоненты
- SignInButton, SignUpButton, UserButton

### Навигация
- Next.js App Router
- Link компонент для внутренней навигации
- useRouter для программной навигации

### Стилизация
- TailwindCSS
- Кастомные цвета: brand-blue, brand-green
- Адаптивный дизайн (mobile-first)

---

## Примечания

1. **Mock Data:** Многие страницы используют mock данные для демонстрации функциональности
2. **API Integration:** Большинство API endpoints реализованы, но некоторые используют mock responses
3. **PDF Generation:** Используется jsPDF и html2canvas для генерации PDF
4. **Email:** Интеграция с Resend (в некоторых местах mocked)
5. **Storage:** Используется Supabase для хранения данных
6. **Local Storage:** Некоторые функции используют localStorage для временного хранения

---

**Конец документации**

