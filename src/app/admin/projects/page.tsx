'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Brand, Project } from '@/types'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import FileUpload from '@/components/admin/FileUpload'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    brand_id: '',
    type: 'gallery',
    summary: '',
    year: new Date().getFullYear().toString(),
    services: [],
    featured_image: '',
    is_featured: false,
    is_visible: true,
    sort_order: 0,
    seo_title: '',
    seo_description: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*, brands(name)')
        .order('sort_order', { ascending: true })

      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*')
        .order('sort_order', { ascending: true })

      if (projectsError) throw projectsError
      if (brandsError) throw brandsError

      setProjects(projectsData || [])
      setBrands(brandsData || [])
    } catch (err) {
      console.error('Failed to load data:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as any
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'services'
          ? value.split(',').map((s: string) => s.trim())
          : value,
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      if (!formData.title || !formData.brand_id || !formData.summary) {
        setError('Title, brand, and summary are required')
        return
      }

      // Serialize services: store as comma-separated string for text column
      const servicesRaw = Array.isArray(formData.services)
        ? formData.services
        : typeof formData.services === 'string'
        ? (formData.services as string).split(',').map((s: string) => s.trim())
        : []
      const servicesStr = servicesRaw.filter(Boolean).join(', ')

      // Explicitly build payload — never spread full formData to avoid sending joined/extra fields
      const payload: Record<string, any> = {
        title: formData.title,
        slug: formData.slug,
        brand_id: formData.brand_id,
        type: formData.type,
        summary: formData.summary,
        year: formData.year,
        services: servicesStr,
        featured_image: formData.featured_image || null,
        is_featured: formData.is_featured || false,
        is_visible: formData.is_visible ?? true,
        sort_order: formData.sort_order || 0,
        seo_title: formData.seo_title || null,
        seo_description: formData.seo_description || null,
        updated_at: new Date().toISOString(),
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingId)

        if (updateError) throw updateError
        setSuccess('Project updated successfully')
      } else {
        const { error: insertError } = await supabase.from('projects').insert([
          {
            ...payload,
            created_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
        setSuccess('Project created successfully')
      }

      resetForm()
      loadData()
    } catch (err: any) {
      console.error('Failed to save project:', err)
      const msg = err?.message || err?.details || 'Unknown error'
      setError(`Failed to save project: ${msg}`)
    }
  }

  const handleEdit = (project: any) => {
    // Only copy fields that exist in our form — exclude id, timestamps, and joined relations
    const services = typeof project.services === 'string'
      ? project.services.split(',').map((s: string) => s.trim()).filter(Boolean)
      : Array.isArray(project.services)
      ? project.services
      : []
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      brand_id: project.brand_id || '',
      type: project.type || project.project_type || 'gallery',
      summary: project.summary || project.short_description || '',
      year: project.year || '',
      services,
      featured_image: project.featured_image || project.card_image || '',
      is_featured: project.is_featured || false,
      is_visible: project.is_visible ?? true,
      sort_order: project.sort_order || 0,
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || '',
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project? This will also permanently delete all media and case study content for this project. This cannot be undone.')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Project deleted successfully')
      loadData()
    } catch (err) {
      console.error('Failed to delete project:', err)
      setError('Failed to delete project')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      brand_id: '',
      type: 'gallery',
      summary: '',
      year: new Date().getFullYear().toString(),
      services: [],
      featured_image: '',
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
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
        >
          <Plus size={20} />
          Add Project
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
              {editingId ? 'Edit Project' : 'Create New Project'}
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
                  onChange={handleTitleChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Project title"
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

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Brand</label>
                <select
                  name="brand_id"
                  value={formData.brand_id || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  required
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Type</label>
                <select
                  name="type"
                  value={formData.type || 'gallery'}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                >
                  <option value="gallery">Gallery</option>
                  <option value="case-study">Case Study</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Year</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year || ''}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Services</label>
                <input
                  type="text"
                  name="services"
                  value={
                    Array.isArray(formData.services)
                      ? formData.services.join(', ')
                      : formData.services || ''
                  }
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Design, Development (comma-separated)"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Summary</label>
              <textarea
                name="summary"
                value={formData.summary || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Project summary"
                rows={3}
                required
              />
            </div>

            <div>
              <FileUpload
                value={formData.featured_image || ''}
                onChange={(url) => setFormData((prev) => ({ ...prev, featured_image: url }))}
                accept="image/*,video/*"
                folder="project-featured"
                label="Featured Image"
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
                {editingId ? 'Update Project' : 'Create Project'}
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
            <p className="text-white">Loading projects...</p>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-[#404040] bg-[#252525] p-12 text-center">
          <p className="text-[#888888]">No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#404040] bg-[#252525]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#404040] text-left text-sm font-medium text-[#888888]">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Visible</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[#404040] text-sm transition-colors hover:bg-[#2d2d2d] last:border-0"
                >
                  <td className="px-6 py-4 text-white">{project.title}</td>
                  <td className="px-6 py-4 text-white">{project.brands?.name || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#404040] px-3 py-1 text-xs font-medium text-[#888888]">
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.is_featured ? 'bg-[#C8622A]/20 text-[#C8622A]' : 'bg-[#404040] text-[#888888]'
                      }`}
                    >
                      {project.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.is_visible ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                      }`}
                    >
                      {project.is_visible ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{project.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
