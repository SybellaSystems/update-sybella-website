"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "https://ogera.sybellasystems.co.rw/", label: "Ogera", external: true },
  { href: "/technology", label: "Technology" },
  { href: "/impact", label: "Impact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        paddingTop: "clamp(10px, 2vw, 16px)",
        paddingLeft: "clamp(12px, 4vw, 32px)",
        paddingRight: "clamp(12px, 4vw, 32px)"
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        height: "clamp(56px, 10vw, 72px)",
        padding: "0 clamp(12px, 2vw, 20px) 0 clamp(8px, 1.5vw, 12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(15,23,42,0.06)",
        borderRadius: 9999,
        boxShadow: "0 6px 24px rgba(15,23,42,0.06)"
      }}>
        {/* Wordmark */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 12px)", textDecoration: "none" }}>
          <div style={{
            width: "clamp(36px, 7vw, 44px)",
            height: "clamp(36px, 7vw, 44px)",
            borderRadius: "50%",
            background: "var(--accent-soft)",
            border: "1px solid var(--border-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0
          }}>
            <img
              src="/LOGO WITH NO BG.png"
              alt="Sybella Systems Logo"
              style={{
                width: "clamp(24px, 5vw, 28px)",
                height: "clamp(24px, 5vw, 28px)",
                objectFit: "contain"
              }}
            />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(15px, 2.6vw, 18px)", letterSpacing: "-0.03em", color: "var(--ink-strong)" }}>SYBELLA</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 4 }}>
          {links.map(l => {
            const isActive = !l.external && pathname === l.href;
            const linkStyle = {
              padding: "8px 14px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(11px, 1.4vw, 13px)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: isActive ? "var(--accent)" : "var(--ink-muted)",
              transition: "color 0.2s",
              borderRadius: 9999,
              textDecoration: "none",
              minHeight: "40px",
              display: "flex",
              alignItems: "center"
            } as const;

            if (l.external) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  style={linkStyle}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-strong)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)"; }}
                >
                  {l.label}
                </a>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                style={linkStyle}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-strong)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-muted)"; }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.5vw, 10px)" }}>
          <Link href="/impact#contact" className="btn-ghost hidden lg:inline-flex" style={{ padding: "clamp(8px, 1.4vw, 10px) clamp(14px, 2.5vw, 18px)", fontSize: "clamp(11px, 1.4vw, 12px)", borderRadius: 9999 }}>Work With Us</Link>
          <a href="https://ogera.sybellasystems.co.rw/" className="btn-primary hidden lg:inline-flex" style={{ padding: "clamp(8px, 1.4vw, 10px) clamp(14px, 2.5vw, 18px)", fontSize: "clamp(11px, 1.4vw, 12px)", borderRadius: 9999 }}>Join Ogera</a>
          {/* Mobile menu toggle (phones only) */}
          <button onClick={() => setOpen(!open)} className="flex lg:hidden" style={{ flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer", minHeight: "44px", minWidth: "44px", alignItems: "center", justifyContent: "center" }} aria-label="Toggle menu">
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink-strong)", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink-strong)", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink-strong)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu — floating rounded card below the pill */}
      <div style={{
        maxWidth: 1280,
        margin: "clamp(8px, 1.2vw, 12px) auto 0",
        transform: open ? "translateY(0)" : "translateY(-8px)",
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: "transform 0.26s ease, opacity 0.22s ease, visibility 0.22s ease",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: "1px solid rgba(15,23,42,0.08)",
        borderRadius: 20,
        boxShadow: "0 18px 42px rgba(15,23,42,0.12)",
        pointerEvents: open ? "auto" : "none"
      }}>
        <div style={{ padding: "clamp(16px, 3vw, 24px)" }}>
          {links.map(l => {
            const isActive = !l.external && pathname === l.href;
            const linkStyle = {
              padding: "clamp(10px, 2vw, 14px) 0",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(15px, 2.5vw, 17px)",
              fontWeight: 700,
              color: isActive ? "var(--accent)" : "var(--ink-strong)",
              textDecoration: "none",
              minHeight: "44px",
              display: "flex",
              alignItems: "center"
            } as const;

            return l.external ? (
              <a key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} style={linkStyle}>
                {l.label}
              </Link>
            );
          })}
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10, marginTop: "clamp(12px, 2vw, 20px)" }}>
            <Link href="/impact#contact" className="btn-ghost" style={{ justifyContent: "center", fontSize: "clamp(11px, 1.5vw, 12px)", padding: "12px 16px", borderRadius: 9999, width: "100%" }}>
              Work With Us
            </Link>
            <a href="https://ogera.sybellasystems.co.rw/" className="btn-primary" style={{ justifyContent: "center", fontSize: "clamp(11px, 1.5vw, 12px)", padding: "12px 16px", borderRadius: 9999, width: "100%" }}>
              Join Ogera
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
