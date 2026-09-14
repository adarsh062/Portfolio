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
const Achievements = dynamic(() => import("@/components/sections/achievements").then(m => m.Achievements), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/contact").then(m => m.Contact), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer), { ssr: false })

export default function Home() {
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

  return (
    <SmoothScrollProvider>
      <main
        className={`min-h-screen cursor-none md:cursor-none transition-colors duration-500 bg-[var(--background-theme)] ${
          theme === "dark" ? "dark-theme" : ""
        }`}
      >
        <CustomCursor />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        {/* Render the sections */}
        <Hero theme={theme} onToggleTheme={toggleTheme} />
        <div>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Achievements />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScrollProvider>
  )
}
