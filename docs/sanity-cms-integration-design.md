# Sanity CMS Integration - Design Document

**Project:** Sayaro Laboratory & Scientific Equipment Website  
**Date:** 2026-11-16  
**Purpose:** Enable client self-management of website content after handoff

---

## Context & Intent

### Why This Change
Sayaro is being handed off to a client who needs to manage website content independently without developer intervention. Currently, all content (products, industries, testimonials, FAQs, blog posts) is hardcoded in TypeScript files, requiring code changes for updates.

### Success Criteria
- Client can add/edit/delete products without touching code
- Blog posts and testimonials are fully manageable
- Homepage sections (hero, about, services) are editable
- Changes publish immediately or on client's schedule
- Non-technical staff can manage content confidently

### Who This Serves
- **Primary:** Sayaro staff managing product catalog and marketing content
- **Secondary:** Future developers maintaining the site

---

## Current State Analysis

### Hardcoded Content Locations

**Data Files:**
- `src/components/sites/resido/data.ts` - Products (5 categories), blog posts, testimonials
- `src/components/sites/resido/industries.ts` - 12 industry sectors

**Page Content:**
- Homepage sections: Hero, About, Services, Why Choose Us, FAQ
- Contact page: Office locations, form configuration
- Legal pages: Privacy policy, terms, cookie policy
- About page: Company story, team info

### Content Update Frequency (Estimated)

| Content Type | Frequency | Current Barrier |
|--------------|-----------|-----------------|
| Products | Weekly | Requires TS editing, rebuild, deploy |
| Blog posts | Monthly | Same as above |
| Testimonials | Quarterly | Same as above |
| Services/FAQ | Quarterly | Same as above |
| Hero images | Rarely | Requires file uploads + code changes |
| Legal pages | Yearly | Same as above |

---

## Goals, Non-Goals, Anti-Goals

### Goals
- **Product catalog management** - Add/edit products with images, specs, applications, pricing
- **Industry pages** - Manage industry descriptions and product mappings
- **Blog/insights** - Create and publish blog posts with rich content
- **Testimonials** - Add customer testimonials with ratings, names, companies
- **FAQ management** - Add/edit/reorder FAQ items
- **Homepage sections** - Edit hero text, about block, services, CTAs
- **Contact info** - Update office addresses, phone, email, form fields

### Non-Goals (Stays in Code)
- Navigation structure and routing
- Component layouts and animations
- Tailwind styles and design system
- Form submission logic
- Analytics and tracking setup

### Anti-Goals (Would Make This a Failure)
- ❌ Exposing technical complexity to non-technical users
- ❌ Requiring Sanity Studio knowledge for basic edits
- ❌ Breaking existing animations or performance
- ❌ Creating a system too flexible that breaks design consistency
- ❌ Leaving critical content in code after migration

---

## Constraints

- Must work with existing Next.js 16 App Router setup
- Must preserve Framer Motion animations
- Must maintain current performance (no slow content fetching)
- Images must be optimized (Next.js Image component compatible)
- Must support draft/publish workflow for client review before going live
- Schema should prevent common mistakes (required fields, validation)

---

## Approaches Considered

### Approach 1: Deep CMS Integration (Recommended)
**What:** Move all variable content to Sanity - products, blog, testimonials, FAQ, homepage sections, contact info, industries

**Pros:**
- Maximum client flexibility for future changes
- Single source of truth for all content
- Enables non-developers to manage entire site
- Supports rich text editing for blog and descriptions
- Built-in image CDN and optimization

**Cons:**
- Larger initial migration effort
- More schemas to create and maintain
- Slightly more complex queries in frontend

**Tradeoffs:** More upfront work, but client has complete content control without future developer dependency.

---

### Approach 2: Lean CMS Integration
**What:** Only products and blog posts in Sanity; homepage/FAQ/testimonials stay in code

**Pros:**
- Faster initial setup
- Smaller learning curve for client
- Less chance of breaking existing layouts

**Cons:**
- Client still needs developer for homepage changes
- Partial solution doesn't fully meet handoff goal
- Will likely need to expand CMS later anyway

**Tradeoffs:** Faster now, but doesn't achieve true independence for client.

---

### Approach 3: Headless CMS Alternative (Contentful, Strapi)
**What:** Use a different headless CMS instead of Sanity

**Pros:**
- Other platforms may have features client prefers
- Some have better free tiers

**Cons:**
- Sanity has better DX for this use case (GROQ, real-time preview)
- More complex setup for image optimization
- Client already has Sanity experience (assumption)

**Tradeoffs:** Not recommended unless there's a specific requirement for another platform.

---

## Recommended Approach: Deep CMS Integration (Approach 1)

**Why:** The goal is client independence after handoff. A lean integration leaves them dependent on developers for common updates like changing hero text or adding testimonials. The incremental effort of deep integration is worth the long-term benefit.

---

## Technical Implementation Plan

### 1. Sanity Studio Setup

**Install Dependencies:**
```bash
npm install @sanity/client @sanity/image-url next-sanity
npm install --save-dev @sanity/types
```

**Create Sanity Project:**
- Initialize Sanity project: `npx sanity init`
- Create project in Sanity.io dashboard
- Configure CORS origins (localhost + production domain)
- Set up local Studio at `/studio` or external Studio

**Environment Variables:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_read_token
```

---

### 2. Schema Definitions

Create schemas in `/sanity/schemas/`:

**Product Schema (`product.ts`):**
```typescript
{
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required },
    { name: 'slug', type: 'slug', required, from: 'title' },
    { name: 'category', type: 'string', options: [Sterilization, Life Science, ...] },
    { name: 'image', type: 'image', required },
    { name: 'featured', type: 'boolean', default: false },
    { name: 'overview', type: 'text' },
    { name: 'specifications', type: 'array', of: [{ type: 'object', fields: [key, value] }] },
    { name: 'applications', type: 'array', of: [{ type: 'string' }] },
    { name: 'quickFacts', type: 'array', of: [{ type: 'string' }] },
    { name: 'industries', type: 'array', of: [{ type: 'reference', to: 'industry' }] }
  ]
}
```

**Industry Schema (`industry.ts`):**
```typescript
{
  name: 'industry',
  type: 'document',
  fields: [
    { name: 'sector', type: 'string', required },
    { name: 'slug', type: 'slug', required },
    { name: 'description', type: 'text' },
    { name: 'image', type: 'image' },
    { name: 'relevantCategories', type: 'array', of: ['string'] }
  ]
}
```

**Blog Post Schema (`post.ts`):**
```typescript
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required },
    { name: 'slug', type: 'slug', required },
    { name: 'excerpt', type: 'text' },
    { name: 'coverImage', type: 'image', required },
    { name: 'date', type: 'datetime', default: now },
    { name: 'author', type: 'string' },
    { name: 'content', type: 'array', of: [block, image, code] }, // Portable Text
    { name: 'category', type: 'string' }
  ]
}
```

**Testimonial Schema (`testimonial.ts`):**
```typescript
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', required },
    { name: 'role', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'quote', type: 'text', required },
    { name: 'rating', type: 'number', min: 1, max: 5, default: 5 },
    { name: 'order', type: 'number' }
  ]
}
```

**FAQ Schema (`faq.ts`):**
```typescript
{
  name: 'faq',
  type: 'document',
  fields: [
    { name: 'question', type: 'string', required },
    { name: 'answer', type: 'text', required },
    { name: 'category', type: 'string' },
    { name: 'order', type: 'number' }
  ]
}
```

**Homepage Section Schema (`homepageSection.ts`):**
```typescript
{
  name: 'homepageSection',
  type: 'document',
  fields: [
    { name: 'sectionId', type: 'string', required }, // 'hero', 'about', 'services', etc.
    { name: 'heading', type: 'string' },
    { name: 'subheading', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'ctaText', type: 'string' },
    { name: 'ctaLink', type: 'string' },
    { name: 'backgroundImage', type: 'image' },
    { name: 'features', type: 'array', of: [
      { type: 'object', fields: [title, description, icon] }
    ]}
  ]
}
```

**Service Schema (`service.ts`):**
```typescript
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', required },
    { name: 'description', type: 'text' },
    { name: 'icon', type: 'string' }, // Icon name reference
    { name: 'order', type: 'number' }
  ]
}
```

**Contact Info Schema (Singleton) (`contactInfo.ts`):**
```typescript
{
  name: 'contactInfo',
  type: 'document',
  fields: [
    { name: 'officeAddress', type: 'text' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'socialLinks', type: 'array', of: [
      { type: 'object', fields: [platform, url] }
    ]},
    { name: 'offices', type: 'array', of: [
      { type: 'object', fields: [name, address, phone, email] }
    ]}
  ]
}
```

---

### 3. Data Migration

**Migration Steps:**

1. **Extract Current Data:**
   - Parse `data.ts` and `industries.ts` TypeScript objects
   - Convert to JSON format compatible with Sanity import

2. **Create Migration Script:**
   - Use `@sanity/client` to bulk import documents
   - Generate slugs from titles
   - Upload images to Sanity's image CDN
   - Link references (products ↔ industries)

3. **Validate Migration:**
   - Query Sanity to confirm all records imported
   - Check image URLs and references
   - Verify required fields populated

**Example Migration Script Location:**
`/scripts/migrate-to-sanity.ts`

---

### 4. Frontend Integration

**Create Sanity Client (`src/lib/sanity.ts`):**
```typescript
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // false for draft/preview mode
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

**GROQ Queries (`src/lib/sanity-queries.ts`):**
```typescript
// Get all products
export const productsQuery = `*[_type == "product"] | order(featured desc, title asc)`

// Get single product
export const productQuery = `*[_type == "product" && slug.current == $slug][0]`

// Get products by industry
export const productsByIndustryQuery = `*[_type == "product" && $industry in industries[]->slug.current]`

// Get testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc)`

// Get FAQs
export const faqsQuery = `*[_type == "faq"] | order(order asc)`

// Get homepage sections
export const homepageSectionsQuery = `*[_type == "homepageSection"]`

// Get contact info
export const contactInfoQuery = `*[_type == "contactInfo"][0]`
```

**Update Page Components:**

Replace hardcoded imports with Sanity fetches:

```typescript
// Before: import { projects } from '@/components/sites/resido/data'
// After:
import { client } from '@/lib/sanity'
import { productsQuery } from '@/lib/sanity-queries'

export default async function WorksPage() {
  const products = await client.fetch(productsQuery)
  // ... render products
}
```

**Image Handling:**
```typescript
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

<Image
  src={urlFor(product.image).width(800).url()}
  alt={product.title}
  width={800}
  height={600}
/>
```

---

### 5. Files to Modify

**Pages:**
- ✏️ `src/app/page.tsx` - Fetch homepage sections, testimonials, FAQ
- ✏️ `src/app/works/page.tsx` - Fetch industries
- ✏️ `src/app/works/[slug]/page.tsx` - Fetch single product, generateStaticParams
- ✏️ `src/app/works/industry/[slug]/page.tsx` - Fetch industry + filtered products
- ✏️ `src/app/contact/page.tsx` - Fetch contact info
- ✏️ `src/app/about/page.tsx` - Fetch about content (if moved to CMS)

**Components:**
- ✏️ `src/components/sites/resido/ProjectsCarousel.tsx` - Use products from Sanity
- ✏️ `src/components/sites/resido/Testimonials.tsx` - Use testimonials from Sanity
- ✏️ `src/components/sites/resido/FAQ.tsx` - Use FAQs from Sanity
- ✏️ `src/components/sites/resido/Services.tsx` - Use services from Sanity
- ✏️ `src/components/sites/resido/AboutBlock.tsx` - Use about content from Sanity
- ✏️ `src/components/sites/resido/Hero.tsx` - Use hero content from Sanity
- ✏️ `src/components/sites/resido/BlogInsights.tsx` - Use blog posts from Sanity
- ✏️ `src/components/sites/resido/Footer.tsx` - Use contact info for footer

**Delete After Migration:**
- ❌ `src/components/sites/resido/data.ts`
- ❌ `src/components/sites/resido/industries.ts`

**New Files:**
- ✅ `src/lib/sanity.ts` - Sanity client setup
- ✅ `src/lib/sanity-queries.ts` - GROQ query collection
- ✅ `sanity/` - Sanity Studio configuration
- ✅ `sanity/schemas/` - Schema definitions
- ✅ `scripts/migrate-to-sanity.ts` - Data migration script

---

### 6. TypeScript Types

Create types from Sanity schemas:

```typescript
// src/types/sanity.ts
export interface Product {
  _id: string
  title: string
  slug: { current: string }
  category: string
  image: SanityImage
  featured: boolean
  overview: string
  specifications: Array<{ key: string; value: string }>
  applications: string[]
  quickFacts: string[]
  industries: Industry[]
}

export interface Industry {
  _id: string
  sector: string
  slug: { current: string }
  description: string
  image: SanityImage
  relevantCategories: string[]
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  image: SanityImage
  quote: string
  rating: number
  order: number
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  category?: string
  order: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  coverImage: SanityImage
  date: string
  author: string
  content: any[] // Portable Text
  category: string
}
```

---

### 7. Draft/Preview Mode

Enable client to preview changes before publishing:

**Setup Draft Mode:**
```typescript
// app/api/draft/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }
  
  draftMode().enable()
  redirect(slug || '/')
}
```

**Query Draft Content:**
```typescript
const isDraft = draftMode().isEnabled
const client = createClient({
  // ...
  useCdn: !isDraft,
  token: isDraft ? process.env.SANITY_API_TOKEN : undefined,
  perspective: isDraft ? 'previewDrafts' : 'published',
})
```

---

### 8. Revalidation Strategy

**Incremental Static Regeneration (ISR):**
```typescript
export const revalidate = 3600 // Revalidate every hour

// Or on-demand revalidation via webhook:
// POST /api/revalidate?secret=YOUR_SECRET&path=/works/product-slug
```

**Sanity Webhook Setup:**
- Configure webhook in Sanity dashboard
- Trigger on document publish/unpublish
- Call Next.js revalidation API
- Instant updates without full rebuild

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Sanity project and Studio
- [ ] Create product, industry, blog, testimonial schemas
- [ ] Build migration script
- [ ] Migrate existing products and industries
- [ ] Test Sanity Studio interface

### Phase 2: Core Pages (Week 1-2)
- [ ] Update `/works` page to fetch from Sanity
- [ ] Update `/works/[slug]` product detail pages
- [ ] Update `/works/industry/[slug]` pages
- [ ] Verify all product pages render correctly
- [ ] Test image optimization

### Phase 3: Homepage Integration (Week 2)
- [ ] Create homepage section schemas
- [ ] Migrate hero, about, services, FAQ content
- [ ] Update homepage components
- [ ] Integrate testimonials and blog posts
- [ ] Test animations still work

### Phase 4: Blog & Contact (Week 2)
- [ ] Implement blog post rendering with Portable Text
- [ ] Migrate existing blog content
- [ ] Update contact page with CMS-driven content
- [ ] Test rich text formatting

### Phase 5: Polish & Training (Week 3)
- [ ] Set up draft/preview mode
- [ ] Configure webhooks for revalidation
- [ ] Create client documentation
- [ ] Train client on Sanity Studio
- [ ] Conduct client acceptance testing

---

## Verification Plan

### Testing Checklist

**Data Integrity:**
- [ ] All products migrated with correct data
- [ ] Images load properly and are optimized
- [ ] Industry-product relationships maintained
- [ ] Blog posts render with formatting
- [ ] Testimonials display with ratings

**Functionality:**
- [ ] Dynamic routes generate correctly (generateStaticParams)
- [ ] Search and filtering work (if applicable)
- [ ] Related products show correctly
- [ ] Navigation and links work
- [ ] Forms still submit properly

**Performance:**
- [ ] Page load times unchanged or improved
- [ ] Images lazy load and optimize
- [ ] ISR revalidation works
- [ ] Lighthouse scores maintained

**Client Experience:**
- [ ] Non-technical user can add a product
- [ ] Image upload and cropping is intuitive
- [ ] Draft/publish workflow is clear
- [ ] Changes reflect on site within expected timeframe
- [ ] No technical errors in Studio

---

## Client Handoff Documentation

Create `/docs/client-cms-guide.md` with:

1. **Accessing Sanity Studio** - Login, URL, credentials
2. **Managing Products** - Add, edit, delete, image upload, SEO fields
3. **Managing Industries** - Updating industry content and product mappings
4. **Publishing Blog Posts** - Rich text editing, formatting, images
5. **Updating Homepage** - Hero, services, testimonials, FAQ
6. **Contact Information** - Updating office details and form fields
7. **Draft vs Published** - Understanding content states
8. **Common Tasks** - Step-by-step guides for frequent operations
9. **Troubleshooting** - What to do if something looks wrong
10. **Support Contact** - Who to reach for technical help

---

## Maintenance & Future Considerations

### Post-Launch Support
- Monitor Sanity query performance
- Track client usage patterns
- Collect feedback on Studio UX
- Adjust schemas based on real needs

### Potential Enhancements
- Multi-language support (i18n)
- Product comparison tool
- Advanced search/filtering
- Email notification on new blog posts
- Analytics integration for popular products
- Bulk import/export tools
- Custom validation rules
- Role-based access control for team

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Client finds Studio too complex | High | Create simplified custom Studio layout, comprehensive training |
| Image optimization breaks | Medium | Test thoroughly, fallback to Next.js Image defaults |
| Migration loses data | High | Keep `data.ts` until verified, backup exports |
| Performance degrades | Medium | Use ISR, CDN, optimize queries, monitor Core Web Vitals |
| Schema changes break site | Medium | Version schemas, test in staging, coordinate deploys |
| Client accidentally breaks content | Low | Draft mode, revision history, restore capabilities |

---

## Summary

This implementation moves all client-manageable content to Sanity CMS, enabling complete independence after handoff. The deep integration approach ensures the client can update products, blog posts, testimonials, FAQs, and homepage sections without developer assistance.

**Key Deliverables:**
1. Fully configured Sanity Studio with custom schemas
2. Migrated content from TypeScript files to Sanity
3. Updated Next.js pages and components to fetch from Sanity
4. Draft/preview mode for safe content editing
5. Client training and documentation
6. Webhook-based revalidation for instant updates

**Timeline:** 3 weeks for full implementation and client training

**Next Steps:**
1. Approve this design document
2. Set up Sanity project and obtain credentials
3. Begin Phase 1 implementation
4. Schedule weekly client check-ins during development
