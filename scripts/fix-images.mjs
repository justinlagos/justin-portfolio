/**
 * Fix image-to-brand assignments in the database.
 *
 * Every brand now has its own folder under public/assets/projects/:
 *   access-bank/   — Access Bank branding & logo
 *   hashit/        — HashiT app screens
 *   kavlr/         — Kavlr website, cards, packaging
 *   route-to-zero/ — Route to Zero brand identity
 *   syntech/       — Syntech Biofuel social, truck, logo
 *   tbtm/          — TBTM (Take Back the Mic) only
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
  console.log('Fixing image-to-brand assignments...\n');

  // ── 1. Update project featured_image paths ──
  await sql`UPDATE projects SET featured_image = '/assets/projects/tbtm/reachout.png' WHERE slug = 'tbtm-brand-campaign'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/access-bank/branding.png' WHERE slug = 'tbtm-access-bank'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/route-to-zero/img01_7aa7926323.jpg' WHERE slug = 'route-to-zero-brand' OR slug = 'route-to-zero'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/kavlr/landing-page.png' WHERE slug = 'kavlr-product'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/syntech/social-design.png' WHERE slug = 'syntech-brand'`;
  await sql`UPDATE projects SET featured_image = NULL WHERE slug = 'tryba-product'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/hashit/app.png' WHERE slug = 'hashit-app'`;

  console.log('Project featured_image paths updated.');

  // ── 2. Update brand featured_image paths ──
  await sql`UPDATE brands SET featured_image = '/assets/projects/tbtm/reachout.png' WHERE slug = 'take-back-the-mic'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/access-bank/branding.png' WHERE slug = 'access-bank'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/route-to-zero/img01_7aa7926323.jpg' WHERE slug = 'route-to-zero'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/kavlr/landing-page.png' WHERE slug = 'kavlr'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/syntech/social-design.png' WHERE slug = 'syntech-biofuel'`;
  await sql`UPDATE brands SET featured_image = NULL WHERE slug = 'tryba'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/hashit/app.png' WHERE slug = 'hashit'`;

  console.log('Brand featured_image paths updated.');

  // ── 3. Clear existing project_media ──
  await sql`DELETE FROM project_media`;

  // ── 4. Insert project_media rows — each image in its own brand folder ──
  await sql`
    WITH project_data AS (
      SELECT slug, id FROM projects
    )
    INSERT INTO project_media (project_id, image_url, alt_text, is_cover, sort_order) VALUES
      -- TBTM Brand Campaign
      ((SELECT id FROM project_data WHERE slug = 'tbtm-brand-campaign'), '/assets/projects/tbtm/reachout.png', 'Reachout Medical agency worker handbook', true, 1),

      -- Access Bank
      ((SELECT id FROM project_data WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/branding.png', 'Access Bank brand guide', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'tbtm-access-bank'), '/assets/projects/access-bank/logo.png', 'Access Bank x Diamond merger logo', false, 2),

      -- Kavlr Product
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/landing-page.png', 'Kavlr landing page design', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/dashboard.png', 'Kavlr booking dashboard', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/desktop-1.png', 'Kavlr business banking page', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/desktop-2.png', 'Kavlr desktop landing page', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/booking-1.png', 'Kavlr mobile booking flow', false, 5),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/mobile.png', 'Kavlr mobile screens', false, 6),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/logo.png', 'Kavlr logo sketches', false, 7),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/card-green.png', 'Kavlr green VISA card in mailer', false, 8),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/card-black.png', 'Kavlr black VISA card', false, 9),
      ((SELECT id FROM project_data WHERE slug = 'kavlr-product'), '/assets/projects/kavlr/debit-cards.png', 'Kavlr blue and green VISA debit cards', false, 10),

      -- Syntech Brand
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-design.png', 'Syntech Biofuel Instagram profile mockup', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/truck.png', 'Syntech Biofuel branded truck', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/logo.png', 'Syntech Biofuel logo', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-1.jpg', 'Syntech decarbonise social post', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-2.jpg', 'Syntech sustainability social post', false, 5),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-grid-1.png', 'Syntech social media grid 1', false, 6),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-grid-2.png', 'Syntech social media grid 2', false, 7),
      ((SELECT id FROM project_data WHERE slug = 'syntech-brand'), '/assets/projects/syntech/social-grid-3.png', 'Syntech social media grid 3', false, 8),

      -- HashIT App
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/app.png', 'HashIT app dashboard and quick actions', true, 1),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/appstore-1.png', 'HashIT app store screenshot 1', false, 2),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/appstore-2.png', 'HashIT social features', false, 3),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/crowdpool.png', 'HashIT crowdpool feature', false, 4),
      ((SELECT id FROM project_data WHERE slug = 'hashit-app'), '/assets/projects/hashit/navigation.png', 'HashIT navigation close-up', false, 5),

      -- Route to Zero
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img01_7aa7926323.jpg', 'Route to Zero hero landscape', true, 1),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img02_2b4f266ae1.jpg', 'Route to Zero logo sketch', false, 2),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img03_55dedd27fb.jpg', 'Route to Zero logo construction', false, 3),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img04_b71d9e79a2.jpg', 'Route to Zero final mark', false, 4),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img05_dcd709fa54.png', 'Route to Zero colour palette', false, 5),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img11_9f9fbbbc01.jpg', 'Route to Zero website desktop', false, 6),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img15_2d1459d41a.jpg', 'Route to Zero business cards', false, 7),
      ((SELECT id FROM project_data WHERE slug IN ('route-to-zero-brand','route-to-zero') LIMIT 1), '/assets/projects/route-to-zero/img18_4f3be5af84.jpg', 'Route to Zero vehicle livery', false, 8)
  `;

  console.log('Project media rows inserted.');

  // ── 5. Verify ──
  const brands = await sql`SELECT slug, featured_image FROM brands ORDER BY slug`;
  console.log('\nBrand → featured_image:');
  for (const b of brands) {
    console.log(`  ${b.slug} → ${b.featured_image || '(none)'}`);
  }

  const projects = await sql`SELECT slug, featured_image FROM projects ORDER BY slug`;
  console.log('\nProject → featured_image:');
  for (const p of projects) {
    console.log(`  ${p.slug} → ${p.featured_image || '(none)'}`);
  }

  const media = await sql`
    SELECT p.slug, pm.image_url
    FROM project_media pm
    JOIN projects p ON p.id = pm.project_id
    ORDER BY p.slug, pm.sort_order
  `;
  console.log('\nProject media assignments:');
  let currentSlug = '';
  for (const m of media) {
    if (m.slug !== currentSlug) {
      currentSlug = m.slug;
      console.log(`\n  ${m.slug}:`);
    }
    console.log(`    ${m.image_url}`);
  }

  console.log('\n\nDone! All image assignments corrected.');
}

run().catch((err) => {
  console.error('Fix failed:', err);
  process.exit(1);
});
