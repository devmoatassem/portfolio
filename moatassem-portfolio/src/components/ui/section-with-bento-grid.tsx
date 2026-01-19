import React from 'react'
import { cn } from '@/utilities/ui'

// Extract numeric value from mdColSpan string
const extractColSpan = (colSpanStr: string): number => {
  const match = colSpanStr.match(/lg:col-span-(\d+)/)
  return match && match[1] ? parseInt(match[1]) : 1
}

// Calculate grid layout information for all items
function calculateGridLayout(colSpanArray: string[]) {
  const layout: Array<{
    rowIndex: number
    colStart: number
    colEnd: number
    isLastInRow: boolean
  }> = []

  let currentCol = 0
  let rowIndex = 0

  for (let i = 0; i < colSpanArray.length; i++) {
    const colSpanStr = colSpanArray[i]
    if (!colSpanStr) continue

    const span = extractColSpan(colSpanStr)
    const colStart = currentCol
    const colEnd = currentCol + span

    currentCol += span

    // Check if we need to wrap to next row
    const isLastInRow = currentCol >= 12

    layout[i] = {
      rowIndex,
      colStart,
      colEnd,
      isLastInRow,
    }

    if (currentCol >= 12) {
      currentCol = 0
      rowIndex++
    }
  }

  // Mark the last item in the grid as last in its row if not already marked
  const lastIndex = layout.length - 1
  if (lastIndex >= 0 && layout[lastIndex] && !layout[lastIndex].isLastInRow) {
    layout[lastIndex].isLastInRow = true
  }

  return layout
}

export function getDynamicGridClasses(
  index: number,
  colSpanArray: string[],
): { borderClasses: string; hoverClasses: string } {
  const layout = calculateGridLayout(colSpanArray)
  const currentItem = layout[index]

  if (!currentItem) {
    return { borderClasses: '', hoverClasses: '' }
  }

  const { rowIndex, isLastInRow } = currentItem
  const totalItems = colSpanArray.length
  const isLastItem = index === totalItems - 1

  // Border logic
  const borders: string[] = []

  // Find the last row index
  const maxRowIndex = Math.max(...layout.map((item) => item.rowIndex))
  const isInLastRow = rowIndex === maxRowIndex

  // Add bottom border if not last item and not in last row
  if (!isLastItem && !isInLastRow) {
    borders.push('border-b')
  } else if (!isLastItem) {
    borders.push('border-b lg:border-b-0')
  }

  // Add right border on medium screens if not last in row
  if (!isLastInRow) {
    borders.push('lg:border-r')
  }

  // Hover logic based on row numbers (2, 4, 6 vs others)
  const isEvenRow = (rowIndex + 1) % 2 === 0 && [2, 4, 6].includes(rowIndex + 1)

  const hoverClasses = isEvenRow
    ? 'opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t lg:bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none'
    : 'opacity-0 group-hover:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none'

  return {
    borderClasses: borders.join(' '),
    hoverClasses,
  }
}
export const SectionCard = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => {
  return <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>{children}</div>
}

export const SectionTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-foreground text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

export const SectionDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        'text-sm md:text-base max-w-4xl text-left mx-auto',
        'text-neutral-500 text-center font-normal dark:text-neutral-300',
        'text-left max-w-sm mx-0 md:text-sm my-2',
      )}
    >
      {children}
    </p>
  )
}
