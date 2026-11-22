import { defineType, defineField } from 'sanity'

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'sector',
      title: 'Industry Sector',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'sector',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Brief description of this industry sector',
    }),
    defineField({
      name: 'image',
      title: 'Industry Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'relevantCategories',
      title: 'Relevant Product Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Sterilization', value: 'Sterilization' },
          { title: 'Life Science', value: 'Life Science' },
          { title: 'Thermal & Industrial', value: 'Thermal & Industrial' },
          { title: 'Safety & Airflow', value: 'Safety & Airflow' },
          { title: 'Thermal Baths', value: 'Thermal Baths' },
        ],
      },
      description: 'Product categories relevant to this industry',
    }),
  ],
  preview: {
    select: {
      title: 'sector',
      media: 'image',
    },
  },
})
