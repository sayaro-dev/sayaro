import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Sayaro CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'du8mcd05',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool(),
    visionTool(), // GROQ query testing tool
  ],

  schema: {
    types: schemaTypes,
  },
})
