// Client-side API helper functions

const API_BASE = '/api'

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

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Jobs API
export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(`${API_BASE}/jobs`)
  const result: ApiResponse<Job[]> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch jobs')
  }
  return result.data || []
}

export async function fetchJobById(id: string): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs/${id}`)
  const result: ApiResponse<Job> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch job')
  }
  if (!result.data) {
    throw new Error('Job not found')
  }
  return result.data
}

export async function createJob(job: Omit<Job, 'id' | 'postedDate'>): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  })
  const result: ApiResponse<Job> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to create job')
  }
  if (!result.data) {
    throw new Error('Failed to create job')
  }
  return result.data
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job> {
  const response = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })
  const result: ApiResponse<Job> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to update job')
  }
  if (!result.data) {
    throw new Error('Failed to update job')
  }
  return result.data
}

export async function deleteJob(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'DELETE',
  })
  const result: ApiResponse<void> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to delete job')
  }
}

// Auth API
export interface User {
  id: string
  username: string
  role: 'admin' | 'user'
  createdAt: string
}

export async function login(username: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
  const result: ApiResponse<User> = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Login failed')
  }
  if (!result.data) {
    throw new Error('Login failed')
  }
  return result.data
}
