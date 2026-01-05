import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'description',
    type: 'textarea',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'relationTo',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
]
