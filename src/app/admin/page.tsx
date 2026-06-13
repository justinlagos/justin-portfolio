'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  totalProjects: number
  totalBrands: number
  publishedProjects: number
  totalViews: number
}

interface RecentProject {
  id: string
  title: string
  brand_name: string
  is_visible: boolean
  created_at: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalBrands: 0,
    publishedProjects: 0,
    totalViews: 0,
  })
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Fetch projects and brands from API
        const [projectsRes, brandsRes] = await Promise.all([
          fetch('/api/admin/projects'),
          fetch('/api/admin/brands'),
        ])

        const projects = projectsRes.ok ? await projectsRes.json() : []
        const brands = brandsRes.ok ? await brandsRes.json() : []

        const publishedCount = projects.filter((p: any) => p.is_visible).length

        setStats({
          totalProjects: projects.length,
          totalBrands: brands.length,
          publishedProjects: publishedCount,
          totalViews: 0,
        })

        // Build brand lookup map
        const brandMap = new Map<string, string>()
        for (const b of brands) {
          brandMap.set(b.id, b.name)
        }

        // Get 5 most recent projects
        const sorted = [...projects].sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        setRecentProjects(
          sorted.slice(0, 5).map((p: any) => ({
            id: p.id,
            title: p.title,
            brand_name: brandMap.get(p.brand_id) || 'Unknown',
            is_visible: p.is_visible,
            created_at: p.created_at,
          }))
        )
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <div className="text-white">Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.totalProjects} />
        <StatCard title="Total Brands" value={stats.totalBrands} />
        <StatCard title="Published Projects" value={stats.publishedProjects} />
        <StatCard title="Total Views" value={stats.totalViews} />
      </div>

      {/* Recent Projects Table */}
      <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">Recent Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040] text-left text-sm font-medium text-[#888888]">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[#404040] text-sm transition-colors hover:bg-[#2d2d2d]"
                >
                  <td className="px-4 py-3 text-white">{project.title}</td>
                  <td className="px-4 py-3 text-white">{project.brand_name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        project.is_visible
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-[#404040] text-[#888888]'
                      }`}
                    >
                      {project.is_visible ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#888888]">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
      <p className="mb-2 text-sm font-medium text-[#888888]">{title}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  )
}
