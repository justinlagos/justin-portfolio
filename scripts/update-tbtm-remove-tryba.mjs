/**
 * Portfolio update: Remove Tryba, populate TBTM with I-Festival artwork.
 *
 * What this script does:
 *   1. Removes Tryba brand, project, media, and case study entirely
 *   2. Updates TBTM brand with a featured image from the new artwork
 *   3. Updates the tbtm-brand-campaign project with correct copy and featured image
 *   4. Populates project_media for tbtm-brand-campaign with 12 I-Festival images
 *   5. Updates the TBTM case study copy to reflect the festival work
 *
 * Run with:  node --env-file=.env.local scripts/update-tbtm-remove-tryba.mjs
 */

import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function run() {
  console.log('Starting TBTM update + Tryba removal...\n');

  // ──────────────────────────────────────────────
  // 1. REMOVE TRYBA COMPLETELY
  // ──────────────────────────────────────────────
  console.log('1. Removing Tryba...');

  // Get Tryba brand ID
  const tryba = await sql`SELECT id FROM brands WHERE slug = 'tryba'`;
  if (tryba.length > 0) {
    const trybaId = tryba[0].id;

    // Get all Tryba project IDs
    const trybaProjects = await sql`SELECT id, slug FROM projects WHERE brand_id = ${trybaId}`;
    console.log(`  Found ${trybaProjects.length} Tryba project(s): ${trybaProjects.map(p => p.slug).join(', ')}`);

    for (const proj of trybaProjects) {
      // Delete project_media
      const mediaDeleted = await sql`DELETE FROM project_media WHERE project_id = ${proj.id} RETURNING id`;
      console.log(`  Deleted ${mediaDeleted.length} media rows for ${proj.slug}`);

      // Delete case_studies
      const csDeleted = await sql`DELETE FROM case_studies WHERE project_id = ${proj.id} RETURNING id`;
      console.log(`  Deleted ${csDeleted.length} case study rows for ${proj.slug}`);
    }

    // Delete all Tryba projects
    const projsDeleted = await sql`DELETE FROM projects WHERE brand_id = ${trybaId} RETURNING slug`;
    console.log(`  Deleted ${projsDeleted.length} project(s): ${projsDeleted.map(p => p.slug).join(', ')}`);

    // Delete the brand itself
    await sql`DELETE FROM brands WHERE id = ${trybaId}`;
    console.log('  Deleted Tryba brand.');
  } else {
    console.log('  Tryba brand not found (already removed).');
  }

  // ──────────────────────────────────────────────
  // 2. UPDATE TBTM BRAND
  // ──────────────────────────────────────────────
  console.log('\n2. Updating TBTM brand...');

  await sql`
    UPDATE brands SET
      description = 'Pan-African music competition spanning 50+ countries. Three seasons of brand, digital product, and campaign work backed by MTN and partnered with Mastercard.',
      long_description = 'Brand identity, digital product, interactive festival experience, and multi-platform campaign design. Investor presentations and partnership collateral for Mastercard integration.',
      featured_image = '/assets/projects/tbtm/festival-flyer-2021.jpg',
      is_featured = true,
      sort_order = 8
    WHERE slug = 'take-back-the-mic'
  `;
  console.log('  Updated TBTM brand description and featured image.');

  // ──────────────────────────────────────────────
  // 3. UPDATE TBTM-BRAND-CAMPAIGN PROJECT
  // ──────────────────────────────────────────────
  console.log('\n3. Updating tbtm-brand-campaign project...');

  await sql`
    UPDATE projects SET
      title = 'I-Festival Campaign',
      summary = 'Campaign design for the TBTM Interactive Festival across 2021 and 2022. NYC Times Square billboards, speaker panels, event scheduling, and a Webby Award nomination.',
      services = 'Campaign Design, Event Branding, Billboard Advertising, Social Media',
      featured_image = '/assets/projects/tbtm/festival-flyer-2021.jpg',
      type = 'case-study'
    WHERE slug = 'tbtm-brand-campaign'
  `;
  console.log('  Updated project details.');

  // ──────────────────────────────────────────────
  // 4. POPULATE PROJECT MEDIA
  // ──────────────────────────────────────────────
  console.log('\n4. Populating project_media for tbtm-brand-campaign...');

  // Get the project ID
  const tbtmProject = await sql`SELECT id FROM projects WHERE slug = 'tbtm-brand-campaign'`;
  if (tbtmProject.length === 0) {
    console.error('  ERROR: tbtm-brand-campaign project not found!');
    process.exit(1);
  }
  const projectId = tbtmProject[0].id;

  // Clear existing media for this project
  const cleared = await sql`DELETE FROM project_media WHERE project_id = ${projectId} RETURNING id`;
  console.log(`  Cleared ${cleared.length} existing media rows.`);

  // Insert all 12 images in display order
  const tbtmImages = [
    { path: '/assets/projects/tbtm/festival-flyer-2021.jpg',       alt: '2021 I-Festival campaign flyer with full speaker lineup',        order: 1,  cover: true },
    { path: '/assets/projects/tbtm/nyc-billboard-01.jpg',           alt: 'NYC Times Square billboard placement',                          order: 2,  cover: false },
    { path: '/assets/projects/tbtm/nyc-billboard-05.jpg',           alt: 'NYC Times Square billboard with featured artist',                order: 3,  cover: false },
    { path: '/assets/projects/tbtm/nyc-billboard-08.jpg',           alt: 'Times Square building display for I-Festival',                   order: 4,  cover: false },
    { path: '/assets/projects/tbtm/panel-culture-currency.jpg',     alt: 'Speaker panel: Turning Culture Into Currency',                   order: 5,  cover: false },
    { path: '/assets/projects/tbtm/panel-innovation-africa.jpg',    alt: 'Speaker panel: Future of Innovation in Africa',                  order: 6,  cover: false },
    { path: '/assets/projects/tbtm/festival-tile-2022.jpg',         alt: '2022 I-Festival hero tile',                                     order: 7,  cover: false },
    { path: '/assets/projects/tbtm/festival-partners-2022.jpg',     alt: '2022 I-Festival partner logos including Forbes and GSMA',        order: 8,  cover: false },
    { path: '/assets/projects/tbtm/festival-schedule-2022.jpg',     alt: '2022 I-Festival day schedule',                                  order: 9,  cover: false },
    { path: '/assets/projects/tbtm/festival-speakers-2022.jpg',     alt: '2022 I-Festival full speaker poster',                           order: 10, cover: false },
    { path: '/assets/projects/tbtm/webby-nomination-1.png',         alt: 'Webby Award nomination',                                       order: 11, cover: false },
    { path: '/assets/projects/tbtm/webby-nomination-2.png',         alt: 'Webby Award nomination campaign',                               order: 12, cover: false },
  ];

  for (const img of tbtmImages) {
    await sql`
      INSERT INTO project_media (project_id, image_url, alt_text, is_cover, sort_order)
      VALUES (${projectId}, ${img.path}, ${img.alt}, ${img.cover}, ${img.order})
    `;
  }
  console.log(`  Inserted ${tbtmImages.length} media rows.`);

  // ──────────────────────────────────────────────
  // 5. UPDATE TBTM CASE STUDY
  // ──────────────────────────────────────────────
  console.log('\n5. Updating TBTM case study copy...');

  // Check if a case study exists for this project
  const existingCs = await sql`SELECT id FROM case_studies WHERE project_id = ${projectId}`;

  const overview = 'Take Back the Mic is a pan-African music competition that ran across 50+ countries over three seasons, backed by MTN and partnered with Mastercard. The I-Festival was the culmination: an interactive festival experience combining live performances, industry panels, and digital engagement.';
  const context = 'The brief was to build a campaign system that could scale across outdoor, digital, and social channels while maintaining a cohesive identity across two consecutive festival years (2021 and 2022).';
  const objective = 'Design a multi-format campaign covering billboards, social media tiles, event schedules, speaker panel promotions, and partner integration graphics.';
  const approach = 'The 2021 campaign centred on large-format outdoor advertising, including placements in NYC Times Square. Bold typography and high-contrast colour cut through the visual noise of the location. Speaker panels like "Turning Culture Into Currency" needed their own promotional assets that sat within the overall system.';
  const execution = 'Year two introduced a refreshed colour palette (teal and green replacing yellow and black) and a tighter grid system for social tiles. Partner integration became more prominent, with Forbes and GSMA logos featured alongside TBTM branding. The schedule design used a modular layout that could adapt to single-day or multi-day formats without redesign.';
  const outcome = 'The I-Festival digital experience received a Webby Award nomination. The campaign ran across outdoor, digital, and social channels in both years.';
  const metrics = '[{"value":"50+","label":"Countries"},{"value":"2","label":"Festival Years"},{"value":"1","label":"Webby Nomination"}]';

  if (existingCs.length > 0) {
    await sql`
      UPDATE case_studies SET
        overview = ${overview},
        context = ${context},
        objective = ${objective},
        approach = ${approach},
        execution = ${execution},
        outcome = ${outcome},
        metrics = ${metrics}::jsonb
      WHERE project_id = ${projectId}
    `;
    console.log('  Updated existing case study.');
  } else {
    await sql`
      INSERT INTO case_studies (project_id, overview, context, objective, approach, execution, outcome, metrics)
      VALUES (${projectId}, ${overview}, ${context}, ${objective}, ${approach}, ${execution}, ${outcome}, ${metrics}::jsonb)
    `;
    console.log('  Created new case study.');
  }

  // ──────────────────────────────────────────────
  // 6. RE-NUMBER SORT ORDERS (fill the gap left by Tryba)
  // ──────────────────────────────────────────────
  console.log('\n6. Re-numbering brand sort orders...');

  // Current expected order after removing Tryba:
  // Sparkle(1), Syntech(2), Kavlr(3), Route to Zero(4), Access Bank(5), HashiT(6), TBTM(7), Polo Luxury(8)
  const sortUpdates = [
    { slug: 'sparkle', order: 1 },
    { slug: 'syntech', order: 2 },
    { slug: 'kavlr', order: 3 },
    { slug: 'route-to-zero', order: 4 },
    { slug: 'access-bank', order: 5 },
    { slug: 'hashit', order: 6 },
    { slug: 'take-back-the-mic', order: 7 },
    { slug: 'polo-luxury', order: 8 },
  ];

  for (const { slug, order } of sortUpdates) {
    await sql`UPDATE brands SET sort_order = ${order} WHERE slug = ${slug}`;
  }
  console.log('  Sort orders updated.');

  // ──────────────────────────────────────────────
  // VERIFICATION
  // ──────────────────────────────────────────────
  console.log('\n── VERIFICATION ──\n');

  // Check Tryba is gone
  const trybaCheck = await sql`SELECT id FROM brands WHERE slug = 'tryba'`;
  console.log(`Tryba brand exists: ${trybaCheck.length > 0 ? 'YES (ERROR!)' : 'NO (correct)'}`);

  // List all visible brands
  const brands = await sql`
    SELECT name, slug, sort_order, is_featured, featured_image
    FROM brands
    WHERE is_visible = true
    ORDER BY sort_order
  `;
  console.log('\nVisible brands:');
  for (const b of brands) {
    console.log(`  ${b.sort_order}. ${b.name} (${b.slug}) — featured: ${b.is_featured} — image: ${b.featured_image || 'NULL'}`);
  }

  // Check TBTM project media count
  const mediaCount = await sql`
    SELECT COUNT(*) as count FROM project_media
    WHERE project_id = ${projectId}
  `;
  console.log(`\nTBTM project_media count: ${mediaCount[0].count}`);

  // List TBTM media
  const media = await sql`
    SELECT image_url, alt_text, sort_order, is_cover
    FROM project_media
    WHERE project_id = ${projectId}
    ORDER BY sort_order
  `;
  console.log('\nTBTM media:');
  for (const m of media) {
    console.log(`  ${m.sort_order}. ${m.image_url} — ${m.alt_text}${m.is_cover ? ' [COVER]' : ''}`);
  }

  // Check case study
  const cs = await sql`SELECT id FROM case_studies WHERE project_id = ${projectId}`;
  console.log(`\nTBTM case study exists: ${cs.length > 0 ? 'YES' : 'NO'}`);

  console.log('\nDone. Tryba removed, TBTM populated with 12 I-Festival images.');
}

run().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
