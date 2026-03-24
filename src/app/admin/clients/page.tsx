'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import FileUpload from '@/components/admin/FileUpload'

interface Client {
  id: string
  name: string
  logo_url: string | null
  url: string | null
  sort_order: number
  is_visible: boolean
}

export default function ClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    url: '',
    sort_order: 0,
    is_visible: true,
  })

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('clients')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError
      setItems(data || [])
    } catch (err) {
      console.error('Failed to load clients:', err)
      setError('Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'sort_order'
          ? parseInt(value)
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      setError('Name is required')
      return
    }

    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from('clients')
          .update(formData)
          .eq('id', editingId)
        if (updateError) throw updateError
        setSuccess('Client updated successfully')
      } else {
        const { error: insertError } = await supabase.from('clients').insert([formData])
        if (insertError) throw insertError
        setSuccess('Client created successfully')
      }
      resetForm()
      loadItems()
    } catch (err) {
      console.error('Failed to save client:', err)
      setError('Failed to save client')
    }
  }

  const handleEdit = (item: Client) => {
    setFormData({
      name: item.name,
      logo_url: item.logo_url || '',
      url: item.url || '',
      sort_order: item.sort_order,
      is_visible: item.is_visible,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const { error: deleteError } = await supabase.from('clients').delete().eq('id', id)
      if (deleteError) throw deleteError
      setSuccess('Client deleted successfully')
      loadItems()
    } catch (err) {
      setError('Failed to delete client')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', logo_url: '', url: '', sort_order: 0, is_visible: true })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
        >
          <Plus size={20} />
          Add Client
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
              {editingId ? 'Edit Client' : 'Create New Client'}
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
              <label className="mb-2 block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Client name"
                required
              />
            </div>

            <div>
              <FileUpload
                value={formData.logo_url}
                onChange={(url) => setFormData((prev) => ({ ...prev, logo_url: url }))}
                accept="image/*"
                folder="client-logos"
                label="Client Logo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Website URL</label>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_visible"
                    checked={formData.is_visible}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]"
                  />
                  <span className="text-sm font-medium text-white">Visible</span>
                </label>
              </div>
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
          <p className="text-[#888888]">No clients yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#404040] bg-[#252525]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040] text-left text-sm font-medium text-[#888888]">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Visible</th>
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
                  <td className="px-6 py-4 text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {item.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
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
