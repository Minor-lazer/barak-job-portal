# 🚀 Quick Deployment Guide

## Your website is ready to deploy! Follow these steps:

### ✅ Pre-Deployment Checklist

- [x] Build successful (`npm run build` works)
- [x] Supabase database configured
- [x] All features tested locally
- [ ] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Environment variables ready

### 🎯 Step-by-Step Deployment

#### 1. Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit - Barak Job Portal"
```

#### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `barak-job-portal`
3. Description: "Job portal for Barak Valley"
4. Choose Public or Private
5. **Don't** initialize with README
6. Click "Create repository"

#### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/barak-job-portal.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

#### 4. Deploy to Vercel

1. **Go to:** [vercel.com](https://vercel.com)
2. **Sign up/Login** (use GitHub)
3. **Click:** "Add New Project"
4. **Import:** Your `barak-job-portal` repository
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
6. **Click:** "Deploy"
7. **Wait 2-3 minutes** for build

#### 5. Add Environment Variables

**In Vercel Dashboard:**

1. Go to your project → **Settings** → **Environment Variables**
2. Add these:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key-here
ADMIN_EMAIL = your-email@example.com
```

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click **"..."** on latest deployment
   - Click **"Redeploy"**

### 🎉 Your Site is Live!

You'll get a URL like: `https://barak-job-portal.vercel.app`

### 📝 Important Notes

1. **Environment Variables:** Must be added in Vercel dashboard
2. **Supabase:** Make sure your project is active (not paused)
3. **Database:** Jobs will save to Supabase automatically
4. **Job Submissions:** Check Vercel function logs for submissions

### 🔍 Test After Deployment

1. Visit your live URL
2. Browse jobs - should work
3. Submit a test job - check Supabase
4. Admin panel - login and manage jobs

### 🆘 Need Help?

- **Build fails?** Check Vercel build logs
- **Database not working?** Verify environment variables
- **Jobs not appearing?** Check Supabase RLS policies

---

**Ready? Run the commands above and deploy!** 🚀
