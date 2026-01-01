import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { backgroundField } from '../common-fields/background'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
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
      name: 'type',
      type: 'select',
      defaultValue: 'basicColumns',
      required: true,
      label: 'Type',
      options: [
        {
          label: 'Advance Parallax',
          value: 'advanceParallax',
        },
        {
          label: 'Basic Columns',
          value: 'basicColumns',
        },
      ],
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
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
      name: 'relationTo',
      type: 'select',
      // admin: {
      //   condition: (_, siblingData) => siblingData.populateBy === 'collection',
      // },
      defaultValue: 'projects',
      label: 'Collections To Show',
      options: [
        {
          label: 'Projects',
          value: 'projects',
        },
        {
          label: 'Posts',
          value: 'posts',
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
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) =>
          siblingData.populateBy === 'selection' && siblingData.relationTo === 'projects',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: 'projects',
      // hooks: {
      //   beforeChange: [
      //     ({ value, schemaPath , blockData , context , field , global }) => {
      //       // Return both the value and its relationship type
      //       console.log(schemaPath , blockData , context , field , global)
      //       return {
      //         // relationTo: siblingData.relationTo,
      //         value,
      //       }
      //     },
      //   ],
      // },
    },
    {
      name: 'showLoadMore',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Load More',
    },
    {
      name: 'loadMoreLabel',
      type: 'text',
      defaultValue: 'Load More',
      admin: {
        condition: (_, siblingData) => siblingData.showLoadMore === true,
      },
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
