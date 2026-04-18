"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ─── Water color palettes ────────────────────────────────────────────────────
// Day palette  → warm midday ocean: sapphire blue, cyan glints, sunlit silver
// Dusk palette → golden-hour purples + deep teal
// Night palette→ midnight navy, cool graphite, moonlit pearl
const DAY_WATER = {
  color:      0x0a3d6b,   // deep sapphire
  emissive:   0x0a2a4a,   // dim azure glow
  metalness:  0.80,
  roughness:  0.12,
  sky:        "#07203f",  // day sky bg
}

const DUSK_WATER = {
  color:      0x1a1047,   // violet-navy
  emissive:   0x120a30,
  metalness:  0.85,
  roughness:  0.15,
  sky:        "#0d0828",
}

const NIGHT_WATER = {
  color:      0x04080f,   // near-black midnight
  emissive:   0x020408,
  metalness:  0.92,
  roughness:  0.08,
  sky:        "#010208",  // deepest night
}

/** Linearly interpolate between two hex colors (returns hex number) */
function lerpColor(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 0xff, ag = (a >> 8) & 0xff, ab = a & 0xff
  const br = (b >> 16) & 0xff, bg = (b >> 8) & 0xff, bb = b & 0xff
  return (
    (Math.round(ar + (br - ar) * t) << 16) |
    (Math.round(ag + (bg - ag) * t) << 8) |
     Math.round(ab + (bb - ab) * t)
  )
}

/** Interpolate between two CSS hex-string sky colors */
function lerpSkyColor(a: string, b: string, t: number): string {
  const pr = parseInt(a.slice(1, 3), 16)
  const pg = parseInt(a.slice(3, 5), 16)
  const pb = parseInt(a.slice(5, 7), 16)
  const qr = parseInt(b.slice(1, 3), 16)
  const qg = parseInt(b.slice(3, 5), 16)
  const qb = parseInt(b.slice(5, 7), 16)
  const rr = Math.round(pr + (qr - pr) * t).toString(16).padStart(2, "0")
  const rg = Math.round(pg + (qg - pg) * t).toString(16).padStart(2, "0")
  const rb = Math.round(pb + (qb - pb) * t).toString(16).padStart(2, "0")
  return `#${rr}${rg}${rb}`
}

export function HeroScene() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const overlayRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let app: any
    let scrollTimeout: NodeJS.Timeout

    const init = async () => {
      try {
        const module = await import("threejs-components/build/backgrounds/liquid1.min.js")
        const LiquidBackground = module.default || module

        if (typeof LiquidBackground !== "function") return

        app = LiquidBackground(canvasRef.current)

        // ─── Initial "day" water appearance ──────────────────────────────────
        const isMobile = window.innerWidth < 768
        const mat = app.liquidPlane.material

        mat.metalness  = DAY_WATER.metalness
        mat.roughness  = DAY_WATER.roughness
        if (mat.color)    mat.color.setHex(DAY_WATER.color)
        if (mat.emissive) mat.emissive.setHex(DAY_WATER.emissive)

        app.liquidPlane.uniforms.displacementScale.value = isMobile ? 2.5 : 4.0
        app.setRain(false)

        if (app.renderer) {
          app.renderer.setPixelRatio(
            isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)
          )
          app.renderer.toneMapping = 4        // ACESFilmicToneMapping
          app.renderer.toneMappingExposure = 1.4
        }

        // Set initial background sky colour
        if (bgRef.current) bgRef.current.style.background = DAY_WATER.sky

        // Fade in canvas smoothly
        gsap.to(canvasRef.current, {
          opacity: 1,
          duration: 2.5,
          ease: "sine.inOut",
        })

        // ─── Scroll-driven day→dusk→night colour transition ─────────────────
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (!app?.liquidPlane) return

            const p = self.progress          // 0 (top) → 1 (bottom)

            // Piecewise: [0..0.45] day→dusk, [0.45..1] dusk→night
            let waterColor: number, emissiveColor: number
            let skyA: string, skyB: string
            let metalness: number, roughness: number
            let lt: number   // local blend t

            if (p <= 0.45) {
              lt = p / 0.45
              waterColor    = lerpColor(DAY_WATER.color,  DUSK_WATER.color,  lt)
              emissiveColor = lerpColor(DAY_WATER.emissive, DUSK_WATER.emissive, lt)
              skyA = DAY_WATER.sky;   skyB = DUSK_WATER.sky
              metalness     = DAY_WATER.metalness  + (DUSK_WATER.metalness  - DAY_WATER.metalness)  * lt
              roughness     = DAY_WATER.roughness  + (DUSK_WATER.roughness  - DAY_WATER.roughness)  * lt
            } else {
              lt = (p - 0.45) / 0.55
              waterColor    = lerpColor(DUSK_WATER.color,  NIGHT_WATER.color,  lt)
              emissiveColor = lerpColor(DUSK_WATER.emissive, NIGHT_WATER.emissive, lt)
              skyA = DUSK_WATER.sky;  skyB = NIGHT_WATER.sky
              metalness     = DUSK_WATER.metalness + (NIGHT_WATER.metalness - DUSK_WATER.metalness) * lt
              roughness     = DUSK_WATER.roughness + (NIGHT_WATER.roughness - DUSK_WATER.roughness) * lt
            }

            // Apply to material
            if (mat.color)    mat.color.setHex(waterColor)
            if (mat.emissive) mat.emissive.setHex(emissiveColor)
            mat.metalness = metalness
            mat.roughness = roughness
            mat.needsUpdate = true

            // Sky background
            if (bgRef.current) {
              bgRef.current.style.background = lerpSkyColor(skyA, skyB, lt)
              // toggle night-mode so CSS star-field becomes visible
              if (p > 0.45) {
                bgRef.current.classList.add("night-mode")
              } else {
                bgRef.current.classList.remove("night-mode")
              }
            }

            // Overlay tint – subtle deep-blue vignette grows at night
            if (overlayRef.current) {
              const nightAlpha = p > 0.45
                ? (p - 0.45) / 0.55 * 0.55
                : 0
              overlayRef.current.style.opacity = String(nightAlpha)
            }

            // ─── Splash on scroll velocity ────────────────────────────────
            const isMob = window.innerWidth < 768
            const velocitySplash = Math.min(Math.abs(self.getVelocity() / 250), isMob ? 4 : 10)
            const baseSplash = isMob ? 9 : 14

            gsap.to(app.liquidPlane.uniforms.displacementScale, {
              value: baseSplash + velocitySplash,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            })

            clearTimeout(scrollTimeout)
            scrollTimeout = setTimeout(() => {
              gsap.to(app.liquidPlane.uniforms.displacementScale, {
                value: isMob ? 2.5 : 4.0,
                duration: 2.8,
                ease: "elastic.out(1, 0.28)",
                overwrite: "auto",
              })
            }, 160)
          },
        })

        // ─── Mouse parallax ───────────────────────────────────────────────
        const handleMouseMove = (e: MouseEvent) => {
          if (!canvasRef.current) return
          const x = (e.clientX / window.innerWidth - 0.5) * 18
          const y = (e.clientY / window.innerHeight - 0.5) * 18
          gsap.to(canvasRef.current, {
            x, y,
            duration: 1.8,
            ease: "power2.out",
          })
        }
        window.addEventListener("mousemove", handleMouseMove, { passive: true })

        return () => window.removeEventListener("mousemove", handleMouseMove)
      } catch (err) {
        console.error("Error loading fluid background:", err)
      }
    }

    const cleanup = init()

    return () => {
      cleanup?.then((fn) => fn?.())
      ScrollTrigger.getAll().forEach((t) => t.kill())
      clearTimeout(scrollTimeout)
      if (app && typeof app.destroy === "function") app.destroy()
    }
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ transition: "background 0.6s ease" }}
    >
      {/* Sun/Moon light shimmer overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 35% at 50% -5%,
              rgba(100, 200, 255, 0.18) 0%,
              transparent 70%
            )
          `,
          mixBlendMode: "screen",
        }}
      />

      {/* Night deep-ocean vignette (fades in via scrolling) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          opacity: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%,
              rgba(0, 4, 20, 0.9) 0%,
              rgba(0, 10, 40, 0.5) 40%,
              transparent 75%
            )
          `,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Animated star field — only visible when scrolled into night */}
      <div className="absolute inset-0 z-15 pointer-events-none star-field" />

      <div className="w-full h-full scale-[1.05] flex items-center justify-center relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-0"
        />
      </div>
    </div>
  )
}
