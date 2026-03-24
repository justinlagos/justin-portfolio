-- Portfolio Site Database Schema
-- Last updated: 2026-03-24
-- This file reflects the actual production database state

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

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  url TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Countries table
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Stats table (uses 'number' column for the stat value)
CREATE TABLE stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Credentials table (uses 'number' for ordering display, 'is_visible' for toggle)
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Products table (uses 'title' not 'name', has 'icon' and 'is_visible')
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  icon TEXT,
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Style Settings table
CREATE TABLE style_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Analytics Events table
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Project Navigation (prev/next links)
CREATE TABLE project_nav (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  prev_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  next_project_id UUID REFERENCES projects(id) ON DELETE SET NULL
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
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_nav ENABLE ROW LEVEL SECURITY;

-- RLS Policies: SELECT for anon (public read)
CREATE POLICY "brands_select_anon" ON brands FOR SELECT USING (true);
CREATE POLICY "projects_select_anon" ON projects FOR SELECT USING (true);
CREATE POLICY "case_studies_select_anon" ON case_studies FOR SELECT USING (true);
CREATE POLICY "project_media_select_anon" ON project_media FOR SELECT USING (true);
CREATE POLICY "pages_select_anon" ON pages FOR SELECT USING (true);
CREATE POLICY "site_settings_select_anon" ON site_settings FOR SELECT USING (true);
CREATE POLICY "social_links_select_anon" ON social_links FOR SELECT USING (true);
CREATE POLICY "nav_items_select_anon" ON nav_items FOR SELECT USING (true);
CREATE POLICY "clients_select_anon" ON clients FOR SELECT USING (true);
CREATE POLICY "countries_select_anon" ON countries FOR SELECT USING (true);
CREATE POLICY "stats_select_anon" ON stats FOR SELECT USING (true);
CREATE POLICY "credentials_select_anon" ON credentials FOR SELECT USING (true);
CREATE POLICY "products_select_anon" ON products FOR SELECT USING (true);
CREATE POLICY "style_settings_select_anon" ON style_settings FOR SELECT USING (true);
CREATE POLICY "analytics_events_select_anon" ON analytics_events FOR SELECT USING (true);
CREATE POLICY "project_nav_select_anon" ON project_nav FOR SELECT USING (true);

-- RLS Policies: ALL for authenticated (admin write)
CREATE POLICY "brands_all_authenticated" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "projects_all_authenticated" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "case_studies_all_authenticated" ON case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "project_media_all_authenticated" ON project_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "pages_all_authenticated" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "site_settings_all_authenticated" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "social_links_all_authenticated" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "nav_items_all_authenticated" ON nav_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "clients_all_authenticated" ON clients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "countries_all_authenticated" ON countries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "stats_all_authenticated" ON stats FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "credentials_all_authenticated" ON credentials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "products_all_authenticated" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "style_settings_all_authenticated" ON style_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "analytics_events_all_authenticated" ON analytics_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "project_nav_all_authenticated" ON project_nav FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket: 'portfolio-images' (public, created via Supabase dashboard)
-- Storage policies exist for: Public read, Auth upload/update/delete

-- Create Indexes
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_brand_id ON projects(brand_id);
CREATE INDEX idx_project_media_project_id ON project_media(project_id);
CREATE INDEX idx_case_studies_project_id ON case_studies(project_id);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_clients_sort_order ON clients(sort_order);
CREATE INDEX idx_countries_sort_order ON countries(sort_order);
CREATE INDEX idx_stats_sort_order ON stats(sort_order);
CREATE INDEX idx_credentials_sort_order ON credentials(sort_order);
CREATE INDEX idx_products_sort_order ON products(sort_order);
CREATE INDEX idx_style_settings_key ON style_settings(key);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
