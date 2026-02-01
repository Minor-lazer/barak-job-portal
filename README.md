# Barak Job Portal

A modern, intuitive job portal website for Barak Valley, serving the people of the region with daily job opportunities in both government and private sectors.

## Features

- **Job Listings**: Browse daily job opportunities with detailed information
- **Job Categories**: Filter jobs by type (Government/Private Sector)
- **Search Functionality**: Search jobs by title, company, or location
- **Job Details**: Comprehensive job information including requirements, salary, and application process
- **Employer Portal**: Easy-to-use form for employers to post job openings
- **Admin Panel**: Content management system for managing job listings
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── admin/          # Admin panel for managing jobs
│   ├── jobs/[id]/      # Individual job detail pages
│   ├── post-job/       # Employer job posting form
│   ├── layout.tsx      # Root layout with navbar and footer
│   ├── page.tsx        # Home page with job listings
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── lib/
    └── jobs.ts         # Job data management
```

## Usage

### For Job Seekers

1. Visit the home page to browse all available jobs
2. Use the search bar to find specific jobs
3. Filter by job type (Government/Private)
4. Click on any job card to view detailed information
5. Follow the application process mentioned in each job listing

### For Employers

1. Click "Post a Job" in the navigation or homepage
2. Fill out the job posting form with all required details
3. Submit the form (jobs are reviewed before being published)

### For Administrators

1. Navigate to `/admin` to access the admin panel
2. View all job listings in a table format
3. Add new jobs, edit existing ones, or delete jobs
4. All changes are saved and reflected immediately

## Technology Stack

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library

## Data Storage

Currently, jobs are stored in-memory with localStorage persistence. For production use, this should be replaced with a proper database (PostgreSQL, MongoDB, etc.) or a headless CMS.

## Future Enhancements

- User authentication and accounts
- Email notifications for new job postings
- Advanced filtering and sorting options
- Job application tracking
- Resume upload functionality
- Integration with external job boards
- Analytics dashboard

## License

This project is created for the Barak Valley community.
