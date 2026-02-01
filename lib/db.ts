// Database layer - Uses Supabase if configured, falls back to file storage
import fs from 'fs'
import path from 'path'
import { supabase, isSupabaseConfigured } from './supabase'

const DATA_DIR = path.join(process.cwd(), 'data')
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

// Ensure data directory exists for file fallback
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'government' | 'private'
  postedDate: string
  deadline?: string
  description: string
  requirements: string[]
  salary?: string
  experience?: string
  applicationProcess?: string
  contactInfo?: string
}

export interface User {
  id: string
  username: string
  password: string // In production, this should be hashed
  role: 'admin' | 'user'
  createdAt: string
}

// ==================== SUPABASE FUNCTIONS ====================

async function getJobsFromSupabase(): Promise<Job[]> {
  if (!supabase) {
    console.error('Supabase client is null')
    return []
  }
  
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching jobs from Supabase:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return []
    }
    
    if (!data) {
      console.warn('No data returned from Supabase')
      return []
    }
    
    // Transform Supabase format to our Job interface
    return (data || []).map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type as 'government' | 'private',
      postedDate: job.posted_date,
      deadline: job.deadline || undefined,
      description: job.description,
      requirements: job.requirements || [],
      salary: job.salary || undefined,
      experience: job.experience || undefined,
      applicationProcess: job.application_process || undefined,
      contactInfo: job.contact_info || undefined,
    }))
  } catch (err: any) {
    console.error('Exception in getJobsFromSupabase:', err)
    console.error('Error message:', err?.message)
    console.error('Error stack:', err?.stack)
    return []
  }
}

async function getJobByIdFromSupabase(id: string): Promise<Job | undefined> {
  if (!supabase) return undefined
  
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !data) {
    return undefined
  }
  
  return {
    id: data.id,
    title: data.title,
    company: data.company,
    location: data.location,
    type: data.type as 'government' | 'private',
    postedDate: data.posted_date,
    deadline: data.deadline || undefined,
    description: data.description,
    requirements: data.requirements || [],
    salary: data.salary || undefined,
    experience: data.experience || undefined,
    applicationProcess: data.application_process || undefined,
    contactInfo: data.contact_info || undefined,
  }
}

async function createJobInSupabase(job: Omit<Job, 'id' | 'postedDate'>): Promise<Job> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  
  const { data, error } = await supabase
    .from('jobs')
    .insert({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      deadline: job.deadline || null,
      description: job.description,
      requirements: job.requirements,
      salary: job.salary || null,
      experience: job.experience || null,
      application_process: job.applicationProcess || null,
      contact_info: job.contactInfo || null,
    })
    .select()
    .single()
  
  if (error || !data) {
    throw new Error(error?.message || 'Failed to create job')
  }
  
  return {
    id: data.id,
    title: data.title,
    company: data.company,
    location: data.location,
    type: data.type as 'government' | 'private',
    postedDate: data.posted_date,
    deadline: data.deadline || undefined,
    description: data.description,
    requirements: data.requirements || [],
    salary: data.salary || undefined,
    experience: data.experience || undefined,
    applicationProcess: data.application_process || undefined,
    contactInfo: data.contact_info || undefined,
  }
}

async function updateJobInSupabase(id: string, updates: Partial<Job>): Promise<Job | null> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  
  const updateData: any = {}
  if (updates.title) updateData.title = updates.title
  if (updates.company) updateData.company = updates.company
  if (updates.location) updateData.location = updates.location
  if (updates.type) updateData.type = updates.type
  if (updates.deadline !== undefined) updateData.deadline = updates.deadline || null
  if (updates.description) updateData.description = updates.description
  if (updates.requirements) updateData.requirements = updates.requirements
  if (updates.salary !== undefined) updateData.salary = updates.salary || null
  if (updates.experience !== undefined) updateData.experience = updates.experience || null
  if (updates.applicationProcess !== undefined) updateData.application_process = updates.applicationProcess || null
  if (updates.contactInfo !== undefined) updateData.contact_info = updates.contactInfo || null
  
  const { data, error } = await supabase
    .from('jobs')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()
  
  if (error || !data) {
    return null
  }
  
  return {
    id: data.id,
    title: data.title,
    company: data.company,
    location: data.location,
    type: data.type as 'government' | 'private',
    postedDate: data.posted_date,
    deadline: data.deadline || undefined,
    description: data.description,
    requirements: data.requirements || [],
    salary: data.salary || undefined,
    experience: data.experience || undefined,
    applicationProcess: data.application_process || undefined,
    contactInfo: data.contact_info || undefined,
  }
}

async function deleteJobFromSupabase(id: string): Promise<boolean> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }
  
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id)
  
  return !error
}

async function verifyUserFromSupabase(username: string, password: string): Promise<User | null> {
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()
  
  if (error || !data) {
    return null
  }
  
  // In production, use bcrypt to compare hashed passwords
  // For now, simple comparison (update this!)
  if (data.password_hash === password) {
    return {
      id: data.id,
      username: data.username,
      password: data.password_hash,
      role: data.role as 'admin' | 'user',
      createdAt: data.created_at,
    }
  }
  
  return null
}

// ==================== FILE STORAGE FUNCTIONS (FALLBACK) ====================

function initializeFileData() {
  if (!fs.existsSync(JOBS_FILE)) {
    const defaultJobs: Job[] = [
      {
        id: '1',
        title: 'Primary School Teacher',
        company: 'Barak Valley Education Department',
        location: 'Silchar',
        type: 'government',
        postedDate: new Date().toISOString(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'We are looking for a dedicated Primary School Teacher to join our team. The ideal candidate should have a passion for teaching and working with young children. You will be responsible for creating lesson plans, conducting classes, and evaluating student progress.',
        requirements: [
          'Bachelor\'s degree in Education or related field',
          'B.Ed. degree is mandatory',
          'Minimum 2 years of teaching experience',
          'Good communication skills',
          'Patience and understanding with children'
        ],
        salary: '₹25,000 - ₹35,000 per month',
        experience: '2-5 years',
        applicationProcess: 'Interested candidates should submit their resume, educational certificates, and a cover letter to the Education Department office in Silchar. Applications can also be submitted online through the official government portal.',
        contactInfo: 'Email: education@barakvalley.gov.in\nPhone: +91 XXX XXX XXXX\nOffice: Education Department, Silchar'
      },
      {
        id: '2',
        title: 'Software Developer',
        company: 'Tech Solutions Pvt. Ltd.',
        location: 'Karimganj',
        type: 'private',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Join our dynamic team as a Software Developer. You will be responsible for developing and maintaining web applications, working with modern technologies, and collaborating with cross-functional teams to deliver high-quality software solutions.',
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          'Proficiency in JavaScript, React, and Node.js',
          'Experience with databases (SQL/NoSQL)',
          'Strong problem-solving skills',
          'Good team collaboration abilities'
        ],
        salary: '₹40,000 - ₹60,000 per month',
        experience: '1-3 years',
        applicationProcess: 'Please send your resume and portfolio to careers@techsolutions.com. Include links to your GitHub profile and any relevant projects.',
        contactInfo: 'Email: careers@techsolutions.com\nPhone: +91 XXX XXX XXXX'
      }
    ]
    fs.writeFileSync(JOBS_FILE, JSON.stringify(defaultJobs, null, 2))
  }

  if (!fs.existsSync(USERS_FILE)) {
    const defaultUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      }
    ]
    fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2))
  }
}

initializeFileData()

function getJobsFromFile(): Job[] {
  try {
    const data = fs.readFileSync(JOBS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading jobs:', error)
    return []
  }
}

function getJobByIdFromFile(id: string): Job | undefined {
  const jobs = getJobsFromFile()
  return jobs.find(job => job.id === id)
}

function createJobInFile(job: Omit<Job, 'id' | 'postedDate'>): Job {
  const jobs = getJobsFromFile()
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    postedDate: new Date().toISOString()
  }
  jobs.push(newJob)
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2))
  return newJob
}

function updateJobInFile(id: string, updates: Partial<Job>): Job | null {
  const jobs = getJobsFromFile()
  const index = jobs.findIndex(job => job.id === id)
  if (index === -1) return null
  
  jobs[index] = { ...jobs[index], ...updates }
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2))
  return jobs[index]
}

function deleteJobFromFile(id: string): boolean {
  const jobs = getJobsFromFile()
  const filtered = jobs.filter(job => job.id !== id)
  if (filtered.length === jobs.length) return false
  
  fs.writeFileSync(JOBS_FILE, JSON.stringify(filtered, null, 2))
  return true
}

function verifyUserFromFile(username: string, password: string): User | null {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8')
    const users: User[] = JSON.parse(data)
    const user = users.find(user => user.username === username && user.password === password)
    return user || null
  } catch (error) {
    console.error('Error reading users:', error)
    return null
  }
}

// ==================== PUBLIC API (AUTO-SELECTS SUPABASE OR FILE) ====================

export async function getJobs(): Promise<Job[]> {
  if (isSupabaseConfigured()) {
    return await getJobsFromSupabase()
  }
  return getJobsFromFile()
}

export async function getJobById(id: string): Promise<Job | undefined> {
  if (isSupabaseConfigured()) {
    return await getJobByIdFromSupabase(id)
  }
  return getJobByIdFromFile(id)
}

export async function createJob(job: Omit<Job, 'id' | 'postedDate'>): Promise<Job> {
  if (isSupabaseConfigured()) {
    return await createJobInSupabase(job)
  }
  return createJobInFile(job)
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  if (isSupabaseConfigured()) {
    return await updateJobInSupabase(id, updates)
  }
  return updateJobInFile(id, updates)
}

export async function deleteJob(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    return await deleteJobFromSupabase(id)
  }
  return deleteJobFromFile(id)
}

export async function verifyUser(username: string, password: string): Promise<User | null> {
  if (isSupabaseConfigured()) {
    return await verifyUserFromSupabase(username, password)
  }
  return verifyUserFromFile(username, password)
}
