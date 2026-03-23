// ── Database Types ──

export interface Brand {
  id: string
  name: string
  slug: string
  description: string
  long_description: string | null
  logo_url: string | null
  featured_image: string | null
  hero_color: string | null
  is_featured: boolean
  is_visible: boolean
  sort_order: number
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  brand_id: string
  title: string
  slug: string
  type: 'case-study' | 'gallery'
  summary: string
  year: string
  services: string[]
  featured_image: string | null
  is_featured: boolean
  is_visible: boolean
  sort_order: number
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
  // Joined
  brand?: Brand
  media?: ProjectMedia[]
  case_study?: CaseStudy | null
}

export interface CaseStudy {
  id: string
  project_id: string
  overview: string | null
  context: string | null
  objective: string | null
  approach: string | null
  execution: string | null
  outcome: string | null
  quote: string | null
  quote_author: string | null
  metrics: CaseStudyMetric[]
  created_at: string
  updated_at: string
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface ProjectMedia {
  id: string
  project_id: string
  image_url: string
  caption: string | null
  alt_text: string | null
  is_cover: boolean
  sort_order: number
  created_at: string
}

export interface Page {
  id: string
  slug: string
  title: string
  content: Record<string, string>
  seo_title: string | null
  seo_description: string | null
  updated_at: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  sort_order: number
  is_visible: boolean
}

export interface NavItem {
  id: string
  label: string
  href: string
  sort_order: number
  is_visible: boolean
}

// ── Component Props ──

export interface LightboxImage {
  src: string
  alt: string
  caption?: string
}
