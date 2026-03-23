-- Portfolio Site Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Brands table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  logo_url TEXT,
  featured_image TEXT,
  hero_color TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('case-study', 'gallery')),
  summary TEXT NOT NULL,
  year TEXT,
  services TEXT[] DEFAULT '{}',
  featured_image TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Case Studies table
CREATE TABLE case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
  overview TEXT,
  context TEXT,
  objective TEXT,
  approach TEXT,
  execution TEXT,
  outcome TEXT,
  quote TEXT,
  quote_author TEXT,
  metrics JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Project Media table
CREATE TABLE project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  is_cover BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- Social Links table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Navigation Items table
CREATE TABLE nav_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE nav_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies: SELECT for anon (public read)
CREATE POLICY "brands_select_anon" ON brands FOR SELECT USING (true);
CREATE POLICY "projects_select_anon" ON projects FOR SELECT USING (true);
CREATE POLICY "case_studies_select_anon" ON case_studies FOR SELECT USING (true);
CREATE POLICY "project_media_select_anon" ON project_media FOR SELECT USING (true);
CREATE POLICY "pages_select_anon" ON pages FOR SELECT USING (true);
CREATE POLICY "site_settings_select_anon" ON site_settings FOR SELECT USING (true);
CREATE POLICY "social_links_select_anon" ON social_links FOR SELECT USING (true);
CREATE POLICY "nav_items_select_anon" ON nav_items FOR SELECT USING (true);

-- RLS Policies: ALL for authenticated (admin write)
CREATE POLICY "brands_all_authenticated" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "projects_all_authenticated" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "case_studies_all_authenticated" ON case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "project_media_all_authenticated" ON project_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "pages_all_authenticated" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "site_settings_all_authenticated" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "social_links_all_authenticated" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "nav_items_all_authenticated" ON nav_items FOR ALL USING (auth.role() = 'authenticated');

-- Create Indexes
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_brand_id ON projects(brand_id);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);
CREATE INDEX idx_case_studies_project_id ON case_studies(project_id);
CREATE INDEX idx_pages_slug ON pages(slug);
