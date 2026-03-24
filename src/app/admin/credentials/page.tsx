'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Credential {
  id: string
  title: string
  description: string
  sort_order: number
}

export default function CredentialsPage() {
  const [items, setItems] = useState<Credential[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sort_order: 0,
  })

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('credentials')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError
      setItems(data || [])
    } catch (err) {
      console.error('Failed to load credentials:', err)
      setError('Failed to load credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sort_order' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!formData.title) {
        setError('Title is required')
        return
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('credentials')
          .update(formData)
          .eq('id', editingId)

        if (updateError) throw updateError
        setSuccess('Credential updated successfully')
      } else {
        const { error: insertError } = await supabase.from('credentials').insert([formData])

        if (insertError) throw insertError
        setSuccess('Credential created successfully')
      }

      resetForm()
      loadItems()
    } catch (err) {
      console.error('Failed to save credential:', err)
      setError('Failed to save credential')
    }
  }

  const handleEdit = (item: Credential) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      setError('')
      const { error: deleteError } = await supabase.from('credentials').delete().eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Credential deleted successfully')
      loadItems()
    } catch (err) {
      console.error('Failed to delete credential:', err)
      setError('Failed to delete credential')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      sort_order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Credentials</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
        >
          <Plus size={20} />
          Add Credential
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">
          {success}
        </div>
      )}

      {showForm && (
        <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Credential' : 'Create New Credential'}
            </h2>
            <button
              onClick={resetForm}
              className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Credential title"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Description"
                rows={3}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Sort Order</label>
              <input
                type="number"
                name="sort_order"
                value={formData.sort_order}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#C8622A] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-[#404040] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2d2d2d]"
              >
                Cancel
              </button>
            </div>
          </form>
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
          <p className="text-[#888888]">No credentials yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#404040] bg-[#252525]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040] text-left text-sm font-medium text-[#888888]">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#404040] text-sm transition-colors hover:bg-[#2d2d2d] last:border-0"
                >
                  <td className="px-6 py-4 text-white">{item.title}</td>
                  <td className="px-6 py-4 text-white">{item.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
