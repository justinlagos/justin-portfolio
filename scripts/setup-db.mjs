/**
 * Database setup script for the portfolio site.
 *
 * Creates all tables, indexes, and seeds data using Neon serverless driver.
 * Run with:  node --env-file=.env.local scripts/setup-db.mjs
 */

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set. Make sure .env.local contains it.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function run() {
  console.log('Connecting to database...');

  // ──────────────────────────────────────────────
  // 1. Drop existing tables (reverse dependency order)
  // ──────────────────────────────────────────────
  console.log('Dropping existing tables...');
  await sql`DROP TABLE IF EXISTS project_nav CASCADE`;
  await sql`DROP TABLE IF EXISTS analytics_events CASCADE`;
  await sql`DROP TABLE IF EXISTS style_settings CASCADE`;
  await sql`DROP TABLE IF EXISTS products CASCADE`;
  await sql`DROP TABLE IF EXISTS credentials CASCADE`;
  await sql`DROP TABLE IF EXISTS stats CASCADE`;
  await sql`DROP TABLE IF EXISTS countries CASCADE`;
  await sql`DROP TABLE IF EXISTS clients CASCADE`;
  await sql`DROP TABLE IF EXISTS nav_items CASCADE`;
  await sql`DROP TABLE IF EXISTS social_links CASCADE`;
  await sql`DROP TABLE IF EXISTS site_settings CASCADE`;
  await sql`DROP TABLE IF EXISTS pages CASCADE`;
  await sql`DROP TABLE IF EXISTS project_media CASCADE`;
  await sql`DROP TABLE IF EXISTS case_studies CASCADE`;
  await sql`DROP TABLE IF EXISTS projects CASCADE`;
  await sql`DROP TABLE IF EXISTS brands CASCADE`;

  // ──────────────────────────────────────────────
  // 2. Create tables
  // ──────────────────────────────────────────────
  console.log('Creating tables...');

  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
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
    )
  `;

  await sql`
    CREATE TABLE projects (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('case-study', 'gallery')),
      summary TEXT NOT NULL,
      year TEXT,
      services TEXT,
      featured_image TEXT,
      is_featured BOOLEAN DEFAULT false,
      is_visible BOOLEAN DEFAULT true,
      sort_order INT DEFAULT 0,
      seo_title TEXT,
      seo_description TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
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
    )
  `;

  await sql`
    CREATE TABLE project_media (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
      image_url TEXT NOT NULL,
      caption TEXT,
      alt_text TEXT,
      is_cover BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE pages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content JSONB DEFAULT '{}',
      seo_title TEXT,
      seo_description TEXT,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE site_settings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE social_links (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      platform TEXT NOT NULL,
      url TEXT NOT NULL,
      label TEXT,
      sort_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT true
    )
  `;

  await sql`
    CREATE TABLE nav_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT true
    )
  `;

  await sql`
    CREATE TABLE clients (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      logo_url TEXT,
      url TEXT,
      sort_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE countries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE stats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      number TEXT NOT NULL,
      label TEXT NOT NULL,
      sort_order INT DEFAULT 0
    )
  `;

  await sql`
    CREATE TABLE credentials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      number TEXT,
      title TEXT NOT NULL,
      description TEXT,
      sort_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT true
    )
  `;

  await sql`
    CREATE TABLE products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      url TEXT,
      icon TEXT,
      sort_order INT DEFAULT 0,
      is_visible BOOLEAN DEFAULT true
    )
  `;

  await sql`
    CREATE TABLE style_settings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE analytics_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type TEXT NOT NULL,
      page TEXT,
      metadata JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE project_nav (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
      prev_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
      next_project_id UUID REFERENCES projects(id) ON DELETE SET NULL
    )
  `;

  console.log('All tables created.');

  // ──────────────────────────────────────────────
  // 3. Seed data
  // ──────────────────────────────────────────────
  console.log('Seeding data...');

  // --- Brands ---
  await sql`
    INSERT INTO brands (name, slug, description, long_description, featured_image, is_featured, sort_order, hero_color) VALUES
      ('Take Back The Mic', 'take-back-the-mic', 'Pan-African music and cultural competition operating across 50 countries, backed by MTN and partnered with Mastercard.', 'Three seasons of brand, digital product, interactive festival, and campaign work spanning virtual environments, crypto rewards, and Mastercard partnership design.', '/assets/projects/tbtm/social-design.png', true, 1, NULL),
      ('Route to Zero', 'route-to-zero', 'Business-led membership organisation operating at government level, engaging Westminster and industry leaders on net zero policy.', 'Complete brand identity, website, and communications design. The work shapes how the organisation engages government, industry leaders, and the public.', '/assets/projects/route-to-zero/img01_7aa7926323.jpg', true, 2, NULL),
      ('Kavlr', 'kavlr', 'Digital booking and management platform for the beauty and wellness industry.', 'End-to-end product design including booking flow, business dashboard, client management, and mobile-responsive design system.', '/assets/projects/kavlr/landing-page.png', true, 3, NULL),
      ('Syntech Biofuel', 'syntech-biofuel', 'Sustainable biofuel company transforming waste into clean energy across Africa and the Middle East.', 'Brand identity and 3D campaign work positioning Syntech as a leader in sustainable biofuel production.', '/assets/projects/syntech/truck.png', true, 4, NULL),
      ('Tryba', 'tryba', 'Digital payment and financial technology platform built for emerging markets.', '', '/assets/projects/tryba/card-green.png', true, 5, NULL),
      ('HashIT', 'hashit', 'Fintech application for digital asset management, payments, and crypto exchange.', '', '/assets/projects/hashit/app.png', false, 6, NULL),
      ('EasyJet', 'easyjet', 'European low-cost airline. Campaign and visual design work.', '', NULL, false, 7, '#FF6600'),
      ('Sparkle', 'sparkle', 'Digital banking platform for Nigerians, offering seamless financial services.', '', NULL, false, 8, '#4CAF50'),
      ('Polo Luxury', 'polo-luxury', 'West Africa''s leading luxury retail brand, representing the world''s finest luxury houses.', '', NULL, false, 9, '#1a1a1a'),
      ('Vulta', 'vulta', 'Next-generation digital product for energy and utilities management.', '', NULL, false, 10, '#1a0a2e')
  `;

  // --- Projects (uses CTE to reference brand IDs by slug) ---
  await sql`
    WITH brand_ids AS (
      SELECT slug, id FROM brands
    )
    INSERT INTO projects (brand_id, title, slug, type, summary, year, services, featured_image, is_featured, sort_order) VALUES
      ((SELECT id FROM brand_ids WHERE slug = 'take-back-the-mic'), 'Brand Identity and Campaign', 'tbtm-brand-campaign', 'case-study', 'Complete brand identity, digital product, and interactive platform for Africa''s largest music competition.', '2021 to 2024', 'Brand Identity, Digital Product, Campaign, Interactive', '/assets/projects/tbtm/social-design.png', true, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'take-back-the-mic'), 'Access Bank Partnership', 'tbtm-access-bank', 'gallery', 'Brand collateral, debit card design, and social media campaign for the Access Bank x TBTM partnership.', '2022 to 2023', 'Card Design, Brand Collateral, Social Media', '/assets/projects/tbtm/debit-cards.png', false, 2),
      ((SELECT id FROM brand_ids WHERE slug = 'route-to-zero'), 'Brand Identity and Website', 'route-to-zero-brand', 'case-study', 'Brand identity, website, and communications for a business-led membership organisation operating at government level.', '2024 to Present', 'Brand Identity, Web Design, Communications', '/assets/projects/route-to-zero/img01_7aa7926323.jpg', true, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'kavlr'), 'Product Design and UX', 'kavlr-product', 'case-study', 'End-to-end product design for a digital booking and management platform in the beauty and wellness industry.', '2022 to 2024', 'Product Design, UX/UI, Design System', '/assets/projects/kavlr/landing-page.png', true, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'syntech-biofuel'), 'Brand and Campaign', 'syntech-brand', 'case-study', 'Brand identity and campaign design for a sustainable biofuel company.', '2024', 'Brand Identity, Campaign, 3D Visualisation', '/assets/projects/syntech/truck.png', true, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'tryba'), 'Product and Brand Design', 'tryba-product', 'gallery', 'Product design and brand identity for a digital payment platform in emerging markets.', '2022 to 2023', 'Product Design, Brand Identity, Campaign', '/assets/projects/tryba/card-green.png', false, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'hashit'), 'App Design and UX', 'hashit-app', 'gallery', 'Product design for a fintech application covering digital asset management, payments, and crypto exchange.', '2023 to 2024', 'Product Design, UX/UI, Fintech', '/assets/projects/hashit/app.png', false, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'easyjet'), 'Campaign Design', 'easyjet-campaign', 'gallery', 'Visual design and campaign work for the European airline.', '2024', 'Campaign, Visual Design', NULL, false, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'sparkle'), 'Brand Design', 'sparkle-brand', 'gallery', 'Brand design for a Nigerian digital banking platform.', '2021 to 2022', 'Brand Identity, Digital Design', NULL, false, 1),
      ((SELECT id FROM brand_ids WHERE slug = 'polo-luxury'), 'Brand and Digital', 'polo-luxury-brand', 'gallery', 'Brand and digital design for West Africa''s leading luxury retail brand.', '2019 to 2021', 'Brand Identity, Digital Design, Campaign', NULL, false, 1)
  `;

  // --- Case Studies (uses CTE to reference project IDs by slug) ---
  await sql`
    WITH project_data AS (
      SELECT slug, id FROM projects
    )
    INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics) VALUES
      (
        (SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'),
        'Take Back The Mic is a pan-African music and cultural competition that has run for three seasons across 50+ countries. The project demanded a complete design system spanning brand identity, digital product, interactive festival experiences, and multi-platform campaign work.',
        'MTN-backed and Mastercard-partnered, TBTM needed a visual identity and digital ecosystem that could scale across dozens of countries, languages, and cultural contexts while maintaining a unified creative direction.',
        'Create a cohesive brand and product system for a competition reaching millions across Africa, with digital-first experiences spanning voting platforms, virtual festivals, crypto reward systems, and social campaigns.',
        'Started with a flexible identity system built for scale. Designed modular components that could adapt across print, digital, social, and environmental applications. Built the interactive festival platform and voting system in parallel with campaign rollouts.',
        'Delivered brand guidelines, digital product design, interactive festival experience, social media systems, Mastercard partnership collateral, and campaign assets across three seasons of the competition.',
        'The campaign reached 1.1 billion media impressions across 50+ countries. The interactive festival was nominated for a Webby Award in 2023. The brand system scaled across three full seasons without requiring a redesign.',
        '[{"value":"1.1B","label":"Media Impressions"},{"value":"50+","label":"Countries Reached"},{"value":"3","label":"Seasons Delivered"},{"value":"1","label":"Webby Nomination"}]'
      ),
      (
        (SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'),
        'Route to Zero is a business-led membership organisation that operates at government level, engaging Westminster and industry leaders on net zero policy. The project required a complete brand identity, website, and communications design system.',
        'The organisation needed to position itself credibly at the intersection of business and government. The brand had to convey authority, clarity, and purpose without resorting to typical environmental clichés.',
        'Design a brand identity and digital presence that communicates policy-level seriousness while remaining accessible and engaging for a broad membership base.',
        'Focused on restraint and precision. Built the identity around clean typography, structured layouts, and a muted colour palette that signals institutional credibility. The website was designed for clarity of information and ease of navigation.',
        'Delivered the full brand identity including logo, typography system, colour palette, and brand guidelines. Designed and built the website with content management. Created templates for reports, presentations, and social communications.',
        'The brand has been adopted across all organisational communications and is used in engagements with government ministers, industry leaders, and public-facing campaigns.',
        '[{"value":"1","label":"Complete Brand System"},{"value":"1","label":"Website Launched"},{"value":"3","label":"Communication Templates"}]'
      ),
      (
        (SELECT id FROM project_data WHERE slug = 'kavlr-product'),
        'Kavlr is a digital booking and management platform for the beauty and wellness industry. The project covered end-to-end product design from booking flows to business dashboards.',
        'The beauty and wellness market needed a modern booking platform that served both customers making appointments and businesses managing their operations. Existing solutions were outdated or overly complex.',
        'Design an intuitive product that simplifies booking for customers while giving businesses powerful management tools in a clean, modern interface.',
        'Mapped the full user journey for both customers and business owners. Prioritised simplicity in the booking flow and depth in the management dashboard. Built a responsive design system that works across devices.',
        'Delivered the complete product design including customer booking flow, business dashboard, client management system, calendar integration, and a mobile-responsive design system with component library.',
        'The platform launched with positive reception in the beauty industry. The design system enabled rapid iteration and feature development post-launch.',
        '[{"value":"1","label":"Product Launched"},{"value":"2","label":"User Journeys Mapped"},{"value":"1","label":"Design System Built"}]'
      ),
      (
        (SELECT id FROM project_data WHERE slug = 'syntech-brand'),
        'Syntech Biofuel is a sustainable biofuel company transforming waste into clean energy across Africa and the Middle East. The project combined brand identity design with 3D campaign visuals.',
        'Syntech needed to establish market credibility in the sustainable energy sector. The brand had to communicate innovation and environmental responsibility while differentiating from competitors.',
        'Create a brand identity and campaign that positions Syntech as a leader in sustainable biofuel, appealing to both investors and industry partners.',
        'Built the identity around themes of transformation and sustainability. Used 3D visualisation to create striking campaign imagery that communicates the science and scale of biofuel production.',
        'Delivered the full brand identity, 3D campaign visuals, marketing collateral, and presentation materials for investor and partner communications.',
        'The brand identity has been adopted across all company communications and investor materials, helping to establish Syntech''s market position in the sustainable energy sector.',
        '[{"value":"1","label":"Brand Identity"},{"value":"1","label":"3D Campaign"},{"value":"2","label":"Markets Targeted"}]'
      )
  `;

  // --- Pages ---
  await sql`
    INSERT INTO pages (slug, title, content) VALUES
      (
        'home',
        'Home',
        ${JSON.stringify({
          hero_eyebrow: "DESIGN LEADER",
          hero_title: "Justin Ukaegbu",
          hero_bio: "Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.",
          stat_1_value: "1.1B",
          stat_1_label: "Impressions",
          stat_2_value: "50+",
          stat_2_label: "Countries",
          stat_3_value: "12+",
          stat_3_label: "Years",
          stat_4_value: "200+",
          stat_4_label: "Projects",
          about_preview_title: "Twelve years across brand, product, and interaction design",
          about_preview_text: "Practice shaped across Nigeria, the UK, Dubai, and work in fifty countries. Building design systems and digital products that work at scale. Now focused on products that combine design, technology, and learning.",
          cta_title: "Available for the right work",
          cta_text: "Design leadership, product collaboration, research partnerships, and speaking."
        })}
      ),
      (
        'about',
        'About',
        ${JSON.stringify({
          hero_eyebrow: "ABOUT",
          hero_title: "Justin Ukaegbu",
          intro_1: "Designer working across brand, product, and interaction design. Twelve years of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.",
          intro_2: "Built platforms used by hundreds of thousands. Designed campaigns that reached 1.1 billion impressions. Led brand work for organisations operating at government level.",
          intro_3: "Now focused on building products that combine design, technology, and learning. Also running Art Director Studio, a platform for creative direction work.",
          story_1: "Started in Nigeria, studied in the UK, and worked across the Middle East and Europe. Early career covered print, brand identity, and editorial design before shifting into digital product and interaction work.",
          story_2: "Take Back The Mic was a defining project. Three seasons of brand, digital product, interactive festival, and campaign work spanning virtual environments, crypto rewards, and a Mastercard partnership. The campaign reached over 1.1 billion impressions across 50+ countries and earned a Webby nomination in 2023.",
          story_3: "In the UK, created the brand identity, website, and communications design for Route to Zero, a business-led membership organisation operating at government level, engaging Westminster and industry leaders on net zero policy.",
          story_4: "Holds an MA in Graphic Design (Distinction) from University of Hertfordshire and B.Sc. in Computer Science and Education from Enugu University of Science and Technology. Member of Chartered Society of Designers and Design Research Society."
        })}
      ),
      (
        'contact',
        'Contact',
        ${JSON.stringify({
          hero_eyebrow: "GET IN TOUCH",
          hero_title: "Let's work together",
          hero_subtitle: "Open to new projects, collaborations, and conversations. Interested in design leadership, product work, and research partnerships.",
          email: "mrjustinukaegbu@gmail.com",
          phone: "+44 7577 627621",
          linkedin: "https://linkedin.com/in/justin-ukaegbu",
          location: "London, United Kingdom"
        })}
      ),
      (
        'work',
        'Work',
        ${JSON.stringify({
          hero_eyebrow: "DESIGN ACROSS BRANDS",
          hero_title: "Work",
          hero_subtitle: "Design leadership and creative direction across brand identity, digital product, campaign, and interaction design. Explore the clients and brands below."
        })}
      )
  `;

  // --- Site Settings ---
  await sql`
    INSERT INTO site_settings (key, value) VALUES
      ('site_name', 'Justin Ukaegbu'),
      ('site_tagline', 'Design Leader'),
      ('contact_email', 'mrjustinukaegbu@gmail.com')
  `;

  // --- Social Links ---
  await sql`
    INSERT INTO social_links (platform, url, sort_order, is_visible) VALUES
      ('LinkedIn', 'https://linkedin.com/in/justin-ukaegbu', 1, true),
      ('Twitter', 'https://twitter.com/mrjustinukaegbu', 2, true)
  `;

  // --- Navigation Items ---
  await sql`
    INSERT INTO nav_items (label, href, sort_order, is_visible) VALUES
      ('Work', '/work', 1, true),
      ('About', '/about', 2, true),
      ('Contact', '/contact', 3, true)
  `;

  // --- Clients ---
  await sql`
    INSERT INTO clients (name, sort_order, is_visible) VALUES
      ('Take Back The Mic', 1, true),
      ('Mastercard', 2, true),
      ('Route to Zero', 3, true),
      ('HashIT', 4, true),
      ('Kavlr', 5, true),
      ('Syntech', 6, true),
      ('EasyJet', 7, true),
      ('Access Bank', 8, true),
      ('Sparkle', 9, true),
      ('Polo Luxury', 10, true),
      ('Tryba', 11, true),
      ('Vulta', 12, true)
  `;

  // --- Countries ---
  await sql`
    INSERT INTO countries (name, sort_order) VALUES
      ('Nigeria', 1),
      ('United Kingdom', 2),
      ('Dubai', 3),
      ('Ghana', 4),
      ('Kenya', 5),
      ('South Africa', 6),
      ('Egypt', 7),
      ('Uganda', 8),
      ('Rwanda', 9),
      ('Tanzania', 10),
      ('United States', 11),
      ('Canada', 12),
      ('India', 13),
      ('Singapore', 14),
      ('Australia', 15)
  `;

  // --- Stats (column is "number" in schema, seed used "value") ---
  await sql`
    INSERT INTO stats (number, label, sort_order) VALUES
      ('1.1B', 'Impressions', 1),
      ('50+', 'Countries', 2),
      ('12+', 'Years', 3),
      ('200+', 'Projects', 4)
  `;

  // --- Credentials ---
  await sql`
    INSERT INTO credentials (title, description, sort_order) VALUES
      ('Webby Award Nomination', '2023 for TBTM Interactive Festival', 1),
      ('Mastercard Partnership', 'Digital card product design', 2),
      ('1.1 Billion Impressions', 'Across fifty countries', 3),
      ('Government-Level Work', 'Westminster engagement on net zero policy', 4),
      ('Chartered Designer', 'Member, Chartered Society of Designers', 5),
      ('MA Graphic Design', 'Distinction, University of Hertfordshire', 6)
  `;

  // --- Products (column is "title" in schema, seed used "name") ---
  await sql`
    INSERT INTO products (title, description, sort_order) VALUES
      ('Art Director Studio', 'Platform for creative direction work, bridging the gap between concept and execution. Tools for art directors and creative teams to collaborate on brand direction and visual systems.', 1),
      ('Draw in the Air', 'Gesture-based learning platform for children. Combining gesture recognition with interactive design to make learning intuitive and engaging.', 2)
  `;

  // --- Style Settings ---
  await sql`
    INSERT INTO style_settings (key, value) VALUES
      ('brand_color_primary', '#000000'),
      ('brand_color_accent', '#666666'),
      ('font_family_serif', 'Georgia, serif'),
      ('font_family_sans', 'Inter, sans-serif')
  `;

  // --- Project Media (gallery images for each project) ---
  await sql`
    WITH project_data AS (
      SELECT slug, id FROM projects
    )
    INSERT INTO project_media (project_id, image_url, alt_text, is_cover, sort_order) VALUES
      -- TBTM Brand Campaign
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/social-design.png', 'TBTM social media design system', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/social-1.png', 'TBTM social media post 1', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/social-2.png', 'TBTM social media post 2', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/social-3.png', 'TBTM social media post 3', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/reachout.png', 'TBTM Reachout campaign', false, 5),
      -- TBTM Access Bank
      ((SELECT id FROM project_data WHERE slug = 'tbtm-access-bank'), '/assets/projects/tbtm/debit-cards.png', 'Access Bank x TBTM debit card designs', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-access-bank'), '/assets/projects/tbtm/access-logo.png', 'Access Bank x TBTM partnership logo', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-access-bank'), '/assets/projects/tbtm/access-branding.png', 'Access Bank x TBTM branding', false, 3),
      -- Kavlr Product
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/landing-page.png', 'Kavlr landing page design', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/dashboard.png', 'Kavlr business dashboard', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/desktop-1.png', 'Kavlr desktop view 1', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/desktop-2.png', 'Kavlr desktop view 2', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/booking-1.png', 'Kavlr booking flow', false, 5),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/mobile.png', 'Kavlr mobile design', false, 6),
      -- Syntech Brand
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/truck.png', 'Syntech branded truck', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-1.jpg', 'Syntech social campaign 1', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-2.jpg', 'Syntech social campaign 2', false, 3),
      -- Tryba Product
      ((SELECT id FROM project_data WHERE slug = 'tryba-product'), '/assets/projects/tryba/card-green.png', 'Tryba green card design', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'tryba-product'), '/assets/projects/tryba/card-black.png', 'Tryba black card design', false, 2),
      -- HashIT App
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/app.png', 'HashIT app design', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/appstore-1.png', 'HashIT app store screenshot 1', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/appstore-2.png', 'HashIT app store screenshot 2', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/crowdpool.png', 'HashIT crowdpool feature', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/navigation.png', 'HashIT navigation design', false, 5),
      -- Route to Zero (gallery images for the standard gallery view)
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img01_7aa7926323.jpg', 'Route to Zero hero landscape', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img02_2b4f266ae1.jpg', 'Route to Zero logo sketch', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img03_55dedd27fb.jpg', 'Route to Zero logo construction', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img04_b71d9e79a2.jpg', 'Route to Zero final mark', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img05_dcd709fa54.png', 'Route to Zero colour palette', false, 5),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img11_9f9fbbbc01.jpg', 'Route to Zero website desktop', false, 6),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img15_2d1459d41a.jpg', 'Route to Zero business cards', false, 7),
      ((SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/img18_4f3be5af84.jpg', 'Route to Zero vehicle livery', false, 8)
  `;

  console.log('Seed data inserted.');

  // ──────────────────────────────────────────────
  // 4. Create indexes
  // ──────────────────────────────────────────────
  console.log('Creating indexes...');

  await sql`CREATE INDEX idx_brands_slug ON brands(slug)`;
  await sql`CREATE INDEX idx_projects_slug ON projects(slug)`;
  await sql`CREATE INDEX idx_projects_brand_id ON projects(brand_id)`;
  await sql`CREATE INDEX idx_project_media_project_id ON project_media(project_id)`;
  await sql`CREATE INDEX idx_case_studies_project_id ON case_studies(project_id)`;
  await sql`CREATE INDEX idx_pages_slug ON pages(slug)`;
  await sql`CREATE INDEX idx_clients_sort_order ON clients(sort_order)`;
  await sql`CREATE INDEX idx_countries_sort_order ON countries(sort_order)`;
  await sql`CREATE INDEX idx_stats_sort_order ON stats(sort_order)`;
  await sql`CREATE INDEX idx_credentials_sort_order ON credentials(sort_order)`;
  await sql`CREATE INDEX idx_products_sort_order ON products(sort_order)`;
  await sql`CREATE INDEX idx_style_settings_key ON style_settings(key)`;
  await sql`CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at)`;
  await sql`CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type)`;

  console.log('Indexes created.');
  console.log('');
  console.log('Database setup complete!');
}

run().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
