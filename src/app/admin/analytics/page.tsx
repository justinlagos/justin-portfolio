'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalEvents: 0,
    pageViews: 0,
    uniquePages: 0,
  })

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('analytics_events')
        .select('*')

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

      setStats({
        totalEvents: data?.length || 0,
        pageViews: data?.length || 0,
        uniquePages: new Set(data?.map((e: any) => e.page) || []).size,
      })
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#C8622A] border-t-white"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Analytics</h1>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
          <p className="mb-2 text-sm font-medium text-[#888888]">Total Events</p>
          <p className="text-4xl font-bold text-white">{stats.totalEvents}</p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
          <p className="mb-2 text-sm font-medium text-[#888888]">Page Views</p>
          <p className="text-4xl font-bold text-white">{stats.pageViews}</p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
          <p className="mb-2 text-sm font-medium text-[#888888]">Unique Pages</p>
          <p className="text-4xl font-bold text-white">{stats.uniquePages}</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">About Analytics</h2>
        <p className="text-white">
          Analytics tracking is configured in your Supabase database. Events are logged when users visit your site.
        </p>
      </div>
    </div>
  )
}
