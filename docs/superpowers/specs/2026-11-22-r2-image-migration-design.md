# R2 Image Migration — Design Spec

## Intent & Why

Sayaro currently stores all images inside Sanity's native asset pipeline (`cdn.sanity.io`). The goal is to move image storage to **Cloudflare R2** — cheaper, no vendor lock-in on the storage layer, and the Cloudflare account is already set up. Sanity stays as the CMS for all content; it just stops being the image host.

## Goals

- All images served from a Cloudflare R2 bucket (public access or custom domain)
- Sanity schemas store a plain URL string instead of a native `image` asset reference
- Existing images in Sanity are extracted and uploaded to R2
- All Next.js components render images via the R2 URL with `<Image>`
- No visual or behavioral regression on any page

## Non-Goals

- On-the-fly image transforms via Cloudflare Worker (Next.js `<Image>` handles optimization)
- Migrating non-image content out of Sanity
- Building an upload UI — images are uploaded to R2 manually or via script, URL pasted into Sanity

## Anti-Goals

- Breaking existing pages during migration (both old and new URLs must work during transition)
- Losing the ability to preview images in Sanity Studio

## Constraints

- Sanity schemas must remain deployable and backward-compatible during transition
- `next.config.ts` must allowlist the R2 hostname for `next/image`
- The migration script must be runnable offline (extract Sanity images → upload to R2 → patch Sanity documents)
- No secrets committed to the repo

## Approaches Considered

### A. R2 URLs as string fields in Sanity (chosen)
Replace the `image` field (type `image`) with `imageUrl` (type `url`) on each schema. Upload images to R2, store the public URL in Sanity. Components read the URL directly. Next.js `<Image>` does optimization.

**Pro:** Simplest path, no extra infra, Next.js handles resizing.
**Con:** Lose Sanity hotspot/crop metadata, lose Sanity Studio image preview thumbnails in list views (fixable with a custom preview component). Manual upload workflow.

### B. R2 + Cloudflare Worker for transforms
Same as A but add a Worker that does on-the-fly resizing via URL params.

**Pro:** Server-side transforms independent of Next.js.
**Con:** Extra infra (Worker) to build and maintain. Unnecessary — Next.js `<Image>` already optimizes.

**Decision:** Approach A. Next.js `<Image>` provides all the optimization needed.

## What the Builder Decides

- Exact R2 bucket name and public access configuration (depends on user's Cloudflare setup)
- Whether to use R2 custom domain or the default `*.r2.dev` URL
- Naming convention for uploaded files in R2
- Whether to keep the old Sanity `image` field alongside `imageUrl` during transition or replace in-place
