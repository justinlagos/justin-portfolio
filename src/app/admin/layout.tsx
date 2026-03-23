'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Palette,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setIsLoggedIn(false)
      router.push('/admin')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink text-white-warm">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <div className="flex h-screen bg-ink text-white-warm">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden bg-ink-muted transition-all duration-300 ease-in-out`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="border-b border-ink-soft px-6 py-6">
            <h1 className="text-xl font-bold text-white-warm">Admin Panel</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            <NavLink
              href="/admin"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
            />
            <NavLink
              href="/admin/brands"
              icon={<Palette size={20} />}
              label="Brands"
            />
            <NavLink
              href="/admin/projects"
              icon={<FolderOpen size={20} />}
              label="Projects"
            />
            <NavLink
              href="/admin/pages"
              icon={<FileText size={20} />}
              label="Pages"
            />
            <NavLink
              href="/admin/settings"
              icon={<Settings size={20} />}
              label="Settings"
            />
          </nav>

          {/* Logout Button */}
          <div className="border-t border-ink-soft px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white-warm transition-colors hover:bg-ink-soft"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex items-center border-b border-ink-soft bg-ink-muted px-6 py-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-white-warm transition-colors hover:bg-ink-soft"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-ink p-6">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white-warm transition-colors hover:bg-ink-soft"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      router.push('/admin')
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-ink text-white-warm">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-ink-soft bg-ink-muted p-8">
          <h1 className="mb-6 text-3xl font-bold text-white-warm">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/20 px-4 py-3 text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent px-4 py-2 font-medium text-ink transition-colors hover:bg-accent-light disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
