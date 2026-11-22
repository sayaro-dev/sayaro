# R2 Image Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all image storage from Sanity CDN to Cloudflare R2 while keeping Sanity as the CMS.

**Architecture:** Sanity schemas gain a new `imageUrl` field (type `url`) alongside the existing `image` field. A migration script extracts current Sanity images, uploads them to R2, and patches each Sanity document with the R2 URL. Components switch from `urlFor(image)` to reading `imageUrl` directly. Once verified, the old `image` fields and `@sanity/image-url` dependency are removed.

**Tech Stack:** Cloudflare R2 (via S3-compatible API with `@aws-sdk/client-s3`), Sanity client (mutations), Next.js `<Image>`

**Spec:** `docs/superpowers/specs/2026-11-22-r2-image-migration-design.md`

## Global Constraints

- TypeScript strict mode, no `any`
- No secrets committed — R2 credentials and Sanity write token via `.env.local`
- Sanity schemas must be backward-compatible during migration (old `image` field coexists with new `imageUrl`)
- `next/image` requires remote patterns for the R2 hostname in `next.config.ts`
- All existing pages must continue working during and after migration

## Review Focus

1. **Missing imageUrl on a document** — if a Sanity document has no `imageUrl` (migration incomplete or new document added after migration), the component should fall back to the existing placeholder behavior, not crash.
2. **R2 bucket permissions** — if the bucket isn't public or CORS isn't configured, images will fail to load in the browser with opaque errors.
3. **next.config.ts remote pattern mismatch** — if the R2 hostname doesn't match the pattern, `next/image` returns a 400. The pattern must match the actual bucket URL.
4. **Migration script idempotency** — running the script twice should not duplicate uploads or corrupt data. The script should skip documents that already have an `imageUrl`.
5. **Blog post inline images** — the `post` schema has `image` blocks inside Portable Text `content`. These are not covered by this migration (no blog routes exist yet) but the builder should not break the schema.

---

### Task 1: R2 Bucket Setup & Environment Configuration

**Files:**
- Modify: `.env.local` (add R2 credentials — not committed)
- Modify: `.env.example` (document required R2 variables)
- Create: `.env.example` if it doesn't exist
- Modify: `next.config.ts:6-16` (add R2 remote pattern)

**Interfaces:**
- Consumes: nothing
- Produces: R2 bucket URL pattern available in env vars; `next.config.ts` allows R2 images

- [ ] **Step 1: Create R2 bucket via Cloudflare dashboard**

The user creates an R2 bucket in their Cloudflare dashboard and enables public access (either via `r2.dev` subdomain or custom domain). Note the public URL pattern.

- [ ] **Step 2: Gather R2 credentials**

From Cloudflare dashboard → R2 → Manage R2 API Tokens, create an API token with Object Read & Write permissions. Note:
- `R2_ACCOUNT_ID` — Cloudflare account ID
- `R2_ACCESS_KEY_ID` — R2 API token access key
- `R2_SECRET_ACCESS_KEY` — R2 API token secret key
- `R2_BUCKET_NAME` — bucket name
- `R2_PUBLIC_URL` — the public URL base (e.g., `https://pub-xxx.r2.dev` or custom domain)

- [ ] **Step 3: Create `.env.example` documenting all required env vars**

```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity Write Token (for migration script only)
SANITY_WRITE_TOKEN=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

- [ ] **Step 4: Add R2 values to `.env.local`**

Populate the actual credentials. This file is gitignored.

- [ ] **Step 5: Add R2 public URL to `next.config.ts` remote patterns**

Add a new entry to the `images.remotePatterns` array matching the R2 public URL hostname. Keep the existing `cdn.sanity.io` and `images.unsplash.com` entries during transition.

- [ ] **Step 6: Verify dev server starts with updated config**

Run: `npm run dev`
Expected: Server starts without errors.

- [ ] **Step 7: Commit**

```bash
git add next.config.ts .env.example
git commit -m "chore: add R2 config to next.config.ts and .env.example"
```

---

### Task 2: Add `imageUrl` Field to Sanity Schemas

**Files:**
- Modify: `sanity/schemas/product.ts:39-47` (add `imageUrl` field after `image`)
- Modify: `sanity/schemas/industry.ts:33-38` (add `imageUrl` field after `image`)
- Modify: `sanity/schemas/testimonial.ts:27-33` (add `imageUrl` field after `image`)
- Modify: `sanity/schemas/post.ts:33-39` (add `coverImageUrl` field after `coverImage`)

**Interfaces:**
- Consumes: nothing
- Produces: Sanity schemas accept an `imageUrl` (or `coverImageUrl` for posts) string field alongside the existing image field

- [ ] **Step 1: Add `imageUrl` field to product schema**

Add a `url` type field named `imageUrl` after the existing `image` field. Title: "Product Image URL (R2)". Description: "Public URL of the product image on Cloudflare R2". No validation required (optional during transition).

- [ ] **Step 2: Add `imageUrl` field to industry schema**

Same pattern — `imageUrl` field of type `url` after the existing `image` field.

- [ ] **Step 3: Add `imageUrl` field to testimonial schema**

Same pattern — `imageUrl` field of type `url` after the existing `image` field.

- [ ] **Step 4: Add `coverImageUrl` field to post schema**

Field named `coverImageUrl` of type `url` after the existing `coverImage` field. Title: "Cover Image URL (R2)".

- [ ] **Step 5: Verify Sanity Studio loads schemas without errors**

Run: `npm run dev` (or `npx sanity dev` if Studio is separate)
Expected: Sanity Studio shows the new URL fields on each document type. Existing documents still show their old image data.

- [ ] **Step 6: Commit**

```bash
git add sanity/schemas/product.ts sanity/schemas/industry.ts sanity/schemas/testimonial.ts sanity/schemas/post.ts
git commit -m "feat: add imageUrl fields to Sanity schemas for R2 migration"
```

---

### Task 3: Write the Migration Script

**Files:**
- Create: `scripts/migrate-images-to-r2.ts`

**Interfaces:**
- Consumes: R2 env vars from `.env.local`, Sanity client with write token
- Produces: Images uploaded to R2 bucket; Sanity documents patched with `imageUrl`/`coverImageUrl` values

The script does three things per document type: (1) fetch all documents with an `image` asset, (2) download each image from Sanity CDN, (3) upload to R2 with a deterministic key, (4) patch the Sanity document with the R2 public URL. It skips documents that already have a populated `imageUrl`.

- [ ] **Step 1: Install `@aws-sdk/client-s3` as a dev dependency**

Run: `npm install --save-dev @aws-sdk/client-s3`
This is only needed for the migration script, not the runtime app.

- [ ] **Step 2: Write the migration script `scripts/migrate-images-to-r2.ts`**

The script must:

1. Load env vars from `.env.local` (use `dotenv`)
2. Initialize S3Client pointed at R2 endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
3. Initialize a Sanity client with the write token (`SANITY_WRITE_TOKEN`)
4. For each document type (`product`, `industry`, `testimonial`, `post`):
   a. Fetch all documents of that type via GROQ: `*[_type == "<type>"]{ _id, image, imageUrl }` (use `coverImage`/`coverImageUrl` for posts)
   b. For each document:
      - Skip if `imageUrl` (or `coverImageUrl`) is already populated
      - Skip if no `image` (or `coverImage`) asset reference
      - Build the Sanity CDN URL from the asset `_ref` (format: `image-{id}-{width}x{height}-{format}` → `https://cdn.sanity.io/images/{projectId}/{dataset}/{id}-{width}x{height}.{format}`)
      - Download the image bytes via `fetch`
      - Upload to R2 with key: `{type}/{slug-or-id}.{format}` (use slug when available, fall back to `_id`)
      - Patch the Sanity document: `client.patch(doc._id).set({ imageUrl: "${R2_PUBLIC_URL}/{key}" }).commit()`
5. Log progress: `[product] Migrated 12/28 — autoclave-sterilizer.jpg`
6. Summary at end: total migrated, total skipped, any errors

- [ ] **Step 3: Add a run script to `package.json`**

Add: `"migrate:r2": "npx tsx scripts/migrate-images-to-r2.ts"`

- [ ] **Step 4: Do a dry run — test with a single product document**

Run: `npm run migrate:r2`
Expected: One image appears in the R2 bucket (check Cloudflare dashboard). The corresponding Sanity document has `imageUrl` populated. Re-running skips that document.

- [ ] **Step 5: Run full migration**

Run: `npm run migrate:r2`
Expected: All documents with images are migrated. Script reports counts per type.

- [ ] **Step 6: Verify in R2 dashboard**

Check that all uploaded images are accessible at their public URLs in a browser.

- [ ] **Step 7: Commit**

```bash
git add scripts/migrate-images-to-r2.ts package.json package-lock.json
git commit -m "feat: add migration script to upload Sanity images to R2"
```

---

### Task 4: Update TypeScript Types

**Files:**
- Modify: `src/types/sanity.ts:24-40` (Product — add `imageUrl`)
- Modify: `src/types/sanity.ts:43-51` (Industry — add `imageUrl`)
- Modify: `src/types/sanity.ts:53-65` (BlogPost — add `coverImageUrl`)
- Modify: `src/types/sanity.ts:68-78` (Testimonial — add `imageUrl`)

**Interfaces:**
- Consumes: nothing
- Produces: TypeScript types include optional `imageUrl: string` (and `coverImageUrl: string` for BlogPost) fields on all image-bearing document types

- [ ] **Step 1: Add `imageUrl?: string` to `Product` interface**

Add after the `image: SanityImage` field. Keep `image` for backward compatibility during transition.

- [ ] **Step 2: Add `imageUrl?: string` to `Industry` interface**

Same pattern.

- [ ] **Step 3: Add `imageUrl?: string` to `Testimonial` interface**

Same pattern.

- [ ] **Step 4: Add `coverImageUrl?: string` to `BlogPost` interface**

Same pattern, alongside existing `coverImage`.

- [ ] **Step 5: Run typecheck**

Run: `npm run typecheck`
Expected: No new type errors.

- [ ] **Step 6: Commit**

```bash
git add src/types/sanity.ts
git commit -m "feat: add imageUrl fields to Sanity TypeScript types"
```

---

### Task 5: Update GROQ Queries to Fetch `imageUrl`

**Files:**
- Modify: `src/lib/sanity-queries.ts` (add `imageUrl` to all product/industry/testimonial/post projections; add `coverImageUrl` for posts)

**Interfaces:**
- Consumes: nothing
- Produces: All GROQ queries return `imageUrl` (or `coverImageUrl`) alongside existing `image` fields

- [ ] **Step 1: Add `imageUrl` to every product query projection**

In `productsQuery`, `productQuery`, `featuredProductsQuery`, `productsByCategoryQuery`, `productsByIndustryQuery` — add `imageUrl` to the projection after `image`.

- [ ] **Step 2: Add `imageUrl` to industry query projections**

In `industriesQuery`, `industryQuery` — add `imageUrl` after `image`.

- [ ] **Step 3: Add `imageUrl` to testimonial query projection**

In `testimonialsQuery` — add `imageUrl` after `image`.

- [ ] **Step 4: Add `coverImageUrl` to post query projections**

In `postsQuery`, `postQuery`, `recentPostsQuery` — add `coverImageUrl` after `coverImage`.

- [ ] **Step 5: Verify build passes**

Run: `npm run typecheck`
Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/sanity-queries.ts
git commit -m "feat: add imageUrl to all GROQ query projections"
```

---

### Task 6: Update Components to Use R2 URLs

**Files:**
- Modify: `src/components/sites/resido/ProjectsCarousel.tsx:7,109` (remove `urlFor` import, use `imageUrl`)
- Modify: `src/components/sites/resido/Testimonials.tsx:9,157` (remove `urlFor` import, use `imageUrl`)
- Modify: `src/components/ui/carousel-stacked.tsx:17,196-198` (remove `urlFor` import, use `imageUrl`)
- Modify: `src/app/works/[slug]/page.tsx:9,115,240` (remove `urlFor` import, use `imageUrl`)
- Modify: `src/app/works/industry/[slug]/page.tsx:10,72` (remove `urlFor` import, use `imageUrl`)

**Interfaces:**
- Consumes: `imageUrl: string` field from Sanity queries (Task 5)
- Produces: All components render images from R2 URLs

Each component follows the same pattern: replace `urlFor(item.image).width(W).height(H).url()` with `item.imageUrl`. The fallback for missing images (placeholder div) already exists in every component — it now triggers when `imageUrl` is falsy instead of when `image` is falsy.

- [ ] **Step 1: Update `ProjectsCarousel.tsx`**

1. Remove `import { urlFor } from "@/lib/sanity"`
2. Update the `Product` interface: replace `image?: any` with `imageUrl?: string`
3. Change the image conditional from `project.image` to `project.imageUrl`
4. Change `src={urlFor(project.image).width(520).height(416).url()}` to `src={project.imageUrl}`

- [ ] **Step 2: Update `Testimonials.tsx`**

1. Remove `import { urlFor } from "@/lib/sanity"`
2. Update the component's `Testimonial` type (or import from `@/types/sanity`) — image condition uses `imageUrl`
3. Change `src={urlFor(review.image).width(88).height(88).url()}` to `src={review.imageUrl}`
4. Change the conditional from `review.image` to `review.imageUrl`

- [ ] **Step 3: Update `carousel-stacked.tsx`**

1. Remove `import { urlFor } from "@/lib/sanity"`
2. Replace the `imageUrl` derivation logic (lines 196-198):
   ```
   const imageUrl = typeof industry.image === 'string'
     ? industry.image
     : urlFor(industry.image).width(600).height(800).url();
   ```
   becomes:
   ```
   const imageUrl = industry.imageUrl || '';
   ```
3. Update the `Industry` prop type to include `imageUrl?: string`

- [ ] **Step 4: Update `works/[slug]/page.tsx`**

1. Remove `urlFor` from the import (keep `client`)
2. Product detail image: change conditional to `product.imageUrl`, change `src` to `product.imageUrl`
3. Related products: change conditional to `related.imageUrl`, change `src` to `related.imageUrl`

- [ ] **Step 5: Update `works/industry/[slug]/page.tsx`**

1. Remove `urlFor` from the import (keep `client`)
2. Change conditional to `product.imageUrl`, change `src` to `product.imageUrl`

- [ ] **Step 6: Run typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/sites/resido/ProjectsCarousel.tsx src/components/sites/resido/Testimonials.tsx src/components/ui/carousel-stacked.tsx src/app/works/[slug]/page.tsx src/app/works/industry/[slug]/page.tsx
git commit -m "feat: switch all components from Sanity urlFor to R2 imageUrl"
```

---

### Task 7: Visual Verification & Cleanup

**Files:**
- Modify: `src/lib/sanity.ts` (remove `imageUrlBuilder` and `urlFor` export)
- Modify: `package.json` (remove `@sanity/image-url` dependency)
- Modify: `next.config.ts` (optionally remove `cdn.sanity.io` remote pattern)

**Interfaces:**
- Consumes: All components using R2 URLs (Task 6)
- Produces: Clean codebase with no Sanity image-url dependency

- [ ] **Step 1: Start dev server and verify every page with images**

Run: `npm run dev`

Check each route:
- `/` — Hero images (static/Unsplash), ProjectsCarousel (R2), Testimonials (R2)
- `/works` — Industry stacked carousel (R2)
- `/works/[any-product-slug]` — Product detail image (R2), related products (R2)
- `/works/industry/[any-industry-slug]` — Product grid images (R2)

Expected: All images load correctly from R2 URLs. No broken images.

- [ ] **Step 2: Remove `urlFor` and `imageUrlBuilder` from `src/lib/sanity.ts`**

Remove the `import imageUrlBuilder` line and the `builder` and `urlFor` declarations. Keep the `client` and `createClient` exports.

- [ ] **Step 3: Uninstall `@sanity/image-url`**

Run: `npm uninstall @sanity/image-url`

- [ ] **Step 4: Remove `cdn.sanity.io` from `next.config.ts` remote patterns**

Remove the `cdn.sanity.io` entry from `images.remotePatterns`. Keep `images.unsplash.com` and the R2 hostname.

- [ ] **Step 5: Run full check**

Run: `npm run check` (lint + typecheck + build)
Expected: All pass. No references to `urlFor` or `@sanity/image-url` remain.

- [ ] **Step 6: Verify no remaining references**

Run: `grep -r "urlFor\|@sanity/image-url\|image-url" src/ --include="*.ts" --include="*.tsx"`
Expected: No matches.

- [ ] **Step 7: Start dev server one final time and spot-check**

Run: `npm run dev`
Verify homepage, works, and a product detail page. All images load.

- [ ] **Step 8: Commit**

```bash
git add src/lib/sanity.ts package.json package-lock.json next.config.ts
git commit -m "chore: remove @sanity/image-url dependency and Sanity CDN references"
```

---

### Task 8: Remove Legacy `image` Fields from Sanity Schemas (Post-Verification)

> **Note:** Only execute this task after the R2 migration is fully verified in production. This is a breaking change — old Sanity image data becomes inaccessible.

**Files:**
- Modify: `sanity/schemas/product.ts` (remove `image` field, rename `imageUrl` to `image` or keep as-is)
- Modify: `sanity/schemas/industry.ts` (same)
- Modify: `sanity/schemas/testimonial.ts` (same)
- Modify: `sanity/schemas/post.ts` (remove `coverImage` field)
- Modify: `src/types/sanity.ts` (remove `SanityImage` interface and old `image` fields)

**Interfaces:**
- Consumes: Verified working R2 image pipeline (Task 7)
- Produces: Clean Sanity schemas with only URL-based image fields

- [ ] **Step 1: Remove old `image` field from product schema**

Remove the `defineField` block for `image` (type `image`). Update the `preview.select` to use `imageUrl` instead of `media: 'image'`.

- [ ] **Step 2: Remove old `image` field from industry schema**

Same pattern. Update `preview.select`.

- [ ] **Step 3: Remove old `image` field from testimonial schema**

Same pattern. Update `preview.select`.

- [ ] **Step 4: Remove old `coverImage` field from post schema**

Same pattern. Update `preview.select`.

- [ ] **Step 5: Clean up `src/types/sanity.ts`**

Remove the `SanityImage` interface. Remove `image: SanityImage` from Product, Industry, Testimonial. Remove `coverImage: SanityImage` from BlogPost. Make `imageUrl` (and `coverImageUrl`) required instead of optional.

- [ ] **Step 6: Remove `imageUrl` / `coverImageUrl` from GROQ projections**

Since the field is now just `imageUrl` with no old `image` field, remove the old `image` from all query projections.

- [ ] **Step 7: Run full check**

Run: `npm run check`
Expected: All pass.

- [ ] **Step 8: Commit**

```bash
git add sanity/schemas/ src/types/sanity.ts src/lib/sanity-queries.ts
git commit -m "chore: remove legacy Sanity image fields after R2 migration"
```
