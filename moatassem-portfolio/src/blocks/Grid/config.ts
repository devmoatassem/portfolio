import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import { fieldChoice, richTextWithoutBlocks } from '../common-fields/fieldChoice'

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
  ...fieldChoice,
  richTextWithoutBlocks,
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

export const GridBlock: Block = {
  slug: 'grid',
  interfaceName: 'GridBlockComponent',
  fields: [
    // backgroundField,
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
