"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Copy, Check, ArrowUpRight, Phone, MessageSquare, MapPin } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { FaCode, FaLinkedin } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-contact"),
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

  const copyEmail = () => {
    navigator.clipboard.writeText("mauryadarsh9140@gmail.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 overflow-hidden"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        borderTop: "1px solid var(--border-theme)",
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">
        
        {/* ── Section label ── */}
        <div className="anim-contact flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            06 / Get In Touch
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Note (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2
              className="anim-contact font-display font-black leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
            >
              Let&apos;s discuss new engineering{" "}
              <span className="text-blue-600 dark:text-blue-400">
                opportunities &amp; ideas.
              </span>
            </h2>

            <p className="anim-contact text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
              I am actively seeking Software Engineering internships, full-time roles, and technical collaborations in distributed backends, AI applications, and full-stack engineering. Feel free to reach out directly via email, phone, or WhatsApp.
            </p>

            {/* Quick Action Buttons */}
            <div className="anim-contact flex flex-wrap gap-3 pt-2">
              <a
                href="mailto:mauryadarsh9140@gmail.com"
                className="pro-btn bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>

              <a
                href="https://wa.me/919918446020"
                target="_blank"
                rel="noopener noreferrer"
                className="pro-btn bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+919918446020"
                className="pro-btn border border-[var(--border-theme)] bg-[var(--card-theme)] text-slate-700 dark:text-slate-300 hover:bg-[var(--bg-hover-theme)]"
              >
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Call Directly</span>
              </a>


            </div>
          </div>

          {/* Right Column: Contact Cards Grid (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Email Box with copy */}
            <div
              onClick={copyEmail}
              className="anim-contact p-5 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs hover:border-blue-500/40 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  mauryadarsh9140@gmail.com
                </span>
                <span className="text-[0.7rem] text-slate-500 block">
                  Click to copy to clipboard
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-500 group-hover:text-blue-600 transition-colors">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </div>
            </div>

            {/* Phone */}
            <div className="anim-contact p-5 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider block">
                  Phone / WhatsApp
                </span>
                <a
                  href="tel:+919918446020"
                  className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors"
                >
                  +91 99184 46020
                </a>
                <span className="text-[0.7rem] text-slate-500 block">
                  Available for calls &amp; WhatsApp
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-500">
                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Location */}
            <div className="anim-contact p-5 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider block">
                  Location
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 block">
                  Bhopal, Madhya Pradesh, India
                </span>
                <span className="text-[0.7rem] text-slate-500 block">
                  IIIT Bhopal Campus · Open to Relocation &amp; Remote
                </span>
              </div>
              <div className="p-2.5 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-500">
                <MapPin className="w-4 h-4 text-rose-500" />
              </div>
            </div>

            {/* Profiles */}
            <div className="anim-contact p-5 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs flex flex-col gap-3">
              <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-wider">
                Profiles &amp; Coding Portals
              </span>
              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="https://github.com/adarsh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <SiGithub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://www.linkedin.com/in/adarsh-maurya-64077629/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://codolio.com/profile/adarsh062"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <FaCode className="w-3.5 h-3.5" />
                  <span>Codolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
