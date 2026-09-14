"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, Sun, Moon, FileText, ArrowUpRight } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
]

interface NavbarProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY
      setIsScrolled(sy > 40)

      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? sy / total : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    // Run once on mount to set initial state
    handleScroll()

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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2.5px",
          background: "linear-gradient(90deg, #2563EB, #38BDF8)",
          zIndex: 10000,
          transformOrigin: "left",
          transform: "scaleX(0)",
          transition: "transform 0.1s linear",
          width: "100%",
        }}
      />

      {/* 
        Navbar Container:
        - When at top (!isScrolled): Normal full-width navbar at top-0
        - When scrolled (isScrolled): Transitions into a floating island pill
      */}
      <header
        className={`fixed z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "top-3 md:top-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[90%] max-w-5xl rounded-2xl border border-[var(--border-theme)] shadow-lg shadow-black/5 dark:shadow-black/30"
            : "top-0 left-0 right-0 w-full border-b border-[var(--border-theme)]/50 shadow-none"
        }`}
        style={{
          background: "var(--nav-bg-theme)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          color: "var(--text-theme)",
        }}
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "px-4 sm:px-6 py-2.5"
              : "max-w-7xl px-6 md:px-12 lg:px-20 py-4"
          }`}
        >
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="font-display text-base sm:text-lg font-bold tracking-tight transition-opacity duration-200 hover:opacity-80 flex items-center gap-1.5 shrink-0"
            style={{ color: "var(--text-theme)" }}
          >
            <span>Adarsh Maurya</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          </a>

          {/* Desktop Links & Controls */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="text-xs font-medium tracking-wide transition-colors duration-200 opacity-75 hover:opacity-100 hover:text-blue-600 cursor-pointer"
                style={{ color: "var(--text-theme)" }}
              >
                {label}
              </button>
            ))}

            {/* Resume Button (Navbar) */}
            <a
              href="/Adarsh_Maurya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-600/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>

            {/* Let's Talk CTA */}
            <button
              onClick={() => scrollTo("#contact")}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer shadow-xs shadow-blue-600/20"
            >
              Let&apos;s Talk
            </button>

            {/* Day/Night Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-theme)] transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Resume link */}
            <a
              href="/Adarsh_Maurya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.7rem] font-semibold px-2.5 py-1 rounded-md border border-blue-600/30 text-blue-600 dark:text-blue-400 bg-blue-500/10"
            >
              <FileText className="w-3 h-3" />
              <span>CV</span>
            </a>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-theme)] transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              aria-label="Toggle light/dark mode"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              className="p-1.5 rounded-lg hover:bg-[var(--bg-hover-theme)] transition-colors cursor-pointer"
              style={{ color: "var(--text-theme)" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div
            className="md:hidden px-6 pb-6 pt-2 transition-all duration-300"
            style={{
              borderTop: "1px solid var(--border-theme)",
            }}
          >
            <div className="flex flex-col gap-3 pt-2">
              {navLinks.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="text-left text-sm py-2 font-medium opacity-80 hover:opacity-100 hover:text-blue-600 cursor-pointer"
                  style={{ color: "var(--text-theme)" }}
                >
                  {label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="/Adarsh_Maurya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg border border-blue-600/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 text-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="text-xs font-semibold py-2.5 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer"
                >
                  Let&apos;s Talk
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
