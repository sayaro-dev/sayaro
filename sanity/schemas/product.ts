import { defineType, defineField } from 'sanity'
import { R2ImageInput } from '../components/R2ImageInput'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category (Industry)',
      type: 'reference',
      to: [{ type: 'industry' }],
      description: 'Primary industry this product belongs to',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Product Image',
      type: 'url',
      components: { input: R2ImageInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Display this product on homepage and featured sections',
      initialValue: false,
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
      description: 'Brief product description',
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'key',
              title: 'Specification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Specification Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'key',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Applications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of applications for this product',
    }),
    defineField({
      name: 'quickFacts',
      title: 'Quick Facts',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key facts or features',
    }),
    defineField({
      name: 'industries',
      title: 'Related Industries',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'industry' }],
        },
      ],
      description: 'Industries this product serves',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category.sector',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, category, featured } = selection
      return {
        title: title,
        subtitle: `${category || 'No category'}${featured ? ' • Featured' : ''}`,
      }
    },
  },
})
