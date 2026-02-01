# Why Supabase Environment Variables Aren't Being Read

## Common Reasons

### 1. Variables Not Set in Vercel (Most Common)

**Check:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Do you see `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`?
- If not, add them!

### 2. Not Redeployed After Adding Variables

**Critical:** Environment variables only take effect after redeployment!

**Fix:**
1. Add variables in Vercel
2. Go to Deployments tab
3. Click "..." on latest deployment
4. Click "Redeploy"
5. Wait for deployment to complete

### 3. Wrong Environment Selected

When adding variables, you must check:
- ✅ Production
- ✅ Preview
- ✅ Development

If you only checked "Development", Production won't have them!

### 4. Typo in Variable Names

**Must be EXACTLY:**
- `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

Case-sensitive! Check for typos.

### 5. Variables Set But Not for Production

**Check:**
- In Vercel, when you view the variable, does it show "Production" checked?
- If not, edit the variable and check Production

### 6. NEXT_PUBLIC_ Prefix Issue

In Next.js:
- `NEXT_PUBLIC_*` variables are available on both client and server
- Variables without this prefix are server-only
- API routes can access both, but for consistency, use `NEXT_PUBLIC_`

## How to Debug

### Step 1: Check Vercel Logs

After redeploying, check function logs:

1. Vercel Dashboard → Deployments → Latest → View Function Logs
2. Look for logs that show:
   ```
   Environment check: {
     hasUrl: true/false,
     hasKey: true/false,
     ...
   }
   ```

### Step 2: Test API Directly

Visit: `https://barak-job-portal.vercel.app/api/jobs`

Check the response - it should include environment check info in logs.

### Step 3: Verify in Vercel Dashboard

1. **Settings → Environment Variables**
2. **For each variable, check:**
   - Name is correct (copy-paste to avoid typos)
   - Value is correct (no extra spaces)
   - Production is checked ✅
   - Preview is checked ✅
   - Development is checked ✅

### Step 4: Check Variable Values

Make sure values are:
- **URL:** `https://ehrhwnihiixkoslogxqa.supabase.co` (no trailing slash)
- **Key:** Starts with `eyJhbGci...` (very long string)

## Quick Fix Checklist

- [ ] Variables added in Vercel Settings → Environment Variables
- [ ] Variable names are exact: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] All environments checked (Production, Preview, Development)
- [ ] Redeployed after adding variables
- [ ] Values are correct (no typos, no extra spaces)
- [ ] Checked Vercel logs to see if variables are being read

## Test After Fix

1. **Redeploy in Vercel**
2. **Check logs** - should show `hasUrl: true, hasKey: true`
3. **Visit API:** `/api/jobs` should return 200 OK
4. **Jobs should load** from Supabase

## Still Not Working?

### Check Vercel Logs for:
```
Environment check: { hasUrl: false, hasKey: false }
```

This means variables aren't being read. Check:
1. Variable names (case-sensitive)
2. Environments selected
3. Redeployed after adding

### Alternative: Add Test Endpoint

I can create a test endpoint that shows what environment variables are being read (without exposing sensitive data).

---

**Most common issue:** Forgot to redeploy after adding environment variables! 🚀
