'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiBriefcase, FiMapPin, FiCalendar, FiHome, FiSearch } from 'react-icons/fi'
import { fetchJobs, Job } from '@/lib/api'

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'government' | 'private'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const allJobs = await fetchJobs()
      setJobs(allJobs)
      setFilteredJobs(allJobs)
    } catch (error) {
      console.error('Error loading jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = jobs

    if (filterType !== 'all') {
      filtered = filtered.filter(job => job.type === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredJobs(filtered)
  }, [searchTerm, filterType, jobs])

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Barak Job Portal</h1>
          <p className="text-xl mb-8 text-primary-100">
            Your gateway to job opportunities in Barak Valley
          </p>
          <p className="text-lg text-primary-200 max-w-2xl mx-auto">
            Discover daily job openings in government and private sectors. 
            Stay updated with the latest opportunities in your region.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8 -mt-10">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, company, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setFilterType('government')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'government'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Government
              </button>
              <button
                onClick={() => setFilterType('private')}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filterType === 'private'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Private
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="container mx-auto px-4 py-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <FiBriefcase className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 hover:border-primary-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <FiHome className="mr-2" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.type === 'government'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {job.type === 'government' ? 'Government' : 'Private'}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiMapPin className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiCalendar className="mr-2" />
                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                  {job.deadline && (
                    <div className="flex items-center text-red-600 text-sm">
                      <FiCalendar className="mr-2" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {job.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {job.salary && (
                    <span className="text-primary-600 font-semibold">{job.salary}</span>
                  )}
                  <span className="text-primary-600 font-medium text-sm hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are you an employer?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Post your job openings and reach thousands of job seekers in Barak Valley
          </p>
          <Link
            href="/post-job"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  )
}
