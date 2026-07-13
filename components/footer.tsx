"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top 95%",
            scrub: true,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative z-10 py-12 px-6 md:px-12 lg:px-24 transition-colors duration-500"
      style={{
        borderTop: "1px solid var(--border-theme)",
        background: "var(--background-theme)",
        color: "var(--text-theme)",
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <span className="font-display text-base font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-theme)" }}>
          Adarsh Maurya<span className="opacity-30">.</span>
        </span>

        {/* Info */}
        <span className="editorial-label opacity-40" style={{ fontSize: "0.6rem", color: "var(--text-theme)" }}>
          © {new Date().getFullYear()} · Minimalist Editorial Design
        </span>

        {/* Socials / Top scroll */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hover:text-blue-800 transition-colors"
            style={{
              color: "#0066cc",
              borderBottomColor: "rgba(0, 102, 204, 0.4)",
              fontSize: "0.8rem",
            }}
          >
            GitHub
            <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
          </a>
          <a
            href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hover:text-blue-800 transition-colors"
            style={{
              color: "#0066cc",
              borderBottomColor: "rgba(0, 102, 204, 0.4)",
              fontSize: "0.8rem",
            }}
          >
            LinkedIn
            <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
          </a>
          <a
            href="https://codolio.com/profile/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hover:text-blue-800 transition-colors"
            style={{
              color: "#0066cc",
              borderBottomColor: "rgba(0, 102, 204, 0.4)",
              fontSize: "0.8rem",
            }}
          >
            Codolio
            <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
          </a>
        </div>
      </div>
    </footer>
  )
}
