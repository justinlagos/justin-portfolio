'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project, ProjectMedia } from '@/types'
import { Plus, Trash2, X, Film, Image as ImageIcon, GripVertical } from 'lucide-react'
import FileUpload from '@/components/admin/FileUpload'

export default function MediaPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [mediaItems, setMediaItems] = useState<ProjectMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [formData, setFormData] = useState({
    image_url: '',
    video_url: '',
    media_type: 'image' as 'image' | 'video',
    caption: '',
    alt_text: '',
    is_cover: false,
    sort_order: 0,
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError('')
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('title', { ascending: true })

      if (fetchError) throw fetchError
      setProjects(data || [])
    } catch (err) {
      console.error('Failed to load projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const loadMedia = async (projectId: string) => {
    if (!projectId) {
      setMediaItems([])
      return
    }
    try {
      const { data, error: fetchError } = await supabase
        .from('project_media')
        .select('*')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: true })

      if (fetchError) throw fetchError
      setMediaItems(data || [])
    } catch (err) {
      console.error('Failed to load media:', err)
      setError('Failed to load media')
    }
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value
    setSelectedProjectId(projectId)
    loadMedia(projectId)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as any
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const isVideo = (url: string) => {
    return /\.(mp4|webm|mov|avi|mkv|ogg)$/i.test(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId) {
      setError('Please select a project first')
      return
    }

    const mediaUrl = mediaType === 'video' ? formData.video_url : formData.image_url
    if (!mediaUrl) {
      setError('Please upload or enter a file URL')
      return
    }

    try {
      setError('')
      setSuccess('')

      const nextOrder = mediaItems.length > 0
        ? Math.max(...mediaItems.map((m) => m.sort_order)) + 1
        : 0

      const { error: insertError } = await supabase.from('project_media').insert([
        {
          project_id: selectedProjectId,
          image_url: mediaUrl,
          caption: formData.caption,
          alt_text: formData.alt_text,
          is_cover: formData.is_cover,
          sort_order: nextOrder,
        },
      ])

      if (insertError) throw insertError
      setSuccess('Media added successfully')
      setFormData({
        image_url: '',
        video_url: '',
        media_type: 'image',
        caption: '',
        alt_text: '',
        is_cover: false,
        sort_order: 0,
      })
      setShowForm(false)
      loadMedia(selectedProjectId)
    } catch (err) {
      console.error('Failed to save media:', err)
      setError('Failed to save media')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const { error: deleteError } = await supabase
        .from('project_media')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Media deleted successfully')
      loadMedia(selectedProjectId)
    } catch (err) {
      console.error('Failed to delete media:', err)
      setError('Failed to delete media')
    }
  }

  const handleSetCover = async (id: string) => {
    try {
      // Unset all covers for this project
      await supabase
        .from('project_media')
        .update({ is_cover: false })
        .eq('project_id', selectedProjectId)

      // Set this one as cover
      const { error: updateError } = await supabase
        .from('project_media')
        .update({ is_cover: true })
        .eq('id', id)

      if (updateError) throw updateError
      setSuccess('Cover image updated')
      loadMedia(selectedProjectId)
    } catch (err) {
      setError('Failed to update cover')
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Project Media</h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">
          {success}
        </div>
      )}

      <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
        <label className="mb-4 block text-sm font-medium text-white">Select Project</label>
        <select
          value={selectedProjectId}
          onChange={handleProjectChange}
          className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none md:w-1/2"
        >
          <option value="">Choose a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {selectedProjectId && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Media Items ({mediaItems.length})
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 rounded-lg bg-[#C8622A] px-4 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
            >
              <Plus size={20} />
              Add Media
            </button>
          </div>

          {showForm && (
            <div className="mb-8 rounded-lg border border-[#404040] bg-[#252525] p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Add New Media</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Media Type Toggle */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-white">Media Type</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setMediaType('image')}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        mediaType === 'image'
                          ? 'bg-[#C8622A] text-white'
                          : 'border border-[#404040] text-[#888888] hover:bg-[#2d2d2d] hover:text-white'
                      }`}
                    >
                      <ImageIcon size={16} />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        mediaType === 'video'
                          ? 'bg-[#C8622A] text-white'
                          : 'border border-[#404040] text-[#888888] hover:bg-[#2d2d2d] hover:text-white'
                      }`}
                    >
                      <Film size={16} />
                      Video
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                {mediaType === 'image' ? (
                  <FileUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
                    accept="image/*"
                    folder="project-media"
                    label="Upload Image"
                  />
                ) : (
                  <FileUpload
                    value={formData.video_url}
                    onChange={(url) => setFormData((prev) => ({ ...prev, video_url: url }))}
                    accept="video/*"
                    folder="project-videos"
                    label="Upload Video"
                  />
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Caption</label>
                  <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                    placeholder="Image caption"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Alt Text</label>
                  <input
                    type="text"
                    name="alt_text"
                    value={formData.alt_text}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                    placeholder="Alt text for accessibility"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="is_cover"
                      checked={formData.is_cover}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#C8622A]"
                    />
                    <span className="text-sm font-medium text-white">Set as Cover Image</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#C8622A] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
                  >
                    Add Media
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-lg border border-[#404040] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2d2d2d]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {mediaItems.length === 0 ? (
            <div className="rounded-lg border border-[#404040] bg-[#252525] p-12 text-center">
              <p className="text-[#888888]">No media items yet. Upload images or videos for this project.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((media) => (
                <div
                  key={media.id}
                  className="group rounded-lg border border-[#404040] bg-[#252525] overflow-hidden"
                >
                  {/* Media Preview */}
                  <div className="relative aspect-video bg-[#1a1a1a]">
                    {media.image_url && isVideo(media.image_url) ? (
                      <video
                        src={media.image_url}
                        controls
                        className="h-full w-full object-contain"
                      />
                    ) : media.image_url ? (
                      <img
                        src={media.image_url}
                        alt={media.alt_text || 'Project media'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon size={32} className="text-[#404040]" />
                      </div>
                    )}

                    {/* Cover Badge */}
                    {media.is_cover && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#C8622A] px-3 py-1 text-xs font-medium text-white">
                        Cover
                      </span>
                    )}

                    {/* Type Badge */}
                    {media.image_url && isVideo(media.image_url) && (
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                        <Film size={12} />
                        Video
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="space-y-1 text-sm">
                      {media.caption && <p className="text-white line-clamp-2">{media.caption}</p>}
                      {media.alt_text && <p className="text-[#888888] text-xs">{media.alt_text}</p>}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {!media.is_cover && (
                        <button
                          onClick={() => handleSetCover(media.id)}
                          className="rounded-lg px-3 py-1 text-xs font-medium text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                        >
                          Set as Cover
                        </button>
                      )}
                      <div className="ml-auto">
                        <button
                          onClick={() => handleDelete(media.id)}
                          className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
