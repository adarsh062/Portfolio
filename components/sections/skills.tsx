"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    title: "Languages",
    accent: "#a78bfa",
    skills: ["JavaScript", "TypeScript", "C++", "C", "Python", "SQL"],
  },
  {
    title: "Frontend",
    accent: "#34d399",
    skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Three.js"],
  },
  {
    title: "Backend",
    accent: "#60a5fa",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "Kafka", "Supabase"],
  },
  {
    title: "Databases",
    accent: "#fb923c",
    skills: ["PostgreSQL", "MongoDB", "H2", "Supabase"],
  },
  {
    title: "Tools & DevOps",
    accent: "#f472b6",
    skills: ["Git", "Docker", "CI/CD", "Vercel", "Render", "Postman"],
  },
  {
    title: "Achievements",
    accent: "#fbbf24",
    skills: ["200+ LeetCode", "CodeChef 3⭐", "5+ Events Led", "ARK @ 150+ MAU"],
  },
]

const marqueeItems = [
  "React", "TypeScript", "Node.js", "Next.js", "Three.js",
  "GSAP", "Docker", "PostgreSQL", "Python", "Supabase", "MongoDB",
]

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 70, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.07,
      }
    )
  }, [index])

  return (
    <div
      ref={cardRef}
      className="glass-card p-6 opacity-0 group hover:scale-[1.02] transition-transform duration-300"
      style={{ "--accent": group.accent } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: group.accent, boxShadow: `0 0 8px ${group.accent}` }}
        />
        <h3
          className="text-sm font-mono uppercase tracking-widest font-semibold"
          style={{ color: group.accent }}
        >
          {group.title}
        </h3>
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((s) => (
          <span
            key={s}
            className="skill-pill"
            style={
              {
                "--hover-border": `${group.accent}55`,
                "--hover-bg": `${group.accent}12`,
              } as React.CSSProperties
            }
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLSpanElement
              el.style.borderColor = `${group.accent}55`
              el.style.background = `${group.accent}12`
              el.style.color = "oklch(0.92 0.005 268)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLSpanElement
              el.style.borderColor = ""
              el.style.background = ""
              el.style.color = ""
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  const tagRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      [tagRef.current, headingRef.current],
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    )

    // Infinite marquee
    const el = marqueeRef.current?.querySelector(".marquee-track") as HTMLElement | null
    if (el) {
      gsap.to(el, { xPercent: -50, duration: 25, ease: "none", repeat: -1 })
    }
  }, [])

  return (
    <section id="skills" className="py-32">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div ref={tagRef} className="mb-4 opacity-0">
          <span className="section-number">03 / Skills</span>
        </div>

        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 opacity-0 leading-tight"
        >
          My <span className="gradient-text">Tech Stack</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="mt-20 overflow-hidden py-6"
        style={{ borderTop: "1px solid oklch(0.20 0.012 268)", borderBottom: "1px solid oklch(0.20 0.012 268)" }}
      >
        <div className="marquee-track flex">
          {[...marqueeItems, ...marqueeItems].map((skill, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl font-bold mx-10 shrink-0"
              style={{ color: "oklch(0.72 0.22 280 / 0.12)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
