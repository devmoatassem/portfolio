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
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const [clickedCell, setClickedCell] = useState<{ x: number; y: number; id: number }[]>([])
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

  const handleMouseLeave = () => {
    setMousePosition({ x: -1000, y: -1000 })
  }

  const handleClick = (event: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const x = Math.floor((event.clientX - rect.left) / 48)
      const y = Math.floor((event.clientY - rect.top) / 48)
      const newId = Date.now()
      
      setClickedCell(prev => [...prev, { x, y, id: newId }])
      
      setTimeout(() => {
        setClickedCell(prev => prev.filter(cell => cell.id !== newId))
      }, 1000)
    }
  }

  const size = 300
  return (
    <div className="h-full absolute inset-0 w-full">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="absolute h-full inset-y-0 overflow-hidden w-full cursor-pointer"
      >
        <div className="absolute h-full w-full pointer-events-none -bottom-2 z-30 bg-neutral-950 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        
        {/* Glow revealed by mouse */}
        <div
          className="absolute inset-0 z-10 bg-transparent transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskImage: `radial-gradient(${size / 4}px circle at center, white, transparent)`,
            WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
            WebkitMaskSize: `${size}px`,
            maskSize: `${size}px`,
            pointerEvents: 'none',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            opacity: mousePosition.x !== -1000 ? 1 : 0,
          }}
        >
          {/* Blue grid inside mouse glow */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(37,99,235,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
        
        {/* Neutral background grid, perfectly infinite */}
        <div 
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(82,82,82,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(82,82,82,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Hover highlight block */}
        <div
          className="absolute pointer-events-none transition-all duration-150 ease-out bg-[rgba(14,165,233,0.3)]"
          style={{
            left: `${Math.floor(mousePosition.x / 48) * 48}px`,
            top: `${Math.floor(mousePosition.y / 48) * 48}px`,
            width: '48px',
            height: '48px',
            opacity: mousePosition.x !== -1000 ? 1 : 0,
          }}
        />

        {/* Click ripple effects */}
        {clickedCell.map((cell) => (
          <div
            key={cell.id}
            className="absolute pointer-events-none"
            style={{
              left: `${cell.x * 48 + 24}px`,
              top: `${cell.y * 48 + 24}px`,
            }}
          >
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 500, height: 500, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400 bg-sky-400/20"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

