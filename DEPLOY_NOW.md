# 🚀 Deploy Your Website - Step by Step Guide

## Quick Deployment to Vercel (Recommended - 5 minutes)

Vercel is the easiest way to deploy Next.js apps. It's free and works perfectly with your setup.

### Step 1: Prepare Your Code

1. **Make sure everything is committed:**
   ```bash
   git status
   ```

2. **If git is not initialized:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   ```

### Step 2: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it: `barak-job-portal` (or any name)
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/barak-job-portal.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login (use GitHub for easy connection)

2. **Import Project:**
   - Click **"Add New Project"**
   - Click **"Import Git Repository"**
   - Select your `barak-job-portal` repository
   - Click **"Import"**

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - Click **"Deploy"**

4. **Wait 2-3 minutes:**
   - Vercel will build and deploy your site
   - You'll see the build progress

5. **Your site is live!** 🎉
   - You'll get a URL like: `https://barak-job-portal.vercel.app`

### Step 4: Add Environment Variables

**IMPORTANT:** Add your Supabase credentials!

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"**
   - Click **"Environment Variables"**

2. **Add these variables:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
   ADMIN_EMAIL = your-email@example.com (optional, for email)
   ```

3. **Redeploy:**
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on latest deployment
   - Click **"Redeploy"**
   - This applies the environment variables

### Step 5: Custom Domain (Optional)

1. **In Vercel Settings:**
   - Go to **"Domains"**
   - Add your custom domain
   - Follow DNS setup instructions

## ✅ Deployment Checklist

Before deploying, make sure:

- [x] Code builds successfully (`npm run build`)
- [x] Supabase database is set up
- [x] Environment variables are ready
- [x] Git repository is pushed to GitHub
- [x] All features tested locally

## 🔧 Post-Deployment

### Test Your Live Site:

1. **Visit your Vercel URL**
2. **Test job browsing** - should work
3. **Test job posting** - submit a test job
4. **Check Supabase** - verify jobs are saving
5. **Test admin panel** - login and manage jobs

### Monitor:

- **Vercel Dashboard:** View deployments, logs, analytics
- **Supabase Dashboard:** Monitor database usage
- **Check logs:** Vercel → Deployments → View Function Logs

## 🐛 Troubleshooting

### Build Fails?

1. **Check build logs** in Vercel
2. **Verify Node.js version** (needs 18+)
3. **Check for TypeScript errors**
4. **Ensure all dependencies are in package.json**

### Environment Variables Not Working?

1. **Redeploy** after adding variables
2. **Check variable names** (must start with `NEXT_PUBLIC_` for client-side)
3. **Verify no typos** in variable values

### Database Not Connecting?

1. **Check Supabase project** is active (not paused)
2. **Verify environment variables** are set correctly
3. **Check Supabase RLS policies** allow access
4. **View Vercel function logs** for errors

### Jobs Not Appearing?

1. **Check Supabase Table Editor** - are jobs being saved?
2. **Verify API routes** are working (check Network tab)
3. **Check browser console** for errors
4. **Verify RLS policies** in Supabase

## 📊 Alternative Deployment Options

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Select repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy!

### Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. "New Project" → "Deploy from GitHub"
4. Select repository
5. Add environment variables
6. Deploy!

### Render

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. "New" → "Web Service"
4. Connect GitHub repo
5. Build command: `npm run build`
6. Start command: `npm start`
7. Add environment variables
8. Deploy!

## 🎯 Quick Commands Reference

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/barak-job-portal.git
git branch -M main
git push -u origin main

# Test build locally
npm run build

# Check environment variables
cat .env.local
```

## 🚀 You're Ready!

Follow the steps above and your website will be live in minutes!

**Recommended:** Use Vercel - it's the easiest and works perfectly with Next.js.

---

**Need help?** Check the build logs in Vercel dashboard if something goes wrong!
