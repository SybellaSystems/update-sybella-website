"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ---------------- Intersection Observer Hook ---------------- */

function useIntersection(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current.querySelectorAll<HTMLElement>(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}

/* ---------------- Page Component ---------------- */

export default function ImpactPage() {
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);

  useIntersection(s1);
  useIntersection(s2);
  useIntersection(s3);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "16px 20px",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 3,
    color: "var(--text-primary)",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    width: "100%",
    transition: "border-color 0.2s",
    outline: "none",
  };

  return (
    <div style={{ paddingTop: 72 }}>
      {/* HERO */}
      <section style={{ padding: "100px 32px 80px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/globe.svg')", backgroundRepeat: "repeat", backgroundSize: "140px 140px", opacity: 0.15 }} />
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div className="tag tag-emerald">Impact & Story</div>

          <h1 style={{ fontSize: "clamp(44px, 6vw, 84px)", fontWeight: 800 }}>
            Africa Has the Talent.
            <br />
            <span style={{ color: "var(--emerald)" }}>We Build</span>{" "}
            <span style={{ color: "var(--blue-bright)" }}>the Systems.</span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: 520 }}>
            Sybella Systems builds ERP systems and SaaS platforms for Africa’s
            fastest-growing enterprises.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section ref={s1} style={{ padding: "100px 32px", background: "var(--charcoal)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up tag">Our Story</div>

          <h2 className="fade-up">Founded in Rwanda. Built for Africa.</h2>

          <p className="fade-up">
            Sybella Systems was incorporated in 2025 to build world-class African software.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={s2} style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {sent ? (
            <div>Message sent successfully.</div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <input name="name" placeholder="Name" value={form.name} onChange={handle} style={inputStyle} />
              <input name="email" placeholder="Email" value={form.email} onChange={handle} style={inputStyle} />
              <input name="company" placeholder="Company" value={form.company} onChange={handle} style={inputStyle} />
              <textarea name="message" placeholder="Message" value={form.message} onChange={handle} style={inputStyle} rows={5} />

              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}