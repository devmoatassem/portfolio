import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import { backgroundField } from '../common-fields/background'
import { fieldChoice, richTextBasic } from '../common-fields/fieldChoice'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { GridBlock } from '../Grid/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: Array.from({ length: 12 }, (_, i) => ({
      label: `Col Span ${i + 1}`,
      value: `md:col-span-${i + 1}`,
    })),
    required: true,
  },
  {
    type: 'text',
    name: 'title',
    label: 'Titile',
    required: true,
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Description',
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
          BlocksFeature({
            blocks: [GridBlock],
          }),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, { component }) => component === 'richText',
    },
  },
]

export const BentoGrid: Block = {
  slug: 'bento',
  interfaceName: 'BentoGrid',
  fields: [
    backgroundField,
    richTextBasic,
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
