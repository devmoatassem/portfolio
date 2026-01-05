import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { cloudinaryStorage } from 'payload-cloudinary'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Moatassem` : 'Moatassem'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'projects'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories', 'technologies'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'projects'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // payloadCloudPlugin(),
  cloudinaryStorage({
    config: {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
      api_key: process.env.CLOUDINARY_API_KEY || '',
      api_secret: process.env.CLOUDINARY_API_SECRET || '',
    },
    collections: {
      media: true, // Enable for media collection
      // Add more collections as needed
    },
    folder: 'payload-media', // Optional, defaults to 'payload-media'
    disableLocalStorage: true, // Optional, defaults to true
    enabled: true, // Optional, defaults to true
    publicID: {
      enabled: true,
      useFilename: true,
      uniqueFilename: false, // Let Cloudinary handle uniqueness via unique_filename option
      generatePublicID: (filename, prefix, folder) => {
        // Keep original filename structure (spaces, case) to match staticHandler exactly
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')

        // Minimal sanitization - only remove truly invalid characters
        const sanitizedName = nameWithoutExt
          .replace(/[<>:"|?*\x00-\x1f]/g, '-')
          .replace(/\/+/g, '-')
          .replace(/\\+/g, '-')
          .trim()

        // Filter out empty, dot, or invalid prefixes
        const validPrefix =
          prefix && prefix !== '.' && prefix.trim() !== ''
            ? prefix
                .replace(/[<>:"|?*\x00-\x1f]/g, '-')
                .replace(/\/+/g, '-')
                .trim()
            : ''

        const prefixPath = validPrefix ? `${validPrefix}/` : ''

        // NO timestamp - match staticHandler exactly
        // Cloudinary's unique_filename option will handle collisions
        const publicId = `${folder}/${prefixPath}${sanitizedName}`
          .replace(/\/\.\//g, '/')
          .replace(/^\.\//, '')
          .replace(/\/\.$/, '')
          .replace(/\/+/g, '/')
          .replace(/^\/|\/$/g, '')

        return publicId
      },
    },
  }),
]
