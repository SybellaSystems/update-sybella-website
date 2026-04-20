"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

/* Abstract SVG visuals */
function HeroOrb() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "clamp(300px, 90vw, 520px)", margin: "0 auto" }}>
      <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", filter: "drop-shadow(0 0 60px rgba(201,168,76,0.15))" }}>
        <defs>
          <radialGradient id="orb-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-g2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dba85" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2dba85" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="240" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 8" />
        <circle cx="260" cy="260" r="190" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.15" />
        <circle cx="260" cy="260" r="140" stroke="#2dba85" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 6" />

        <circle cx="260" cy="260" r="90" fill="url(#orb-g)" />
        <circle cx="260" cy="260" r="60" fill="url(#orb-g2)" />

        <circle cx="260" cy="260" r="44" fill="#16161f" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.6" />

        <path d="M247 278C247 274.4 249.6 272 254 271.4L264 270C267 269.6 269 267.9 269 265.4C269 262.7 266.8 260.6 264 260.6H252" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
        <path d="M273 242C273 245.6 270.4 248 266 248.6L256 250C253 250.4 251 252.1 251 254.6C251 257.3 253.2 259.4 256 259.4H268" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* Stat card */
function Stat({ n, label, suffix = "" }: { n: string; label: string; suffix?: string }) {
  return (
    <div style={{ padding: "clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px)", borderLeft: "1px solid var(--border)" }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, color: "var(--blue-bright)" }}>
        {n}{suffix}
      </div>
      <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: 8 }}>{label}</div>
    </div>
  );
}

/* Service card */
function ServiceCard({ icon, title, desc, accent }: { icon: string; title: string; desc: string; accent: string }) {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <div style={{ width: 44, height: 44, borderRadius: 3, background: accent + "15", marginBottom: 20 }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p style={{ color: "var(--text-secondary)" }}>{desc}</p>
    </div>
  );
}

export default function HomeClient() {
  const recentWorkRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [currentFace, setCurrentFace] = useState(0);

  const projects = [
    { icon: "GA", title: "Graben Academy", subtitle: "EdTech", desc: "LMS Platform", image: null },
    { icon: "◎", title: "Ogera", subtitle: "Jobs Platform", desc: "Student jobs OS", image: null },
    { icon: "⬡", title: "SyCore ERP", subtitle: "ERP", desc: "Enterprise system", image: null },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentFace + 1) % projects.length;
      setCurrentFace(next);
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateY(-${next * 90}deg)`;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentFace]);

  return (
    <div>

      {/* ── RECENT WORK (FIXED) ── */}
      <section ref={recentWorkRef} style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2>Recent Work</h2>

          {/* CUBE WRAPPER (FIXED MISSING STRUCTURE) */}
          <div
            style={{
              perspective: "1200px",
              width: "100%",
              height: "400px",
              marginTop: "40px"
            }}
          >
            <div
              ref={cubeRef}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transition: "transform 1s ease"
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "#111",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: `rotateY(${index * 90}deg) translateZ(200px)`
                  }}
                >
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <p>{project.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ marginTop: 20, color: "#888" }}>
            Auto-rotating every 5 seconds
          </p>
        </div>
      </section>

    </div>
  );
}