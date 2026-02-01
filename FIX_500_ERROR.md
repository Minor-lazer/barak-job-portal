# Fix 500 Error - Step by Step

## The Problem
Getting `500 Internal Server Error` when accessing `/api/jobs` on your deployed site.

## Most Likely Causes

1. **Environment variables not set in Vercel** (90% of cases)
2. **Supabase table doesn't exist**
3. **RLS policies blocking access**
4. **Supabase project is paused**

## Step-by-Step Fix

### Step 1: Check Vercel Function Logs

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click your project

2. **View Logs:**
   - Go to **"Deployments"** tab
   - Click on the **latest deployment**
   - Click **"View Function Logs"** or **"Logs"** tab
   - Look for error messages

3. **What to look for:**
   - "Supabase environment variables are not set"
   - "Error fetching jobs from Supabase"
   - Any Supabase connection errors

### Step 2: Verify Environment Variables

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Environment Variables**

2. **Check these exist:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **If missing, add them:**
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://ehrhwnihiixkoslogxqa.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocmh3bmloaWl4a29zbG9neHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjgwMDYsImV4cCI6MjA4NTUwNDAwNn0.XgK5O48MTfO7Xe9T6xBxZqYwgOzkBztyYasMXofzK-I
   ```
   - Check all environments: Production, Preview, Development

4. **Redeploy:**
   - Go to **Deployments** → Click **"..."** → **"Redeploy"**

### Step 3: Verify Supabase Database

1. **Check if table exists:**
   - Go to Supabase Dashboard
   - **Table Editor** → Look for `jobs` table
   - If missing, run `database/schema.sql`

2. **Check if jobs exist:**
   - In `jobs` table, do you see any rows?
   - If empty, add jobs using `database/seed.sql`

3. **Check RLS Policies:**
   - Go to **Authentication** → **Policies**
   - Make sure "Jobs are viewable by everyone" policy exists
   - If missing, run `database/schema.sql` again

### Step 4: Test Supabase Connection

1. **In Supabase SQL Editor:**
   ```sql
   SELECT * FROM jobs LIMIT 5;
   ```
   - If this works, database is fine
   - If error, table might not exist

2. **Check project status:**
   - Go to **Settings** → **General**
   - Make sure project is **"Active"** (not paused)

### Step 5: Check Vercel Logs Again

After redeploying with environment variables:

1. **Visit:** `https://barak-job-portal.vercel.app/api/jobs`
2. **Check Vercel logs** for new errors
3. **Look for:**
   - Environment check logs (should show hasUrl: true, hasKey: true)
   - Any Supabase errors

## Common Error Messages

### "Supabase environment variables are not set"
**Fix:** Add environment variables in Vercel → Redeploy

### "relation 'jobs' does not exist"
**Fix:** Run `database/schema.sql` in Supabase SQL Editor

### "new row violates row-level security policy"
**Fix:** Check RLS policies, run schema.sql again

### "Invalid API key"
**Fix:** Verify the anon key is correct in Vercel

## Quick Test Commands

### Test API directly:
```bash
curl https://barak-job-portal.vercel.app/api/jobs
```

Should return: `{"success":true,"data":[...]}`

### Check environment in browser:
Open DevTools → Console → Look for warnings

## Debugging Steps

1. ✅ Check Vercel function logs
2. ✅ Verify environment variables are set
3. ✅ Redeploy after adding env vars
4. ✅ Check Supabase table exists
5. ✅ Check RLS policies
6. ✅ Verify Supabase project is active
7. ✅ Test API endpoint directly

## After Fixing

Once fixed, you should see:
- ✅ `/api/jobs` returns `200 OK`
- ✅ Jobs appear on homepage
- ✅ No errors in Vercel logs
- ✅ No "Supabase not configured" warnings

---

**Most common fix:** Add environment variables → Redeploy → Should work! 🚀
