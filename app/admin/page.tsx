'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit, FiTrash2, FiPlus, FiCheck, FiX, FiLogOut } from 'react-icons/fi'
import { fetchJobs, createJob, updateJob, deleteJob, Job } from '@/lib/api'
import Link from 'next/link'

interface JobFormData {
  title?: string
  company?: string
  location?: string
  type?: 'government' | 'private'
  description?: string
  requirements?: string | string[]
  salary?: string
  experience?: string
  deadline?: string
  applicationProcess?: string
  contactInfo?: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: 'private',
    description: '',
    requirements: '',
    salary: '',
    experience: '',
    deadline: '',
    applicationProcess: '',
    contactInfo: '',
  })

  useEffect(() => {
    // Check authentication
    const user = typeof window !== 'undefined' ? sessionStorage.getItem('adminUser') : null
    if (!user) {
      router.push('/admin/login')
      return
    }

    // Load jobs
    loadJobs()
  }, [router])

  const loadJobs = async () => {
    try {
      const jobsData = await fetchJobs()
      setJobs(jobsData)
    } catch (error) {
      console.error('Error loading jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  const handleAddJob = async () => {
    try {
      const newJob = await createJob({
        title: formData.title || '',
        company: formData.company || '',
        location: formData.location || '',
        type: formData.type || 'private',
        description: formData.description || '',
        requirements: typeof formData.requirements === 'string'
          ? formData.requirements.split(',').map(r => r.trim()).filter(r => r)
          : (Array.isArray(formData.requirements) ? formData.requirements : []),
        salary: formData.salary,
        experience: formData.experience,
        deadline: formData.deadline,
        applicationProcess: formData.applicationProcess,
        contactInfo: formData.contactInfo,
      })
      await loadJobs()
      setShowAddForm(false)
      resetForm()
    } catch (error) {
      console.error('Error adding job:', error)
      alert('Failed to add job. Please try again.')
    }
  }

  const handleUpdateJob = async () => {
    if (editingJob) {
      try {
        const updates: Partial<Job> = {
          ...formData,
          requirements: typeof formData.requirements === 'string'
            ? formData.requirements.split(',').map(r => r.trim()).filter(r => r)
            : (Array.isArray(formData.requirements) ? formData.requirements : editingJob.requirements),
        }
        await updateJob(editingJob.id, updates)
        await loadJobs()
        setEditingJob(null)
        resetForm()
      } catch (error) {
        console.error('Error updating job:', error)
        alert('Failed to update job. Please try again.')
      }
    }
  }

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id)
        await loadJobs()
      } catch (error) {
        console.error('Error deleting job:', error)
        alert('Failed to delete job. Please try again.')
      }
    }
  }

  const startEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      ...job,
      requirements: job.requirements.join(', '),
    })
    setShowAddForm(false)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'private',
      description: '',
      requirements: '',
      salary: '',
      experience: '',
      deadline: '',
      applicationProcess: '',
      contactInfo: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage job listings for Barak Job Portal</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <FiLogOut />
              Logout
            </button>
            <button
              onClick={() => {
                setShowAddForm(true)
                setEditingJob(null)
                resetForm()
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <FiPlus />
              Add New Job
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingJob) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="private">Private</option>
                  <option value="government">Government</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements (comma-separated)</label>
                <textarea
                  name="requirements"
                  value={typeof formData.requirements === 'string' ? formData.requirements : formData.requirements?.join(', ')}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Bachelor's degree, 2 years experience, Good communication skills"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Application Process</label>
                <textarea
                  name="applicationProcess"
                  value={formData.applicationProcess}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
                <textarea
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={editingJob ? handleUpdateJob : handleAddJob}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <FiCheck />
                {editingJob ? 'Update Job' : 'Add Job'}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setEditingJob(null)
                  resetForm()
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <FiX />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">All Job Listings ({jobs.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.type === 'government' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.postedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(job)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
