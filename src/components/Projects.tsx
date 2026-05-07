"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "SaaS — BrandAI",
    category: "SaaS · IA",
    description: "Plataforma SaaS con generación de contenido de marca impulsada por inteligencia artificial.",
    image: "/saas.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Supabase", "Redis", "Fastify", "AI"],
    year: "2024",
    demo: "#",
    github: "https://github.com/Oscarmrl/SaaS",
  },
  {
    title: "Ecommerce-Tec",
    category: "E-Commerce · Full Stack",
    description: "Tienda online completa con autenticación JWT, gestión de productos y pasarela de pagos.",
    image: "/ecommerce.png",
    tags: ["Next.js", "Node.js", "PostgreSQL", "JWT"],
    year: "2024",
    demo: "#",
    github: "https://github.com/Oscarmrl/Ecommerce-Tec",
  },
  {
    title: "PARADISE",
    category: "Full Stack",
    description: "Aplicación web con autenticación Firebase, base de datos PostgreSQL y experiencia de usuario fluida.",
    image: "/paradise.png",
    tags: ["Next.js", "PostgreSQL", "Firebase"],
    year: "2024",
    demo: "#",
    github: "https://github.com/Oscarmrl/PARADAISE",
  },
];

export default function Projects() {
  const outerRef  = useRef<HTMLDivElement>(null); // tall section for scroll room
  const stickyRef = useRef<HTMLDivElement>(null); // pinned 100vh canvas
  const cardsRef  = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const outer  = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => !!c);
    if (cards.length < 3) return;

    const W   = sticky.offsetWidth;
    const H   = sticky.offsetHeight;
    const gap = 12;

    const cardW = (W - gap) / 2;
    const cardH = (H - 44 - gap) / 2;

    const topOffset = 44;

    // Layout: 2 cards top (half width), 1 card bottom (full width)
    const finals = [
      { x: 0,           y: topOffset,            w: cardW, h: cardH },
      { x: cardW + gap, y: topOffset,            w: cardW, h: cardH },
      { x: 0,           y: topOffset + cardH + gap, w: W,  h: cardH },
    ];

    const stackX = W / 2 - cardW / 2;
    const stackY = topOffset + (cardH * 2 + gap) / 2 - cardH / 2 + 20;
    const rots   = [-8, 0, 8];

    cards.forEach((card, i) => {
      gsap.set(card, {
        position : "absolute",
        width    : cardW,
        height   : cardH,
        x        : stackX + i * 7,
        y        : stackY + i * 5,
        rotation : rots[i],
        zIndex   : cards.length - i,
        overflow : "hidden",
        opacity  : 1,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger : outer,
        start   : "top top",
        end     : "bottom bottom",
        scrub   : 1.8,
        pin     : sticky,
      },
    });

    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          x: finals[i].x, y: finals[i].y, rotation: 0,
          width: finals[i].w, height: finals[i].h,
          ease: "power2.inOut", duration: 1,
        },
        i * 0.55,
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="projects" style={{ marginBottom: 80 }}>
      <style>{`
        .project-card:hover .card-overlay { opacity: 1; }
        .project-card:hover .card-img-wrap img { transform: scale(1.05); }
      `}</style>
      {/* Tall wrapper that feeds the scroll distance */}
      <div
        ref={outerRef}
        style={{ position: "relative", height: `${projects.length * 120 + 60}vh` }}
      >
        {/* Pinned 100vh canvas */}
        <div
          ref={stickyRef}
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        >
          {/* Section label – always visible while pinned */}
          <p style={{
            fontSize: 12, fontWeight: 700, color: "#AAAAAA",
            letterSpacing: "0.12em", textTransform: "uppercase",
            position: "absolute", top: 14, left: 0,
          }}>
            Projects
          </p>

          {/* Cards rendered absolutely by GSAP */}
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={el => { cardsRef.current[i] = el; }}
              className="project-card"
              style={{
                background  : "white",
                border      : "1px solid #EBEBEB",
                borderRadius: 18,
                boxShadow   : "0 10px 40px rgba(0,0,0,0.12)",
                opacity     : 0, // GSAP sets to 1 immediately
              }}
            >
              {/* Image — hover shows description overlay */}
              <div className="card-img-wrap" style={{ position: "relative", height: "50%", overflow: "hidden", borderRadius: "18px 18px 0 0" }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="50vw"
                  style={{ objectFit: "cover", transition: "transform 0.45s ease" }}
                />
                <div style={{
                  position: "absolute", top: 10, right: 10,
                  background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)",
                  color: "white", fontSize: 10, fontWeight: 700,
                  padding: "3px 10px", borderRadius: 999, zIndex: 2,
                }}>{p.year}</div>

                {/* Overlay: shows description on hover */}
                <div className="card-overlay" style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.72)",
                  backdropFilter: "blur(4px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "20px 24px",
                  opacity: 0, transition: "opacity 0.28s ease",
                }}>
                  <p style={{
                    color: "rgba(255,255,255,0.92)", fontSize: 14,
                    lineHeight: 1.65, textAlign: "center", fontWeight: 400,
                  }}>{p.description}</p>
                </div>
              </div>

              {/* Text: category + title + tags + buttons — always visible */}
              <div style={{
                padding: "14px 18px 14px",
                height: "50%",
                display: "flex", flexDirection: "column",
                boxSizing: "border-box",
              }}>
                <p style={{
                  fontSize: 10, fontWeight: 700, color: "#AAAAAA",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4,
                }}>{p.category}</p>

                <p style={{ fontSize: 16, fontWeight: 700, color: "#111", lineHeight: 1.25, marginBottom: 8 }}>
                  {p.title}
                </p>

                {/* Tags + botones en la misma fila */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: "auto" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontSize: 10, fontWeight: 500, color: "#555",
                        background: "#F2F2F2", borderRadius: 6, padding: "3px 9px",
                        border: "1px solid #E8E8E8",
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    {/* Ver proyecto */}
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver proyecto"
                      style={{
                        width: 34, height: 34,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "#111", color: "#fff",
                        borderRadius: 10, textDecoration: "none",
                        transition: "background 0.18s, transform 0.15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "#333";
                        e.currentTarget.style.transform = "scale(1.08)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "#111";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </a>

                    {/* Ver código */}
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver código"
                      style={{
                        width: 34, height: 34,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "white", color: "#111",
                        borderRadius: 10,
                        border: "1px solid #E0E0E0",
                        textDecoration: "none",
                        transition: "border-color 0.18s, background 0.18s, transform 0.15s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "#BBB";
                        e.currentTarget.style.background = "#F5F5F5";
                        e.currentTarget.style.transform = "scale(1.08)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "#E0E0E0";
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
