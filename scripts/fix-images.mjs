/**
 * Fix missing images in the live database.
 *
 * Updates project featured_image paths and inserts project_media rows
 * so gallery images appear on the deployed site.
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
  console.log('Fixing image paths...');

  // ── 1. Update project featured_image paths ──
  await sql`UPDATE projects SET featured_image = '/assets/projects/tbtm/social-design.png' WHERE slug = 'tbtm-brand-campaign'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/tbtm/debit-cards.png' WHERE slug = 'tbtm-access-bank'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/route-to-zero/img01_7aa7926323.jpg' WHERE slug = 'route-to-zero-brand' OR slug = 'route-to-zero'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/kavlr/landing-page.png' WHERE slug = 'kavlr-product'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/syntech/truck.png' WHERE slug = 'syntech-brand'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/tryba/card-green.png' WHERE slug = 'tryba-product'`;
  await sql`UPDATE projects SET featured_image = '/assets/projects/hashit/app.png' WHERE slug = 'hashit-app'`;

  console.log('Project featured_image paths updated.');

  // ── 1b. Update brand featured_image paths ──
  await sql`UPDATE brands SET featured_image = '/assets/projects/tbtm/social-design.png' WHERE slug = 'take-back-the-mic'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/route-to-zero/img01_7aa7926323.jpg' WHERE slug = 'route-to-zero'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/kavlr/landing-page.png' WHERE slug = 'kavlr'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/syntech/truck.png' WHERE slug = 'syntech-biofuel'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/tryba/card-green.png' WHERE slug = 'tryba'`;
  await sql`UPDATE brands SET featured_image = '/assets/projects/hashit/app.png' WHERE slug = 'hashit'`;

  console.log('Brand featured_image paths updated.');

  // ── 2. Clear existing project_media (safe — it was empty) ──
  await sql`DELETE FROM project_media`;

  // ── 3. Insert project_media rows ──
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
  console.log('');
  console.log('Done! All image paths fixed.');
}

run().catch((err) => {
  console.error('Fix failed:', err);
  process.exit(1);
});
