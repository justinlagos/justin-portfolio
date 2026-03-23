-- Portfolio Site Seed Data

-- Insert Brands
INSERT INTO brands (name, slug, description, long_description, is_featured, sort_order, hero_color) VALUES
  ('Take Back The Mic', 'take-back-the-mic', 'Pan-African music and cultural competition operating across 50 countries, backed by MTN and partnered with Mastercard.', 'Three seasons of brand, digital product, interactive festival, and campaign work spanning virtual environments, crypto rewards, and Mastercard partnership design.', true, 1, NULL),
  ('Route to Zero', 'route-to-zero', 'Business-led membership organisation operating at government level, engaging Westminster and industry leaders on net zero policy.', 'Complete brand identity, website, and communications design. The work shapes how the organisation engages government, industry leaders, and the public.', true, 2, NULL),
  ('Kavlr', 'kavlr', 'Digital booking and management platform for the beauty and wellness industry.', 'End-to-end product design including booking flow, business dashboard, client management, and mobile-responsive design system.', true, 3, NULL),
  ('Syntech Biofuel', 'syntech-biofuel', 'Sustainable biofuel company transforming waste into clean energy across Africa and the Middle East.', 'Brand identity and 3D campaign work positioning Syntech as a leader in sustainable biofuel production.', true, 4, NULL),
  ('Tryba', 'tryba', 'Digital payment and financial technology platform built for emerging markets.', '', true, 5, NULL),
  ('HashIT', 'hashit', 'Fintech application for digital asset management, payments, and crypto exchange.', '', false, 6, NULL),
  ('EasyJet', 'easyjet', 'European low-cost airline. Campaign and visual design work.', '', false, 7, '#FF6600'),
  ('Sparkle', 'sparkle', 'Digital banking platform for Nigerians, offering seamless financial services.', '', false, 8, '#4CAF50'),
  ('Polo Luxury', 'polo-luxury', 'West Africa''s leading luxury retail brand, representing the world''s finest luxury houses.', '', false, 9, '#1a1a1a'),
  ('Vulta', 'vulta', 'Next-generation digital product for energy and utilities management.', '', false, 10, '#1a0a2e');

-- Insert Projects
WITH brand_ids AS (
  SELECT slug, id FROM brands
)
INSERT INTO projects (brand_id, title, slug, type, summary, year, services, is_featured, sort_order) VALUES
  ((SELECT id FROM brand_ids WHERE slug = 'take-back-the-mic'), 'Brand Identity and Campaign', 'tbtm-brand-campaign', 'case-study', 'Complete brand identity, digital product, and interactive platform for Africa''s largest music competition.', '2021 to 2024', ARRAY['Brand Identity', 'Digital Product', 'Campaign', 'Interactive'], true, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'take-back-the-mic'), 'Access Bank Partnership', 'tbtm-access-bank', 'gallery', 'Brand collateral, debit card design, and social media campaign for the Access Bank x TBTM partnership.', '2022 to 2023', ARRAY['Card Design', 'Brand Collateral', 'Social Media'], false, 2),
  ((SELECT id FROM brand_ids WHERE slug = 'route-to-zero'), 'Brand Identity and Website', 'route-to-zero-brand', 'case-study', 'Brand identity, website, and communications for a business-led membership organisation operating at government level.', '2024 to Present', ARRAY['Brand Identity', 'Web Design', 'Communications'], true, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'kavlr'), 'Product Design and UX', 'kavlr-product', 'case-study', 'End-to-end product design for a digital booking and management platform in the beauty and wellness industry.', '2022 to 2024', ARRAY['Product Design', 'UX/UI', 'Design System'], true, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'syntech-biofuel'), 'Brand and Campaign', 'syntech-brand', 'case-study', 'Brand identity and campaign design for a sustainable biofuel company.', '2024', ARRAY['Brand Identity', 'Campaign', '3D Visualisation'], true, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'tryba'), 'Product and Brand Design', 'tryba-product', 'gallery', 'Product design and brand identity for a digital payment platform in emerging markets.', '2022 to 2023', ARRAY['Product Design', 'Brand Identity', 'Campaign'], false, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'hashit'), 'App Design and UX', 'hashit-app', 'gallery', 'Product design for a fintech application covering digital asset management, payments, and crypto exchange.', '2023 to 2024', ARRAY['Product Design', 'UX/UI', 'Fintech'], false, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'easyjet'), 'Campaign Design', 'easyjet-campaign', 'gallery', 'Visual design and campaign work for the European airline.', '2024', ARRAY['Campaign', 'Visual Design'], false, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'sparkle'), 'Brand Design', 'sparkle-brand', 'gallery', 'Brand design for a Nigerian digital banking platform.', '2021 to 2022', ARRAY['Brand Identity', 'Digital Design'], false, 1),
  ((SELECT id FROM brand_ids WHERE slug = 'polo-luxury'), 'Brand and Digital', 'polo-luxury-brand', 'gallery', 'Brand and digital design for West Africa''s leading luxury retail brand.', '2019 to 2021', ARRAY['Brand Identity', 'Digital Design', 'Campaign'], false, 1);

-- Insert Case Studies
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
    '[{"value":"1.1B","label":"Media Impressions"},{"value":"50+","label":"Countries Reached"},{"value":"3","label":"Seasons Delivered"},{"value":"1","label":"Webby Nomination"}]'::jsonb
  ),
  (
    (SELECT id FROM project_data WHERE slug = 'route-to-zero-brand'),
    'Route to Zero is a business-led membership organisation that operates at government level, engaging Westminster and industry leaders on net zero policy. The project required a complete brand identity, website, and communications design system.',
    'The organisation needed to position itself credibly at the intersection of business and government. The brand had to convey authority, clarity, and purpose without resorting to typical environmental clichés.',
    'Design a brand identity and digital presence that communicates policy-level seriousness while remaining accessible and engaging for a broad membership base.',
    'Focused on restraint and precision. Built the identity around clean typography, structured layouts, and a muted colour palette that signals institutional credibility. The website was designed for clarity of information and ease of navigation.',
    'Delivered the full brand identity including logo, typography system, colour palette, and brand guidelines. Designed and built the website with content management. Created templates for reports, presentations, and social communications.',
    'The brand has been adopted across all organisational communications and is used in engagements with government ministers, industry leaders, and public-facing campaigns.',
    '[{"value":"1","label":"Complete Brand System"},{"value":"1","label":"Website Launched"},{"value":"3","label":"Communication Templates"}]'::jsonb
  ),
  (
    (SELECT id FROM project_data WHERE slug = 'kavlr-product'),
    'Kavlr is a digital booking and management platform for the beauty and wellness industry. The project covered end-to-end product design from booking flows to business dashboards.',
    'The beauty and wellness market needed a modern booking platform that served both customers making appointments and businesses managing their operations. Existing solutions were outdated or overly complex.',
    'Design an intuitive product that simplifies booking for customers while giving businesses powerful management tools in a clean, modern interface.',
    'Mapped the full user journey for both customers and business owners. Prioritised simplicity in the booking flow and depth in the management dashboard. Built a responsive design system that works across devices.',
    'Delivered the complete product design including customer booking flow, business dashboard, client management system, calendar integration, and a mobile-responsive design system with component library.',
    'The platform launched with positive reception in the beauty industry. The design system enabled rapid iteration and feature development post-launch.',
    '[{"value":"1","label":"Product Launched"},{"value":"2","label":"User Journeys Mapped"},{"value":"1","label":"Design System Built"}]'::jsonb
  ),
  (
    (SELECT id FROM project_data WHERE slug = 'syntech-brand'),
    'Syntech Biofuel is a sustainable biofuel company transforming waste into clean energy across Africa and the Middle East. The project combined brand identity design with 3D campaign visuals.',
    'Syntech needed to establish market credibility in the sustainable energy sector. The brand had to communicate innovation and environmental responsibility while differentiating from competitors.',
    'Create a brand identity and campaign that positions Syntech as a leader in sustainable biofuel, appealing to both investors and industry partners.',
    'Built the identity around themes of transformation and sustainability. Used 3D visualisation to create striking campaign imagery that communicates the science and scale of biofuel production.',
    'Delivered the full brand identity, 3D campaign visuals, marketing collateral, and presentation materials for investor and partner communications.',
    'The brand identity has been adopted across all company communications and investor materials, helping to establish Syntech''s market position in the sustainable energy sector.',
    '[{"value":"1","label":"Brand Identity"},{"value":"1","label":"3D Campaign"},{"value":"2","label":"Markets Targeted"}]'::jsonb
  );

-- Insert Pages
INSERT INTO pages (slug, title, content) VALUES
  (
    'home',
    'Home',
    '{
      "hero_eyebrow": "DESIGN LEADER",
      "hero_title": "Justin Ukaegbu",
      "hero_bio": "Brand, product, and interaction design across 12+ years and 50+ countries. Building design systems and digital products that work at scale.",
      "stat_1_value": "1.1B",
      "stat_1_label": "Impressions",
      "stat_2_value": "50+",
      "stat_2_label": "Countries",
      "stat_3_value": "12+",
      "stat_3_label": "Years",
      "stat_4_value": "200+",
      "stat_4_label": "Projects",
      "about_preview_title": "Twelve years across brand, product, and interaction design",
      "about_preview_text": "Practice shaped across Nigeria, the UK, Dubai, and work in fifty countries. Building design systems and digital products that work at scale. Now focused on products that combine design, technology, and learning.",
      "cta_title": "Available for the right work",
      "cta_text": "Design leadership, product collaboration, research partnerships, and speaking."
    }'::jsonb
  ),
  (
    'about',
    'About',
    '{
      "hero_eyebrow": "ABOUT",
      "hero_title": "Justin Ukaegbu",
      "intro_1": "Designer working across brand, product, and interaction design. Twelve years of practice shaped across Nigeria, the UK, Dubai, and work in fifty countries.",
      "intro_2": "Built platforms used by hundreds of thousands. Designed campaigns that reached 1.1 billion impressions. Led brand work for organisations operating at government level.",
      "intro_3": "Now focused on building products that combine design, technology, and learning. Also running Art Director Studio, a platform for creative direction work.",
      "story_1": "Started in Nigeria, studied in the UK, and worked across the Middle East and Europe. Early career covered print, brand identity, and editorial design before shifting into digital product and interaction work.",
      "story_2": "Take Back The Mic was a defining project. Three seasons of brand, digital product, interactive festival, and campaign work spanning virtual environments, crypto rewards, and a Mastercard partnership. The campaign reached over 1.1 billion impressions across 50+ countries and earned a Webby nomination in 2023.",
      "story_3": "In the UK, created the brand identity, website, and communications design for Route to Zero, a business-led membership organisation operating at government level, engaging Westminster and industry leaders on net zero policy.",
      "story_4": "Holds an MA in Graphic Design (Distinction) from University of Hertfordshire and B.Sc. in Computer Science and Education from Enugu University of Science and Technology. Member of Chartered Society of Designers and Design Research Society."
    }'::jsonb
  ),
  (
    'contact',
    'Contact',
    '{
      "hero_eyebrow": "GET IN TOUCH",
      "hero_title": "Let''s work together",
      "hero_subtitle": "Open to new projects, collaborations, and conversations. Interested in design leadership, product work, and research partnerships.",
      "email": "mrjustinukaegbu@gmail.com",
      "phone": "+44 7577 627621",
      "linkedin": "https://linkedin.com/in/justin-ukaegbu",
      "location": "London, United Kingdom"
    }'::jsonb
  ),
  (
    'work',
    'Work',
    '{
      "hero_eyebrow": "DESIGN ACROSS BRANDS",
      "hero_title": "Work",
      "hero_subtitle": "Design leadership and creative direction across brand identity, digital product, campaign, and interaction design. Explore the clients and brands below."
    }'::jsonb
  );

-- Insert Site Settings
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Justin Ukaegbu'),
  ('site_tagline', 'Design Leader'),
  ('contact_email', 'mrjustinukaegbu@gmail.com');

-- Insert Social Links
INSERT INTO social_links (platform, url, sort_order, is_visible) VALUES
  ('LinkedIn', 'https://linkedin.com/in/justin-ukaegbu', 1, true),
  ('Twitter', 'https://twitter.com/mrjustinukaegbu', 2, true);

-- Insert Navigation Items
INSERT INTO nav_items (label, href, sort_order, is_visible) VALUES
  ('Work', '/work', 1, true),
  ('About', '/about', 2, true),
  ('Contact', '/contact', 3, true);
