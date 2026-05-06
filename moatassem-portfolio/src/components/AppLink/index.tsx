'use client'

import NextLink from 'next/link'
import { forwardRef, type ComponentProps } from 'react'

type AppLinkProps = ComponentProps<typeof NextLink>

/** Wraps `next/link` with prefetch off by default to avoid unused CSS preload warnings from route prefetch (see vercel/next.js#51524). */
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { prefetch = false, ...props },
  ref,
) {
  return <NextLink prefetch={prefetch} ref={ref} {...props} />
})
