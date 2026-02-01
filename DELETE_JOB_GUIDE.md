# How to Delete a Job

## Method 1: Using Admin Panel (Easiest) ✅

1. **Go to Admin Panel:**
   - Visit: `http://localhost:3000/admin/login`
   - Login with: `admin` / `admin123`

2. **Find the job:**
   - Scroll through the jobs table
   - Or use browser search (Ctrl+F / Cmd+F) to find by title/company

3. **Delete:**
   - Click the **trash icon** 🗑️ in the "Actions" column
   - Confirm the deletion
   - Job will be deleted from Supabase immediately

## Method 2: Using SQL Query in Supabase

### Delete by ID (Most Common)

1. **Go to Supabase Dashboard:**
   - Open your project
   - Click **"SQL Editor"** in left sidebar
   - Click **"New query"**

2. **Find the Job ID:**
   - First, find the job you want to delete:
   ```sql
   SELECT id, title, company, location 
   FROM jobs 
   ORDER BY posted_date DESC;
   ```
   - Copy the `id` (UUID) of the job you want to delete

3. **Delete the Job:**
   ```sql
   DELETE FROM jobs 
   WHERE id = 'your-job-id-here';
   ```
   - Replace `'your-job-id-here'` with the actual UUID
   - Example:
   ```sql
   DELETE FROM jobs 
   WHERE id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
   ```

4. **Click "Run"** (or press Cmd/Ctrl + Enter)

### Delete by Title

```sql
DELETE FROM jobs 
WHERE title = 'Job Title Here';
```

**Example:**
```sql
DELETE FROM jobs 
WHERE title = 'Software Developer';
```

⚠️ **Warning:** This deletes ALL jobs with that exact title!

### Delete by Company

```sql
DELETE FROM jobs 
WHERE company = 'Company Name Here';
```

### Delete by Multiple Conditions

```sql
DELETE FROM jobs 
WHERE title = 'Software Developer' 
  AND company = 'Tech Solutions Pvt. Ltd.';
```

### Delete Multiple Jobs by IDs

```sql
DELETE FROM jobs 
WHERE id IN (
  'id-1-here',
  'id-2-here',
  'id-3-here'
);
```

### Delete All Jobs (⚠️ Be Careful!)

```sql
DELETE FROM jobs;
```

⚠️ **This deletes EVERYTHING!** Use with caution.

### Delete Jobs Older Than X Days

```sql
DELETE FROM jobs 
WHERE posted_date < NOW() - INTERVAL '30 days';
```

This deletes jobs older than 30 days.

## Method 3: Using API (Programmatic)

You can also delete via API call:

```bash
curl -X DELETE http://localhost:3000/api/jobs/job-id-here
```

Or using JavaScript:

```javascript
fetch('/api/jobs/job-id-here', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

## 📋 Common SQL Queries for Jobs

### View All Jobs
```sql
SELECT * FROM jobs 
ORDER BY posted_date DESC;
```

### View Jobs by Type
```sql
SELECT * FROM jobs 
WHERE type = 'government'
ORDER BY posted_date DESC;
```

### View Jobs by Location
```sql
SELECT * FROM jobs 
WHERE location = 'Silchar'
ORDER BY posted_date DESC;
```

### Count Total Jobs
```sql
SELECT COUNT(*) as total_jobs FROM jobs;
```

### Find Job by ID
```sql
SELECT * FROM jobs 
WHERE id = 'your-job-id-here';
```

## 🔍 Finding Job ID

### Option 1: From Admin Panel
- The admin panel shows jobs but not the UUID
- Use SQL query to find it

### Option 2: From SQL Query
```sql
SELECT id, title, company, posted_date 
FROM jobs 
ORDER BY posted_date DESC 
LIMIT 10;
```

### Option 3: From Browser
- Open browser DevTools (F12)
- Go to Network tab
- Load jobs page
- Check the API response - it includes job IDs

## ⚠️ Important Notes

1. **Deletion is Permanent:**
   - Once deleted, the job is gone forever
   - Make sure you want to delete it!

2. **Backup First (Optional):**
   ```sql
   -- Export before deleting
   SELECT * FROM jobs WHERE id = 'your-id';
   -- Copy the result, then delete
   ```

3. **Check RLS Policies:**
   - Make sure you have permission to delete
   - Admin panel handles this automatically

4. **Cascade Deletes:**
   - Currently, jobs table has no foreign keys
   - Deleting a job won't affect other tables

## ✅ Verification

After deleting, verify:

```sql
-- Check if job still exists
SELECT * FROM jobs WHERE id = 'deleted-job-id';
-- Should return 0 rows
```

Or refresh your homepage - the job should be gone!

## 🎯 Recommended Method

**For regular use:** Use the **Admin Panel** (Method 1)
- ✅ Easy and safe
- ✅ Visual confirmation
- ✅ No SQL knowledge needed

**For bulk operations:** Use **SQL Queries** (Method 2)
- ✅ Delete multiple jobs at once
- ✅ Complex conditions
- ✅ Automation

---

**Quick Delete Query Template:**

```sql
-- 1. First, find the job
SELECT id, title, company FROM jobs WHERE title LIKE '%keyword%';

-- 2. Then delete it (replace with actual ID)
DELETE FROM jobs WHERE id = 'paste-id-here';
```
