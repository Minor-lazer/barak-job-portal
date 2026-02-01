# Fix: Add Environment Variables in Vercel

## The Problem
Your site is deployed but showing "0 jobs" because Supabase environment variables aren't set in Vercel.

## Solution: Add Environment Variables

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Click on your project: `barak-job-portal` (or whatever you named it)

### Step 2: Add Environment Variables

1. **Click "Settings"** (top menu)
2. **Click "Environment Variables"** (left sidebar)
3. **Add these 2 variables:**

#### Variable 1:
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://ehrhwnihiixkoslogxqa.supabase.co`
- **Environments:** ✅ Production ✅ Preview ✅ Development (check all three)
- Click **"Save"**

#### Variable 2:
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocmh3bmloaWl4a29zbG9neHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjgwMDYsImV4cCI6MjA4NTUwNDAwNn0.XgK5O48MTfO7Xe9T6xBxZqYwgOzkBztyYasMXofzK-I`
- **Environments:** ✅ Production ✅ Preview ✅ Development (check all three)
- Click **"Save"**

### Step 3: Redeploy (CRITICAL!)

⚠️ **Environment variables only take effect after redeployment!**

1. **Go to "Deployments" tab** (top menu)
2. **Find the latest deployment**
3. **Click the "..." menu** (three dots) on the right
4. **Click "Redeploy"**
5. **Wait 2-3 minutes** for deployment to complete

### Step 4: Verify It Works

1. **Visit your live site**
2. **Open browser DevTools** (F12)
3. **Go to Console tab**
4. **You should NOT see:** "Supabase not configured" warning
5. **Refresh the page** - jobs should appear!

### Step 5: Check Database Has Jobs

1. **Go to Supabase Dashboard**
2. **Table Editor** → `jobs` table
3. **If empty, add jobs:**
   - Go to **SQL Editor**
   - Run `database/seed.sql` to add sample jobs
   - Or add jobs manually

## Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] Both variables have correct values
- [ ] All environments checked (Production, Preview, Development)
- [ ] Redeployed after adding variables
- [ ] Jobs exist in Supabase database
- [ ] RLS policies allow public reads

## Still Not Working?

### Check Vercel Logs:
1. Go to **Deployments** → Latest deployment
2. Click **"View Function Logs"**
3. Look for Supabase connection errors

### Test API Directly:
Visit: `https://your-site.vercel.app/api/jobs`

Should return: `{"success":true,"data":[...]}`

### Verify Supabase:
1. Go to Supabase → SQL Editor
2. Run: `SELECT COUNT(*) FROM jobs;`
3. Should return a number > 0

---

**Most common issue:** Forgot to redeploy after adding environment variables! 🚀
