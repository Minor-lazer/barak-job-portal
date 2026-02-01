# How to Verify Jobs Are Saved in Supabase

## ✅ Quick Check

If you posted a job through the "Post a Job" form, it **should** be in your Supabase database!

## 🔍 How to Verify

### Method 1: Supabase Dashboard (Easiest)

1. **Go to your Supabase Dashboard:**
   - [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open Table Editor:**
   - Click **"Table Editor"** in the left sidebar
   - Click on the **"jobs"** table

3. **You should see:**
   - All your jobs listed there
   - Your newly posted job should appear at the top (newest first)
   - Each job will have columns: id, title, company, location, type, etc.

### Method 2: Check Browser Console

1. **Open your browser's Developer Tools:**
   - Press `F12` or right-click → "Inspect"
   - Go to **"Console"** tab

2. **Look for:**
   - ✅ No errors about Supabase
   - ✅ No "Supabase not configured" warnings
   - ✅ If you see errors, check the Network tab

### Method 3: Check Network Requests

1. **Open Developer Tools** → **Network** tab
2. **Post a job** (or refresh the page)
3. **Look for:**
   - Request to `/api/jobs` (GET request when loading)
   - Request to `/api/jobs` (POST request when creating)
   - Check the response - should show `success: true`

### Method 4: SQL Query in Supabase

1. **Go to SQL Editor** in Supabase
2. **Run this query:**
   ```sql
   SELECT * FROM jobs ORDER BY posted_date DESC LIMIT 10;
   ```
3. **You should see** your latest jobs

## 🐛 Troubleshooting

### Job Not Appearing?

1. **Check if Supabase is actually connected:**
   - Open browser console
   - Look for: "Supabase environment variables are not set" warning
   - If you see this, your `.env.local` file might not be loaded

2. **Restart dev server:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```
   - Environment variables are only loaded on server start

3. **Verify .env.local file:**
   - Make sure file is named exactly `.env.local` (not `.env`)
   - Make sure it's in the project root (same folder as `package.json`)
   - Check that variables start with `NEXT_PUBLIC_`
   - No spaces around the `=` sign

4. **Check Supabase RLS Policies:**
   - Go to Supabase → Authentication → Policies
   - Make sure "Jobs are viewable by everyone" policy exists
   - Make sure "Admins can insert jobs" policy exists

5. **Check for errors:**
   - Browser console for frontend errors
   - Terminal/command prompt for server errors
   - Supabase dashboard → Logs for database errors

### Common Issues

**Issue: "Supabase not configured" warning**
- Solution: Check `.env.local` file exists and has correct variable names
- Restart dev server after creating/editing `.env.local`

**Issue: Jobs appear but disappear on refresh**
- Solution: Check RLS policies allow reads
- Verify database connection is stable

**Issue: Can't see jobs in Supabase dashboard**
- Solution: Check you're looking at the correct project
- Refresh the table editor
- Check if table exists (Database → Tables)

## ✅ Success Indicators

You'll know it's working when:

1. ✅ No errors in browser console
2. ✅ Jobs appear in Supabase Table Editor
3. ✅ Jobs persist after page refresh
4. ✅ Jobs appear on the homepage
5. ✅ Can edit/delete jobs in admin panel

## 🔄 Test It Now

1. **Post a test job:**
   - Go to `/post-job`
   - Fill in the form
   - Submit

2. **Check Supabase:**
   - Dashboard → Table Editor → jobs table
   - Your job should be there!

3. **Refresh homepage:**
   - Go to `/`
   - Your job should appear in the list

4. **Check admin panel:**
   - Go to `/admin/login`
   - Login (admin/admin123)
   - Your job should be in the list

## 📊 Expected Database Structure

In Supabase, your `jobs` table should have:

- `id` (UUID) - Auto-generated
- `title` (text)
- `company` (text)
- `location` (text)
- `type` (text) - 'government' or 'private'
- `posted_date` (timestamp) - Auto-set
- `deadline` (timestamp) - Optional
- `description` (text)
- `requirements` (text array)
- `salary` (text) - Optional
- `experience` (text) - Optional
- `application_process` (text) - Optional
- `contact_info` (text) - Optional
- `created_at` (timestamp) - Auto-set
- `updated_at` (timestamp) - Auto-updated

---

**If your job appears in Supabase Table Editor, everything is working perfectly! 🎉**
