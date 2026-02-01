# Backend Implementation Guide

## Overview

The backend is now fully implemented using Next.js API routes with a file-based database (JSON files). This can easily be upgraded to a real database.

## Architecture

```
app/api/
├── jobs/
│   ├── route.ts          # GET (all jobs), POST (create job)
│   └── [id]/route.ts     # GET, PUT, DELETE (single job)
└── auth/
    └── login/route.ts     # POST (admin login)

lib/
├── db.ts                  # Database layer (file-based)
└── api.ts                 # Client-side API helpers

data/
├── jobs.json              # Jobs database (auto-created)
└── users.json             # Users database (auto-created)
```

## API Endpoints

### Jobs API

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/[id]` - Get a single job
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/[id]` - Update a job
- `DELETE /api/jobs/[id]` - Delete a job

### Auth API

- `POST /api/auth/login` - Admin login
  - Body: `{ username: string, password: string }`
  - Returns: `{ success: true, data: { id, username, role } }`

## Default Credentials

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change the default password in production!

## Data Storage

Currently using JSON files in the `data/` directory:
- `data/jobs.json` - All job listings
- `data/users.json` - User accounts

### Upgrading to a Real Database

To upgrade to PostgreSQL, MongoDB, or another database:

1. Install your database client library:
   ```bash
   npm install pg  # For PostgreSQL
   # or
   npm install mongodb  # For MongoDB
   ```

2. Update `lib/db.ts` to use your database instead of file operations

3. The API routes (`app/api/**/route.ts`) don't need changes - they already use the `lib/db.ts` functions

## Authentication

Currently using sessionStorage for client-side session management. For production:

1. **Use JWT tokens:**
   - Install: `npm install jsonwebtoken`
   - Generate tokens on login
   - Verify tokens on protected routes

2. **Use NextAuth.js:**
   - Install: `npm install next-auth`
   - Provides full authentication system

3. **Use cookies:**
   - Set HTTP-only cookies for sessions
   - More secure than sessionStorage

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy - it works out of the box!

**Note:** File-based storage works on Vercel, but data is reset on each deployment. For production, use a database.

### Other Platforms

The app works on any Node.js hosting:
- Netlify
- Railway
- Render
- DigitalOcean App Platform
- AWS, GCP, Azure

## Production Checklist

- [ ] Change default admin password
- [ ] Set up a real database (PostgreSQL, MongoDB, etc.)
- [ ] Implement proper authentication (JWT or NextAuth)
- [ ] Add environment variables for secrets
- [ ] Set up backups for database
- [ ] Add rate limiting for API routes
- [ ] Add CORS configuration if needed
- [ ] Set up monitoring and error tracking
- [ ] Add SSL/HTTPS
- [ ] Configure domain name

## Security Notes

1. **Passwords:** Currently stored in plain text. Use bcrypt for hashing in production
2. **Sessions:** Using sessionStorage. Use HTTP-only cookies or JWT tokens
3. **API Routes:** No rate limiting. Add rate limiting for production
4. **Input Validation:** Basic validation exists. Add more comprehensive validation

## Testing the Backend

### Test API Endpoints

```bash
# Get all jobs
curl http://localhost:3000/api/jobs

# Get a single job
curl http://localhost:3000/api/jobs/1

# Create a job (requires JSON body)
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Job",
    "company": "Test Company",
    "location": "Silchar",
    "type": "private",
    "description": "Test description"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

## File Structure

```
Barak-job-portal/
├── app/
│   ├── api/              # API routes
│   │   ├── jobs/
│   │   └── auth/
│   ├── admin/            # Admin panel (protected)
│   └── ...
├── lib/
│   ├── db.ts            # Database operations
│   └── api.ts           # Client API helpers
└── data/                # JSON database files (auto-created)
    ├── jobs.json
    └── users.json
```

## Next Steps

1. **Deploy to Vercel** - Works immediately
2. **Add Database** - Upgrade `lib/db.ts` when ready
3. **Add Authentication** - Implement JWT or NextAuth
4. **Add Features** - Email notifications, analytics, etc.

The backend is production-ready in structure, but upgrade the database and authentication for real production use!
