"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const About = dynamic(() => import("@/components/sections/about").then(m => m.About), { ssr: false })
const Experience = dynamic(() => import("@/components/sections/experience").then(m => m.Experience), { ssr: false })
const Projects = dynamic(() => import("@/components/sections/projects").then(m => m.Projects), { ssr: false })
const Skills = dynamic(() => import("@/components/sections/skills").then(m => m.Skills), { ssr: false })
const Certifications = dynamic(() => import("@/components/sections/certifications").then(m => m.Certifications), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/contact").then(m => m.Contact), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer), { ssr: false })

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as "light" | "dark" | null
    if (saved) {
      setTheme(saved)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("portfolio-theme", next)
  }

  // Initially lock scroll
  useEffect(() => {
    if (!isUnlocked && typeof window !== "undefined") {
      const lockScroll = () => {
        const lenis = (window as any).lenis
        if (lenis) {
          lenis.stop()
        }
      }
      lockScroll()
      const interval = setInterval(() => {
        const lenis = (window as any).lenis
        if (lenis) {
          lenis.stop()
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isUnlocked])

  const handleEnter = () => {
    const mainEl = document.querySelector("main")

    // Instantly unlock scroll and layout in DOM so height is calculated correctly
    if (mainEl) {
      mainEl.classList.remove("h-screen", "overflow-hidden")
      mainEl.style.height = "auto"
      mainEl.style.overflow = "visible"
    }

    setIsUnlocked(true)

    // Trigger Lenis resize and scroll down
    setTimeout(() => {
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.resize() // Force recalculation of page height
        lenis.start()
        lenis.scrollTo("#about", {
          duration: 1.6,
          immediate: false,
          force: true,
        })
      }
    }, 100)
  }

  return (
    <SmoothScrollProvider>
      <main
        className={`min-h-screen cursor-none md:cursor-none transition-colors duration-500 ${
          isUnlocked ? "" : "h-screen overflow-hidden"
        } ${theme === "dark" ? "dark-theme bg-[#121212]" : "bg-[#e2e2e2]"}`}
      >
        <CustomCursor />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        {/* Pass theme control to Hero for cover page toggle */}
        <Hero onEnter={handleEnter} theme={theme} onToggleTheme={toggleTheme} />
        {/* Render rest of the sections */}
        <div>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  )
}
