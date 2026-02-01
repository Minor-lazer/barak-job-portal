# Why Environment Variables Aren't Being Read - Common Causes

## 🔍 Most Common Reasons (In Order)

### 1. **Not Redeployed After Adding Variables** (90% of cases!)

**This is the #1 reason!**

Environment variables in Vercel only take effect **after redeployment**.

**Fix:**
1. Add variables in Vercel Settings → Environment Variables
2. **MUST go to Deployments → Click "..." → Redeploy**
3. Wait for deployment to complete
4. Variables will now be available

### 2. **Wrong Environment Selected**

When adding variables, you must check:
- ✅ **Production** (for live site)
- ✅ **Preview** (for preview deployments)
- ✅ **Development** (for local dev)

If you only checked "Development", Production won't have them!

**Fix:**
1. Edit each variable in Vercel
2. Make sure **Production** is checked ✅
3. Redeploy

### 3. **Typo in Variable Names**

**Must be EXACTLY:**
- `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL_`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

**Case-sensitive!** Check for:
- Extra spaces
- Missing underscores
- Wrong capitalization

### 4. **Variables Not Actually Added**

**Double-check:**
1. Go to Vercel → Settings → Environment Variables
2. Do you see both variables listed?
3. Click on each one to verify the value

### 5. **Values Have Extra Spaces**

**Check:**
- No spaces before/after the value
- No quotes around the value (Vercel adds them automatically)
- Copy-paste the exact value (don't type manually)

## 🧪 How to Test if Variables Are Being Read

### Method 1: Use Test Endpoint

After deploying, visit:
```
https://barak-job-portal.vercel.app/api/test-env
```

This will show you:
- Whether variables exist
- Their lengths
- Preview of values (safe, doesn't expose full keys)

### Method 2: Check Vercel Function Logs

1. Vercel Dashboard → Deployments → Latest → View Function Logs
2. Look for logs that show:
   ```
   Environment check: {
     hasUrl: true/false,
     hasKey: true/false,
     ...
   }
   ```

If `hasUrl: false` or `hasKey: false`, variables aren't being read!

### Method 3: Check Browser Console

1. Visit your live site
2. Open DevTools (F12) → Console
3. Look for: "Supabase environment variables are not set"
4. If you see this, variables aren't being read

## ✅ Step-by-Step Verification

### Step 1: Verify in Vercel Dashboard

1. **Go to:** https://vercel.com/dashboard
2. **Your project** → **Settings** → **Environment Variables**
3. **Check:**
   - [ ] `NEXT_PUBLIC_SUPABASE_URL` exists
   - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` exists
   - [ ] Both show "Production" ✅
   - [ ] Values are correct (no typos)

### Step 2: Verify Variable Names

**Copy-paste these exact names:**
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Common mistakes:**
- `NEXT_PUBLIC_SUPABASE_URL ` (extra space)
- `next_public_supabase_url` (wrong case)
- `NEXT_PUBLIC_SUPABASE-URL` (hyphen instead of underscore)

### Step 3: Verify Values

**URL should be:**
```
https://ehrhwnihiixkoslogxqa.supabase.co
```
- No trailing slash
- Starts with `https://`
- Ends with `.supabase.co`

**Key should be:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocmh3bmloaWl4a29zbG9neHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjgwMDYsImV4cCI6MjA4NTUwNDAwNn0.XgK5O48MTfO7Xe9T6xBxZqYwgOzkBztyYasMXofzK-I
```
- Very long string
- Starts with `eyJ...`
- No spaces or line breaks

### Step 4: Redeploy (CRITICAL!)

**After adding/updating variables:**

1. **Deployments tab**
2. **Click "..." on latest deployment**
3. **Click "Redeploy"**
4. **Wait 2-3 minutes**

**Without redeploy, variables won't be available!**

## 🔧 Quick Fix Checklist

- [ ] Variables added in Vercel Settings → Environment Variables
- [ ] Variable names are exact: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] **Production environment is checked** ✅
- [ ] Values are correct (no typos, no extra spaces)
- [ ] **Redeployed after adding variables** ⚠️ CRITICAL!
- [ ] Checked Vercel logs to verify variables are being read

## 🧪 Test Endpoint

I've created a test endpoint. After deploying, visit:

```
https://barak-job-portal.vercel.app/api/test-env
```

This will show you exactly what environment variables are being read (safely, without exposing full keys).

## 📊 Expected Logs

After redeploying with correct variables, Vercel logs should show:

```
=== API /jobs GET Request ===
Environment check: {
  hasUrl: true,
  hasKey: true,
  urlPreview: "https://ehrhwnihiixkoslogxqa...",
  keyPreview: "eyJhbGciOiJIUzI1NiIs..."
}
Using Supabase to fetch jobs
Fetched X jobs from Supabase
```

If you see `hasUrl: false` or `hasKey: false`, the variables aren't being read!

---

**Most common issue:** Forgot to redeploy after adding environment variables! 🚀
