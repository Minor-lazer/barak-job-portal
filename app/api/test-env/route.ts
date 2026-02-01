import { NextResponse } from 'next/server'

// Test endpoint to check if environment variables are being read
// This helps debug why Supabase variables might not be working
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Don't expose full keys, just show if they exist and their length
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    isVercel: !!process.env.VERCEL,
    variables: {
      hasSupabaseUrl: !!supabaseUrl,
      supabaseUrlLength: supabaseUrl?.length || 0,
      supabaseUrlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
      hasSupabaseKey: !!supabaseKey,
      supabaseKeyLength: supabaseKey?.length || 0,
      supabaseKeyPreview: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'missing',
    },
    allEnvVars: Object.keys(process.env)
      .filter(key => key.includes('SUPABASE') || key.includes('NEXT_PUBLIC'))
      .map(key => ({
        name: key,
        exists: !!process.env[key],
        length: process.env[key]?.length || 0
      }))
  })
}
