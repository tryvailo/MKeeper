# DearAfter Registry - Content Documentation for Copywriter

**Date:** January 2025  
**Purpose:** Complete documentation of all pages, structure, and copy for copywriter review and updates  
**Language:** British English (en-GB)  
**Tone:** Warm, empathetic, professional, family-focused (not death-focused)

---

## TABLE OF CONTENTS

1. [Landing Page](#1-landing-page)
2. [Onboarding Questionnaire](#2-onboarding-questionnaire)
3. [Dashboard](#3-dashboard)
4. [Family Members Page](#4-family-members-page)
5. [Sharing & Permissions Page](#5-sharing--permissions-page)
6. [Reminders Page](#6-reminders-page)
7. [History & Activity Page](#7-history--activity-page)
8. [Settings Page](#8-settings-page)
9. [Help & FAQ Page](#9-help--faq-page)
10. [Family View Page](#10-family-view-page)
11. [Stories Page](#11-stories-page)
12. [Partners Page](#12-partners-page)
13. [Legal Page](#13-legal-page)
14. [Email Templates](#14-email-templates)
15. [System Messages & Alerts](#15-system-messages--alerts)

---

## 1. LANDING PAGE

**URL:** `/`  
**Purpose:** Conversion-focused landing page for new visitors  
**Access:** Public (no authentication required)

### Structure

#### Header/Navigation
- **Logo:** "DearAfter" (with icon)
- **Navigation Links:**
  - "How it works"
  - "Testimonials"
  - "Pricing"
  - "FAQ"
- **CTA Buttons:**
  - "Login" (ghost button, for signed-out users)
  - "Sign Up Free" (primary button, for signed-out users)
  - "Dashboard" (ghost button, for signed-in users)
  - UserButton (for signed-in users)

#### Hero Section
- **Main Headline:** "Leave your wishes for the ones you love"
- **Subheadline:** "Document your funeral preferences once. Share with family. Peace of mind for life."
- **Primary CTA Button:** "Start Now - It's Free" (for signed-out) / "Go to Dashboard" (for signed-in)
- **Secondary Text:** "Takes 5 minutes. No payment required."
- **Trust Badges:**
  - "Trusted by 1,000+ families"
  - "4.8★ rating"
  - "GDPR compliant"

#### Problem Section ("Why DearAfter?")
- **Section Heading:** "Why DearAfter?"
- **Card 1:**
  - **Title:** "70% of families don't know their loved one's wishes"
  - **Description:** "Leading to conflict, regret, and wrong decisions during an already difficult time."
- **Card 2:**
  - **Title:** "Funeral planning is stressful"
  - **Description:** "Reduce family burden by deciding in advance. Give your loved ones peace of mind."
- **Card 3:**
  - **Title:** "Your wishes matter"
  - **Description:** "Be remembered exactly how you want to be. Leave a legacy of love and care."

#### Solution Section ("How it works")
- **Section Heading:** "How it works in 3 steps"
- **Step 1 - Document:**
  - **Title:** "Document"
  - **Time:** "5 minutes"
  - **Description:** "Answer simple questions about your preferences (type, budget, wishes, music, readings...)"
- **Step 2 - Share:**
  - **Title:** "Share"
  - **Time:** "1 minute"
  - **Description:** "Email your wishes to family members. They can review, discuss, suggest changes."
- **Step 3 - Keep Safe:**
  - **Title:** "Keep Safe"
  - **Time:** "Always accessible"
  - **Description:** "Your wishes are stored safely in the cloud. Your family knows what to do when needed."
- **CTA Button:** "Create Your Registry Now"

#### Testimonials Section
- **Section Heading:** "Families love DearAfter"
- **Testimonial 1:**
  - **Rating:** 5 stars
  - **Text:** "My mum documented everything. When she died, we knew exactly what she wanted. It made everything so much easier and brought family together."
  - **Author:** "Sarah, 42 | Manchester"
- **Testimonial 2:**
  - **Rating:** 5 stars
  - **Text:** "As a solicitor, I recommend DearAfter to every will-writing client. It saves time, prevents family conflict, and shows clients care about their loved ones."
  - **Author:** "James, Solicitor | London"
- **Testimonial 3:**
  - **Rating:** 5 stars
  - **Text:** "I worried my kids wouldn't know what I wanted. Now they have everything they need. Gives me peace."
  - **Author:** "Margaret, 68 | Bristol"

#### Pricing Section
- **Section Heading:** "Simple, Transparent Pricing"
- **Subheading:** "Start free. Upgrade if you want more."
- **Free Plan Card:**
  - **Title:** "Free"
  - **Price:** "£0/year"
  - **Features:**
    - "Document your preferences"
    - "Download PDF"
    - "Share with 1 family member"
    - "Annual reminders"
  - **CTA:** "Get Started"
- **Premium Plan Card:**
  - **Badge:** "Most Popular"
  - **Title:** "Premium"
  - **Price:** "£9/year"
  - **Features:**
    - "Everything in Free +"
    - "Share with unlimited family members"
    - "\"Legal stamp\" (certified look)"
    - "Email reminders (quarterly vs annual)"
    - "Video message (record 2-min message)"
    - "Legacy letters (write to family, auto-deliver after death)"
  - **CTA:** "Start Premium"
- **Footer Text:** "Cancel anytime. No hidden fees. GDPR compliant."

#### FAQ Section
- **Section Heading:** "Frequently Asked Questions"
- **Q1:** "Is this a legal document?"
  - **A1:** "No, DearAfter is not a legal document. It's an informational tool to share your preferences with family. If you want legal binding, consult a solicitor."
- **Q2:** "Is my data safe?"
  - **A2:** "Yes. Your data is encrypted and stored securely on Supabase servers in the UK. We comply with GDPR."
- **Q3:** "Can I update my preferences?"
  - **A3:** "Yes! You can update anytime. Your family gets notified when you make changes."
- **Q4:** "What happens to my data if I die?"
  - **A4:** "Your family can access your preferences if they know the login (which you should tell them). We recommend keeping a password in a safe place with your will."
- **Q5:** "Can I delete my account?"
  - **A5:** "Yes, anytime. We'll delete all your data permanently."
- **Q6:** "Who can I contact if I have questions?"
  - **A6:** "Email support@dearafter.com or use the chat."

#### Footer
- **Company Description:** "DearAfter helps families document funeral wishes and share them securely with loved ones."
- **Links Section:**
  - "Privacy Policy"
  - "Terms"
  - "Contact"
- **Social Links:**
  - "Twitter"
  - "Facebook"
  - "LinkedIn"
- **Newsletter Section:**
  - **Heading:** "Newsletter"
  - **Subheading:** "Stay updated"
  - **Placeholder:** "your@email.com"
  - **Button:** "Subscribe"
- **Copyright:** "© 2025 DearAfter. All rights reserved."

---

## 2. ONBOARDING QUESTIONNAIRE

**URL:** `/onboarding`  
**Purpose:** Multi-step form to collect user preferences  
**Access:** Authenticated users only  
**Total Steps:** 6

### Page Header
- **Title:** "Fill Out Your Preferences Questionnaire"
- **Subtitle:** "This takes about 5 minutes. You can save and return anytime."
- **Progress Indicator:** "Step X of 6" and percentage

### Step 1: Funeral Type
- **Question:** "What type of funeral do you prefer?"
- **Help Text:** "This affects cost and planning details"
- **Options:**
  1. **Traditional Funeral**
     - Description: "Full service with viewing, ceremony, burial/cremation"
     - Price: "£3,000-5,000"
  2. **Cremation with Service**
     - Description: "Cremation with memorial service"
     - Price: "£2,000-3,500"
  3. **Direct Cremation**
     - Description: "No service or viewing. Just cremation."
     - Price: "£1,000-1,500 (cheapest option)"
  4. **Natural/Eco Funeral**
     - Description: "Biodegradable coffin, woodland burial, eco-friendly"
     - Price: "£2,500-4,000"
  5. **I'm not sure**
     - Description: "Choose later, we'll help"
- **Button:** "Next"

### Step 2: Budget
- **Question:** "What's your budget for funeral?"
- **Help Text:** "This helps us suggest realistic options"
- **Options:**
  - "£1,000-2,000 (minimalist)"
  - "£2,000-3,500 (standard)"
  - "£3,500-5,000 (traditional)"
  - "£5,000+ (premium, no limits)"
  - "I'm not sure (skip)"
- **Buttons:** "Back" | "Next"

### Step 3: Executor & Decision Maker
- **Question:** "Who will make funeral decisions for you?"
- **Help Text:** "This person will be notified and given access to your preferences"
- **Fields:**
  - **Name:** Placeholder "John Smith"
  - **Email:** Placeholder "john@example.com"
  - **Relationship:** Dropdown with options:
    - "Select relationship"
    - "Spouse"
    - "Partner"
    - "Adult Child"
    - "Friend"
    - "Solicitor"
    - "Other"
- **Optional Section:** "Your Information (Optional)"
  - **Age:** Placeholder "e.g., 65"
  - **Location:** Placeholder "e.g., London, England"
- **Buttons:** "Back" | "Next"

### Step 4: Funeral Wishes (Details)
- **Question:** "Describe your funeral wishes in detail"
- **Help Text:** "Be as detailed as you want. Short notes are fine too."
- **Accordion Sections:**

  **Ceremony:**
  - "Do you want a service?" (Yes/No radio buttons)
  - "Where should it be held?" Placeholder "Church, Crematorium, Cemetery, Other"
  - "Any religious/cultural requirements?" (textarea)

  **Music & Readings:**
  - "Favorite songs for the ceremony?" Placeholder "e.g., 'Amazing Grace', 'My Way' by Sinatra..."
  - "Any poems or readings you want?" Placeholder "e.g., Corinthians 13:4-8, Rupert Brooke..."
  - "Who should give the eulogy?" Placeholder "Name"

  **Flowers & Decorations:**
  - "Preferred flowers?" Placeholder "e.g., Roses, Lilies, Sunflowers..."
  - "Colors?" Placeholder "e.g., White, Blue, Colorful..."
  - "Any special decorations?" (textarea)

  **Food & Reception:**
  - "Should there be a reception?" (Yes/No radio buttons)
  - "Venue preference?" (input)
  - "Food/drinks?" Placeholder "e.g., Tea and biscuits, Wake party, Pub lunch..."
  - "Budget for reception?" Placeholder "£"

  **Other Wishes:**
  - "Any charities donations?" (textarea)
  - "Dress code?" (input)
  - "Any other requests?" (textarea)
  - "Things you DON'T want?" Placeholder "e.g., No black, no flowers, no long speeches..."
- **Buttons:** "Back" | "Next"

### Step 5: Media & Documents
- **Question:** "Upload any additional files (optional)"
- **Help Text:** "These will be stored with your preferences. Max file size: 10MB per file."
- **Upload Categories:**
  - "Photos" - "Drag & drop or click to upload"
  - "Music files" - "Drag & drop or click to upload"
  - "Documents (will, letters, etc)" - "Drag & drop or click to upload"
  - "Other" - "Drag & drop or click to upload"
- **Button Text:** "Choose File"
- **Buttons:** "Back" | "Skip & Continue"

### Step 6: Review & Complete
- **Heading:** "Review your preferences"
- **Subheading:** "You can edit these anytime from your dashboard"
- **Review Cards:**
  - **Funeral Type Card**
    - Title: "Funeral Type"
    - Content: Shows selected type
  - **Budget Card** (if selected)
    - Title: "Budget"
    - Content: Shows budget range
  - **Executor Card** (if filled)
    - Title: "Executor"
    - Content: Name, email, relationship
  - **Key Wishes Card** (if any wishes filled)
    - Title: "Key Wishes"
    - Content: Preview of music, readings, flowers
- **Confirmation Checkbox:** "I've reviewed everything and it's correct"
- **Buttons:** "Back" | "Complete & Create Dashboard"
- **Loading State:** "Saving..."

### Error Messages
- **Validation Error:** "Please confirm that you've reviewed everything"
- **Save Error:** "Error saving data. Please try again."

---

## 3. DASHBOARD

**URL:** `/dashboard`  
**Purpose:** Main user dashboard showing preferences overview and actions  
**Access:** Authenticated users only

### Page Header
- **Logo:** "DearAfter" (with icon)
- **Navigation:**
  - "Help" button
  - "Settings" button (with icon)

### Sidebar Navigation
- **My Registry** (active state)
- **Family Members**
- **Sharing & Permissions"
- **Reminders"
- **History & Activity"
- **Settings"

### Empty State (No Preferences)
- **Card Title:** "Welcome!"
- **Description:** "You don't have any saved preferences yet. Create them now."
- **CTA Button:** "Fill Out Questionnaire"

### Welcome Banner (shown if account < 1 month old)
- **Title:** "Welcome to your DearAfter Registry"
- **Message:** "You're all set! Here's what you can do next:"
- **Quick Action Buttons:**
  - "Download PDF"
  - "Share with Family"
  - "Edit Preferences"
- **Close Button:** "×"

### Status Card
- **Title:** "Your Preferences Status"
- **Fields:**
  - **Last updated:** Shows date or "Never"
  - **Next reminder:** Shows date with "(annual check)"
  - **Family members with access:** "X people"
  - **Progress:** "✓ All sections complete" (with icon)
- **CTA Button:** "Edit Preferences"

### Primary Actions (3 Cards)

**Card 1: Download PDF**
- **Icon:** Download icon
- **Title:** "Download Your Preferences"
- **Description:** "Get a beautiful, printable PDF of your wishes. Share with family or keep in safe place."
- **Button:** "Download PDF"
- **Success Message:** "PDF instructions successfully generated!"
- **Error Message:** "Error generating PDF. Please try again."

**Card 2: Share with Family**
- **Icon:** Users icon
- **Title:** "Share with Family"
- **Description:** "Send email invites to family members. They'll get private access to your preferences."
- **Input Placeholder:** "Recipient email"
- **Button:** "Share Now" / "Sending..." (loading)
- **Success Message:** "Access link sent to [email]"
- **Error Message:** "Error sending link. Please try again."

**Card 3: Edit Preferences**
- **Icon:** Edit icon
- **Title:** "Edit Your Preferences"
- **Description:** "Update your wishes, change budget, add details."
- **Button:** "Edit Now"

### Quick View: Your Preferences
- **Title:** "Your Preferences at a Glance"
- **Fields Displayed:**
  - "Funeral Type: [type]"
  - "Budget: £[range]"
  - "Executor: [name]"
  - "Key Wish: [preview]"
- **CTA Button:** "View Full Details →"

### Premium Upgrade Card
- **Badge:** "Free tier"
- **Title:** "Upgrade to Premium"
- **Description:** "Unlock unlimited family members, video messages, legacy letters, and more."
- **Features List:**
  - "Unlimited family members"
  - "Record video message (2 min)"
  - "Legacy letters (auto-deliver to family)"
  - "Priority support"
- **CTA Button:** "Upgrade Now - Only £9/year"

### Recent Activity Card
- **Title:** "Recent Activity"
- **Empty State:** "No activity yet"
- **Activity Items:**
  - "Created preferences"
  - "Updated preferences"
  - "Generated PDF"
  - "Shared preferences"
- **CTA Button:** "View Full History →"

### Loading States
- **Main Loading:** "Loading..." (with spinner)

---

## 4. FAMILY MEMBERS PAGE

**URL:** `/dashboard/family`  
**Purpose:** Manage family members who have access to preferences  
**Access:** Authenticated users only

### Page Header
- **Back Link:** "Back to Dashboard" (with arrow icon)
- **Title:** "Family Members" (with logo)

### Main Card
- **Title:** "Who Has Access?"
- **CTA Button:** "Add Family Member" (with Users icon)

### Add Family Member Form (shown when button clicked)
- **Email Field:**
  - **Label:** "Email *"
  - **Placeholder:** "family@example.com"
- **Name Field:**
  - **Label:** "Name"
  - **Placeholder:** "John Smith"
- **Relationship Dropdown:**
  - **Label:** "Relationship"
  - **Options:**
    - "Spouse"
    - "Partner"
    - "Adult Child"
    - "Friend"
    - "Solicitor"
    - "Other"
- **Access Level Dropdown:**
  - **Label:** "Access Level"
  - **Options:**
    - "View Only"
    - "View & Comment"
    - "Executor"
- **Buttons:**
  - "Send Invitation" (with Mail icon)
  - "Cancel"

### Empty State
- **Icon:** Users icon (large, gray)
- **Message:** "No family members yet."
- **CTA Button:** "Add Family Member"

### Family Members List
Each member card shows:
- **Avatar:** User icon in blue circle
- **Name:** Member name or email
- **Email:** Member email address
- **Relationship:** Capitalized relationship type
- **Status Badge:**
  - "Accepted" (if accepted_at exists)
  - "Pending" (if not accepted)
- **Access Level Badge:**
  - "Executor"
  - "View & Comment"
  - "View Only"
- **Actions:**
  - Edit button (pencil icon)
  - Delete button (trash icon, red)

### Edit Mode
- **Access Level Dropdown:** Shows current access level
- **Cancel Button:** "Cancel"

### Messages
- **Success (Add):** "Invitation sent successfully!"
- **Success (Update):** "Member updated successfully"
- **Success (Revoke):** "Access revoked successfully"
- **Error (Add):** "Failed to send invitation"
- **Error (Update):** "Failed to update member"
- **Error (Revoke):** "Failed to revoke access"
- **Confirm (Revoke):** "Are you sure you want to revoke access for this member?"

### Loading State
- **Text:** "Loading..."

---

## 5. SHARING & PERMISSIONS PAGE

**URL:** `/dashboard/sharing`  
**Purpose:** Create and manage share links for preferences  
**Access:** Authenticated users only

### Page Header
- **Back Link:** "Back to Dashboard" (with arrow icon)
- **Title:** "Sharing & Permissions" (with logo)

### Share via Email Card
- **Title:** "Share via Email"
- **Email Field:**
  - **Label:** "Email Address *"
  - **Placeholder:** "family@example.com"
- **Name Field:**
  - **Label:** "Name (optional)"
  - **Placeholder:** "John Smith"
- **Relationship Dropdown:**
  - **Label:** "Relationship"
  - **Options:** Same as Family Members page
- **Access Level Dropdown:**
  - **Label:** "Access Level"
  - **Options:** Same as Family Members page
- **Button:** "Send Invitation" / "Sending..." (loading state)
- **Success Message:** "Invitation email sent to [email]!" or "Share link created for [email]. Link: [url]"
- **Error Message:** "Failed to generate share link" or "Please create preferences first"

### Active Share Links Card
- **Title:** "Active Share Links"
- **Empty State:** "No active share links"
- **Link Items:**
  - **Email:** Member email
  - **Link:** Full URL (breakable)
  - **Created Date:** "Created: [date]"
  - **Actions:**
    - "Copy" button (with Copy icon)
    - Delete button (trash icon)
- **Success (Copy):** "Link copied to clipboard!"
- **Success (Revoke):** "Share link revoked successfully"
- **Error (Revoke):** "Failed to revoke share link"
- **Confirm (Revoke):** "Are you sure you want to revoke this share link?"

---

## 6. REMINDERS PAGE

**URL:** `/dashboard/reminders`  
**Purpose:** View and manage annual review reminders  
**Access:** Authenticated users only

### Page Header
- **Back Link:** "Back to Dashboard" (with arrow icon)
- **Title:** "Reminders" (with logo)

### Annual Review Reminder Card
- **Title:** "Annual Review Reminder" (with Bell icon)
- **Next Reminder Section:**
  - **Label:** "Next reminder"
  - **Date:** Shows date (en-GB format)
  - **Status Icon:** CheckCircle2 icon (green)
- **Description:** "We'll send you an email reminder to review your preferences annually. This helps ensure your wishes stay up to date."
- **CTA Button:** "Update Reminder Settings"

---

## 7. HISTORY & ACTIVITY PAGE

**URL:** `/dashboard/history`  
**Purpose:** View activity log of all actions  
**Access:** Authenticated users only

### Page Header
- **Back Link:** "Back to Dashboard" (with arrow icon)
- **Title:** "History & Activity" (with logo)

### Activity Timeline Card
- **Title:** "Activity Timeline" (with Clock icon)
- **Loading State:** "Loading..."
- **Empty State:** "No activity yet"
- **Activity Items:**
  - **Action Types:**
    - "Created preferences"
    - "Updated preferences"
    - "Generated PDF"
    - "Shared preferences"
  - **Details:** Shows additional details if available
  - **Timestamp:** Shows date and time (en-GB format)

---

## 8. SETTINGS PAGE

**URL:** `/settings`  
**Purpose:** Manage account settings, privacy, billing, and notifications  
**Access:** Authenticated users only

### Page Header
- **Back Link:** "Back to Dashboard" (with arrow icon)
- **Title:** "Settings" (with logo)

### Sidebar Navigation
- **Account** (with User icon)
- **Privacy & Security" (with Shield icon)
- **Billing" (with CreditCard icon)
- **Notifications" (with Bell icon)
- **Delete Account" (with Trash2 icon, red)

### Account Tab

**Profile Information Card:**
- **Title:** "Profile Information"
- **Description:** "Update your account information"
- **Full Name Field:**
  - **Label:** "Full Name"
  - **Value:** Pre-filled from Clerk
- **Email Field:**
  - **Label:** "Email"
  - **Value:** Pre-filled from Clerk (disabled)
  - **Helper Text:** "Email cannot be changed here"
- **Button:** "Save Changes"

**Password Card:**
- **Title:** "Password"
- **Description:** "Change your password"
- **Button:** "Change Password"

**Login Activity Card:**
- **Title:** "Login Activity"
- **Text:** "Last login: [date/time]"
- **Button:** "View all login activity"

### Privacy & Security Tab

**Two-Factor Authentication Card:**
- **Title:** "Two-Factor Authentication"
- **Description:** "Add extra security with SMS or authenticator"
- **Status:** "Status: Off"
- **Helper Text:** "2FA is not enabled"
- **Button:** "Turn On"

**Session Timeout Card:**
- **Title:** "Session Timeout"
- **Description:** "Log out automatically after inactivity"
- **Options:**
  - "30 minutes"
  - "1 hour"
  - "2 hours"

**Data Export Card:**
- **Title:** "Data Export"
- **Description:** "Get all your data in GDPR-compliant format"
- **Button:** "Download my data as ZIP" (with Download icon)

**GDPR Rights Card:**
- **Title:** "GDPR Rights"
- **Text:** "Your privacy rights:"
- **Buttons:**
  - "View Privacy Policy"
  - "Download my data" (with Download icon)
  - "Delete my account" (red text)

### Billing Tab

**Current Plan Card:**
- **Title:** "Current Plan"
- **Plan Name:** "Free"
- **Subtext:** "Current subscription"
- **Button:** "Upgrade to Premium (£9/year)"

**Billing History Card:**
- **Title:** "Billing History"
- **Empty State:** "No payments yet"

### Notifications Tab

**Email Preferences Card:**
- **Title:** "Email Preferences"
- **Checkboxes:**
  - "Account updates" (checked by default)
  - "Annual reminders" (checked by default)
  - "Product updates" (checked by default)
  - "Marketing emails" (unchecked by default)
- **Button:** "Save preferences"

**Notification Frequency Card:**
- **Title:** "Notification Frequency"
- **Options:**
  - "Immediately"
  - "Daily digest"
  - "Weekly digest"

### Delete Account Tab

**Delete Account Card:**
- **Title:** "Delete Account" (with AlertTriangle icon, red)
- **Warning Alert:**
  - **Heading:** "Deleting your account is permanent."
  - **Text:** "We will delete:"
  - **List:**
    - "Your account"
    - "All preferences"
    - "All family sharing links"
    - "All data"
  - **Emphasis:** "This cannot be undone."
- **Initial Button:** "I understand, delete my account"
- **Confirmation State:**
  - **Question:** "Are you absolutely sure?"
  - **Buttons:**
    - "Yes, delete" (destructive)
    - "Cancel"

---

## 9. HELP & FAQ PAGE

**URL:** `/help`  
**Purpose:** Help center with FAQ and contact information  
**Access:** Public

### Page Header
- **Back Link:** "Back to Home" (with arrow icon)
- **Title:** "Help & FAQ" (with logo)

### Search Section
- **Placeholder:** "Search help topics..."
- **Helper Text:** "Can't find what you're looking for? Contact Support" (link to #contact)

### FAQ Sections (7 sections)

#### Section 1: General
- **Q:** "What is DearAfter Registry?"
  - **A:** "DearAfter Registry is a free online tool to document your funeral preferences and share them with family. It helps reduce stress and conflict during difficult times by ensuring your wishes are known and accessible."
- **Q:** "Is this a legal document?"
  - **A:** "No, DearAfter is not a legal document. It's an informational tool to share your preferences with family. If you want legal binding, consult a solicitor."
- **Q:** "Who should use DearAfter?"
  - **A:** "Anyone who wants to document their wishes and reduce family burden. It's especially helpful for adults who want to plan ahead and ensure their preferences are known."
- **Q:** "How much does it cost?"
  - **A:** "Free tier is completely free. Premium is £9/year and includes unlimited family members, video messages, legacy letters, and more."

#### Section 2: Privacy & Security
- **Q:** "Is my data safe?"
  - **A:** "Yes. Your data is encrypted and stored securely on UK-based servers. We comply with GDPR and use industry-standard security practices."
- **Q:** "Is DearAfter GDPR compliant?"
  - **A:** "Yes, we fully comply with GDPR regulations. You have the right to access, modify, or delete your data at any time."
- **Q:** "Who can see my preferences?"
  - **A:** "Only people you invite. No one else can see your preferences. We don't share your data with third parties."
- **Q:** "Can DearAfter employees see my data?"
  - **A:** "No, not without explicit permission for support issues. All data is encrypted and access is strictly controlled."

#### Section 3: Using DearAfter
- **Q:** "How do I create my preferences?"
  - **A:** "Sign up, answer the onboarding questions (5 min), done! You can edit anytime from your dashboard."
- **Q:** "How do I share with family?"
  - **A:** "Go to Dashboard > Share with Family. Enter email addresses. They get an email link to view your preferences."
- **Q:** "Can I edit my preferences after creating them?"
  - **A:** "Yes! Go to Dashboard > Edit Preferences. You can change anything anytime. Your family gets notified when you make changes."
- **Q:** "Can I delete my account?"
  - **A:** "Yes. Go to Settings > Delete Account. Your data will be permanently deleted."

#### Section 4: Premium
- **Q:** "What's included in Premium?"
  - **A:** "Unlimited family members, video message recording, legacy letters, quarterly email reminders, priority support, and ad-free experience."
- **Q:** "Is Premium worth it?"
  - **A:** "If you want more features and better support, yes! It's only £9/year - less than a cup of coffee per month."
- **Q:** "Can I cancel Premium?"
  - **A:** "Yes, anytime. No questions asked. You lose Premium features but keep your free account."

#### Section 5: What happens when you pass away
- **Q:** "How will my family access my preferences when I die?"
  - **A:** "You should give them your login details or keep the link in a safe place (like your will). We recommend sharing access information with your executor."
- **Q:** "Can I set up automatic access after my death?"
  - **A:** "Not yet. We're working on this feature. For now, share the link or login info with trusted family members."
- **Q:** "How long are preferences stored after death?"
  - **A:** "We store indefinitely unless family requests deletion. Your preferences remain accessible to those you've shared with."

#### Section 6: Technical
- **Q:** "What devices can I use?"
  - **A:** "Any device with a browser: desktop, tablet, phone. The website is fully responsive and works on all modern browsers."
- **Q:** "Can I access offline?"
  - **A:** "Download the PDF and keep it offline. Online access requires internet connection."
- **Q:** "Is there a mobile app?"
  - **A:** "Not yet. The website works great on mobile though. We're considering a mobile app in the future."

#### Section 7: Contact & Support
- **Q:** "How can I contact support?"
  - **A:** "Email support@dearafter.com, use the contact form below, or call +44 (0)20 XXXX XXXX during business hours."

### Contact Form Section
- **Title:** "Contact Support"
- **Email Section:**
  - **Label:** "Email"
  - **Link:** "support@dearafter.com"
- **Phone Section:**
  - **Label:** "Phone"
  - **Number:** "+44 (0)20 XXXX XXXX"
  - **Hours:** "Business hours: Mon-Fri 9am-5pm GMT"
- **Form:**
  - **Heading:** "Send us a message"
  - **Email Input:** Placeholder "Your email"
  - **Subject Input:** Placeholder "Subject"
  - **Message Textarea:** Placeholder "Your message..."
  - **Button:** "Send Message"
  - **Helper Text:** "We'll reply within 24 hours"

---

## 10. FAMILY VIEW PAGE

**URL:** `/family/[token]`  
**Purpose:** Read-only view of shared preferences for family members  
**Access:** Public (via share token)

### Page Header
- **Logo:** "DearAfter" (with icon)

### Main Content
- **Heading:** "View Preferences"
- **Description:** "You have been granted access to funeral preferences. Please review the information below."

### Preferences Display Card
- **Title:** "Preferences"
- **Fields Displayed (if available):**
  - **Age:** Label "Age"
  - **Location:** Label "Location"
  - **Funeral Type:** Label "Funeral Type"
    - Values: "Cremation", "Traditional burial", "Eco-friendly funeral", "Other"
  - **Preferred Location:** Label "Preferred Location"
  - **Type of Memorial Service:** Label "Type of Memorial Service"
  - **General Wishes:** Label "General Wishes"
  - **Music Preferences:** Label "Music Preferences"
  - **Flower Preferences:** Label "Flower Preferences"
  - **Guest Preferences:** Label "Guest Preferences"
  - **Readings & Speeches:** Label "Readings & Speeches"

### Comments & Questions Section
- **Title:** "Comments & Questions"
- **Textarea:** Placeholder "Leave a comment or question..."
- **Button:** "Add Comment"
- **Comments Display:**
  - Shows comment text
  - Shows date (en-GB format)

### Error States
- **Loading:** "Loading..."
- **Error:** "Access not found or expired" or "Data not found"

---

## 11. STORIES PAGE

**URL:** `/stories`  
**Purpose:** User testimonials and stories  
**Access:** Public

### Page Header
- **Logo:** "DearAfter" (with icon)
- **Link:** "Home"

### Main Content
- **Heading:** "User Stories"
- **Subheading:** "Real stories from people who DearAfter helped avoid stress and conflict when organizing funerals."

### Story Cards

**Story 1:**
- **Title:** "How DearAfter helped our family"
- **Content:** "When my mum documented her preferences in DearAfter, we all breathed a sigh of relief. We didn't have to guess what she would have wanted, and there were no conflicts between relatives. Everything was clearly recorded and accessible."
- **Author:** "Anonymous"

**Story 2:**
- **Title:** "Peace of mind for the whole family"
- **Content:** "My father always talked about his wishes, but we never wrote them down. DearAfter helped us save all his thoughts in one place. Now we know exactly what to do, and it gives us peace."
- **Author:** "Anonymous"

**Story 3:**
- **Title:** "Simplicity and convenience"
- **Content:** "Filling out the questionnaire took just 15 minutes, and the result was a ready PDF document that we can show to the funeral home. Very convenient and professional."
- **Author:** "Anonymous"

### Share Your Story Section
- **Background:** Blue background with border
- **Heading:** "Share your story"
- **Description:** "Your story can help other families. We only publish anonymous reviews."
- **Button:** "Add your review"

---

## 12. PARTNERS PAGE

**URL:** `/partners`  
**Purpose:** List recommended solicitors and funeral homes  
**Access:** Public

### Page Header
- **Logo:** "DearAfter" (with icon)
- **Link:** "Home"

### Main Content
- **Heading:** "Our Partners"
- **Subheading:** "Recommended solicitors and funeral homes that work with DearAfter and can help you with document preparation and funeral organisation."

### Partner Cards

**Partner 1:**
- **Badge:** "Solicitors"
- **Name:** "Smith & Associates Solicitors"
- **Description:** "Specialises in probate law and will preparation"
- **Link:** "Visit website →"

**Partner 2:**
- **Badge:** "Funeral Home"
- **Name:** "Dignified Farewells Funeral Home"
- **Description:** "Full range of funeral services with a personal approach"
- **Link:** "Visit website →"

**Partner 3:**
- **Badge:** "Funeral Home"
- **Name:** "Green Memory Eco Funerals"
- **Description:** "Eco-friendly funeral and cremation options"
- **Link:** "Visit website →"

### Become a Partner Section
- **Heading:** "Become a Partner"
- **Description:** "If you represent a law firm or funeral home and want to become a DearAfter partner, contact us."
- **Button:** "Contact Us"

---

## 13. LEGAL PAGE

**URL:** `/legal`  
**Purpose:** Legal information, privacy policy, and terms  
**Access:** Public

### Page Header
- **Logo:** "DearAfter" (with icon)
- **Link:** "Home"

### Main Content
- **Heading:** "Legal Information"

### FAQ Section
- **Heading:** "FAQ"
- **Q1:** "What is DearAfter?"
  - **A1:** "DearAfter is a platform for storing and sharing funeral preferences. You can save your wishes and share them with loved ones or trusted individuals."
- **Q2:** "How is my data protected?"
  - **A2:** "All data is encrypted and accessible only to you and people you've granted access to. We comply with GDPR and use industry-standard security practices."
- **Q3:** "Can I update my preferences?"
  - **A3:** "Yes, you can edit your preferences at any time through your dashboard."

### Official Document Templates Section
- **Heading:** "Official Document Templates"
- **Description:** "Recommendations for legal protection of instructions. Advice on document preparation."
- **Placeholder Text:** "Document templates will be added soon. For consultation, please contact our partner solicitors."

### Useful Links Section
- **Heading:** "Useful Links"
- **Links:**
  - "Government resources for funeral planning"
  - "Recommendations for will writing"
  - "Consumer rights information"

---

## 14. EMAIL TEMPLATES

### Share Invite Email
**Subject:** "[InviterName] shared their funeral preferences with you"

**HTML Content:**
- **Heading:** "You've been invited"
- **Greeting:** "Hello [RecipientName]," or "Hello,"
- **Main Text:** "[InviterName] ([relationship]) has shared their funeral preferences with you through DearAfter Registry."
- **Access Level:** "Your access level: [View Only / View & Comment / Executor (full access)]"
- **Info Box:** 
  - **Title:** "What is DearAfter?"
  - **Text:** "DearAfter Registry is a secure platform for documenting and sharing funeral preferences. This helps ensure wishes are known and accessible when needed."
- **CTA Button:** "View Preferences" (links to share URL)
- **Privacy Note:** "This link is private and secure. Only you have access to view these preferences."
- **Disclaimer:** "If you didn't expect this invitation, you can safely ignore this email."
- **Signature:** "— The DearAfter Team"

---

## 15. SYSTEM MESSAGES & ALERTS

### Success Messages
- "Invitation sent successfully!"
- "Invitation email sent to [email]!"
- "Share link created for [email]. Link: [url]"
- "Member updated successfully"
- "Access revoked successfully"
- "Share link revoked successfully"
- "PDF instructions successfully generated!"
- "Access link sent to [email]"
- "Link copied to clipboard!"
- "Preferences saved successfully"

### Error Messages
- "Error saving data. Please try again."
- "Failed to save preferences"
- "Failed to send invitation"
- "Failed to update member"
- "Failed to revoke access"
- "Failed to generate share link"
- "Error generating PDF. Please try again."
- "Error sending link. Please try again."
- "Please create preferences first"
- "Access not found or expired"
- "Data not found"
- "Please confirm that you've reviewed everything"

### Confirmation Messages
- "Are you sure you want to revoke access for this member?"
- "Are you sure you want to revoke this share link?"
- "Are you absolutely sure?" (delete account)

### Loading States
- "Loading..."
- "Saving..."
- "Sending..."

### Empty States
- "No family members yet."
- "No active share links"
- "No activity yet"
- "You don't have any saved preferences yet. Create them now."

### Placeholders
- "family@example.com"
- "John Smith"
- "john@example.com"
- "e.g., 65"
- "e.g., London, England"
- "e.g., 'Amazing Grace', 'My Way' by Sinatra..."
- "e.g., Corinthians 13:4-8, Rupert Brooke..."
- "e.g., Roses, Lilies, Sunflowers..."
- "e.g., White, Blue, Colorful..."
- "e.g., Tea and biscuits, Wake party, Pub lunch..."
- "e.g., No black, no flowers, no long speeches..."
- "Leave a comment or question..."
- "Search help topics..."
- "Your email"
- "Subject"
- "Your message..."
- "Recipient email"

---

## NOTES FOR COPYWRITER

### Tone of Voice Guidelines
- **Warm & Empathetic:** Use compassionate language, acknowledge the sensitive nature of the topic
- **Professional:** Maintain credibility and trustworthiness
- **Family-Focused:** Emphasize family care and peace of mind, not death
- **Clear & Direct:** Avoid jargon, use simple language
- **British English:** Use British spelling and terminology (e.g., "solicitor" not "attorney", "organise" not "organize")

### Key Messaging Points
1. **Peace of Mind:** Emphasize reducing stress and conflict for families
2. **Love & Care:** Frame as an act of love and care for family
3. **Simplicity:** Highlight ease of use (5 minutes, simple questions)
4. **Security:** Emphasize privacy, security, GDPR compliance
5. **Accessibility:** Always accessible, shareable, printable

### Terminology
- Use "funeral preferences" not "funeral plans"
- Use "wishes" not "instructions" (unless legal context)
- Use "family members" not "beneficiaries"
- Use "executor" not "executor of estate"
- Use "preferences" not "requirements"

### Call-to-Action Language
- Primary CTAs: "Start Now - It's Free", "Create Your Registry Now", "Get Started"
- Secondary CTAs: "Learn More", "View Details", "Contact Support"
- Use action-oriented verbs: "Create", "Share", "Download", "Edit"

---

**END OF DOCUMENTATION**

This document contains all current copy and content from the DearAfter Registry application. Please review and suggest improvements maintaining the warm, empathetic, family-focused tone while ensuring clarity and British English consistency.

