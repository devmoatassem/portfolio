import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'
import { backgroundField } from '../common-fields/background'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    backgroundField,
    {
      name: 'specialIndicator',
      type: 'checkbox',
      label: 'Special Indicator',
      
      defaultValue: true,
    },
    {
      name: 'indicatorText',
      type: 'text',
      label: 'Indicator Text',
      defaultValue: 'Open For Contracts',
      admin: {
        description:
          'Text to display as the special indicator. Only applicable if "Special Indicator" is checked.',
        condition: (data, siblingData) => siblingData?.specialIndicator === true,
      },
    },
    {
      name:'primaryTitle',
      type: 'text',
      label: 'Primary Title',
      required: true,
      
    },
    {
      name: 'secondaryTitle',
      type: 'text',
      label: 'Secondary Title',
      required: true,
      admin: {
        description: 'This title will be highlighted differently to draw attention. You can give words a break using a hyphen (-).',
      }
    },
    {
      name:'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
      required: false,
    },
    // custom component which should have a field of button Label, URL and button description
    {
      name: 'actionButton',
      type: 'group',
      label: 'Action Button',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          required: true,
        },
        {
          name: 'buttonURL',
          type: 'text',
          label: 'Button URL',
          required: true,
        },
        {
          name: 'buttonDescription',
          type: 'textarea',
          label: 'Button Description',
          required: false,
        },
      ],
    }
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
