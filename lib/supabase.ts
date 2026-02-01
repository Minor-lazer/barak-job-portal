// Supabase client setup
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Log in development to help debug
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase config check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'missing',
  })
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Using file-based storage as fallback.')
  console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'set' : 'missing')
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'set' : 'missing')
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null && supabaseUrl !== '' && supabaseAnonKey !== ''
}
