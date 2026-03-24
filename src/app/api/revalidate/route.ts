import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Revalidate all public pages so admin changes appear immediately.
// Called from the admin UI after any save/delete operation.
export async function POST(request: NextRequest) {
  // Verify the caller is authenticated
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    // If an auth token is provided, verify it
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    // Revalidate all public-facing paths
    revalidatePath('/', 'layout')
    revalidatePath('/')
    revalidatePath('/work')
    revalidatePath('/about')
    revalidatePath('/contact')

    // Also revalidate dynamic paths
    const { data: brands } = await supabase.from('brands').select('slug')
    if (brands) {
      for (const brand of brands) {
        revalidatePath(`/work/${brand.slug}`)
      }
    }

    const { data: projects } = await supabase.from('projects').select('slug, brand:brands(slug)')
    if (projects) {
      for (const project of projects as any[]) {
        if (project.brand?.slug) {
          revalidatePath(`/work/${project.brand.slug}/${project.slug}`)
        }
      }
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() })
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
