import Link from 'next/link'
import { FiBriefcase, FiMail, FiPhone } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FiBriefcase className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">Barak Job Portal</span>
            </div>
            <p className="text-gray-400">
              Connecting job seekers with opportunities in Barak Valley. 
              Your trusted source for daily job updates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-gray-400 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FiMail className="mr-2" />
                <span>info@barakjobportal.com</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                <span>+91 XXX XXX XXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Barak Job Portal. All rights reserved.</p>
          <p className="mt-2 text-sm">Serving the people of Barak Valley</p>
        </div>
      </div>
    </footer>
  )
}
