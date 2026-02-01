'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiMapPin, FiCalendar, FiHome, FiDollarSign, FiBriefcase, FiArrowLeft, FiClock } from 'react-icons/fi'
import { fetchJobById, Job } from '@/lib/api'

export default function JobDetail() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadJob(params.id as string)
    }
  }, [params.id])

  const loadJob = async (id: string) => {
    try {
      const jobData = await fetchJobById(id)
      setJob(jobData)
    } catch (error) {
      console.error('Error loading job:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Back to Job Listings
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Job Listings
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FiHome className="mr-2" />
                  <span className="text-lg">{job.company}</span>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  job.type === 'government'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {job.type === 'government' ? 'Government' : 'Private Sector'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-3 text-primary-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-3 text-primary-600" />
                <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center text-red-600">
                  <FiClock className="mr-3" />
                  <span>Application Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
              {job.salary && (
                <div className="flex items-center text-gray-600">
                  <FiDollarSign className="mr-3 text-primary-600" />
                  <span>{job.salary}</span>
                </div>
              )}
              {job.experience && (
                <div className="flex items-center text-gray-600">
                  <FiBriefcase className="mr-3 text-primary-600" />
                  <span>{job.experience}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application Process */}
          {job.applicationProcess && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Apply</h2>
              <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded">
                <p className="text-gray-700 whitespace-pre-line">{job.applicationProcess}</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          {job.contactInfo && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{job.contactInfo}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-4">
            <Link
              href="/post-job"
              className="flex-1 text-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Post a Similar Job
            </Link>
            <Link
              href="/"
              className="flex-1 text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Browse More Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
