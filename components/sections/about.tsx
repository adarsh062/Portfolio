"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import {
  SiGithub,
  SiGmail,
  SiVercel,
  SiLeetcode
} from "react-icons/si"
import { FaPhone, FaCode, FaLinkedin } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "400+", label: "DSA Problems Solved" },
  { value: "3⭐", label: "CodeChef Rating (1619)" },
  { value: "15+", label: "Events Led (Music Lead)" },
  { value: "2023-27", label: "B.Tech CSE (IIIT Bhopal)" },
]

const details = [
  { label: "Institution", value: "IIIT Bhopal" },
  { label: "Degree", value: "B.Tech. CSE" },
  { label: "Duration", value: "Sept 2023 – June 2027" },
  { label: "Location", value: "Bhopal, India" },
]

const coursework = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming (OOP)",
  "Database Management Systems (DBMS)",
  "System Design",
  "Computer Networks",
  "Cryptography"
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
            start: "top 80%",
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
      className="relative z-10 transition-colors duration-500"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        paddingTop: "5rem",
        paddingBottom: "5rem"
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Top rule + label */}
        <div className="anim-child flex items-center gap-6 mb-12">
          <div className="h-[1px] w-full" style={{ background: "var(--border-theme)" }} />
          <span className="editorial-label shrink-0 opacity-50" style={{ color: "var(--text-theme)" }}>01 / About Me</span>
        </div>

        {/* Spread Layout: Reduced gaps to optimize space */}
        <div className="grid lg:grid-cols-[1.1fr_1px_1.1fr] gap-0">

          {/* Left Side: Bio & Stats */}
          <div className="pr-0 lg:pr-10 pb-8 lg:pb-0 flex flex-col justify-between">
            <div>
              <h2
                className="anim-child font-display text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.02em",
                  color: "var(--text-theme)"
                }}
              >
                About
                <br />
                <em className="opacity-50" style={{ fontStyle: "italic", color: "var(--text-theme)" }}>Me</em>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="anim-child text-sm md:text-base leading-relaxed opacity-80" style={{ color: "var(--text-theme)" }}>
                  I&apos;m a Computer Science student at <span className="font-semibold" style={{ color: "var(--text-theme)" }}>Indian Institute of Information Technology (IIIT) Bhopal</span>, focused on engineering scalable full-stack applications, DevSecOps pipelines, and GenAI solutions that solve real problems.
                </p>
                <p className="anim-child text-sm md:text-base leading-relaxed opacity-85" style={{ color: "var(--text-theme)" }}>
                  I love writing high-performance code and building real-world products. From leading a 4-member Agile team to shipping a production NGO platform — I thrive where engineering meets impact. Alongside development, I serve as the Music Lead for college events, managing and coordinating teams to deliver memorable experiences.
                </p>
              </div>

              {/* Coursework list */}
              <div className="anim-child mb-8">
                <span className="editorial-label block mb-2.5 opacity-50" style={{ color: "var(--text-theme)", fontSize: "0.6rem" }}>Relevant Coursework</span>
                <div className="flex flex-wrap gap-1.5">
                  {coursework.map((course) => (
                    <span
                      key={course}
                      className="editorial-tag opacity-90"
                      style={{
                        borderColor: "var(--border-theme)",
                        color: "var(--text-theme)",
                        fontSize: "0.6rem",
                        padding: "0.15rem 0.45rem"
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="anim-child grid grid-cols-2 gap-x-6 gap-y-4 pt-4" style={{ borderTop: "1px solid var(--border-theme)" }}>
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="font-display text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "var(--text-theme)" }}>
                    {s.value}
                  </span>
                  <span className="editorial-label block opacity-50" style={{ fontSize: "0.55rem", color: "var(--text-theme)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block mx-10 w-[1px]" style={{ background: "var(--border-theme)", alignSelf: "stretch" }} />

          {/* Right Side: Photo, details list, and links */}
          <div className="pl-0 lg:pl-10 flex flex-col justify-between">
            {/* Portrait Image Frame */}
            <div className="about-transition-target relative w-full aspect-[4/3] border border-black/10 dark:border-white/10 overflow-hidden mb-6 bg-black/5 dark:bg-white/5">
              <Image
                src="/mphoto.jpeg"
                alt="Adarsh Maurya"
                fill
                className="about-transition-img object-contain object-bottom"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay pointer-events-none" />
            </div>

            {/* Profile Details List */}
            <div className="anim-child space-y-3 pt-3 mb-6" style={{ borderTop: "1px solid var(--border-theme)" }}>
              {details.map((d) => (
                <div key={d.label} className="flex justify-between items-baseline py-0.5">
                  <span className="editorial-label opacity-50" style={{ color: "var(--text-theme)", fontSize: "0.55rem" }}>
                    {d.label}
                  </span>
                  <span className="text-xs font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text-theme)" }}>
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Important Links - Center-aligned row, brand logos in color */}
            <div className="anim-child pt-4" style={{ borderTop: "1px solid var(--border-theme)" }}>
              <span className="editorial-label block mb-4 opacity-50" style={{ color: "var(--text-theme)", fontSize: "0.6rem" }}>Important Links</span>
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-center justify-start sm:justify-between">
                {/* GitHub */}
                <a
                  href="https://github.com/adarsh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <SiGithub className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: "var(--text-theme)" }} />
                  <span className="text-[10px] font-bold opacity-75 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-theme)" }}>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <FaLinkedin className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: "#0a66c2" }} />
                  <span className="text-[10px] font-bold opacity-75 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-theme)" }}>LinkedIn</span>
                </a>

                {/* Codolio */}
                <a
                  href="https://codolio.com/profile/adarsh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <FaCode className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: "#ff5a00" }} />
                  <span className="text-[10px] font-bold opacity-75 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-theme)" }}>Codolio</span>
                </a>

                {/* leetcode */}
                <a
                  href="https://leetcode.com/u/EAvlrf5Y0M/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <SiLeetcode className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: "#ffa116" }} />
                  <span className="text-[10px] font-bold opacity-75 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-theme)" }}>LeetCode</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:mauryadarsh9140@gmail.com"
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                >
                  <SiGmail className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: "#ea4335" }} />
                  <span className="text-[10px] font-bold opacity-75 group-hover:opacity-100 transition-opacity" style={{ color: "var(--text-theme)" }}>Email</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
