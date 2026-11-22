import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string',
      description: 'Job title or position',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Company or organization name',
    }),
    defineField({
      name: 'image',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
      description: 'Star rating (1-5)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'image',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, media, rating } = selection
      return {
        title: title,
        subtitle: subtitle ? `${subtitle} • ${rating}★` : `${rating}★`,
        media,
      }
    },
  },
})
