import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
// import { TextColorFeature, TextSizeFeature } from "payload-lexical-typography";
import { link } from '@/fields/link'
import { backgroundField } from '../common-fields/background'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'One Fourth',
        value: 'oneFourth',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'field',
    type: 'select',
    // defaultValue: 'oneThird',
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Image',
        value: 'image',
      },
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Button',
        value: 'button',
      },
      {
        label: 'Link',
        value: 'link',
      },
      {
        label: 'Textarea',
        value: 'textarea',
      },
      {
        label: 'Gradient Text',
        value: 'gradientText',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ defaultFeatures, rootFeatures }) => {
        return [
          ...rootFeatures,
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),

          // TextColorFeature({
          //   colors: ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF"],
          // }),
          // TextSizeFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, { field }) => field === 'richText',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: false,
    admin: {
      condition: (_, { field }) => field === 'image',
    },
  },
  {
    name: 'text',
    type: 'text',
    label: false,
    admin: {
      condition: (_, { field }) => field === 'text',
    },
  },
  {
    name: 'button',
    type: 'group',
    fields: [
      {
        name: 'label',
        type: 'text',
        required: true,
      },
      {
        name: 'link',
        type: 'relationship',
        relationTo: ['pages'],
        required: true,
      },
    ],
    admin: {
      condition: (_, { field }) => field === 'button',
    },
  },
  {
    name: 'textArea',
    type: 'textarea',
    label: false,
    admin: {
      condition: (_, { field }) => field === 'textarea',
    },
  },
  {
    name: 'gradientText',
    label: 'Gradient Text',
    type: 'group',
    fields: [
      {
        name: 'text',
        type: 'textarea',
        required: true,
      },
      {
        name: 'size',
        type: 'select',
        options: Array.from({ length: 9 }, (_, index) => {
          const size = index + 1
          return {
            label: size === 1 ? 'Large' : `Large-${size}`,
            value: `text-${size}xl`,
          }
        }),
      },
    ],
    admin: {
      condition: (_, { field }) => field === 'gradientText',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { field }) => field === 'link',
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    backgroundField,
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    // Add header Checkbox field
    {
      name: 'enableHeader',
      type: 'checkbox',
    },
    // header will be a link field
    link({
      overrides: {
        admin: {
          condition: (_, { enableHeader }) => Boolean(enableHeader),
        },
      },
      appearances: false,
    }),
  ],
}
