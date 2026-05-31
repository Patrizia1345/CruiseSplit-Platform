"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Mock Data ─────────────────────────────────────────────────────────────────

const FEATURED_CREW = [
  { id: 1, name: "Jana M.", age: 27, from: "Hamburg", avatar: "J", experience: "2 Jahre", looking: "Mittelmeer, Karibik", tags: ["Anfängerin", "Kochen", "Fotografie"], rating: 4.9 },
  { id: 2, name: "Leon K.", age: 31, from: "München", avatar: "L", experience: "5 Jahre", looking: "Atlantik, Nordsee", tags: ["SKS", "Navigation", "Wache"], rating: 5.0 },
  { id: 3, name: "Mia S.", age: 24, from: "Berlin", avatar: "M", experience: "1 Jahr", looking: "Kroatien, Griechenland", tags: ["Yoga", "Freediving", "Social Media"], rating: 4.8 },
];

const FEATURED_BOATS = [
  { id: 1, captain: "Markus R.", avatar: "M", from: "Palma", to: "Ibiza", date: "14. Jun", duration: "3 Tage", price: 180, spotsLeft: 2, boat: "Bavaria 44", rating: 4.9, image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&q=80" },
  { id: 2, captain: "Sophie K.", avatar: "S", from: "Split", to: "Dubrovnik", date: "22. Jun", duration: "5 Tage", price: 290, spotsLeft: 3, boat: "Jeanneau 45", rating: 5.0, image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80" },
  { id: 3, captain: "Thomas W.", avatar: "T", from: "Hamburg", to: "Kopenhagen", date: "1. Jul", duration: "7 Tage", price: 320, spotsLeft: 1, boat: "Hallberg-Rassy 40", rating: 4.8, image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80" },
];

const NAV_LINKS = [
  { label: "Crew finden", href: "/crew/search" },
  { label: "Boote finden", href: "/boat/search" },
  { label: "Routen & Saisons", href: "/routes" },
  { label: "Freunde einladen", href: "/invite" },
];

const FOOTER_COMPANY = [
  { label: "Kontakt", href: "/contact" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Preise", href: "/pricing" },
  { label: "Support", href: "/support" },
  { label: "Feedback", href: "/feedback" },
];

const FOOTER_LEGAL = [
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Impressum", href: "/impressum" },
  { label: "Cookies", href: "/cookies" },
];

// ── Animated Counter ──────────────────────────────────────────────────────────

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1500, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({ scrollY }: { scrollY: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrollY > 40 ? "rgba(6,13,26,0.97)" : "rgba(6,13,26,0.5)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-black tracking-tight flex-shrink-0" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
          Cruise<span style={{ color: "#0EA5E9" }}>Split</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/08 hover:text-white" style={{ color: "rgba(255,255,255,0.65)" }}>
              {l.label}
            </Link>
          ))}

          {/* Company dropdown */}
          <div className="relative">
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.65)" }}
              onClick={() => setCompanyOpen(!companyOpen)}
            >
              Unternehmen
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: companyOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {companyOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCompanyOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl overflow-hidden z-50" style={{ background: "#0D1F36", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {FOOTER_COMPANY.map(l => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2.5 text-sm transition-colors hover:bg-white/05" style={{ color: "rgba(255,255,255,0.7)" }}
                      onClick={() => setCompanyOpen(false)}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Auth buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/auth/login" className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-white/08" style={{ color: "rgba(255,255,255,0.8)" }}>
            Einloggen
          </Link>
          <Link href="/auth/register" className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 4px 15px rgba(0,102,255,0.3)" }}>
            Registrieren
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 rounded-xl" style={{ color: "rgba(255,255,255,0.8)" }} onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen
              ? <><path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
              : <><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[...NAV_LINKS, ...FOOTER_COMPANY].map(l => (
            <Link key={l.href} href={l.href} className="py-2.5 text-sm font-medium transition-colors" style={{ color: "rgba(255,255,255,0.7)" }} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-3">
            <Link href="/auth/login" className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "white" }}>
              Einloggen
            </Link>
            <Link href="/auth/register" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center text-white" style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>
              Registrieren
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Search Bar ────────────────────────────────────────────────────────────────

function SearchBar() {
  const [tab, setTab] = useState<"crew" | "boat">("boat");
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 justify-center">
        {[
          { key: "boat", label: "⛵ Boot finden", desc: "Finde deinen nächsten Törn" },
          { key: "crew", label: "👥 Crew finden", desc: "Finde Mitsegler für dein Boot" },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as "crew" | "boat")}
            className="px-6 py-3 rounded-2xl text-sm font-bold transition-all"
            style={{
              background: tab === t.key ? "white" : "rgba(255,255,255,0.08)",
              color: tab === t.key ? "#060D1A" : "rgba(255,255,255,0.6)",
              border: tab === t.key ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search fields */}
      <div
        className="rounded-2xl p-2 flex flex-col sm:flex-row gap-2"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#F8FAFC" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5" stroke="#94A3B8" strokeWidth="1.5" />
            <path d="M16 16l-3.5-3.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder={tab === "boat" ? "Wohin willst du segeln?" : "Welche Crew suchst du?"}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm font-medium outline-none bg-transparent"
            style={{ color: "#0A1628" }}
          />
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl sm:w-48" style={{ background: "#F8FAFC" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2C6.24 2 4 4.24 4 7c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z" stroke="#94A3B8" strokeWidth="1.5" />
          </svg>
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="flex-1 text-sm font-medium outline-none bg-transparent"
            style={{ color: "#0A1628" }}
          />
        </div>
        <Link
          href={tab === "boat" ? "/boat/search" : "/crew/search"}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white text-center transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 4px 15px rgba(0,102,255,0.35)", flexShrink: 0 }}
        >
          Suchen →
        </Link>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Beliebt:</span>
        {["Kroatien", "Mittelmeer", "Nordsee", "Karibik", "Atlantik"].map(d => (
          <button key={d} className="text-xs px-3 py-1 rounded-full transition-all hover:bg-white/15"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Crew Card ─────────────────────────────────────────────────────────────────

function CrewCard({ person }: { person: typeof FEATURED_CREW[0] }) {
  return (
    <div className="rounded-2xl p-5 transition-all hover:-translate-y-1 cursor-pointer"
      style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s ease" }}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066FF, #7C3AFF)" }}>
          {person.avatar}
        </div>
        <div>
          <h3 className="font-bold text-white text-base">{person.name}</h3>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{person.from} · {person.age} Jahre</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold text-white">{person.rating}</span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Erfahrung</p>
        <p className="text-sm text-white">{person.experience}</p>
      </div>
      <div className="mb-4">
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>Sucht Törns in</p>
        <p className="text-sm" style={{ color: "#0EA5E9" }}>{person.looking}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {person.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
            {tag}
          </span>
        ))}
      </div>
      <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>
        Profil ansehen →
      </button>
    </div>
  );
}

// ── Boat Card ─────────────────────────────────────────────────────────────────

function BoatCard({ trip }: { trip: typeof FEATURED_BOATS[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1"
      style={{ background: "#0A1628", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s ease" }}>
      <div className="relative h-40 overflow-hidden">
        <img src={trip.image} alt={`${trip.from} → ${trip.to}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(10,22,40,0.95) 100%)" }} />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: trip.spotsLeft <= 1 ? "rgba(239,68,68,0.9)" : "rgba(16,185,129,0.9)", color: "white" }}>
          {trip.spotsLeft <= 1 ? "Letzter Platz!" : `${trip.spotsLeft} Plätze frei`}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-bold text-white">{trip.from}</span>
          <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
            <path d="M0 3.5h12M9 1l3 2.5L9 6" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-bold text-white">{trip.to}</span>
        </div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0066FF, #7C3AFF)" }}>
            {trip.avatar}
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Skipper · {trip.boat}</p>
            <p className="text-sm font-medium text-white">{trip.captain}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold text-white">{trip.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-white">€{trip.price}</span>
            <span className="text-xs text-gray-500"> / Person</span>
          </div>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{trip.date} · {trip.duration}</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#060D1A", color: "white", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Navbar scrollY={scrollY} />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80" alt="Segeln" className="w-full h-full object-cover" style={{ opacity: 0.3 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,13,26,0.4) 0%, rgba(6,13,26,0.6) 40%, rgba(6,13,26,1) 100%)" }} />
          <div className="absolute" style={{ top: "15%", left: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
          <div className="absolute" style={{ bottom: "20%", right: "5%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)", animation: "float 6s ease-in-out infinite reverse" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", color: "#0EA5E9" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Dein Platz auf dem Boot weltweit
          </div>

          {/* Headline */}
          <h1 className="mb-6 leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(44px, 8vw, 110px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span className="block text-white">Dein Platz auf</span>
            <span className="block" style={{ fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", background: "linear-gradient(135deg, #0EA5E9 0%, #60A5FA 50%, #A78BFA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              dem Boot weltweit.
            </span>
          </h1>

          <p className="mb-12 max-w-xl mx-auto" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            Finde Crewmitglieder für deinen Törn oder bewirb dich auf einen Platz an Bord. Gemeinsam die Welt erkunden.
          </p>

          {/* Search */}
          <SearchBar />

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {["✓ Kostenlos registrieren", "✓ Verifizierte Profile", "✓ Weltweit 200+ Länder"].map(t => (
              <span key={t} className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 12400, suffix: "+", label: "Aktive Mitglieder" },
            { target: 3800, suffix: "+", label: "Törns weltweit" },
            { target: 200, suffix: "+", label: "Länder" },
            { target: 98, suffix: "%", label: "Zufriedenheit" },
          ].map(s => (
            <div key={s.label}>
              <div className="font-black mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(30px, 4vw, 44px)", background: "linear-gradient(135deg, #0EA5E9, #60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0EA5E9" }}>So funktioniert's</p>
            <h2 className="leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              In 4 Schritten<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>auf See.</span>
            </h2>
          </div>

          {/* Two flows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Für Mitsegler */}
            <div className="rounded-3xl p-8" style={{ background: "rgba(0,102,255,0.06)", border: "1px solid rgba(0,102,255,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#0EA5E9" }}>👥 Als Mitsegler</p>
              <div className="flex flex-col gap-5">
                {[
                  { n: "1", t: "Profil erstellen", d: "Erzähl uns wer du bist, was du kannst und wohin du willst." },
                  { n: "2", t: "Törn finden", d: "Stöbere durch hunderte Angebote und filter nach Route & Datum." },
                  { n: "3", t: "Bewerben", d: "Schreib dem Skipper direkt – persönlich und unkompliziert." },
                  { n: "4", t: "Ablegen", d: "Zusage erhalten, einpacken und Leinen los!" },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(0,102,255,0.3)", color: "#60A5FA", border: "1px solid rgba(0,102,255,0.4)" }}>
                      {s.n}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{s.t}</p>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/auth/register" className="mt-8 block w-full py-3 rounded-xl text-sm font-bold text-white text-center transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>
                Als Mitsegler registrieren →
              </Link>
            </div>

            {/* Für Skipper */}
            <div className="rounded-3xl p-8" style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#0EA5E9" }}>⛵ Als Skipper</p>
              <div className="flex flex-col gap-5">
                {[
                  { n: "1", t: "Boot eintragen", d: "Füge dein Boot hinzu – Fotos, Details, Bootsdaten." },
                  { n: "2", t: "Törn ausschreiben", d: "Route, Datum, Plätze, Kosten – in wenigen Minuten live." },
                  { n: "3", t: "Crew auswählen", d: "Bewerbungen prüfen, mit Kandidaten chatten, Crew auswählen." },
                  { n: "4", t: "Kosten teilen", d: "Gemeinsam segeln, Kosten fair teilen, neue Freunde finden." },
                ].map(s => (
                  <div key={s.n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(14,165,233,0.2)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)" }}>
                      {s.n}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm mb-0.5">{s.t}</p>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/sailing/onboarding/owner" className="mt-8 block w-full py-3 rounded-xl text-sm font-bold text-center transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(14,165,233,0.4)", color: "#0EA5E9" }}>
                Törn eintragen →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIND A BOAT ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0EA5E9" }}>Boot finden</p>
              <h2 className="leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Aktuelle Törns<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>weltweit.</span>
              </h2>
            </div>
            <Link href="/boat/search" className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Alle Boote →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_BOATS.map(trip => <BoatCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      </section>

      {/* ── FIND CREW ── */}
      <section className="py-24 px-6" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0EA5E9" }}>Crew finden</p>
              <h2 className="leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Mitsegler die auf<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>dich warten.</span>
              </h2>
            </div>
            <Link href="/crew/search" className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Alle Crew →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_CREW.map(p => <CrewCard key={p.id} person={p} />)}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20"
            style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.2) 0%, rgba(124,58,255,0.15) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <h2 className="mb-4 leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(28px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Bereit zum Ablegen?
              </h2>
              <p className="mb-8 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Registriere dich kostenlos und werde Teil der weltweit modernsten Segler-Community. Dein nächstes Abenteuer wartet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="px-8 py-4 rounded-2xl font-bold text-sm text-white transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 8px 30px rgba(0,102,255,0.4)" }}>
                  Kostenlos registrieren →
                </Link>
                <Link href="/boat/search" className="px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}>
                  Törns entdecken
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span className="text-2xl font-black mb-3 block" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
                Cruise<span style={{ color: "#0EA5E9" }}>Split</span>
              </span>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Das weltweit modernste Netzwerk für Segler und Bootseigner. Finde deine Crew oder deinen nächsten Törn.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Navigation</p>
              <div className="flex flex-col gap-2.5">
                {NAV_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Unternehmen</p>
              <div className="flex flex-col gap-2.5">
                {FOOTER_COMPANY.map(l => (
                  <Link key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Rechtliches</p>
              <div className="flex flex-col gap-2.5">
                {FOOTER_LEGAL.map(l => (
                  <Link key={l.href} href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 CS CruiseSplit UG (haftungsbeschränkt) · Köln, Deutschland</p>
            <div className="flex items-center gap-4">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>🌍 Deutsch</span>
              <Link href="/en" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)" }}>English</Link>
              <Link href="/fr" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)" }}>Français</Link>
              <Link href="/nl" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)" }}>Nederlands</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
      `}</style>
    </div>
  );
}
