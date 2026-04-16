"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { MagneticButton } from "@/components/magnetic-button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
    )

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)

      // scroll progress bar
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? scrolled / total : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        id="scroll-progress"
        aria-hidden="true"
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-4 transition-all duration-500 opacity-0 ${
          isScrolled ? "glass" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold font-mono tracking-tight transition-all duration-300"
            style={{ color: "oklch(0.95 0.005 268)" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.80 0.18 280)"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.95 0.005 268)"
            }}
          >
            AM<span style={{ color: "oklch(0.72 0.22 280)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-sm font-medium transition-all duration-300 relative group"
                style={{ color: "oklch(0.60 0.008 268)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.92 0.005 268)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.60 0.008 268)")}
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "oklch(0.72 0.22 280)" }}
                />
              </button>
            ))}

            <MagneticButton>
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary px-5 py-2.5 text-sm font-semibold"
              >
                Let&apos;s Talk
              </button>
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-xl transition-colors"
            style={{ color: "oklch(0.75 0.008 268)" }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden glass mt-3 mx-0 rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-left text-base font-medium transition-colors"
                  style={{ color: "oklch(0.65 0.008 268)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.92 0.005 268)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "oklch(0.65 0.008 268)")}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-primary mt-2 px-5 py-3 text-center text-sm font-semibold w-full"
              >
                Let&apos;s Talk
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
