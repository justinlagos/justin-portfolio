'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Page } from '@/types'
import { Edit2, Plus, X } from 'lucide-react'

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: {},
    seo_title: '',
    seo_description: '',
  })
  const [contentFields, setContentFields] = useState<Array<{ key: string; value: string }>>([])

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('pages')
        .select('*')
        .order('slug', { ascending: true })

      if (fetchError) throw fetchError
      setPages(data || [])
    } catch (err) {
      console.error('Failed to fetch pages:', err)
      setError('Failed to load pages')
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
      [name]: value,
    }))
  }

  const handleContentFieldChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const updated = [...contentFields]
    updated[index] = { ...updated[index], [field]: value }
    setContentFields(updated)
  }

  const addContentField = () => {
    setContentFields((prev) => [...prev, { key: '', value: '' }])
  }

  const removeContentField = (index: number) => {
    setContentFields((prev) => prev.filter((_, i) => i !== index))
  }

  const handleEdit = (page: Page) => {
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      content: page.content || {},
      seo_title: page.seo_title || '',
      seo_description: page.seo_description || '',
    })
    setEditingId(page.id)

    const fields = Object.entries(page.content || {}).map(([key, value]) => ({
      key,
      value: value || '',
    }))
    setContentFields(fields)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!formData.title || !formData.slug) {
        setError('Title and slug are required')
        return
      }

      // Build content object from fields
      const content: Record<string, string> = {}
      contentFields.forEach(({ key, value }) => {
        if (key.trim()) {
          content[key.trim()] = value
        }
      })

      // Explicitly build payload — pages table has no created_at column
      const pagePayload: Record<string, any> = {
        title: formData.title,
        slug: formData.slug,
        content,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        updated_at: new Date().toISOString(),
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('pages')
          .update(pagePayload)
          .eq('id', editingId)

        if (updateError) throw updateError
        setSuccess('Page updated successfully')
      } else {
        const { error: insertError } = await supabase.from('pages').insert([pagePayload])

        if (insertError) throw insertError
        setSuccess('Page created successfully')
      }

      resetForm()
      fetchPages()
    } catch (err: any) {
      console.error('Failed to save page:', err)
      const msg = err?.message || err?.details || 'Unknown error'
      setError(`Failed to save page: ${msg}`)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: {},
      seo_title: '',
      seo_description: '',
    })
    setContentFields([])
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Pages</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
        >
          <Plus size={20} />
          New Page
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">{success}</div>
      )}

      {showForm && (
        <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Page' : 'Create New Page'}
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
                <label className="mb-2 block text-sm font-medium text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Page title"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="page-slug"
                  required
                />
              </div>
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
                <label className="mb-2 block text-sm font-medium text-white">SEO Description</label>
                <textarea
                  name="seo_description"
                  value={formData.seo_description || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="SEO description"
                  rows={2}
                />
              </div>
            </div>

            {/* Content Fields */}
            <div className="border-t border-[#404040] pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Content Fields</h3>
                <button
                  type="button"
                  onClick={addContentField}
                  className="flex items-center gap-1 rounded-lg bg-[#C8622A]/20 px-3 py-1 text-xs font-medium text-[#C8622A] transition-colors hover:bg-[#C8622A]/30"
                >
                  <Plus size={14} />
                  Add Field
                </button>
              </div>

              <div className="space-y-4">
                {contentFields.map((field, index) => (
                  <div key={index} className="rounded-lg border border-[#404040] bg-[#1a1a1a] p-4">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Field key (e.g., hero_title)"
                        value={field.key}
                        onChange={(e) => handleContentFieldChange(index, 'key', e.target.value)}
                        className="w-full rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                      />
                      <textarea
                        placeholder="Field value"
                        value={field.value}
                        onChange={(e) => handleContentFieldChange(index, 'value', e.target.value)}
                        className="w-full rounded-lg border border-[#404040] bg-[#252525] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                        rows={3}
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeContentField(index)}
                          className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {contentFields.length === 0 && (
                  <div className="rounded-lg border border-[#404040] bg-[#1a1a1a] p-6 text-center">
                    <p className="text-[#888888]">No content fields yet. Add one to get started.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#C8622A] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
              >
                {editingId ? 'Update Page' : 'Create Page'}
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
            <p className="text-white">Loading pages...</p>
          </div>
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-12 text-center">
          <p className="text-[#888888]">No pages yet. Create your first page!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between rounded-lg border border-[#404040] bg-[#252525] p-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{page.title}</h3>
                <p className="mt-1 text-sm text-[#888888]">/{page.slug}</p>
              </div>
              <button
                onClick={() => handleEdit(page)}
                className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
              >
                <Edit2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
