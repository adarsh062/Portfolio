"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Sun, Moon, ArrowDown, FileText, ArrowUpRight, Sparkles } from "lucide-react"
import { SiGithub, SiReact, SiTypescript, SiNodedotjs, SiNextdotjs, SiPython } from "react-icons/si"
import { FaLinkedin } from "react-icons/fa"

interface HeroProps {
  theme: "light" | "dark"
  onToggleTheme: () => void
}

export function Hero({ theme, onToggleTheme }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Left column items stagger in
      tl.fromTo(
        leftRef.current?.children ? Array.from(leftRef.current.children) : [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.9 }
      )

      // Right column fades in
      tl.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.7"
      )



      // Subtle floating animations for tech badges
      gsap.to(".floating-badge", {
        y: "random(-6, 6)",
        x: "random(-4, 4)",
        duration: "random(3, 4.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ background: "var(--background-theme)", color: "var(--text-theme)" }}
    >
      {/* ── Ambient Background Glow (Subtle & Professional) ── */}
      <div
        className="ambient-glow -top-32 -left-32 w-[550px] h-[550px]"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 75%)",
        }}
      />
      <div
        className="ambient-glow -bottom-32 -right-32 w-[500px] h-[500px]"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 75%)",
        }}
      />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 memphis-dot-grid opacity-25 pointer-events-none select-none" />



      {/* ── Main content grid ── */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-28 lg:py-0 min-h-screen">
        
        {/* ── LEFT: Text content (7 cols) ── */}
        <div ref={leftRef} className="lg:col-span-7 flex flex-col items-start gap-6">
          
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300">
              Open to Software Engineering Roles
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-sm md:text-base font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Full-Stack &amp; AI Engineer
            </h2>
            <h1
              className="font-display font-black leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.2rem)", color: "var(--text-theme)" }}
            >
              Hi, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
                Adarsh Maurya
              </span>
              .
            </h1>
          </div>

          {/* Bio */}
          <p className="text-base md:text-lg leading-relaxed max-w-xl text-slate-600 dark:text-slate-300">
            Computer Science student at <strong className="font-semibold text-slate-900 dark:text-slate-100">IIIT Bhopal</strong> (2023–2027) and Founding Engineer at <strong className="font-semibold text-slate-900 dark:text-slate-100">ARK</strong>. Building scalable distributed systems, real-time architectures, and high-impact AI/ML platforms.
          </p>

          {/* Social Row */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="https://github.com/adarsh062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme)] hover:border-blue-500/40 text-xs font-medium transition-all"
            >
              <SiGithub className="w-3.5 h-3.5" />
              <span>adarsh062</span>
            </a>

            <a
              href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme)] hover:border-blue-500/40 text-xs font-medium text-[#0a66c2] transition-all"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://codolio.com/profile/adarsh062"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme)] hover:border-blue-500/40 text-xs font-medium text-amber-600 dark:text-amber-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Codolio (1619 CodeChef · 1613 LeetCode)</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3.5 flex-wrap pt-2">
            <a
              href="#projects"
              className="pro-btn bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/20"
            >
              View Projects
            </a>

            <a
              href="/Adarsh_Maurya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pro-btn border border-blue-600/30 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>

            <a
              href="#contact"
              className="pro-btn border border-[var(--border-theme)] bg-[var(--card-theme)] text-slate-700 dark:text-slate-300 hover:bg-[var(--bg-hover-theme)]"
            >
              Contact Me
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[var(--border-theme)] w-full max-w-lg mt-2">
            <div>
              <div className="text-xl md:text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
                500+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                DSA Problems Solved
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold font-display text-blue-600 dark:text-blue-400">
                1613
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                LeetCode (Top 22%)
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold font-display text-amber-500">
                1619
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                CodeChef (3-Star)
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="flex items-center gap-2 mt-1 opacity-50">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-blue-500" />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase">Scroll to explore</span>
          </div>
        </div>

        {/* ── RIGHT: Photo Card (5 cols) ── */}
        <div
          ref={rightRef}
          className="lg:col-span-5 relative w-full flex items-end justify-center"
          style={{ height: "clamp(460px, 68vh, 580px)" }}
        >
          {/* Backdrop Card */}
          <div
            className="absolute bottom-3 w-[88%] sm:w-[82%] max-w-[390px] h-[85%] rounded-3xl border border-[var(--border-theme)] overflow-hidden shadow-xl"
            style={{
              background: "linear-gradient(180deg, var(--card-theme) 0%, var(--card-theme-muted) 100%)",
            }}
          >
            {/* Card Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-theme)] bg-[var(--bg-hover-theme)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-[0.65rem] font-semibold tracking-wider text-slate-400 uppercase">
                adarsh-portfolio
              </span>
            </div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 top-11 memphis-dot-grid opacity-15" />
          </div>

          {/* Adarsh Cutout Photo */}
          <div className="relative z-10 w-full h-full max-w-[420px] flex items-end justify-center group">
            <Image
              src="/herophoto.png"
              alt="Adarsh Maurya"
              fill
              className="object-contain object-bottom origin-bottom scale-[1.15] sm:scale-[1.18] lg:scale-[1.2] transition-transform duration-500 drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:scale-[1.22]"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 450px"
              priority
            />
          </div>

          {/* Clean Floating Tech Badges */}
          <div className="absolute top-[8%] left-[2%] sm:left-[6%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-center z-20 floating-badge shadow-md">
            <SiReact className="w-5 h-5 text-[#61dafb]" />
          </div>
          <div className="absolute top-[18%] -right-1 sm:right-[3%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-center z-20 floating-badge shadow-md">
            <SiTypescript className="w-5 h-5 text-[#3178c6]" />
          </div>
          <div className="absolute bottom-[24%] -left-2 sm:left-[2%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-center z-20 floating-badge shadow-md">
            <SiNodedotjs className="w-5 h-5 text-[#339933]" />
          </div>
          <div className="absolute top-[52%] -right-2 sm:right-[1%] w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-center z-20 floating-badge shadow-md">
            <SiNextdotjs className="w-5 h-5 text-slate-800 dark:text-slate-100" />
          </div>
          <div className="absolute top-[3%] right-[24%] w-10 h-10 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-center z-20 floating-badge shadow-md">
            <SiPython className="w-5 h-5 text-[#3776AB]" />
          </div>

          {/* Floating info chip */}
          <div className="absolute bottom-2 left-3 sm:left-6 px-4 py-2.5 border border-[var(--border-theme)] rounded-xl z-20 bg-[var(--card-theme)] shadow-lg backdrop-blur-md">
            <span className="font-display font-bold text-xs text-slate-900 dark:text-slate-100 block leading-none">
              IIIT Bhopal
            </span>
            <span className="font-mono text-[0.62rem] text-blue-600 dark:text-blue-400 block tracking-wider uppercase mt-1">
              B.Tech CSE · 2023–2027
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}