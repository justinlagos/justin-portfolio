import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return !!token && token === process.env.ADMIN_PASSWORD
}

// Revalidate all public pages so admin changes appear immediately.
// Called from the admin UI after any save/delete operation.
export async function POST(request: NextRequest) {
  // Verify the caller is authenticated via cookie
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = sql()

    // Revalidate all public-facing paths
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/work')
    revalidatePath('/about')
    revalidatePath('/contact')

    // Also revalidate dynamic paths
    const brands = await db`SELECT slug FROM brands`
    if (brands) {
      for (const brand of brands) {
        revalidatePath(`/work/${brand.slug}`)
      }
    }

    const projects = await db`SELECT p.slug AS project_slug, b.slug AS brand_slug FROM projects p LEFT JOIN brands b ON p.brand_id = b.id`
    if (projects) {
      for (const project of projects) {
        if (project.brand_slug) {
          revalidatePath(`/work/${project.brand_slug}/${project.project_slug}`)
        }
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
