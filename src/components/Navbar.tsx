"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Oscarmrl",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oscar-murillo-3885b4294",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "Email",
    href: "mailto:oscaralexandermurillo512@gmail.com",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  },
];

export default function Navbar() {
  const [raised, setRaised] = useState(false);

  useEffect(() => {
    const fn = () => setRaised(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm"
      style={{
        borderBottom: "1px solid #EBEBEB",
        boxShadow: raised ? "0 1px 12px rgba(0,0,0,0.05)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <div
        style={{ padding: "0 64px" }}
        className="h-14 flex items-center justify-between"
      >
        {/* Social icons */}
        <div className="flex items-center gap-0.5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              style={{
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 8, color: "#AAAAAA",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#111";
                (e.currentTarget as HTMLElement).style.background = "#F5F5F5";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#AAAAAA";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          style={{
            background: "#111", color: "#fff",
            fontSize: 12, fontWeight: 700,
            padding: "7px 16px", borderRadius: 999,
            border: "none", cursor: "none",
            display: "flex", alignItems: "center", gap: 6,
            transition: "background 0.2s",
            letterSpacing: "0.01em",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#333")}
          onMouseLeave={e => (e.currentTarget.style.background = "#111")}
        >
          Contactar
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.5 5.5h8M5.5 1.5l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.header>
  );
}
