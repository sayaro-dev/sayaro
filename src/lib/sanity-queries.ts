// GROQ Queries for Sanity CMS

// ============================================
// PRODUCTS
// ============================================

// Get all products
export const productsQuery = `*[_type == "product"] | order(featured desc, title asc) {
  _id,
  title,
  slug,
  "category": category->{_id, sector, slug},
  imageUrl,
  featured,
  overview,
  specifications,
  applications,
  quickFacts,
  industries[]->
}`

// Get single product by slug
export const productQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  "category": category->{_id, sector, slug},
  imageUrl,
  featured,
  overview,
  specifications,
  applications,
  quickFacts,
  industries[]->{
    _id,
    sector,
    slug
  }
}`

// Get featured products
export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(title asc) {
  _id,
  title,
  slug,
  "category": category->{_id, sector, slug},
  imageUrl,
  overview
}`

// Get products by industry (used for related products)
export const productsByIndustryRefQuery = `*[_type == "product" && category._ref == $industryId] | order(title asc) {
  _id,
  title,
  slug,
  "category": category->{_id, sector, slug},
  imageUrl,
  overview
}`

// Get products by industry slug
export const productsByIndustryQuery = `*[_type == "product" && references(*[_type == "industry" && slug.current == $slug]._id)] {
  _id,
  title,
  slug,
  "category": category->{_id, sector, slug},
  imageUrl,
  overview
}`

// ============================================
// INDUSTRIES
// ============================================

// Get all industries
export const industriesQuery = `*[_type == "industry"] | order(sector asc) {
  _id,
  sector,
  slug,
  description,
  imageUrl
}`

// Get single industry by slug
export const industryQuery = `*[_type == "industry" && slug.current == $slug][0] {
  _id,
  sector,
  slug,
  description,
  imageUrl
}`

// ============================================
// TESTIMONIALS
// ============================================

// Get all testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  role,
  company,
  imageUrl,
  quote,
  rating,
  order
}`

// ============================================
// FAQs
// ============================================

// Get all FAQs
export const faqsQuery = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`

// ============================================
// SERVICES
// ============================================

// Get all services
export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  order
}`
