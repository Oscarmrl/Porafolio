"use client";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #EBEBEB",
      marginTop: 8,
    }}>
      <div style={{
        padding: "20px 64px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#111", letterSpacing: "-0.01em" }}>
          Oscar Murillo
        </span>
        <p style={{ fontSize: 11, color: "#AAAAAA" }}>
          © {new Date().getFullYear()} · Hecho con Next.js &amp; Framer Motion
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontSize: 11, fontWeight: 500,
            color: "#AAAAAA", background: "none",
            border: "none", cursor: "none",
            fontFamily: "inherit",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#111")}
          onMouseLeave={e => (e.currentTarget.style.color = "#AAAAAA")}
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  );
}
