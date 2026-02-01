# How to Find Your Supabase API Keys

## Step-by-Step Guide

### Step 1: Make Sure You Have a Supabase Project

If you haven't created a project yet:

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub or email
4. Click **"New Project"**
5. Fill in:
   - **Project Name:** `barak-job-portal` (or any name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to you
   - **Pricing Plan:** Free
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup

### Step 2: Find Your API Keys

Once your project is ready:

1. **In the Supabase Dashboard**, look at the left sidebar
2. Click on **"Settings"** (gear icon ⚙️ at the bottom)
3. Click on **"API"** in the settings menu
4. You'll see a page with several sections:

#### What You Need:

**1. Project URL**
- Look for **"Project URL"** section
- It looks like: `https://xxxxxxxxxxxxx.supabase.co`
- Copy this entire URL

**2. anon/public key**
- Look for **"Project API keys"** section
- Find the key labeled **"anon"** or **"public"**
- It's a long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Click the **eye icon** 👁️ or **copy icon** 📋 to reveal/copy it
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Alternative Locations

If you can't find it in Settings → API:

1. **Project Settings** → **API** (should be there)
2. Or check the **"Project Settings"** → **"General"** tab
3. The keys are always in the **Settings** section

### Visual Guide:

```
Supabase Dashboard
├── Table Editor
├── Authentication
├── Storage
├── Database
├── SQL Editor
├── ...
└── Settings ⚙️
    ├── General
    ├── API ← CLICK HERE
    │   ├── Project URL: https://xxxxx.supabase.co
    │   └── Project API keys:
    │       ├── anon public: eyJhbGci... ← THIS IS YOUR KEY
    │       └── service_role: (don't use this one)
    ├── Database
    └── ...
```

### Step 4: Create .env.local File

Once you have both values:

1. In your project root, create a file named `.env.local`
2. Add these lines:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-long-key-here
```

3. Replace with your actual values
4. Save the file

### Important Notes:

- ✅ The key is called **"anon"** or **"public"** - use this one
- ❌ Don't use **"service_role"** key (it's for server-side only)
- ✅ The key is safe to use in frontend code (that's why it's "anon")
- ✅ Make sure to copy the ENTIRE key (it's very long)

### Still Can't Find It?

1. **Check if project is active:**
   - Make sure your project isn't paused
   - Free tier projects pause after inactivity

2. **Check your account:**
   - Make sure you're logged into the correct Supabase account
   - Check if you have access to the project

3. **Try refreshing:**
   - Refresh the Supabase dashboard
   - Sometimes it takes a moment to load

4. **Check project status:**
   - Go to Project Settings → General
   - Make sure project status is "Active"

### Quick Test:

After adding your keys to `.env.local`:

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Check the console - you should NOT see:
   - "Supabase not configured" warning
   - If you see this, the keys aren't being read

3. Visit `http://localhost:3000`
4. Try adding a job - it should save to Supabase!

### Need Help?

- **Supabase Docs:** [supabase.com/docs/guides/api](https://supabase.com/docs/guides/api)
- **Supabase Discord:** Community support
- **Check browser console** for any error messages

---

**Remember:** The website works WITHOUT Supabase too! If you can't find the keys right now, the site will use file storage automatically.
