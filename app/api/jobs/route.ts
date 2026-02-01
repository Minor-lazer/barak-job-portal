import { NextRequest, NextResponse } from 'next/server'
import { getJobs, createJob } from '@/lib/db'

// GET /api/jobs - Get all jobs
export async function GET() {
  try {
    // Log environment check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('=== API /jobs GET Request ===')
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
      keyPreview: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'missing',
    })
    
    const jobs = await getJobs()
    
    console.log(`Returning ${jobs.length} jobs`)
    
    // Jobs are already sorted by posted date (newest first) from database
    return NextResponse.json({ 
      success: true, 
      data: jobs,
      count: jobs.length 
    })
  } catch (error: any) {
    console.error('=== ERROR in /api/jobs ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    console.error('Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
    
    // Return error but don't crash - return empty array instead
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || 'Failed to fetch jobs',
        data: [], // Return empty array so frontend doesn't crash
        count: 0
      },
      { status: 200 } // Return 200 with error flag instead of 500
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
