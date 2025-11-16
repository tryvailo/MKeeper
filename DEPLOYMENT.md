# Deployment Guide

This guide covers deploying Memory Keeper to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database schema applied to production Supabase
- [ ] Clerk production keys configured
- [ ] Production URLs updated in Clerk settings
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] All tests passing
- [ ] Build succeeds locally (`npm run build`)

## Vercel Deployment

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 2. Configure Environment Variables

Add all environment variables from `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### 3. Configure Build Settings

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### 4. Update Clerk Settings

In Clerk dashboard, update:
- Sign-in URL: `https://yourdomain.com/sign-in`
- Sign-up URL: `https://yourdomain.com/sign-up`
- After sign-in URL: `https://yourdomain.com/dashboard`
- After sign-up URL: `https://yourdomain.com/onboarding`

### 5. Deploy

Click "Deploy" and wait for the build to complete.

## Supabase Production Setup

### 1. Create Production Database

1. Create a new Supabase project for production
2. Run `supabase/schema.sql` in SQL Editor
3. Copy production URL and Anon Key

### 2. Configure Row Level Security (RLS)

Ensure RLS policies are set correctly:
- Users can only access their own preferences
- Shareable links are accessible via token
- Family members can access shared preferences

## Post-Deployment

### 1. Verify Deployment

- [ ] Landing page loads
- [ ] Sign-up flow works
- [ ] Onboarding interview works
- [ ] PDF generation works
- [ ] Shareable links work
- [ ] Email sharing works (if configured)

### 2. Monitor

- Check Vercel logs for errors
- Monitor Supabase dashboard for queries
- Set up error tracking (Sentry, etc.)

### 3. Domain Configuration

If using a custom domain:
1. Add domain in Vercel project settings
2. Configure DNS records as instructed
3. Wait for SSL certificate provisioning

## Environment-Specific Notes

### Development
- Use test keys for Clerk
- Use development Supabase project
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

### Staging
- Use test keys for Clerk
- Use staging Supabase project
- `NEXT_PUBLIC_APP_URL=https://staging.yourdomain.com`

### Production
- Use live keys for Clerk
- Use production Supabase project
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

## Troubleshooting

### Build Fails

- Check environment variables are set
- Verify Node.js version (20.x recommended)
- Check for TypeScript errors: `npm run lint`

### Authentication Issues

- Verify Clerk keys are correct
- Check Clerk URLs match deployment domain
- Verify middleware configuration

### Database Connection Issues

- Verify Supabase URL and keys
- Check RLS policies
- Verify network access

## Rollback

If deployment fails:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find last working deployment
4. Click "..." → "Promote to Production"

## Security Checklist

- [ ] No API keys in code
- [ ] All secrets in environment variables
- [ ] RLS policies enabled in Supabase
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting considered

