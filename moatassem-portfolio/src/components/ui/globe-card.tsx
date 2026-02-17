'use client'
import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'

export const GlobeCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const fadeMask =
    'radial-gradient(circle at 50% 50%, rgb(0, 0, 0) 60%, rgb(0, 0, 0, 0) 70%)'

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  useEffect(() => {
    if (!canvasRef.current) return

    // ✅ Check WebGL support before attempting to create the globe
    const testCanvas = document.createElement('canvas')
    const gl =
      testCanvas.getContext('webgl') ||
      testCanvas.getContext('experimental-webgl')
    if (!gl) {
      console.warn('WebGL not supported — globe will not render.')
      return
    }

    let width = 0

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    // ✅ Add the resize listener unconditionally (was inside the if-block before)
    window.addEventListener('resize', onResize)
    onResize()

    let globe: ReturnType<typeof createGlobe> | null = null

    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 2,
        mapSamples: 12_000,
        mapBrightness: 2,
        baseColor: [0.8, 0.8, 0.8],
        markerColor: [1, 1, 1],
        glowColor: [0.5, 0.5, 0.5],
        markers: [{ location: [30.3753, 69.3451], size: 0.1 }],
        scale: 1.05,
        onRender: (state) => {
          state.phi = 3.55 + r.get()
          state.width = width * 2
          state.height = width * 2
        },
      })
    } catch (err) {
      console.warn('Globe creation failed:', err)
    }

    return () => {
      globe?.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [r])

  return (
    <div className="relative h-60">
      <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[350px]">
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            placeItems: 'center',
            placeContent: 'center',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
              maxWidth: 800,
              WebkitMaskImage: fadeMask,
              maskImage: fadeMask,
            }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={(e) => {
                pointerInteracting.current =
                  e.clientX - pointerInteractionMovement.current
                if (canvasRef.current)
                  canvasRef.current.style.cursor = 'grabbing'
              }}
              onPointerUp={() => {
                pointerInteracting.current = null
                if (canvasRef.current)
                  canvasRef.current.style.cursor = 'grab'
              }}
              onPointerOut={() => {
                pointerInteracting.current = null
                if (canvasRef.current)
                  canvasRef.current.style.cursor = 'grab'
              }}
              onMouseMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  api.start({ r: delta / 200 })
                }
              }}
              onTouchMove={(e) => {
                if (pointerInteracting.current !== null && e.touches[0]) {
                  const delta =
                    e.touches[0].clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta
                  api.start({ r: delta / 100 })
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                contain: 'layout paint size',
                cursor: 'auto',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
