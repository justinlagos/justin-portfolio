import { supabase } from './supabase'
import type { Brand, Project, CaseStudy, ProjectMedia, Page, SiteSetting, SocialLink, NavItem } from '@/types'

// ── Brands ──

export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_visible', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
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
  const { data, error } = await supabase
    .from('projects')
    .select('*, media:project_media(*)')
    .eq('brand_id', brandId)
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, brand:brands(*), media:project_media(*)')
    .eq('slug', slug)
    .single()
  if (error) return null

  // Fetch case study if type is case-study
  if (data?.type === 'case-study') {
    const { data: cs } = await supabase
      .from('case_studies')
      .select('*')
      .eq('project_id', data.id)
      .single()
    data.case_study = cs
  }

  // Sort media
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
  if (error) throw error
  return data ?? []
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*, brand:brands(name, slug)')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

// ── Media ──

export async function getMediaForProject(projectId: string): Promise<ProjectMedia[]> {
  const { data, error } = await supabase
    .from('project_media')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

// ── Pages ──

export async function getPage(slug: string): Promise<Page | null> {
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
  if (error) throw error
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
  if (error) throw error
  return data ?? []
}

export async function getNavItems(): Promise<NavItem[]> {
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}
