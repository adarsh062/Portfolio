"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiGithub, SiGmail, SiLeetcode } from "react-icons/si"
import { FaCode, FaLinkedin } from "react-icons/fa"
import { GraduationCap, FileText, ArrowUpRight, CheckCircle2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "500+", label: "DSA Problems Solved", sub: "LeetCode · CodeChef · GFG" },
  { value: "1613", label: "LeetCode Rating", sub: "Top 22% Worldwide" },
  { value: "1619", label: "CodeChef Rating", sub: "3-Star Rated" },
  { value: "30+", label: "Club Team Members", sub: "15+ Institute Events" },
]

const coursework = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Object-Oriented Programming (OOPs)",
  "Database Management Systems (DBMS)",
  "System Design",
]

const links = [
  { href: "https://github.com/adarsh062", icon: <SiGithub className="w-4 h-4" />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/adarsh-maurya-64077629/", icon: <FaLinkedin className="w-4 h-4" />, label: "LinkedIn" },
  { href: "https://codolio.com/profile/adarsh062", icon: <FaCode className="w-4 h-4" />, label: "Codolio" },
  { href: "https://leetcode.com/u/EAvlrf5Y0M/", icon: <SiLeetcode className="w-4 h-4" />, label: "LeetCode" },
  { href: "mailto:mauryadarsh9140@gmail.com", icon: <SiGmail className="w-4 h-4" />, label: "Email" },
]

export function About() {
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
          stagger: 0.08,
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
      id="about"
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
            01 / Background &amp; Profile
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT: Bio & Education (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4">
              <h2
                className="anim-child font-display font-black leading-tight tracking-tight"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
              >
                Engineering software with{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  precision &amp; scalability.
                </span>
              </h2>

              <p className="anim-child text-base leading-relaxed text-slate-600 dark:text-slate-300">
                I am a Computer Science undergraduate at <strong className="font-semibold text-slate-900 dark:text-slate-100">IIIT Bhopal</strong> (2023–2027) and Founding Engineer at <strong className="font-semibold text-slate-900 dark:text-slate-100">ARK</strong>. I build scalable full-stack applications, telemetry event pipelines, and ML-powered systems designed for reliability and performance.
              </p>

              <p className="anim-child text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Whether sharding databases to handle millions of redirects with sub-millisecond cache latency, integrating LLMs into diagnostic pipelines, or leading campus events with 30+ team members, I bring rigorous problem-solving and clean architectural standards to every project.
              </p>
            </div>

            {/* Education Card */}
            <div className="anim-child p-6 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                      Indian Institute of Information Technology (IIIT) Bhopal
                    </h3>
                    <span className="font-mono text-xs text-slate-500 font-medium">
                      Sept 2023 – June 2027
                    </span>
                  </div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    Bachelor of Technology in Computer Science and Engineering
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Bhopal, MP, India</p>
                </div>
              </div>

              {/* Coursework */}
              <div className="pt-3 border-t border-[var(--border-theme)]">
                <span className="text-xs font-semibold text-slate-500 block mb-2">
                  Relevant Coursework:
                </span>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <span
                      key={c}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>



          </div>

          {/* ── RIGHT: Stats & Tech Identity (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="anim-child p-5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs flex flex-col gap-1 transition-all hover:border-blue-500/40"
                >
                  <span className="font-display font-black text-2xl md:text-3xl text-blue-600 dark:text-blue-400">
                    {s.value}
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {s.label}
                  </span>
                  <span className="text-[0.7rem] text-slate-500">
                    {s.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal Preview Card */}
            <div
              className="anim-child relative rounded-2xl border border-slate-800 bg-[#0B0F17] overflow-hidden text-xs font-mono shadow-md"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#070A10] border-b border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                  engineer.config.ts
                </span>
                <span className="w-8" />
              </div>

              {/* Terminal Content */}
              <div className="p-5 text-slate-300 leading-relaxed space-y-2">
                <p className="text-slate-500">// Core Engineering Philosophy</p>
                <p>
                  <span className="text-purple-400">interface</span> <span className="text-yellow-300">SoftwareEngineer</span> {"{"}
                </p>
                <p className="pl-4">
                  name: <span className="text-emerald-400">&quot;Adarsh Maurya&quot;</span>;
                </p>
                <p className="pl-4">
                  strengths: [<span className="text-emerald-400">&quot;Distributed Systems&quot;</span>, <span className="text-emerald-400">&quot;Applied AI&quot;</span>, <span className="text-emerald-400">&quot;Scalability&quot;</span>];
                </p>
                <p className="pl-4">
                  currentRole: <span className="text-emerald-400">&quot;Founding Engineer @ ARK&quot;</span>;
                </p>
                <p className="pl-4">
                  dsaSolved: <span className="text-cyan-400">500</span>;
                </p>
                <p className="pl-4">
                  passion: <span className="text-emerald-400">&quot;Turning complex problems into clean solutions&quot;</span>;
                </p>
                <p>{"}"}</p>
                <div className="pt-2 text-slate-500 text-[10px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Ready to deploy to production
                </div>
              </div>
            </div>

            {/* Social Links List */}
            <div className="anim-child p-4 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme)] flex items-center justify-around flex-wrap gap-2">
              {links.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

          </div>

        </div>
        
        {/* Resume Callout Banner (End of About Section) */}
        <div className="anim-child mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-2xl border border-blue-600/30 bg-blue-50/50 dark:bg-blue-950/20 shadow-xs">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
              Need my complete credentials &amp; technical background?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Download my official resume with verified academic coursework, engineering projects, and full-stack experience.
            </p>
          </div>
          <a
            href="/Adarsh_Maurya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shrink-0 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </a>
        </div>

      </div>
    </section>
  )
}
