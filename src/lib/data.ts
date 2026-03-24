import { supabase } from './supabase'
import type { Brand, Project, ProjectMedia, Page, SiteSetting, SocialLink, NavItem } from '@/types'

// ── Brands ──

export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch brands:', error.message)
    return []
  }
  return data ?? []
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch featured brands:', error.message)
    return []
  }
  return data ?? []
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!slug) return null
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

// ── Projects ──

export async function getProjectsForBrand(brandId: string): Promise<Project[]> {
  if (!brandId) return []
  const { data, error } = await supabase
    .from('projects')
    .select('*, media:project_media(*)')
    .eq('brand_id', brandId)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch projects for brand:', error.message)
    return []
  }
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug) return null
  const { data, error } = await supabase
    .from('projects')
    .select('*, brand:brands(*), media:project_media(*)')
    .eq('slug', slug)
    .single()
  if (error) return null

  if (data?.type === 'case-study') {
    const { data: cs } = await supabase
      .from('case_studies')
      .select('*')
      .eq('project_id', data.id)
      .single()
    data.case_study = cs
  }

  if (data?.media) {
    data.media.sort((a: ProjectMedia, b: ProjectMedia) => a.sort_order - b.sort_order)
  }

  return data
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, brand:brands(name, slug), media:project_media(*)')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch featured projects:', error.message)
    return []
  }
  return data ?? []
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, brand:brands(name, slug)')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch all projects:', error.message)
    return []
  }
  return data ?? []
}

// ── Media ──

export async function getMediaForProject(projectId: string): Promise<ProjectMedia[]> {
  if (!projectId) return []
  const { data, error } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch media:', error.message)
    return []
  }
  return data ?? []
}

// ── Pages ──

export async function getPage(slug: string): Promise<Page | null> {
  if (!slug) return null
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

// ── Settings ──

export async function getSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
  if (error) {
    console.error('Failed to fetch settings:', error.message)
    return {}
  }
  const map: Record<string, string> = {}
  data?.forEach((s: SiteSetting) => { map[s.key] = s.value })
  return map
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch social links:', error.message)
    return []
  }
  return data ?? []
}

export async function getNavItems(): Promise<NavItem[]> {
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch nav items:', error.message)
    return []
  }
  return data ?? []
}

// ── Stats ── (DB uses 'number' column, not 'value')

export interface Stat {
  id: string
  number: string
  label: string
  sort_order: number
}

export async function getStats(): Promise<Stat[]> {
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch stats:', error.message)
    return []
  }
  return data ?? []
}

// ── Clients ──

export interface ClientItem {
  id: string
  name: string
  logo_url: string | null
  url: string | null
  sort_order: number
  is_visible: boolean
}

export async function getClients(): Promise<ClientItem[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch clients:', error.message)
    return []
  }
  return data ?? []
}

// ── Credentials ── (DB uses 'number', 'title', 'description', 'is_visible')

export interface CredentialItem {
  id: string
  number: string
  title: string
  description: string | null
  sort_order: number
  is_visible: boolean
}

export async function getCredentials(): Promise<CredentialItem[]> {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch credentials:', error.message)
    return []
  }
  return data ?? []
}

// ── Products ── (DB uses 'title', 'description', 'url', 'icon', 'is_visible')

export interface ProductItem {
  id: string
  title: string
  description: string | null
  url: string | null
  icon: string | null
  sort_order: number
  is_visible: boolean
}

export async function getProducts(): Promise<ProductItem[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) {
    console.error('Failed to fetch products:', error.message)
    return []
  }
  return data ?? []
}
