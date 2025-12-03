# Deployment Guide - GitHub & Vercel

**Date**: December 3, 2025
**Project**: LaporGaruda Clone
**Status**: Deployment Pipeline Ready

---

## Overview

This guide explains how to deploy the LaporGaruda Clone application to Vercel with automated GitHub Actions CI/CD pipeline. The setup includes:

- **Automated Testing & Build Verification** via GitHub Actions
- **Automatic Deployments** to Vercel on push
- **Preview Deployments** for pull requests
- **Security Scanning** for vulnerabilities
- **Code Quality Checks** for linting and best practices

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [GitHub Setup](#github-setup)
3. [Vercel Setup](#vercel-setup)
4. [Environment Variables](#environment-variables)
5. [Deployment Workflow](#deployment-workflow)
6. [Monitoring & Debugging](#monitoring--debugging)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- GitHub account (with repository pushed)
- Vercel account (free tier works)
- Node.js 18+ installed locally

### 1. Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with CI/CD pipeline"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/web-lapor-clone.git
git push -u origin main
```

### 2. Connect to Vercel
```bash
# Option 1: Using Vercel CLI
npm i -g vercel
vercel login
vercel

# Option 2: Via Web Dashboard
# Visit https://vercel.com/dashboard
# Click "New Project"
# Select your GitHub repository
# Click "Import"
```

### 3. Configure Environment Variables
In Vercel Dashboard:
- Go to Settings → Environment Variables
- Add `VITE_API_URL` with your API endpoint
- Add any other required variables

### 4. Verify Deployment
- Check Vercel Dashboard for deployment status
- Once complete, visit your deployment URL
- Check GitHub Actions tab for CI status

---

## GitHub Setup

### Create Repository (if not exists)

```bash
# 1. Create new repository on GitHub (empty)
# 2. Clone and push to it
git remote add origin https://github.com/YOUR_USERNAME/web-lapor-clone.git
git push -u origin main
```

### Enable GitHub Actions

GitHub Actions is automatically enabled. No additional setup needed.

### View Actions Status

1. Go to your GitHub repository
2. Click "Actions" tab
3. You'll see workflows trigger on:
   - Every push to `main` or `develop`
   - Every pull request to `main` or `develop`

### Understanding CI Workflow

The `.github/workflows/ci.yml` file includes:

#### 1. **Build Job**
- Runs on Node.js 18 and 20
- Installs dependencies
- Runs ESLint
- Builds the project
- Uploads build artifacts

Status: ✅ **Required to pass before merge**

#### 2. **Security Check Job**
- Scans dependencies for vulnerabilities
- Uses Trivy scanner
- Reports security issues
- Uploads SARIF report to GitHub Security tab

Status: ⚠️ **Warning only** (doesn't block merge)

#### 3. **Code Quality Job**
- Checks for console.error or debugger statements
- Ensures clean code
- Generates build report

Status: ⚠️ **Warning only** (doesn't block merge)

### Workflow Triggers

```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
```

**Triggers when:**
- Code pushed to `main` or `develop`
- Pull request created/updated targeting `main` or `develop`

**Does NOT trigger when:**
- Changes to documentation files (.md)
- Changes to .gitignore or similar config files

---

## Vercel Setup

### Connect GitHub Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select "Import Git Repository"
4. Search for your repository
5. Click "Import"

### Configure Project Settings

Once imported, Vercel auto-detects:
- **Framework**: Vite ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm ci` ✅

### Environment Variables in Vercel

**Development Environment:**
```
VITE_API_URL=http://localhost:3000
```

**Preview Deployments:**
```
VITE_API_URL=https://api-staging.example.com
```

**Production:**
```
VITE_API_URL=https://api.example.com
```

**How to Add:**
1. Go to Project Settings → Environment Variables
2. Click "Add"
3. Key: `VITE_API_URL`
4. Value: Your API endpoint
5. Select environments: Development, Preview, Production
6. Click "Save"

### Automatic Deployments

Once connected, Vercel automatically:

**On Push to `main`:**
- ✅ Builds your project
- ✅ Runs all tests (via GitHub Actions first)
- ✅ Deploys to production
- ✅ Generates production URL

**On Pull Request:**
- ✅ Builds your project
- ✅ Creates preview deployment
- ✅ Comments on PR with preview URL
- ✅ Re-deploys on new commits

**On Push to Other Branches:**
- ℹ️ Creates preview deployment (if configured)
- ℹ️ No production deployment

---

## Environment Variables

### Managing Environment Variables

#### Local Development
```bash
# Create .env.local (never commit!)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=LaporGaruda_Dev
```

#### Team Example (.env.example - COMMIT THIS)
```bash
# .env.example (commit to repo)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=LaporGaruda
VITE_ENABLE_ANALYTICS=true
```

#### Vercel Dashboard Setup

```
Environment Name: VITE_API_URL
Value: https://api.example.com
Available in: All Environments
```

### Vite Environment Prefix

All environment variables must start with `VITE_` to be accessible in the browser:

```javascript
// ✅ Works - accessible in browser
const apiUrl = import.meta.env.VITE_API_URL;

// ❌ Doesn't work - not prefixed
const privateKey = import.meta.env.API_KEY;
```

---

## Deployment Workflow

### Standard Workflow

```
1. Create feature branch
   git checkout -b feature/new-feature

2. Make changes and commit
   git add .
   git commit -m "Add new feature"

3. Push to branch
   git push origin feature/new-feature

4. Create Pull Request on GitHub
   - Title: "Add new feature"
   - Description: "Describe changes"
   - Request reviewers

5. GitHub Actions runs
   - ✅ Build check
   - ✅ Lint check
   - ⚠️ Security scan
   - Create preview deployment on Vercel
   - Comment PR with preview URL

6. Review & test on preview
   - Visit preview URL
   - Test functionality
   - Review code in PR

7. Merge PR to main
   - Click "Merge pull request"
   - Vercel deploys to production

8. Verify production
   - Visit production URL
   - Monitor for errors
   - Check monitoring dashboard
```

### Commit Strategy

**Conventional Commits** (recommended):
```
feat: add report form modal
fix: resolve carousel display issue
docs: update deployment guide
style: improve modal styling
refactor: restructure authentication
test: add unit tests for login
chore: update dependencies
```

### Branch Strategy

```
main          ← Production ready (always stable)
develop       ← Staging environment
feature/*     ← Feature development
bugfix/*      ← Bug fixes
hotfix/*      ← Critical production fixes
```

---

## Monitoring & Debugging

### GitHub Actions Logs

**View Logs:**
1. Go to repository
2. Click "Actions" tab
3. Click on failed workflow
4. Click "Build" job
5. Expand failed step to see logs

**Common Build Failures:**

1. **Lint Errors**
   ```
   ESLint found problems:
   src/components/Login.jsx:45:2: Unexpected console statement (no-console)
   ```
   Fix: Remove console statements or update .eslintrc

2. **Missing Dependencies**
   ```
   Cannot find module 'react'
   ```
   Fix: Run `npm install` and commit package-lock.json

3. **Build Errors**
   ```
   ERROR in vite build
   ```
   Fix: Check console for specific error, fix in code

### Vercel Deployment Logs

**View Logs:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Go to "Deployments" tab
4. Click on deployment
5. View logs from Build tab

**Common Issues:**

1. **Environment Variables Not Set**
   ```
   API URL is undefined
   ```
   Solution: Add VITE_API_URL to Vercel Environment Variables

2. **Build Timeout**
   ```
   Build exceeded 45 minute timeout
   ```
   Solution: Optimize build, upgrade Vercel plan

3. **Node Module Conflicts**
   ```
   npm ERR! peer dep missing
   ```
   Solution: Delete node_modules locally, recommit package-lock.json

### Real-time Monitoring

**Analytics Dashboard:**
```
Vercel Dashboard → Analytics tab
- Page views
- Response times
- Error rates
- Core Web Vitals
```

**Error Tracking:**
```
Vercel Dashboard → Logs → Function Logs
- Runtime errors
- API errors
- Performance issues
```

---

## Rollback Procedures

### Quick Rollback (Vercel)

1. Go to Vercel Dashboard
2. Click your project
3. Go to "Deployments" tab
4. Find the stable previous deployment
5. Click the deployment
6. Click "Promote to Production"

**Time to Rollback:** ~1 minute

### Manual Rollback (GitHub)

```bash
# 1. Find commit to rollback to
git log --oneline

# 2. Revert to that commit
git revert COMMIT_HASH
git push origin main

# 3. Vercel automatically redeploys
# (Check Deployments tab for status)
```

**Time to Rollback:** ~5-10 minutes (including build)

### Rollback on Pull Request

If issue found in PR before merge:

```bash
# Close PR without merging
# (Vercel preview deployment auto-deletes)

# Or manually delete preview:
# Vercel Dashboard → Deployments → (preview) → Delete
```

---

## Troubleshooting

### Build Fails Locally but Passes in CI

**Cause:** Different environment or Node version

**Solution:**
```bash
# Match CI Node version
nvm use 20
nvm install 20

# Clean install
rm -rf node_modules package-lock.json
npm install

# Try building
npm run build
```

### Preview Not Updating on PR

**Cause:** Vercel webhook not triggered

**Solution:**
1. Push new commit to PR branch
2. Vercel should redeploy automatically
3. If still stuck:
   - Go to Vercel Dashboard
   - Relink GitHub repository
   - Redeploy manually

### Environment Variables Not Working

**Cause:** Wrong variable name or not prefixed

**Solution:**
1. Check variable name starts with `VITE_`
2. Verify in Vercel → Settings → Environment Variables
3. Redeploy manually: `npm run build`
4. Check in browser: `console.log(import.meta.env.VITE_API_URL)`

### API Calls Failing in Production

**Cause:** Wrong API URL in environment variables

**Solution:**
1. Check VITE_API_URL in Vercel dashboard
2. Verify API endpoint is accessible from browser
3. Check CORS headers if cross-origin
4. Update environment variable if needed
5. Redeploy

### High Build Times

**Current:** ~1.5 minutes

**If exceeding 15 minutes:**
- Remove unused dependencies
- Optimize images
- Check for large node_modules
- Consider upgrading Vercel plan

---

## Security Best Practices

### Never Commit Sensitive Data

```bash
# ❌ DON'T commit these
.env
.env.local
.env.production.local
config/secrets.js
```

### Use Environment Variables for Secrets

```javascript
// ✅ Secure - uses environment variable
const apiKey = import.meta.env.VITE_API_KEY;

// ❌ Insecure - hardcoded
const apiKey = "sk_live_abc123def456";
```

### GitHub Secrets for CI/CD

If adding sensitive tokens to CI:
```bash
# Go to: Repository → Settings → Secrets and variables → Actions
# Click "New repository secret"
# Name: SENSITIVE_DATA
# Value: (your secret)
```

Then use in workflow:
```yaml
env:
  SECRET: ${{ secrets.SENSITIVE_DATA }}
```

### Vercel Security Headers

Already configured in `vercel.json`:
- `X-Content-Type-Options: nosniff` - Prevent MIME sniffing
- `X-Frame-Options: SAMEORIGIN` - Prevent clickjacking
- `X-XSS-Protection: 1; mode=block` - Basic XSS protection

---

## Advanced Configuration

### Custom Domain

1. Go to Vercel Dashboard
2. Project Settings → Domains
3. Add your domain
4. Follow DNS configuration
5. Wait for propagation (usually <5 minutes)

### Custom Build Scripts

Edit `.github/workflows/ci.yml`:
```yaml
- name: Run custom tests
  run: npm run test

- name: Generate report
  run: npm run generate-report
```

### Slack Notifications

Add to workflow:
```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1.24.0
  if: always()
  with:
    payload: |
      {
        "text": "Build ${{ job.status }}"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications

GitHub provides default email notifications:
- Settings → Notifications → Email
- Select: "All activity" or "Only direct @mentions"

---

## File Structure

```
web-lapor-clone/
├── .github/
│   └── workflows/
│       └── ci.yml                          ← GitHub Actions CI/CD
├── vercel.json                             ← Vercel configuration
├── DEPLOYMENT_GUIDE.md                     ← This file
├── package.json
├── vite.config.js
├── src/
├── dist/                                   ← Built files (ignored)
└── ...
```

---

## Checklists

### Pre-Deployment Checklist

- [ ] All tests passing in GitHub Actions
- [ ] No console errors in dev
- [ ] Environment variables configured in Vercel
- [ ] Latest code pushed to main
- [ ] No hardcoded secrets in code
- [ ] Package.json dependencies updated
- [ ] Build completes successfully

### Post-Deployment Checklist

- [ ] Production URL loads
- [ ] No 404 errors
- [ ] Forms submit successfully
- [ ] API calls working
- [ ] Mobile responsive
- [ ] No console errors in production
- [ ] Monitoring dashboard active

### Rollback Checklist

- [ ] Identified stable previous deployment
- [ ] Checked rollback procedure
- [ ] Verified previous deployment works
- [ ] Communicated with team
- [ ] Created follow-up ticket for investigation

---

## Reference Links

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Support

### Getting Help

1. **Build Issues:** Check GitHub Actions logs
2. **Deployment Issues:** Check Vercel deployment logs
3. **Runtime Issues:** Check browser console + Vercel analytics
4. **GitHub Issues:** Create issue with detailed description

### Team Communication

- Document changes in PR description
- Reference issues in commits: `fixes #123`
- Use descriptive commit messages
- Review code before merging

---

## Summary

✅ **What's Setup:**
- Automated GitHub Actions CI/CD pipeline
- Automatic Vercel deployments
- Environment variable management
- Security scanning and code quality checks
- Production-ready deployment workflow

✅ **Next Steps:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Verify first deployment
5. Monitor production

✅ **Deployment URL:**
- Will be generated after Vercel setup
- Format: `https://[project-name].vercel.app`

---

*Created: December 3, 2025*
*Status: Ready for Production*
*Last Updated: December 3, 2025*
