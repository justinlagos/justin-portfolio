'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Palette,
  FolderOpen,
  Image,
  BookOpen,
  FileText,
  Lock,
  ShoppingCart,
  Users,
  Globe,
  BarChart3,
  Share2,
  Sliders,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Stethoscope,
} from 'lucide-react'

interface NavItemConfig {
  href: string
  icon: React.ReactNode
  label: string
}

const navItems: NavItemConfig[] = [
  { href: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/admin/brands', icon: <Palette size={18} />, label: 'Brands' },
  { href: '/admin/projects', icon: <FolderOpen size={18} />, label: 'Projects' },
  { href: '/admin/media', icon: <Image size={18} />, label: 'Project Media' },
  { href: '/admin/case-studies', icon: <BookOpen size={18} />, label: 'Case Studies' },
  { href: '/admin/pages', icon: <FileText size={18} />, label: 'Pages' },
  { href: '/admin/credentials', icon: <Lock size={18} />, label: 'Credentials' },
  { href: '/admin/products', icon: <ShoppingCart size={18} />, label: 'Products' },
  { href: '/admin/clients', icon: <Users size={18} />, label: 'Clients' },
  { href: '/admin/countries', icon: <Globe size={18} />, label: 'Countries' },
  { href: '/admin/stats', icon: <BarChart3 size={18} />, label: 'Stats' },
  { href: '/admin/social-links', icon: <Share2 size={18} />, label: 'Social Links' },
  { href: '/admin/style-controls', icon: <Sliders size={18} />, label: 'Style Controls' },
  { href: '/admin/site-settings', icon: <Settings size={18} />, label: 'Site Settings' },
  { href: '/admin/analytics', icon: <BarChart3 size={18} />, label: 'Analytics' },
  { href: '/admin/diagnostics', icon: <Stethoscope size={18} />, label: 'Diagnostics' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState('Dashboard')
  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setIsLoggedIn(!!session)
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  useEffect(() => {
    const currentNav = navItems.find((item) => item.href === pathname)
    if (currentNav) {
      setPageTitle(currentNav.label)
    }
    // Close sidebar on route change (mobile)
    setSidebarOpen(false)
  }, [pathname])

  const handlePublish = async () => {
    try {
      setPublishing(true)
      setPublishMessage('')
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : {},
      })
      if (res.ok) {
        setPublishMessage('Published! Changes are now live.')
      } else {
        setPublishMessage('Publish failed. Try again.')
      }
    } catch {
      setPublishMessage('Publish failed. Try again.')
    } finally {
      setPublishing(false)
      setTimeout(() => setPublishMessage(''), 4000)
    }
  }

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
      <div className="fixed inset-0 z-[9999] flex h-screen items-center justify-center bg-[#1a1a1a] text-white">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#C8622A] border-t-white"></div>
          <p className="text-sm text-[#888888]">Loading admin...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen bg-[#1a1a1a] text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[250px] flex-shrink-0 overflow-y-auto border-r border-[#404040] bg-[#252525] transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-[#404040] px-6 py-5">
            <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded p-1 text-[#888888] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-0.5 px-3 py-4 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink key={item.href} isActive={pathname === item.href} {...item} />
            ))}
          </nav>

          {/* Logout Button */}
          <div className="border-t border-[#404040] px-3 py-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#404040] bg-[#252525] px-4 md:px-8 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden rounded p-2 text-[#888888] hover:bg-[#2d2d2d] hover:text-white"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-white truncate">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            {publishMessage && (
              <span className={`text-xs font-medium ${publishMessage.includes('live') ? 'text-green-400' : 'text-red-400'}`}>
                {publishMessage}
              </span>
            )}
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {publishing ? 'Publishing...' : 'Publish'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#404040] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]"
            >
              <span className="hidden sm:inline">View Site</span>
              <ExternalLink size={14} />
            </a>
            <button
              onClick={handleLogout}
              className="hidden md:block rounded-lg bg-[#C8622A] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#d97535]"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-[#1a1a1a] p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  href,
  icon,
  label,
  isActive,
}: NavItemConfig & { isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[#C8622A]/15 text-[#C8622A] border-l-2 border-[#C8622A]'
          : 'text-[#aaaaaa] hover:bg-[#2d2d2d] hover:text-white'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
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
        if (signInError.message.includes('Invalid login')) {
          setError('Incorrect email or password. Please try again.')
        } else {
          setError(signInError.message)
        }
        setLoading(false)
        return
      }

      router.push('/admin')
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen items-center justify-center bg-[#1a1a1a] text-white px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-8">
          <h1 className="mb-2 text-2xl font-bold text-white">Admin Login</h1>
          <p className="mb-6 text-sm text-[#888888]">Sign in to manage your portfolio</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2.5 text-white placeholder-[#666666] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="you@example.com"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2.5 text-white placeholder-[#666666] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Password"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-600/15 border border-red-600/30 px-4 py-3 text-sm text-red-400">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#C8622A] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#d97535] disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
