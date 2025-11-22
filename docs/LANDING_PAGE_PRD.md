# Landing Page PRD: Memory Keeper (Legacy Words)
## Product Requirements Document for AI Copilot Design

**Version:** 1.0  
**Date:** January 2025  
**Purpose:** Complete specification for AI copilot to design professional landing page  
**Target:** AI design tools (Figma AI, Cursor, ChatGPT, Claude, etc.)

---

## EXECUTIVE SUMMARY: PROJECT ESSENCE

### What is Memory Keeper?

**Memory Keeper** (branded as "Legacy Words" on the landing page) is a **free, specialized web tool for preserving life stories** designed specifically for families facing early-stage dementia.

**Core Purpose:**  
Enable elderly individuals to document their personality, values, memories, and wishes during the critical window when cognitive function is still preserved enough for clear storytelling—before dementia progresses.

**Key Differentiators:**
- **Free forever** - No payment, no hidden fees, no catches
- **Dementia-focused** - Built specifically for families dealing with cognitive decline
- **Family collaboration** - Designed for family members to help document together
- **Simple & guided** - 32-question guided interview (35-40 minutes)
- **Secure & private** - Bank-level encryption, GDPR compliant, UK servers
- **Emotional value** - Preserves "who they are" not just "what they want"

**Mission Statement:**  
"Save what matters before memories fade. Preserve their voice, their values, their essence—while they can still tell you clearly."

**Value Proposition:**  
"Capture what makes them who they are. Before dementia takes those memories away."

---

## TARGET AUDIENCE: DETAILED PROFILE FOR AI DESIGN

### Primary Segment: Dementia Caregivers (60-70% of users)

**Demographics:**
- **Age:** 45-65 years old
- **Gender:** 60% female, 40% male
- **Location:** United Kingdom (primary), expanding to EU
- **Income:** Middle to upper-middle class (£28,700+ household income)
- **Education:** Secondary education or higher
- **Tech Comfort:** Moderate (can use email, Facebook, basic web browsing)

**Psychographics:**
- **Emotional State:** 
  - Stressed, overwhelmed, grieving anticipatory loss
  - Feeling urgency ("I need to do this NOW before it's too late")
  - Guilt ("I should have started earlier")
  - Love and determination ("I will preserve their story")
  
- **Pain Points:**
  - Watching loved one lose memories daily
  - Fear of forgetting "who they really were"
  - Exhaustion from caregiving
  - Time pressure (2-3 year window before advanced stages)
  - Need for something simple (no energy for complex tools)
  
- **Motivations:**
  - Preserve legacy for future generations
  - Create something tangible before it's too late
  - Find meaning in difficult situation
  - Connect with family members
  - Honor their loved one's life

**Behavioral Patterns:**
- Active in dementia support groups (Facebook, Reddit r/dementia, Alzheimer's Society forums)
- Researching "how to preserve memories" online
- Seeking emotional support and practical solutions
- Time-constrained (caregiving takes priority)
- Prefer simple, guided experiences (no complex forms)
- Value trust and security (dealing with sensitive family information)

**Design Implications:**
- **Visual Style:** Warm, calming, hopeful (not clinical or scary)
- **Color Psychology:** Soft blues (trust, calm), gentle greens (growth, hope), avoid dark/morbid colors
- **Typography:** Large, readable fonts (16px+ body text), clear hierarchy
- **Imagery:** Warm family moments, light/hope themes, avoid hospitals/medical equipment
- **Tone:** Empathetic, supportive, respectful, not condescending
- **UX:** Simple navigation, clear CTAs, low cognitive load, mobile-friendly

### Secondary Segment: Adult Children of Elderly Parents (30-40% of users)

**Demographics:**
- **Age:** 35-55 years old
- **Gender:** Balanced
- **Location:** UK, EU
- **Income:** Middle to upper-middle class
- **Education:** Higher education common
- **Tech Comfort:** High (digital natives)

**Psychographics:**
- **Emotional State:**
  - Proactive planning mindset
  - Concerned about aging parents
  - Want to preserve family history
  - Sandwich generation (caring for kids + parents)
  
- **Pain Points:**
  - Parents resistant to "planning for death"
  - Difficulty starting conversations
  - Need tools that parents will actually use
  - Balancing multiple responsibilities
  
- **Motivations:**
  - Preserve family history
  - Create legacy for their own children
  - Peace of mind
  - Avoid future family conflicts

**Design Implications:**
- **Visual Style:** Modern, clean, trustworthy
- **Color Psychology:** Professional but warm, approachable
- **Typography:** Contemporary, readable
- **Imagery:** Multi-generational families, connection themes
- **Tone:** Professional yet warm, empowering
- **UX:** Fast, efficient, shareable

### Combined Audience Insights for AI Design:

**Critical Design Principles:**
1. **Empathy First** - Design must acknowledge emotional difficulty
2. **Simplicity** - Low cognitive load, clear path forward
3. **Trust** - Security badges, testimonials, professional appearance
4. **Hope** - Light, warmth, positive framing (not morbid)
5. **Accessibility** - Large text, high contrast, mobile-first
6. **Respect** - Dignified, never condescending or clinical

**Brand Personality for Design:**
- **Archetype:** The Counselor/The Caregiver (wise, supportive, warm)
- **Tone:** Warm but professional, respectful without being morbid
- **Visual Metaphors:** Light, bridge, safe place, legacy, conversation
- **Avoid:** Dark colors, medical imagery, fear-based visuals, corporate coldness

---

## LANDING PAGE STRUCTURE: COMPLETE SECTIONS & CONTENT

### SECTION 1: HEADER/NAVBAR

**Purpose:** Navigation and primary entry points

**Elements:**
- **Logo:** Memory Keeper icon + "Legacy Words" wordmark
- **Navigation Links:**
  - "How it works" (anchor link)
  - "Stories" (anchor link to testimonials)
  - "Help" (link to /help page)
  - "FAQ" (anchor link)
- **Right Side Actions:**
  - "Login" button (ghost/secondary style)
  - "Start Remembering" button (primary CTA, brand blue)

**Design Requirements:**
- Sticky header (stays visible on scroll)
- Clean, minimal design
- High contrast for accessibility
- Mobile: Hamburger menu for navigation
- Logo: 32px height, brand blue color (#1E40AF)

**Content:**
```
[Logo Icon] Legacy Words
[How it works] [Stories] [Help] [FAQ]    [Login] [Start Remembering]
```

---

### SECTION 2: HERO SECTION

**Purpose:** Immediate value proposition, emotional connection, primary CTA

**Headline (H1):**
```
Save what matters before memories fade
```

**Subheadline:**
```
A simple way to capture what makes them who they are. Before dementia takes those memories away.
```

**Primary CTA Button:**
```
[Start Remembering]
```
- Size: Large (text-lg, px-10, py-7)
- Color: Brand blue (#1E40AF)
- Hover: Darker blue, shadow lift, slight scale (1.05)
- Link: /sign-up

**Secondary Text (below CTA):**
```
Completely free • Takes 35-40 minutes • Your family will treasure this forever
```

**Trust Indicators (below secondary text):**
Three badges with icons:

1. **Trust Badge:**
   - Icon: CheckCircle2 (green)
   - Text: "Trusted by 200+ families"
   - Background: Light green circle (bg-brand-green/10)

2. **Recommendation Badge:**
   - Icon: Heart (green)
   - Text: "Alzheimer's Society recommended"
   - Background: Light green circle

3. **Security Badge:**
   - Icon: Shield (green)
   - Text: "Bank-level encryption"
   - Background: Light green circle

**Design Requirements:**
- Centered layout
- Max-width: 4xl (896px) for text
- Generous spacing (py-24 md:py-32)
- Background: Gradient from gray-50 to white
- Typography: 
  - H1: text-5xl md:text-6xl lg:text-7xl, font-bold, text-gray-900
  - Subheadline: text-xl md:text-2xl, text-gray-600
- Trust badges: Flex wrap, centered, gap-8 md:gap-12
- Border-top separator above trust badges

**Full Content:**
```
[Large centered section]

Save what matters before memories fade

A simple way to capture what makes them who they are. Before dementia takes those memories away.

[Start Remembering - Large Blue Button]

Completely free • Takes 35-40 minutes • Your family will treasure this forever

─────────────────────────────────────

[✓] Trusted by 200+ families
[❤️] Alzheimer's Society recommended  
[🛡️] Bank-level encryption
```

---

### SECTION 3: PROBLEM SECTION ("Why Legacy Words?")

**Purpose:** Validate pain points, create emotional resonance

**Section Header:**
```
Why Legacy Words?
```
- H2: text-4xl md:text-5xl, font-bold, text-gray-900

**Subheader:**
```
The problem is real. The solution is simple.
```
- text-lg, text-gray-600, max-w-2xl centered

**Three Problem Cards:**

**Card 1: Memory Loss**
- **Icon:** Brain (lucide-react), 40px, brand blue
- **Icon Background:** Light blue circle (bg-blue-50, p-4, rounded-2xl)
- **Title:** "Their memories are slipping away"
- **Description:** "As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. But you can save those things. Before it's too late."
- **Card Style:** Border-2, hover:border-brand-blue/20, shadow-lg on hover

**Card 2: Deeper Meaning**
- **Icon:** Heart, 40px, brand blue
- **Icon Background:** Light blue circle
- **Title:** "Not just facts. Their *why*."
- **Description:** "Yes, they want to know what kind of funeral. But they NEED to know why. What mattered to them. Who they were. How to celebrate them properly. That's what you give them with Legacy Words."
- **Card Style:** Same as Card 1

**Card 3: Time Pressure**
- **Icon:** Hourglass, 40px, brand blue
- **Icon Background:** Light blue circle
- **Title:** "The time to capture this is now"
- **Description:** "In the early stages of dementia, they can still tell their stories clearly. In a year or two, that might not be true. This is your chance to preserve who they are—while they can still tell you."
- **Card Style:** Same as Card 1

**Design Requirements:**
- Background: White (bg-white)
- Grid: md:grid-cols-3, gap-8 lg:gap-10
- Cards: Border-2 border-transparent, hover effects, rounded-lg
- Padding: py-24 md:py-32
- Centered text in cards
- Icons: 40px height, brand blue color

**Full Content:**
```
[White background section]

Why Legacy Words?

The problem is real. The solution is simple.

[Grid of 3 cards]

Card 1:
[Brain Icon]
Their memories are slipping away
As dementia progresses, so much is lost. Their stories, their laugh, what made them *them*. But you can save those things. Before it's too late.

Card 2:
[Heart Icon]
Not just facts. Their *why*.
Yes, they want to know what kind of funeral. But they NEED to know why. What mattered to them. Who they were. How to celebrate them properly. That's what you give them with Legacy Words.

Card 3:
[Hourglass Icon]
The time to capture this is now
In the early stages of dementia, they can still tell their stories clearly. In a year or two, that might not be true. This is your chance to preserve who they are—while they can still tell you.
```

---

### SECTION 4: SOLUTION SECTION ("How it works in 3 steps")

**Purpose:** Explain the process, reduce anxiety, show simplicity

**Section Header:**
```
How it works in 3 steps
```
- H2: text-4xl md:text-5xl, font-bold, text-gray-900

**Subheader:**
```
Simple, guided, and designed with dementia families in mind
```
- text-lg, text-gray-600, max-w-2xl centered

**Three Step Cards:**

**Step 1: Tell Their Story**
- **Number Badge:** "1" in blue circle (absolute positioned, top-left)
- **Icon:** BookOpen, 40px, brand blue
- **Icon Background:** Light blue circle
- **Title:** "Help them tell their story"
- **Subtitle:** "In their own words"
- **Description:** "Legacy Words guides them through 32 guided questions. Not clinical. Not scary. Just a conversation: 'What's your happiest memory?' 'Who means the most to you?' 'What are you proud of?' It's therapy. It's love. It's capturing who they really are."
- **Card Style:** Relative positioning for number badge, border-2, hover effects

**Step 2: Family Sees Clearly**
- **Number Badge:** "2" in blue circle
- **Icon:** Eye, 40px, brand blue
- **Icon Background:** Light blue circle
- **Title:** "Your family sees them clearly"
- **Subtitle:** "Understanding, not just information"
- **Description:** "Once the memories are captured, you share access with their children, spouse, or whoever needs to understand them. They can read at their own pace. Comment. Ask questions. Feel connected. It's like having one more conversation together."
- **Card Style:** Same as Step 1

**Step 3: Voice Stays Forever**
- **Number Badge:** "3" in blue circle
- **Icon:** Lock, 40px, brand blue
- **Icon Background:** Light blue circle
- **Title:** "Their voice stays forever"
- **Subtitle:** "Permanently preserved"
- **Description:** "Encrypted, secure, always accessible. Whether it's tomorrow or twenty years from now, when grief is less fresh, your family can revisit these memories. They can play them for grandchildren. They can remember who they were before dementia took them."
- **Card Style:** Same as Step 1

**CTA Below Steps:**
```
[Help Them Remember Now - Large Blue Button]
```
- Same styling as hero CTA
- Link: /sign-up

**Design Requirements:**
- Background: Gradient from gray-50 to white
- Grid: md:grid-cols-3, gap-8 lg:gap-10
- Number badges: 48px circle, bg-brand-blue, text-white, font-bold, shadow-lg
- Cards: Relative positioning, pt-8 for badge space
- Padding: py-24 md:py-32
- Centered CTA below grid

**Full Content:**
```
[Gradient background section]

How it works in 3 steps

Simple, guided, and designed with dementia families in mind

[Grid of 3 step cards with number badges]

Step 1:
[1] [Book Icon]
Help them tell their story
In their own words
Legacy Words guides them through 32 guided questions. Not clinical. Not scary. Just a conversation: 'What's your happiest memory?' 'Who means the most to you?' 'What are you proud of?' It's therapy. It's love. It's capturing who they really are.

Step 2:
[2] [Eye Icon]
Your family sees them clearly
Understanding, not just information
Once the memories are captured, you share access with their children, spouse, or whoever needs to understand them. They can read at their own pace. Comment. Ask questions. Feel connected. It's like having one more conversation together.

Step 3:
[3] [Lock Icon]
Their voice stays forever
Permanently preserved
Encrypted, secure, always accessible. Whether it's tomorrow or twenty years from now, when grief is less fresh, your family can revisit these memories. They can play them for grandchildren. They can remember who they were before dementia took them.

[Help Them Remember Now - Large Blue Button]
```

---

### SECTION 5: TESTIMONIALS SECTION ("Stories")

**Purpose:** Social proof, emotional connection, real-world validation

**Hero Quote (Large, Prominent):**
```
"My biggest regret is not recording a conversation with my grandma before she passed. I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the person she was before the dementia."
```
- Attribution: "Caregiver, Reddit r/AskOldPeopleAdvice"
- Style: Large text (text-xl md:text-2xl), left border accent (gradient blue), padding-left
- Background: Max-width 3xl, centered

**Section Header:**
```
What people are saying on Reddit
```
- H2: text-3xl md:text-4xl, font-bold, centered

**Three Testimonial Cards:**

**Card 1:**
```
"I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the man he was before the dementia."
- Caregiver, Reddit r/dementia
```
- Border-left: 4px solid amber-500
- Card style: Hover shadow

**Card 2:**
```
"I wish I had asked my parents more about their lives, their stories, what mattered to them. Now it's too late and I'm left with just fragments."
- Caregiver, Reddit r/caregivers
```
- Same styling as Card 1

**Card 3:**
```
"I had the idea and equipment to record conversations with my mum, but I kept putting it off. By the time I finally did it, she couldn't remember half the stories anymore."
- Caregiver, Reddit r/dementia
```
- Same styling as Card 1

**Early User Stories CTA Card:**
- Background: Gradient blue (from-blue-50 via-indigo-50 to-blue-50)
- Border: 2px solid brand-blue/30
- Icon: Sparkles, 32px, brand blue
- Title: "Early User Stories"
- Description: "Be one of the first to share how Legacy Words helped preserve your family's stories."
- Form: Email input + "Share Your Story" button
- Success state: CheckCircle icon + "Thank you! We'll be in touch soon."

**Design Requirements:**
- Background: White
- Grid: md:grid-cols-3 for testimonials
- Hero quote: Max-width 3xl, prominent styling
- Cards: Border-left accent, hover effects
- CTA card: Centered, max-width 3xl, gradient background
- Padding: py-24 md:py-32

**Full Content:**
```
[White background section]

[Large Quote Box]
"My biggest regret is not recording a conversation with my grandma before she passed. I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the person she was before the dementia."
- Caregiver, Reddit r/AskOldPeopleAdvice

What people are saying on Reddit

[Grid of 3 testimonial cards]

Card 1: [Amber left border]
"I wish I would have saved more voicemails, took more video, had more media based memories because now it is so hard to remember the man he was before the dementia."
- Caregiver, Reddit r/dementia

Card 2: [Amber left border]
"I wish I had asked my parents more about their lives, their stories, what mattered to them. Now it's too late and I'm left with just fragments."
- Caregiver, Reddit r/caregivers

Card 3: [Amber left border]
"I had the idea and equipment to record conversations with my mum, but I kept putting it off. By the time I finally did it, she couldn't remember half the stories anymore."
- Caregiver, Reddit r/dementia

[Gradient Blue CTA Card]
[Sparkles Icon]
Early User Stories
Be one of the first to share how Legacy Words helped preserve your family's stories.

[Email Input] [Share Your Story Button]
```

---

### SECTION 6: FREE SECTION

**Purpose:** Remove pricing barrier, emphasize accessibility

**Icon:**
- CheckCircle2, 80px, brand green
- Background: Light green circle (bg-brand-green/10, p-6, rounded-full)

**Headline:**
```
This is always free. Always will be.
```
- H2: text-4xl md:text-5xl, font-bold, text-gray-900

**Description:**
```
Legacy Words is completely free for dementia families. No payment ever. No hidden fees. No catches.
```
- text-xl, text-gray-600, max-w-2xl centered

**CTA Button:**
```
[Start Remembering - Large Blue Button]
```
- Same styling as hero CTA
- Link: /sign-up

**Design Requirements:**
- Background: Gradient from white to gray-50
- Centered layout
- Icon: Large, prominent
- Padding: py-24 md:py-32
- Max-width: 4xl for content

**Full Content:**
```
[Gradient background section]

[Large Green CheckCircle Icon]

This is always free. Always will be.

Legacy Words is completely free for dementia families. No payment ever. No hidden fees. No catches.

[Start Remembering - Large Blue Button]
```

---

### SECTION 7: FAQ SECTION

**Purpose:** Address concerns, reduce friction, build trust

**Section Header:**
```
Questions? We Have Answers
```
- H2: text-4xl md:text-5xl, font-bold, text-gray-900

**Subheader:**
```
Everything you need to know about Legacy Words
```
- text-lg, text-gray-600, max-w-2xl centered

**FAQ Items (Accordion):**

**FAQ 1:**
- **Question:** "Is this a medical thing? Will it help with dementia?"
- **Answer:** "No. Legacy Words isn't treatment or therapy (though many families find it therapeutic). It's simply a way to capture their story—who they are, what matters to them—while they can still tell you clearly. Think of it like recording a video before a surgery: it's not the surgery, but it matters to have it just in case. If you're looking for medical support, talk to your GP or contact the Alzheimer's Society. We're here to help with the human side: preserving their voice, their values, their essence."

**FAQ 2:**
- **Question:** "My parent is in advanced dementia. Is it too late?"
- **Answer:** "It depends. If they can still have conversations—even brief ones—it's never too late. You can work with them at their pace. But honestly? The best time is early on, when they're most clear. If you're just diagnosed, we'd suggest starting soon while you can still hear their full stories. If you're further along, you can still use Legacy Words with family members telling stories *about* them. Not ideal, but something."

**FAQ 3:**
- **Question:** "How long does this take? I'm exhausted."
- **Answer:** "You don't have to do it all at once. Take a section, take a break. Some families finish in one afternoon. Others do it over weeks. Your pace. Their pace. No rush. The point isn't speed—it's preserving what matters."

**FAQ 4:**
- **Question:** "Will my family actually use this, or will it just sit there?"
- **Answer:** "Honest answer? Some families dive in immediately. Others don't look at it for months, until they need it. But here's what matters: when they DO need it—when grief is fresh, or when they're explaining Grandma to a child, or when they're planning the funeral—it's there. And it helps. We hear from families years later: 'I just rewatched their memories. I'd forgotten how much they made me laugh.' That's why we do this."

**FAQ 5:**
- **Question:** "Is my data really private?"
- **Answer:** "Yes. Bank-level encryption. Your stories never leave our UK servers. We don't sell data. We don't share it. We don't even read it unless something goes wrong technically. You control exactly who sees what. You can delete everything anytime. Full GDPR compliant."

**FAQ 6:**
- **Question:** "What happens if they pass away while we're using it?"
- **Answer:** "Their stories stay safe. Forever. Family members you've invited keep access. You can download everything. Years later, you can come back. Your memories don't disappear. That's the point."

**FAQ 7:**
- **Question:** "Will this always be free?"
- **Answer:** "Yes. Legacy Words is completely free for dementia families. Always will be. No payment ever. No hidden fees. No catches. We believe preserving memories shouldn't cost anything—especially when families are already dealing with so much."

**Design Requirements:**
- Background: White
- Accordion component: Single item expandable
- Items: Border border-gray-200, rounded-lg, px-6 py-2
- Hover: border-brand-blue/30
- Questions: font-semibold, text-lg, text-left
- Answers: text-gray-600, leading-relaxed, pb-4
- Max-width: 4xl
- Padding: py-24 md:py-32
- Spacing: space-y-4 between items

**Full Content:**
```
[White background section]

Questions? We Have Answers

Everything you need to know about Legacy Words

[Accordion with 7 FAQ items]

1. Is this a medical thing? Will it help with dementia?
   [Expandable answer]

2. My parent is in advanced dementia. Is it too late?
   [Expandable answer]

3. How long does this take? I'm exhausted.
   [Expandable answer]

4. Will my family actually use this, or will it just sit there?
   [Expandable answer]

5. Is my data really private?
   [Expandable answer]

6. What happens if they pass away while we're using it?
   [Expandable answer]

7. Will this always be free?
   [Expandable answer]
```

---

### SECTION 8: FOOTER

**Purpose:** Legal links, support resources, newsletter signup

**Four Columns:**

**Column 1: About**
- **Title:** "Legacy Words"
- **Description:** "Legacy Words helps dementia families preserve what matters before memories fade. Free, private, forever."
- Text: text-sm, text-gray-600

**Column 2: Links**
- **Title:** "Links"
- **Items:**
  - Privacy Policy (link to /privacy)
  - Terms (link to /terms)
  - Contact (link to /contact)
- Style: space-y-2, text-sm

**Column 3: Support**
- **Title:** "Support"
- **Items:**
  - Dementia awareness (external link)
  - Alzheimer's Society (external link)
  - Family support groups (external link)
- Style: Same as Column 2

**Column 4: Newsletter**
- **Title:** "Newsletter"
- **Description:** "Get tips for dementia conversations and memory preservation"
- **Form:** Email input + Subscribe button
- Text: text-sm, text-gray-600

**Bottom Bar:**
```
© 2025 Legacy Words. All rights reserved.
```
- Centered, text-sm, text-gray-600
- Border-top separator above

**Design Requirements:**
- Background: Gray-50 (bg-gray-50)
- Border-top: border-gray-200
- Grid: md:grid-cols-4, gap-8
- Padding: py-16
- Max-width: 7xl
- Links: text-gray-600, hover:text-gray-900

**Full Content:**
```
[Gray background footer]

[4-column grid]

Column 1:
Legacy Words
Legacy Words helps dementia families preserve what matters before memories fade. Free, private, forever.

Column 2:
Links
Privacy Policy
Terms
Contact

Column 3:
Support
Dementia awareness
Alzheimer's Society
Family support groups

Column 4:
Newsletter
Get tips for dementia conversations and memory preservation
[Email Input] [Subscribe Button]

─────────────────────────────────────

© 2025 Legacy Words. All rights reserved.
```

---

## DESIGN SYSTEM SPECIFICATIONS FOR AI

### Color Palette

**Primary Colors:**
- **Brand Blue:** #1E40AF (Primary CTAs, links, accents)
- **Brand Green:** #10B981 (Success states, trust badges)
- **Text Dark:** #111827 (Headings)
- **Text Gray:** #374151 (Body text)
- **Text Light:** #6B7280 (Secondary text)
- **Background White:** #FFFFFF
- **Background Gray:** #F3F4F6 or #F9FAFB

**Semantic Colors:**
- **Success:** #10B981 (Green)
- **Error:** #DC2626 (Red)
- **Warning:** #F59E0B (Amber)
- **Info:** #3B82F6 (Blue)

**Gradients:**
- Hero background: from-gray-50 to-white
- Section backgrounds: from-white to-gray-50
- CTA card: from-blue-50 via-indigo-50 to-blue-50

### Typography

**Font Stack:**
```
System fonts: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

**Headings:**
- H1: text-5xl md:text-6xl lg:text-7xl, font-bold, text-gray-900, leading-tight
- H2: text-4xl md:text-5xl, font-bold, text-gray-900
- H3: text-3xl md:text-4xl, font-bold, text-gray-900
- H4: text-xl, font-semibold

**Body Text:**
- Large: text-xl md:text-2xl, text-gray-600
- Regular: text-base (16px), text-gray-600 or text-gray-700
- Small: text-sm (14px), text-gray-500 or text-gray-600

**Line Heights:**
- Headings: 1.2-1.3
- Body: 1.5-1.6 (relaxed)

### Spacing System

**Padding/Margins (8px grid):**
- XS: 4px
- S: 8px
- M: 16px
- L: 24px
- XL: 32px
- XXL: 48px

**Section Padding:**
- py-24 md:py-32 (vertical)
- px-4 sm:px-6 lg:px-8 (horizontal)

**Card Padding:**
- p-6 or px-6 py-6

### Components

**Buttons:**
- **Primary:** bg-brand-blue, text-white, px-10 py-7, rounded-lg, font-semibold
- **Large:** text-lg, h-auto, shadow-lg, hover:shadow-xl, hover:scale-105
- **Ghost:** Transparent background, text-gray-700

**Cards:**
- Background: white
- Border: border-2 border-transparent or border-gray-200
- Border-radius: rounded-lg (8px) or rounded-xl (12px)
- Shadow: hover:shadow-lg
- Padding: p-6 or px-6 py-6

**Icons:**
- Size: 24px (default), 40px (large), 80px (hero)
- Stroke: 2px
- Color: brand-blue or brand-green
- Background circles: bg-blue-50 or bg-brand-green/10

### Layout

**Container Max-Widths:**
- Full: max-w-7xl (1280px)
- Content: max-w-4xl (896px)
- Narrow: max-w-3xl (768px)

**Grid:**
- 3 columns: md:grid-cols-3, gap-8 lg:gap-10
- 4 columns: md:grid-cols-4, gap-8

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

### Imagery Guidelines

**DO Use:**
- Warm family moments (hands holding, connection)
- Light, hope, peace imagery
- Soft, gentle illustrations
- Multi-generational families
- Calming, peaceful scenes

**DON'T Use:**
- Hospitals or medical equipment
- Gravestones or cemeteries
- Sad or crying people
- Dark or morbid imagery
- Clinical or sterile visuals

---

## AI PROMPT TEMPLATE FOR DESIGN GENERATION

```
Create a professional landing page design for Memory Keeper (branded as "Legacy Words").

TARGET AUDIENCE:
- Primary: Dementia caregivers (45-65, stressed, overwhelmed, need simplicity)
- Secondary: Adult children of elderly parents (35-55, proactive planners)
- Emotional state: Urgent, loving, determined, exhausted
- Tech comfort: Moderate to high

BRAND PERSONALITY:
- Warm but professional
- Empathetic and supportive
- Respectful without being morbid
- Hopeful and calming
- Trustworthy and secure

DESIGN REQUIREMENTS:
- Colors: Brand blue (#1E40AF) primary, soft green (#10B981) accents
- Typography: System fonts, large readable text (16px+ body)
- Spacing: Generous (8px grid system)
- Imagery: Warm family moments, light/hope themes
- Tone: Empathetic, not clinical or scary
- Accessibility: High contrast, mobile-first, WCAG AA compliant

SECTIONS TO DESIGN:
1. Header/Navbar (sticky, clean, minimal)
2. Hero Section (centered, emotional headline, large CTA)
3. Problem Section (3 cards, validate pain points)
4. Solution Section (3 steps with number badges)
5. Testimonials Section (real Reddit quotes, emotional)
6. Free Section (remove pricing barrier)
7. FAQ Section (accordion, address concerns)
8. Footer (4 columns, newsletter, links)

KEY MESSAGES:
- "Save what matters before memories fade"
- "Completely free. Always will be."
- "Simple, guided, designed for dementia families"
- "Their voice stays forever"

AVOID:
- Dark or morbid colors/imagery
- Medical/clinical visuals
- Fear-based messaging
- Corporate coldness
- Small text or cramped layouts

Create a warm, empathetic, professional design that makes dementia families feel understood and supported.
```

---

## SUCCESS METRICS & VALIDATION

**Key Performance Indicators:**
- Conversion rate: Sign-up clicks / Page views (target: 3-5%)
- Time on page: Average session duration (target: 2+ minutes)
- Scroll depth: % of users reaching FAQ section (target: 60%+)
- CTA clicks: Primary button clicks (target: 10%+ of visitors)
- Bounce rate: Single-page sessions (target: < 50%)

**User Testing Priorities:**
1. Can users understand the value proposition in < 10 seconds?
2. Do users feel emotionally supported (not scared or overwhelmed)?
3. Is the CTA clear and compelling?
4. Are trust indicators visible and credible?
5. Does the design feel appropriate for the sensitive topic?

---

## NOTES FOR AI IMPLEMENTATION

1. **Emotional Sensitivity:** This is a deeply emotional topic. Design must be respectful, warm, and never exploitative.

2. **Accessibility First:** Many users may be older or stressed. Large text, high contrast, clear navigation are essential.

3. **Mobile Priority:** Caregivers often use mobile devices. Mobile-first responsive design is critical.

4. **Trust Building:** Security badges, testimonials, and professional appearance build trust for sensitive family information.

5. **Simplicity:** Users are exhausted. Simple, clear, guided experience reduces cognitive load.

6. **Hope Over Fear:** Frame positively (preserving memories) not negatively (preventing loss). Hope, not fear.

7. **British Sensibility:** UK audience prefers understated, respectful approach. Avoid American-style aggressive marketing.

---

**END OF PRD**

This document provides complete specifications for an AI copilot to design a professional, empathetic landing page for Memory Keeper that resonates with dementia families while maintaining brand consistency and conversion optimization.

