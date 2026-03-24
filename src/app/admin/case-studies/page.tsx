'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/types'
import { Plus, Trash2, X } from 'lucide-react'

interface Metric {
  value: string
  label: string
}

export default function CaseStudiesPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [formData, setFormData] = useState({
    overview: '',
    context: '',
    objective: '',
    approach: '',
    execution: '',
    outcome: '',
    quote: '',
    quote_author: '',
    metrics: [] as Metric[],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
        .eq('type', 'case-study')
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

  const loadCaseStudy = async (projectId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('project_id', projectId)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError

      if (data) {
        setFormData({
          overview: data.overview || '',
          context: data.context || '',
          objective: data.objective || '',
          approach: data.approach || '',
          execution: data.execution || '',
          outcome: data.outcome || '',
          quote: data.quote || '',
          quote_author: data.quote_author || '',
          metrics: data.metrics || [],
        })
      } else {
        resetForm()
      }
    } catch (err) {
      console.error('Failed to load case study:', err)
      setError('Failed to load case study')
    }
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const projectId = e.target.value
    setSelectedProjectId(projectId)
    if (projectId) loadCaseStudy(projectId)
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

  const handleMetricChange = (index: number, field: 'value' | 'label', value: string) => {
    const updatedMetrics = [...formData.metrics]
    updatedMetrics[index][field] = value
    setFormData((prev) => ({
      ...prev,
      metrics: updatedMetrics,
    }))
  }

  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { value: '', label: '' }],
    }))
  }

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProjectId) {
      setError('Please select a project')
      return
    }

    try {
      setError('')
      setSuccess('')

      const { data: existing } = await supabase
        .from('case_studies')
        .select('id')
        .eq('project_id', selectedProjectId)
        .single()

      if (existing) {
        const { error: updateError } = await supabase
          .from('case_studies')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)

        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('case_studies').insert([
          {
            project_id: selectedProjectId,
            ...formData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])

        if (insertError) throw insertError
      }

      setSuccess('Case study saved successfully')
    } catch (err) {
      console.error('Failed to save case study:', err)
      setError('Failed to save case study')
    }
  }

  const resetForm = () => {
    setFormData({
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
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-white">Case Studies</h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 px-6 py-4 text-red-400">{error}</div>
      )}

      {success && (
        <div className="mb-6 rounded-lg bg-green-600/20 px-6 py-4 text-green-400">
          {success}
        </div>
      )}

      <div className="rounded-lg border border-[#404040] bg-[#252525] p-6">
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

        {selectedProjectId && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Overview</label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Project overview"
                rows={3}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Context</label>
                <textarea
                  name="context"
                  value={formData.context}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Project context"
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Objective</label>
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Project objective"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Approach</label>
                <textarea
                  name="approach"
                  value={formData.approach}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Our approach"
                  rows={3}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Execution</label>
                <textarea
                  name="execution"
                  value={formData.execution}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="How we executed"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">Outcome</label>
              <textarea
                name="outcome"
                value={formData.outcome}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                placeholder="Results and outcomes"
                rows={3}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Quote</label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Testimonial quote"
                  rows={2}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Quote Author</label>
                <input
                  type="text"
                  name="quote_author"
                  value={formData.quote_author}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                  placeholder="Author name"
                />
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Metrics</h3>
                <button
                  type="button"
                  onClick={addMetric}
                  className="rounded-lg bg-[#2d2d2d] px-3 py-1 text-sm text-white transition-colors hover:bg-[#404040]"
                >
                  Add Metric
                </button>
              </div>

              <div className="space-y-3">
                {formData.metrics.map((metric, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                      className="flex-1 rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                      placeholder="Value (e.g., 1.2M)"
                    />
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                      className="flex-1 rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
                      placeholder="Label (e.g., Impressions)"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="rounded-lg p-2 text-[#888888] transition-colors hover:bg-red-600/20 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#C8622A] px-6 py-2 font-medium text-white transition-colors hover:bg-[#d97535]"
              >
                Save Case Study
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
