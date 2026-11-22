// TypeScript types for Sanity CMS data

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
  category: { _id: string; sector: string; slug: Slug }
  imageUrl: string
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
  imageUrl?: string
}

// Testimonial
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role?: string
  company?: string
  imageUrl?: string
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
  order: number
}

// Service
export interface Service {
  _id: string
  _type: 'service'
  title: string
  description?: string
  order: number
}

