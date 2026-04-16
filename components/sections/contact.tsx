"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MagneticButton } from "@/components/magnetic-button"
import { Github, Linkedin, Code2, Mail, ArrowUpRight, Copy } from "lucide-react"
import { useState } from "react"

gsap.registerPlugin(ScrollTrigger)

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/adarsh062",
    handle: "@adarsh062",
    accent: "#a78bfa",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarsh-maurya-640776290/",
    handle: "Adarsh-maurya",
    accent: "#60a5fa",
  },
  {
    icon: Code2,
    label: "LeetCode",
    href: "https://leetcode.com/u/EAvlrf5Y0M/",
    handle: "200+ solved",
    accent: "#fb923c",
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [tagRef.current, headingRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText("mauryadarsh9140@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-6 md:px-12 lg:px-24 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={tagRef} className="mb-4 opacity-0">
          <span className="section-number">04 / Contact</span>
        </div>

        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 opacity-0 leading-tight max-w-3xl"
        >
          Let&apos;s Build{" "}
          <span className="gradient-text">Something</span>{" "}
          Together
        </h2>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <div className="space-y-8 opacity-0">
            <p className="text-xl text-muted-foreground leading-relaxed">
              I&apos;m open to internships, collaborations, and full-time opportunities after graduation. Feel
              free to reach out — I reply within 24 hours.
            </p>

            {/* Email card */}
            <div
              className="glass-card p-6 flex items-center justify-between group cursor-pointer"
              onClick={copyEmail}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.72 0.22 280 / 0.12)", border: "1px solid oklch(0.72 0.22 280 / 0.25)" }}
                >
                  <Mail className="w-5 h-5" style={{ color: "oklch(0.80 0.18 280)" }} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5 font-mono uppercase tracking-wider">Email</div>
                  <div className="text-foreground font-medium text-sm">mauryadarsh9140@gmail.com</div>
                </div>
              </div>
              <div
                className="transition-all duration-200"
                style={{ color: copied ? "oklch(0.72 0.22 280)" : "oklch(0.45 0.008 268)" }}
              >
                {copied ? (
                  <span className="text-xs font-mono">Copied!</span>
                ) : (
                  <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                )}
              </div>
            </div>

            {/* CTA */}
            <MagneticButton>
              <a
                href="mailto:mauryadarsh9140@gmail.com"
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base font-semibold"
              >
                Send an Email
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </MagneticButton>
          </div>

          {/* Right: socials */}
          <div className="space-y-4 opacity-0">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">
              Find me on
            </p>
            {socials.map(({ icon: Icon, label, href, handle, accent }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 flex items-center justify-between group hover:scale-[1.02] transition-all duration-300"
                style={{ textDecoration: "none" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 20px ${accent}25, 0 0 0 1px ${accent}35`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = ""
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-foreground font-semibold text-sm">{label}</div>
                    <div className="text-xs text-muted-foreground font-mono">{handle}</div>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "oklch(0.45 0.008 268)" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
