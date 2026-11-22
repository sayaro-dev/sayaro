import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Products', value: 'products' },
          { title: 'Services', value: 'services' },
          { title: 'Technical', value: 'technical' },
          { title: 'Ordering', value: 'ordering' },
        ],
      },
      description: 'Optional category for grouping FAQs',
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
      title: 'question',
      category: 'category',
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        title: title,
        subtitle: category ? `Category: ${category}` : 'No category',
      }
    },
  },
})
