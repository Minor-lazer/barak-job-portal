# Deployment Guide - Barak Job Portal

## ✅ Backend is Ready!

Your website now has a complete backend with:
- ✅ API routes for all operations
- ✅ Database layer (file-based, upgradeable)
- ✅ Authentication system
- ✅ Admin panel protection
- ✅ All frontend connected to API

## 🚀 Quick Deployment to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit with backend"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/barak-job-portal.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (use GitHub for easy integration)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your site is live! 🎉

**Your site will be at:** `https://your-project-name.vercel.app`

### Step 3: Access Your Site

- **Homepage:** `https://your-project-name.vercel.app`
- **Admin Login:** `https://your-project-name.vercel.app/admin/login`
  - Username: `admin`
  - Password: `admin123` (⚠️ Change this!)

## 📝 Important Notes

### Data Storage

Currently using JSON files in the `data/` directory. On Vercel:
- ✅ Works for testing and demos
- ⚠️ Data resets on each deployment (serverless)
- 💡 For production: Upgrade to a database (see below)

### Admin Credentials

**Default login:**
- Username: `admin`
- Password: `admin123`

**⚠️ CHANGE THE PASSWORD IN PRODUCTION!**

Edit `lib/db.ts` and update the default user, or better yet, set up environment variables.

## 🔧 Upgrading to a Real Database

### Option 1: Supabase (Free, Easy)

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL
4. Install: `npm install @supabase/supabase-js`
5. Update `lib/db.ts` to use Supabase client

### Option 2: MongoDB Atlas (Free Tier)

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Install: `npm install mongodb`
5. Update `lib/db.ts` to use MongoDB

### Option 3: PostgreSQL (Railway, Render, etc.)

1. Create database on Railway/Render/Supabase
2. Get connection string
3. Install: `npm install pg`
4. Update `lib/db.ts` to use PostgreSQL

## 🌐 Other Deployment Options

### Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "Add new site" → "Import from Git"
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy!

### Railway

1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. "New Project" → "Deploy from GitHub"
4. Select your repo
5. Railway auto-detects Next.js
6. Deploy!

### Render

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. "New" → "Web Service"
4. Connect GitHub repo
5. Build command: `npm run build`
6. Start command: `npm start`
7. Deploy!

## 🔐 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Set up environment variables for secrets
- [ ] Add rate limiting to API routes
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Add input validation
- [ ] Set up error monitoring (Sentry, etc.)

## 📊 Monitoring

After deployment:

1. **Vercel Analytics:** Built-in, check dashboard
2. **Error Tracking:** Add Sentry
   ```bash
   npm install @sentry/nextjs
   ```
3. **Uptime Monitoring:** Use UptimeRobot (free)

## 🎯 Next Steps

1. **Deploy now** - Test with current setup
2. **Add database** - When ready for production
3. **Add features** - Email notifications, analytics, etc.
4. **Custom domain** - Add your own domain name

## 🆘 Troubleshooting

### Build Fails

- Check Node.js version (needs 18+)
- Run `npm install` locally first
- Check for TypeScript errors

### API Routes Not Working

- Ensure you're using Next.js 14+ (App Router)
- Check that API routes are in `app/api/` directory
- Verify file names match route structure

### Data Not Persisting

- On Vercel, file-based storage resets on deploy
- Upgrade to a database for persistence
- Or use Vercel KV/Postgres for serverless storage

## 📞 Support

- Check `BACKEND_GUIDE.md` for API documentation
- Check `README.md` for general info
- All API routes are in `app/api/` directory

---

**Your backend is ready! Deploy and start using it! 🚀**
