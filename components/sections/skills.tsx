"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    title: "Languages",
    skills: "C++, Java, JavaScript (ES6+), Python, SQL",
  },
  {
    title: "Frontend",
    skills: "React.js, Next.js, Tailwind CSS, Three.js, GSAP",
  },
  {
    title: "Backend & DBs",
    skills: "Node.js, Express.js, REST APIs, PostgreSQL, MongoDB, Supabase",
  },
  {
    title: "AI / ML",
    skills: "Machine Learning, Generative AI, LLM Integration, Prompt Engineering, CatBoost, Groq API, Gemini API",
  },
  {
    title: "DevOps & Tools",
    skills: "Git, GitHub, Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD",
  },
  {
    title: "Certifications",
    skills: "Software Engineering Job Sim (Forage - Kafka workflows) · Multi Cloud & DevOps Bootcamp",
  },
]

const marqueeItems = [
  "React", "TypeScript", "Node.js", "Next.js", "Jenkins",
  "Docker", "Kubernetes", "PostgreSQL", "Python", "Supabase", "MongoDB", "GSAP"
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Stagger rows in
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-row"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )

      // Infinite marquee
      const el = marqueeRef.current?.querySelector(".marquee-track") as HTMLElement | null
      if (el) {
        gsap.to(el, { xPercent: -50, duration: 32, ease: "none", repeat: -1 })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 transition-colors duration-500"
      style={{ 
        background: "var(--background-theme)", 
        color: "var(--text-theme)", 
        paddingTop: "8rem" 
      }}
    >
      <div ref={contentRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {/* Section header */}
          <div className="anim-row flex items-center gap-6 mb-16">
            <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
            <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>04 / Skills</span>
          </div>

          <div className="anim-row mb-16">
            <h2
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em", color: "var(--text-theme)" }}
            >
              Technical
              <br />
              <em className="opacity-50" style={{ fontStyle: "italic", color: "var(--text-theme)" }}>Capabilities</em>
            </h2>
          </div>

          {/* Editorial Skills Table of Content Style */}
          <div className="space-y-0">
            <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
            {skillGroups.map((group, i) => (
              <div
                key={group.title}
                className="anim-row flex flex-col md:flex-row md:items-baseline py-6 group transition-colors duration-300"
                style={{ borderBottom: "1px solid var(--border-theme)" }}
              >
                {/* Index + Title */}
                <div className="flex items-center gap-4 w-full md:w-64 shrink-0 mb-2 md:mb-0">
                  <span className="font-mono text-xs opacity-50 font-semibold" style={{ color: "var(--text-theme)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span 
                    className="font-display text-lg font-bold group-hover:italic transition-all duration-300" 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-theme)" }}
                  >
                    {group.title}
                  </span>
                </div>

                {/* Dot Leader */}
                <div className="hidden md:block flex-grow border-b border-dotted mx-4 self-center h-[1px]" style={{ borderColor: "var(--border-theme)", opacity: 0.3 }} />

                {/* Skills list */}
                <div className="text-sm font-semibold opacity-75 max-w-xl text-left md:text-right font-sans" style={{ color: "var(--text-theme)" }}>
                  {group.skills}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee ticker */}
        <div
          ref={marqueeRef}
          className="marquee-container mt-24 overflow-hidden py-7"
          style={{
            borderTop: "1px solid var(--border-theme)",
            borderBottom: "1px solid var(--border-theme)",
          }}
        >
          <div className="marquee-track flex">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((skill, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-7xl font-black mx-10 shrink-0 select-none"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "var(--text-theme)",
                  opacity: 0.04,
                  letterSpacing: "-0.03em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ paddingBottom: "8rem" }} />
      </div>
    </section>
  )
}
