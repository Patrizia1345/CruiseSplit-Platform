"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Trip {
  id: number;
  captain: string;
  avatar: string;
  from: string;
  to: string;
  date: string;
  duration: string;
  price: number;
  spots: number;
  spotsLeft: number;
  boat: string;
  tags: string[];
  image: string;
  rating: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const FEATURED_TRIPS: Trip[] = [
  {
    id: 1,
    captain: "Markus R.",
    avatar: "M",
    from: "Palma de Mallorca",
    to: "Ibiza",
    date: "14. Jun",
    duration: "3 Tage",
    price: 180,
    spots: 4,
    spotsLeft: 2,
    boat: "Bavaria 44",
    tags: ["Anfänger willkommen", "Schnorcheln", "Sundowner"],
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&q=80",
    rating: 4.9,
  },
  {
    id: 2,
    captain: "Sophie K.",
    avatar: "S",
    from: "Kroatien, Split",
    to: "Dubrovnik",
    date: "22. Jun",
    duration: "5 Tage",
    price: 290,
    spots: 6,
    spotsLeft: 3,
    boat: "Jeanneau Sun Odyssey",
    tags: ["Erfahrene Crew", "Inselhüpfen", "Kochen an Bord"],
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
    rating: 5.0,
  },
  {
    id: 3,
    captain: "Thomas W.",
    avatar: "T",
    from: "Hamburg",
    to: "Kopenhagen",
    date: "1. Jul",
    duration: "7 Tage",
    price: 320,
    spots: 5,
    spotsLeft: 1,
    boat: "Hallberg-Rassy 40",
    tags: ["Ostsee", "Hafenstädte", "Segelerfahrung nötig"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
    rating: 4.8,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "⛵",
    title: "Törn finden",
    text: "Stöbere durch hunderte Törns – von der Adria bis zur Nordsee. Filtere nach Route, Datum und Preis.",
  },
  {
    step: "02",
    icon: "✍️",
    title: "Bewerben",
    text: "Schreib dem Skipper wer du bist und warum du dabei sein willst. Persönlich, direkt, unkompliziert.",
  },
  {
    step: "03",
    icon: "💬",
    title: "Planen",
    text: "Der Skipper sagt zu – dann geht's in den Chat. Gemeinsam plant ihr den perfekten Törn.",
  },
  {
    step: "04",
    icon: "🌊",
    title: "Ablegen",
    text: "Leinen los. Du bist an Bord. Fremde werden zu Freunden, das Meer wird zur Heimat.",
  },
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
        const duration = 1500;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Trip Card ─────────────────────────────────────────────────────────────────

function TripCard({ trip }: { trip: Trip }) {
  return (
    <div
      className="group relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0"
      style={{
        width: "320px",
        background: "#0A1628",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={trip.image}
          alt={`${trip.from} nach ${trip.to}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,22,40,0.95) 100%)" }} />
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{
            background: trip.spotsLeft <= 1 ? "rgba(239,68,68,0.9)" : "rgba(16,185,129,0.9)",
            color: "white",
            backdropFilter: "blur(8px)",
          }}
        >
          {trip.spotsLeft === 1 ? "Letzter Platz!" : `${trip.spotsLeft} Plätze frei`}
        </div>
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "rgba(0,0,0,0.5)", color: "white", backdropFilter: "blur(8px)" }}
        >
          {trip.date} · {trip.duration}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-white">{trip.from}</span>
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
            <path d="M0 4h14M11 1l3 3-3 3" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-semibold text-white">{trip.to}</span>
        </div>

        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #0066FF, #7C3AFF)" }}
          >
            {trip.avatar}
          </div>
          <div>
            <p className="text-xs text-gray-400">Skipper</p>
            <p className="text-sm font-medium text-white">{trip.captain}</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold text-white">{trip.rating}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-3">⛵ {trip.boat}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {trip.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "rgba(14,165,233,0.12)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-white">€{trip.price}</span>
            <span className="text-xs text-gray-500"> / Person</span>
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}
          >
            Bewerben →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#060D1A", color: "white", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300"
        style={{
          background: scrollY > 50 ? "rgba(6,13,26,0.95)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <span className="text-xl font-black tracking-tight" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
          Cruise<span style={{ color: "#0EA5E9" }}>Split</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Törns entdecken", href: "/sailing/trips" },
            { label: "Boot eintragen", href: "/sailing/onboarding/owner" },
            { label: "Über uns", href: "/ueber-uns" },
          ].map(item => (
            <Link key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.6)" }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-medium px-4 py-2 rounded-xl transition-colors" style={{ color: "rgba(255,255,255,0.7)" }}>
            Login
          </Link>
          <Link
            href="/sailing/onboarding/owner"
            className="text-sm font-bold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}
          >
            Törn anbieten
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80"
            alt="Segeln"
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,13,26,0.3) 0%, rgba(6,13,26,0.5) 50%, rgba(6,13,26,1) 100%)" }} />
          <div className="absolute" style={{ top: "20%", left: "10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
          <div className="absolute" style={{ bottom: "20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", animation: "float 6s ease-in-out infinite reverse" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)", color: "#0EA5E9" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Für alle die das Meer lieben
          </div>

          <h1 className="mb-6 leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(48px, 9vw, 120px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span className="block text-white">Dein Platz</span>
            <span
              className="block"
              style={{
                fontStyle: "italic",
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #0EA5E9 0%, #60A5FA 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              auf dem Wasser.
            </span>
          </h1>

          <p className="mb-10 max-w-xl mx-auto" style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            Finde Mitsegler für deinen Törn oder bewirb dich auf einen Platz an Bord.
            Gemeinsam segeln – von der Adria bis zur Nordsee.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/sailing/trips"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0066FF 0%, #0044CC 100%)", boxShadow: "0 8px 30px rgba(0,102,255,0.35)" }}
            >
              Törns entdecken
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/sailing/onboarding/owner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-white/10"
              style={{ color: "white", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
            >
              ⛵ Törn anbieten
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {["✓ Kostenlos registrieren", "✓ Verifizierte Skipper", "✓ Sicher & versichert"].map(t => (
              <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 847, suffix: "+", label: "Aktive Törns" },
            { target: 3200, suffix: "+", label: "Mitsegler" },
            { target: 12, suffix: " Länder", label: "Destinationen" },
            { target: 98, suffix: "%", label: "Zufriedene Crews" },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-black mb-1" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", background: "linear-gradient(135deg, #0EA5E9, #60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED TRIPS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0EA5E9" }}>Aktuelle Törns</p>
              <h2 className="leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Dein nächstes<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>Abenteuer wartet.</span>
              </h2>
            </div>
            <Link href="/sailing/trips" className="text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}>
              Alle Törns →
            </Link>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto pb-4 md:overflow-visible md:pb-0" style={{ scrollbarWidth: "none" }}>
            {FEATURED_TRIPS.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0EA5E9" }}>So funktioniert's</p>
            <h2 className="leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              In 4 Schritten<br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>zum Törn.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px z-0" style={{ background: "linear-gradient(to right, rgba(14,165,233,0.4), transparent)" }} />
                )}
                <div className="relative rounded-2xl p-6 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-xs font-black mb-4 font-mono" style={{ color: "rgba(14,165,233,0.5)", letterSpacing: "0.1em" }}>{item.step}</div>
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-base mb-2 text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR SKIPPERS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16" style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.15) 0%, rgba(14,165,233,0.1) 100%)", border: "1px solid rgba(14,165,233,0.2)" }}>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#0EA5E9" }}>Für Skipper</p>
                <h2 className="mb-4 leading-none" style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  Teile dein Boot.<br />
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Teile die Kosten.</span>
                </h2>
                <p className="mb-8 text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Trage deinen Törn ein, finde gleichgesinnte Mitsegler und teile die Kosten für Kraftstoff, Marina und Verpflegung. Segeln macht zu zweit mehr Spaß – und zu sechst erst recht.
                </p>
                <Link
                  href="/sailing/onboarding/owner"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 8px 25px rgba(0,102,255,0.3)" }}
                >
                  Jetzt Törn eintragen →
                </Link>
              </div>
              <div className="flex flex-col gap-4 lg:w-64 shrink-0">
                {[
                  { icon: "💰", title: "Kosten teilen", text: "Kraftstoff, Marina, Proviant – fair aufgeteilt" },
                  { icon: "👥", title: "Crew finden", text: "Gleichgesinnte Mitsegler aus deiner Region" },
                  { icon: "⭐", title: "Bewertungen", text: "Aufbau deines Skipper-Profils" },
                ].map(f => (
                  <div key={f.title} className="flex gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="text-xl">{f.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{f.title}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section className="py-16 px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "rgba(255,255,255,0.02)", border: "2px dashed rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                🚢
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 inline-block" style={{ background: "rgba(14,165,233,0.15)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}>
                  Coming Soon
                </span>
                <h3 className="font-bold text-base text-white">Kreuzfahrten buchen – demnächst auf CruiseSplit</h3>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Komplette Routen & einzelne Segmente auf Luxus-Reedereien – direkt buchbar.
                </p>
              </div>
            </div>
            <a
              href="mailto:patrizia@cruisesplit.com?subject=Warteliste Kreuzfahrten"
              className="px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90"
              style={{ background: "rgba(14,165,233,0.15)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.2)" }}
            >
              Warteliste beitreten →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-black" style={{ fontFamily: "'Syne', system-ui, sans-serif" }}>
              Cruise<span style={{ color: "#0EA5E9" }}>Split</span>
            </span>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 CS CruiseSplit UG · Köln</p>
          </div>
          <div className="flex gap-8 flex-wrap justify-center">
            {[
              { label: "Törns", href: "/sailing/trips" },
              { label: "Über uns", href: "/ueber-uns" },
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "AGB", href: "/agb" },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
