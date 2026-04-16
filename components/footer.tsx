"use client"

import { Github, Linkedin, Code2, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-12 lg:px-24"
      style={{
        borderTop: "1px solid rgba(0, 255, 213, 0.2)",
        background: "rgba(0, 20, 30, 0.4)",
        backdropFilter: "blur(10px)"
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <span className="text-base font-bold font-mono" style={{ color: "oklch(0.72 0.22 280)" }}>
          Adarsh Maurya<span style={{ color: "oklch(0.45 0.008 268)" }}>.</span>
        </span>


        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: "https://github.com/adarsh062", label: "GitHub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/adarsh-maurya-64077629/", label: "LinkedIn" },
            { Icon: Code2, href: "https://leetcode.com/u/EAvlrf5Y0M/", label: "LeetCode" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                color: "oklch(0.50 0.008 268)",
                background: "oklch(0.12 0.010 268)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.80 0.18 280)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.72 0.22 280 / 0.12)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.50 0.008 268)"
                ;(e.currentTarget as HTMLAnchorElement).style.background = "oklch(0.12 0.010 268)"
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
