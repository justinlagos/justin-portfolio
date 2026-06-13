import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Allowed tables -- reject any table name not on this list
// ---------------------------------------------------------------------------
const ALLOWED_TABLES = new Set([
  'brands',
  'projects',
  'case_studies',
  'project_media',
  'pages',
  'site_settings',
  'social_links',
  'nav_items',
  'clients',
  'countries',
  'stats',
  'credentials',
  'products',
  'style_settings',
  'analytics_events',
])

// Tables that have a sort_order column (used for default ordering on GET)
const TABLES_WITH_SORT_ORDER = new Set([
  'brands',
  'projects',
  'project_media',
  'social_links',
  'nav_items',
  'clients',
  'countries',
  'stats',
  'credentials',
  'products',
])

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>

/** Only allow alphanumeric characters and underscores in column names. */
const COLUMN_NAME_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/

function isValidColumn(name: string): boolean {
  return COLUMN_NAME_RE.test(name)
}

/** Authenticate admin requests using an `admin_token` cookie. */
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const password = process.env.ADMIN_PASSWORD
  if (!password || !token) return false
  return token === password
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function badTable(table: string) {
  return NextResponse.json(
    { error: `Table "${table}" is not allowed` },
    { status: 400 },
  )
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

/** Run a parameterized query and return rows as a plain array of objects. */
async function query(queryStr: string, params: unknown[] = []): Promise<Row[]> {
  const db = sql()!
  const result = await db.query(queryStr, params)
  return result as Row[]
}

type Params = { params: Promise<{ table: string }> }

// ---------------------------------------------------------------------------
// GET -- list all rows
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) return unauthorized()

  const { table } = await params
  if (!ALLOWED_TABLES.has(table)) return badTable(table)

  try {
    const orderClause = TABLES_WITH_SORT_ORDER.has(table)
      ? 'ORDER BY sort_order ASC'
      : 'ORDER BY created_at DESC'

    const rows = await query(`SELECT * FROM ${table} ${orderClause}`)
    return NextResponse.json(rows)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[admin/${table}] GET error:`, err)
    return NextResponse.json(
      { error: 'Failed to fetch rows', detail: message },
      { status: 500 },
    )
  }
}

// ---------------------------------------------------------------------------
// POST -- insert a new row
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) return unauthorized()

  const { table } = await params
  if (!ALLOWED_TABLES.has(table)) return badTable(table)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  // Remove `id` if present -- let the database generate it
  delete body.id

  const columns = Object.keys(body)
  if (columns.length === 0) {
    return badRequest('No columns provided')
  }

  // Validate every column name
  for (const col of columns) {
    if (!isValidColumn(col)) {
      return badRequest(`Invalid column name: "${col}"`)
    }
  }

  try {
    const colList = columns.join(', ')
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ')
    const values = columns.map((c) => body[c])

    const rows = await query(
      `INSERT INTO ${table} (${colList}) VALUES (${placeholders}) RETURNING *`,
      values,
    )

    return NextResponse.json(rows[0], { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[admin/${table}] POST error:`, err)
    return NextResponse.json(
      { error: 'Failed to insert row', detail: message },
      { status: 500 },
    )
  }
}

// ---------------------------------------------------------------------------
// PUT -- update an existing row
// ---------------------------------------------------------------------------
export async function PUT(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) return unauthorized()

  const { table } = await params
  if (!ALLOWED_TABLES.has(table)) return badTable(table)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const { id, ...fields } = body
  if (!id) {
    return badRequest('Missing required field: id')
  }

  const columns = Object.keys(fields)
  if (columns.length === 0) {
    return badRequest('No fields to update')
  }

  // Validate every column name
  for (const col of columns) {
    if (!isValidColumn(col)) {
      return badRequest(`Invalid column name: "${col}"`)
    }
  }

  try {
    // Build SET clause: col1 = $1, col2 = $2, ...
    const setClauses = columns.map((col, i) => `${col} = $${i + 1}`)
    const values: unknown[] = columns.map((c) => fields[c])

    // id is the last parameter
    const idIndex = values.length + 1
    values.push(id)

    const rows = await query(
      `UPDATE ${table} SET ${setClauses.join(', ')} WHERE id = $${idIndex} RETURNING *`,
      values,
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Row not found' }, { status: 404 })
    }

    return NextResponse.json(rows[0])
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[admin/${table}] PUT error:`, err)
    return NextResponse.json(
      { error: 'Failed to update row', detail: message },
      { status: 500 },
    )
  }
}

// ---------------------------------------------------------------------------
// DELETE -- remove a row by id
// ---------------------------------------------------------------------------
export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAuthenticated(request)) return unauthorized()

  const { table } = await params
  if (!ALLOWED_TABLES.has(table)) return badTable(table)

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const { id } = body
  if (!id) {
    return badRequest('Missing required field: id')
  }

  try {
    const rows = await query(
      `DELETE FROM ${table} WHERE id = $1 RETURNING id`,
      [id],
    )

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Row not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, id: rows[0].id })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[admin/${table}] DELETE error:`, err)
    return NextResponse.json(
      { error: 'Failed to delete row', detail: message },
      { status: 500 },
    )
  }
}
