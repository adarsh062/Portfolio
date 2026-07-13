"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-child"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
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
      className="relative z-10 transition-colors duration-500"
      style={{ 
        background: "var(--background-theme)", 
        color: "var(--text-theme)", 
        paddingTop: "8rem", 
        paddingBottom: "8rem" 
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top rule + label */}
        <div className="anim-child flex items-center gap-6 mb-16">
          <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
          <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>05 / Contact</span>
        </div>

        {/* Slide 8 style: Left Photo, Right Details */}
        <div className="grid lg:grid-cols-[1.2fr_1px_2fr] gap-0">
          
          {/* Left Column: B&W Portrait */}
          <div className="anim-child pr-0 lg:pr-16 pb-12 lg:pb-0 flex items-center justify-center">
            <div
              className="relative w-full max-w-[320px] aspect-[4/3] border border-black/10 dark:border-white/10 overflow-hidden grayscale contrast-110 bg-black/5 dark:bg-white/5"
            >
              <Image
                src="/mphoto.jpeg"
                alt="Adarsh Maurya"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block mx-12 w-[1px]" style={{ background: "var(--border-theme)", alignSelf: "stretch" }} />

          {/* Right Column: Contact Information */}
          <div className="pl-0 lg:pl-16 flex flex-col justify-between">
            <div className="mb-10">
              <h2
                className="anim-child font-display text-5xl md:text-6xl font-bold leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em", color: "var(--text-theme)" }}
              >
                Contact
                <br />
                <em className="opacity-50" style={{ fontStyle: "italic", color: "var(--text-theme)" }}>Information</em>
              </h2>
              <p className="anim-child text-sm md:text-base leading-relaxed max-w-xl mb-12 opacity-70" style={{ color: "var(--text-theme)" }}>
                Feel free to reach out for software engineering opportunities, collaborations, or custom full-stack/AI implementations. I respond promptly.
              </p>
            </div>

            {/* Info Grid */}
            <div className="anim-child grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 pb-10">
              {/* Phone */}
              <div style={{ borderBottom: "1px solid var(--border-theme)", paddingBottom: "1rem" }}>
                <span className="editorial-label block mb-2 opacity-50" style={{ color: "var(--text-theme)" }}>Phone</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-theme)" }}>+91 99184 46020</span>
                <span className="text-xs opacity-45 block mt-0.5" style={{ color: "var(--text-theme)" }}>Let&apos;s arrange a call</span>
              </div>

              {/* Email */}
              <div
                className="group cursor-pointer relative"
                onClick={copyEmail}
                style={{ borderBottom: "1px solid var(--border-theme)", paddingBottom: "1rem" }}
              >
                <span className="editorial-label block mb-2 opacity-50" style={{ color: "var(--text-theme)" }}>Email</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold group-hover:underline" style={{ color: "var(--text-theme)" }}>
                    mauryadarsh9140@gmail.com
                  </span>
                  <button className="opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" style={{ color: "var(--text-theme)" }} aria-label="Copy email">
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <span className="text-xs opacity-45 block mt-0.5" style={{ color: "var(--text-theme)" }}>Click to copy email address</span>
              </div>

              {/* Address */}
              <div style={{ borderBottom: "1px solid var(--border-theme)", paddingBottom: "1rem" }}>
                <span className="editorial-label block mb-2 opacity-50" style={{ color: "var(--text-theme)" }}>Location</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-theme)" }}>Bhopal, MP, India</span>
                <span className="text-xs opacity-45 block mt-0.5" style={{ color: "var(--text-theme)" }}>IIIT Bhopal CSE</span>
              </div>

              {/* Links & Profiles */}
              <div style={{ borderBottom: "1px solid var(--border-theme)", paddingBottom: "1rem" }}>
                <span className="editorial-label block mb-2 opacity-50" style={{ color: "var(--text-theme)" }}>Profiles</span>
                <div className="flex flex-wrap gap-4 mt-1">
                  <a
                    href="https://github.com/adarsh062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link hover:text-blue-800 transition-colors"
                    style={{
                      color: "#0066cc",
                      borderBottomColor: "rgba(0, 102, 204, 0.4)",
                      fontSize: "0.8rem",
                    }}
                  >
                    GitHub
                    <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link hover:text-blue-800 transition-colors"
                    style={{
                      color: "#0066cc",
                      borderBottomColor: "rgba(0, 102, 204, 0.4)",
                      fontSize: "0.8rem",
                    }}
                  >
                    LinkedIn
                    <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
                  </a>
                  <a
                    href="https://codolio.com/profile/adarsh062"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link hover:text-blue-800 transition-colors"
                    style={{
                      color: "#0066cc",
                      borderBottomColor: "rgba(0, 102, 204, 0.4)",
                      fontSize: "0.8rem",
                    }}
                  >
                    Codolio
                    <ArrowUpRight className="w-4.5 h-4.5 text-[#0066cc]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Email CTA Button */}
            <div className="anim-child">
              <a
                href="mailto:mauryadarsh9140@gmail.com"
                className="editorial-label inline-block border px-8 py-3.5 tracking-[0.15em] text-xs hover:bg-[var(--text-theme)] hover:text-[var(--background-theme)] transition-all duration-300"
                style={{ 
                  color: "var(--text-theme)", 
                  borderColor: "var(--text-theme)",
                  background: "transparent" 
                }}
              >
                SEND AN EMAIL
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
