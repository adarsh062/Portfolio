"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-child"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 transition-colors duration-500"
      style={{ 
        background: "var(--background-theme)", 
        color: "var(--text-theme)", 
        paddingTop: "6rem", 
        paddingBottom: "6rem" 
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top rule + label */}
        <div className="anim-child flex items-center gap-6 mb-12">
          <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
          <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>02 / Experience</span>
        </div>

        {/* Section title */}
        <h2
          className="anim-child font-display text-4xl md:text-5xl font-bold mb-12"
          style={{ 
            fontFamily: "'Playfair Display', Georgia, serif", 
            letterSpacing: "-0.01em",
            color: "var(--text-theme)"
          }}
        >
          Professional Experience
        </h2>

        {/* Spread layout: Left meta, Right bullets & details. Clean resume style. */}
        <div className="grid lg:grid-cols-[1.1fr_1px_2fr] gap-8 lg:gap-0 border-t border-black/10 dark:border-white/10 pt-10">
          
          {/* Left Column: Balanced Company Metadata */}
          <div className="anim-child pr-0 lg:pr-12 space-y-6 flex flex-col justify-start">
            <div>
              <h3 
                className="font-display text-3xl font-bold leading-tight mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-theme)" }}
              >
                ARK
              </h3>
              <p className="text-sm font-mono tracking-wider uppercase opacity-60" style={{ color: "var(--text-theme)" }}>
                Social Impact Platform
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-4">
              <div>
                <span className="editorial-label block text-[10px] uppercase opacity-50 mb-0.5" style={{ color: "var(--text-theme)" }}>Role</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-theme)" }}>Full Stack Developer</span>
              </div>

              <div>
                <span className="editorial-label block text-[10px] uppercase opacity-50 mb-0.5" style={{ color: "var(--text-theme)" }}>Timeline</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-theme)" }}>June 2025 – Present</span>
              </div>

              <div>
                <span className="editorial-label block text-[10px] uppercase opacity-50 mb-0.5" style={{ color: "var(--text-theme)" }}>Location</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-theme)" }}>Bhopal, India</span>
              </div>

              <div>
                <span className="editorial-label block text-[10px] uppercase opacity-50 mb-0.5" style={{ color: "var(--text-theme)" }}>Website</span>
                <a
                  href="https://betheark.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link hover:text-blue-800 transition-colors inline-flex items-center gap-1.5 mt-1 text-base md:text-lg font-bold"
                  style={{
                    color: "#0066cc",
                    borderBottomColor: "rgba(0, 102, 204, 0.4)",
                  }}
                >
                  betheark.app
                  <ArrowUpRight className="w-5 h-5 text-[#0066cc]" />
                </a>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block mx-8 w-[1px]" style={{ background: "var(--border-theme)", alignSelf: "stretch" }} />

          {/* Right Column: Detailed Experience (Role highlights & accomplishments) */}
          <div className="pl-0 lg:pl-12 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-black/10 dark:border-white/10 pb-4">
                <span className="editorial-label block text-[10px] uppercase opacity-50 mb-1" style={{ color: "var(--text-theme)" }}>Responsibilities & Impact</span>
                <p className="text-base leading-relaxed font-semibold opacity-90" style={{ color: "var(--text-theme)" }}>
                  Actively engineering, scaling, and optimizing the core NGO onboarding, discovery, and donation flows to support active giving and social outreach.
                </p>
              </div>

              {/* Accomplishments Bullet list */}
              <ul className="space-y-4 text-sm leading-relaxed opacity-85" style={{ color: "var(--text-theme)" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                  <span>Built and scaled the server architecture of the social impact platform.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                  <span>Facilitated over <span className="font-semibold" style={{ color: "var(--text-theme)" }}>₹20K+ in online donations</span>, directly and positively impacting <span className="font-semibold" style={{ color: "var(--text-theme)" }}>350+ lives</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                  <span>Leveraged LLMs and prompt engineering techniques to accelerate features implementation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                  <span>Managed deployments using Docker and Render-based pipeline configuration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0066cc] shrink-0" />
                  <span>Collaborated with a 20+ member volunteer team and supported NGO outreach and onboarding.</span>
                </li>
              </ul>
            </div>

            {/* Tech tags */}
            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
              <span className="editorial-label block text-[10px] uppercase opacity-50 mb-3" style={{ color: "var(--text-theme)" }}>Technologies Used</span>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Node.js", "Supabase", "PostgreSQL", "Docker", "CI/CD", "Render"].map((tag) => (
                  <span
                    key={tag}
                    className="editorial-tag opacity-80"
                    style={{
                      borderColor: "var(--border-theme)",
                      color: "var(--text-theme)",
                      fontSize: "0.65rem",
                      padding: "0.15rem 0.45rem"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
