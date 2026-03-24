'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Brand } from '@/types'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import FileUpload from '@/components/admin/FileUpload'

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
    logo_url: '',
    is_featured: false,
    is_visible: true,
    sort_order: 0,
    seo_title: '',
    seo_description: '',
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
    if (!confirm('Delete this brand? This will also permanently delete all projects, media, and case studies under this brand. This cannot be undone.')) return

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
      logo_url: '',
      is_featured: false,
      is_visible: true,
      sort_order: 0,
      seo_title: '',
      seo_description: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Brands</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
        >
          <Plus size={20} />
          Add Brand
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
              {editingId ? 'Edit Brand' : 'Create New Brand'}
            </h2>
            <button
              onClick={resetForm}
              className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleNameChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Brand name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ''}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Auto-generated"
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Short description"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Long Description
              </label>
              <textarea
                name="long_description"
                value={formData.long_description || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Detailed description"
                rows={4}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Hero Color</label>
                <input
                  type="text"
                  name="hero_color"
                  value={formData.hero_color || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="e.g., #FF5733"
                />
              </div>

              <div>
                <FileUpload
                  value={formData.featured_image || ''}
                  onChange={(url) => setFormData((prev) => ({ ...prev, featured_image: url }))}
                  accept="image/*"
                  folder="brands"
                  label="Featured Image"
                />
              </div>
            </div>

            <div>
              <FileUpload
                value={formData.logo_url || ''}
                onChange={(url) => setFormData((prev) => ({ ...prev, logo_url: url }))}
                accept="image/*"
                folder="brand-logos"
                label="Brand Logo"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">SEO Title</label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="SEO title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  SEO Description
                </label>
                <input
                  type="text"
                  name="seo_description"
                  value={formData.seo_description || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="SEO description"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]"
                  />
                  <span className="text-sm font-medium text-white">Featured</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="is_visible"
                    checked={formData.is_visible || false}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]"
                  />
                  <span className="text-sm font-medium text-white">Visible</span>
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Sort Order</label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order || 0}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#C8622A] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
              >
                {editingId ? 'Update Brand' : 'Create Brand'}
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
            <p className="text-white">Loading brands...</p>
          </div>
        </div>
      ) : brands.length === 0 ? (
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-12 text-center">
          <p className="text-[#888888]">No brands yet. Create your first brand!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#404040] bg-[#252525]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040] text-left text-sm font-medium text-[#888888]">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Visible</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-[#404040] text-sm transition-colors hover:bg-[#2d2d2d] last:border-0"
                >
                  <td className="px-6 py-4 text-white">{brand.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        brand.is_featured ? 'bg-[#C8622A]/20 text-[#C8622A]' : 'bg-[#404040] text-[#888888]'
                      }`}
                    >
                      {brand.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        brand.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {brand.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{brand.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
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
