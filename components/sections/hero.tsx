"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { HeroScene } from "@/components/hero-scene"
import { MagneticButton } from "@/components/magnetic-button"
import { ArrowDown, Github, Linkedin } from "lucide-react"

export function Hero() {
  const tagRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(tagRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4 })
      .fromTo(nameRef.current, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1.1 }, "-=0.3")
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
      .fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
      .fromTo(linksRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Canvas */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Tag line */}
        <span
          ref={tagRef}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase opacity-0 bg-white/5 border border-white/10 text-purple-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Available for opportunities
        </span>

        {/* Name (Clean, high performance text) */}
        <h1
  ref={nameRef}
  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-5 opacity-0 leading-none relative z-20"
>
  <span className="block text-white">Adarsh</span>
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
    Maurya
  </span>
</h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed opacity-0"
        >
          Full-Stack & AI Developer · IIIT Bhopal · Building{" "}
          <span className="text-white font-medium">scalable products</span> that solve real problems
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 mb-8"
        >
          <MagneticButton>
            <button
              onClick={() => scrollTo("projects")}
              className="px-8 py-4 text-base font-semibold rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
            >
              View Projects
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={() => scrollTo("contact")}
              className="px-8 py-4 text-base font-medium rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </button>
          </MagneticButton>
        </div>

        {/* Social quick links */}
        <div ref={linksRef} className="flex items-center justify-center gap-5 opacity-0">
          <a
            href="https://github.com/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110 bg-white/5 border border-white/10 text-white hover:bg-white/20"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full transition-all duration-300 hover:scale-110 bg-white/5 border border-white/10 text-white hover:bg-white/20"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <span className="text-xs font-mono tracking-widest px-4 py-2 rounded-full bg-white/5 text-gray-300 border border-white/5">
            mauryadarsh9140@gmail.com
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("about")}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "oklch(0.45 0.008 268)" }}
        >
          scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: "oklch(0.72 0.22 280 / 0.2)" }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: "50%",
              background: "oklch(0.72 0.22 280)",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  )
}
