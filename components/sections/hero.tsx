"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Sun, Moon } from "lucide-react"
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiDocker, 
  SiPython, 
  SiPostgresql, 
  SiNextdotjs, 
  SiTailwindcss 
} from "react-icons/si"

interface HeroProps {
  onEnter: () => void
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function Hero({ onEnter, theme, onToggleTheme }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate background elements (Text & Icons)
    tl.fromTo(bgTextRef.current, { opacity: 0, scale: 0.95 }, { opacity: 0.95, scale: 1, duration: 1.4 })
      .fromTo(iconsRef.current?.children || [], { opacity: 0, scale: 0.8 }, { opacity: 0.08, scale: 1, stagger: 0.04, duration: 1.2 }, "-=1.2")
      // Fade in the center button
      .fromTo(buttonRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      // Fade in bottom navigation (Name, Role)
      .fromTo(bottomNavRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-cover noise-overlay"
      style={{ 
        background: "radial-gradient(circle at center, #353535 0%, #151515 100%)",
        color: "#f4f4f4" 
      }}
    >
      {/* Floating Theme Toggle on Hero Cover (Top Right) */}
      <button
        onClick={onToggleTheme}
        className="absolute top-6 right-6 md:right-12 z-50 p-3 bg-white/[0.04] border border-white/10 hover:bg-white/10 transition-colors rounded-full cursor-pointer flex items-center justify-center"
        aria-label="Toggle light/dark mode"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5 text-white/80" />
        ) : (
          <Sun className="w-5 h-5 text-amber-400" />
        )}
      </button>

      {/* Full-screen Blurred processed banner image in Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.12] bg-cover bg-center filter blur-[6px] scale-105" 
        style={{ backgroundImage: "url('/banner.jpeg')" }} 
      />

      {/* Scattered Tech Watermark Icons in Background */}
      <div 
        ref={iconsRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      >
        <SiReact className="absolute text-6xl md:text-8xl top-[15%] left-[8%] float-slow-1" style={{ color: "#ffffff", opacity: 0 }} />
        <SiTypescript className="absolute text-5xl md:text-7xl top-[22%] right-[10%] float-slow-2" style={{ color: "#ffffff", opacity: 0 }} />
        <SiNodedotjs className="absolute text-6xl md:text-8xl bottom-[30%] left-[12%] float-slow-3" style={{ color: "#ffffff", opacity: 0 }} />
        <SiDocker className="absolute text-6xl md:text-8xl bottom-[25%] right-[14%] float-slow-1" style={{ color: "#ffffff", opacity: 0 }} />
        <SiPython className="absolute text-5xl md:text-7xl top-[45%] left-[5%] float-slow-2" style={{ color: "#ffffff", opacity: 0 }} />
        <SiPostgresql className="absolute text-5xl md:text-7xl top-[50%] right-[6%] float-slow-3" style={{ color: "#ffffff", opacity: 0 }} />
        <SiNextdotjs className="absolute text-5xl md:text-7xl top-[10%] right-[35%] float-slow-1" style={{ color: "#ffffff", opacity: 0, animationDelay: "1s" }} />
        <SiTailwindcss className="absolute text-5xl md:text-7xl bottom-[15%] left-[35%] float-slow-2" style={{ color: "#ffffff", opacity: 0, animationDelay: "2s" }} />
      </div>

      {/* Volumetric Studio Backdrop Glow behind the text */}
      <div 
        className="absolute w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full bg-white/[0.04] blur-[100px] sm:blur-[140px] pointer-events-none z-0"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* Center Layout Container: Name & Elevated Button */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-8 mt-4">
        {/* Name Title */}
        <div ref={bgTextRef} className="pointer-events-none">
          <h1
            className="font-serif text-[8.5vw] font-bold tracking-tight text-center uppercase select-none w-full whitespace-nowrap px-4 text-white/95 drop-shadow-[0_12px_40px_rgba(255,255,255,0.06)]"
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            ADARSH MAURYA
          </h1>
        </div>

        {/* Elevated Enter Portfolio Button */}
        <button
          ref={buttonRef}
          onClick={onEnter}
          className="border border-[#f4f4f4]/45 px-12 py-4 tracking-[0.25em] text-xs uppercase hover:bg-[#f4f4f4] hover:text-[#121212] hover:scale-[1.03] transition-all duration-500 backdrop-blur-md bg-white/[0.02] shadow-xl cursor-pointer"
        >
          Enter Portfolio
        </button>
      </div>

      {/* Bottom Information Wrapper */}
      <div 
        ref={bottomNavRef}
        className="absolute bottom-10 w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-center z-30"
      >
        {/* Bottom Left - Name */}
        <div className="w-1/2 text-left hidden md:block">
          <p className="font-serif text-lg tracking-wide opacity-80" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Adarsh Maurya
          </p>
        </div>

        {/* Bottom Right - Role */}
        <div className="w-1/2 text-right hidden md:block">
          <p className="font-serif text-lg tracking-wide text-white/60" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Software Engineer
          </p>
        </div>

        {/* Mobile Only - Name & Role */}
        <div className="flex flex-col items-center w-full md:hidden gap-1">
          <p className="font-serif text-lg tracking-wide opacity-80">Adarsh Maurya</p>
          <p className="font-serif text-sm text-white/60">Software Engineer</p>
        </div>
      </div>
    </section>
  )
}