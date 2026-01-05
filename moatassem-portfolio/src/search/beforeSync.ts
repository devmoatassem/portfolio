import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, description, heroImage } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug: `/${collection}/${slug}`,
    heroImage,
    description,
    relationTo: collection,
  }

  // if (categories && Array.isArray(categories) && categories.length > 0) {
  //   // get full categories and keep a flattened copy of their most important properties
  //   try {
  //     const mappedCategories = categories.map((category) => {
  //       const { id, title } = category

  //       return {
  //         relationTo: 'categories',
  //         id,
  //         title,
  //       }
  //     })

  //     modifiedDoc.categories = mappedCategories
  //   } catch (_err) {
  //     console.error(
  //       `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
  //     )
  //   }
  // }

  return modifiedDoc
}
