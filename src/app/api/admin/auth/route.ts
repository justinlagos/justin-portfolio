import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

const COOKIE_NAME = 'admin_token'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Server misconfigured: no admin password set' },
        { status: 500 },
      )
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 },
      )
    }

    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  const adminPassword = process.env.ADMIN_PASSWORD

  const authenticated = !!(adminPassword && token && token === adminPassword)
  return NextResponse.json({ authenticated })
}
