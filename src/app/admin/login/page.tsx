'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Invalid password')
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
          <h1 className="mb-2 font-serif text-2xl font-bold text-white">Admin Login</h1>
          <p className="mb-6 text-sm text-[#888888]">Sign in to manage your portfolio</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                value="admin@justinukaegbu.com"
                readOnly
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2.5 text-[#888888] transition-all focus:outline-none cursor-not-allowed"
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
                autoFocus
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-600/15 border border-red-600/30 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
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
