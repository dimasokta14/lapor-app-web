# Deployment Quick Start

**Get your app deployed to Vercel in 5 minutes!**

---

## Step 1: Push to GitHub (2 min)

If your repo isn't on GitHub yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/web-lapor-clone.git
git push -u origin main
```

---

## Step 2: Connect to Vercel (2 min)

### Option A: Via Web Dashboard (Recommended for first time)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your `web-lapor-clone` repository
5. Click "Import"
6. Vercel auto-detects settings ✅
7. Click "Deploy"

**Wait 1-2 minutes for deployment to complete.**

### Option B: Via CLI

```bash
npm i -g vercel
vercel login
cd /path/to/web-lapor-clone
vercel
```

---

## Step 3: Add Environment Variables (1 min)

In Vercel Dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add this variable:
   ```
   Key: VITE_API_URL
   Value: https://api.example.com
   ```
4. Click "Save"

---

## Step 4: Verify It Works! ✅

Your app is now live at:
```
https://[project-name].vercel.app
```

**That's it! You're deployed! 🎉**

---

## What Happens Now?

✅ **Every time you push to GitHub:**
- GitHub Actions runs CI checks
- Tests & linting happen automatically
- Build is verified
- Vercel deploys to production

✅ **Every time you create a Pull Request:**
- Vercel creates a preview deployment
- Comments on PR with preview URL
- You can test changes before merging

---

## Need the Full Guide?

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Advanced configuration
- Monitoring and debugging
- Rollback procedures
- Security best practices
- Troubleshooting

---

## Common Commands

### View Deployment Status
```bash
# Via GitHub
# Go to: https://github.com/YOUR_USERNAME/web-lapor-clone
# Click "Actions" tab

# Via Vercel
# Go to: https://vercel.com/dashboard
# Click your project → "Deployments"
```

### Trigger Manual Deployment
```bash
# Push new code to trigger automatic deployment
git push origin main

# Or manually in Vercel Dashboard:
# Project → Deployments → (click one) → Redeploy
```

### View Logs
```bash
# GitHub Actions logs:
# Actions tab → Latest workflow → Build job → Expand steps

# Vercel logs:
# Deployments → Click deployment → Logs tab
```

---

## Troubleshooting

**Build failed?**
- Check GitHub Actions logs for error
- Common: Missing environment variables

**Deployed but broken?**
- Check browser console (F12 → Console)
- Check Vercel logs (Deployments → Logs)
- Verify environment variables are set

**Environment variables not working?**
- Must start with `VITE_` prefix
- After changing, redeploy: `npm run build`
- Check in browser: `console.log(import.meta.env.VITE_API_URL)`

---

## Next Steps

1. ✅ Deployment complete
2. Monitor your app in Vercel Dashboard
3. Set up custom domain (optional)
4. Configure monitoring and alerts
5. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for advanced features

---

*Created: December 3, 2025*
