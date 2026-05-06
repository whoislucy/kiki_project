export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0E0D0C",
        color: "#F0EDE8",
        fontFamily: "'Onest', 'Inter', system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "#E03018",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          ERROR · 404
        </p>
        <h1
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "-0.02em",
            margin: "12px 0 8px",
          }}
        >
          Страница не найдена
        </h1>
        <p style={{ color: "#6A6460", fontSize: 14, margin: "0 0 20px" }}>
          Page not found.
        </p>
        <a
          href="."
          style={{
            display: "inline-block",
            padding: "10px 18px",
            background: "#E03018",
            color: "#fff",
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            borderRadius: 2,
          }}
        >
          ← На главную
        </a>
      </div>
    </div>
  );
}
