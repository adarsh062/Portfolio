"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Code2, Users, Trophy, ExternalLink } from "lucide-react"
import { SiLeetcode, SiCodechef, SiGeeksforgeeks } from "react-icons/si"

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    icon: <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    badge: "Competitive Programming",
    title: "1613 LeetCode · 1619 CodeChef",
    description:
      "Ranked in Top 22% globally on LeetCode with 1613 rating. Achieved 3-Star rated coder on CodeChef with 1619 rating.",
    metrics: [
      { label: "LeetCode", val: "1613 (Top 22%)" },
      { label: "CodeChef", val: "1619 (3-Star)" },
    ],
  },
  {
    icon: <Code2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    badge: "Data Structures & Algorithms",
    title: "500+ Problems Solved",
    description:
      "Consistent problem-solving track record across platforms demonstrating strong algorithmic thinking, optimization, and time/space complexity analysis.",
    platforms: ["LeetCode", "CodeChef", "GeeksforGeeks"],
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    badge: "Leadership & Community",
    title: "Music Club Lead & Event Coordinator",
    description:
      "Led a 30+ member music club team and coordinated 15+ major institute-level cultural and technical events at IIIT Bhopal.",
    metrics: [
      { label: "Team Led", val: "30+ Members" },
      { label: "Events Coordinated", val: "15+ at IIIT Bhopal" },
    ],
  },
]

export function Achievements() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.querySelectorAll(".anim-achieve"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
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
      id="achievements"
      style={{
        background: "var(--background-theme)",
        color: "var(--text-theme)",
        borderTop: "1px solid var(--border-theme)",
      }}
      className="relative z-10"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 lg:py-28">
        
        {/* ── Section label ── */}
        <div className="anim-achieve flex items-center gap-3 mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">
            05 / Achievements &amp; Milestones
          </span>
          <div className="flex-1 h-px bg-[var(--border-theme)]" />
        </div>

        <div className="mb-14">
          <h2
            className="anim-achieve font-display font-black leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", color: "var(--text-theme)" }}
          >
            Milestones &amp;{" "}
            <span className="text-blue-600 dark:text-blue-400">
              leadership impact.
            </span>
          </h2>
          <p className="anim-achieve text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Demonstrated commitment to continuous algorithmic mastery and active team leadership across campus and tech platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <div
              key={i}
              className="anim-achieve p-7 rounded-2xl border border-[var(--border-theme)] bg-[var(--card-theme)] shadow-xs hover:border-blue-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl border border-[var(--border-theme)] bg-[var(--card-theme-muted)]">
                    {item.icon}
                  </div>
                  <span className="text-[0.68rem] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md border border-blue-600/20 bg-blue-500/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>

              {/* Metrics or tags */}
              <div className="pt-4 border-t border-[var(--border-theme)]">
                {item.metrics ? (
                  <div className="grid grid-cols-2 gap-2">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="text-xs">
                        <span className="text-slate-500 block text-[0.68rem]">{m.label}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{m.val}</span>
                      </div>
                    ))}
                  </div>
                ) : item.platforms ? (
                  <div className="space-y-1.5">
                    <span className="text-slate-500 block text-[0.68rem] font-semibold uppercase tracking-wider">
                      Solved across platforms:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[0.72rem] font-medium px-2 py-0.5 rounded-md border border-[var(--border-theme)] bg-[var(--card-theme-muted)] text-slate-700 dark:text-slate-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
