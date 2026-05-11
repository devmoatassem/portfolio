import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField } from '../common-fields/background'
import { link } from '@/fields/link'

export const ProjectShowcase: Block = {
  slug: 'projectShowcase',
  interfaceName: 'ProjectShowcaseBlock',
  fields: [
    backgroundField,
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'showLoadMore',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Load More',
    },
    link({
      overrides: {
        name: 'loadMoreLink',
        label: 'Load More Link',
        admin: {
          condition: (_, siblingData) => siblingData.showLoadMore === true,
        },
      },
    }),
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      required: true,
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
      required: true,
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: 'projects',
      required: true,
    },
  ],
  labels: {
    plural: 'Project Showcases',
    singular: 'Project Showcase',
  },
}
