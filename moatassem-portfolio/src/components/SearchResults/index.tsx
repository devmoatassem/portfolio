import { cn } from '@/utilities/ui'
import React from 'react'
import { Search as SearchType } from '@/payload-types'
import { FileText, FolderKanban, MoveRight } from 'lucide-react'
import { Media } from '@/components/Media'
import Link from 'next/link'

export type Props = {
  data: Pick<SearchType, 'id' | 'title' | 'slug' | 'description' | 'heroImage' | 'relationTo'>[]
}

export const SearchResults: React.FC<Props> = (props) => {
  const { data } = props
  return (
    <div className={cn('container space-y-5')}>
      {data?.map((result, index) => (
        <div
          key={index}
          className="group relative bg-background2 border border-border rounded-2xl overflow-hidden hover:border-muted transition-all duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="relative md:w-64 h-48 md:h-auto overflow-hidden bg-background2">
              {!result.heroImage && <div className="text-muted-foreground">No image</div>}
              {result.heroImage && typeof result.heroImage !== 'string' && (
                <Media
                  resource={result.heroImage}
                  imgClassName="object-cover object-left-top absolute h-full w-full inset-0 group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t dark:bg-gradient-to-b from-black/80 to-transparent"></div>
              {/* Type Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-primary  dark:bg-black/10 backdrop-blur-sm rounded-full border border-primary ">
                {result.relationTo === 'posts' ? (
                  <FileText className="w-3.5 h-3.5 " />
                ) : (
                  <FolderKanban className="w-3.5 h-3.5" />
                )}
                <span className="text-xs font-medium uppercase tracking-wider">
                  {result.relationTo?.slice(0, -1)}
                </span>
              </div>
            </div>
            {/* Content Section */}
            <div className="flex-1 p-6 md:p-7">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-muted-foreground transition-colors line-clamp-2">
                {result.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-4">
                {result.description}
              </p>
              {/* Read More Link */}
              <Link
                href={`${result.slug}`}
                className="flex items-center gap-2 text-foreground text-sm font-medium group-hover:gap-3 transition-all"
              >
                <span>Read more</span>
                <MoveRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* Subtle Gradient Border Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zinc-100/10 via-zinc-200/10 to-zinc-100/10 dark:from-zinc-700/20 dark:via-zinc-600/20 dark:to-zinc-700/20"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
