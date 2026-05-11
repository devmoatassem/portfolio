'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { RichText } from '@/components/RichText'
import { Spotlight } from '@/components/ui/spotlight'

const HIGH_IMPACT_BG_STYLES = `
@keyframes hjPanGrid {
  0% { transform: translateY(0); }
  100% { transform: translateY(48px); }
}
@keyframes hjPulseGlow {
  0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); }
  50% { opacity: 0.5; transform: scale(1.05) translate(0, 2%); }
}
@keyframes hjScanLight {
  0% { transform: translateX(-150%); }
  50%, 100% { transform: translateX(300%); }
}
@keyframes hjFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes hjFadeInGrid {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.hj-bg-fade-in {
  opacity: 0;
  animation: hjFadeIn 1.5s ease-out forwards;
}
.hj-bg-fade-in-delay {
  opacity: 0;
  animation: hjFadeIn 1.5s ease-out 200ms forwards;
}
.hj-grid-fade-in {
  opacity: 0;
  animation: hjFadeInGrid 1.5s ease-out forwards;
}
`

export const HighImpactHero: React.FC<Page['hero']> = ({ links, richText }) => {
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
      <div className="relative min-h-fit max-h-screen flex justify-center overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: HIGH_IMPACT_BG_STYLES }} />

        {/* Moving grid */}
        <div
          className="hj-grid-fade-in pointer-events-none absolute inset-0 -top-12 z-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              height: '200%',
              animation: 'hjPanGrid 15s linear infinite',
            }}
          />
        </div>

        {/* Breathing radial glow */}
        <div className="hj-bg-fade-in pointer-events-none absolute inset-0 z-0 flex justify-center">
          <div
            className="absolute -top-[25vh] h-[60vh] w-[100vw] rounded-[100%] bg-zinc-600/20 blur-[100px] md:h-[50vh] md:w-[60vw]"
            style={{ animation: 'hjPulseGlow 8s ease-in-out infinite' }}
          />
        </div>

        {/* Animated top border line */}
        <div className="hj-bg-fade-in-delay pointer-events-none absolute left-0 right-0 top-0 z-0 h-px overflow-hidden bg-zinc-800/40">
          <div
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-zinc-400/80 to-transparent md:w-1/3"
            style={{ animation: 'hjScanLight 7s ease-in-out infinite' }}
          />
        </div>

        <div className="relative z-50 flex items-center justify-center">
          <div className="container mb-16 min-h-96 mt-40 grid place-items-center">
            <div className=" md:text-center">
              {richText && <RichText className="mb-6 " data={richText} enableGutter={false} />}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex md:justify-center gap-4 ">
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
        </div>
      </div>

      {/* <div className="min-h-[90vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        </div> */}
    </div>
  )
}
