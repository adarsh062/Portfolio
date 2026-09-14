"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, ExternalLink, CheckCircle2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Diagheal",
    subtitle: "AI-Powered Healthcare Analytics Platform",
    year: "2026",
    role: "Full-Stack AI Developer",
    description:
      "A comprehensive medical analytics platform that automates multi-variable diagnostic record analysis, accelerates clinical triage, and delivers patient-specific health insights using CatBoost classification and LLMs.",
    workPoints: [
      "Conducted EDA and feature engineering on multi-variable diagnostic records.",
      "Automated report ingestion using FastAPI and PostgreSQL.",
      "Trained and tuned a CatBoost classification model to reduce false-positive rates and optimize prediction precision.",
      "Integrated Groq LLM API with structured prompt engineering to analyze diagnostic patterns and generate patient insights.",
    ],
    tags: ["Python", "CatBoost", "FastAPI", "Next.js", "PostgreSQL", "Groq API", "EDA", "Prompt Engineering"],
    image: "/project_diagheal.png",
    live: "https://diagheal.vercel.app/",
    github: "https://github.com/adarsh062/Diagheal",
  },
  {
    title: "ShortX",
    subtitle: "Distributed URL Shortening System",
    year: "2026",
    role: "Backend & Systems Engineer",
    description:
      "A resilient distributed URL shortening system built for high-throughput concurrency, featuring database horizontal partitioning and aggressive caching.",
    workPoints: [
      "Engineered a sharded database architecture using PostgreSQL with partition routing across 3 shards for horizontal scale.",
      "Reduced redirect P95 latency by 91.5% using Redis LRU caching, verified via benchmark load tests.",
      "Implemented Redis rate limiting and fallback strategies to maintain continuous analytical tracking during peak traffic.",
    ],
    tags: ["Node.js", "PostgreSQL", "Redis", "Docker", "Database Sharding", "LRU Cache", "Rate Limiting", "Benchmark Tests"],
    image: "/image.png",
    live: "",
    github: "https://github.com/adarsh062/ShortX-URL-Shortner",
  },
  {
    title: "NEXUS-AI",
    subtitle: "Realtime GenAI Customer Support Platform",
    year: "2025",
    role: "Full-Stack Developer",
    description:
      "Real-time customer query handling and automated support desk engine powered by LLMs and WebSocket streams for concurrent multi-client sessions.",
    workPoints: [
      "Engineered a real-time AI customer support platform supporting 50+ concurrent active chat sessions.",
      "Integrated multilingual ticket summarization and intent extraction using the Gemini API.",
      "Built secure JWT-based REST endpoints and containerized deployment on Render with MongoDB persistence.",
    ],
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "Docker"],
    image: "/project_ark.png",
    live: "",
    github: "https://github.com/adarsh062/NEXUS-AI",
  },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-project"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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
      id="projects"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        borderTop: "1px solid var(--border-theme)",
      }}
      className="relative z-10"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">
        
        {/* ── Section label ── */}
        <div className="anim-project flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            03 / Featured Projects
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="mb-14">
          <h2
            className="anim-project font-display font-black leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
          >
            Scalable architectures &amp;{" "}
            <span className="text-blue-600 dark:text-blue-400">
              applied intelligence.
            </span>
          </h2>
          <p className="anim-project text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Selected systems, distributed backend architectures, and machine learning platforms built with rigorous engineering standards.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-10">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="anim-project rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center p-6 md:p-8">
                
                {/* Left: Project Details (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                          0{idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-slate-100">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-slate-500 font-semibold px-2.5 py-1 rounded-md border border-[var(--border-theme)] bg-[var(--card-theme-muted)]">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {project.subtitle} · <span className="text-slate-500 font-normal">{project.role}</span>
                    </p>

                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>
                  </div>

                  {/* Work points */}
                  <div className="space-y-2 py-1">
                    {project.workPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                        <span className="text-xs md:text-[0.82rem] leading-relaxed text-slate-700 dark:text-slate-300">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[0.7rem] font-medium px-2.5 py-0.5 rounded-full border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-600 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-3 pt-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme)] text-slate-700 dark:text-slate-300 hover:border-blue-500/50 hover:bg-[var(--bg-hover-theme)] transition-all"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Project Visual Preview (5 cols) */}
                <div className="lg:col-span-5 relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[var(--border-theme)] bg-[var(--card-theme-muted)] group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white inline-flex items-center gap-1 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white inline-flex items-center gap-1 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg"
                      >
                        <span>View Repository</span>
                        <FaGithub className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
