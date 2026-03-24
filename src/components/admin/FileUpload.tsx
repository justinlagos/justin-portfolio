'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, X, Film, Image as ImageIcon } from 'lucide-react'

interface FileUploadProps {
  value: string
  onChange: (url: string) => void
  accept?: string
  folder?: string
  label?: string
  showPreview?: boolean
}

export default function FileUpload({
  value,
  onChange,
  accept = 'image/*,video/*',
  folder = 'uploads',
  label = 'Upload File',
  showPreview = true,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isVideo = (url: string) => {
    return /\.(mp4|webm|mov|avi|mkv|ogg)$/i.test(url)
  }

  const handleUpload = async (file: File) => {
    if (!file) return

    // Validate file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be under 50MB')
      return
    }

    try {
      setUploading(true)
      setError('')

      const fileExt = file.name.split('.').pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { data, error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(data.path)

      onChange(urlData.publicUrl)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleUpload(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleClear = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <label className="mb-2 block text-sm font-medium text-white">{label}</label>

      {/* URL Input (still available as fallback) */}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-2 text-sm text-white placeholder-[#888888] transition-all focus:border-[#C8622A] focus:outline-none"
          placeholder="Paste URL or upload below"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-[#404040] p-2 text-[#888888] transition-colors hover:bg-[#2d2d2d] hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-all ${
          dragOver
            ? 'border-[#C8622A] bg-[#C8622A]/10'
            : 'border-[#404040] bg-[#1a1a1a] hover:border-[#666666] hover:bg-[#222222]'
        }`}
      >
        {uploading ? (
          <>
            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-[#C8622A] border-t-transparent"></div>
            <p className="text-sm text-[#888888]">Uploading...</p>
          </>
        ) : (
          <>
            <Upload size={24} className="mb-3 text-[#888888]" />
            <p className="text-sm font-medium text-white">
              Drop file here or click to browse
            </p>
            <p className="mt-1 text-xs text-[#888888]">
              Images (PNG, JPG, SVG, WebP) or Videos (MP4, WebM, MOV) up to 50MB
            </p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {/* Preview */}
      {showPreview && value && (
        <div className="mt-3 rounded-lg border border-[#404040] bg-[#1a1a1a] p-3">
          {isVideo(value) ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <Film size={14} />
                <span>Video Preview</span>
              </div>
              <video
                src={value}
                controls
                className="max-h-48 w-full rounded-lg object-contain"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <ImageIcon size={14} />
                <span>Image Preview</span>
              </div>
              <img
                src={value}
                alt="Preview"
                className="max-h-48 w-full rounded-lg object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
