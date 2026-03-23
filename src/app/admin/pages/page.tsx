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
    setFormData(page)
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

      const pagePayload = {
        ...formData,
        content,
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
        const { error: insertError } = await supabase.from('pages').insert([
          {
            ...pagePayload,
            created_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
        setSuccess('Page created successfully')
      }

      resetForm()
      fetchPages()
    } catch (err) {
      console.error('Failed to save page:', err)
      setError('Failed to save page')
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
        <div>
          <h1 className="text-4xl font-bold text-white-warm">Pages</h1>
          <p className="mt-2 text-ink-soft">Manage page content</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
        >
          <Plus size={20} />
          New Page
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
        <PageForm
          formData={formData}
          contentFields={contentFields}
          editingId={editingId}
          onInputChange={handleInputChange}
          onContentFieldChange={handleContentFieldChange}
          onAddField={addContentField}
          onRemoveField={removeContentField}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
            <p className="text-white-warm">Loading pages...</p>
          </div>
        </div>
      ) : pages.length === 0 ? (
        <div className="rounded-lg border border-ink-soft bg-ink-muted p-12 text-center">
          <p className="text-ink-soft">No pages yet. Create your first page!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className="flex items-center justify-between rounded-lg border border-ink-soft bg-ink-muted p-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-white-warm">{page.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">/{page.slug}</p>
              </div>
              <button
                onClick={() => handleEdit(page)}
                className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
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

function PageForm({
  formData,
  contentFields,
  editingId,
  onInputChange,
  onContentFieldChange,
  onAddField,
  onRemoveField,
  onSubmit,
  onCancel,
}: {
  formData: Partial<Page>
  contentFields: Array<{ key: string; value: string }>
  editingId: string | null
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onContentFieldChange: (index: number, field: 'key' | 'value', value: string) => void
  onAddField: () => void
  onRemoveField: (index: number) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  return (
    <div className="mb-8 rounded-lg border border-ink-soft bg-ink-muted p-6">
      <h2 className="mb-6 text-2xl font-bold text-white-warm">
        {editingId ? 'Edit Page' : 'Create New Page'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white-warm">Basic Information</h3>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white-warm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="Page title"
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
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="page-slug"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="border-t border-ink-soft pt-6">
          <h3 className="mb-4 text-lg font-semibold text-white-warm">SEO</h3>
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                SEO Title
              </label>
              <input
                type="text"
                name="seo_title"
                value={formData.seo_title || ''}
                onChange={onInputChange}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="SEO title"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                SEO Description
              </label>
              <textarea
                name="seo_description"
                value={formData.seo_description || ''}
                onChange={onInputChange}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="SEO description"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Content Fields */}
        <div className="border-t border-ink-soft pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white-warm">Content Fields</h3>
            <button
              type="button"
              onClick={onAddField}
              className="rounded-lg bg-accent/20 px-3 py-1 text-xs font-medium text-accent-light transition-colors hover:bg-accent/30"
            >
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {contentFields.map((field, index) => (
              <div key={index} className="rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Field key (e.g., hero_title)"
                    value={field.key}
                    onChange={(e) => onContentFieldChange(index, 'key', e.target.value)}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  <textarea
                    placeholder="Field value"
                    value={field.value}
                    onChange={(e) => onContentFieldChange(index, 'value', e.target.value)}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onRemoveField(index)}
                      className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {contentFields.length === 0 && (
              <div className="rounded-lg border border-ink-soft bg-ink-soft/20 p-6 text-center">
                <p className="text-ink-soft">No content fields yet. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t border-ink-soft pt-6 flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
          >
            {editingId ? 'Update Page' : 'Create Page'}
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
