"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Code2, Rocket, MapPin } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "200+", label: "DSA Problems" },
  { value: "3⭐", label: "CodeChef" },
  { value: "3+", label: "Live Projects" },
  { value: "150+", label: "MAU on ARK" },
]

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    content: "B.Tech CSE · IIIT Bhopal\nSept 2023 – June 2027",
    accent: "#a78bfa",
  },
  {
    icon: Code2,
    title: "Focus",
    content: "Full-Stack · AI/ML · Production Systems",
    accent: "#c084fc",
  },
  {
    icon: Rocket,
    title: "Currently",
    content: "Building AI-powered apps, competing on LeetCode, leading team projects.",
    accent: "#818cf8",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Bhopal, India 🇮🇳",
    accent: "#a78bfa",
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      tl.fromTo(tagRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" })
        .fromTo(headingRef.current, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.4, ease: "power4.out" }, "-=1.0")
        .fromTo(paraRef.current?.children ?? [], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "power4.out" }, "-=1.2")
        .fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=1.1")
        .fromTo(cardsRef.current?.children ?? [], { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.12, ease: "power4.out" }, "-=1.1")
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* Section label */}
      <div ref={tagRef} className="mb-4 opacity-0">
        <span className="section-number">01 / About</span>
      </div>

      <h2
        ref={headingRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 opacity-0 leading-tight"
      >
        Crafting{" "}
        <span className="gradient-text">Real-World</span>
        <br />
        Solutions
      </h2>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: bio + stats */}
        <div>
          <div ref={paraRef} className="space-y-5 mb-12">
            <p className="opacity-0 text-lg text-muted-foreground leading-relaxed">
              I&apos;m a passionate Computer Science student at{" "}
              <span style={{ color: "oklch(0.80 0.18 280)" }}>IIIT Bhopal</span>, focused on building scalable
              full-stack and AI-powered applications that solve real problems at scale.
            </p>
            <p className="opacity-0 text-lg text-muted-foreground leading-relaxed">
              From leading a 4-member Agile team to shipping a production NGO platform to{" "}
              <span style={{ color: "oklch(0.80 0.18 280)" }}>150+ monthly active users</span> — I thrive where
              engineering meets impact. I&apos;m deeply interested in the intersection of AI, performance, and
              elegant UI.
            </p>
            <p className="opacity-0 text-lg text-muted-foreground leading-relaxed">
              When I&apos;m not building, you&apos;ll find me grinding DSA on LeetCode or organising college events
              for 30+ members.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-card p-5 opacity-0"
              >
                <div
                  className="text-3xl font-bold font-mono mb-1"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.80 0.18 280), oklch(0.65 0.26 310))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: info cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {cards.map(({ icon: Icon, title, content, accent }) => (
            <div
              key={title}
              className="glass-card p-6 opacity-0 group transition-all duration-300 hover:scale-[1.03]"
              style={{ "--card-accent": accent } as React.CSSProperties}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${accent}1a`, border: `1px solid ${accent}33` }}
              >
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <h3
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: accent }}
              >
                {title}
              </h3>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-line">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
