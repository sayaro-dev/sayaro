// GROQ Queries for Sanity CMS

// ============================================
// PRODUCTS
// ============================================

// Get all products
export const productsQuery = `*[_type == "product"] | order(featured desc, title asc) {
  _id,
  title,
  slug,
  category,
  image,
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
  category,
  image,
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
  category,
  image,
  overview
}`

// Get products by category
export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(title asc) {
  _id,
  title,
  slug,
  category,
  image,
  overview
}`

// Get products by industry slug
export const productsByIndustryQuery = `*[_type == "product" && references(*[_type == "industry" && slug.current == $slug]._id)] {
  _id,
  title,
  slug,
  category,
  image,
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
  image,
  relevantCategories
}`

// Get single industry by slug
export const industryQuery = `*[_type == "industry" && slug.current == $slug][0] {
  _id,
  sector,
  slug,
  description,
  image,
  relevantCategories
}`

// ============================================
// BLOG POSTS
// ============================================

// Get all blog posts
export const postsQuery = `*[_type == "post"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  category
}`

// Get single blog post by slug
export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  content,
  category
}`

// Get recent blog posts (limit)
export const recentPostsQuery = `*[_type == "post"] | order(date desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
  category
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
  image,
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
  category,
  order
}`

// Get FAQs by category
export const faqsByCategoryQuery = `*[_type == "faq" && category == $category] | order(order asc) {
  _id,
  question,
  answer,
  category,
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
  icon,
  order
}`

// ============================================
// CONTACT INFO
// ============================================

// Get contact information (singleton)
export const contactInfoQuery = `*[_type == "contactInfo"][0] {
  _id,
  officeAddress,
  phone,
  email,
  socialLinks,
  offices
}`
