"use client";
import Link from "next/link";

const cols = [
  { title: "Company", links: [["Home", "/"], ["About", "/impact"], ["Technology", "/technology"], ["Impact", "/impact"]] },
  { title: "Products", links: [["Ogera Platform", "/ogera"], ["For Students", "/ogera#students"], ["For Employers", "/ogera#employers"], ["Join Beta", "/ogera#join"]] },
  { title: "Services", links: [["Custom Software", "/technology"], ["SaaS Development", "/technology"], ["ERP Systems", "/technology"], ["Cloud Solutions", "/technology"]] },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 60, borderBottom: "1px solid var(--border)" }} className="grid-footer">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="2" fill="#c9a84c" />
                <path d="M10 22C10 19.8 11.6 18.4 14 18.1L21 17C22.2 16.8 23 15.9 23 14.7C23 13.2 21.8 12 20 12H12" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M22 10C22 12.2 20.4 13.6 18 13.9L11 15C9.8 15.2 9 16.1 9 17.3C9 18.8 10.2 20 12 20H20" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" }}>SYBELLA</span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
              Engineering Africa's digital future. Premium software systems for the continent's most ambitious builders.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["LI", "TW", "GH"].map(s => (
                <div key={s} style={{ width: 36, height: 36, border: "1px solid var(--border-bright)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-secondary)", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLDivElement).style.color = "var(--gold-bright)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-bright)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-secondary)"; }}
                >{s}</div>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-bright)", marginBottom: 20 }}>{col.title}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-primary)"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-secondary)"}
                  >{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>© 2025 Sybella Systems Ltd. Kigali, Rwanda. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            {[["Privacy Policy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: 13, color: "var(--text-tertiary)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`.grid-footer { @media (max-width: 768px) { grid-template-columns: 1fr 1fr; } }`}</style>
    </footer>
  );
}
