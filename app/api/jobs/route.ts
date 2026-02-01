import { NextRequest, NextResponse } from 'next/server'
import { getJobs, createJob } from '@/lib/db'

// GET /api/jobs - Get all jobs
export async function GET() {
  try {
    // Log environment check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseKey?.length || 0,
    })
    
    const jobs = await getJobs()
    
    // Jobs are already sorted by posted date (newest first) from database
    return NextResponse.json({ 
      success: true, 
      data: jobs,
      count: jobs.length 
    })
  } catch (error: any) {
    console.error('Error fetching jobs:', error)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Failed to fetch jobs',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}

// POST /api/jobs - Create a new job (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Note: In production, implement proper server-side authentication
    // For now, the frontend protects the route, but API should also verify
    // You can add JWT token verification or session validation here
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.company || !body.location || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const job = await createJob({
      title: body.title,
      company: body.company,
      location: body.location,
      type: body.type || 'private',
      description: body.description,
      requirements: Array.isArray(body.requirements) 
        ? body.requirements 
        : (body.requirements ? body.requirements.split(',').map((r: string) => r.trim()).filter((r: string) => r) : []),
      salary: body.salary,
      experience: body.experience,
      deadline: body.deadline,
      applicationProcess: body.applicationProcess,
      contactInfo: body.contactInfo,
    })

    return NextResponse.json({ success: true, data: job }, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
