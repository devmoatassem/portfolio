'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { cn } from '@/utilities/ui'

interface BackgroundCellsProps {
  children?: React.ReactNode
  className?: string
  readOnly?: boolean
}

export const BackgroundCells = ({ children, className, readOnly }: BackgroundCellsProps) => {
  return (
    <div
      className={cn(
        'relative min-h-[80vh] max-h-screen flex justify-center overflow-hidden',
        className,
      )}
    >
      {children && (
        <div
          className={cn(
            'relative z-50 flex items-center justify-center',
            readOnly && 'pointer-events-none select-none',
          )}
          // style={{
          //   zIndex: 9999,
          // }}
        >
          {children}
        </div>
      )}
      <BackgroundCellCore />
    </div>
  )
}

const BackgroundCellCore = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }

  const size = 300
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="h-full absolute inset-0">
      <div className="absolute h-full inset-y-0 overflow-hidden">
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-30 bg-neutral-950 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div
          className="absolute inset-0 z-10 bg-transparent"
          style={{
            maskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: 'none',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        >
          <Pattern cellClassName="border-blue-600 relative z-[100]" />
        </div>
        <Pattern className="opacity-[0.5]" cellClassName="border-neutral-700" />
      </div>
    </div>
  )
}
// New component to handle individual cells with hooks
interface PatternCellProps {
  rowIdx: number
  colIdx: number
  clickedCell: [number, number] | null
  setClickedCell: (cell: [number, number] | null) => void
  cellClassName?: string
}

const PatternCell = ({
  rowIdx,
  colIdx,
  clickedCell,
  setClickedCell,
  cellClassName,
}: PatternCellProps) => {
  const controls = useAnimation()

  useEffect(() => {
    if (clickedCell) {
      const distance = Math.sqrt(
        Math.pow(clickedCell[0] - rowIdx, 2) + Math.pow(clickedCell[1] - colIdx, 2),
      )
      controls.start({
        opacity: [0, 1 - distance * 0.1, 0],
        transition: { duration: distance * 0.2 },
      })
    }
  }, [clickedCell, controls, rowIdx, colIdx])

  return (
    <div
      className={cn('bg-transparent border-l border-b border-neutral-600', cellClassName)}
      onClick={() => setClickedCell([rowIdx, colIdx])}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        animate={controls}
        className="bg-[rgba(14,165,233,0.3)] h-12 w-12"
      />
    </div>
  )
}
interface PatternProps {
  className?: string
  cellClassName?: string
}

const Pattern = ({ className, cellClassName }: PatternProps) => {
  const x = new Array(47).fill(0)
  const y = new Array(30).fill(0)
  const matrix = x.map((_, i) => y.map((_, j) => [i, j]))
  const [clickedCell, setClickedCell] = useState<[number, number] | null>(null)

  return (
    <div className={cn('flex flex-row relative z-20', className)}>
      {matrix.map((row, rowIdx) => (
        <div key={`matrix-row-${rowIdx}`} className="flex flex-col relative z-10 border-b">
          {row.map((_, colIdx) => (
            <PatternCell
              key={`pattern-cell-${rowIdx}-${colIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              clickedCell={clickedCell}
              setClickedCell={setClickedCell}
              cellClassName={cellClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
