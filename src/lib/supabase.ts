import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy-initialize the client on first use, not at module evaluation time.
// This prevents the build-time proxy from being cached as the permanent client.

let _supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    // During build, return a throwaway client that won't be cached
    // so the real client gets created at runtime
    return createDummyClient()
  }

  _supabase = createClient(url, key)
  return _supabase
}

// Proxy object used ONLY during static build when env vars aren't injected yet.
// It is never cached in _supabase, so the real client is created on the next call.
function createDummyClient(): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get: (_target, prop) => {
      if (prop === 'from') {
        return () => ({
          select: () => ({
            data: [],
            error: null,
            eq: () => ({
              data: [],
              error: null,
              order: () => ({ data: [], error: null }),
              single: () => ({ data: null, error: { message: 'Not configured' } }),
            }),
            order: () => ({ data: [], error: null }),
          }),
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
        return {
          from: () => ({
            upload: () => Promise.resolve({ data: null, error: { message: 'Storage not configured' } }),
            getPublicUrl: () => ({ data: { publicUrl: '' } }),
          }),
        }
      }
      return () => {}
    },
  })
}

// Export as a getter so every import gets the lazily-initialized real client
export const supabase = new Proxy({} as SupabaseClient, {
  get: (_target, prop, receiver) => {
    const client = getSupabaseClient()
    const value = Reflect.get(client, prop, receiver)
    if (typeof value === 'function') {
      return value.bind(client)
    }
    return value
  },
})

// Admin client with service role key (server-side only)
export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL')
  return createClient(url, serviceKey)
}
