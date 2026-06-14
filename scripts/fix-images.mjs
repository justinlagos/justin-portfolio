/**
 * Comprehensive portfolio fix script.
 *
 * Fixes ALL brand descriptions, project copy, image assignments,
 * and case study content in the live database.
 *
 * What this script does:
 *   1. Creates Access Bank as its own brand (was incorrectly nested under TBTM)
 *   2. Updates all brand descriptions and featured images
 *   3. Updates all project descriptions, services, and featured images
 *   4. Rewrites case study copy (no em dashes, no cliches, no overclaiming)
 *   5. Clears and repopulates project_media with correct image assignments
 *   6. Removes the Ranger-branded truck from Syntech
 *   7. Fixes Kavlr description (fintech, not beauty/wellness)
 *
 * Run with:  node --env-file=.env.local scripts/fix-images.mjs
 */

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function run() {
  console.log('Starting comprehensive portfolio fix...\n');

  // ──────────────────────────────────────────────
  // 1. CREATE ACCESS BANK AS ITS OWN BRAND
  // ──────────────────────────────────────────────
  console.log('1. Setting up Access Bank as independent brand...');

  // Check if access-bank brand already exists
  const existing = await sql`SELECT id FROM brands WHERE slug = 'access-bank'`;
  let accessBankId;

  if (existing.length === 0) {
    const result = await sql`
      INSERT INTO brands (name, slug, description, long_description, featured_image, is_featured, sort_order, hero_color)
      VALUES (
        'Access Bank',
        'access-bank',
        'Brand identity for the Access Bank and Diamond Bank merger, the largest bank merger in African history.',
        'New brand mark, guidelines, and brand application system for the merged entity. Included the Access Closa agent banking sub-brand and national print advertising.',
        '/assets/projects/access-bank/brand-guide.png',
        true,
        5,
        NULL
      )
      RETURNING id
    `;
    accessBankId = result[0].id;
    console.log('  Created Access Bank brand.');
  } else {
    accessBankId = existing[0].id;
    await sql`
      UPDATE brands SET
        name = 'Access Bank',
        description = 'Brand identity for the Access Bank and Diamond Bank merger, the largest bank merger in African history.',
        long_description = 'New brand mark, guidelines, and brand application system for the merged entity. Included the Access Closa agent banking sub-brand and national print advertising.',
        featured_image = '/assets/projects/access-bank/brand-guide.png',
        is_featured = true,
        sort_order = 5
      WHERE slug = 'access-bank'
    `;
    console.log('  Updated existing Access Bank brand.');
  }

  // Move the tbtm-access-bank project to the Access Bank brand
  await sql`
    UPDATE projects SET
      brand_id = ${accessBankId},
      title = 'Brand Identity',
      summary = 'Brand identity for the Access Bank and Diamond Bank merger. New logo mark, brand guidelines, and the Access Closa agent banking sub-brand.',
      services = 'Brand Identity, Guidelines, Print Advertising',
      featured_image = '/assets/projects/access-bank/brand-guide.png',
      type = 'case-study'
    WHERE slug = 'tbtm-access-bank'
  `;
  console.log('  Moved Access Bank project from TBTM.');

  // ──────────────────────────────────────────────
  // 2. UPDATE ALL BRAND DESCRIPTIONS AND IMAGES
  // ──────────────────────────────────────────────
  console.log('\n2. Updating brand descriptions and featured images...');

  // TBTM: keep but note it has limited image assets
  await sql`
    UPDATE brands SET
      description = 'Pan-African music competition spanning 50+ countries. Three seasons of brand, digital product, and campaign work backed by MTN and partnered with Mastercard.',
      long_description = 'Brand identity, digital product, interactive festival experience, and multi-platform campaign design. Investor presentations and partnership collateral for Mastercard integration.',
      featured_image = NULL,
      is_featured = false,
      sort_order = 8
    WHERE slug = 'take-back-the-mic'
  `;

  // Route to Zero
  await sql`
    UPDATE brands SET
      description = 'Brand identity, website, and communications for a business-led net zero membership organisation engaging Westminster and industry leaders.',
      long_description = 'Complete brand system including tiered certification logos, responsive website, stylescape development, and communication templates for government and public-facing campaigns.',
      featured_image = '/assets/projects/route-to-zero/logo-branding.png',
      is_featured = true,
      sort_order = 4
    WHERE slug = 'route-to-zero'
  `;

  // Kavlr: FIXED - fintech, not beauty/wellness
  await sql`
    UPDATE brands SET
      description = 'Visa debit card design, packaging, and product UI for a UK multicurrency fintech platform.',
      long_description = 'Three card tiers (green personal, blue variant, black business), wallet-style packaging with unboxing experience, responsive website, and pre-order flow. Kavlr is the consumer product of Tryba Finance.',
      featured_image = '/assets/projects/kavlr/pdf-debit-cards.png',
      is_featured = true,
      sort_order = 3
    WHERE slug = 'kavlr'
  `;

  // Syntech: FIXED - removed truck reference, expanded scope
  await sql`
    UPDATE brands SET
      description = 'Full brand identity for a UK biofuel company. Logo system, sub-brands, social media, printed collateral, vehicle livery, site signage, and environmental design.',
      long_description = 'Brand system spanning Syntech Biofuel and sub-brands BioCabby, Liquid Gold, and Route to Zero. Deliverables include social media icon sets, tri-fold brochures, concept petrol station rendering, wayfinding signage for Kingsnorth Industrial Estate, vehicle fleet livery, and office fascia design.',
      featured_image = '/assets/projects/syntech/brochure-cover.jpg',
      is_featured = true,
      sort_order = 2
    WHERE slug = 'syntech-biofuel'
  `;

  // Sparkle: now has images from the brand-proposal PDF
  await sql`
    UPDATE brands SET
      description = 'Full brand identity for a Nigerian digital banking platform. Positioning, visual system, guidelines, app UI, and merchandise. Raised $3M in funding.',
      long_description = 'Brand positioning, logo construction, 30+ page brand guidelines covering colour, typography, photography, signage, icons, and merchandise. Mobile app UI (login, dashboard, payment flow) and responsive website. Social following grew from zero to 10K+ at launch. 12,320 accounts opened in year one.',
      featured_image = '/assets/projects/sparkle/pdf-brand-overview.png',
      is_featured = true,
      sort_order = 1
    WHERE slug = 'sparkle'
  `;

  // Tryba
  await sql`
    UPDATE brands SET
      description = 'Card packaging and pre-order UI for a multicurrency trading and crypto banking platform.',
      long_description = 'Tryba Finance is the parent company behind the Kavlr consumer product. Work included the green Visa personal card packaging with tri-fold activation mailer.',
      featured_image = '/assets/projects/tryba/pdf-visa-green.png',
      is_featured = false,
      sort_order = 7
    WHERE slug = 'tryba'
  `;

  // HashiT
  await sql`
    UPDATE brands SET
      description = 'Brand identity, waitlist site, mobile app UI, social media content, and merchandise for a Nigerian fintech app.',
      long_description = 'Complete brand build from logo to product. Waitlist landing page (light and dark mode), full website, social media posts, merchandise (t-shirts, trucker caps), and mobile app dashboard with feature iteration. Justin served as VP Product Development.',
      featured_image = '/assets/projects/hashit/pdf-social-media.png',
      is_featured = true,
      sort_order = 6
    WHERE slug = 'hashit'
  `;

  // Polo Luxury: now has proper images
  await sql`
    UPDATE brands SET
      description = 'Campaign design and email marketing for Nigeria''s leading luxury retailer. Omega Seamaster 007 Edition launch and seasonal campaigns.',
      long_description = 'Email campaign for the Omega Seamaster Diver 300M 007 Edition (desktop and mobile), seasonal campaign graphics including editorial-style Easter poster with gold-yellow branding, and fashion photography composites.',
      featured_image = '/assets/projects/polo-luxury/campaign-stay-home.jpg',
      is_featured = false,
      sort_order = 9
    WHERE slug = 'polo-luxury'
  `;

  // EasyJet: no source images available
  await sql`
    UPDATE brands SET
      description = 'Visual design and campaign work for the European airline.',
      is_featured = false,
      is_visible = false,
      sort_order = 11
    WHERE slug = 'easyjet'
  `;

  // Vulta: no source images available
  await sql`
    UPDATE brands SET
      description = 'Digital product design for an energy and utilities platform.',
      is_featured = false,
      is_visible = false,
      sort_order = 12
    WHERE slug = 'vulta'
  `;

  console.log('  All brand descriptions and images updated.');

  // ──────────────────────────────────────────────
  // 3. UPDATE ALL PROJECT DESCRIPTIONS
  // ──────────────────────────────────────────────
  console.log('\n3. Updating project descriptions...');

  await sql`
    UPDATE projects SET
      title = 'Brand and Campaign',
      summary = 'Brand identity, digital product, and interactive platform for a pan-African music competition reaching 50+ countries.',
      featured_image = NULL
    WHERE slug = 'tbtm-brand-campaign'
  `;

  await sql`
    UPDATE projects SET
      title = 'Brand Identity and Website',
      summary = 'Brand identity with tiered certification system, responsive website, and communication templates for government and industry engagement.',
      services = 'Brand Identity, Web Design, Communications, Certification System',
      featured_image = '/assets/projects/route-to-zero/logo-branding.png'
    WHERE slug = 'route-to-zero-brand'
  `;

  await sql`
    UPDATE projects SET
      title = 'Card Design and Product UI',
      summary = 'Visa debit card design across three tiers, card packaging, responsive website, and pre-order flow for a multicurrency fintech platform.',
      services = 'Card Design, Packaging, Product Design, UX/UI',
      featured_image = '/assets/projects/kavlr/pdf-debit-cards.png'
    WHERE slug = 'kavlr-product'
  `;

  await sql`
    UPDATE projects SET
      title = 'Brand Identity and Implementation',
      summary = 'Full brand system including logo, sub-brands (BioCabby, Liquid Gold), social media, printed collateral, vehicle livery, site signage, and environmental design.',
      services = 'Brand Identity, Sub-brands, Social Media, Print, Environmental Design, Signage',
      featured_image = '/assets/projects/syntech/brochure-cover.jpg'
    WHERE slug = 'syntech-brand'
  `;

  await sql`
    UPDATE projects SET
      title = 'Card Packaging',
      summary = 'Visa personal card packaging with tri-fold activation mailer for a multicurrency trading platform.',
      services = 'Packaging Design, Print',
      featured_image = '/assets/projects/tryba/pdf-visa-green.png'
    WHERE slug = 'tryba-product'
  `;

  await sql`
    UPDATE projects SET
      title = 'Brand and Product Design',
      summary = 'Logo identity, waitlist landing page, full website, mobile app UI, social media content, merchandise, and pitch deck. VP Product Development role.',
      services = 'Brand Identity, Product Design, UX/UI, Social Media, Merchandise, Pitch Deck',
      featured_image = '/assets/projects/hashit/pdf-social-media.png'
    WHERE slug = 'hashit-app'
  `;

  await sql`
    UPDATE projects SET
      title = 'Brand Design',
      summary = 'Full brand identity including positioning, 30+ page guidelines, logo construction, app UI, website, and merchandise. The brand raised $3M in funding.',
      services = 'Brand Identity, Brand Guidelines, App UI, Website, Merchandise',
      featured_image = '/assets/projects/sparkle/pdf-brand-overview.png',
      type = 'case-study'
    WHERE slug = 'sparkle-brand'
  `;

  await sql`
    UPDATE projects SET
      title = 'Campaign and Email Design',
      summary = 'Omega Seamaster 007 Edition email campaign (desktop and mobile), seasonal campaign graphics, and editorial fashion photography.',
      services = 'Email Design, Campaign, Editorial Photography',
      featured_image = '/assets/projects/polo-luxury/campaign-stay-home.jpg',
      type = 'case-study'
    WHERE slug = 'polo-luxury-brand'
  `;

  console.log('  All project descriptions updated.');

  // ──────────────────────────────────────────────
  // 4. UPDATE CASE STUDY COPY
  // ──────────────────────────────────────────────
  console.log('\n4. Updating case study copy...');

  // Delete existing case studies for projects that didn't have them, then upsert all
  // First update existing ones
  await sql`
    UPDATE case_studies SET
      overview = 'Take Back The Mic is a pan-African music competition that ran for three seasons across 50+ countries. The project required brand identity, digital product, interactive festival design, and campaign work across multiple platforms and partnerships.',
      context = 'MTN-backed and Mastercard-partnered, TBTM needed a design system that could scale across dozens of countries, languages, and cultural contexts.',
      objective = 'Create a cohesive brand and product system for a competition reaching millions across Africa, with digital-first experiences spanning voting platforms, virtual festivals, and social campaigns.',
      approach = 'Built a flexible identity system with modular components that adapt across print, digital, social, and environmental applications. Designed the interactive festival platform and voting system alongside campaign rollouts.',
      execution = 'Delivered brand guidelines, digital product design, interactive festival experience, social media systems, Mastercard partnership collateral, and campaign assets across three seasons.',
      outcome = 'The campaign reached 1.1 billion media impressions across 50+ countries. The interactive festival was nominated for a Webby Award in 2023.',
      metrics = '[{"value":"1.1B","label":"Media Impressions"},{"value":"50+","label":"Countries"},{"value":"3","label":"Seasons"}]'
    WHERE project_id = (SELECT id FROM projects WHERE slug = 'tbtm-brand-campaign')
  `;

  await sql`
    UPDATE case_studies SET
      overview = 'Route to Zero is a business-led membership organisation that engages Westminster and industry leaders on net zero policy. The brand needed to convey institutional authority without defaulting to generic environmental imagery.',
      context = 'The organisation operates at government level. The brand had to read as credible in policy documents and parliamentary settings, not just marketing materials.',
      objective = 'Design a brand identity and website that communicates policy-level seriousness while remaining accessible for a broad membership base.',
      approach = 'Built the identity around restraint and precision. Clean typography, structured layouts, and a muted colour palette that signals credibility. A tiered certification system (Tier 1/2/3 with star ratings) provides visual shorthand for membership levels.',
      execution = 'Delivered the logo with tiered certification marks, typography system, colour palette, brand guidelines, responsive website, stylescape, email signature system, and templates for reports, presentations, and social communications.',
      outcome = 'The brand is used across all organisational communications, including engagements with government ministers and industry leaders.',
      metrics = '[{"value":"1","label":"Brand System"},{"value":"3","label":"Certification Tiers"},{"value":"1","label":"Website"}]'
    WHERE project_id = (SELECT id FROM projects WHERE slug = 'route-to-zero-brand')
  `;

  await sql`
    UPDATE case_studies SET
      overview = 'Kavlr is the consumer product of Tryba Finance, a UK fintech offering multicurrency trading and crypto banking. The project centred on making the debit card feel premium and the digital experience feel trustworthy.',
      context = 'The fintech market is saturated with cards that look interchangeable. Kavlr needed physical product design that felt premium alongside a digital experience that earned trust from first contact.',
      objective = 'Design the Visa debit card product across multiple tiers, create packaging for physical card delivery, and design the website and pre-order flow.',
      approach = 'Started with the card as the hero product. Three tiers, each with distinct character. Packaging designed as an unboxing moment. The website builds from card imagery outward.',
      execution = 'Three Visa debit card designs: green personal, blue/purple variant, and black Business card with gold detailing. The Business card ships in a wallet-style package with a "Pull Up The Card" unboxing moment. The Personal card uses a tri-fold mailer with activation instructions. Responsive website across desktop, tablet, and mobile. Logo development documented from sketches to final mark.',
      outcome = 'Production-ready card designs and packaging mockups. The responsive website demonstrates consistent visual quality across all breakpoints.',
      metrics = '[{"value":"3","label":"Card Tiers"},{"value":"2","label":"Packaging Formats"},{"value":"1","label":"Responsive Website"}]'
    WHERE project_id = (SELECT id FROM projects WHERE slug = 'kavlr-product')
  `;

  await sql`
    UPDATE case_studies SET
      overview = 'Syntech Biofuel produces renewable fuel from waste organic oils at their facility in Kent. The brand system needed to work across an unusually wide range: social media, investor presentations, event materials, vehicle fleets, site wayfinding, and building exteriors.',
      context = 'Most brand projects stay within print and digital. Syntech required environmental design, vehicle livery, architectural signage, and wayfinding alongside the standard deliverables.',
      objective = 'Create a unified identity for Syntech and its sub-brands (BioCabby, Liquid Gold, Route to Zero) that reads as professional in boardrooms, at trade events, and on the side of a tanker.',
      approach = 'A three-leaf/turbine logo mark in green anchors the identity. Sub-brand logos follow the parent system while carrying their own character. The social media icon set was developed from hand-drawn sketches through to finished tiles.',
      execution = 'Logo system with sub-brands. Social media icon set covering 9 USP categories (Fuel Security, Accredited Sustainability, Lower Emissions, Quality Assured, Secured Pricing, Environmentally Friendly, Drop-in Fuel, Reduced Carbon Footprint, Produced in UK). Tri-fold SMART brochure, rollup banners, concept petrol station rendering, wayfinding system for Kingsnorth Industrial Estate, vehicle fleet livery, and office fascia with illuminated lettering.',
      outcome = 'One of the most comprehensive brand implementations in the portfolio. The work spans from social tiles to building facades, all under one coherent system.',
      metrics = '[{"value":"4","label":"Brand Marks"},{"value":"9","label":"USP Icons"},{"value":"3","label":"Vehicle Types"}]'
    WHERE project_id = (SELECT id FROM projects WHERE slug = 'syntech-brand')
  `;

  // Insert case studies for projects that don't have them yet
  const accessBankCS = await sql`SELECT id FROM case_studies WHERE project_id = (SELECT id FROM projects WHERE slug = 'tbtm-access-bank')`;
  if (accessBankCS.length === 0) {
    await sql`
      INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics)
      VALUES (
        (SELECT id FROM projects WHERE slug = 'tbtm-access-bank'),
        'When Access Bank acquired Diamond Bank, it created the largest banking merger in African history. The combined entity needed a new visual identity that honoured both legacies.',
        'Diamond Bank was a strong retail powerhouse. Access Bank was a formidable corporate banking force. The brief was to consolidate these two brands and build momentum for the new entity.',
        'Develop the merged brand identity: new logo mark, brand guidelines, and brand application system.',
        'The new Access mark integrates the geometric diamond icon from Diamond Bank into the Access identity, creating continuity for customers of both institutions.',
        'Brand guidelines book titled "more than banking: a guide to our brand" covering the brand snapshot, colour palette, typography, tone of voice, and photography direction. Interior guideline spreads with systematic brand standards. Access Closa agent banking sub-brand with national print advertising in newspapers.',
        'The brand identity was adopted across all branches and communications of the merged entity.',
        '[{"value":"1","label":"Merged Identity"},{"value":"1","label":"Sub-brand (Closa)"},{"value":"1","label":"Guidelines Book"}]'
      )
    `;
    console.log('  Created Access Bank case study.');
  } else {
    await sql`
      UPDATE case_studies SET
        overview = 'When Access Bank acquired Diamond Bank, it created the largest banking merger in African history. The combined entity needed a new visual identity that honoured both legacies.',
        context = 'Diamond Bank was a strong retail powerhouse. Access Bank was a formidable corporate banking force. The brief was to consolidate these two brands and build momentum for the new entity.',
        objective = 'Develop the merged brand identity: new logo mark, brand guidelines, and brand application system.',
        approach = 'The new Access mark integrates the geometric diamond icon from Diamond Bank into the Access identity, creating continuity for customers of both institutions.',
        execution = 'Brand guidelines book titled "more than banking: a guide to our brand" covering the brand snapshot, colour palette, typography, tone of voice, and photography direction. Interior guideline spreads with systematic brand standards. Access Closa agent banking sub-brand with national print advertising in newspapers.',
        outcome = 'The brand identity was adopted across all branches and communications of the merged entity.',
        metrics = '[{"value":"1","label":"Merged Identity"},{"value":"1","label":"Sub-brand (Closa)"},{"value":"1","label":"Guidelines Book"}]'
      WHERE project_id = (SELECT id FROM projects WHERE slug = 'tbtm-access-bank')
    `;
  }

  // Sparkle case study
  const sparkleCS = await sql`SELECT id FROM case_studies WHERE project_id = (SELECT id FROM projects WHERE slug = 'sparkle-brand')`;
  if (sparkleCS.length === 0) {
    await sql`
      INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics)
      VALUES (
        (SELECT id FROM projects WHERE slug = 'sparkle-brand'),
        'Sparkle set out to be something different from the wave of Nigerian neobanks. Not another banking app with a gradient logo. A lifestyle proposition that happened to move money.',
        'The Nigerian fintech space was crowded with similar-looking products. Sparkle needed a brand that felt as considered as the product itself, while building trust with an audience wary of new financial platforms.',
        'Build the full brand from scratch: positioning, identity, verbal tone, visual system, and a brand application guide comprehensive enough that any designer touching the brand could stay on-system.',
        'The colour palette pairs green with orange and yellow gradients, moving away from the blues and purples that dominate Nigerian fintech. Typography runs Mont for headlines and Proxima Nova Alt for body.',
        'Custom logo with full construction grid and spacing system. 30+ page brand guidelines covering logo construction, colour use, photography direction, iconography, infographics, office signage, and merchandise (t-shirts, caps, lanyards, phone cases, polo shirts). App UI across login, dashboard, and payment flows. Responsive website for desktop and mobile.',
        'Sparkle raised $3 million in funding. Social following grew from zero to 10,000+ in the launch period. 12,320 accounts were opened in the first year.',
        '[{"value":"$3M","label":"Funding Raised"},{"value":"10K+","label":"Social Following"},{"value":"12,320","label":"Year One Accounts"}]'
      )
    `;
    console.log('  Created Sparkle case study.');
  }

  // Polo Luxury case study
  const poloCS = await sql`SELECT id FROM case_studies WHERE project_id = (SELECT id FROM projects WHERE slug = 'polo-luxury-brand')`;
  if (poloCS.length === 0) {
    await sql`
      INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics)
      VALUES (
        (SELECT id FROM projects WHERE slug = 'polo-luxury-brand'),
        'Polo Avenue is a Nigerian luxury retail brand selling high-end watches, fashion, and accessories. The work covers email campaigns and seasonal marketing for brands like Omega.',
        'Polo Luxury wanted to increase sales and brand awareness for the Omega Seamaster Diver 300M 007 Edition launch, timed with the James Bond "No Time to Die" release.',
        'Create a multi-format email campaign and seasonal campaign graphics that position Polo Avenue firmly in luxury territory.',
        'Used a red/black/silver colour story tied to the Bond partnership. Editorial-style photography with angular geometric framing for seasonal campaigns.',
        'Email campaign for the Omega Seamaster 007 Edition designed for both desktop and mobile. Seasonal Easter campaign with bold gold-yellow branding. Moody watchmaking macro photography. Fashion editorial composites.',
        'The editorial fashion poster and the dark watchmaking shot are among the strongest standalone images in the portfolio.',
        '[{"value":"1","label":"Email Campaign"},{"value":"3","label":"Seasonal Graphics"}]'
      )
    `;
    console.log('  Created Polo Luxury case study.');
  }

  // HashiT case study
  const hashitCS = await sql`SELECT id FROM case_studies WHERE project_id = (SELECT id FROM projects WHERE slug = 'hashit-app')`;
  if (hashitCS.length === 0) {
    await sql`
      INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics)
      VALUES (
        (SELECT id FROM projects WHERE slug = 'hashit-app'),
        'HashiT is a Nigerian fintech app combining banking, social features, marketplace, and earning tools. Justin served as VP Product Development, going beyond design into product strategy.',
        'The app needed everything built from scratch: identity, digital presence, product UI, marketing materials, and physical merchandise for brand awareness.',
        'Take a fintech concept from idea to waitlist to product: logo, website, app UI, social media, and merchandise.',
        'The logo is a stylised "h" monogram with a dot element, rendered white on dark backgrounds. The waitlist landing page in light and dark mode drove early signups.',
        'Logo identity, waitlist landing page (light + dark), full website with feature overview and FAQ, six social media posts on bold coloured backgrounds, merchandise (t-shirts, trucker caps), mobile app dashboard in light and dark mode with before/after iteration comparison.',
        '700 users on the waitlist at documentation.',
        '[{"value":"700","label":"Waitlist Users"},{"value":"2","label":"App Modes (Light/Dark)"},{"value":"6","label":"Social Posts"}]'
      )
    `;
    console.log('  Created HashiT case study.');
  }

  console.log('  All case studies updated.');

  // ──────────────────────────────────────────────
  // 5. CLEAR AND REPOPULATE PROJECT_MEDIA
  // ──────────────────────────────────────────────
  console.log('\n5. Repopulating project media...');

  await sql`DELETE FROM project_media`;

  await sql`
    WITH p AS (SELECT slug, id FROM projects)
    INSERT INTO project_media (project_id, image_url, alt_text, is_cover, sort_order) VALUES

      -- ACCESS BANK (own brand now)
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/brand-guide.png', 'Access Bank brand guide - more than banking', true, 1),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/guideline-1.png', 'Access Bank brand guideline spread', false, 2),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/guideline-2.png', 'Access Bank colour and typography standards', false, 3),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/guideline-3.png', 'Access Bank brand application guide', false, 4),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/guideline-4.png', 'Access Bank photography and tone guidelines', false, 5),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/logo-mark.png', 'Access Bank merged logo mark', false, 6),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/newspaper-mockup.jpg', 'Access Closa newspaper advertisement', false, 7),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/pdf-merger-brief.png', 'Diamond/Access merger rebrand brief', false, 8),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/pdf-brand-guide-cover.png', 'Access Bank brand guide cover mockup', false, 9),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/photo-01.jpg', 'Access Bank branded materials', false, 10),
      ((SELECT id FROM p WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/photo-02.jpg', 'Access Bank branded collateral', false, 11),

      -- KAVLR
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/pdf-debit-cards.png', 'Kavlr green and blue Visa debit cards', true, 1),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/pdf-visa-black.png', 'Kavlr black Visa business card in hand', false, 2),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/pdf-packaging.png', 'Kavlr business card wallet-style packaging', false, 3),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/landingpage-hero.png', 'Kavlr landing page design', false, 4),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/website-desktop.png', 'Kavlr desktop website', false, 5),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/website-desktop-2.png', 'Kavlr desktop website inner page', false, 6),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/website-mobile.png', 'Kavlr mobile website', false, 7),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/phone-mockup.jpg', 'Kavlr app on iPhone close-up', false, 8),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/card-business.png', 'Kavlr black business card', false, 9),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/card-debit-green.png', 'Kavlr green debit card', false, 10),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/debit-cards.png', 'Kavlr blue and green debit cards', false, 11),
      ((SELECT id FROM p WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/logo-construction.png', 'Kavlr logo construction', false, 12),

      -- SYNTECH (NO truck.png - Ranger branded)
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/brochure-cover.jpg', 'Syntech Biofuel strategy document with UK pricing map', true, 1),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-logo.png', 'Syntech Biofuel logo on dark background', false, 2),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-biocabby.png', 'BioCabby sub-brand logo and London taxi livery', false, 3),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-liquid-gold.png', 'Liquid Gold biofuel label design and photography', false, 4),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-brochure.png', 'Syntech tri-fold SMART brochure', false, 5),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-petrol-station.png', 'Syntech concept petrol station rendering', false, 6),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-site-signs.png', 'Syntech wayfinding and site signage system', false, 7),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/pdf-strategy-doc.png', 'Syntech USP icon set from sketch to final', false, 8),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-design.png', 'Syntech Instagram profile mockup', false, 9),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-post-1.png', 'Syntech social media post', false, 10),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-post-2.png', 'Syntech social media post', false, 11),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-post-3.png', 'Syntech social media post', false, 12),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/brochure-spread.jpg', 'Syntech brochure interior spread', false, 13),
      ((SELECT id FROM p WHERE slug = 'syntech-brand'), '/assets/projects/syntech/artboard-social-1.jpg', 'Syntech social media artboard', false, 14),

      -- HASHIT
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-social-media.png', 'HashiT social media content grid', true, 1),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-logo.png', 'HashiT logo on dark background', false, 2),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-waitlist.png', 'HashiT waitlist landing page (light and dark)', false, 3),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-landing-page.png', 'HashiT full website design', false, 4),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-app-ui.png', 'HashiT mobile app dashboard UI', false, 5),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-app-iteration.png', 'HashiT app feature iteration (old vs new)', false, 6),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-merch.png', 'HashiT merchandise designs', false, 7),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/pdf-pitch-deck.png', 'HashiT investor pitch deck overview', false, 8),
      ((SELECT id FROM p WHERE slug = 'hashit-app'), '/assets/projects/hashit/app.png', 'HashiT app dashboard close-up', false, 9),

      -- ROUTE TO ZERO
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/logo-branding.png', 'Route to Zero logo and brand identity', true, 1),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/logo-construction.png', 'Route to Zero logo construction', false, 2),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/logo-construction-2.png', 'Route to Zero logo construction detail', false, 3),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/stylescape.png', 'Route to Zero visual stylescape', false, 4),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/website-full.png', 'Route to Zero responsive website', false, 5),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/website-home.png', 'Route to Zero website homepage', false, 6),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/website-inner.png', 'Route to Zero website inner page', false, 7),
      ((SELECT id FROM p WHERE slug = 'route-to-zero-brand'), '/assets/projects/route-to-zero/email-signature-mockup.png', 'Route to Zero email signature', false, 8),

      -- SPARKLE
      ((SELECT id FROM p WHERE slug = 'sparkle-brand'), '/assets/projects/sparkle/pdf-brand-overview.png', 'Sparkle complete brand system overview', true, 1),
      ((SELECT id FROM p WHERE slug = 'sparkle-brand'), '/assets/projects/sparkle/pdf-logo-construction.png', 'Sparkle logo construction and spacing', false, 2),
      ((SELECT id FROM p WHERE slug = 'sparkle-brand'), '/assets/projects/sparkle/pdf-brand-guidelines.png', 'Sparkle 30+ page brand guidelines', false, 3),
      ((SELECT id FROM p WHERE slug = 'sparkle-brand'), '/assets/projects/sparkle/pdf-case-study.png', 'Sparkle brand deliverables and outcomes', false, 4),

      -- TRYBA
      ((SELECT id FROM p WHERE slug = 'tryba-product'), '/assets/projects/tryba/pdf-visa-green.png', 'Tryba green Visa personal card in hand', true, 1),
      ((SELECT id FROM p WHERE slug = 'tryba-product'), '/assets/projects/tryba/pdf-packaging-green.png', 'Tryba card tri-fold activation mailer', false, 2),

      -- POLO LUXURY
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/campaign-stay-home.jpg', 'Polo Avenue Easter Stay Home campaign', true, 1),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/pdf-omega-hero.png', 'Omega Seamaster 007 Edition campaign hero', false, 2),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/pdf-omega-layout.png', 'Omega 007 campaign email layout', false, 3),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/pdf-omega-newsletter.png', 'Omega email newsletter desktop and mobile', false, 4),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/campaign-09.jpg', 'Polo Avenue campaign design', false, 5),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/campaign-10.jpg', 'Polo Avenue campaign design', false, 6),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/newsletter-1.png', 'Polo Luxury newsletter design', false, 7),
      ((SELECT id FROM p WHERE slug = 'polo-luxury-brand'), '/assets/projects/polo-luxury/newsletter-2.png', 'Polo Luxury newsletter design', false, 8)
  `;

  console.log('  All project media repopulated.');

  // ──────────────────────────────────────────────
  // 6. ADD ACCESS BANK TO CLIENTS LIST
  // ──────────────────────────────────────────────
  console.log('\n6. Updating clients list...');
  const clientExists = await sql`SELECT id FROM clients WHERE name = 'Access Bank'`;
  if (clientExists.length === 0) {
    await sql`INSERT INTO clients (name, sort_order, is_visible) VALUES ('Access Bank', 8, true)`;
  }

  // ──────────────────────────────────────────────
  // 7. VERIFY
  // ──────────────────────────────────────────────
  console.log('\n7. Verification...\n');

  const brands = await sql`SELECT slug, name, featured_image, is_featured, is_visible, sort_order FROM brands ORDER BY sort_order`;
  console.log('Brands:');
  for (const b of brands) {
    const status = b.is_featured ? 'FEATURED' : (b.is_visible ? 'visible' : 'HIDDEN');
    console.log(`  ${b.sort_order}. ${b.name} (${b.slug}) [${status}]`);
    console.log(`     Image: ${b.featured_image || '(none)'}`);
  }

  const projects = await sql`SELECT p.slug, p.title, p.featured_image, b.name as brand FROM projects p JOIN brands b ON b.id = p.brand_id ORDER BY b.sort_order, p.sort_order`;
  console.log('\nProjects:');
  for (const p of projects) {
    console.log(`  ${p.brand} > ${p.title} (${p.slug})`);
    console.log(`     Image: ${p.featured_image || '(none)'}`);
  }

  const mediaCount = await sql`SELECT COUNT(*) as count FROM project_media`;
  console.log(`\nTotal project_media rows: ${mediaCount[0].count}`);

  const caseStudyCount = await sql`SELECT COUNT(*) as count FROM case_studies`;
  console.log(`Total case studies: ${caseStudyCount[0].count}`);

  console.log('\nDone. All image assignments, descriptions, and case studies corrected.');
}

run().catch((err) => {
  console.error('Fix failed:', err);
  process.exit(1);
});
