"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1100));
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    fontSize: 15,
    fontFamily: "inherit",
    color: "#111",
    background: "white",
    border: `1px solid ${focused === field ? "#111" : "#E5E5E5"}`,
    borderRadius: 12,
    padding: "14px 18px",
    outline: "none",
    boxShadow: focused === field ? "0 0 0 3px rgba(17,17,17,0.06)" : "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    resize: "none" as const,
  });

  return (
    <section id="contact" ref={ref} style={{ marginBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        style={{
          background: "#F9F9F9",
          border: "1px solid #EBEBEB",
          borderRadius: 20,
          padding: "48px 56px 56px",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left — header */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 700, color: "#AAAAAA",
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16,
          }}>
            Contacto
          </p>
          <h2 style={{
            fontSize: 36, fontWeight: 700, color: "#111",
            letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.2,
          }}>
            Construyamos algo increíble.
          </h2>
          <p style={{ fontSize: 16, color: "#777", lineHeight: 1.7, marginBottom: 20 }}>
            Envíame un mensaje — te respondo en menos de 24 horas.
          </p>
          <a
            href="mailto:omurillooseguera@gmail.com"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 15, fontWeight: 600, color: "#111",
              transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#555")}
            onMouseLeave={e => (e.currentTarget.style.color = "#111")}
          >
            omurillooseguera@gmail.com
            <svg width="13" height="13" viewBox="0 0 11 11" fill="none">
              <path d="M1.5 5.5h8M5.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <input
              type="text" placeholder="Tu nombre" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
              style={inputStyle("name")}
            />
            <input
              type="email" placeholder="tu@correo.com" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
              style={inputStyle("email")}
            />
          </div>
          <textarea
            placeholder="Cuéntame sobre tu proyecto..." required rows={5}
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
            style={{ ...inputStyle("message"), resize: "none" }}
          />
          <button
            type="submit" disabled={status !== "idle"}
            style={{
              background: "#111", color: "white",
              fontSize: 15, fontWeight: 700, fontFamily: "inherit",
              padding: "14px 0", borderRadius: 12,
              border: "none", cursor: "pointer",
              opacity: status !== "idle" ? 0.7 : 1,
              transition: "background 0.2s, opacity 0.2s",
              overflow: "hidden",
            }}
            onMouseEnter={e => status === "idle" && (e.currentTarget.style.background = "#333")}
            onMouseLeave={e => (e.currentTarget.style.background = "#111")}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span key="i" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  Enviar mensaje
                  <svg width="14" height="14" viewBox="0 0 13 13" fill="none" style={{ transform: "rotate(-45deg)" }}>
                    <path d="M2 6.5h9M6.5 2l4.5 4.5L6.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              )}
              {status === "sending" && (
                <motion.span key="s" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }}/>
                  Enviando...
                </motion.span>
              )}
              {status === "sent" && (
                <motion.span key="d" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  ¡Mensaje enviado!
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </form>
      </motion.div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
