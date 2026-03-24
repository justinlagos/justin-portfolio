import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, any> = {
    timestamp: new Date().toISOString(),
    env: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    tables: {},
    storage: {},
  }

  // Test database tables
  const tables = ['brands', 'projects', 'stats', 'clients', 'credentials', 'products', 'pages', 'nav_items', 'social_links']
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('id', { count: 'exact', head: true })
    checks.tables[table] = error ? { error: error.message } : { ok: true }
  }

  // Test storage bucket
  const { data: bucketData, error: bucketError } = await supabase.storage.from('portfolio-images').list('', { limit: 1 })
  checks.storage['portfolio-images'] = bucketError ? { error: bucketError.message } : { ok: true, files: bucketData?.length ?? 0 }

  const allOk = Object.values(checks.tables).every((t: any) => t.ok) && checks.storage['portfolio-images']?.ok

  return NextResponse.json({ status: allOk ? 'healthy' : 'degraded', ...checks }, { status: allOk ? 200 : 500 })
}
