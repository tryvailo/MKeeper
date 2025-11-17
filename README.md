# Legacy Words

A free online tool for dementia families to preserve their loved one's story—who they are, what matters to them—before memories fade.

## Overview

Legacy Words helps families capture and preserve memories through a guided 32-question interview (35-40 minutes) across 5 categories:
- Memories That Matter
- Family & Relationships
- Values & Wisdom
- Interests & Personality
- Messages for Loved Ones

The captured story can be shared with family members, exported as PDF, and accessed via secure shareable links.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Clerk
- **PDF Generation:** jsPDF
- **Deployment:** Vercel (recommended)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for local)

### 3. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Run the SQL script from `supabase/schema.sql`
4. Copy your project URL and Anon Key to `.env.local`

### 4. Clerk Setup

1. Create an application at [clerk.com](https://clerk.com)
2. Add the following URLs in settings:
   - Sign-in URL: `http://localhost:3000/sign-in`
   - Sign-up URL: `http://localhost:3000/sign-up`
   - After sign-in URL: `http://localhost:3000/dashboard`
   - After sign-up URL: `http://localhost:3000/onboarding`
3. Copy Publishable Key and Secret Key to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
LegacyWords/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   │   ├── preferences/    # Preferences CRUD
│   │   ├── activity/       # Activity logs
│   │   ├── share/          # Sharing functionality
│   │   ├── shareable-link/ # Shareable links API
│   │   └── email-share/    # Email sharing API
│   ├── dashboard/          # User dashboard
│   ├── onboarding/         # Guided interview flow
│   ├── share/              # Public story view (via token)
│   └── ...                 # Other pages
├── lib/                    # Utilities and functions
│   ├── supabase.ts        # Supabase client and types
│   ├── interview.ts       # Interview structure and questions
│   ├── memory-data.ts     # Memory data types and utilities
│   ├── pdf-generator.ts   # PDF generation
│   ├── email.ts           # Email templates
│   ├── email-sharing.ts   # Email story generation
│   └── shareable-links.ts # Shareable link utilities
├── components/             # React components
│   ├── ui/                # UI components (Radix UI)
│   └── icons/            # Icon components
├── supabase/
│   └── schema.sql        # Database schema
└── middleware.ts         # Clerk middleware
```

## Features

### Core Features (Free)

- ✅ User authentication via Clerk
- ✅ Guided interview (32 questions, 5 categories)
- ✅ Story capture and editing
- ✅ PDF export
- ✅ Shareable links (30-day expiration)
- ✅ Email sharing (plain text and HTML)
- ✅ Family member invitations
- ✅ Activity history
- ✅ Responsive design

### Interview Structure

The guided interview consists of 6 steps:
1. **Memories That Matter** (8 questions, ~8 min)
2. **Family & Relationships** (6 questions, ~6 min)
3. **Values & Wisdom** (8 questions, ~8 min)
4. **Interests & Personality** (5 questions, ~5 min)
5. **Messages for Loved Ones** (5 questions, ~10 min)
6. **Review & Export** (~2 min)

Total: 32 questions, ~35-40 minutes

## API Endpoints

- `GET /api/preferences` - Get user preferences
- `POST /api/preferences` - Save/update preferences
- `GET /api/activity` - Get activity logs
- `POST /api/activity/log` - Log an activity
- `POST /api/shareable-link` - Create shareable link
- `GET /api/shareable-link` - Get shareable links
- `POST /api/shareable-link/extend` - Extend link expiration
- `POST /api/shareable-link/revoke` - Revoke a link
- `POST /api/email-share` - Send story via email

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Deployment on Vercel

1. Connect your repository to Vercel
2. Add all environment variables from `.env.local`
3. Update `NEXT_PUBLIC_APP_URL` to your production domain
4. Update Clerk URLs to production domains
5. Deploy!

## Code Style

- All code comments and documentation are in British English
- TypeScript strict mode enabled
- ESLint configured with Next.js defaults
- Prettier recommended for code formatting

## Security Notes

- Never commit `.env.local` or `.env` files
- All sensitive keys should be in environment variables
- Shareable links expire after 30 days
- User authentication required for dashboard access

## Contributing

This is a private project. For questions or issues, please contact the maintainers.

## License

Private - All rights reserved

## Support

For support, email support@legacywords.app
