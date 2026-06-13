import { neon, NeonQueryFunction } from '@neondatabase/serverless'

// Create a SQL-tagged-template function connected to Neon.
// In Vercel, DATABASE_URL is auto-injected; locally, load from .env.local.

function getDb(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!url) {
    console.warn('[db] No DATABASE_URL or POSTGRES_URL found')
    // Return a no-op during build -- cast to match expected type
    return (async () => []) as unknown as NeonQueryFunction<false, false>
  }
  return neon(url)
}

// Lazy singleton
let _sql: NeonQueryFunction<false, false> | null = null

export function sql(): NeonQueryFunction<false, false> {
  if (!_sql) _sql = getDb()
  return _sql
}
