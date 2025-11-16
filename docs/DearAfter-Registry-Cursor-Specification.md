# DearAfter Registry: ДЕТАЛЬНАЯ СПЕЦИФИКАЦИЯ ДЛЯ CURSOR AI

**Дата:** 10 ноября 2025  
**Назначение:** Полное описание всех страниц, секций, контента и функциональности для генерации MVP  
**Целевая аудитория:** AI (Cursor) для быстрого построения продукта

---

## ТАБЛИЦА СОДЕРЖАНИЯ

1. Обзор продукта и архитектура
2. Детальная спецификация каждой страницы
3. Компоненты и микро-копирайтинг
4. Дизайн-система и визуальные принципы
5. Базовая схема БД
6. Интеграции и API endpoints
7. Приоритизация функций (MVP vs Phase 2)

---

## ЧАСТЬ 1: ОБЗОР ПРОДУКТА

### 1.1 Общее описание

**Название:** DearAfter Registry  
**Слоган:** "Leave your wishes for the ones you love"  
**Описание (1 предложение):** Платформа для безопасного документирования и обмена пожеланиями по похоронам с семьей

### 1.2 Основные метрики

```
Target Users (Year 1): 5,000-10,000
Conversion to Premium: 30-40%
Revenue Goal Year 1: £80-100k
Key Metric: User retention 85%+, NPS 65+
```

### 1.3 Technology Stack (Reference)

```
Frontend: Next.js 14+ (TypeScript, App Router)
Styling: TailwindCSS 3.x
UI Components: shadcn/ui (Radix primitives)
Forms: React Hook Form + Zod validation
Auth: Clerk (magic links, OAuth)
Backend: Supabase (Postgres)
PDF Generation: React-PDF or Puppeteer (server-side)
Email: Resend.com
Analytics: Plausible or custom events
Hosting: Vercel
```

---

## ЧАСТЬ 2: ДЕТАЛЬНАЯ СПЕЦИФИКАЦИЯ СТРАНИЦ

### СТРАНИЦА 1: LANDING PAGE (/) - КОНВЕРСИОННАЯ

#### Layout & Sections

```
1. HEADER/NAVBAR
   ├─ Logo (DearAfter)
   ├─ Navigation links: [Home] [How it works] [Testimonials] [FAQ]
   ├─ CTA Button: [Sign Up Free] (primary color, prominent)
   └─ Login link (text, secondary)

2. HERO SECTION (Above fold)
   ├─ Headline: "Leave your wishes for the ones you love"
   ├─ Subheadline: "Document your funeral preferences once. 
   │               Share with family. Peace of mind for life."
   ├─ Hero image: Emotional family moment (illustration or stock)
   ├─ Primary CTA: [Start Now - It's Free] (large button, leads to sign up)
   ├─ Secondary text: "Takes 5 minutes. No payment required."
   └─ Trust badges: "Trusted by 1,000+ families" / "4.8★ rating"

3. PROBLEM SECTION
   ├─ Heading: "Why DearAfter?"
   ├─ Stat 1: "70% of families don't know their loved one's wishes"
   │  Caption: "Leading to conflict, regret, and wrong decisions"
   ├─ Stat 2: "Funeral planning is stressful"
   │  Caption: "Reduce family burden by deciding in advance"
   ├─ Stat 3: "Your wishes matter"
   │  Caption: "Be remembered exactly how you want to be"
   └─ Visual: 3 cards with icons (conflict, stress, legacy)

4. SOLUTION SECTION (How it works)
   ├─ Heading: "How it works in 3 steps"
   ├─ Step 1 Card:
   │  ├─ Icon: Document/Form
   │  ├─ Title: "Document"
   │  ├─ Description: "Answer simple questions about your preferences
   │  │               (type, budget, wishes, music, readings...)"
   │  └─ Time: "5 minutes"
   ├─ Step 2 Card:
   │  ├─ Icon: Share/Family
   │  ├─ Title: "Share"
   │  ├─ Description: "Email your wishes to family members.
   │  │               They can review, discuss, suggest changes."
   │  └─ Time: "1 minute"
   ├─ Step 3 Card:
   │  ├─ Icon: Download/Archive
   │  ├─ Title: "Keep Safe"
   │  ├─ Description: "Your wishes are stored safely in the cloud.
   │  │               Your family knows what to do when needed."
   │  └─ Time: "Always accessible"
   └─ CTA: [Create Your Registry Now]

5. TESTIMONIALS SECTION
   ├─ Heading: "Families love DearAfter"
   ├─ Quote 1 (Testimonial Card):
   │  ├─ Quote: "My mum documented everything. When she died,
   │  │          we knew exactly what she wanted. It made everything
   │  │          so much easier and brought family together."
   │  ├─ Author: "Sarah, 42 | Manchester"
   │  ├─ Rating: ⭐⭐⭐⭐⭐
   │  └─ Image: Small avatar (or generic family icon)
   ├─ Quote 2:
   │  ├─ Quote: "As a solicitor, I recommend DearAfter to every
   │  │          will-writing client. It saves time, prevents
   │  │          family conflict, and shows clients care about
   │  │          their loved ones."
   │  ├─ Author: "James, Solicitor | London"
   │  ├─ Rating: ⭐⭐⭐⭐⭐
   │  └─ Image: Avatar
   ├─ Quote 3:
   │  ├─ Quote: "I worried my kids wouldn't know what I wanted.
   │  │          Now they have everything they need. Gives me peace."
   │  ├─ Author: "Margaret, 68 | Bristol"
   │  ├─ Rating: ⭐⭐⭐⭐⭐
   │  └─ Image: Avatar
   └─ Layout: 3-column grid (responsive to 1-col on mobile)

6. PRICING SECTION (Simple, transparent)
   ├─ Heading: "Simple, Transparent Pricing"
   ├─ Subheading: "Start free. Upgrade if you want more."
   ├─ Tier 1: Free
   │  ├─ Price: "£0/year"
   │  ├─ Features:
   │  │  ├─ Document your preferences
   │  │  ├─ Download PDF
   │  │  ├─ Share with 1 family member
   │  │  └─ Annual reminders
   │  └─ CTA: [Get Started]
   ├─ Tier 2: Premium (highlighted as "Most Popular")
   │  ├─ Price: "£9/year"
   │  ├─ Features:
   │  │  ├─ Everything in Free +
   │  │  ├─ Share with unlimited family members
   │  │  ├─ "Legal stamp" (certified look)
   │  │  ├─ Email reminders (quarterly vs annual)
   │  │  ├─ Video message (record 2-min message)
   │  │  └─ Legacy letters (write to family, auto-deliver after death)
   │  └─ CTA: [Start Premium]
   └─ Trust text: "Cancel anytime. No hidden fees. GDPR compliant."

7. FAQ SECTION (Expandable)
   ├─ Heading: "Frequently Asked Questions"
   ├─ Q1: "Is this a legal document?"
   │  └─ A: "No, DearAfter is not a legal document. It's an
   │        informational tool to share your preferences with family.
   │        If you want legal binding, consult a solicitor."
   ├─ Q2: "Is my data safe?"
   │  └─ A: "Yes. Your data is encrypted and stored securely on
   │        Supabase servers in the UK. We comply with GDPR."
   ├─ Q3: "Can I update my preferences?"
   │  └─ A: "Yes! You can update anytime. Your family gets notified
   │        when you make changes."
   ├─ Q4: "What happens to my data if I die?"
   │  └─ A: "Your family can access your preferences if they know
   │        the login (which you should tell them). We recommend
   │        keeping a password in a safe place with your will."
   ├─ Q5: "Can I delete my account?"
   │  └─ A: "Yes, anytime. We'll delete all your data permanently."
   └─ Q6: "Who can I contact if I have questions?"
      └─ A: "Email support@dearafter.com or use the chat."

8. FOOTER
   ├─ About: "DearAfter helps families document funeral wishes..."
   ├─ Links: [Privacy Policy] [Terms] [Contact] [Blog]
   ├─ Social: [Twitter] [Facebook] [LinkedIn]
   ├─ Copyright: "© 2025 DearAfter. All rights reserved."
   └─ Newsletter: "Stay updated" [Email input] [Subscribe]
```

#### Copy & Messaging

**Tone:** Warm, reassuring, not morbid. Positive, forward-thinking.

**Key Messages:**
- "Peace of mind" (repeated 3x)
- "Family first" (emphasis on loved ones, not death)
- "Simple & fast" (remove friction)
- "Safe & secure" (GDPR, data protection)
- "No judgment" (this is normal, important)

#### Design Notes

- **Color scheme:** 
  - Primary: Calm blue (#1E40AF) for CTAs
  - Secondary: Warm gray (#6B7280) for text
  - Accent: Soft green (#10B981) for positive actions
- **Images:** Use warm, family-focused photos (not funeral-focused)
- **Animation:** Subtle scroll-triggered reveals (not distracting)
- **Typography:** Clear hierarchy, readable font sizes

---

### СТРАНИЦА 2: SIGN UP / REGISTRATION (/auth/signup) - ONBOARDING

#### Layout & Sections

```
1. MINIMAL NAVBAR
   └─ Logo only (no nav, no distractions)

2. FORM CONTAINER (Centered, card-based)
   ├─ Heading: "Create your account"
   ├─ Subheading: "Takes 2 minutes. No payment required."
   │
   ├─ FORM FIELDS:
   │  ├─ Email input
   │  │  ├─ Placeholder: "your@email.com"
   │  │  ├─ Validation: Email format
   │  │  └─ Error message: "Please enter a valid email"
   │  │
   │  ├─ Full Name input
   │  │  ├─ Placeholder: "John Smith"
   │  │  ├─ Validation: Min 2 chars
   │  │  └─ Error message: "Name required"
   │  │
   │  ├─ Password input (Clerk handles or custom)
   │  │  ├─ Placeholder: "••••••••"
   │  │  ├─ Validation: Min 8 chars, uppercase, number, symbol
   │  │  ├─ Strength indicator (visual bar)
   │  │  └─ Error message: "Password must contain..."
   │  │
   │  ├─ Age range (dropdown)
   │  │  ├─ Label: "Age range (optional)"
   │  │  ├─ Options: [45-54] [55-64] [65-74] [75+]
   │  │  └─ Note: "Helps us tailor content"
   │  │
   │  ├─ Location (text input with autocomplete)
   │  │  ├─ Label: "Your location (optional)"
   │  │  ├─ Placeholder: "e.g., London, England"
   │  │  └─ Note: "Helps us suggest relevant providers"
   │  │
   │  └─ Terms checkbox
   │     ├─ Label: "I agree to the [Terms of Service] and [Privacy Policy]"
   │     └─ Error: "You must agree to continue"
   │
   ├─ PRIMARY CTA: [Create Account] (full width, primary color)
   ├─ SECONDARY: "Or sign up with" [Google] [Apple]
   └─ LOGIN LINK: "Already have account? [Log in]"

3. TRUST BADGES (Below form)
   └─ "✓ Your data is secure (GDPR compliant)"
   └─ "✓ Free to sign up, no payment needed"
   └─ "✓ Takes 2 minutes"
```

#### Validation & Error Handling

```
Email validation:
├─ Real-time check (debounced)
├─ Error: "Email already in use"
└─ Success: Green checkmark

Password strength:
├─ Weak: "Weak" (red)
├─ Medium: "Fair" (yellow)
└─ Strong: "Strong" (green)

Form submission:
├─ Loading state: Spinner + "Creating account..."
├─ Success: Redirect to onboarding questionnaire
└─ Error: "Something went wrong. Try again."
```

---

### СТРАНИЦА 3: ONBOARDING QUESTIONNAIRE (/onboarding/preferences) - MULTI-STEP FORM

#### Overview

Multi-step form (5-6 steps, progress bar at top). Each step focuses on one aspect of preferences.

```
PROGRESS BAR: Step 1/6 [████░░░░░░░░░░░]

STEP 1: FUNERAL TYPE
├─ Question: "What type of funeral do you prefer?"
├─ Options (radio buttons, cards):
│  ├─ Card 1: "Traditional Funeral"
│  │  ├─ Icon: Church/ceremony
│  │  ├─ Description: "Full service with viewing, ceremony, burial/cremation"
│  │  └─ Price indicator: "£3,000-5,000"
│  │
│  ├─ Card 2: "Cremation with Service"
│  │  ├─ Icon: Ceremony
│  │  ├─ Description: "Cremation with memorial service"
│  │  └─ Price indicator: "£2,000-3,500"
│  │
│  ├─ Card 3: "Direct Cremation"
│  │  ├─ Icon: Direct/simple
│  │  ├─ Description: "No service or viewing. Just cremation."
│  │  └─ Price indicator: "£1,000-1,500 (cheapest option)"
│  │
│  ├─ Card 4: "Natural/Eco Funeral"
│  │  ├─ Icon: Nature
│  │  ├─ Description: "Biodegradable coffin, woodland burial, eco-friendly"
│  │  └─ Price indicator: "£2,500-4,000"
│  │
│  └─ Card 5: "I'm not sure"
│     └─ Skip: "Choose later, we'll help"

├─ Help text: "This affects cost and planning details"
└─ Buttons: [Back] [Next]

STEP 2: BUDGET
├─ Question: "What's your budget for funeral?"
├─ Options (radio buttons):
│  ├─ "£1,000-2,000 (minimalist)"
│  ├─ "£2,000-3,500 (standard)"
│  ├─ "£3,500-5,000 (traditional)"
│  ├─ "£5,000+ (premium, no limits)"
│  └─ "I'm not sure (skip)"
├─ Help: "This helps us suggest realistic options"
└─ Buttons: [Back] [Next]

STEP 3: EXECUTOR & DECISION MAKER
├─ Question: "Who will make funeral decisions for you?"
├─ Input: 
│  ├─ Name: [text input]
│  ├─ Email: [text input]
│  ├─ Relationship: [dropdown: Spouse, Partner, Adult Child, Friend, Solicitor, Other]
├─ Help: "This person will be notified and given access to your preferences"
└─ Buttons: [Back] [Next]

STEP 4: FUNERAL WISHES (Details)
├─ Question: "Describe your funeral wishes in detail"
├─ Sections (expandable):
│  │
│  ├─ CEREMONY:
│  │  ├─ "Do you want a service?" [Yes] [No]
│  │  ├─ "Where should it be held?" [Church] [Crematorium] [Cemetery] [Other]
│  │  ├─ "Any religious/cultural requirements?" [text area]
│  │  └─ "Preferred date/time?" [date/time picker]
│  │
│  ├─ MUSIC & READINGS:
│  │  ├─ "Favorite songs for the ceremony?" [text area]
│  │  │  Placeholder: "e.g., 'Amazing Grace', 'My Way' by Sinatra..."
│  │  ├─ "Any poems or readings you want?" [text area]
│  │  │  Placeholder: "e.g., Corinthians 13:4-8, Rupert Brooke..."
│  │  └─ "Who should give the eulogy?" [name input]
│  │
│  ├─ FLOWERS & DECORATIONS:
│  │  ├─ "Preferred flowers?" [text area]
│  │  │  Placeholder: "e.g., Roses, Lilies, Sunflowers..."
│  │  ├─ "Colors?" [text area]
│  │  │  Placeholder: "e.g., White, Blue, Colorful..."
│  │  └─ "Any special decorations?" [text area]
│  │
│  ├─ FOOD & RECEPTION:
│  │  ├─ "Should there be a reception?" [Yes] [No]
│  │  ├─ "Venue preference?" [text area]
│  │  ├─ "Food/drinks?" [text area]
│  │  │  Placeholder: "e.g., Tea and biscuits, Wake party, Pub lunch..."
│  │  └─ "Budget for reception?" [£] [input]
│  │
│  └─ OTHER WISHES:
│     ├─ "Any charities donations?" [text area]
│     ├─ "Dress code?" [text area]
│     ├─ "Any other requests?" [text area]
│     └─ "Things you DON'T want?" [text area]
│        Placeholder: "e.g., No black, no flowers, no long speeches..."

├─ NOTE: "Be as detailed as you want. Short notes are fine too."
└─ Buttons: [Back] [Next]

STEP 5: MEDIA & DOCUMENTS (Optional)
├─ Question: "Upload any additional files (optional)"
├─ Upload zones:
│  ├─ "Photos" [drag & drop or click]
│  ├─ "Music files" [drag & drop or click]
│  ├─ "Documents" (will, letters, etc) [drag & drop or click]
│  └─ "Other" [drag & drop or click]
├─ Max file size: 10MB per file
├─ Help: "These will be stored with your preferences"
└─ Buttons: [Skip] [Next]

STEP 6: REVIEW & COMPLETE
├─ Heading: "Review your preferences"
├─ Summary cards (clickable to edit):
│  ├─ Funeral type
│  ├─ Budget
│  ├─ Executor
│  ├─ Key wishes
│  └─ Files uploaded
├─ Checkbox: "I've reviewed everything and it's correct"
├─ FINAL CTA: [Complete & Create Dashboard]
└─ Help: "You can edit these anytime from your dashboard"
```

#### UX Patterns

- **Progress bar:** Visual indicator at top (always visible when scrolling)
- **Auto-save:** Each step saves to DB (user can close and return)
- **Animations:** Smooth transitions between steps
- **Mobile:** Full-width on mobile, stacked layout
- **Accessibility:** Clear labels, ARIA attributes, keyboard navigation

---

### СТРАНИЦА 4: DASHBOARD (/dashboard) - USER HOME

#### Layout & Structure

```
HEADER/NAVBAR (Authenticated)
├─ Logo: DearAfter
├─ Navigation: [Dashboard] [My Registry] [Settings] [Help]
├─ User menu: [Profile] [Billing] [Logout]
└─ Notifications bell icon (with unread count badge)

SIDEBAR (Left, collapsible on mobile)
├─ Main sections:
│  ├─ 📋 [My Registry] (main section)
│  ├─ 👨‍👩‍👧 [Family Members] (view who has access)
│  ├─ 📧 [Sharing & Permissions] (manage links)
│  ├─ ⏰ [Reminders] (annual update schedule)
│  ├─ 📄 [History & Activity] (log of changes)
│  └─ ⚙️ [Settings] (account, privacy)

MAIN CONTENT AREA
│
├─ WELCOME BANNER (if < 1 month old)
│  ├─ Heading: "Welcome to your DearAfter Registry"
│  ├─ Message: "You're all set! Here's what you can do next:"
│  ├─ Quick links:
│  │  ├─ [📥 Download PDF] (your wishes as document)
│  │  ├─ [👨‍👩‍👧 Share with Family] (email invites)
│  │  ├─ [✏️ Edit Your Preferences] (review/update)
│  │  └─ [❓ Learn More] (help docs)
│  └─ Close button [X]
│
├─ STATUS CARD (Current status)
│  ├─ Title: "Your Preferences Status"
│  ├─ Last updated: "Oct 15, 2025"
│  ├─ Next reminder: "Jan 15, 2026 (annual check)"
│  ├─ Family members with access: "3 people"
│  ├─ Progress: "✓ All sections complete"
│  └─ CTA: [Edit Preferences]
│
├─ PRIMARY ACTIONS (3 big cards/buttons)
│  │
│  ├─ Card 1: 📥 DOWNLOAD PDF
│  │  ├─ Icon: Document/download
│  │  ├─ Title: "Download Your Preferences"
│  │  ├─ Description: "Get a beautiful, printable PDF of your wishes.
│  │  │              Share with family or keep in safe place."
│  │  └─ CTA: [Download PDF]
│  │
│  ├─ Card 2: 👨‍👩‍👧 SHARE WITH FAMILY
│  │  ├─ Icon: Users/share
│  │  ├─ Title: "Share with Family"
│  │  ├─ Description: "Send email invites to family members.
│  │  │              They'll get private access to your preferences."
│  │  └─ CTA: [Share Now]
│  │
│  └─ Card 3: ✏️ EDIT PREFERENCES
│     ├─ Icon: Pencil/edit
│     ├─ Title: "Edit Your Preferences"
│     ├─ Description: "Update your wishes, change budget, add details."
│     └─ CTA: [Edit Now]
│
├─ QUICK VIEW: YOUR PREFERENCES (Compact summary)
│  ├─ Title: "Your Preferences at a Glance"
│  ├─ Grid (2-3 columns):
│  │  ├─ "Funeral Type: Cremation with Service"
│  │  ├─ "Budget: £3,000-3,500"
│  │  ├─ "Executor: Sarah Smith"
│  │  ├─ "Key Wish: 'My Way' by Sinatra"
│  │  └─ "[View Full Details →]"
│  └─ CTA: [Edit Full Details]
│
├─ FAMILY & SHARING (Widget)
│  ├─ Title: "Who Has Access?"
│  ├─ List:
│  │  ├─ Sarah Smith (spouse) - "Full access"
│  │  ├─ John Smith (son) - "Full access"
│  │  └─ James Johnson (solicitor) - "View only"
│  ├─ Action: [Add More Family] [Manage Permissions]
│  └─ Link: "Your preferences are shared via private link"
│
├─ ANNUAL REMINDER (If coming up)
│  ├─ Icon: 🔔 (with warning color)
│  ├─ Title: "Time to Review Your Preferences?"
│  ├─ Message: "It's been 1 year since you updated. Prices may have changed."
│  ├─ Options: [Review Now] [Remind me later] [Skip this year]
│  └─ Note: "Takes 2 minutes"
│
├─ PREMIUM UPGRADE CARD (If user is free)
│  ├─ Title: "Upgrade to Premium"
│  ├─ Current: "Free tier"
│  ├─ Benefits of Premium:
│  │  ├─ ✓ Unlimited family members
│  │  ├─ ✓ Record video message (2 min)
│  │  ├─ ✓ Legacy letters (auto-deliver to family)
│  │  ├─ ✓ Priority support
│  │  └─ ✓ Ad-free experience
│  ├─ Price: "Only £9/year"
│  └─ CTA: [Upgrade Now]
│
└─ ACTIVITY LOG (Recent actions)
   ├─ Title: "Recent Activity"
   ├─ Timeline:
   │  ├─ "Oct 20, 2025 - Shared with Sarah Smith"
   │  ├─ "Oct 15, 2025 - Updated preferences"
   │  └─ "Oct 10, 2025 - Account created"
   └─ Link: [View Full History →]
```

#### Mobile Responsive

- Sidebar collapses to hamburger menu
- Cards stack vertically
- One-column layout

---

### СТРАНИЦА 5: FAMILY SHARING VIEW (/family/shared/[linkId]) - VIEW-ONLY

#### Layout

```
HEADER (Minimal, no login)
├─ DearAfter logo
└─ "Viewing shared preferences"

CONTENT
├─ ALERT BANNER (Informational)
│  ├─ Icon: ℹ️
│  ├─ Message: "You're viewing [Person's Name] funeral preferences."
│  ├─ Reminder: "This helps the family when making decisions."
│  └─ Close: [X]
│
├─ DECEASED INFO (Clear, respectful)
│  ├─ Name: "John Smith"
│  ├─ Age: "(1950-2025)"
│  ├─ Message: "Their preferences for how they'd like to be remembered:"
│  └─ Last updated: "Updated Oct 15, 2025"
│
├─ PREFERENCES DISPLAY (Read-only cards)
│  ├─ Funeral Type: "Cremation with Service"
│  ├─ Budget: "£3,000-3,500"
│  ├─ Executor: "Sarah Smith"
│  │
│  ├─ CEREMONY DETAILS:
│  │  ├─ "Service: Yes"
│  │  ├─ "Location: St Paul's Church, London"
│  │  └─ "Date preference: Spring (if possible)"
│  │
│  ├─ MUSIC & READINGS:
│  │  ├─ "Songs: 'My Way' by Sinatra, 'Amazing Grace'"
│  │  ├─ "Reading: Corinthians 13:4-8 (read by Sarah Smith)"
│  │  └─ "Eulogy: James Johnson"
│  │
│  ├─ FLOWERS & DECOR:
│  │  ├─ "Flowers: Red roses and white lilies"
│  │  ├─ "Colors: Red and white"
│  │  └─ "Other: Garden flowers preferred"
│  │
│  ├─ RECEPTION:
│  │  ├─ "Yes, please"
│  │  ├─ "Venue: The Local Pub"
│  │  ├─ "Food: Wake party, fish & chips"
│  │  └─ "Budget: £500"
│  │
│  ├─ OTHER WISHES:
│  │  ├─ "Donations: British Heart Foundation"
│  │  ├─ "Dress: Colorful, celebration of life"
│  │  └─ "Don't want: Long, sad speeches"
│  │
│  └─ FILES (If any uploaded):
│     ├─ "[📸 Download all photos]"
│     ├─ "[🎵 Download music files]"
│     └─ "[📄 Download documents]"
│
├─ ACTIONS FOR FAMILY
│  ├─ [📥 Download as PDF]
│  ├─ [📧 Email this to family]
│  ├─ [💬 Leave a comment/suggestion]
│  ├─ [❓ Contact executor: Sarah Smith]
│  └─ [🔗 Share this link with others]
│
├─ DISCUSSION AREA (If permitted)
│  ├─ Title: "Family Notes"
│  ├─ Prompt: "Suggestions or questions? Leave a note here."
│  ├─ Comment section:
│  │  ├─ Comment 1: "Perfect! I'll arrange the service" - Sarah
│  │  ├─ Comment 2: "I can help with music" - John
│  │  └─ [Add your comment...]
│  └─ NOTE: "Comments visible to family only"
│
└─ FOOTER
   ├─ "Questions? Contact the executor: sarah@email.com"
   ├─ "[❓ FAQ] [🔒 Privacy] [📧 Support]"
   └─ "Created with DearAfter Registry"
```

#### Permission Levels

```
View-only (default):
├─ Can read all preferences
├─ Cannot edit
├─ Can download PDF
├─ Can leave comments

Executor (special):
├─ Full read access
├─ Can add notes
├─ Gets notifications if preferences updated
└─ Can share with others
```

---

### СТРАНИЦА 6: FAQ & HELP (/help)

#### Structure

```
HEADER
├─ Title: "Help & FAQ"
├─ Search bar: [Search help topics...]
└─ "Can't find what you're looking for? [Contact Support]"

SECTIONS (Accordion format)

SECTION 1: GENERAL
├─ Q1: "What is DearAfter Registry?"
│  └─ A: "DearAfter Registry is a free online tool to document
│        your funeral preferences and share them with family..."
├─ Q2: "Is this a legal document?"
│  └─ A: "No, DearAfter is not a legal document. It's an
│        informational tool..."
├─ Q3: "Who should use DearAfter?"
│  └─ A: "Anyone who wants to document their wishes and
│        reduce family burden..."
└─ Q4: "How much does it cost?"
   └─ A: "Free tier is completely free. Premium is £9/year."

SECTION 2: PRIVACY & SECURITY
├─ Q1: "Is my data safe?"
│  └─ A: "Yes. Your data is encrypted and stored securely
│        on UK-based servers..."
├─ Q2: "Is DearAfter GDPR compliant?"
│  └─ A: "Yes, we fully comply with GDPR..."
├─ Q3: "Who can see my preferences?"
│  └─ A: "Only people you invite. No one else."
└─ Q4: "Can DearAfter employees see my data?"
   └─ A: "No, not without explicit permission for support issues."

SECTION 3: USING DEARAFTER
├─ Q1: "How do I create my preferences?"
│  └─ A: "Sign up, answer the onboarding questions (5 min),
│        done! You can edit anytime..."
├─ Q2: "How do I share with family?"
│  └─ A: "Go to Dashboard > Share with Family. Enter email
│        addresses. They get an email link..."
├─ Q3: "Can I edit my preferences after creating them?"
│  └─ A: "Yes! Go to Dashboard > Edit Preferences. You can
│        change anything anytime..."
└─ Q4: "Can I delete my account?"
   └─ A: "Yes. Go to Settings > Delete Account. Your data
│        will be permanently deleted."

SECTION 4: PREMIUM
├─ Q1: "What's included in Premium?"
│  └─ A: "Unlimited family members, video message, legacy
│        letters, email reminders, no ads..."
├─ Q2: "Is Premium worth it?"
│  └─ A: "If you want more features and better support, yes!
│        It's only £9/year..."
└─ Q3: "Can I cancel Premium?"
   └─ A: "Yes, anytime. No questions asked. You lose Premium
│        features but keep your free account."

SECTION 5: WHAT HAPPENS WHEN YOU PASS AWAY
├─ Q1: "How will my family access my preferences when I die?"
│  └─ A: "You should give them your login details or keep
│        the link in a safe place (like your will)..."
├─ Q2: "Can I set up automatic access after my death?"
│  └─ A: "Not yet. We're working on this feature. For now,
│        share the link or login info..."
└─ Q3: "How long are preferences stored after death?"
   └─ A: "We store indefinitely unless family requests deletion."

SECTION 6: TECHNICAL
├─ Q1: "What devices can I use?"
│  └─ A: "Any device with a browser: desktop, tablet, phone..."
├─ Q2: "Can I access offline?"
│  └─ A: "Download the PDF and keep it offline. Online access
│        requires internet..."
└─ Q3: "Is there a mobile app?"
   └─ A: "Not yet. The website works great on mobile though."

SECTION 7: CONTACT & SUPPORT
├─ Email: support@dearafter.com
├─ Chat: [Live chat widget] (during business hours)
├─ Phone: +44 (0)20 XXXX XXXX
└─ Form: [Contact form] (we'll reply within 24 hours)
```

---

### СТРАНИЦА 7: SETTINGS (/settings)

#### Sections

```
LEFT SIDEBAR (Settings menu)
├─ Account
├─ Privacy & Security
├─ Billing
├─ Notifications
└─ Delete Account

ACCOUNT SECTION
├─ Profile Information:
│  ├─ Name: [John Smith] [Edit]
│  ├─ Email: [john@email.com] [Change]
│  ├─ Age: [45-54] [Edit]
│  └─ Location: [London, England] [Edit]
│
├─ Password:
│  └─ [Change Password]
│
└─ Login Activity:
   ├─ "Last login: Oct 20, 2025, 2:30 PM"
   └─ [View all login activity]

PRIVACY & SECURITY SECTION
├─ Two-Factor Authentication (2FA):
│  ├─ Status: [Off] [Turn On]
│  └─ Description: "Add extra security with SMS or authenticator"
│
├─ Session Timeout:
│  ├─ Setting: [30 minutes] [1 hour] [2 hours] [Custom]
│  └─ Description: "Log out automatically after inactivity"
│
├─ Data Export:
│  ├─ [Download my data as ZIP]
│  └─ Description: "Get all your data in GDPR-compliant format"
│
└─ GDPR Rights:
   ├─ "Your privacy rights:"
   ├─ [View Privacy Policy]
   ├─ [Download my data]
   └─ [Delete my account]

BILLING SECTION
├─ Current Plan: "Free"
├─ [Upgrade to Premium] (£9/year)
├─ Payment method: (if premium)
│  ├─ Visa ending in 4242
│  └─ [Update payment method]
└─ Billing history:
   ├─ "No payments yet"
   └─ [View full billing history]

NOTIFICATIONS SECTION
├─ Email Preferences:
│  ├─ ☑ Account updates
│  ├─ ☑ Annual reminders
│  ├─ ☑ Product updates
│  └─ ☑ Marketing emails
│
├─ Notification Frequency:
│  ├─ [Immediately] [Daily digest] [Weekly digest]
│  └─ "When would you like to be notified?"
│
└─ [Save preferences]

DELETE ACCOUNT SECTION
├─ ⚠️ WARNING (red background)
├─ "Deleting your account is permanent."
├─ "We will delete:"
│  ├─ Your account
│  ├─ All preferences
│  ├─ All family sharing links
│  └─ All data
├─ "This cannot be undone."
├─ [I understand, delete my account]
└─ Confirmation: "Are you sure? [Yes, delete] [Cancel]"
```

---

## ЧАСТЬЕТ 3: КОМПОНЕНТЫ И МИКРО-КОПИРАЙТИНГ

### 3.1 Повторяющиеся компоненты

#### Component: CTAButton

```
Primary (Blue):
├─ Text: "Create Account" / "Start Now" / "Share with Family"
├─ Icon: Optional (arrow, checkmark, share)
├─ State: Normal | Hover | Active | Loading | Disabled
└─ Size: Large (landing) | Medium (dashboard) | Small (inline)

Secondary (Gray):
├─ Text: "Learn More" / "Cancel" / "Skip"
└─ Less prominent

Tertiary (Link):
├─ Text only, underlined
└─ "View all testimonials" / "Contact support"
```

#### Component: Card

```
Title (h3)
├─ Subtitle (optional, gray)
├─ Content (text, icon, image)
└─ CTA button or link
```

#### Component: Alert/Banner

```
Info (Blue):
├─ Icon: ℹ️
├─ Message: Informational
└─ Closeable: Yes

Success (Green):
├─ Icon: ✓
├─ Message: "Preferences saved!"
└─ Auto-close: 3 seconds

Error (Red):
├─ Icon: ⚠️
├─ Message: "Something went wrong"
└─ Retry option

Warning (Orange):
├─ Icon: ⚠️
├─ Message: "Preferences are > 1 year old"
└─ Action: "Update now"
```

#### Component: FormField

```
Label: "Full Name"
Input: [text input]
Help text: "Your legal name"
Error: "Name is required" (red)
Success: "✓ Looks good" (green, optional)
```

---

### 3.2 Копирайтинг (Tone & Voice)

**Tone:** Warm, respectful, professional, clear

**Key Principles:**
- Avoid morbid language ("death", "dying")
- Instead use: "passing away", "when the time comes", "your loved one"
- Emphasize: Peace, family, legacy, dignity
- Be positive: "Planning ahead is an act of love"
- Remove friction: "Takes 5 minutes", "No payment needed"

**Example Microcopy:**

```
Form error: "Whoops! This email is already in use. 
             Try logging in instead →"
             (not: "ERROR: Duplicate email")

Empty state: "No family members yet. 
             [Invite someone →]"
             (not: "No data")

Success message: "✓ Your preferences are saved and safe!"
                 (not: "Data saved")

Loading: "Setting up your registry..."
         (not: "Loading...")

Confirmation: "Are you sure? Your data will be deleted forever.
              [Yes, I'm sure] [Actually, no]"
              (not just: "OK" / "Cancel")
```

---

## ЧАСТЬ 4: ДИЗАЙН-СИСТЕМА & ВИЗУАЛЬНЫЕ ПРИНЦИПЫ

### 4.1 Color Palette

```
Primary (Trust, Action):
├─ Brand Blue: #1E40AF (buttons, links, primary CTAs)
├─ Dark Blue: #164E63 (hover state, dark mode)
└─ Light Blue: #DBEAFE (backgrounds, light accents)

Secondary (Growth, Positive):
├─ Soft Green: #10B981 (success, positive actions)
├─ Mint: #A7F3D0 (light background)
└─ Dark Green: #047857 (hover)

Neutral (Text, Backgrounds):
├─ White: #FFFFFF
├─ Light Gray: #F3F4F6 (backgrounds)
├─ Medium Gray: #9CA3AF (secondary text)
├─ Dark Gray: #374151 (primary text)
└─ Black: #111827 (heavy text)

Semantic:
├─ Error (Red): #DC2626
├─ Warning (Orange): #F59E0B
├─ Success (Green): #10B981
└─ Info (Blue): #3B82F6
```

### 4.2 Typography

```
Headings:
├─ H1: 32px, bold (700), line-height 1.2
├─ H2: 24px, semi-bold (600), line-height 1.3
├─ H3: 20px, semi-bold (600), line-height 1.4
└─ H4: 16px, semi-bold (600), line-height 1.5

Body:
├─ Large: 18px, regular (400), line-height 1.6
├─ Regular: 16px, regular (400), line-height 1.5
├─ Small: 14px, regular (400), line-height 1.5
└─ Tiny: 12px, regular (400), line-height 1.4

Font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
             (system fonts for performance)
```

### 4.3 Spacing

```
Use 8px grid:
├─ XS: 4px
├─ S: 8px
├─ M: 16px
├─ L: 24px
├─ XL: 32px
└─ XXL: 48px

Margins/padding: Multiples of 8px
```

### 4.4 Borders & Shadows

```
Border radius:
├─ Small: 4px (inputs, buttons)
├─ Medium: 8px (cards, containers)
└─ Large: 16px (modal dialogs)

Box shadow:
├─ Subtle: 0 1px 2px rgba(0,0,0,0.05)
├─ Medium: 0 4px 6px rgba(0,0,0,0.1)
└─ Strong: 0 10px 15px rgba(0,0,0,0.2)
```

---

## ЧАСТЬ 5: БАЗОВАЯ СХЕМА БД (DATABASE)

### 5.1 Core Tables

```SQL
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY (from Clerk or custom),
  email VARCHAR UNIQUE NOT NULL,
  full_name VARCHAR NOT NULL,
  age_range VARCHAR (45-54, 55-64, 65-74, 75+),
  location VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  tier VARCHAR ('free', 'premium'), -- subscription status
  tier_started_at TIMESTAMP,
  deleted_at TIMESTAMP -- soft delete
);

-- Preferences (main content)
CREATE TABLE preferences (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL (FK: users.id),
  funeral_type VARCHAR ('traditional', 'cremation_service', 'direct', 'eco', 'unsure'),
  budget_range VARCHAR ('1000-2000', '2000-3500', '3500-5000', '5000+', 'unsure'),
  
  executor_name VARCHAR,
  executor_email VARCHAR,
  executor_relationship VARCHAR,
  
  ceremony_details TEXT (JSON or plain text),
  music_readings TEXT,
  flowers_decorations TEXT,
  food_reception TEXT,
  other_wishes TEXT,
  
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  version INT -- for conflict resolution
);

-- Family sharing
CREATE TABLE family_members (
  id UUID PRIMARY KEY,
  preferences_id UUID (FK: preferences.id),
  name VARCHAR,
  email VARCHAR,
  relationship VARCHAR ('spouse', 'child', 'friend', 'solicitor', etc),
  access_level VARCHAR ('view', 'view_and_comment', 'executor'),
  invited_at TIMESTAMP,
  accepted_at TIMESTAMP (NULL if not accepted),
  sharing_link_token VARCHAR UNIQUE, -- private token
);

-- Files/media
CREATE TABLE files (
  id UUID PRIMARY KEY,
  preferences_id UUID (FK: preferences.id),
  file_name VARCHAR,
  file_type VARCHAR ('image', 'audio', 'document', 'other'),
  file_size INT (bytes),
  storage_path VARCHAR (Supabase path),
  uploaded_at TIMESTAMP,
);

-- Activity log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY,
  user_id UUID (FK: users.id),
  action VARCHAR ('created', 'updated', 'shared', 'downloaded', 'viewed'),
  details TEXT (JSON),
  created_at TIMESTAMP,
);

-- Comments (family discussion)
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  family_member_id UUID (FK: family_members.id),
  preferences_id UUID (FK: preferences.id),
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID (FK: users.id),
  type VARCHAR ('annual_reminder', 'family_update', 'share_accepted'),
  message TEXT,
  sent_at TIMESTAMP,
  read_at TIMESTAMP (NULL = unread),
);

-- Stripe/billing (if using Stripe)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID (FK: users.id),
  stripe_customer_id VARCHAR,
  stripe_subscription_id VARCHAR,
  plan VARCHAR ('free', 'premium'),
  status VARCHAR ('active', 'cancelled', 'past_due'),
  started_at TIMESTAMP,
  ends_at TIMESTAMP,
  created_at TIMESTAMP,
);
```

---

## ЧАСТЬ 6: API ENDPOINTS (для backend)

### 6.1 Authentication (via Clerk, so mostly built-in)

```
GET /api/auth/user          (Get current user)
POST /api/auth/login        (Login with email/password)
POST /api/auth/logout       (Logout)
POST /api/auth/verify       (Verify email/2FA)
```

### 6.2 Preferences

```
POST /api/preferences       (Create new preferences)
GET /api/preferences/:id    (Get user's preferences)
PUT /api/preferences/:id    (Update preferences)
DELETE /api/preferences/:id (Delete preferences)
GET /api/preferences/:id/pdf (Generate & download PDF)
```

### 6.3 Family Sharing

```
POST /api/family/invite               (Send invite email)
GET /api/family/shared/:shareToken    (View preferences by token)
POST /api/family/accept/:token        (Accept sharing invitation)
DELETE /api/family/revoke/:memberId   (Revoke access)
GET /api/family/members/:prefId       (List who has access)
PUT /api/family/members/:memberId     (Update permissions)
```

### 6.4 Files

```
POST /api/files/upload              (Upload file to Supabase)
GET /api/files/:prefId              (List files for preference)
DELETE /api/files/:fileId           (Delete file)
POST /api/files/:fileId/download    (Download file)
```

### 6.5 Comments

```
POST /api/comments                  (Add comment)
GET /api/comments/:prefId           (Get all comments)
DELETE /api/comments/:commentId     (Delete comment)
```

### 6.6 Notifications

```
GET /api/notifications              (Get user notifications)
PUT /api/notifications/:id/read     (Mark as read)
POST /api/notifications/preferences (Set notification preferences)
```

### 6.7 Admin/Internal

```
POST /api/email/remind-annual       (Cron job for annual reminders)
POST /api/email/send-share-invite   (Send email invite)
GET /api/analytics/dashboard        (Admin dashboard data)
```

---

## ЧАСТЬ 7: ПРИОРИТИЗАЦИЯ ФУНКЦИЙ

### 7.1 MVP (Must Have) - Week 1-3

```
✓ Landing page (simplified, high-converting)
✓ Sign up / Login (Clerk integration)
✓ Onboarding questionnaire (6 steps)
✓ Dashboard (view & edit preferences)
✓ PDF export
✓ Basic sharing (email invites)
✓ Family view (read-only)
✓ Help / FAQ page
✓ Settings (basic)
✓ GDPR compliance (privacy policy, data export)
```

### 7.2 Phase 2 (Nice to Have) - Week 4-6

```
□ Video message recording (record 2-min message)
□ Legacy letters feature (write, auto-deliver)
□ Comments/discussion on preferences
□ Activity log with timestamps
□ Two-factor authentication (2FA)
□ Executor dashboard (special access)
□ Annual reminders (automated emails)
□ A/B testing setup (for optimization)
□ Premium tier (£9/year)
□ Billing integration (Stripe)
```

### 7.3 Phase 3 (Future) - Month 2+

```
□ Mobile app (iOS / Android native)
□ AI-powered suggestions ("Based on your type, consider...")
□ Integration with ClearFuneralCost (cross-product)
□ B2B API for partners (solicitors, FDs)
□ Memorial page conversion (after death)
□ Video recording storage (longer, higher quality)
□ Integration with will-writing services
□ Multi-language support
□ Accessibility improvements (WCAG 2.1 AAA)
□ Advanced analytics (for admin)
```

---

## ПРИЛОЖЕНИЕ: QUICK REFERENCE CHECKLIST

### For Cursor AI Build

```
BEFORE YOU START:
☑ Understand the user journey (landing → signup → onboarding → dashboard)
☑ Review color palette and typography (maintain consistency)
☑ Confirm database schema (matches dependencies)
☑ Set up Supabase project + tables
☑ Integrate Clerk for authentication
☑ Set up Resend for emails

PAGES TO BUILD (In Priority Order):
☑ Landing page (/):
  ├─ Hero section
  ├─ Problem statement
  ├─ Solution (3-step process)
  ├─ Testimonials
  ├─ Pricing
  ├─ FAQ
  └─ Footer

☑ Auth pages (/auth/signup, /auth/login)
  ├─ Sign up form (email, name, password)
  ├─ Login form (email, password)
  └─ Magic link alternative

☑ Onboarding (/onboarding/preferences)
  ├─ Multi-step form (6 steps)
  ├─ Progress bar
  ├─ Auto-save functionality
  └─ Summary & completion

☑ Dashboard (/dashboard)
  ├─ Welcome banner
  ├─ Status card
  ├─ Primary actions (download, share, edit)
  ├─ Quick view of preferences
  ├─ Family & sharing widget
  ├─ Annual reminder (if applicable)
  ├─ Premium upgrade card
  └─ Activity log

☑ Family sharing view (/family/shared/[linkId])
  ├─ Read-only preferences display
  ├─ Discussion/comments section
  ├─ Download option
  └─ Contact executor info

☑ Help / FAQ (/help)
  ├─ Search functionality
  ├─ Accordion sections
  ├─ Contact options
  └─ Links to policies

☑ Settings (/settings)
  ├─ Account info
  ├─ Privacy & security
  ├─ Billing (if premium)
  ├─ Notifications
  └─ Delete account

API ENDPOINTS TO BUILD:
☑ User management (create, update, delete)
☑ Preferences (CRUD operations)
☑ Family sharing (invites, permissions, acceptance)
☑ PDF generation & download
☑ Files (upload, list, delete)
☑ Comments (create, read, delete)
☑ Email delivery (invites, reminders)

TESTING:
☑ Unit tests for critical paths (auth, preferences save)
☑ E2E test (full user journey: signup → create → share)
☑ Mobile responsiveness (iPhone SE, iPad, Android)
☑ GDPR compliance check (data export, deletion)
☑ Performance (Lighthouse score 90+)
☑ Security (no XSS, CSRF protection, rate limiting)

DEPLOYMENT:
☑ Environment variables (.env.local)
☑ Supabase setup (tables, RLS policies)
☑ Clerk configuration
☑ Resend email templates
☑ Vercel deployment
☑ SSL certificate (auto with Vercel)
☑ DNS setup (if custom domain)

BEFORE LAUNCH:
☑ Privacy policy (reviewed by legal if budget allows)
☑ Terms of service
☑ GDPR disclaimer on data handling
☑ Helpdesk setup (email + Zendesk or similar)
☑ Analytics configured (Plausible or GA4)
☑ Error monitoring (Sentry or similar)
☑ Monitoring + alerting setup
```

---

**END OF SPECIFICATION DOCUMENT**

This document is ready for Cursor AI to generate a complete MVP. All pages, sections, components, and content are specified in detail. AI should be able to build a functional product from this specification.

**Key Takeaway for Builder:**
- Focus on clear, warm tone
- Emotional design (not morbid)
- Simple, fast onboarding (5 minutes max)
- Strong privacy/security messaging (GDPR compliance)
- Family-centric (not death-centric) messaging
- Mobile-first design
- Accessibility first (WCAG 2.1 AA minimum)