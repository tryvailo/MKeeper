# Задачи для реализации улучшенного копирайтинга (DearAfter-Registry-Improved-Copy-v2)

**Дата создания:** 2025-01-XX  
**Статус:** В работе

---

## 1. LANDING PAGE (`app/page.tsx`)

### ✅ Уже реализовано:
- Pricing Section - полностью обновлена
- Footer links - обновлены

### ❌ Требуется реализация:

#### 1.1 Hero Section
- [ ] **Headline:** Заменить "Leave your wishes for the ones you love" → **"Make sure your wishes are known"**
- [ ] **Subheadline:** Заменить "Document your funeral preferences once. Share with family. Peace of mind for life." → **"It's simple: write down what matters to you. Share it with loved ones. Let them know you've planned ahead. That's peace of mind for everyone."**
- [ ] **Primary CTA Button:** Заменить "Start Now - It's Free" → **"Create Your Wishes Now"**
- [ ] **Secondary Text:** Заменить "Takes 5 minutes. No payment required." → **"Five minutes to give your family peace of mind. No payment ever."**

#### 1.2 Problem Section ("Why DearAfter?")
- [ ] **Card 1:**
  - Title: "70% of families don't know their loved one's wishes" → **"Most families never discuss what really matters"**
  - Description: "Leading to conflict..." → **"When the time comes, they're left guessing. Uncertain. Wishing they'd known what you wanted."**

- [ ] **Card 2:**
  - Title: "Funeral planning is stressful" → **"Funeral planning shouldn't add to the grief"**
  - Description: "Reduce family burden..." → **"By deciding now—in your own time, without pressure—you're giving your family the greatest gift: clarity and confidence when they need it most."**

- [ ] **Card 3:**
  - Title: "Your wishes matter" → **"Your wishes deserve to be honoured"**
  - Description: "Be remembered exactly..." → **"Not everyone gets a say in how they're remembered. With DearAfter, your voice stays heard. Your values guide the decisions. Your legacy endures."**

#### 1.3 Solution Section ("How it Works")
- [ ] **Step 1 - Document:**
  - Time label: "5 minutes" → **"Five minutes well spent"**
  - Title: "Document" → **"Write down what matters"**
  - Description: Заменить на **"A simple questionnaire walks you through the important decisions: what kind of send-off suits you, who should lead it, what music, readings, flowers matter. No jargon. No pressure. Just your story."**

- [ ] **Step 2 - Share:**
  - Time label: "1 minute" → **"One click away"**
  - Title: "Share" → **"Invite the people who matter"**
  - Description: Заменить на **"Share your preferences privately with family members, your executor, or anyone you trust. They see exactly what you want. No surprises. No arguments. No guessing."**

- [ ] **Step 3 - Keep Safe:**
  - Time label: "Always accessible" → **"Forever accessible"**
  - Title: "Keep Safe" → **"Your wishes, always at hand"**
  - Description: Заменить на **"Encrypted, secure, always accessible. Whether it's tomorrow or twenty years from now, your family knows exactly where to find your wishes and what to do."**

#### 1.4 Testimonials Section
- [ ] **Testimonial 1 (Sarah, 42 | Manchester):** Заменить короткий текст на полную версию:
  > "When my mum was diagnosed, we weren't sure how to talk about what came next. With DearAfter, it became this beautiful conversation. She documented everything—from the music she wanted to how she wanted us to celebrate her life. When she passed, we weren't grieving alone, wondering what she'd have wanted. We knew. We felt her presence in every decision. It brought us closer, not apart."

- [ ] **Testimonial 2 (James, Solicitor | London):** Заменить короткий текст на полную версию:
  > "In 25 years of will-writing, I've seen families torn apart by not knowing what the deceased wanted. With DearAfter, clients are having these conversations early. They're putting their values down. When I see a client with their DearAfter registry saved alongside their will, I know that family is going to be okay. Not just legally, but emotionally. They've got a roadmap from their loved one."

- [ ] **Testimonial 3 (Margaret, 68 | Bristol):** Заменить короткий текст на полную версию:
  > "I spent years not wanting to burden my children with these conversations. With DearAfter, it didn't feel like a burden—it felt like I was giving them a gift. I wrote everything down: my wishes, yes, but also little notes about why I wanted things a certain way. Now my kids have a guide written in my own voice. Even after I'm gone, they can hear me. That gives me real peace."

#### 1.5 FAQ Section
- [ ] **Q1:** "Is this a legal document?" → **"Is this as good as a proper will?"**
  - Answer: Заменить на **"No, and we don't pretend it is. DearAfter documents your wishes about your funeral. A proper will handles your estate. You need both. We recommend: work with a solicitor on your will (if you haven't already), then use DearAfter to get specific about your funeral wishes. They work together."**

- [ ] **Q2:** "Is my data safe?" → **"How do I know my information is private?"**
  - Answer: Заменить на **"We take privacy seriously. Your data is encrypted, stored on secure UK servers, and complies fully with GDPR. You can download or delete all your data anytime. We don't sell your information. We don't share it with anyone. Full stop."**

- [ ] **Q3:** "Can I update my preferences?" → **"What if my mind changes, or circumstances do?"**
  - Answer: Заменить на **"Update whenever you want. Your family can be notified, or you can keep it private. Life changes. Your DearAfter should too."**

- [ ] **Q4:** "What happens to my data if I die?" → **"What happens to my DearAfter if I pass away?"**
  - Answer: Заменить на **"Your family members or executor can access your preferences if you've shared the link with them (which we recommend). Or you can keep a copy of your password somewhere safe—like with your will or in a letter to your executor. Your DearAfter never disappears. It's there for your family, whenever they need it."**

- [ ] **Q5:** "Can I delete my account?" → **"Can I change my mind later?"**
  - Answer: Заменить на **"Yes. You can update, edit, or delete anytime. Permanently delete your account and all data in your settings."**

- [ ] **Q6:** "Who can I contact if I have questions?" → **"I still have questions. Who do I talk to?"**
  - Answer: Заменить на **"Email support@dearafter.com. Chat with us on the site. Ring us on +44(0)20 XXXX XXXX (9am-5pm, Mon-Fri GMT). We're here to help."**

- [ ] **Q7 (НОВЫЙ):** Добавить новый вопрос:
  - Question: **"Do I need to be worried or sad using DearAfter?"**
  - Answer: **"No. We designed this for people planning ahead calmly. Some use it with family (a beautiful conversation). Some do it quietly on their own. Either way, it feels less like death planning and more like legacy planning. You're in control."**

---

## 2. ONBOARDING QUESTIONNAIRE (`app/onboarding/page.tsx`)

### ✅ Уже реализовано:
- Page Header - обновлен
- Step 1 (Funeral Type) - обновлен
- Step 2 (Budget) - обновлен
- Step 3 (Executor) - обновлен
- Step 5 (Media & Documents) - обновлен
- Step 6 (Review & Complete) - обновлен

### ❌ Требуется проверка/доработка:

#### 2.1 Step 4: Funeral Wishes (Details)
- [ ] Проверить, что intro text обновлен: **"Now for the fun part: tell us what matters to you"** с подтекстом **"Think about what would make your celebration of life feel truly *you*. What would make your family smile? What would honour your life well? Be as detailed as you want—or just give us the highlights."**

- [ ] **Ceremony Section:**
  - [ ] Добавить intro line: **"The ceremony - or not"**
  - [ ] Вопрос: "Do you want a service?" → **"Would you like a ceremony where people gather to celebrate your life?"** с опциями: Yes / No / **Maybe—let my family decide**
  - [ ] "Where should it be held?" → **"Where do you imagine this happening?"** с suggestions в placeholder
  - [ ] "Any religious/cultural requirements?" → **"Are there any religious, cultural, or personal traditions that matter to you?"** с улучшенным placeholder

- [ ] **Music & Readings Section:**
  - [ ] Добавить intro: **"The soundtrack to your life"**
  - [ ] "Favorite songs for the ceremony?" → **"What music should play?"** с улучшенным placeholder
  - [ ] "Any poems or readings you want?" → **"Any poems, readings, or passages that speak to you?"** с улучшенным placeholder
  - [ ] "Who should give the eulogy?" → **"Who would you trust to tell your story?"** с улучшенным placeholder

- [ ] **Flowers & Decorations Section:**
  - [ ] Добавить intro: **"The beauty around you"**
  - [ ] "Preferred flowers?" → **"What flowers or plants feel right?"** с улучшенным placeholder
  - [ ] "Colors?" → **"What colours would you want?"** с улучшенным placeholder
  - [ ] "Any special decorations?" → **"Any other decorations or details?"** с улучшенным placeholder

- [ ] **Food & Reception Section:**
  - [ ] Добавить intro: **"Gathering together"**
  - [ ] "Should there be a reception?" → **"Would you like a reception afterward?"** с опциями: Yes / No / **A small gathering at home**
  - [ ] "Venue preference?" → **"Where would you want it?"** с улучшенным placeholder
  - [ ] "Food/drinks?" → **"What should people eat and drink?"** с улучшенным placeholder
  - [ ] "Budget for reception?" → **"What's a comfortable budget?"**

- [ ] **Other Wishes Section:**
  - [ ] Добавить intro: **"The finishing touches"**
  - [ ] "Any charities donations?" → **"Charities or causes you'd like donations going to?"** с улучшенным placeholder
  - [ ] "Dress code?" - оставить, но улучшить placeholder
  - [ ] "Any other requests?" → **"Anything else that would make this feel like *you*?"** с улучшенным placeholder
  - [ ] "Things you DON'T want?" → **"What would you *not* want?"** с улучшенным placeholder

---

## 3. DASHBOARD (`app/dashboard/page.tsx`)

### ✅ Уже реализовано:
- Welcome Banner - обновлен
- Status Card - обновлен
- Premium Upgrade Card - обновлен
- CTA Cards - обновлены
- Loading states - обновлены
- Success/Error messages - обновлены

### ❌ Требуется проверка:
- [ ] Убедиться, что все тексты соответствуют улучшенной версии

---

## 4. FAMILY MEMBERS PAGE (`app/dashboard/family/page.tsx`)

### ✅ Уже реализовано:
- Form labels - обновлены
- Access Level Options - обновлены с описаниями
- Success/Error messages - обновлены

### ❌ Требуется проверка:
- [ ] Убедиться, что все тексты соответствуют улучшенной версии

---

## 5. SHARING & PERMISSIONS PAGE (`app/dashboard/sharing/page.tsx`)

### ✅ Уже реализовано:
- CTA Button - обновлен ("Send Link")
- Success messages - обновлены

### ❌ Требуется проверка:
- [ ] Убедиться, что все тексты соответствуют улучшенной версии

---

## 6. SETTINGS PAGE (`app/settings/page.tsx`)

### ❌ Требуется реализация:
- [ ] **Data Export:** "Download my data as ZIP" → **"Download my data (GDPR download)"**
- [ ] **Delete Account Section:** Улучшить текст подтверждения:
  - Заменить "Are you absolutely sure?" → **"This really will delete everything. Are you sure? This is permanent and we can't undo it."**

---

## 7. HELP & FAQ PAGE (`app/help/page.tsx`)

### ✅ Уже реализовано:
- Search placeholder - обновлен
- FAQ questions - обновлены (в основном)

### ❌ Требуется проверка:
- [ ] Убедиться, что все FAQ соответствуют улучшенной версии
- [ ] Добавить новый вопрос о эмоциональных переживаниях (если еще нет)

---

## 8. EMAIL TEMPLATES (`lib/email.ts`)

### ✅ Уже реализовано:
- Share Invite Email - полностью обновлен (subject, greeting, main text, CTA, disclaimer, signature)

---

## 9. SYSTEM MESSAGES & ALERTS

### ✅ Уже реализовано (частично):
- Некоторые success/error messages обновлены в dashboard и других страницах

### ❌ Требуется проверка по всем страницам:
- [ ] **Success Messages:**
  - "Invitation sent successfully!" → **"Sent! They'll get an email shortly."**
  - "Member updated successfully" → **"Done. Their access is updated."**
  - "PDF instructions successfully generated!" → **"Your PDF is ready. Check your downloads."**
  - "Link copied to clipboard!" → **"Link copied. You can now share it."**
  - "Preferences saved successfully" → **"Saved. Your wishes are safe."**

- [ ] **Error Messages:**
  - "Error saving data. Please try again." → **"Something went wrong. Please try again, or contact support if it keeps happening."**
  - "Failed to send invitation" → **"We couldn't send that email. Check the address and try again."**
  - "Error generating PDF. Please try again." → **"The PDF isn't ready yet. Please try again in a moment."**

- [ ] **Loading States:**
  - "Loading..." → **"Getting everything ready..."**
  - "Saving..." → **"Saving your wishes..."**
  - "Sending..." → **"Sending that email..."**

- [ ] **Empty States:**
  - "No family members yet." → **"Looks like you haven't invited anyone yet. [Add their names] when you're ready."**
  - "No active share links" → **"No shared links yet. [Create one] to give someone access."**
  - "No activity yet" → **"Your log is empty. Updates will show up here."**

---

## 10. ДОПОЛНИТЕЛЬНЫЕ ПРОВЕРКИ

### Терминология (по всему приложению):
- [ ] Использовать "send-off" вместо "funeral" где уместно
- [ ] Использовать "wishes" вместо "preferences" где это звучит лучше
- [ ] Использовать "celebrate life" вместо "funeral service" где уместно
- [ ] Использовать "Let Them Know" вместо "Share" где уместно
- [ ] Использовать "Lead the way" вместо "Executor" где уместно

### Тон и стиль:
- [ ] Проверить, что везде используется более conversational тон
- [ ] Убрать корпоративные фразы
- [ ] Добавить больше emotional connection
- [ ] Улучшить placeholders - сделать их более конкретными и креативными
- [ ] Убедиться, что везде British English

---

## ПРИОРИТЕТЫ РЕАЛИЗАЦИИ

### Высокий приоритет (критично для конверсии):
1. **Landing Page Hero Section** - первое впечатление
2. **Landing Page Problem Section** - эмоциональная связь
3. **Landing Page Testimonials** - социальное доказательство
4. **Landing Page FAQ** - снятие возражений

### Средний приоритет (важно для UX):
5. **Landing Page Solution Section** - объяснение процесса
6. **Onboarding Step 4** - детализация пожеланий
7. **System Messages** - улучшение восприятия

### Низкий приоритет (полировка):
8. **Settings Page** - мелкие улучшения
9. **Терминология по всему приложению** - консистентность

---

## ЗАМЕТКИ

- Все изменения должны сохранять функциональность
- Проверить, что все ссылки и навигация работают после изменений
- Убедиться, что responsive design не нарушен
- Проверить accessibility (ARIA labels, keyboard navigation)

---

**Последнее обновление:** 2025-01-XX

