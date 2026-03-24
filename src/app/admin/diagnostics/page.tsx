'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface TableCheck {
  name: string
  status: 'ok' | 'error' | 'pending'
  count: number | null
  error: string | null
}

interface StorageCheck {
  bucket: string
  status: 'ok' | 'error' | 'pending'
  error: string | null
}

interface AuthCheck {
  status: 'ok' | 'error' | 'pending'
  email: string | null
  error: string | null
}

interface EnvCheck {
  supabaseUrl: boolean
  supabaseKey: boolean
}

export default function DiagnosticsPage() {
  const [tables, setTables] = useState<TableCheck[]>([])
  const [storage, setStorage] = useState<StorageCheck | null>(null)
  const [auth, setAuth] = useState<AuthCheck>({ status: 'pending', email: null, error: null })
  const [env, setEnv] = useState<EnvCheck>({ supabaseUrl: false, supabaseKey: false })
  const [revalidateStatus, setRevalidateStatus] = useState<'idle' | 'testing' | 'ok' | 'error'>('idle')
  const [revalidateError, setRevalidateError] = useState('')
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

    // Check env vars
    setEnv({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })

    // Check auth
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        setAuth({ status: 'error', email: null, error: error.message })
      } else if (session) {
        setAuth({ status: 'ok', email: session.user.email || 'Unknown', error: null })
      } else {
        setAuth({ status: 'error', email: null, error: 'No active session' })
      }
    } catch (err: any) {
      setAuth({ status: 'error', email: null, error: err.message })
    }

    // Check tables
    const tableResults: TableCheck[] = []
    for (const tableName of TABLE_NAMES) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true })

        if (error) {
          tableResults.push({ name: tableName, status: 'error', count: null, error: error.message })
        } else {
          tableResults.push({ name: tableName, status: 'ok', count: count ?? 0, error: null })
        }
      } catch (err: any) {
        tableResults.push({ name: tableName, status: 'error', count: null, error: err.message })
      }
    }
    setTables(tableResults)

    // Check storage bucket
    try {
      const { data, error } = await supabase.storage.from('portfolio-images').list('', { limit: 1 })
      if (error) {
        setStorage({ bucket: 'portfolio-images', status: 'error', error: error.message })
      } else {
        setStorage({ bucket: 'portfolio-images', status: 'ok', error: null })
      }
    } catch (err: any) {
      setStorage({ bucket: 'portfolio-images', status: 'error', error: err.message })
    }

    // Test revalidation endpoint
    setRevalidateStatus('testing')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : {},
      })
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
          <p className="text-xs text-[#888888] mb-1">Database Tables</p>
          <p className={`text-2xl font-bold ${totalOk === totalTables ? 'text-green-400' : 'text-yellow-400'}`}>
            {totalOk}/{totalTables}
          </p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Storage</p>
          <p className={`text-2xl font-bold ${storage?.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
            {storage?.status === 'ok' ? 'OK' : storage?.status === 'error' ? 'Error' : '...'}
          </p>
        </div>
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-4">
          <p className="text-xs text-[#888888] mb-1">Auth</p>
          <p className={`text-2xl font-bold ${auth.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
            {auth.status === 'ok' ? 'OK' : auth.status === 'error' ? 'Error' : '...'}
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
            <StatusIcon status={env.supabaseUrl ? 'ok' : 'error'} />
            <span className="text-white text-sm">NEXT_PUBLIC_SUPABASE_URL</span>
            <span className={`text-xs ${env.supabaseUrl ? 'text-green-400' : 'text-red-400'}`}>
              {env.supabaseUrl ? 'Set' : 'Missing'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StatusIcon status={env.supabaseKey ? 'ok' : 'error'} />
            <span className="text-white text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            <span className={`text-xs ${env.supabaseKey ? 'text-green-400' : 'text-red-400'}`}>
              {env.supabaseKey ? 'Set' : 'Missing'}
            </span>
          </div>
        </div>
      </div>

      {/* Auth */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Authentication</h2>
        <div className="flex items-center gap-3">
          <StatusIcon status={auth.status} />
          <span className="text-white text-sm">
            {auth.status === 'ok' ? `Logged in as ${auth.email}` : auth.error || 'Checking...'}
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

      {/* Storage */}
      <div className="mb-6 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <h2 className="mb-4 text-lg font-bold text-white">Storage</h2>
        <div className="flex items-center gap-3">
          <StatusIcon status={storage?.status || 'pending'} />
          <span className="text-white text-sm">
            Bucket: portfolio-images
          </span>
          {storage?.error && (
            <span className="text-sm text-red-400 ml-2">{storage.error}</span>
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
            'Brands: Create → Edit → View on frontend → Delete',
            'Projects: Create under brand → Edit → View on frontend → Delete',
            'Media: Upload image → Set cover → View in gallery → Delete',
            'Case Studies: Select project → Fill sections → Save → View on frontend',
            'Stats: Create → Edit → View on homepage → Delete',
            'Clients: Create → Edit → View on homepage → Delete',
            'Credentials: Create → Edit → View on homepage → Delete',
            'Products: Create → Edit → View on homepage → Delete',
            'Social Links: Create → Edit → View in footer → Delete',
            'Pages: Edit about/contact content → View on frontend',
            'Site Settings: Add/edit key-value → Verify behavior',
            'Publish: Click Publish → Verify frontend updates',
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
