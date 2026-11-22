import { defineType, defineField } from 'sanity'

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
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sterilization', value: 'Sterilization' },
          { title: 'Life Science', value: 'Life Science' },
          { title: 'Thermal & Industrial', value: 'Thermal & Industrial' },
          { title: 'Safety & Airflow', value: 'Safety & Airflow' },
          { title: 'Thermal Baths', value: 'Thermal Baths' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      category: 'category',
      media: 'image',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, category, media, featured } = selection
      return {
        title: title,
        subtitle: `${category}${featured ? ' • Featured' : ''}`,
        media,
      }
    },
  },
})
