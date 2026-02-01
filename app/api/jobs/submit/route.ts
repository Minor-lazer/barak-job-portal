import { NextRequest, NextResponse } from 'next/server'

// POST /api/jobs/submit - Submit job for admin review (sends email)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.company || !body.location || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!body.submitterName || !body.submitterEmail) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name and email' },
        { status: 400 }
      )
    }

    // Get admin email from environment variable
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@barakjobportal.com'
    
    // Format job details for email
    const jobDetails = `
New Job Submission - Barak Job Portal

Submitted by: ${body.submitterName} (${body.submitterEmail})
Submitted on: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOB DETAILS:

Job Title: ${body.title}
Company: ${body.company}
Location: ${body.location}
Job Type: ${body.type === 'government' ? 'Government' : 'Private Sector'}

Description:
${body.description}

${body.requirements && body.requirements.length > 0 ? `
Requirements:
${Array.isArray(body.requirements) ? body.requirements.map((r: string, i: number) => `${i + 1}. ${r}`).join('\n') : body.requirements}
` : ''}

${body.salary ? `Salary: ${body.salary}` : ''}
${body.experience ? `Experience Required: ${body.experience}` : ''}
${body.deadline ? `Application Deadline: ${new Date(body.deadline).toLocaleDateString()}` : ''}

${body.applicationProcess ? `
How to Apply:
${body.applicationProcess}
` : ''}

${body.contactInfo ? `
Contact Information:
${body.contactInfo}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SQL QUERY TO INSERT INTO SUPABASE:

INSERT INTO jobs (title, company, location, type, description, requirements, salary, experience, deadline, application_process, contact_info)
VALUES (
  '${body.title.replace(/'/g, "''")}',
  '${body.company.replace(/'/g, "''")}',
  '${body.location.replace(/'/g, "''")}',
  '${body.type}',
  '${body.description.replace(/'/g, "''")}',
  ARRAY[${Array.isArray(body.requirements) ? body.requirements.map((r: string) => `'${r.replace(/'/g, "''")}'`).join(', ') : `'${String(body.requirements).replace(/'/g, "''")}'`}],
  ${body.salary ? `'${body.salary.replace(/'/g, "''")}'` : 'NULL'},
  ${body.experience ? `'${body.experience.replace(/'/g, "''")}'` : 'NULL'},
  ${body.deadline ? `'${body.deadline}'::timestamp` : 'NULL'},
  ${body.applicationProcess ? `'${body.applicationProcess.replace(/'/g, "''")}'` : 'NULL'},
  ${body.contactInfo ? `'${body.contactInfo.replace(/'/g, "''")}'` : 'NULL'}
);

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted by: ${body.submitterName}
Email: ${body.submitterEmail}
`

    // TODO: Send email to admin
    // You can use services like:
    // - Resend (recommended): https://resend.com
    // - SendGrid: https://sendgrid.com
    // - Nodemailer with SMTP
    // - AWS SES
    
    // For now, we'll log it and return success
    // In production, implement actual email sending
    
    console.log('='.repeat(60))
    console.log('NEW JOB SUBMISSION RECEIVED')
    console.log('='.repeat(60))
    console.log(jobDetails)
    console.log('='.repeat(60))
    
    // Example: Using a simple email service
    // You can replace this with your preferred email service
    try {
      // Option 1: Use Resend (recommended)
      // const RESEND_API_KEY = process.env.RESEND_API_KEY
      // if (RESEND_API_KEY) {
      //   const resend = require('resend').Resend(RESEND_API_KEY)
      //   await resend.emails.send({
      //     from: 'noreply@barakjobportal.com',
      //     to: adminEmail,
      //     subject: `New Job Submission: ${body.title}`,
      //     text: jobDetails,
      //   })
      // }

      // Option 2: Use Nodemailer
      // const nodemailer = require('nodemailer')
      // const transporter = nodemailer.createTransport({...})
      // await transporter.sendMail({
      //   from: 'noreply@barakjobportal.com',
      //   to: adminEmail,
      //   subject: `New Job Submission: ${body.title}`,
      //   text: jobDetails,
      // })
    } catch (emailError) {
      console.error('Email sending failed (but job submission logged):', emailError)
      // Don't fail the request if email fails - just log it
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Job submission received. Admin will review and post it soon.',
      note: 'Check server logs for job details and SQL query'
    }, { status: 200 })
  } catch (error) {
    console.error('Error processing job submission:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit job. Please try again.' },
      { status: 500 }
    )
  }
}
