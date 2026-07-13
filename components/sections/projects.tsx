"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Diagheal",
    tagline: "Chronic Liver Disease Prediction (Research Project)",
    description:
      "Evaluated 6+ machine learning models and selected CatBoost with 89%+ accuracy. Reduced false negatives by 18% using SMOTE, class weighting, and decision threshold optimization. Built a Next.js/FastAPI platform featuring report analysis, disease risk prediction, doctor availability mapping, and Groq-powered diet plans.",
    tags: ["Next.js", "FastAPI", "CatBoost", "PostgreSQL", "Tailwind CSS", "Groq API"],
    image: "/project_diagheal.png",
    link: "https://diagheal.vercel.app/",
    github: "https://github.com/adarsh062/Diagheal",
    year: "2026",
    role: "AI Developer · Solo Minor Project",
    number: "01",
  },
  {
    title: "Enterprise DevSecOps CI/CD",
    tagline: "Secure Pipeline Orchestration",
    description:
      "Built a secure DevSecOps pipeline automating build, test, and containerized deployment on Kubernetes. Utilized Terraform for infrastructure provisioning, SonarQube for static analysis, GitHub Actions/Jenkins for flow orchestration, and Trivy for container image vulnerability scanning.",
    tags: ["Jenkins", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "SonarQube", "Trivy"],
    image: "/image.png",
    link: "https://github.com/adarsh062/devsecops-security-pipeline",
    github: "https://github.com/adarsh062/devsecops-security-pipeline",
    year: "2026",
    role: "DevOps Engineer · Solo",
    number: "02",
  },
  {
    title: "NEXUS-AI",
    tagline: "Realtime GenAI Customer Support",
    description:
      "Engineered a real-time AI customer support platform supporting 50+ concurrent active chat sessions. Integrated multilingual ticket summarization using Gemini API, built secure JWT-based REST endpoints, and containerized deployment on Render with MongoDB storage.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Gemini API", "Docker"],
    image: "/image.png",
    link: "https://github.com/adarsh062/NEXUS-AI",
    github: "https://github.com/adarsh062/NEXUS-AI",
    year: "2025",
    role: "Full Stack Engineer · Solo",
    number: "03",
  },
]

function ProjectSpread({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [textRef.current, imgRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }, rowRef)
    return () => ctx.revert()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div ref={rowRef} className="py-16 md:py-24">
      <div className="h-[1px] w-full mb-12" style={{ background: "var(--border-theme)" }} />
      <div
        className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-start ${isEven ? "" : "direction-rtl"}`}
      >
        {/* Text side */}
        <div
          ref={textRef}
          className={`flex flex-col justify-between h-full ${
            isEven ? "pr-0 lg:pr-8" : "pl-0 lg:pl-8 order-last lg:order-first"
          }`}
        >
          {/* Number + meta */}
          <div className="flex items-start justify-between mb-8 border-b border-black/10 dark:border-white/10 pb-4">
            <span
              className="font-display font-black leading-none tracking-tighter"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                color: "var(--text-theme)",
                opacity: 0.08,
              }}
            >
              {project.number}
            </span>
            <div className="text-right">
              <div className="editorial-label mb-1 opacity-55" style={{ color: "var(--text-theme)", fontSize: "0.6rem" }}>{project.year}</div>
              <div className="editorial-label opacity-55" style={{ color: "var(--text-theme)", fontSize: "0.6rem" }}>{project.role}</div>
            </div>
          </div>

          {/* Title + tagline */}
          <div className="mb-6">
            <h3
              className="font-display text-3xl md:text-4xl font-bold mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em", color: "var(--text-theme)" }}
            >
              {project.title}
            </h3>
            <p className="editorial-label text-xs opacity-50" style={{ color: "var(--text-theme)", fontSize: "0.65rem" }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm md:text-base leading-relaxed mb-6 opacity-75"
            style={{ color: "var(--text-theme)" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="editorial-tag opacity-80"
                style={{
                  borderColor: "var(--border-theme)",
                  color: "var(--text-theme)",
                  fontSize: "0.6rem",
                  padding: "0.15rem 0.5rem"
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links - Blue High Contrast, Larger size */}
          <div className="flex items-center gap-6">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link hover:text-blue-800 transition-colors inline-flex items-center gap-1.5 text-sm md:text-base font-bold"
              style={{
                color: "#0066cc",
                borderBottomColor: "rgba(0, 102, 204, 0.4)",
              }}
            >
              Live Site
              <ArrowUpRight className="w-5 h-5 text-[#0066cc]" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link hover:text-blue-800 transition-colors inline-flex items-center gap-1.5 text-sm md:text-base font-bold"
              style={{
                color: "#0066cc",
                borderBottomColor: "rgba(0, 102, 204, 0.4)",
              }}
            >
              GitHub
              <FaGithub className="w-5 h-5 text-[#0066cc]" />
            </a>
          </div>
        </div>

        {/* Image side - 16:10 format in full color */}
        <div
          ref={imgRef}
          className={`${isEven ? "pl-0 lg:pl-8" : "pr-0 lg:pr-8"}`}
        >
          <div
            className="relative w-full aspect-[16/10] border border-black/10 dark:border-white/10 overflow-hidden shadow-lg bg-black/5 dark:bg-white/5"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 550px"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headingRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current!.querySelectorAll(".anim-child"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }, headingRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 transition-colors duration-500"
      style={{ 
        background: "var(--background-theme)", 
        color: "var(--text-theme)", 
        paddingTop: "8rem", 
        paddingBottom: "6rem" 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Section header */}
        <div ref={headingRef} className="mb-0">
          <div className="anim-child flex items-center gap-6 mb-16">
            <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
            <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>03 / Projects</span>
          </div>

          <div className="anim-child flex flex-col md:flex-row md:items-end justify-between gap-6 mb-0">
            <h2
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em", color: "var(--text-theme)" }}
            >
              Projects
            </h2>
            <a
              href="https://github.com/adarsh062"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link mb-2 shrink-0 inline-flex items-center gap-1.5 font-semibold hover:text-blue-800 transition-colors"
              style={{
                color: "#0066cc",
                borderBottomColor: "rgba(0, 102, 204, 0.4)",
              }}
            >
              More on GitHub
              <FaGithub className="w-5 h-5 text-[#0066cc]" />
            </a>
          </div>
        </div>

        {/* Projects spreads */}
        <div className="mt-8">
          {projects.map((project, index) => (
            <ProjectSpread key={project.title} project={project} index={index} />
          ))}
          <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
        </div>

      </div>
    </section>
  )
}
