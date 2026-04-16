"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "ARK",
    tagline: "NGO Donation & Discovery Platform",
    description:
      "Led a 4-member Agile team to deliver a production-ready platform in 2 months. Reduced NGO onboarding by ~30% and built a scalable location-based discovery system serving 150+ MAU.",
    tags: ["React", "Supabase", "Node.js", "Docker", "CI/CD"],
    image: "/project_ark.png",
    link: "https://betheark.app",
    github: "https://github.com/adarsh062",
    accent: "#34d399",
    number: "01",
  },
  {
    title: "DiagHeal",
    tagline: "AI Health Insight Platform",
    description:
      "Extracts biomarkers via Tesseract OCR and runs ML-based health risk prediction returning results in under 30 seconds. Features a doctor referral system with end-to-end data encryption.",
    tags: ["React", "Node.js", "ML", "OCR", "Tailwind"],
    image: "/project_diagheal.png",
    link: "https://diagheal.vercel.app/",
    github: "https://github.com/adarsh062",
    accent: "#a78bfa",
    number: "02",
  },
  {
    title: "Imagify",
    tagline: "AI Image Generation Platform",
    description:
      "Text-to-image generation SaaS with 100+ completions, supporting 50+ concurrent users. Integrated Stripe/Razorpay payment system and improved initial load performance by 20%.",
    tags: ["React", "Node.js", "APIs", "JWT", "Payments"],
    image: "/project_imagify.png",
    link: "https://imagify-5-h5iu.onrender.com/",
    github: "https://github.com/adarsh062",
    accent: "#fb923c",
    number: "03",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { opacity: 0, y: 100, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [index])

  const onEnter = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, { y: -6, duration: 0.35, ease: "power2.out" })
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.5, ease: "power2.out" })
  }

  const onLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, { y: 0, duration: 0.45, ease: "power2.out" })
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="glass-card overflow-hidden group opacity-0 cursor-pointer"
      style={{
        boxShadow: `0 0 0 1px oklch(0.22 0.012 268)`,
        transition: "box-shadow 0.3s ease",
      }}
      onMouseOver={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${project.accent}30, 0 0 0 1px ${project.accent}40`
      }}
      onMouseOut={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px oklch(0.22 0.012 268)`
      }}
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden relative">
        <div ref={imgRef} className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* overlay */}
        <div className="project-img-overlay" />
        {/* number badge */}
        <span
          className="absolute top-4 left-4 text-xs font-mono px-2.5 py-1 rounded-full"
          style={{
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}40`,
            color: project.accent,
          }}
        >
          {project.number}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3
              className="text-xl font-bold text-foreground mb-0.5 transition-colors duration-300"
              style={{ color: "oklch(0.95 0.005 268)" }}
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono" style={{ color: project.accent }}>
              {project.tagline}
            </p>
          </div>
          <div className="flex gap-3 mt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:scale-110"
              style={{ color: "oklch(0.55 0.008 268)" }}
              aria-label="GitHub"
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = project.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.008 268)")}
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:scale-110"
              style={{ color: "oklch(0.55 0.008 268)" }}
              aria-label="Live project"
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = project.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0.008 268)")}
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const tagRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

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
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])

  return (
    <section
      id="projects"
      className="py-32 px-6 md:px-12 lg:px-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={tagRef} className="mb-4 opacity-0">
          <span className="section-number">02 / Projects</span>
        </div>

        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 opacity-0 leading-tight"
        >
          Things I&apos;ve{" "}
          <span className="gradient-text">Built</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* More on GitHub */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/adarsh062"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline px-7 py-3.5 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
