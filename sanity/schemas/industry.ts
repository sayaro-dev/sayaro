import { defineType, defineField } from 'sanity'
import { R2ImageInput } from '../components/R2ImageInput'

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
      name: 'imageUrl',
      title: 'Industry Image',
      type: 'url',
      components: { input: R2ImageInput },
    }),
  ],
  preview: {
    select: {
      title: 'sector',
    },
  },
})
