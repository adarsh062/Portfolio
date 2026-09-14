"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    company: "ARK",
    category: "Social Impact Platform",
    role: "Founding Engineer",
    timeline: "June 2025 – Present",
    location: "Remote",
    link: "https://betheark.app",
    liveText: "betheark.app",
    highlights: [
      "Built and deployed event tracking and telemetry pipelines monitoring engagement for 200+ active users.",
      "Designed PostgreSQL schemas and optimized queries to generate real-time operational insights across platform workflows.",
      "Implemented automated data validation guardrails to prevent logging errors and improve reliability of production data.",
      "Audited INR 25k+ transactions to identify data inconsistencies and ensure accuracy of operational reporting.",
      "Analyzed user conversion funnels and drop-off patterns to identify bottlenecks and drive platform improvements.",
      "Maintained production CI/CD pipelines and resolved deployment issues while collaborating across a 20+ volunteer team.",
    ],
    tags: ["React", "Node.js", "Supabase", "PostgreSQL", "CI/CD", "Render", "Data Pipelines"],
    featured: true,
  },
  {
    company: "QuickIntell",
    category: "Business Analytics",
    role: "Full Stack Development Intern",
    timeline: "Dec 2025 – Jan 2026",
    location: "Remote",
    link: "",
    liveText: "",
    highlights: [
      "Developed analytical dashboards in Next.js and TypeScript to visualize business KPIs and operational metrics.",
      "Integrated RESTful APIs with Node.js to synchronize real-time analytics between database and dashboard modules.",
      "Debugged metric calculation and data-display issues, improving visualization performance and application responsiveness.",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "RESTful APIs", "Dashboard Analytics"],
    featured: false,
  },
]

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-child"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
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
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        borderTop: "1px solid var(--border-theme)",
      }}
      className="relative z-10"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">
        
        {/* ── Section label ── */}
        <div className="anim-child flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            02 / Work Experience
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="mb-14">
          <h2
            className="anim-child font-display font-black leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
          >
            Engineering experience with{" "}
            <span className="text-blue-600 dark:text-blue-400">
              real-world impact.
            </span>
          </h2>
          <p className="anim-child text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Hands-on work in production environments: optimizing databases, deploying CI/CD workflows, building telemetry, and shipping performant user-facing software.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className={`anim-child p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                exp.featured
                  ? "border-blue-600/30 bg-[var(--card-theme)] shadow-md hover:border-blue-600/60"
                  : "border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs hover:border-slate-400 dark:hover:border-slate-600"
              }`}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-theme)]">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display font-black text-xl md:text-2xl text-slate-900 dark:text-slate-100">
                      {exp.role}
                    </h3>
                    <span className="text-slate-400 font-light">·</span>
                    <span className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </span>
                    {exp.featured && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold tracking-wide uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-600/20">
                        Current Role
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                    {exp.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono">{exp.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </div>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      <span>{exp.liveText}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bullet points */}
              <div className="py-6 space-y-3">
                {exp.highlights.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-sm md:text-[0.92rem] leading-relaxed text-slate-700 dark:text-slate-300">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-[var(--border-theme)] flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                  Technologies:
                </span>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
