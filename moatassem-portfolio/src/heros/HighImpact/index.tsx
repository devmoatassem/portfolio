'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { GridBackground, Spotlight } from '@/components/ui/spotlight'
import { BackgroundCells } from '@/components/ui/background-ripple'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative overflow-hidden -mt-[10.4rem] text-white bg-black/[0.96]"
      data-theme="dark"
    >
      {/* <GridBackground /> */}
      <Spotlight />
      <BackgroundCells readOnly>
        <div className="container mb-8 relative  ">
          <div className="max-w-[36.5rem] md:text-center">
            {richText && <RichText className="mb-6 " data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        </div> */}
      </BackgroundCells>
    </div>
  )
}
