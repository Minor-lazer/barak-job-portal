# 🚀 Quick Start Guide - Database Integration

## ✅ What's Been Set Up

Your website now has **full database integration** with Supabase (PostgreSQL)!

- ✅ Supabase client installed and configured
- ✅ Database schema ready (`database/schema.sql`)
- ✅ Automatic fallback to file storage (works without database)
- ✅ All API routes updated for async database calls
- ✅ Sample data seed file (`database/seed.sql`)

## 🎯 Quick Setup (5 Minutes)

### Option 1: Use Supabase (Recommended for Production)

1. **Create Supabase account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up (free)
   - Create new project

2. **Get API keys:**
   - Settings → API
   - Copy Project URL and anon key

3. **Set up database:**
   - SQL Editor → New query
   - Copy/paste contents of `database/schema.sql`
   - Run it
   - (Optional) Run `database/seed.sql` for sample data

4. **Configure environment:**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

5. **Test:**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

### Option 2: Use File Storage (For Local Development)

**No setup needed!** The website automatically uses file storage if Supabase is not configured.

Just run:
```bash
npm run dev
```

Data will be stored in `data/` directory.

## 📁 Files Created

- `lib/supabase.ts` - Supabase client
- `lib/db.ts` - Database layer (auto-selects Supabase or file)
- `database/schema.sql` - Database schema
- `database/seed.sql` - Sample data
- `DATABASE_SETUP.md` - Detailed setup guide

## 🔄 How It Works

The system **automatically** chooses the storage method:

1. **If Supabase is configured** (`.env.local` exists with keys):
   - ✅ Uses Supabase PostgreSQL database
   - ✅ Data persists across deployments
   - ✅ Production-ready

2. **If Supabase is NOT configured**:
   - ✅ Falls back to file storage (`data/` directory)
   - ✅ Works for local development
   - ✅ No setup required

## 🧪 Test It

1. **Without database** (file storage):
   ```bash
   npm run dev
   # Works immediately!
   ```

2. **With database** (Supabase):
   ```bash
   # Add .env.local with Supabase keys
   npm run dev
   # Now uses Supabase!
   ```

## 📚 Documentation

- **`DATABASE_SETUP.md`** - Complete Supabase setup guide
- **`DEPLOY.md`** - Deployment instructions
- **`BACKEND_GUIDE.md`** - Backend API documentation

## 🎉 You're Ready!

Your website is now **fully functional** with:
- ✅ Real database support (Supabase)
- ✅ Automatic fallback (file storage)
- ✅ All API routes working
- ✅ Admin authentication
- ✅ Production-ready structure

**Next step:** Follow `DATABASE_SETUP.md` to set up Supabase, or deploy as-is with file storage!
