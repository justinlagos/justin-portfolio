'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project, Brand, ProjectMedia, CaseStudy, CaseStudyMetric } from '@/types'
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    brand_id: '',
    title: '',
    slug: '',
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
  const [caseStudyData, setCaseStudyData] = useState<Partial<CaseStudy>>({
    overview: '',
    context: '',
    objective: '',
    approach: '',
    execution: '',
    outcome: '',
    quote: '',
    quote_author: '',
    metrics: [],
  })
  const [mediaItems, setMediaItems] = useState<Partial<ProjectMedia>[]>([])
  const [newMedia, setNewMedia] = useState<Partial<ProjectMedia>>({
    image_url: '',
    caption: '',
    alt_text: '',
    is_cover: false,
    sort_order: 0,
  })
  const [servicesInput, setServicesInput] = useState('')

  useEffect(() => {
    fetchProjectsAndBrands()
  }, [])

  const fetchProjectsAndBrands = async () => {
    try {
      setLoading(true)
      setError('')
      const [projectsResult, brandsResult] = await Promise.all([
        supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabase
          .from('brands')
          .select('*')
          .order('sort_order', { ascending: true }),
      ])

      if (projectsResult.error) throw projectsResult.error
      if (brandsResult.error) throw brandsResult.error

      setProjects(projectsResult.data || [])
      setBrands(brandsResult.data || [])
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setError('Failed to load projects and brands')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCaseStudyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setCaseStudyData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMediaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (index !== undefined) {
      const updated = [...mediaItems]
      updated[index] = {
        ...updated[index],
        [name]:
          type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value,
      }
      setMediaItems(updated)
    } else {
      setNewMedia((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value,
      }))
    }
  }

  const addMetricRow = () => {
    setCaseStudyData((prev) => ({
      ...prev,
      metrics: [...(prev.metrics || []), { value: '', label: '' }],
    }))
  }

  const removeMetricRow = (index: number) => {
    setCaseStudyData((prev) => ({
      ...prev,
      metrics: (prev.metrics || []).filter((_, i) => i !== index),
    }))
  }

  const updateMetric = (
    index: number,
    field: 'value' | 'label',
    value: string
  ) => {
    setCaseStudyData((prev) => {
      const updated = [...(prev.metrics || [])]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, metrics: updated }
    })
  }

  const addMediaItem = () => {
    if (!newMedia.image_url) {
      setError('Image URL is required')
      return
    }
    setMediaItems((prev) => [
      ...prev,
      { ...newMedia, sort_order: prev.length },
    ])
    setNewMedia({
      image_url: '',
      caption: '',
      alt_text: '',
      is_cover: false,
      sort_order: 0,
    })
  }

  const removeMediaItem = (index: number) => {
    setMediaItems((prev) => prev.filter((_, i) => i !== index))
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

      if (!formData.brand_id || !formData.title || !formData.slug) {
        setError('Brand, title, and slug are required')
        return
      }

      const services = servicesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const projectPayload = {
        ...formData,
        services,
        updated_at: new Date().toISOString(),
      }

      let projectId = editingId

      if (editingId) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', editingId)

        if (updateError) throw updateError
        setSuccess('Project updated successfully')
      } else {
        const { data: insertedProject, error: insertError } = await supabase
          .from('projects')
          .insert([
            {
              ...projectPayload,
              created_at: new Date().toISOString(),
            },
          ])
          .select()

        if (insertError) throw insertError
        projectId = insertedProject?.[0]?.id
        setSuccess('Project created successfully')
      }

      // Handle case study
      if (formData.type === 'case-study' && projectId) {
        const caseStudyPayload = {
          ...caseStudyData,
          project_id: projectId,
          updated_at: new Date().toISOString(),
        }

        const { data: existingCaseStudy } = await supabase
          .from('case_studies')
          .select('id')
          .eq('project_id', projectId)
          .single()

        if (existingCaseStudy) {
          const { error: updateCaseError } = await supabase
            .from('case_studies')
            .update(caseStudyPayload)
            .eq('id', existingCaseStudy.id)

          if (updateCaseError) throw updateCaseError
        } else {
          const { error: insertCaseError } = await supabase
            .from('case_studies')
            .insert([
              {
                ...caseStudyPayload,
                created_at: new Date().toISOString(),
              },
            ])

          if (insertCaseError) throw insertCaseError
        }
      }

      // Handle media items
      if (projectId && mediaItems.length > 0) {
        for (const media of mediaItems) {
          if (!media.id) {
            const { error: mediaError } = await supabase
              .from('project_media')
              .insert([
                {
                  project_id: projectId,
                  image_url: media.image_url,
                  caption: media.caption || null,
                  alt_text: media.alt_text || null,
                  is_cover: media.is_cover || false,
                  sort_order: media.sort_order || 0,
                },
              ])

            if (mediaError) throw mediaError
          } else {
            const { error: mediaError } = await supabase
              .from('project_media')
              .update({
                caption: media.caption || null,
                alt_text: media.alt_text || null,
                is_cover: media.is_cover || false,
                sort_order: media.sort_order || 0,
              })
              .eq('id', media.id)

            if (mediaError) throw mediaError
          }
        }
      }

      resetForm()
      fetchProjectsAndBrands()
    } catch (err) {
      console.error('Failed to save project:', err)
      setError('Failed to save project')
    }
  }

  const handleEdit = async (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
    setServicesInput(
      Array.isArray(project.services) ? project.services.join(', ') : ''
    )

    // Fetch case study if exists
    if (project.type === 'case-study') {
      const { data: caseStudy } = await supabase
        .from('case_studies')
        .select('*')
        .eq('project_id', project.id)
        .single()

      if (caseStudy) {
        setCaseStudyData(caseStudy)
      }
    }

    // Fetch media items
    const { data: media } = await supabase
      .from('project_media')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true })

    if (media) {
      setMediaItems(media)
    }

    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This will also delete related data.')) return

    try {
      setError('')
      setSuccess('')

      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Project deleted successfully')
      fetchProjectsAndBrands()
    } catch (err) {
      console.error('Failed to delete project:', err)
      setError('Failed to delete project')
    }
  }

  const resetForm = () => {
    setFormData({
      brand_id: '',
      title: '',
      slug: '',
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
    setCaseStudyData({
      overview: '',
      context: '',
      objective: '',
      approach: '',
      execution: '',
      outcome: '',
      quote: '',
      quote_author: '',
      metrics: [],
    })
    setMediaItems([])
    setNewMedia({
      image_url: '',
      caption: '',
      alt_text: '',
      is_cover: false,
      sort_order: 0,
    })
    setServicesInput('')
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white-warm">Projects</h1>
          <p className="mt-2 text-ink-soft">Manage portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
        >
          <Plus size={20} />
          New Project
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
        <ProjectForm
          formData={formData}
          caseStudyData={caseStudyData}
          mediaItems={mediaItems}
          newMedia={newMedia}
          servicesInput={servicesInput}
          brands={brands}
          editingId={editingId}
          onInputChange={handleInputChange}
          onTitleChange={handleTitleChange}
          onCaseStudyChange={handleCaseStudyChange}
          onMediaChange={handleMediaChange}
          onAddMetric={addMetricRow}
          onRemoveMetric={removeMetricRow}
          onUpdateMetric={updateMetric}
          onAddMedia={addMediaItem}
          onRemoveMedia={removeMediaItem}
          onServicesChange={(e) => setServicesInput(e.target.value)}
          onMediaInputChange={(e) => setNewMedia((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-white-warm"></div>
            <p className="text-white-warm">Loading projects...</p>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-ink-soft bg-ink-muted p-12 text-center">
          <p className="text-ink-soft">No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-ink-soft">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-soft bg-ink-muted">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Brand
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white-warm">
                  Type
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
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-ink-soft last:border-0">
                  <td className="px-6 py-4 text-white-warm">{project.title}</td>
                  <td className="px-6 py-4 text-white-warm">
                    {brands.find((b) => b.id === project.brand_id)?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-ink-soft/30 px-3 py-1 text-xs font-medium text-ink-soft">
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.is_featured
                          ? 'bg-accent/20 text-accent-light'
                          : 'bg-ink-soft/30 text-ink-soft'
                      }`}
                    >
                      {project.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        project.is_visible
                          ? 'bg-green-500/20 text-green-200'
                          : 'bg-red-500/20 text-red-200'
                      }`}
                    >
                      {project.is_visible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white-warm">{project.sort_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-ink-soft/30 hover:text-white-warm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

function ProjectForm({
  formData,
  caseStudyData,
  mediaItems,
  newMedia,
  servicesInput,
  brands,
  editingId,
  onInputChange,
  onTitleChange,
  onCaseStudyChange,
  onMediaChange,
  onAddMetric,
  onRemoveMetric,
  onUpdateMetric,
  onAddMedia,
  onRemoveMedia,
  onServicesChange,
  onMediaInputChange,
  onSubmit,
  onCancel,
}: {
  formData: Partial<Project>
  caseStudyData: Partial<CaseStudy>
  mediaItems: Partial<ProjectMedia>[]
  newMedia: Partial<ProjectMedia>
  servicesInput: string
  brands: Brand[]
  editingId: string | null
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCaseStudyChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onMediaChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => void
  onAddMetric: () => void
  onRemoveMetric: (index: number) => void
  onUpdateMetric: (index: number, field: 'value' | 'label', value: string) => void
  onAddMedia: () => void
  onRemoveMedia: (index: number) => void
  onServicesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onMediaInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  const [showCaseStudy, setShowCaseStudy] = useState(formData.type === 'case-study')
  const [showMedia, setShowMedia] = useState(false)

  return (
    <div className="mb-8 rounded-lg border border-ink-soft bg-ink-muted p-6">
      <h2 className="mb-6 text-2xl font-bold text-white-warm">
        {editingId ? 'Edit Project' : 'Create New Project'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Basic Info */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white-warm">Basic Information</h3>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white-warm">
                  Brand
                </label>
                <select
                  name="brand_id"
                  value={formData.brand_id || ''}
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                <label className="mb-2 block text-sm font-medium text-white-warm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={onTitleChange}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="Project title"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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

              <div>
                <label className="mb-2 block text-sm font-medium text-white-warm">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type || 'gallery'}
                  onChange={(e) => {
                    onInputChange(e)
                    setShowCaseStudy(e.target.value === 'case-study')
                  }}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="gallery">Gallery</option>
                  <option value="case-study">Case Study</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white-warm">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year || ''}
                  onChange={onInputChange}
                  className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="2024"
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

            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                Summary
              </label>
              <textarea
                name="summary"
                value={formData.summary || ''}
                onChange={onInputChange}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Project summary"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white-warm">
                Services (comma-separated)
              </label>
              <textarea
                name="services"
                value={servicesInput}
                onChange={onServicesChange}
                className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                placeholder="Design, Development, Strategy"
                rows={2}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
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

        {/* Case Study */}
        {showCaseStudy && (
          <div className="border-t border-ink-soft pt-6">
            <button
              type="button"
              onClick={() => setShowCaseStudy(!showCaseStudy)}
              className="mb-4 flex items-center gap-2 text-lg font-semibold text-white-warm hover:text-accent-light"
            >
              {showCaseStudy ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              Case Study Details
            </button>

            {showCaseStudy && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Overview
                  </label>
                  <textarea
                    name="overview"
                    value={caseStudyData.overview || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Overview"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Context
                  </label>
                  <textarea
                    name="context"
                    value={caseStudyData.context || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Context"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Objective
                  </label>
                  <textarea
                    name="objective"
                    value={caseStudyData.objective || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Objective"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Approach
                  </label>
                  <textarea
                    name="approach"
                    value={caseStudyData.approach || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Approach"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Execution
                  </label>
                  <textarea
                    name="execution"
                    value={caseStudyData.execution || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Execution"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white-warm">
                    Outcome
                  </label>
                  <textarea
                    name="outcome"
                    value={caseStudyData.outcome || ''}
                    onChange={onCaseStudyChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Outcome"
                    rows={3}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white-warm">
                      Quote
                    </label>
                    <textarea
                      name="quote"
                      value={caseStudyData.quote || ''}
                      onChange={onCaseStudyChange}
                      className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Testimonial or quote"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-white-warm">
                      Quote Author
                    </label>
                    <input
                      type="text"
                      name="quote_author"
                      value={caseStudyData.quote_author || ''}
                      onChange={onCaseStudyChange}
                      className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                      placeholder="Author name"
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-medium text-white-warm">
                      Metrics
                    </label>
                    <button
                      type="button"
                      onClick={onAddMetric}
                      className="rounded-lg bg-accent/20 px-3 py-1 text-xs font-medium text-accent-light transition-colors hover:bg-accent/30"
                    >
                      Add Metric
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(caseStudyData.metrics || []).map((metric, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Value (e.g., 50%)"
                          value={metric.value || ''}
                          onChange={(e) => onUpdateMetric(index, 'value', e.target.value)}
                          className="flex-1 rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                        <input
                          type="text"
                          placeholder="Label (e.g., Increase)"
                          value={metric.label || ''}
                          onChange={(e) => onUpdateMetric(index, 'label', e.target.value)}
                          className="flex-1 rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveMetric(index)}
                          className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Media */}
        <div className="border-t border-ink-soft pt-6">
          <button
            type="button"
            onClick={() => setShowMedia(!showMedia)}
            className="mb-4 flex items-center gap-2 text-lg font-semibold text-white-warm hover:text-accent-light"
          >
            {showMedia ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            Media Management
          </button>

          {showMedia && (
            <div className="space-y-6">
              {/* Existing Media */}
              {mediaItems.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-white-warm">Existing Media</h4>
                  <div className="space-y-3">
                    {mediaItems.map((media, index) => (
                      <div key={index} className="rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
                        <div className="space-y-3">
                          <input
                            type="text"
                            name="image_url"
                            placeholder="Image URL"
                            value={media.image_url || ''}
                            onChange={(e) => onMediaChange(e, index)}
                            className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                          />
                          <textarea
                            name="caption"
                            placeholder="Caption (optional)"
                            value={media.caption || ''}
                            onChange={(e) => onMediaChange(e, index)}
                            className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            rows={2}
                          />
                          <input
                            type="text"
                            name="alt_text"
                            placeholder="Alt text (optional)"
                            value={media.alt_text || ''}
                            onChange={(e) => onMediaChange(e, index)}
                            className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                          />
                          <div className="flex items-center justify-between gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="is_cover"
                                checked={media.is_cover || false}
                                onChange={(e) => onMediaChange(e, index)}
                                className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
                              />
                              <span className="text-sm font-medium text-white-warm">
                                Cover Image
                              </span>
                            </label>
                            <input
                              type="number"
                              name="sort_order"
                              placeholder="Order"
                              value={media.sort_order || 0}
                              onChange={(e) => onMediaChange(e, index)}
                              className="w-24 rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                            <button
                              type="button"
                              onClick={() => onRemoveMedia(index)}
                              className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-500/20 hover:text-red-200"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Media */}
              <div>
                <h4 className="mb-3 font-semibold text-white-warm">Add New Media</h4>
                <div className="space-y-3 rounded-lg border border-ink-soft bg-ink-soft/30 p-4">
                  <input
                    type="text"
                    name="image_url"
                    placeholder="Image URL"
                    value={newMedia.image_url || ''}
                    onChange={onMediaInputChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  <textarea
                    name="caption"
                    placeholder="Caption (optional)"
                    value={newMedia.caption || ''}
                    onChange={onMediaInputChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    rows={2}
                  />
                  <input
                    type="text"
                    name="alt_text"
                    placeholder="Alt text (optional)"
                    value={newMedia.alt_text || ''}
                    onChange={onMediaInputChange}
                    className="w-full rounded-lg border border-ink-soft bg-ink-soft/30 px-4 py-2 text-white-warm placeholder-ink-soft transition-all focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_cover"
                      checked={newMedia.is_cover || false}
                      onChange={onMediaInputChange}
                      className="h-4 w-4 rounded border-ink-soft bg-ink-soft/30 text-accent"
                    />
                    <span className="text-sm font-medium text-white-warm">
                      Cover Image
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={onAddMedia}
                    className="rounded-lg bg-accent/20 px-4 py-2 font-medium text-accent-light transition-colors hover:bg-accent/30"
                  >
                    Add Media Item
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="border-t border-ink-soft pt-6 flex gap-4">
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-2 font-medium text-ink transition-colors hover:bg-accent-light"
          >
            {editingId ? 'Update Project' : 'Create Project'}
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
