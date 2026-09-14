"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Database, Layout, Terminal, Brain, Award } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    icon: <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: "Languages",
    skills: ["C++", "Java", "Python (Pandas, NumPy)", "JavaScript (ES6+)", "SQL (PostgreSQL, Window Functions)"],
  },
  {
    icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: "Backend & Databases",
    skills: ["PostgreSQL", "Supabase", "MongoDB", "REST APIs", "Redis", "Node.js", "Express.js", "BullMQ"],
  },
  {
    icon: <Layout className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    title: "Frontend & Web",
    skills: ["React.js", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    icon: <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    title: "DevOps & Tools",
    skills: ["Git", "GitHub", "Docker", "GitHub Actions", "CI/CD", "Render", "Linux"],
  },
  {
    icon: <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    title: "AI / ML & Analytics",
    skills: ["Machine Learning", "CatBoost", "LLM Integration", "Prompt Engineering", "Exploratory Data Analysis (EDA)", "Statistical Modeling"],
  },
]

const certifications = [
  {
    title: "Software Engineering Job Simulation",
    issuer: "Forage",
    detail: "Built REST APIs and Kafka real-time streaming workflows.",
  },
  {
    title: "Multi Cloud + DevOps Bootcamp",
    issuer: "Bootcamp",
    detail: "Mastered Docker, cloud deployment strategies, and CI/CD pipelines.",
  },
]

const marqueeItems = [
  { label: "React", color: "#61DAFB" },
  { label: "TypeScript", color: "#3178C6" },
  { label: "Node.js", color: "#539E43" },
  { label: "Next.js", color: "#000000" },
  { label: "Python", color: "#F4C430" },
  { label: "FastAPI", color: "#059669" },
  { label: "PostgreSQL", color: "#336791" },
  { label: "Redis", color: "#DC2626" },
  { label: "Docker", color: "#2496ED" },
  { label: "CatBoost", color: "#F59E0B" },
  { label: "Supabase", color: "#3ECF8E" },
  { label: "MongoDB", color: "#10B981" },
  { label: "Tailwind CSS", color: "#38BDF8" },
  { label: "C++", color: "#00599C" },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-skill"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      )
      const el = marqueeRef.current?.querySelector(".marquee-track") as HTMLElement | null
      if (el) gsap.to(el, { xPercent: -50, duration: 28, ease: "none", repeat: -1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        borderTop: "1px solid var(--border-theme)",
      }}
      className="relative z-10 overflow-hidden"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 lg:pt-28 pb-12">
        
        {/* ── Section label ── */}
        <div className="anim-skill flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            04 / Technical Skills
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="mb-14">
          <h2
            className="anim-skill font-display font-black leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
          >
            Technical toolkit &amp;{" "}
            <span className="text-blue-600 dark:text-blue-400">
              core competencies.
            </span>
          </h2>
          <p className="anim-skill text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            A comprehensive set of modern languages, backend architectures, databases, cloud tools, and applied machine learning frameworks.
          </p>
        </div>

        {/* Skill categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="anim-skill p-6 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)]">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-700 dark:text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Certifications Card */}
          <div className="anim-skill p-6 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)]">
                <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                Certifications &amp; Training
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              {certifications.map((c) => (
                <div key={c.title} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {c.title}
                  </div>
                  <div className="text-slate-500 font-medium">
                    {c.issuer} — {c.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Infinite Tech Stack Marquee */}
      <div
        ref={marqueeRef}
        className="py-8 border-y border-[var(--border-theme)] bg-[var(--card-theme-muted)] overflow-hidden select-none"
      >
        <div className="marquee-track flex gap-8 items-center">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--border-theme)] bg-[var(--card-theme)] shrink-0"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: item.color }}
              />
              <span className="font-mono text-xs font-semibold tracking-wider text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
