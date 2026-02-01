# Database Setup Guide - Supabase Integration

## 🎯 Overview

Your website now supports **Supabase (PostgreSQL)** as the database. It automatically falls back to file storage if Supabase is not configured, so you can develop locally without a database.

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Account (Free)

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub (easiest) or email
4. Create a new organization (if prompted)
5. Click **"New Project"**

### Step 2: Create Your Project

1. **Project Name:** `barak-job-portal` (or any name)
2. **Database Password:** Create a strong password (save it!)
3. **Region:** Choose closest to your users (e.g., `Southeast Asia (Singapore)`)
4. **Pricing Plan:** Free tier is fine
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

### Step 3: Get Your API Keys

1. Once project is ready, go to **Settings** (gear icon) → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

3. Copy both values - you'll need them!

### Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `database/schema.sql` from this project
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

### Step 5: Add Sample Data (Optional)

1. Still in SQL Editor, create a new query
2. Open `database/seed.sql` from this project
3. Copy and paste the contents
4. Click **"Run"**
5. You should see sample jobs added

### Step 6: Configure Environment Variables

1. In your project root, create a file named `.env.local`:

```bash
# Copy this template
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace with your actual values from Step 3:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon/public key

3. Save the file

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 7: Test the Connection

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. You should see jobs loading from Supabase!
4. Try adding a job through the admin panel

### Step 8: Verify Database

1. In Supabase dashboard, go to **Table Editor**
2. You should see:
   - `jobs` table with your sample data
   - `users` table with admin user

## 🔐 Security Notes

### Row Level Security (RLS)

The schema includes RLS policies:
- ✅ Anyone can **read** jobs (public)
- ✅ Only admins can **create/update/delete** jobs
- ⚠️ Currently policies allow all operations (for simplicity)
- 💡 In production, add proper role-based checks

### Password Security

⚠️ **IMPORTANT:** The default admin password is stored in plain text in the database. 

**To secure it:**

1. Install bcrypt:
   ```bash
   npm install bcryptjs
   npm install --save-dev @types/bcryptjs
   ```

2. Update `lib/db.ts` to hash passwords before storing
3. Update `verifyUserFromSupabase` to compare hashed passwords

## 🚀 Deployment

### For Vercel/Netlify:

1. Add environment variables in your hosting platform:
   - Go to project settings
   - Find "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Redeploy your site

### Environment Variables in Vercel:

1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add both variables
4. Redeploy

## 📊 Database Management

### View Data

- **Supabase Dashboard** → **Table Editor** → Select `jobs` table
- You can view, edit, and delete records directly

### Backup

- Supabase automatically backs up your database
- Free tier: Daily backups
- Paid tier: Point-in-time recovery

### Export Data

1. Go to **Database** → **Backups**
2. Download backup file
3. Or use SQL Editor to export specific tables

## 🔄 Migration from File Storage

If you were using file storage and want to migrate:

1. Export data from `data/jobs.json`
2. Use SQL Editor in Supabase to insert:
   ```sql
   INSERT INTO jobs (title, company, location, type, description, requirements, ...)
   VALUES (...);
   ```

Or write a migration script to read from JSON and insert into Supabase.

## 🐛 Troubleshooting

### "Supabase not configured" warning

- Check `.env.local` file exists
- Verify variable names are correct (must start with `NEXT_PUBLIC_`)
- Restart dev server after adding variables

### "Failed to fetch jobs"

- Check Supabase dashboard - is project active?
- Verify API keys are correct
- Check browser console for errors
- Verify RLS policies allow reads

### "Permission denied"

- Check RLS policies in Supabase
- Verify anon key has correct permissions
- Check API route logs

### Database connection issues

- Verify project URL is correct
- Check if project is paused (free tier pauses after inactivity)
- Restart Supabase project if needed

## 📚 Next Steps

1. ✅ Set up Supabase (you're here!)
2. ✅ Configure environment variables
3. ✅ Test locally
4. ✅ Deploy with environment variables
5. 🔒 Add password hashing (bcrypt)
6. 🔒 Improve RLS policies
7. 📧 Add email notifications
8. 📊 Add analytics

## 🆘 Need Help?

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Supabase Discord:** Community support
- **Check logs:** Browser console + Supabase dashboard logs

---

**Your database is ready! The website will automatically use Supabase when configured, or fall back to file storage for local development.**
