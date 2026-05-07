"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Oscarmrl",
    x: -115,
    y: -270,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oscar-murillo-3885b4294",
    x: 20,
    y: -310,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oscarmurillo3733/",
    x: 155,
    y: -260,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const titleWords = ["Hola,", "soy", "Oscar", "Murillo."];

export default function Hero() {
  const [hovered, setHovered] = useState(false);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        paddingTop: 72,
        paddingBottom: 72,
        display: "flex",
        alignItems: "center",
        gap: 64,
        flexWrap: "wrap",
      }}
    >
      {/* Photo — drops from above with spring settle */}
      <motion.div
        initial={{ opacity: 0, y: -90, scale: 0.82 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          opacity: { duration: 0.3, ease: "easeOut" },
          y: { type: "spring", stiffness: 120, damping: 14, mass: 1.2 },
          scale: { duration: 0.6, ease: easeExpo },
        }}
        whileHover={{ y: -7, transition: { duration: 0.35, ease: easeExpo } }}
        style={{ position: "relative", flexShrink: 0, width: 280, height: 340 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Tilted photo */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            border: "4px solid #fff",
            transform: "rotate(-5deg)",
            position: "relative",
          }}
        >
          <Image
            src="/yo1.png"
            alt="Oscar Murillo"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />

          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.25)",
                  borderRadius: 20,
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Social icon buttons */}
        <AnimatePresence>
          {hovered &&
            socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: s.x, y: s.y }}
                exit={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                transition={{
                  delay: i * 0.07,
                  type: "spring",
                  stiffness: 380,
                  damping: 22,
                }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  marginLeft: -24,
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(10,10,10,0.82)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  zIndex: 20,
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                whileHover={{ scale: 1.15, background: "rgba(30,30,30,0.95)" }}
              >
                {s.icon}
              </motion.a>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 240 }}>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {/* Line 1 — each word slides up from behind a clip mask */}
          <span
            style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.08 + i * 0.085,
                  ease: easeExpo,
                }}
                style={{
                  display: "inline-block",
                  marginRight: i < titleWords.length - 1 ? "0.28em" : 0,
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2 — subtitle slides up as a single unit */}
          <span
            style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
          >
            <motion.span
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.46, ease: easeExpo }}
              style={{ display: "inline-block", color: "#888" }}
            >
              Full Stack Dev &amp; AI Integrator
            </motion.span>
            {" "}
            {/* ⚡ pops in with spring rotation */}
            <motion.span
              initial={{ opacity: 0, scale: 0.2, rotate: -70 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 11,
                delay: 0.78,
              }}
              style={{ display: "inline-block", fontSize: "0.85em" }}
            >
              ⚡
            </motion.span>
          </span>
        </h1>

        {/* Paragraph — blur clears as it rises */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.62, ease: easeExpo }}
          style={{
            fontSize: 17,
            color: "#777",
            lineHeight: 1.75,
            marginBottom: 32,
            maxWidth: 560,
          }}
        >
          Convierto ideas complejas en productos digitales funcionales y bien
          diseñados. Me especializo en aplicaciones web inteligentes y
          automatización de flujos de trabajo.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: easeExpo }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}
        >
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "#111",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              padding: "13px 28px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#333")}
            onMouseLeave={e => (e.currentTarget.style.background = "#111")}
          >
            Contáctame
          </button>

          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: "white",
              color: "#111",
              fontSize: 15,
              fontWeight: 500,
              padding: "13px 28px",
              borderRadius: 999,
              border: "1px solid #E0E0E0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "border-color 0.2s, background 0.2s",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#CCC";
              (e.currentTarget as HTMLElement).style.background = "#FAFAFA";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E0E0E0";
              (e.currentTarget as HTMLElement).style.background = "white";
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22C55E",
                boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
                animation: "pulse 2s infinite",
              }}
            />
            Disponible para proyectos
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.25); }
          50%       { box-shadow: 0 0 0 4px rgba(34,197,94,0.1); }
        }
      `}</style>
    </section>
  );
}
