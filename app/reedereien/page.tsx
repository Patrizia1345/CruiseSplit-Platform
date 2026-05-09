"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Feature {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface Airline {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  heroImage: string;
  logoLetter: string;
  founded: string;
  ships: string;
  routes: string;
  priceFrom: string;
  features: Feature[];
  segmentsHref: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const AIRLINES: Airline[] = [
  {
    id: "viking",
    name: "Viking River Cruises",
    tagline: "Awarded World's #1 River Cruise Line",
    description:
      "Viking verbindet Europas schönste Städte auf dem Wasserweg. Mit eleganten Longships, kultureller Tiefe und skandinavischem Design redefiniert Viking die Flusskreuzfahrt.",
    color: "#8B1A1A",
    accentColor: "#C53030",
    heroImage: "/rhine-cruise.jpg",
    logoLetter: "V",
    founded: "1997",
    ships: "80+",
    routes: "Rhein, Donau, Elbe",
    priceFrom: "379",
    features: [
      {
        number: "01",
        title: "Veranda-Kabinen",
        description:
          "205 qm Luxus mit privatem Balkon, beheiztem Boden und Panoramablick auf den Rhein. Jede Kabine ein Rückzugsort.",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      },
      {
        number: "02",
        title: "Aquavit Terrace",
        description:
          "Das einzigartige Freiluft-Restaurant am Bug des Schiffes – Mahlzeiten mit Panoramablick, frische Luft und das Rauschen des Rheins.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
      },
      {
        number: "03",
        title: "Panorama-Lounge",
        description:
          "Raumhohe Fenster, skandinavisches Design und die beste Aussicht auf dem Fluss. Ideal zum Arbeiten, Entspannen oder Genießen.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      },
      {
        number: "04",
        title: "Kulturelle Ausflüge",
        description:
          "Geführte Stadttouren inklusive in jedem Hafen – Kölner Dom, Marksburg, Straßburger Münster. Kultur als Teil der Reise.",
        image: "/koblenz.jpg",
      },
      {
        number: "05",
        title: "Rhine Getaway",
        description:
          "Die klassische Route: Amsterdam → Basel durch 4 Länder, 8 UNESCO-Highlights, 16 Tage – oder einzelne Segmente ab 1 Tag.",
        image: "/ko_ln.jpg",
      },
    ],
    segmentsHref: "/viking",
  },
  // Weitere Reedereien können hier ergänzt werden:
  // { id: "aida", name: "AIDA Cruises", ... },
  // { id: "msc", name: "MSC Cruises", ... },
];

// ── Cinematic Hero ─────────────────────────────────────────────────────────────

function CinematicHero({ airline }: { airline: Airline }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 + scrollY * 0.0008;
  const opacity = Math.max(0, 1 - scrollY * 0.003);
  const translateY = scrollY * 0.4;

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Image with parallax zoom */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(${scale}) translateY(${translateY * 0.3}px)`,
          transformOrigin: "center center",
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src={airline.heroImage}
          alt={airline.name}
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
          }}
        />
        {/* Color tint overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: airline.color }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end px-12 pb-16"
        style={{ opacity }}
      >
        {/* Partner Badge */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: airline.color }}
          >
            {airline.logoLetter}
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest">CruiseSplit Partner</p>
            <p className="text-white font-semibold text-sm">{airline.name}</p>
          </div>
        </div>

        <h1
          className="text-6xl sm:text-7xl font-bold text-white leading-none mb-4"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          {airline.name.split(" ")[0]}
          <br />
          <span style={{ color: airline.accentColor }}>
            {airline.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-8">{airline.tagline}</p>

        {/* Stats Row */}
        <div className="flex gap-8 mb-8 flex-wrap">
          {[
            { label: "Gegründet", value: airline.founded },
            { label: "Schiffe", value: airline.ships },
            { label: "Routen", value: airline.routes },
            { label: "Ab", value: `€${airline.priceFrom}/Segment` },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</span>
              <span className="text-white font-semibold text-sm mt-0.5">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex items-center gap-3 text-white/40">
          <div className="flex flex-col gap-1">
            <div className="w-px h-6 bg-white/20 mx-auto animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 mx-auto" />
          </div>
          <span className="text-xs uppercase tracking-widest">Scrollen für Details</span>
        </div>
      </div>
    </div>
  );
}

// ── Feature Cards ──────────────────────────────────────────────────────────────

function FeatureSection({ airline }: { airline: Airline }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#0A0A0A" }} className="py-24 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-6">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: airline.accentColor }}
            >
              Ausstattung & Highlights
            </p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
              Was macht Viking
              <br />
              <span className="text-white/40">besonders?</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            {airline.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Feature List */}
          <div className="flex flex-col gap-3">
            {airline.features.map((feature, i) => (
              <button
                key={feature.number}
                onClick={() => setActiveFeature(i)}
                className="text-left group"
              >
                <div
                  className="rounded-2xl p-5 transition-all duration-300 border"
                  style={{
                    backgroundColor:
                      activeFeature === i ? `${airline.color}22` : "rgba(255,255,255,0.03)",
                    borderColor:
                      activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-xs font-mono font-bold shrink-0 mt-0.5"
                      style={{
                        color: activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.2)",
                      }}
                    >
                      {feature.number}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-semibold mb-1 transition-colors"
                        style={{
                          color: activeFeature === i ? "white" : "rgba(255,255,255,0.5)",
                          fontSize: "15px",
                        }}
                      >
                        {feature.title}
                      </h3>
                      {activeFeature === i && (
                        <p className="text-white/50 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-lg shrink-0 transition-transform"
                      style={{
                        color: airline.accentColor,
                        transform: activeFeature === i ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Active Feature Image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "400px" }}>
            {airline.features.map((feature, i) => (
              <div
                key={feature.number}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: activeFeature === i ? 1 : 0 }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: airline.accentColor }}
                  >
                    {feature.number} — {feature.title}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Feature dots */}
            <div className="absolute top-4 right-4 flex gap-2">
              {airline.features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor:
                      activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.3)",
                    transform: activeFeature === i ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CTA Section ────────────────────────────────────────────────────────────────

function CTASection({ airline }: { airline: Airline }) {
  return (
    <div
      className="py-20 px-8 relative overflow-hidden"
      style={{ backgroundColor: airline.color }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-8">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-3">
              Jetzt buchen
            </p>
            <h2
              className="text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Dein Rhein-Segment
              <br />
              wartet auf dich.
            </h2>
            <p className="text-white/70 max-w-md">
              8 Segmente auf der Rhine Getaway Route – einzeln buchbar ab 1 Tag.
              75% Revenue Share für Viking, volle Flexibilität für dich.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href={airline.segmentsHref}
              className="px-8 py-4 rounded-2xl bg-white font-bold text-sm transition-all hover:scale-105 shadow-xl"
              style={{ color: airline.color }}
            >
              Segmente entdecken →
            </Link>
            <Link
              href="/routen"
              className="px-8 py-4 rounded-2xl border border-white/30 text-white font-semibold text-sm text-center hover:bg-white/10 transition-all"
            >
              Alle Routen ansehen
            </Link>
          </div>
        </div>

        {/* Mini stats */}
        <div
          className="mt-12 pt-8 flex gap-8 flex-wrap"
          style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
        >
          {[
            { value: "8", label: "Buchbare Segmente" },
            { value: "ab 1 Tag", label: "Mindestbuchung" },
            { value: "€249", label: "Ab Preis / Person" },
            { value: "75%", label: "Revenue für Viking" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white font-bold text-2xl">{stat.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Airline Selector ───────────────────────────────────────────────────────────

function AirlineSelector({
  airlines,
  active,
  onSelect,
}: {
  airlines: Airline[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="sticky top-16 z-40 px-8 py-3 flex gap-3 overflow-x-auto"
      style={{ backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)" }}
    >
      {airlines.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
          style={{
            backgroundColor: active === a.id ? a.color : "rgba(255,255,255,0.06)",
            color: active === a.id ? "white" : "rgba(255,255,255,0.5)",
            border: `1px solid ${active === a.id ? a.accentColor : "rgba(255,255,255,0.1)"}`,
          }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: active === a.id ? "rgba(255,255,255,0.2)" : a.color }}
          >
            {a.logoLetter}
          </div>
          {a.name.split(" ")[0]}
        </button>
      ))}

      {/* Coming soon placeholder */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/20 border border-white/5 whitespace-nowrap">
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">+</div>
        Weitere folgen
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ReedereienPage() {
  const [activeId, setActiveId] = useState(AIRLINES[0].id);
  const airline = AIRLINES.find((a) => a.id === activeId) ?? AIRLINES[0];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#0A0A0A" }}>
      <Navbar />

      {/* Airline Selector */}
      <AirlineSelector
        airlines={AIRLINES}
        active={activeId}
        onSelect={setActiveId}
      />

      {/* Cinematic Hero */}
      <CinematicHero airline={airline} />

      {/* Feature Section */}
      <FeatureSection airline={airline} />

      {/* CTA */}
      <CTASection airline={airline} />

      {/* Footer nav */}
      <div
        className="px-8 py-8 flex items-center justify-between flex-wrap gap-4"
        style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-white/20 text-xs">© 2026 CruiseSplit · Patrizia Kröger · Köln</p>
        <div className="flex gap-6">
          {[
            { label: "Impressum", href: "/impressum" },
            { label: "Datenschutz", href: "/datenschutz" },
            { label: "AGB", href: "/agb" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/20 text-xs hover:text-white/50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
