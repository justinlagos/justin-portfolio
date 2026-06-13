'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface TableCheck {
  name: string
  status: 'ok' | 'error' | 'pending'
  count: number | null
  error: string | null
}

export default function DiagnosticsPage() {
  const [tables, setTables] = useState<TableCheck[]>([])
  const [dbStatus, setDbStatus] = useState<'pending' | 'ok' | 'error'>('pending')
  const [dbError, setDbError] = useState('')
  const [authStatus, setAuthStatus] = useState<'pending' | 'ok' | 'error'>('pending')
  const [revalidateStatus, setRevalidateStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle')
  const [revalidateError, setRevalidateError] = useState('')
  const [envCheck, setEnvCheck] = useState({ databaseUrl: false })
  const [running, setRunning] = useState(false)

  const TABLE_NAMES = [
    'brands',
    'projects',
    'project_media',
    'case_studies',
    'pages',
    'stats',
    'clients',
    'credentials',
    'products',
    'social_links',
    'site_settings',
    'style_settings',
    'nav_items',
    'countries',
  ]

  const runDiagnostics = async () => {
    setRunning(true)

    // Check auth status
    try {
      const authRes = await fetch('/api/admin/auth')
      const authData = await authRes.json()
      setAuthStatus(authData.authenticated ? 'ok' : 'error')
    } catch {
      setAuthStatus('error')
    }

    // Check database connection via health endpoint
    try {
      const healthRes = await fetch('/api/health')
      const healthData = await healthRes.json()
      if (healthData.status === 'healthy') {
        setDbStatus('ok')
        setEnvCheck({ databaseUrl: true })
      } else {
        setDbStatus('error')
        setDbError('Database health check returned degraded status')
        setEnvCheck({ databaseUrl: true })
      }
    } catch (err: any) {
      setDbStatus('error')
      setDbError(err.message || 'Failed to reach health endpoint')
      setEnvCheck({ databaseUrl: false })
    }

    // Check tables via admin API
    const tableResults: TableCheck[] = []
    for (const tableName of TABLE_NAMES) {
      try {
        const res = await fetch(`/api/admin/${tableName}`)
        if (!res.ok) {
          tableResults.push({ name: tableName, status: 'error', count: null, error: `HTTP ${res.status}` })
        } else {
          const data = await res.json()
          tableResults.push({ name: tableName, status: 'ok', count: Array.isArray(data) ? data.length : 0, error: null })
        }
      } catch (err: any) {
        tableResults.push({ name: tableName, status: 'error', count: null, error: err.message })
      }
    }
    setTables(tableResults)

    // Test revalidation endpoint
    setRevalidateStatus('testing')
    try {
      const res = await fetch('/api/revalidate', { method: 'POST' })
      if (res.ok) {
        setRevalidateStatus('ok')
        setRevalidateError('')
      } else {
        const body = await res.json().catch(() => ({}))
        setRevalidateStatus('error')
        setRevalidateError(body.error || `HTTP ${res.status}`)
      }
    } catch (err: any) {
      setRevalidateStatus('error')
      setRevalidateError(err.message)
    }

    setRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const StatusIcon = ({ status }: { status: 'ok' | 'error' | 'pending' | string }) => {
    if (status === 'ok') return <CheckCircle size={18} className="text-green-400" />
    if (status === 'error') return <XCircle size={18} className="text-red-400" />
    return <AlertCircle size={18} className="text-yellow-400" />
  }

  const totalOk = tables.filter((t) => t.status === 'ok').length
  const totalTables = tables.length

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">System Diagnostics</h1>
        <button
          onClick={runDiagnostics}
          disabled={running}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535] disabled:opacity-50"
        >
          <RefreshCw size={18} className={running ? 'animate-spin' : ''} />
          {running ? 'Running...' : 'Re-run Diagnostics'}
        </button>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Database</p>
          <p className={`text-2xl font-bold ${dbStatus === 'ok' ? 'text-green-400' : dbStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
            {dbStatus === 'ok' ? 'OK' : dbStatus === 'error' ? 'Error' : '...'}
          </p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Tables</p>
          <p className={`text-2xl font-bold ${totalOk === totalTables && totalTables > 0 ? 'text-green-400' : 'text-yellow-400'}`}>
            {totalOk}/{totalTables}
          </p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Auth</p>
          <p className={`text-2xl font-bold ${authStatus === 'ok' ? 'text-green-400' : authStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
            {authStatus === 'ok' ? 'OK' : authStatus === 'error' ? 'Error' : '...'}
          </p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Revalidation</p>
          <p className={`text-2xl font-bold ${revalidateStatus === 'ok' ? 'text-green-400' : revalidateStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}`}>
            {revalidateStatus === 'ok' ? 'OK' : revalidateStatus === 'error' ? 'Error' : revalidateStatus === 'testing' ? '...' : 'Idle'}
          </p>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Environment</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <StatusIcon status={envCheck.databaseUrl ? 'ok' : 'error'} />
            <span className="text-white text-sm">DATABASE_URL (Neon Postgres)</span>
            <span className={`text-xs ${envCheck.databaseUrl ? 'text-green-400' : 'text-red-400'}`}>
              {envCheck.databaseUrl ? 'Connected' : 'Not reachable'}
            </span>
          </div>
        </div>
      </div>

      {/* Auth */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Authentication</h2>
        <div className="flex items-center gap-3">
          <StatusIcon status={authStatus} />
          <span className="text-white text-sm">
            {authStatus === 'ok' ? 'Authenticated via admin_token cookie' : authStatus === 'error' ? 'Not authenticated' : 'Checking...'}
          </span>
        </div>
      </div>

      {/* Database Tables */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Database Tables</h2>
        <div className="space-y-2">
          {tables.length === 0 ? (
            <p className="text-[#888888] text-sm">Running checks...</p>
          ) : (
            tables.map((table) => (
              <div key={table.name} className="flex items-center justify-between py-2 border-b border-[#404040] last:border-0">
                <div className="flex items-center gap-3">
                  <StatusIcon status={table.status} />
                  <span className="text-white text-sm font-mono">{table.name}</span>
                </div>
                <div className="text-right">
                  {table.status === 'ok' ? (
                    <span className="text-sm text-[#888888]">{table.count} rows</span>
                  ) : (
                    <span className="text-sm text-red-400">{table.error}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Revalidation */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Revalidation API</h2>
        <div className="flex items-center gap-3">
          <StatusIcon status={revalidateStatus === 'ok' ? 'ok' : revalidateStatus === 'error' ? 'error' : 'pending'} />
          <span className="text-white text-sm">
            POST /api/revalidate
          </span>
          {revalidateError && (
            <span className="text-sm text-red-400 ml-2">{revalidateError}</span>
          )}
        </div>
      </div>

      {/* CRUD Test Guide */}
      <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">CRUD Quick Test</h2>
        <p className="text-sm text-[#888888] mb-4">
          Use the checklist below to verify each admin flow manually:
        </p>
        <div className="space-y-2 text-sm text-white">
          {[
            'Brands: Create -> Edit -> View on frontend -> Delete',
            'Projects: Create under brand -> Edit -> View on frontend -> Delete',
            'Media: Upload image -> Set cover -> View in gallery -> Delete',
            'Case Studies: Select project -> Fill sections -> Save -> View on frontend',
            'Stats: Create -> Edit -> View on homepage -> Delete',
            'Clients: Create -> Edit -> View on homepage -> Delete',
            'Credentials: Create -> Edit -> View on homepage -> Delete',
            'Products: Create -> Edit -> View on homepage -> Delete',
            'Social Links: Create -> Edit -> View in footer -> Delete',
            'Pages: Edit about/contact content -> View on frontend',
            'Site Settings: Add/edit key-value -> Verify behavior',
            'Publish: Click Publish -> Verify frontend updates',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-1">
              <span className="text-[#888888] select-none">{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
