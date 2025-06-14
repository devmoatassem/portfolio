import { Field } from 'payload'
import { GlobeField } from './globe'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

export const fieldChoice: Field[] = [
  {
    name: 'component',
    type: 'select',
    required: true,
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Media',
        value: 'media',
      },
      // {
      //   label: 'Text',
      //   value: 'text',
      // },
      {
        label: 'Button',
        value: 'button',
      },
      // {
      //   label: 'Link',
      //   value: 'link',
      // },
      // {
      //   label: 'Textarea',
      //   value: 'textarea',
      // },
      {
        label: 'Gradient Text',
        value: 'gradientText',
      },
      {
        label: 'Globe',
        value: 'globe',
      },
      {
        label: 'Marquee Logos',
        value: 'marquee',
      },
    ],
  },
  GlobeField,

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
      condition: (_, { component }) => component === 'richText',
    },
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    label: false,
    admin: {
      condition: (_, { component }) => component === 'media',
    },
  },
  // {
  //   name: 'text',
  //   type: 'text',
  //   label: false,
  //   admin: {
  //     condition: (_, { component }) => component === 'text',
  //   },
  // },

  link({
    overrides: {
      admin: {
        condition: (_, { component }) => component === 'button',
      },
      name: 'button',
    },
  }),

  // {
  //   name: 'textArea',
  //   type: 'textarea',
  //   label: false,
  //   admin: {
  //     condition: (_, { component }) => component === 'textarea',
  //   },
  // },
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
      condition: (_, { component }) => component === 'gradientText',
    },
  },
]
