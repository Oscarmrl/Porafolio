"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { contactSchema } from "@/lib/contact-schema";
import type { ZodFormattedError } from "zod";

type FormFields = { name: string; email: string; message: string };
type FieldErrors = ZodFormattedError<FormFields>;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const [form, setForm] = useState<FormFields>({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Validate a single field on blur
  const handleBlur = (field: keyof FormFields) => {
    setFocused(null);
    setTouched(t => ({ ...t, [field]: true }));
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setFieldErrors(result.error.format() as FieldErrors);
    } else {
      setFieldErrors(null);
    }
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    // Clear error for this field as user types
    if (touched[field]) {
      const result = contactSchema.safeParse(updated);
      if (!result.success) {
        setFieldErrors(result.error.format() as FieldErrors);
      } else {
        setFieldErrors(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Full client-side validation before sending
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      setFieldErrors(result.error.format() as FieldErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setStatus("sending");
    setFieldErrors(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error("Error");

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const inputStyle = (field: keyof FormFields): React.CSSProperties => {
    const hasError = touched[field] && fieldErrors?.[field]?._errors?.length;
    return {
      width: "100%",
      fontSize: 15,
      fontFamily: "inherit",
      color: "#111",
      background: "white",
      border: `1px solid ${hasError ? "#DC2626" : focused === field ? "#111" : "#E5E5E5"}`,
      borderRadius: 12,
      padding: "14px 18px",
      outline: "none",
      boxShadow: hasError
        ? "0 0 0 3px rgba(220,38,38,0.08)"
        : focused === field
        ? "0 0 0 3px rgba(17,17,17,0.06)"
        : "none",
      transition: "border-color 0.15s, box-shadow 0.15s",
      resize: "none" as const,
    };
  };

  const errorMsg = (field: keyof FormFields) => {
    const msg = fieldErrors?.[field]?._errors?.[0];
    if (!touched[field] || !msg) return null;
    return (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18 }}
        style={{ fontSize: 12, color: "#DC2626", marginTop: 5, paddingLeft: 4 }}
      >
        {msg}
      </motion.p>
    );
  };

  return (
    <section id="contact" ref={ref} style={{ marginBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        className="contact-grid"
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
        {/* Left */}
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
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="contact-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <input
                type="text"
                placeholder="Tu nombre"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                onFocus={() => setFocused("name")}
                onBlur={() => handleBlur("name")}
                style={inputStyle("name")}
              />
              <AnimatePresence>{errorMsg("name")}</AnimatePresence>
            </div>
            <div>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => handleBlur("email")}
                style={inputStyle("email")}
              />
              <AnimatePresence>{errorMsg("email")}</AnimatePresence>
            </div>
          </div>

          <div>
            <textarea
              placeholder="Cuéntame sobre tu proyecto..."
              rows={5}
              value={form.message}
              onChange={e => handleChange("message", e.target.value)}
              onFocus={() => setFocused("message")}
              onBlur={() => handleBlur("message")}
              style={{ ...inputStyle("message"), resize: "none" }}
            />
            <AnimatePresence>{errorMsg("message")}</AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              background: status === "error" ? "#DC2626" : "#111",
              color: "white",
              fontSize: 15, fontWeight: 700, fontFamily: "inherit",
              padding: "14px 0", borderRadius: 12,
              border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
              opacity: status === "sending" ? 0.7 : 1,
              transition: "background 0.2s, opacity 0.2s",
              overflow: "hidden",
            }}
            onMouseEnter={e => status === "idle" && (e.currentTarget.style.background = "#333")}
            onMouseLeave={e => (e.currentTarget.style.background = status === "error" ? "#DC2626" : "#111")}
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
              {status === "error" && (
                <motion.span key="e" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v6M7 10v1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Error, inténtalo de nuevo
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
