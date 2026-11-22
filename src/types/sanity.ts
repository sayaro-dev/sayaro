// TypeScript types for Sanity CMS data

// Base Sanity types
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Slug {
  _type: 'slug'
  current: string
}

// Product
export interface Product {
  _id: string
  _type: 'product'
  title: string
  slug: Slug
  category: string
  image: SanityImage
  featured: boolean
  overview?: string
  specifications?: Array<{
    key: string
    value: string
  }>
  applications?: string[]
  quickFacts?: string[]
  industries?: Industry[]
}

// Industry
export interface Industry {
  _id: string
  _type: 'industry'
  sector: string
  slug: Slug
  description?: string
  image?: SanityImage
  relevantCategories?: string[]
}

// Blog Post
export interface BlogPost {
  _id: string
  _type: 'post'
  title: string
  slug: Slug
  excerpt?: string
  coverImage: SanityImage
  date: string
  author?: string
  content?: any[] // Portable Text content
  category?: string
}

// Testimonial
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role?: string
  company?: string
  image?: SanityImage
  quote: string
  rating: number
  order: number
}

// FAQ
export interface FAQ {
  _id: string
  _type: 'faq'
  question: string
  answer: string
  category?: string
  order: number
}

// Service
export interface Service {
  _id: string
  _type: 'service'
  title: string
  description?: string
  icon?: string
  order: number
}

// Contact Info
export interface ContactInfo {
  _id: string
  _type: 'contactInfo'
  officeAddress?: string
  phone?: string
  email?: string
  socialLinks?: Array<{
    platform: string
    url: string
  }>
  offices?: Array<{
    name: string
    address: string
    phone?: string
    email?: string
  }>
}
