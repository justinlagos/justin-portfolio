# Portfolio Fix: Deployment Steps

Everything is ready. The images are on disk, the script is written.
Run these commands from the `portfolio-nextjs` folder.

## 1. Clear the git lock (if it exists)

```bash
rm -f .git/index.lock
```

## 2. Stage and commit

```bash
git add -A
git commit -m "Fix all brand images, descriptions, and case study copy

- Access Bank separated as its own brand (was incorrectly under TBTM)
- Kavlr corrected to fintech (was listed as beauty/wellness)
- Syntech truck.png excluded (Ranger branded, not Syntech)
- All brand descriptions rewritten with verified facts
- Case studies added for Access Bank, Sparkle, Polo Luxury, HashiT
- Project media repopulated with correct image assignments
- Images extracted from 5 portfolio PDFs and copied from source folders
- Supabase dead code fully removed
- EasyJet and Vulta hidden (no source images available)"
```

## 3. Push to GitHub

```bash
git push origin main
```

Vercel will auto-deploy. Wait for the build to finish (usually 1-2 minutes).

## 4. Run the database fix

```bash
node --env-file=.env.local scripts/fix-images.mjs
```

This updates the live Neon database with correct brand descriptions,
image paths, case study copy, and project media assignments.

## 5. Verify

Visit https://justin-portfolio-withinafricas-projects.vercel.app/work
and check that:

- Sparkle shows as the top brand with the brand overview image
- Syntech shows the brochure cover (not the Ranger truck)
- Access Bank appears as its own brand (not under TBTM)
- Kavlr description says fintech (not beauty/wellness)
- EasyJet and Vulta are hidden (no images yet)
- All project pages load images in the gallery

## What changed

| Area | Before | After |
|------|--------|-------|
| Access Bank | Nested under TBTM | Own brand with 11 images |
| Syntech featured | truck.png (Ranger) | brochure-cover.jpg |
| Kavlr description | "beauty and wellness" | "multicurrency fintech" |
| TBTM featured | reachout.png (wrong) | NULL (no clean image) |
| Sparkle | No images | 4 images from PDF |
| Polo Luxury | No images | 8 images (campaigns + PDF) |
| HashiT | No images | 9 images (source + PDF) |
| EasyJet | Empty, visible | Hidden |
| Vulta | Empty, visible | Hidden |
| Supabase code | Dead imports everywhere | Fully removed |
| Case studies | 4 total | 8 total |
| Project media rows | Wrong paths | 68 verified rows |
