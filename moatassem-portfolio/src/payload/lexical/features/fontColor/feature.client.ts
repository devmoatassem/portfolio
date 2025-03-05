// feature.client.ts
'use client'

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

// Not defined yet...
import { DropdownColorPicker } from './components/DropdownColorPicker'

export const FontColorFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Color Text',
          Component: DropdownColorPicker,
        },
      ]),
    ],
  },
})
