"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/ogera", label: "Ogera" },
  { href: "/technology", label: "Technology" },
  { href: "/impact", label: "Impact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Wordmark */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="2" fill="#c9a84c" />
            <path d="M10 22C10 19.8 11.6 18.4 14 18.1L21 17C22.2 16.8 23 15.9 23 14.7C23 13.2 21.8 12 20 12H12" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M22 10C22 12.2 20.4 13.6 18 13.9L11 15C9.8 15.2 9 16.1 9 17.3C9 18.8 10.2 20 12 20H20" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>SYBELLA</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "8px 16px",
              fontFamily: "var(--font-display)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: pathname === l.href ? "var(--blue-bright)" : "var(--text-secondary)",
              transition: "color 0.2s",
              borderRadius: 2,
              textDecoration: "none",
            }}
              onMouseEnter={e => { if (pathname !== l.href) (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { if (pathname !== l.href) (e.target as HTMLElement).style.color = "var(--text-secondary)"; }}
            >{l.label}</Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/impact#contact" className="btn-ghost hidden md:inline-flex" style={{ padding: "10px 20px", fontSize: 12 }}>Work With Us</Link>
          <Link href="/ogera#join" className="btn-primary hidden md:inline-flex" style={{ padding: "10px 20px", fontSize: 12 }}>Join Ogera</Link>
          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} style={{ display: "flex", flexDirection: "column", gap: 5, padding: 8, background: "none", border: "none", cursor: "pointer" }} className="md:hidden">
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-primary)", transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-primary)", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: "var(--text-primary)", transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{ overflow: "hidden", maxHeight: open ? 360 : 0, transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)", background: "var(--charcoal)", borderTop: open ? "1px solid var(--border)" : "none" }} className="md:hidden">
        <div style={{ padding: "24px 32px 32px" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ display: "block", padding: "14px 0", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: pathname === l.href ? "var(--blue-bright)" : "var(--text-primary)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>{l.label}</Link>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Link href="/impact#contact" className="btn-ghost" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>Work With Us</Link>
            <Link href="/ogera#join" className="btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>Join Ogera</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
