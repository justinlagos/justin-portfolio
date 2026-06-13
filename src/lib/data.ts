import { sql } from './db'
import type { Brand, Project, ProjectMedia, Page, SiteSetting, SocialLink, NavItem } from '@/types'

// ── Brands ──

export async function getBrands(): Promise<Brand[]> {
  try {
    const rows = await sql()`SELECT * FROM brands WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as Brand[]
  } catch (e) {
    console.error('Failed to fetch brands:', e)
    return []
  }
}

export async function getFeaturedBrands(): Promise<Brand[]> {
  try {
    const rows = await sql()`SELECT * FROM brands WHERE is_visible = true AND is_featured = true ORDER BY sort_order ASC`
    return rows as Brand[]
  } catch (e) {
    console.error('Failed to fetch featured brands:', e)
    return []
  }
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!slug) return null
  try {
    const rows = await sql()`SELECT * FROM brands WHERE slug = ${slug} LIMIT 1`
    return (rows[0] as Brand) ?? null
  } catch {
    return null
  }
}

// ── Projects ──

export async function getProjectsForBrand(brandId: string): Promise<Project[]> {
  if (!brandId) return []
  try {
    const projects = await sql()`SELECT * FROM projects WHERE brand_id = ${brandId} AND is_visible = true ORDER BY sort_order ASC`
    // Attach media
    for (const p of projects) {
      const media = await sql()`SELECT * FROM project_media WHERE project_id = ${p.id} ORDER BY sort_order ASC`
      ;(p as any).media = media
    }
    return projects as Project[]
  } catch (e) {
    console.error('Failed to fetch projects for brand:', e)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!slug) return null
  try {
    const rows = await sql()`SELECT * FROM projects WHERE slug = ${slug} LIMIT 1`
    const project = rows[0] as any
    if (!project) return null

    // Attach brand
    const brandRows = await sql()`SELECT * FROM brands WHERE id = ${project.brand_id} LIMIT 1`
    project.brand = brandRows[0] ?? null

    // Attach media
    const media = await sql()`SELECT * FROM project_media WHERE project_id = ${project.id} ORDER BY sort_order ASC`
    project.media = media

    // Attach case study
    if (project.type === 'case-study') {
      const csRows = await sql()`SELECT * FROM case_studies WHERE project_id = ${project.id} LIMIT 1`
      project.case_study = csRows[0] ?? null
    }

    return project as Project
  } catch {
    return null
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await sql()`SELECT p.*, row_to_json(b.*) as brand FROM projects p LEFT JOIN brands b ON b.id = p.brand_id WHERE p.is_visible = true AND p.is_featured = true ORDER BY p.sort_order ASC`
    // Attach media
    for (const p of projects) {
      const media = await sql()`SELECT * FROM project_media WHERE project_id = ${p.id} ORDER BY sort_order ASC`
      ;(p as any).media = media
      // brand comes as a JSON object from row_to_json — parse if string
      if (typeof (p as any).brand === 'string') {
        (p as any).brand = JSON.parse((p as any).brand)
      }
    }
    return projects as Project[]
  } catch (e) {
    console.error('Failed to fetch featured projects:', e)
    return []
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const projects = await sql()`SELECT p.*, row_to_json(b.*) as brand FROM projects p LEFT JOIN brands b ON b.id = p.brand_id WHERE p.is_visible = true ORDER BY p.sort_order ASC`
    for (const p of projects) {
      if (typeof (p as any).brand === 'string') {
        (p as any).brand = JSON.parse((p as any).brand)
      }
    }
    return projects as Project[]
  } catch (e) {
    console.error('Failed to fetch all projects:', e)
    return []
  }
}

// ── Media ──

export async function getMediaForProject(projectId: string): Promise<ProjectMedia[]> {
  if (!projectId) return []
  try {
    const rows = await sql()`SELECT * FROM project_media WHERE project_id = ${projectId} ORDER BY sort_order ASC`
    return rows as ProjectMedia[]
  } catch (e) {
    console.error('Failed to fetch media:', e)
    return []
  }
}

// ── Pages ──

export async function getPage(slug: string): Promise<Page | null> {
  if (!slug) return null
  try {
    const rows = await sql()`SELECT * FROM pages WHERE slug = ${slug} LIMIT 1`
    return (rows[0] as Page) ?? null
  } catch {
    return null
  }
}

// ── Settings ──

export async function getSettings(): Promise<Record<string, string>> {
  try {
    const rows = await sql()`SELECT * FROM site_settings`
    const map: Record<string, string> = {}
    rows.forEach((s: any) => { map[s.key] = s.value })
    return map
  } catch (e) {
    console.error('Failed to fetch settings:', e)
    return {}
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const rows = await sql()`SELECT * FROM social_links WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as SocialLink[]
  } catch (e) {
    console.error('Failed to fetch social links:', e)
    return []
  }
}

export async function getNavItems(): Promise<NavItem[]> {
  try {
    const rows = await sql()`SELECT * FROM nav_items WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as NavItem[]
  } catch (e) {
    console.error('Failed to fetch nav items:', e)
    return []
  }
}

// ── Stats ──

export interface Stat {
  id: string
  number: string
  label: string
  sort_order: number
}

export async function getStats(): Promise<Stat[]> {
  try {
    const rows = await sql()`SELECT * FROM stats ORDER BY sort_order ASC`
    return rows as Stat[]
  } catch (e) {
    console.error('Failed to fetch stats:', e)
    return []
  }
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
  try {
    const rows = await sql()`SELECT * FROM clients WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as ClientItem[]
  } catch (e) {
    console.error('Failed to fetch clients:', e)
    return []
  }
}

// ── Credentials ──

export interface CredentialItem {
  id: string
  number: string
  title: string
  description: string | null
  sort_order: number
  is_visible: boolean
}

export async function getCredentials(): Promise<CredentialItem[]> {
  try {
    const rows = await sql()`SELECT * FROM credentials WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as CredentialItem[]
  } catch (e) {
    console.error('Failed to fetch credentials:', e)
    return []
  }
}

// ── Products ──

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
  try {
    const rows = await sql()`SELECT * FROM products WHERE is_visible = true ORDER BY sort_order ASC`
    return rows as ProductItem[]
  } catch (e) {
    console.error('Failed to fetch products:', e)
    return []
  }
}
