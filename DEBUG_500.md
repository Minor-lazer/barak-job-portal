# Debug 500 Error - Check Vercel Logs

## Critical: Check Vercel Function Logs First!

The 500 error means something is crashing. We need to see the actual error message.

### Step 1: View Function Logs in Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Click your project: `barak-job-portal`

2. **View Logs:**
   - Click **"Deployments"** tab
   - Click on the **latest deployment** (the one at the top)
   - Click **"View Function Logs"** or find the **"Logs"** button
   - Or go to **"Functions"** tab → Click on `/api/jobs` → View logs

3. **Look for:**
   - Red error messages
   - "Error fetching jobs"
   - "Supabase" related errors
   - Any stack traces

4. **Copy the error message** - this will tell us exactly what's wrong!

### Step 2: Common Issues Based on Logs

#### If you see: "Supabase environment variables are not set"
- **Fix:** Environment variables weren't added correctly
- **Solution:** Double-check variable names (case-sensitive!)
- **Must be exactly:** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### If you see: "relation 'jobs' does not exist"
- **Fix:** Database table doesn't exist
- **Solution:** Run `database/schema.sql` in Supabase SQL Editor

#### If you see: "new row violates row-level security policy"
- **Fix:** RLS policies blocking access
- **Solution:** Run `database/schema.sql` again to set up policies

#### If you see: "Invalid API key" or "JWT expired"
- **Fix:** Wrong anon key
- **Solution:** Verify the key in Supabase Settings → API

#### If you see: "Network error" or "Connection refused"
- **Fix:** Supabase project might be paused
- **Solution:** Check Supabase dashboard, resume project if paused

### Step 3: Verify Environment Variables

1. **In Vercel:**
   - Settings → Environment Variables
   - **Verify both variables exist:**
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Check they're enabled for Production**

2. **Important:** After adding/updating, you MUST redeploy!

### Step 4: Redeploy

1. **Go to Deployments**
2. **Click "..." on latest deployment**
3. **Click "Redeploy"**
4. **Wait for completion**

### Step 5: Test Again

1. **Visit:** `https://barak-job-portal.vercel.app/api/jobs`
2. **Check logs again** for new errors
3. **Share the error message** from logs

## Quick Test: Check if Variables Are Being Read

The updated code now logs environment variable status. Check Vercel logs for:
```
Environment check: { hasUrl: true, hasKey: true, ... }
```

If you see `hasUrl: false` or `hasKey: false`, the variables aren't being read.

## Alternative: Test Supabase Directly

1. **Go to Supabase Dashboard**
2. **SQL Editor** → Run:
   ```sql
   SELECT * FROM jobs LIMIT 5;
   ```
3. **If this works:** Database is fine, issue is with connection
4. **If this fails:** Table doesn't exist, run schema.sql

---

**Next Step:** Check Vercel function logs and share the error message you see! That will tell us exactly what's wrong.
