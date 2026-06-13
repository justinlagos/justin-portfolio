import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, any> = {
    timestamp: new Date().toISOString(),
    database: {},
    tables: {},
  }

  const db = sql()

  // Test database connection
  try {
    await db`SELECT 1`
    checks.database = { ok: true }
  } catch (err: any) {
    checks.database = { ok: false, error: err.message }
    return NextResponse.json({ status: 'unhealthy', ...checks }, { status: 500 })
  }

  // Test database tables
  const tables = ['brands', 'projects', 'stats', 'clients', 'credentials', 'products', 'pages', 'nav_items', 'social_links']
  for (const table of tables) {
    try {
      const result = await db.query(`SELECT COUNT(*) as count FROM ${table}`)
      checks.tables[table] = { ok: true, count: Number((result as any[])[0]?.count ?? 0) }
    } catch (err: any) {
      checks.tables[table] = { error: err.message }
    }
  }

  const allOk = checks.database.ok && Object.values(checks.tables).every((t: any) => t.ok)

  return NextResponse.json({ status: allOk ? 'healthy' : 'degraded', ...checks }, { status: allOk ? 200 : 500 })
}
