'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, X } from 'lucide-react'

interface StyleSetting {
  id: string
  key: string
  value: string
}

export default function StyleControlsPage() {
  const [items, setItems] = useState<StyleSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingStates, setEditingStates] = useState<{ [key: string]: boolean }>({})
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('style_settings')
        .select('*')
        .order('key', { ascending: true })
      if (fetchError) throw fetchError
      setItems(data || [])
    } catch (err) {
      setError('Failed to load style settings')
    } finally {
      setLoading(false)
    }
  }

  const startEdit = (item: StyleSetting) => {
    setEditingStates((prev) => ({ ...prev, [item.id]: true }))
    setEditValues((prev) => ({ ...prev, [item.id]: item.value }))
  }

  const cancelEdit = (id: string) => {
    setEditingStates((prev) => ({ ...prev, [id]: false }))
    setEditValues((prev) => ({ ...prev, [id]: '' }))
  }

  const saveEdit = async (item: StyleSetting) => {
    const newValue = editValues[item.id]
    if (!newValue.trim()) {
      setError('Value cannot be empty')
      return
    }

    try {
      const { error: err } = await supabase
        .from('style_settings')
        .update({ value: newValue })
        .eq('id', item.id)
      if (err) throw err
      setSuccess('Updated')
      cancelEdit(item.id)
      loadItems()
    } catch (err) {
      setError('Failed to save')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const { error: err } = await supabase.from('style_settings').delete().eq('id', id)
      if (err) throw err
      setSuccess('Deleted')
      loadItems()
    } catch (err) {
      setError('Failed to delete')
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Style Controls</h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#C8622A] border-t-white"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-12 text-center">
          <p className="text-[#888888]">No style settings found. Create settings in the database.</p>
        </div>
      ) : (
        <div className="space-y-4 rounded-lg border border-[#404040] bg-[#252525] p-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-[#404040] pb-4 last:border-0">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-white">{item.key}</label>
                {editingStates[item.id] ? (
                  <input
                    type="text"
                    value={editValues[item.id]}
                    onChange={(e) =>
                      setEditValues((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  />
                ) : (
                  <p className="text-white">{item.value}</p>
                )}
              </div>

              <div className="flex gap-2">
                {editingStates[item.id] ? (
                  <>
                    <button
                      onClick={() => saveEdit(item)}
                      className="rounded-lg bg-[#C8622A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#d97535]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => cancelEdit(item.id)}
                      className="rounded-lg border border-[#404040] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-[#404040] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2d2d2d]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
