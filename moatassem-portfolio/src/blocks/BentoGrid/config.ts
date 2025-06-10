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
import { fieldChoice } from '../common-fields/fieldChoice'

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
]

export const BentoGrid: Block = {
  slug: 'bento',
  interfaceName: 'BentoGrid',
  fields: [
    backgroundField,
    {
      name: 'richText',
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
      label: false,
    },
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
