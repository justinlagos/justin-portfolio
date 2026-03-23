'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Brand } from '@/types'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Brand>>({
    name: '',
    description: '',
    long_description: '',
    hero_color: '',
    featured_image: '',
    is_featured: false,
    is_visible: true,
    sort_order: 0,
  })

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('brands')
        .select('*')
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError
      setBrands(data || [])
    } catch (err) {
      console.error('Failed to fetch brands:', err)
      setError('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!formData.name || !formData.slug || !formData.description) {
        setError('Name, slug, and description are required')
        return
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('brands')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId)

        if (updateError) throw updateError
        setSuccess('Brand updated successfully')
      } else {
        const { error: insertError } = await supabase.from('brands').insert([
          {
            ...formData,
            slug: formData.slug,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
        setSuccess('Brand created successfully')
      }

      resetForm()
      fetchBrands()
    } catch (err) {
      console.error('Failed to save brand:', err)
      setError('Failed to save brand')
    }
  }

  const handleEdit = (brand: Brand) => {
    setFormData(brand)
    setEditingId(brand.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand?')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('brands')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Brand deleted successfully')
      fetchBrands()
    } catch (err) {
      console.error('Failed to delete brand:', err)
      setError('Failed to delete brand')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      long_description: '',
      hero_color: '',
      featured_image: '',
      is_featured: false,
      is_visible: true,
      sort_order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white-warm">Brands</h1>
          <p className="mt-2 text-ink-soft">Manage portfolio brands</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
        >
          <Plus size={20} />
          New Brand
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/20 px-6 py-4 text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-500/20 px-6 py-4 text-green-200">
          {success}
        </div>
      )}

      {showForm && (
        <BrandForm
          formData={formData}
          editingId={editingId}
          onInputChange={handleInputChange}
          onNameChange={handleNameChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
            <p className="text-white-warm">Loading brands...</p>
          </div>
        </div>
      ) : brands.length === 0 ? (
        <div className="rounded-lg border border-ink-soft bg-ink-muted p-12 text-center">
          <p className="text-ink-soft">No brands yet. Create your first brand!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-ink-soft">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-soft bg-ink-muted">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Featured
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Visible
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Order
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-b border-ink-soft last:border-0">
                  <td className="px-6 py-4 text-white-warm">{brand.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        brand.is_featured
                          ? 'bg-accent/20 text-accent-light'
                          : 'bg-ink-soft/30 text-ink-soft'
                      }`}
                    >
                      {brand.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        brand.is_visible
                          ? 'bg-green-500/20 text-green-200'
                          : 'bg-red-500/20 text-red-200'
                      }`}
                    >
                      {brand.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white-warm">{brand.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
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

function BrandForm({
  formData,
  editingId,
  onInputChange,
  onNameChange,
  onSubmit,
  onCancel,
}: {
  formData: Partial<Brand>
  editingId: string | null
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  return (
    <div className="mb-8 rounded-lg border border-ink-soft bg-ink-muted p-6">
      <h2 className="mb-6 text-2xl font-bold text-white-warm">
        {editingId ? 'Edit Brand' : 'Create New Brand'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white-warm">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={onNameChange}
              className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="Brand name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white-warm">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ''}
              className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="Auto-generated"
              disabled
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white-warm">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={onInputChange}
            className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Short description"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white-warm">
            Long Description
          </label>
          <textarea
            name="long_description"
            value={formData.long_description || ''}
            onChange={onInputChange}
            className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            placeholder="Detailed description"
            rows={4}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white-warm">
              Hero Color
            </label>
            <input
              type="text"
              name="hero_color"
              value={formData.hero_color || ''}
              onChange={onInputChange}
              className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="e.g., #FF5733"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white-warm">
              Featured Image URL
            </label>
            <input
              type="text"
              name="featured_image"
              value={formData.featured_image || ''}
              onChange={onInputChange}
              className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured || false}
                onChange={onInputChange}
                className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
              />
              <span className="text-sm font-medium text-white-warm">
                Featured
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_visible"
                checked={formData.is_visible || false}
                onChange={onInputChange}
                className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
              />
              <span className="text-sm font-medium text-white-warm">
                Visible
              </span>
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white-warm">
              Sort Order
            </label>
            <input
              type="number"
              name="sort_order"
              value={formData.sort_order || 0}
              onChange={onInputChange}
              className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
          >
            {editingId ? 'Update Brand' : 'Create Brand'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-ink-soft px-6 py-2 font-medium text-white-warm transition-colors hover:bg-ink-soft/30"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
