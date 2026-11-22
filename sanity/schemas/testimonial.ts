import { defineType, defineField } from 'sanity'
import { R2ImageInput } from '../components/R2ImageInput'

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
      name: 'imageUrl',
      title: 'Customer Photo',
      type: 'url',
      components: { input: R2ImageInput },
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
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      return {
        title: title,
        subtitle: subtitle ? `${subtitle} • ${rating}★` : `${rating}★`,
      }
    },
  },
})
