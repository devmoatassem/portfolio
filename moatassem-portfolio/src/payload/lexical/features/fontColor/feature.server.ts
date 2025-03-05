// feature.server.ts

import { createServerFeature } from '@payloadcms/richtext-lexical'
import { FontColorFeatureClient } from './feature.client'
import { Field, TextField } from 'payload'

export const FontColorFeature = createServerFeature({
  feature: {
    ClientFeature: FontColorFeatureClient,
  },
  key: 'fontColor',
})
