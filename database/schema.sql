-- Database Schema for Barak Job Portal
-- Run this SQL in your Supabase SQL Editor

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('government', 'private')),
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deadline TIMESTAMP WITH TIME ZONE,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  salary TEXT,
  experience TEXT,
  application_process TEXT,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on jobs for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(type);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);

-- Create index on users for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Enable Row Level Security (RLS)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs (public read, admin write)
-- Allow anyone to read jobs
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  USING (true);

-- Allow authenticated admins to insert jobs
CREATE POLICY "Admins can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (true); -- In production, check user role

-- Allow authenticated admins to update jobs
CREATE POLICY "Admins can update jobs"
  ON jobs FOR UPDATE
  USING (true); -- In production, check user role

-- Allow authenticated admins to delete jobs
CREATE POLICY "Admins can delete jobs"
  ON jobs FOR DELETE
  USING (true); -- In production, check user role

-- Create policies for users (admin only)
-- Only admins can view users
CREATE POLICY "Admins can view users"
  ON users FOR SELECT
  USING (true); -- In production, check user role

-- Insert default admin user (password: admin123)
-- Note: In production, use bcrypt to hash passwords
-- For now, we'll handle password hashing in the application
INSERT INTO users (username, password_hash, role)
VALUES ('admin', 'admin123', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
