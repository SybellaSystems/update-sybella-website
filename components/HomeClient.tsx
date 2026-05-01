"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const HeroOrb3D = dynamic(() => import("./HeroOrb3D"), {
  ssr: false,
  loading: () => (
    <div style={{
      width: "100%",
      aspectRatio: "1 / 1",
      borderRadius: "50%",
      background: "radial-gradient(circle at 30% 30%, #93C5FD 0%, #2563EB 50%, #1E3A8A 100%)",
      opacity: 0.4,
      filter: "blur(8px)"
    }} />
  )
});

function useIntersection(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries =>
      entries.forEach(e => e.target.classList.toggle("visible", e.isIntersecting)),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ref]);
}

/* Partnership card — matches PillarCard hover motion, holds tag/title/desc/CTA */
function PartnerCard({ tag, title, desc, ctaLabel, href }: { tag: string; title: string; desc: string; ctaLabel: string; href: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tiltX = hovered ? (50 - mouse.y) * 0.06 : 0;
  const tiltY = hovered ? (mouse.x - 50) * 0.06 : 0;

  const ctaStyle = { fontSize: 11, padding: "10px 18px", borderRadius: 9999 } as const;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      style={{
        padding: "clamp(24px, 3vw, 32px)",
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-accent)" : "var(--border)"}`,
        borderRadius: 12,
        position: "relative",
        height: "100%",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${hovered ? 1.03 : 1})`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.3s",
        boxShadow: hovered
          ? "0 30px 60px rgba(29,78,216,0.15), 0 8px 24px rgba(15,23,42,0.08)"
          : "0 1px 3px rgba(15,23,42,0.04)",
        overflow: "hidden",
        willChange: hovered ? "transform" : "auto"
      }}
    >
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle 220px at ${mouse.x}% ${mouse.y}%, rgba(37,99,235,0.10), transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        borderRadius: 12
      }} />

      <span className="tag" style={{ alignSelf: "flex-start", marginBottom: 16, position: "relative" }}>{tag}</span>
      <h3 style={{ position: "relative", fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2.2vw, 20px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "12px 0 10px", color: "var(--ink-strong)" }}>{title}</h3>
      <p style={{ position: "relative", fontSize: "clamp(12px, 1.5vw, 14px)", color: "var(--ink-muted)", lineHeight: 1.7, marginBottom: 24, flexGrow: 1 }}>{desc}</p>
      <div style={{ position: "relative" }}>
        {href.startsWith("http") ? (
          <a href={href} className="btn-ghost" style={ctaStyle}>{ctaLabel} →</a>
        ) : (
          <Link href={href} className="btn-ghost" style={ctaStyle}>{ctaLabel} →</Link>
        )}
      </div>
    </div>
  );
}

/* Numbered pillar card — cursor-aware motion (scale + 3D tilt + spotlight) */
function PillarCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const tiltX = hovered ? (50 - mouse.y) * 0.08 : 0;
  const tiltY = hovered ? (mouse.x - 50) * 0.08 : 0;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      style={{
        padding: "clamp(24px, 3vw, 32px)",
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--border-accent)" : "var(--border)"}`,
        borderRadius: 12,
        position: "relative",
        height: "100%",
        cursor: "default",
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${hovered ? 1.04 : 1})`,
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.3s",
        boxShadow: hovered
          ? "0 30px 60px rgba(29,78,216,0.18), 0 8px 24px rgba(15,23,42,0.08)"
          : "0 1px 3px rgba(15,23,42,0.04)",
        overflow: "hidden",
        willChange: hovered ? "transform" : "auto"
      }}
    >
      {/* Cursor-following blue spotlight */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle 220px at ${mouse.x}% ${mouse.y}%, rgba(37,99,235,0.12), transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
        borderRadius: 12
      }} />

      <div style={{ position: "absolute", top: "clamp(16px, 2vw, 20px)", right: "clamp(16px, 2vw, 20px)", color: "var(--accent)", fontSize: 16, opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s, transform 0.3s", transform: hovered ? "translate(2px, -2px)" : "none" }}>↗</div>
      <div style={{ position: "relative", fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--accent)", marginBottom: 16, lineHeight: 1 }}>{n}</div>
      <h3 style={{ position: "relative", fontFamily: "var(--font-display)", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink-strong)", lineHeight: 1.25, marginBottom: 8 }}>{title}</h3>
      <p style={{ position: "relative", fontSize: "clamp(12px, 1.5vw, 13px)", color: "var(--ink-muted)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

export default function HomeClient() {
  const whyChooseRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const engagementRef = useRef<HTMLDivElement>(null);

  useIntersection(whyChooseRef as React.RefObject<HTMLElement>);
  useIntersection(impactRef as React.RefObject<HTMLElement>);
  useIntersection(deliveryRef as React.RefObject<HTMLElement>);
  useIntersection(securityRef as React.RefObject<HTMLElement>);
  useIntersection(engagementRef as React.RefObject<HTMLElement>);

  return (
    <div>
      {/* ── HERO (two-column with orb) ── */}
      <section style={{
        minHeight: "clamp(640px, 92vh, 920px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: "clamp(100px, 14vw, 160px)",
        paddingBottom: "clamp(60px, 8vw, 96px)"
      }}>
        {/* ambient backdrop */}
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "absolute", top: "5%", right: "-20%", width: "min(900px, 90vw)", height: "min(900px, 90vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 65%)", pointerEvents: "none", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: "min(600px, 60vw)", height: "min(600px, 60vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(16px, 5vw, 32px)",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
          gap: "clamp(40px, 5vw, 80px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
          {/* Left — copy */}
          <div>
            <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "var(--emerald-dim)", color: "var(--emerald)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 9999, marginBottom: "clamp(20px, 3vw, 28px)", fontFamily: "var(--font-display)", fontSize: "clamp(10px, 1.4vw, 12px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--emerald)", display: "inline-block", animation: "heroPulse 2s infinite" }} />
              Available for new clients
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.2vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              marginBottom: "clamp(20px, 3vw, 28px)",
              color: "var(--ink-strong)",
              textWrap: "balance"
            }}>
              Transform your ideas into <span className="gradient-text">digital success</span> with us!
            </h1>

            <p style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: "clamp(28px, 4vw, 36px)"
            }}>
              We&rsquo;re your partner in product design, website creation, and branding for every stage of your business.
            </p>

            <div style={{ display: "flex", gap: "clamp(12px, 2vw, 16px)", flexWrap: "wrap" }}>
              <Link href="/impact#contact" className="btn-primary" style={{ borderRadius: 9999, padding: "clamp(13px, 2vw, 16px) clamp(24px, 4vw, 32px)", fontSize: "clamp(11px, 1.5vw, 13px)" }}>Start a Project</Link>
              <Link href="/technology" className="btn-ghost" style={{ borderRadius: 9999, padding: "clamp(13px, 2vw, 16px) clamp(24px, 4vw, 32px)", fontSize: "clamp(11px, 1.5vw, 13px)" }}>View Our Work</Link>
            </div>
          </div>

          {/* Right — real 3D motion (Three.js) */}
          <div className="hero-visual" style={{
            position: "relative",
            width: "100%",
            maxWidth: 580,
            margin: "0 auto"
          }}>
            {/* Soft blue ambient halo behind the 3D scene */}
            <div style={{ position: "absolute", inset: "-15%", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
            <HeroOrb3D />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (light, matches hero) ── */}
      <section ref={whyChooseRef} style={{
        padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 32px)",
        background: "var(--bg-page)",
        position: "relative"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 56px)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-strong)" }}>
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.7vw, 15px)", color: "var(--ink-muted)", maxWidth: 580, margin: "16px auto 0", lineHeight: 1.7 }}>
              Six reasons enterprises across Africa trust Sybella to build the systems they run on.
            </p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 30%, 320px), 1fr))",
            gap: "clamp(12px, 2vw, 20px)"
          }}>
            {[
              { n: "01", title: "Engineer-Founded", desc: "Built and led by software engineers, not consultants. Every architectural decision is technically grounded." },
              { n: "02", title: "African Context First", desc: "Designed for variable connectivity, multi-currency payments, and regulations that differ country to country." },
              { n: "03", title: "Transparent Partnership", desc: "You own your code, your data, and have full visibility into every decision we make on your behalf." },
              { n: "04", title: "Long-Term Thinking", desc: "We measure success in decades. Systems we build today should still feel modern in 2040." },
              { n: "05", title: "End-to-End Ownership", desc: "From discovery to deployment to long-term maintenance — one team, one accountable partner across the entire lifecycle." },
              { n: "06", title: "24/7 Support", desc: "Production systems get production-grade support. Always-on monitoring, on-call response, and continuous improvement." },
            ].map(p => (
              <div key={p.n} className="fade-up">
                <PillarCard n={p.n} title={p.title} desc={p.desc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS (single featured) ── */}
      <section ref={impactRef} style={{ padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 32px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 56px)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-strong)" }}>
              <span className="gradient-text">Projects</span>
            </h2>
          </div>

          <div className="fade-up project-card-wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
            <div className="card project-card" style={{
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)"
            }}>
              {/* Image area — dark gradient backdrop so the white Ogera logo reads */}
              <div className="project-card-media" style={{
                position: "relative",
                background: "radial-gradient(ellipse at center, #2D1B4E 0%, #1A0A2E 75%, #0F0421 100%)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100%"
              }}>
                <div style={{ position: "absolute", inset: "10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />
                <Image
                  src="/image.png"
                  alt="Ogera — by Sybella Systems"
                  width={500}
                  height={250}
                  style={{ position: "relative", maxWidth: "75%", height: "auto", objectFit: "contain" }}
                  priority={false}
                />
              </div>

              {/* Body */}
              <div style={{ padding: "clamp(20px, 3.2vw, 32px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(10px, 1.6vw, 14px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="tag">Platform</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 2.4vw, 22px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink-strong)" }}>Ogera</h3>
                </div>
                <p style={{ fontSize: "clamp(13px, 1.5vw, 14px)", color: "var(--ink-muted)", lineHeight: 1.65 }}>
                  Find your dream Remote Jobs with the most trusted companies.
                </p>
                <div style={{ marginTop: "clamp(4px, 1vw, 8px)" }}>
                  <a
                    href="https://ogera.sybellasystems.co.rw/"
                    className="btn-primary"
                    style={{ borderRadius: 9999, padding: "clamp(10px, 1.5vw, 12px) clamp(18px, 3vw, 24px)", fontSize: "clamp(10px, 1.3vw, 12px)" }}
                  >
                    Visit Ogera ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY PROCESS (enterprise execution model) ── */}
      <section ref={deliveryRef} style={{ padding: "clamp(60px, 10vw, 100px) clamp(16px, 5vw, 32px)", background: "var(--bg-page)", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 48px)" }}>
            <div className="tag" style={{ marginBottom: 16 }}>Enterprise Delivery Model</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-strong)" }}>
              Governance-first delivery.<br />
              <span className="gradient-text">Execution your leadership can trust.</span>
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.7vw, 15px)", color: "var(--ink-muted)", maxWidth: 560, margin: "16px auto 0", lineHeight: 1.7 }}>
              Every engagement runs on clear ownership, measurable milestones, and executive-level reporting from kickoff to long-term optimization.
            </p>
          </div>
          <div className="fade-up" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(10px, 1.8vw, 16px)",
            marginBottom: "clamp(22px, 4vw, 32px)"
          }}>
            {[
              { value: "< 24h", label: "Executive Response Window" },
              { value: "Weekly", label: "Leadership Progress Reviews" },
              { value: "100%", label: "Defined Milestone Ownership" },
              { value: "End-to-End", label: "Architecture to Operations" },
            ].map(item => (
              <div key={item.label} style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "clamp(16px, 2.4vw, 22px)",
                background: "linear-gradient(180deg, rgba(37,99,235,0.03), rgba(37,99,235,0))"
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--accent)", lineHeight: 1.1 }}>{item.value}</div>
                <p style={{ marginTop: 8, fontSize: "clamp(11px, 1.4vw, 13px)", color: "var(--ink-muted)", lineHeight: 1.55 }}>{item.label}</p>
              </div>
            ))}
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(12px, 2vw, 20px)"
          }}>
            {[
              { tag: "Phase 01", title: "Strategic Discovery", desc: "We align business objectives, risk controls, and technical architecture into an approved roadmap with clear budget and timeline guardrails.", href: "/impact#contact" },
              { tag: "Phase 02", title: "Controlled Execution", desc: "Delivery runs in governed sprints with QA gates, stakeholder sign-offs, and transparent reporting to keep scope, quality, and velocity in balance.", href: "/technology" },
              { tag: "Phase 03", title: "Operational Scale", desc: "Post-launch, we provide monitoring, optimization, and support operations to ensure reliability as usage, teams, and complexity grow.", href: "/impact#contact" },
            ].map(c => (
              <div key={c.title} className="fade-up">
                <PartnerCard tag={c.tag} title={c.title} desc={c.desc} ctaLabel="Learn More" href={c.href} />
              </div>
            ))}
          </div>
          <div className="fade-up" style={{
            marginTop: "clamp(24px, 4vw, 36px)",
            display: "flex",
            justifyContent: "center",
            gap: "clamp(10px, 1.8vw, 14px)",
            flexWrap: "wrap"
          }}>
            <Link href="/impact#contact" className="btn-primary" style={{ borderRadius: 9999, padding: "clamp(12px, 1.8vw, 14px) clamp(22px, 3.4vw, 28px)", fontSize: "clamp(10px, 1.2vw, 12px)" }}>
              Schedule a Strategy Call
            </Link>
            <Link href="/technology" className="btn-ghost" style={{ borderRadius: 9999, padding: "clamp(12px, 1.8vw, 14px) clamp(22px, 3.4vw, 28px)", fontSize: "clamp(10px, 1.2vw, 12px)" }}>
              Review Delivery Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECURITY & GOVERNANCE ── */}
      <section ref={securityRef} style={{ padding: "clamp(40px, 7vw, 80px) clamp(16px, 5vw, 32px)", background: "var(--bg-soft)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 44px)" }}>
            <div className="tag" style={{ marginBottom: 14 }}>Risk Management</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: "var(--ink-strong)" }}>
              Security and governance<br />
              <span className="gradient-text">embedded from day one.</span>
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.7vw, 15px)", color: "var(--ink-muted)", maxWidth: 650, margin: "14px auto 0", lineHeight: 1.7 }}>
              We apply practical controls across architecture, delivery, and operations so leadership teams can move fast without compromising reliability.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(12px, 2vw, 20px)"
          }}>
            {[
              {
                tag: "Control",
                title: "Architecture Reviews",
                desc: "Critical design decisions are reviewed with scalability, failure tolerance, and maintainability criteria before implementation."
              },
              {
                tag: "Quality",
                title: "Release Readiness Gates",
                desc: "Each release passes structured validation for performance, test coverage, and deployment safety before production approval."
              },
              {
                tag: "Operations",
                title: "Incident Response Protocol",
                desc: "We define escalation paths, recovery procedures, and communication workflows to reduce downtime and protect business continuity."
              },
            ].map(item => (
              <div key={item.title} className="fade-up card" style={{ padding: "clamp(20px, 3vw, 28px)", borderRadius: 12 }}>
                <span className="tag" style={{ marginBottom: 14 }}>{item.tag}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(17px, 2vw, 21px)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink-strong)", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "var(--ink-muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT OPTIONS ── */}
      <section ref={engagementRef} style={{ padding: "clamp(40px, 7vw, 80px) clamp(16px, 5vw, 32px)", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: "clamp(32px, 5vw, 44px)" }}>
            <div className="tag" style={{ marginBottom: 14 }}>Engagement Models</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.12, color: "var(--ink-strong)" }}>
              Flexible partnerships for<br />
              <span className="gradient-text">every stage of growth.</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "clamp(12px, 2vw, 20px)"
          }}>
            {[
              {
                model: "Project Delivery",
                detail: "Best for organizations launching a defined product, platform, or internal system with clear scope and timeline."
              },
              {
                model: "Dedicated Product Team",
                detail: "Best for companies needing ongoing product development capacity with strong technical ownership and continuity."
              },
              {
                model: "Advisory + Execution",
                detail: "Best for leadership teams that want architectural guidance, governance support, and selective implementation."
              },
            ].map(item => (
              <div key={item.model} className="fade-up" style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "clamp(20px, 3vw, 28px)",
                background: "var(--surface)"
              }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(14px, 1.8vw, 16px)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, marginBottom: 12 }}>
                  {item.model}
                </p>
                <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "var(--ink-muted)", lineHeight: 1.7 }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="fade-up" style={{ marginTop: "clamp(24px, 4vw, 36px)", textAlign: "center" }}>
            <Link href="/impact#contact" className="btn-primary" style={{ borderRadius: 9999, padding: "clamp(12px, 1.8vw, 14px) clamp(24px, 3.8vw, 30px)", fontSize: "clamp(10px, 1.2vw, 12px)" }}>
              Discuss Your Engagement Model
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          will-change: opacity, transform;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-visual { max-width: 460px !important; }
        }
        @media (max-width: 768px) {
          .hero-visual { max-width: 360px !important; }
          .project-card { grid-template-columns: 1fr !important; }
          .project-card-media { aspect-ratio: 16 / 8; min-height: 0 !important; }
          .project-card-wrap { max-width: 480px !important; }
        }
      `}</style>
    </div>
  );
}
