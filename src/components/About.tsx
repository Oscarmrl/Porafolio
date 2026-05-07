"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const photos = [
  { src: "/about1.jpeg", rotate: "-3deg" },
  { src: "/about3.jpeg", rotate: "2.5deg" },
  { src: "/about2.jpeg", rotate: "-1.5deg" },
];

const stack = [
  "TypeScript","React","Next.js","Node.js","Python",
  "PostgreSQL","OpenAI API","Claude API","Express","Fastify",
  "Bun.js","GraphQL","Prisma","JWT","Tailwind CSS",
  "Docker","Vercel","Railway","n8n","REST APIs","Git","MongoDB","MySQL",
];

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const [stackVisible, setStackVisible] = useState(false);
  const animatedOnce = useRef(false);

  // Separate observer so stack fires when IT enters view, not the whole section
  useEffect(() => {
    const el = pillsContainerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStackVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // GSAP pop entrance
  useEffect(() => {
    if (!stackVisible || animatedOnce.current || !pillsContainerRef.current) return;
    animatedOnce.current = true;

    const pills = pillsContainerRef.current.querySelectorAll<HTMLElement>(".tech-pill");

    // Start each pill invisible, zero-size, slightly rotated
    gsap.set(pills, {
      scale: 0,
      opacity: 0,
      rotation: () => gsap.utils.random(-14, 14),
    });

    // Pop in — elastic overshoot gives the "boing" feel
    gsap.to(pills, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.7,
      stagger: {
        each: 0.06,
        from: "random",        // random order = pa-pa-pap chaos
      },
      ease: "elastic.out(1.05, 0.48)",
      delay: 0.08,
    });
  }, [stackVisible]);

  const handlePillEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.killTweensOf(e.currentTarget);
    // Quick squish down then spring back up — satisfying press feel
    gsap.timeline()
      .to(e.currentTarget, {
        scaleX: 1.12, scaleY: 0.88,
        backgroundColor: "#111111",
        color: "#ffffff",
        borderColor: "#111111",
        duration: 0.1,
        ease: "power3.in",
      })
      .to(e.currentTarget, {
        scaleX: 1, scaleY: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.45)",
      });
  };

  const handlePillLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.killTweensOf(e.currentTarget);
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "#F5F5F5",
      color: "#444444",
      borderColor: "#EBEBEB",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <section id="about" ref={ref} style={{ marginBottom: 80 }}>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: 12, fontWeight: 700,
          color: "#AAAAAA", letterSpacing: "0.12em",
          textTransform: "uppercase", marginBottom: 24,
        }}
      >
        Sobre mí
      </motion.p>

      {/* Bio — two column layout */}
      <motion.div
        className="about-bio"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.06, ease: [0.25, 1, 0.5, 1] }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          marginBottom: 48,
        }}
      >
        <p style={{ fontSize: 18, color: "#222", lineHeight: 1.75, fontWeight: 400 }}>
          Llevo más de 3 años construyendo cosas para internet. Empecé por la parte técnica,
          pero rápido me di cuenta de que no me bastaba con que algo funcionara — también tenía
          que verse bien y sentirse bien al usarlo. Hoy trabajo en esa línea difusa entre
          ingeniería y diseño, y es exactamente donde me gusta estar.
        </p>
        <p style={{ fontSize: 16, color: "#666", lineHeight: 1.8 }}>
          Me especializo en desarrollo full-stack e integración de IA, con experiencia
          construyendo productos de principio a fin. Trabajo bien en equipo, me adapto rápido
          a bases de código existentes y me importa dejar las cosas mejor de como las encontré.
        </p>
      </motion.div>

      {/* Photos */}
      <motion.div
        className="about-photos"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.14, ease: [0.25, 1, 0.5, 1] }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, zIndex: 10 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            style={{
              background: "white",
              border: "1px solid #E8E8E8",
              padding: "10px 10px 32px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              borderRadius: 4,
              rotate: p.rotate,
              cursor: "pointer",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              paddingBottom: "66%",
              overflow: "hidden",
              borderRadius: 2,
            }}>
              <Image
                src={p.src}
                alt={`Photo ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tech Stack */}
      <div>
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: easeExpo }}
          style={{
            fontSize: 12, fontWeight: 700, color: "#AAAAAA",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16,
          }}
        >
          Stack tecnológico
        </motion.p>

        {/* perspective on container gives depth to the rotateX flip */}
        <div
          ref={pillsContainerRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          {stack.map((s) => (
            <span
              key={s}
              className="tech-pill"
              onMouseEnter={handlePillEnter}
              onMouseLeave={handlePillLeave}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#444",
                backgroundColor: "#F5F5F5",
                border: "1px solid #EBEBEB",
                borderRadius: 999,
                padding: "7px 18px",
                display: "inline-block",
                cursor: "default",
                userSelect: "none",
                // start hidden — GSAP sets & reveals
                opacity: 0,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
