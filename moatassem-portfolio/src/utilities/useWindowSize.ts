"use client"

import * as React from "react"

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 800

function subscribeResize(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange)
  return () => window.removeEventListener("resize", onStoreChange)
}

/**
 * Live viewport size. Server snapshot uses defaults so markup matches first paint before hydration.
 */
export function useWindowSize(): { width: number; height: number } {
  const width = React.useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth,
    () => DEFAULT_WIDTH,
  )
  const height = React.useSyncExternalStore(
    subscribeResize,
    () => window.innerHeight,
    () => DEFAULT_HEIGHT,
  )
  return { width, height }
}
