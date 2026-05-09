"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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
  heroVideo: string;
  heroImage: string;
  logoLetter: string;
  founded: string;
  ships: string;
  routes: string;
  priceFrom: string;
  features: Feature[];
  segmentsHref: string;
}

const AIRLINES: Airline[] = [
  {
    id: "viking",
    name: "Viking River Cruises",
    tagline: "Awarded World's #1 River Cruise Line",
    description:
      "Viking verbindet Europas schönste Städte auf dem Wasserweg. Mit eleganten Longships, kultureller Tiefe und skandinavischem Design redefiniert Viking die Flusskreuzfahrt.",
    color: "#8B1A1A",
    accentColor: "#C53030",
    heroVideo: "/viking-hero.mp4",
    heroImage: "/rhine-cruise.jpg",
    logoLetter: "V",
    founded: "1997",
    ships: "80+",
    routes: "Rhein, Donau, Elbe",
    priceFrom: "249",
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
          "Die klassische Route: Amsterdam → Basel durch 4 Länder, 8 UNESCO-Highlights – oder einzelne Segmente ab 1 Tag.",
        image: "/ko_ln.jpg",
      },
    ],
    segmentsHref: "/viking",
  },
];

function CinematicHero({ airline }: { airline: Airline }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => setScrollY(window.scrollY), { passive: true });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.4;
    video.oncanplay = () => setVideoLoaded(true);
  }, []);

  const parallax = scrollY * 0.3;
  const textOpacity = Math.max(0, 1 - scrollY / 400);
  const overlayOpacity = Math.min(0.85, 0.4 + scrollY / 600);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${parallax}px)`, willChange: "transform" }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src={airline.heroVideo} type="video/mp4" />
        </video>
        {!videoLoaded && (
          <img
            src={airline.heroImage}
            alt={airline.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.1) 0%,
            rgba(0,0,0,${overlayOpacity * 0.5}) 40%,
            rgba(0,0,0,${overlayOpacity}) 75%,
            rgba(10,10,10,1) 100%
          )`,
        }}
      />
      <div className="absolute inset-0 opacity-15" style={{ backgroundColor: airline.color }} />

      <div
        className="absolute inset-0 flex flex-col justify-end px-12 pb-20"
        style={{ opacity: textOpacity, transition: "opacity 0.1s linear" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: airline.color }}
          >
            {airline.logoLetter}
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest">CruiseSplit Partner</p>
            <p className="text-white font-semibold text-sm">{airline.name}</p>
          </div>
        </div>

        <h1
          className="text-6xl sm:text-7xl font-bold text-white leading-none mb-4"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          Viking
          <br />
          <span style={{ color: airline.accentColor }}>River Cruises</span>
        </h1>

        <p className="text-white/60 text-lg max-w-xl mb-8">{airline.tagline}</p>

        <div className="flex gap-8 mb-10 flex-wrap">
          {[
            { label: "Gegründet", value: airline.founded },
            { label: "Longships", value: airline.ships },
            { label: "Routen", value: airline.routes },
            { label: "Ab Preis", value: `€${airline.priceFrom}/Segment` },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-white/30 text-xs uppercase tracking-widest">{stat.label}</span>
              <span className="text-white font-semibold text-sm mt-0.5">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-white/30">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/40" />
            <div
              className="w-1.5 h-1.5 rounded-full animate-bounce"
              style={{ backgroundColor: airline.accentColor }}
            />
          </div>
          <span className="text-xs uppercase tracking-widest">Scrollen für Details</span>
        </div>
      </div>
    </div>
  );
}

function FeatureSection({ airline }: { airline: Airline }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-28 px-8 relative"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,1), transparent)" }}
      />

      <div
        className="max-w-6xl mx-auto transition-all duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
        }}
      >
        <div className="flex items-start justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: airline.accentColor }}>
              Ausstattung & Highlights
            </p>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
              Was macht Viking
              <br />
              <span className="text-white/30">besonders?</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">{airline.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            {airline.features.map((feature, i) => (
              <button
                key={feature.number}
                onClick={() => setActiveFeature(i)}
                className="text-left"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: "all 0.6s ease",
                }}
              >
                <div
                  className="rounded-2xl p-5 transition-all duration-400 border"
                  style={{
                    backgroundColor: activeFeature === i ? `${airline.color}25` : "rgba(255,255,255,0.03)",
                    borderColor: activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-xs font-mono font-bold shrink-0 mt-0.5"
                      style={{ color: activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.2)" }}
                    >
                      {feature.number}
                    </span>
                    <div className="flex-1">
                      <h3
                        className="font-semibold mb-1 transition-colors"
                        style={{
                          color: activeFeature === i ? "white" : "rgba(255,255,255,0.45)",
                          fontSize: "15px",
                        }}
                      >
                        {feature.title}
                      </h3>
                      <div
                        className="overflow-hidden transition-all duration-400"
                        style={{ maxHeight: activeFeature === i ? "80px" : "0px" }}
                      >
                        <p className="text-white/50 text-sm leading-relaxed pt-1">{feature.description}</p>
                      </div>
                    </div>
                    <span
                      className="text-lg shrink-0 transition-transform duration-300"
                      style={{
                        color: airline.accentColor,
                        transform: activeFeature === i ? "rotate(45deg)" : "rotate(0deg)",
                        opacity: activeFeature === i ? 1 : 0.3,
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              minHeight: "460px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            {airline.features.map((feature, i) => (
              <div
                key={feature.number}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: activeFeature === i ? 1 : 0,
                  transform: activeFeature === i ? "scale(1)" : "scale(1.05)",
                }}
              >
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: airline.accentColor }}>
                    {feature.number} — {feature.title}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {airline.features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className="transition-all duration-300"
                  style={{
                    width: activeFeature === i ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.3)",
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

function CTASection({ airline }: { airline: Airline }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-24 px-8 relative overflow-hidden" style={{ backgroundColor: airline.color }}>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 80px)",
        }}
      />
      <div
        className="max-w-6xl mx-auto relative z-10 transition-all duration-1000"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-8">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Jetzt buchen</p>
            <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "Georgia, serif" }}>
              Dein Rhein-Segment
              <br />
              wartet auf dich.
            </h2>
            <p className="text-white/60 max-w-md text-sm leading-relaxed">
              8 Segmente auf der Rhine Getaway Route – einzeln buchbar ab 1 Tag.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={airline.segmentsHref}
              className="px-8 py-4 rounded-2xl bg-white font-bold text-sm transition-all hover:scale-105 shadow-xl text-center"
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
        <div className="mt-12 pt-8 flex gap-8 flex-wrap" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          {[
            { value: "8", label: "Buchbare Segmente" },
            { value: "ab 1 Tag", label: "Mindestbuchung" },
            { value: "€249", label: "Ab Preis / Person" },
            { value: "75%", label: "Revenue für Viking" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white font-bold text-2xl">{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AirlineSelector({ airlines, active, onSelect }: { airlines: Airline[]; active: string; onSelect: (id: string) => void }) {
  return (
    <div
      className="sticky top-16 z-40 px-8 py-3 flex gap-3 overflow-x-auto"
      style={{ backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      {airlines.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
          style={{
            backgroundColor: active === a.id ? a.color : "rgba(255,255,255,0.05)",
            color: active === a.id ? "white" : "rgba(255,255,255,0.4)",
            border: `1px solid ${active === a.id ? a.accentColor : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: active === a.id ? "rgba(255,255,255,0.25)" : a.color }}
          >
            {a.logoLetter}
          </div>
          {a.name.split(" ")[0]}
        </button>
      ))}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/20 border border-white/5 whitespace-nowrap">
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">+</div>
        Weitere folgen
      </div>
    </div>
  );
}

export default function ReedereienPage() {
  const [activeId, setActiveId] = useState(AIRLINES[0].id);
  const airline = AIRLINES.find((a) => a.id === activeId) ?? AIRLINES[0];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#0A0A0A" }}>
      <Navbar />
      <AirlineSelector airlines={AIRLINES} active={activeId} onSelect={setActiveId} />
      <CinematicHero airline={airline} />
      <FeatureSection airline={airline} />
      <CTASection airline={airline} />

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
            <Link key={l.href} href={l.href} className="text-white/20 text-xs hover:text-white/50 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
