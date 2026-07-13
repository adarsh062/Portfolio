"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X, Sun, Moon } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

interface NavbarProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      const heroHeight = window.innerHeight
      
      setIsScrolled(sy > 60)
      setPastHero(sy > heroHeight * 0.85)

      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? sy / total : 0
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
      {/* Scroll progress bar - using CSS Variables */}
      <div
        ref={progressRef}
        id="scroll-progress"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          background: "var(--text-theme)",
          zIndex: 10000,
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.1s linear, background-color 0.3s ease",
          width: "100%",
          opacity: pastHero ? 1 : 0,
        }}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: "var(--nav-bg-theme)",
          backdropFilter: "blur(12px)",
          borderBottom: isScrolled ? "1px solid var(--border-theme)" : "1px solid transparent",
          color: "var(--text-theme)",
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: pastHero ? "auto" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="font-display text-xl font-bold tracking-tight transition-opacity duration-300 hover:opacity-70"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "var(--text-theme)"
            }}
          >
            AM<span style={{ color: "var(--text-theme)", opacity: 0.3 }}>.</span>
          </a>

          {/* Desktop Links & Controls */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="editorial-label hover:opacity-100 transition-opacity duration-300 relative group opacity-70"
                style={{
                  cursor: "pointer",
                  color: "var(--text-theme)"
                }}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "var(--text-theme)" }}
                />
              </button>
            ))}

            {/* Let's Talk CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className="editorial-label border px-5 py-2 transition-all duration-300 cursor-pointer rounded-none hover:bg-[var(--text-theme)] hover:text-[var(--background-theme)]"
              style={{
                borderColor: "var(--text-theme)",
                color: "var(--text-theme)",
                background: "transparent",
              }}
            >
              Let&apos;s Talk
            </button>

             {/* Day/Night Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors duration-300 cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6" style={{ color: "var(--text-theme)" }} />
              ) : (
                <Sun className="w-6 h-6 text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-5.5 h-5.5" style={{ color: "var(--text-theme)" }} />
              ) : (
                <Sun className="w-5.5 h-5.5 text-amber-400" />
              )}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              className="p-2 transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" style={{ color: "var(--text-theme)" }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: "var(--text-theme)" }} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div
            className="md:hidden px-6 pb-6 transition-all duration-300"
            style={{
              background: "var(--nav-bg-theme)",
              borderTop: "1px solid var(--border-theme)",
            }}
          >
            <div className="flex flex-col gap-5 pt-5">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-left editorial-label opacity-70"
                  style={{
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    color: "var(--text-theme)"
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="editorial-label mt-2 border px-5 py-3 text-center transition-all duration-300 w-full cursor-pointer"
                style={{
                  borderColor: "var(--text-theme)",
                  background: "var(--text-theme)",
                  color: "var(--background-theme)",
                }}
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
