# Fix: Jobs Not Showing After Deployment

## Problem
Website is deployed but showing "0 jobs" - Supabase connection not working.

## Quick Fix Steps

### Step 1: Verify Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `barak-job-portal`

2. **Check Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Verify these are set:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     ```

3. **If missing, add them:**
   - Click **"Add New"**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://ehrhwnihiixkoslogxqa.supabase.co`
   - Environment: Production, Preview, Development (check all)
   - Click **"Save"**
   
   - Click **"Add New"** again
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocmh3bmloaWl4a29zbG9neHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjgwMDYsImV4cCI6MjA4NTUwNDAwNn0.XgK5O48MTfO7Xe9T6xBxZqYwgOzkBztyYasMXofzK-I`
   - Environment: Production, Preview, Development (check all)
   - Click **"Save"**

### Step 2: Redeploy (IMPORTANT!)

After adding/updating environment variables:

1. **Go to Deployments tab**
2. **Click the "..." menu** on the latest deployment
3. **Click "Redeploy"**
4. **Wait for deployment to complete** (2-3 minutes)

⚠️ **Environment variables only take effect after redeployment!**

### Step 3: Verify Supabase Database

1. **Check if jobs exist:**
   - Go to Supabase Dashboard
   - Table Editor → `jobs` table
   - Do you see any jobs?

2. **If no jobs, add sample data:**
   - Go to SQL Editor
   - Run the `database/seed.sql` file
   - Or manually add a job

3. **Check RLS Policies:**
   - Go to Authentication → Policies
   - Make sure "Jobs are viewable by everyone" policy exists
   - If not, run the schema.sql again

### Step 4: Test the Connection

1. **Visit your live site**
2. **Open browser DevTools** (F12)
3. **Go to Console tab**
4. **Look for:**
   - ✅ No "Supabase not configured" warnings
   - ❌ If you see warnings, env vars aren't set correctly

5. **Go to Network tab:**
   - Refresh the page
   - Look for request to `/api/jobs`
   - Check the response - should show jobs array

### Step 5: Check Vercel Function Logs

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Functions"** tab
   - Click on `/api/jobs` function
   - Check **"Logs"** tab
   - Look for any errors

## Common Issues & Solutions

### Issue 1: "Supabase not configured" in console

**Solution:**
- Environment variables not set in Vercel
- Or not redeployed after adding them
- **Fix:** Add env vars → Redeploy

### Issue 2: Jobs exist in Supabase but not showing

**Solution:**
- Check RLS policies allow public reads
- Verify API route is working
- Check browser console for errors

### Issue 3: Empty database

**Solution:**
- Run `database/seed.sql` in Supabase SQL Editor
- Or add jobs manually through admin panel

### Issue 4: CORS or Network errors

**Solution:**
- Check Supabase project is active (not paused)
- Verify anon key is correct
- Check Supabase dashboard for any errors

## Quick Test

Run this in your browser console on the live site:

```javascript
fetch('/api/jobs')
  .then(r => r.json())
  .then(data => console.log('Jobs:', data))
```

Should return: `{ success: true, data: [...] }`

## Verification Checklist

- [ ] Environment variables added in Vercel
- [ ] Redeployed after adding env vars
- [ ] Supabase project is active
- [ ] Jobs exist in Supabase `jobs` table
- [ ] RLS policies allow public reads
- [ ] No errors in browser console
- [ ] No errors in Vercel function logs

## Still Not Working?

1. **Check Vercel logs:**
   - Deployments → Latest → View Function Logs
   - Look for Supabase connection errors

2. **Test Supabase connection:**
   - Go to Supabase → SQL Editor
   - Run: `SELECT * FROM jobs LIMIT 5;`
   - If this works, database is fine

3. **Verify environment variables:**
   - In Vercel, check the exact variable names
   - Must be: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Case-sensitive!

---

**Most common fix:** Add environment variables → Redeploy! 🚀
