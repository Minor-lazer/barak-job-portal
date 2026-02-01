// Simple in-memory storage for jobs
// In production, this would be replaced with a database

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

// Default jobs data
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
  },
  {
    id: '3',
    title: 'Accountant',
    company: 'Barak Valley Commerce Association',
    location: 'Hailakandi',
    type: 'private',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'We are seeking an experienced Accountant to manage our financial records, prepare reports, and ensure compliance with accounting standards. The ideal candidate should be detail-oriented and have strong analytical skills.',
    requirements: [
      'Bachelor\'s degree in Commerce or Accounting',
      'CA/CMA qualification preferred',
      'Proficiency in Tally or similar accounting software',
      'Minimum 3 years of experience',
      'Knowledge of tax regulations'
    ],
    salary: '₹30,000 - ₹45,000 per month',
    experience: '3-5 years',
    applicationProcess: 'Submit your resume along with copies of educational and professional certificates to the office address or via email.',
    contactInfo: 'Email: hr@bvcommerce.org\nAddress: Commerce Association Building, Hailakandi'
  },
  {
    id: '4',
    title: 'Nurse',
    company: 'Barak Valley Medical Center',
    location: 'Silchar',
    type: 'private',
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'We are looking for a compassionate and skilled Nurse to join our healthcare team. You will provide patient care, assist doctors, and ensure the well-being of patients in our medical facility.',
    requirements: [
      'Diploma or Bachelor\'s degree in Nursing',
      'Valid nursing license',
      'Minimum 1 year of experience',
      'Strong communication and interpersonal skills',
      'Ability to work in shifts'
    ],
    salary: '₹28,000 - ₹38,000 per month',
    experience: '1-3 years',
    applicationProcess: 'Interested candidates should submit their resume, nursing license, and educational certificates to the HR department.',
    contactInfo: 'Email: hr@bvmedicalcenter.com\nPhone: +91 XXX XXX XXXX'
  },
  {
    id: '5',
    title: 'Bank Clerk',
    company: 'Regional Bank of Barak Valley',
    location: 'Karimganj',
    type: 'government',
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Join our banking team as a Clerk. You will handle customer transactions, maintain records, and assist with various banking operations. This is a great opportunity to start a career in the banking sector.',
    requirements: [
      'Bachelor\'s degree in any discipline',
      'Basic computer knowledge',
      'Good numerical and communication skills',
      'Age limit: 18-30 years',
      'Must be a resident of Barak Valley'
    ],
    salary: '₹22,000 - ₹30,000 per month',
    experience: 'Freshers welcome',
    applicationProcess: 'Apply online through the official bank website. Submit all required documents including educational certificates, identity proof, and address proof.',
    contactInfo: 'Website: www.rbbv.gov.in\nPhone: +91 XXX XXX XXXX'
  }
]

// In-memory cache (server-side) or loaded from localStorage (client-side)
let jobsCache: Job[] | null = null

// Get jobs array (with localStorage sync on client)
function getJobsArray(): Job[] {
  // Return cache if available (for server-side or after first load)
  if (jobsCache !== null && typeof window === 'undefined') {
    return jobsCache
  }
  
  // Always start with default jobs
  let currentJobs = [...defaultJobs]
  
  // On client side, try to load from localStorage
  if (typeof window !== 'undefined') {
    try {
      const savedJobs = localStorage.getItem('barakJobs')
      if (savedJobs) {
        const parsed = JSON.parse(savedJobs)
        if (Array.isArray(parsed) && parsed.length > 0) {
          currentJobs = parsed
        }
      }
    } catch (e) {
      console.error('Error loading jobs from localStorage:', e)
    }
  }
  
  // Cache for server-side
  if (typeof window === 'undefined') {
    jobsCache = currentJobs
  }
  
  return currentJobs
}

// Store jobs to localStorage (client-side only)
function saveJobsToStorage(jobs: Job[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('barakJobs', JSON.stringify(jobs))
      // Update cache
      jobsCache = jobs
    } catch (e) {
      console.error('Error saving jobs to localStorage:', e)
    }
  }
}

export function getJobs(): Job[] {
  try {
    const jobs = getJobsArray()
    if (!Array.isArray(jobs)) {
      return []
    }
    // In production, this would fetch from a database
    return [...jobs].sort((a, b) => {
      try {
        const dateA = new Date(a.postedDate).getTime()
        const dateB = new Date(b.postedDate).getTime()
        return dateB - dateA
      } catch {
        return 0
      }
    })
  } catch (error) {
    console.error('Error in getJobs:', error)
    return []
  }
}

export function getJobById(id: string): Job | undefined {
  try {
    if (!id) return undefined
    const jobs = getJobsArray()
    if (!Array.isArray(jobs)) {
      return undefined
    }
    return jobs.find(job => job && job.id === id)
  } catch (error) {
    console.error('Error in getJobById:', error)
    return undefined
  }
}

export function addJob(job: Job): void {
  try {
    if (!job || !job.id) {
      console.error('Invalid job data')
      return
    }
    const jobs = getJobsArray()
    if (!Array.isArray(jobs)) {
      console.error('Jobs array is not valid')
      return
    }
    const updatedJobs = [...jobs, job]
    saveJobsToStorage(updatedJobs)
  } catch (error) {
    console.error('Error in addJob:', error)
  }
}

export function updateJob(updatedJob: Job): void {
  try {
    if (!updatedJob || !updatedJob.id) {
      console.error('Invalid job data')
      return
    }
    const jobs = getJobsArray()
    if (!Array.isArray(jobs)) {
      console.error('Jobs array is not valid')
      return
    }
    const updatedJobs = jobs.map(job => job && job.id === updatedJob.id ? updatedJob : job)
    saveJobsToStorage(updatedJobs)
  } catch (error) {
    console.error('Error in updateJob:', error)
  }
}

export function deleteJob(id: string): void {
  try {
    if (!id) {
      console.error('Invalid job ID')
      return
    }
    const jobs = getJobsArray()
    if (!Array.isArray(jobs)) {
      console.error('Jobs array is not valid')
      return
    }
    const updatedJobs = jobs.filter(job => job && job.id !== id)
    saveJobsToStorage(updatedJobs)
  } catch (error) {
    console.error('Error in deleteJob:', error)
  }
}

