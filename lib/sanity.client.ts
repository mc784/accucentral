import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'sk07v1ey',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
