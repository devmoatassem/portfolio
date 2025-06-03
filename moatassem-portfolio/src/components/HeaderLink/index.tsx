import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import { ArrowRight } from 'lucide-react'

type HeaderLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const HeaderLink: React.FC<HeaderLinkType> = (props) => {
  const {
    type,
    appearance = 'link',

    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // /* Ensure we don't break any styles set by richText */
  // if (appearance === 'inline') {
  //   return (
  //     <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
  //       {label && label}
  //       {children && children}
  //     </Link>
  //   )
  // }

  return (
    <div className="flex justify-between items-center">
      {label && <label htmlFor="">{label}</label>}
      <Button asChild className={className} size={size} variant={'link'}>
        <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
          <ArrowRight size={20} />
        </Link>
      </Button>
    </div>
  )
}
