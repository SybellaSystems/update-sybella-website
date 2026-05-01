"use client";
import Image from "next/image";
import Link from "next/link";

const cols = [
  { title: "Company", links: [["Home", "/"], ["Technology", "/technology"], ["Impact", "/impact"], ["Ogera", "https://ogera.sybellasystems.co.rw/"]] },
  { title: "Capabilities", links: [["Custom Platforms", "/technology"], ["ERP Systems", "/technology"], ["SaaS Products", "/technology"], ["Product Engineering", "/technology"]] },
  { title: "Engagement", links: [["Start a Project", "/impact#contact"], ["Delivery Model", "/"], ["Advisory Services", "/impact#contact"], ["Executive Consultation", "/impact#contact"]] },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(56px, 9vw, 80px) clamp(16px, 4vw, 32px) 0" }}>
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 14,
            background: "linear-gradient(180deg, rgba(37,99,235,0.05), rgba(37,99,235,0))",
            padding: "clamp(22px, 4vw, 30px)",
            marginBottom: "clamp(28px, 5vw, 40px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 20px)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(10px, 1.4vw, 12px)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
              Ready To Build
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink-strong)", lineHeight: 1.15 }}>
              Let&apos;s scope your next digital platform.
            </p>
          </div>
          <Link href="/impact#contact" className="btn-primary" style={{ borderRadius: 9999, padding: "clamp(12px, 1.8vw, 14px) clamp(24px, 3.8vw, 30px)", fontSize: "clamp(10px, 1.2vw, 12px)" }}>
            Schedule a Strategy Call
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(34px, 6vw, 54px)", paddingBottom: "clamp(34px, 6vw, 52px)", borderBottom: "1px solid var(--border)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 12px)", marginBottom: "clamp(12px, 2vw, 20px)" }}>
              <Image
                src="/LOGO WITH NO BG.png"
                alt="Sybella Systems Logo"
                width={32}
                height={32}
                style={{ width: "clamp(24px, 4vw, 32px)", height: "clamp(24px, 4vw, 32px)" }}
              />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(14px, 3vw, 18px)", letterSpacing: "-0.03em", color: "var(--ink-strong)" }}>SYBELLA</span>
            </div>
            <p style={{ fontSize: "clamp(12px, 1.6vw, 14px)", color: "var(--ink-muted)", lineHeight: 1.72, marginBottom: 16, maxWidth: 420 }}>
              Enterprise software partner for African organizations building mission-critical systems with long-term ownership, governance, and operational reliability.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                ["LinkedIn", "https://linkedin.com/company/sybella-systems"],
                ["X / Twitter", "https://twitter.com/sybellasystems"],
                ["Ogera", "https://ogera.sybellasystems.co.rw/"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="btn-ghost"
                  style={{ borderRadius: 9999, fontSize: 11, padding: "10px 14px" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(9px, 1.5vw, 11px)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-bright)", marginBottom: "clamp(16px, 3vw, 20px)" }}>
                {col.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.5vw, 12px)" }}>
                {col.links.map(([label, href]) => {
                  const linkStyle = {
                    fontSize: "clamp(12px, 2vw, 14px)",
                    color: "var(--ink-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                  } as const;
                  return href.startsWith("http") ? (
                    <a
                      key={label}
                      href={href}
                      style={linkStyle}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-strong)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)"; }}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      href={href}
                      style={linkStyle}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-strong)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)"; }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "clamp(16px, 3vw, 24px) 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "clamp(12px, 2vw, 16px)" }}>
          <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "var(--ink-faint)" }}>
            &copy; {new Date().getFullYear()} Sybella Systems Ltd. Kigali, Rwanda. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "clamp(16px, 3vw, 24px)", flexWrap: "wrap" }}>
            {[["Privacy Policy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "var(--ink-faint)", textDecoration: "none", minHeight: "44px", display: "flex", alignItems: "center" }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}