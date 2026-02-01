# Email Setup Guide - Job Submissions

## Current Implementation

When someone submits a job through the "Post a Job" form:

1. ✅ Form collects job details + submitter's name and email
2. ✅ Data is sent to `/api/jobs/submit`
3. ✅ API route formats the job details with SQL query
4. ⚠️ **Email is currently logged to console** (needs email service setup)
5. ✅ You receive the job details + ready-to-use SQL query

## How It Works Now

### For Users:
- Anyone can click "Post a Job"
- Fill in the form (including their contact info)
- Submit → Gets confirmation message
- Job details sent to admin for review

### For Admin (You):
- Job submission appears in **server logs/console**
- Includes formatted job details
- **Includes ready-to-use SQL query** to insert into Supabase
- Copy the SQL query and run it in Supabase SQL Editor

## Viewing Job Submissions

### Option 1: Server Console (Current)
When someone submits a job, check your terminal/console where `npm run dev` is running. You'll see:

```
============================================================
NEW JOB SUBMISSION RECEIVED
============================================================
[Job details with SQL query]
============================================================
```

### Option 2: Set Up Email (Recommended)

To receive emails instead of checking logs, set up an email service:

## Email Service Options

### Option 1: Resend (Easiest - Recommended)

1. **Sign up:** [resend.com](https://resend.com) (free tier available)
2. **Get API key:** Dashboard → API Keys → Create
3. **Add to `.env.local`:**
   ```bash
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ADMIN_EMAIL=your-email@example.com
   ```
4. **Install Resend:**
   ```bash
   npm install resend
   ```
5. **Update `app/api/jobs/submit/route.ts`:**
   - Uncomment the Resend code section
   - It's already there, just needs to be enabled!

### Option 2: Nodemailer (SMTP)

1. **Install:**
   ```bash
   npm install nodemailer
   ```
2. **Add to `.env.local`:**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ADMIN_EMAIL=your-email@example.com
   ```
3. **Update the API route** to use Nodemailer

### Option 3: SendGrid

1. **Sign up:** [sendgrid.com](https://sendgrid.com)
2. **Get API key**
3. **Install:** `npm install @sendgrid/mail`
4. **Configure in API route**

## Current Workflow

### Step 1: User Submits Job
- User fills form at `/post-job`
- Includes their name and email
- Submits job details

### Step 2: You Receive Submission
**Currently:** Check server console/logs
**With email:** Receive email with job details

### Step 3: You Post the Job
1. Copy the SQL query from email/logs
2. Go to Supabase → SQL Editor
3. Paste and run the query
4. Job appears on website!

## SQL Query Format

Each submission includes a ready-to-use SQL query like:

```sql
INSERT INTO jobs (title, company, location, type, description, requirements, salary, experience, deadline, application_process, contact_info)
VALUES (
  'Software Developer',
  'Tech Company',
  'Silchar',
  'private',
  'Job description here...',
  ARRAY['Requirement 1', 'Requirement 2'],
  '₹40,000 - ₹60,000 per month',
  '2-5 years',
  '2024-12-31'::timestamp,
  'Apply via email...',
  'contact@company.com'
);
```

Just copy and paste into Supabase!

## Quick Setup: Enable Email (Resend)

1. **Install Resend:**
   ```bash
   npm install resend
   ```

2. **Add to `.env.local`:**
   ```bash
   RESEND_API_KEY=your_key_here
   ADMIN_EMAIL=your-email@example.com
   ```

3. **Update `app/api/jobs/submit/route.ts`:**
   - Find the Resend section (around line 80)
   - Uncomment it
   - The code is already there!

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

## Testing

1. **Submit a test job** at `/post-job`
2. **Check:**
   - Server console (should show job details)
   - Or email inbox (if email is set up)
3. **Copy SQL query** and run in Supabase
4. **Verify** job appears on homepage

## Email Template

The email includes:
- ✅ Job title, company, location, type
- ✅ Full job description
- ✅ Requirements list
- ✅ Salary, experience, deadline
- ✅ Application process
- ✅ Contact information
- ✅ **Ready-to-use SQL query** for Supabase
- ✅ Submitter's name and email

## Troubleshooting

### Not seeing submissions in console?
- Make sure dev server is running
- Check terminal where `npm run dev` is running
- Look for "NEW JOB SUBMISSION RECEIVED"

### Email not sending?
- Check `.env.local` has correct keys
- Verify email service API key is valid
- Check server logs for email errors
- Email failures don't block submission (it still logs)

### SQL query not working?
- Check for special characters (apostrophes are escaped)
- Verify all required fields are filled
- Check Supabase table structure matches

---

**Current Status:** ✅ Job submissions work! Check server console for details and SQL queries.

**Next Step:** Set up email service (optional but recommended) to receive submissions via email instead of checking logs.
