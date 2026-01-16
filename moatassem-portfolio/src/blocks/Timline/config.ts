import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import { backgroundField } from '../common-fields/background'
import { fieldChoice, richTextBasic } from '../common-fields/fieldChoice'
import {
  // BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
// import { GridBlock } from '../Grid/config'
// import { MediaBlock } from '../MediaBlock/config'

const eventsFields: Field[] = [
  {
    type: 'text',
    name: 'title',
    label: 'Titile',
    required: true,
  },
  ...fieldChoice,
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
          // BlocksFeature({
          //   blocks: [GridBlock, MediaBlock],
          // }),
          
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, { component }) => component === 'richText',
    },
  },
]

export const Timline: Block = {
  slug: 'timline',
  interfaceName: 'Timline',
  fields: [
    backgroundField,
    richTextBasic,
    {
      name: 'events',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: eventsFields,
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
  labels: {
    plural: 'Timlines',
    singular: 'Timline',
  },
}
