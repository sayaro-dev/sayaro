import { defineType, defineField } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'officeAddress',
      title: 'Main Office Address',
      type: 'text',
      rows: 3,
      description: 'Primary office address',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'IndiaMART', value: 'indiamart' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'offices',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Office Name',
              type: 'string',
              description: 'e.g., "Head Office", "Regional Office"',
            },
            {
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 3,
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
              validation: (Rule) => Rule.email(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'address',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information',
        subtitle: 'Site-wide contact details',
      }
    },
  },
})
