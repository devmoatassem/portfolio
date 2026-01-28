import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getProjectsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'projects',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((project) => Boolean(project?.slug))
          .map((project) => ({
            loc: `${SITE_URL}/projects/${project?.slug}`,
            lastmod: project.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['projects-sitemap'],
  {
    tags: ['projects-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getProjectsSitemap()

  return getServerSideSitemap(sitemap)
}
