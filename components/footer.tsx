"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, ArrowUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      ref={footerRef}
      className="relative z-10 py-10 px-6 md:px-12 lg:px-20 border-t border-[var(--border-theme)]"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
      }}
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
            Adarsh Maurya
          </span>
          <span className="text-slate-400 text-xs">· Full-Stack &amp; AI Engineer</span>
        </div>

        {/* Info */}
        <span className="text-xs text-slate-500">
          © {new Date().getFullYear()} Adarsh Maurya. Built with Next.js &amp; Tailwind CSS.
        </span>

        {/* Links / Top scroll */}
        <div className="flex items-center gap-5 text-xs">


          <a
            href="https://github.com/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
          >
            GitHub
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-[#0a66c2] hover:underline"
          >
            LinkedIn
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <a
            href="https://codolio.com/profile/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400 hover:underline"
          >
            Codolio
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-[var(--border-theme)] hover:bg-[var(--bg-hover-theme)] text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
