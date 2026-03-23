'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Stats {
  brands: number
  projects: number
  media: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    brands: 0,
    projects: 0,
    media: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError('')

        const [brandsData, projectsData, mediaData] = await Promise.all([
          supabase.from('brands').select('count', { count: 'exact' }),
          supabase.from('projects').select('count', { count: 'exact' }),
          supabase.from('project_media').select('count', { count: 'exact' }),
        ])

        setStats({
          brands: brandsData.count || 0,
          projects: projectsData.count || 0,
          media: mediaData.count || 0,
        })
      } catch (err) {
        console.error('Failed to fetch stats:', err)
        setError('Failed to load dashboard stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
          <p className="text-white-warm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white-warm">Dashboard</h1>
        <p className="mt-2 text-ink-soft">Welcome to your portfolio admin panel</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/20 px-6 py-4 text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Brands"
          count={stats.brands}
          icon="🎨"
          href="/admin/brands"
        />
        <StatCard
          title="Projects"
          count={stats.projects}
          icon="📁"
          href="/admin/projects"
        />
        <StatCard
          title="Media Items"
          count={stats.media}
          icon="🖼"
          href="/admin/projects"
        />
      </div>
    </div>
  )
}

function StatCard({
  title,
  count,
  icon,
  href,
}: {
  title: string
  count: number
  icon: string
  href: string
}) {
  return (
    <a
      href={href}
      className="rounded-lg border border-ink-soft bg-ink-muted p-6 transition-all hover:border-accent hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-soft">{title}</p>
          <p className="mt-2 text-5xl font-bold text-white-warm">{count}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </a>
  )
}
