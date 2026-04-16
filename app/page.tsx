"use client"

import dynamic from 'next/dynamic'

import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

const About = dynamic(() => import("@/components/sections/about").then(m => m.About), { ssr: false })
const Projects = dynamic(() => import("@/components/sections/projects").then(m => m.Projects), { ssr: false })
const Skills = dynamic(() => import("@/components/sections/skills").then(m => m.Skills), { ssr: false })
const Contact = dynamic(() => import("@/components/sections/contact").then(m => m.Contact), { ssr: false })
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer), { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-background cursor-none md:cursor-none">
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </SmoothScrollProvider>
  )
}
