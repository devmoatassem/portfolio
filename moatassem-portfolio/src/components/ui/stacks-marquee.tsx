'use client'

import {
  SiCloudflare,
  SiDrizzle,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRadixui,
  SiReact,
  SiReactquery,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiVitest,
  SiSupabase,
} from '@icons-pack/react-simple-icons'
import { Marquee } from './marquee'

export const StacksMarquee: React.FC = () => {
  return (
    <div className="flex h-40 flex-col gap-2 overflow-hidden">
      <Marquee gap="20px" className="py-4" fade pauseOnHover>
        <SiHtml5 className="size-10" />
        <SiJavascript className="size-10" />
        <SiTypescript className="size-10" />
        <SiFigma className="size-10" />
        <SiTailwindcss className="size-10" />
        <SiNextdotjs className="size-10" />
        <SiReact className="size-10" />
        <SiPython className="size-10" />
        <SiPostgresql className="size-10" />
        <SiRadixui className="size-10" />
        <SiMysql className="size-10" />
      </Marquee>
      <Marquee gap="20px" className="py-4" reverse fade pauseOnHover>
        <SiDrizzle className="size-10" />
        <SiPrisma className="size-10" />
        <SiSupabase className="size-10" />
        <SiFirebase className="size-10" />
        <SiGit className="size-10" />
        <SiVite className="size-10" />
        <SiCloudflare className="size-10" />
        <SiMarkdown className="size-10" />
        <SiVitest className="size-10" />
        <SiNodedotjs className="size-10" />
        <SiReactquery className="size-10" />
      </Marquee>
    </div>
  )
}
