import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schema} from './schema'

export default defineConfig({
  name: 'default',
  title: 'ResumeCraft Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    visionTool()
  ],
  schema: {
    types: schema,
  },
})