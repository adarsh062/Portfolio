"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  {
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co.",
    image: "/jpmorgan.png",
    year: "2026"
  },
  {
    title: "Multi Cloud + DevOps Bootcamp",
    issuer: "DevOps Academy",
    image: "/devops.png",
    year: "2025"
  }
]

export function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-child"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === certifications.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? certifications.length - 1 : prev - 1))
  }

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative z-10 transition-colors duration-500"
      style={{ 
        background: "var(--background-theme)", 
        color: "var(--text-theme)", 
        paddingTop: "6rem", 
        paddingBottom: "8rem" 
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top rule + label */}
        <div className="anim-child flex items-center gap-6 mb-12">
          <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
          <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>05 / Certifications</span>
        </div>

        {/* Title */}
        <div className="anim-child mb-12 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <h2
            className="font-display text-5xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.01em", color: "var(--text-theme)" }}
          >
            Certifications &amp;
            <br />
            <em className="opacity-50" style={{ fontStyle: "italic", color: "var(--text-theme)" }}>Credentials</em>
          </h2>
          <span className="editorial-label opacity-45 font-mono text-sm hidden sm:block" style={{ color: "var(--text-theme)" }}>
            [CLICK ARROWS TO SLIDE LOOP]
          </span>
        </div>

        {/* Loop Slider Area */}
        <div className="anim-child flex flex-col items-center max-w-4xl mx-auto border-t border-black/10 dark:border-white/10 pt-10">
          
          {/* Certificate Image Frame */}
          <div 
            className="relative w-full aspect-[4/3] max-w-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl transition-all duration-500 bg-white/5"
          >
            <Image
              src={certifications[activeIndex].image}
              alt={certifications[activeIndex].title}
              fill
              className="object-contain p-4 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Certificate Label */}
          <div className="text-center mt-6">
            <h3 
              className="font-display text-2xl md:text-3xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-theme)" }}
            >
              {certifications[activeIndex].title}
            </h3>
            <p className="editorial-label text-sm opacity-60" style={{ color: "var(--text-theme)" }}>
              {certifications[activeIndex].issuer} · {certifications[activeIndex].year}
            </p>
          </div>

          {/* Left/Right Loop Buttons */}
          <div className="flex items-center gap-8 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 border border-black/15 dark:border-white/15 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Previous Certificate"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs opacity-50 font-semibold" style={{ color: "var(--text-theme)" }}>
              0{activeIndex + 1} / 0{certifications.length}
            </span>
            <button
              onClick={nextSlide}
              className="p-3 border border-black/15 dark:border-white/15 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Next Certificate"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
