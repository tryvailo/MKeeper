# GitHub Setup Instructions

## Initial Git Setup

If this is a new repository, follow these steps:

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Memory Keeper MVP"
```

### 2. Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it `MemoryKeeper` (or use existing repository name)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/MemoryKeeper.git
git branch -M main
git push -u origin main
```

### 4. Verify

Check that all files are pushed:
- README.md
- LICENSE
- .env.example
- .gitignore
- package.json
- All source code files

## Important: Before Pushing

### Check for Sensitive Files

```bash
# Make sure these are NOT in the repository:
git check-ignore .env.local
git check-ignore .env
git check-ignore data/
```

### Verify .gitignore

Ensure `.gitignore` includes:
- `.env*` files
- `node_modules/`
- `.next/`
- `data/`
- `*-old.tsx` files
- PDF files in `docs/`

### Files That Should Be Committed

- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `.env.example`
- ✅ `.gitignore`
- ✅ `package.json`
- ✅ All source code (`app/`, `lib/`, `components/`)
- ✅ `supabase/schema.sql`
- ✅ Documentation in `docs/` (except PDFs)

### Files That Should NOT Be Committed

- ❌ `.env.local`
- ❌ `.env`
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `data/*.json`
- ❌ `*-old.tsx` files
- ❌ PDF files in `docs/`

## After Pushing

1. Go to repository settings
2. Add repository description: "A free tool for dementia families to preserve their loved one's story"
3. Add topics: `nextjs`, `typescript`, `dementia`, `memory-preservation`
4. Enable GitHub Actions (if using CI/CD)
5. Configure branch protection (optional but recommended)

## GitHub Secrets (for CI/CD)

If using GitHub Actions, add these secrets in Settings → Secrets:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## Repository Settings

### Recommended Settings

- **Visibility:** Private (unless open source)
- **Issues:** Enabled
- **Projects:** Enabled (optional)
- **Wiki:** Disabled (using docs/)
- **Discussions:** Disabled (or enabled if preferred)

### Branch Protection (for main branch)

1. Go to Settings → Branches
2. Add rule for `main`
3. Require pull request reviews
4. Require status checks to pass
5. Require branches to be up to date

## Next Steps

1. Set up Vercel deployment (see `DEPLOYMENT.md`)
2. Configure production environment variables
3. Test deployment
4. Share repository with team members

