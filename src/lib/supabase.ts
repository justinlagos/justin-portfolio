import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let _supabase: SupabaseClient | null = null

export const supabase: SupabaseClient = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client during build when env vars aren't available
    // This prevents build-time crashes
    return new Proxy({} as SupabaseClient, {
      get: (_target, prop) => {
        if (prop === 'from') {
          return () => ({
            select: () => ({ data: [], error: null, eq: () => ({ data: [], error: null, order: () => ({ data: [], error: null }), single: () => ({ data: null, error: { message: 'Not configured' } }) }), order: () => ({ data: [], error: null }) }),
            insert: () => ({ data: null, error: { message: 'Not configured' } }),
            update: () => ({ eq: () => ({ data: null, error: { message: 'Not configured' } }) }),
            delete: () => ({ eq: () => ({ data: null, error: { message: 'Not configured' } }) }),
          })
        }
        if (prop === 'auth') {
          return {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Not configured' } }),
            signOut: () => Promise.resolve({ error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          }
        }
        if (prop === 'storage') {
          return { from: () => ({ upload: () => ({ data: null, error: { message: 'Not configured' } }) }) }
        }
        return () => {}
      },
    })
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
})()

// Admin client with service role key (server-side only)
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  return createClient(supabaseUrl, serviceKey)
}
