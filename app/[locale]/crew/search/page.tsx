"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface CrewMember {
  id: number;
  name: string;
  age: number;
  from: string;
  flag: string;
  photo: string;
  experience: "Anfänger" | "Mittel" | "Erfahren" | "Profi";
  experienceYears: number;
  languages: string[];
  looking: string[];
  skills: string[];
  about: string;
  available: string;
  rating: number;
  reviews: number;
  verified: boolean;
  licenses: string[];
}

const CREW: CrewMember[] = [
  {
    id: 1, name: "Jana", age: 27, from: "Hamburg", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    experience: "Mittel", experienceYears: 3,
    languages: ["Deutsch", "Englisch"],
    looking: ["Mittelmeer", "Karibik", "Atlantik"],
    skills: ["Kochen", "Navigation", "Fotografie", "Erste Hilfe"],
    about: "Leidenschaftliche Seglerin die die Welt erkunden möchte. Zuverlässig, hilfsbereit und voller guter Energie. Suche langfristige Törnpartner!",
    available: "Jun – Sep 2026", rating: 4.9, reviews: 12, verified: true, licenses: ["SKS"],
  },
  {
    id: 2, name: "Leon", age: 31, from: "München", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    experience: "Erfahren", experienceYears: 8,
    languages: ["Deutsch", "Englisch", "Spanisch"],
    looking: ["Atlantik", "Nordsee", "Ostsee"],
    skills: ["Navigation", "Wache", "Motorkenntnisse", "Meteorologie"],
    about: "SKS und SHS Inhaber mit 8 Jahren Erfahrung. War auf zwei Atlantiküberquerungen. Suche anspruchsvolle Blauwasser-Törns.",
    available: "Jul – Dez 2026", rating: 5.0, reviews: 28, verified: true, licenses: ["SKS", "SHS", "UBI"],
  },
  {
    id: 3, name: "Mia", age: 24, from: "Berlin", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    experience: "Anfänger", experienceYears: 1,
    languages: ["Deutsch", "Englisch", "Französisch"],
    looking: ["Kroatien", "Griechenland", "Türkei"],
    skills: ["Kochen", "Yoga", "Freediving", "Social Media"],
    about: "Neu beim Segeln aber lerne schnell! Suche geduldige Skipper. Ich koche gerne und halte das Schiff sauber.",
    available: "Aug – Sep 2026", rating: 4.8, reviews: 4, verified: false, licenses: [],
  },
  {
    id: 4, name: "Thomas", age: 45, from: "Kiel", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    experience: "Profi", experienceYears: 20,
    languages: ["Deutsch", "Englisch", "Niederländisch"],
    looking: ["Nordsee", "Atlantik", "Arktis"],
    skills: ["Navigation", "Segelmacherei", "Diesel-Mechanik", "Rettung auf See"],
    about: "Professioneller Skipper mit 20 Jahren Erfahrung. War in der Arktis, auf dem Atlantik und in der Karibik. Suche abenteuerliche Langfahrten.",
    available: "Flexibel", rating: 5.0, reviews: 67, verified: true, licenses: ["SKS", "SHS", "SSS", "UBI"],
  },
  {
    id: 5, name: "Sophie", age: 29, from: "Köln", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    experience: "Mittel", experienceYears: 4,
    languages: ["Deutsch", "Englisch", "Italienisch"],
    looking: ["Mittelmeer", "Adria", "Sizilien"],
    skills: ["Navigation", "Wache", "Tauchen", "Medizin"],
    about: "Ärztin die ihre freie Zeit auf dem Meer verbringt. Mittelmeer-Fan mit Fokus auf Italien und Kroatien. Bringe medizinisches Know-how an Bord!",
    available: "Mai – Aug 2026", rating: 4.9, reviews: 19, verified: true, licenses: ["SKS"],
  },
];

const EXP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Anfänger": { bg: "rgba(16,185,129,0.15)", text: "#10B981", border: "rgba(16,185,129,0.4)" },
  "Mittel": { bg: "rgba(14,165,233,0.15)", text: "#0EA5E9", border: "rgba(14,165,233,0.4)" },
  "Erfahren": { bg: "rgba(124,58,255,0.15)", text: "#A78BFA", border: "rgba(124,58,255,0.4)" },
  "Profi": { bg: "rgba(245,158,11,0.15)", text: "#F59E0B", border: "rgba(245,158,11,0.4)" },
};

const DESTINATIONS = ["Alle", "Mittelmeer", "Atlantik", "Karibik", "Nordsee", "Ostsee", "Kroatien", "Griechenland"];
const EXPERIENCE_LEVELS = ["Alle", "Anfänger", "Mittel", "Erfahren", "Profi"];
const LANGUAGES_LIST = ["Alle", "Deutsch", "Englisch", "Spanisch", "Französisch", "Italienisch"];

function FilterDrawer({ open, onClose, filters, setFilters }: {
  open: boolean; onClose: () => void;
  filters: Record<string, string>; setFilters: (f: Record<string, string>) => void;
}) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={onClose} />}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden transition-all duration-400"
        style={{ background: "#0D1F36", border: "1px solid rgba(255,255,255,0.1)", transform: open ? "translateY(0)" : "translateY(100%)", maxHeight: "85vh", overflowY: "auto" }}>
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Filter</h2>
            <button onClick={onClose} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
          {[
            { label: "Destination", key: "destination", options: DESTINATIONS },
            { label: "Erfahrung", key: "experience", options: EXPERIENCE_LEVELS },
            { label: "Sprache", key: "language", options: LANGUAGES_LIST },
          ].map(section => (
            <div key={section.key} className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0EA5E9" }}>{section.label}</p>
              <div className="flex flex-wrap gap-2">
                {section.options.map(opt => (
                  <button key={opt} onClick={() => setFilters({ ...filters, [section.key]: opt })}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{
                      background: filters[section.key] === opt ? "#0066FF" : "rgba(255,255,255,0.06)",
                      color: filters[section.key] === opt ? "white" : "rgba(255,255,255,0.6)",
                      border: `1px solid ${filters[section.key] === opt ? "#0066FF" : "rgba(255,255,255,0.1)"}`,
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={onClose} className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>
            Ergebnisse anzeigen
          </button>
        </div>
      </div>
    </>
  );
}

function SwipeCard({ person, onLike, onPass, isTop }: {
  person: CrewMember; onLike: () => void; onPass: () => void; isTop: boolean;
}) {
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const expStyle = EXP_COLORS[person.experience];

  const rotation = dragX * 0.08;
  const likeOpacity = Math.min(Math.max(dragX / 80, 0), 1);
  const passOpacity = Math.min(Math.max(-dragX / 80, 0), 1);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => { if (!isTop) return; startX.current = e.touches[0].clientX; startY.current = e.touches[0].clientY; setIsDragging(true); },
    onTouchMove: (e: React.TouchEvent) => { if (!isTop || !isDragging) return; setDragX(e.touches[0].clientX - startX.current); setDragY(e.touches[0].clientY - startY.current); },
    onTouchEnd: () => { if (!isTop) return; setIsDragging(false); if (dragX > 100) onLike(); else if (dragX < -100) onPass(); else { setDragX(0); setDragY(0); } },
    onMouseDown: (e: React.MouseEvent) => { if (!isTop) return; startX.current = e.clientX; startY.current = e.clientY; setIsDragging(true); },
    onMouseMove: (e: React.MouseEvent) => { if (!isTop || !isDragging) return; setDragX(e.clientX - startX.current); setDragY(e.clientY - startY.current); },
    onMouseUp: () => { if (!isTop) return; setIsDragging(false); if (dragX > 100) onLike(); else if (dragX < -100) onPass(); else { setDragX(0); setDragY(0); } },
  };

  return (
    <>
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden select-none"
        style={{
          transform: isTop
            ? `translate(${dragX}px, ${dragY * 0.2}px) rotate(${rotation}deg)`
            : "scale(0.95) translateY(16px)",
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
          cursor: isTop ? (isDragging ? "grabbing" : "grab") : "default",
          zIndex: isTop ? 10 : 5,
          boxShadow: isTop ? "0 30px 60px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.3)",
        }}
        {...handlers}
        onMouseLeave={handlers.onMouseUp}
      >
        <img src={person.photo} alt={person.name} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 25%, rgba(6,13,26,0.97) 100%)" }} />

        {/* Indicators */}
        <div className="absolute top-10 left-6 px-4 py-2 rounded-xl font-black text-lg border-4 border-green-400 text-green-400"
          style={{ opacity: likeOpacity, transform: "rotate(-15deg)", transition: isDragging ? "none" : "opacity 0.15s" }}>
          ANFRAGEN ⚓
        </div>
        <div className="absolute top-10 right-6 px-4 py-2 rounded-xl font-black text-lg border-4 border-red-400 text-red-400"
          style={{ opacity: passOpacity, transform: "rotate(15deg)", transition: isDragging ? "none" : "opacity 0.15s" }}>
          WEITER ✕
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: expStyle.bg, color: expStyle.text, border: `1px solid ${expStyle.border}`, backdropFilter: "blur(8px)" }}>
            {person.experience} · {person.experienceYears}J
          </span>
        </div>
        {person.verified && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(0,102,255,0.85)", color: "white", backdropFilter: "blur(8px)" }}>
            ✓ Verifiziert
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="flex items-baseline gap-2 mb-0.5">
                <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "34px", fontWeight: 700, color: "white", lineHeight: 1 }}>{person.name}</h2>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "22px", fontWeight: 300 }}>{person.age}</span>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{person.flag} {person.from} · {person.languages.slice(0, 2).join(", ")}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end"><span className="text-yellow-400">★</span><span className="font-bold text-white text-sm">{person.rating}</span></div>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{person.reviews} Reviews</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {person.looking.slice(0, 3).map(d => (
              <span key={d} className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: "rgba(14,165,233,0.2)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)" }}>{d}</span>
            ))}
          </div>

          <p className="text-sm mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{person.about}</p>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Verfügbar: {person.available}</span>
          </div>

          <button onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
            className="w-full py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.04)" }}>
            Vollständiges Profil ↑
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowDetail(false)}>
          <div className="w-full max-w-lg mx-auto rounded-t-3xl overflow-y-auto"
            style={{ background: "#0D1F36", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "88vh" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                <div>
                  <h3 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "22px", fontWeight: 700, color: "white" }}>{person.name}, {person.age}</h3>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{person.flag} {person.from}</p>
                  {person.verified && <span className="text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block" style={{ background: "rgba(0,102,255,0.2)", color: "#60A5FA" }}>✓ Verifiziert</span>}
                </div>
              </div>
              {[
                { label: "Über mich", content: <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{person.about}</p> },
                { label: "Sucht Törns in", content: <div className="flex flex-wrap gap-2">{person.looking.map(d => <span key={d} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(14,165,233,0.15)", color: "#0EA5E9", border: "1px solid rgba(14,165,233,0.3)" }}>{d}</span>)}</div> },
                { label: "Skills", content: <div className="flex flex-wrap gap-2">{person.skills.map(s => <span key={s} className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>{s}</span>)}</div> },
                ...(person.licenses.length > 0 ? [{ label: "Scheine", content: <div className="flex flex-wrap gap-2">{person.licenses.map(l => <span key={l} className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: "rgba(245,158,11,0.15)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>{l}</span>)}</div> }] : []),
                { label: "Sprachen", content: <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{person.languages.join(" · ")}</p> },
              ].map(section => (
                <div key={section.label} className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0EA5E9" }}>{section.label}</p>
                  {section.content}
                </div>
              ))}
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowDetail(false)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>Schließen</button>
                <button onClick={() => { onLike(); setShowDetail(false); }} className="flex-1 py-3.5 rounded-2xl font-bold text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>Anfragen →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CrewSearchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({ destination: "Alle", experience: "Alle", language: "Alle" });
  const [liked, setLiked] = useState<number[]>([]);

  const filtered = CREW.filter(p => {
    if (filters.destination !== "Alle" && !p.looking.includes(filters.destination)) return false;
    if (filters.experience !== "Alle" && p.experience !== filters.experience) return false;
    if (filters.language !== "Alle" && !p.languages.includes(filters.language)) return false;
    return true;
  });

  const remaining = filtered.slice(currentIndex);
  const activeFilters = Object.values(filters).filter(v => v !== "Alle").length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#060D1A", fontFamily: "var(--font-outfit), system-ui, sans-serif" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "20px", fontWeight: 700, color: "white", textDecoration: "none" }}>
          Cruise<span style={{ color: "#0EA5E9" }}>Split</span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: activeFilters > 0 ? "rgba(0,102,255,0.2)" : "rgba(255,255,255,0.06)",
              color: activeFilters > 0 ? "#60A5FA" : "rgba(255,255,255,0.7)",
              border: `1px solid ${activeFilters > 0 ? "rgba(0,102,255,0.4)" : "rgba(255,255,255,0.1)"}`,
            }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Filter
            {activeFilters > 0 && <span className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center" style={{ background: "#0066FF", color: "white" }}>{activeFilters}</span>}
          </button>
          <Link href="/auth/login" className="px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
            Login
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 pt-4 gap-2 flex-shrink-0">
        {[{ label: "👥 Crew finden", href: "/crew/search", active: true }, { label: "⛵ Boot finden", href: "/boat/search", active: false }].map(t => (
          <Link key={t.href} href={t.href}
            className="px-5 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: t.active ? "white" : "rgba(255,255,255,0.06)",
              color: t.active ? "#060D1A" : "rgba(255,255,255,0.5)",
              border: t.active ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}>
            {t.label}
          </Link>
        ))}
      </div>

      {/* Counter */}
      <div className="px-5 pt-3 pb-1 flex items-center justify-between flex-shrink-0">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          {remaining.length > 0 ? `${remaining.length} Profile` : "Alle gesehen"}
        </p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          ⚓ {liked.length} angefragt
        </p>
      </div>

      {/* Card Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-2">
        {remaining.length > 0 ? (
          <>
            <div className="relative w-full max-w-sm" style={{ height: "520px" }}>
              {remaining.length > 1 && (
                <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{ transform: "scale(0.95) translateY(16px)", zIndex: 5 }}>
                  <img src={remaining[1].photo} alt="" className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
                  <div className="absolute inset-0" style={{ background: "rgba(6,13,26,0.5)" }} />
                </div>
              )}
              <SwipeCard
                key={remaining[0].id}
                person={remaining[0]}
                onLike={() => { setLiked(p => [...p, remaining[0].id]); setCurrentIndex(i => i + 1); }}
                onPass={() => setCurrentIndex(i => i + 1)}
                isTop={true}
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-5 mt-5">
              <button onClick={() => setCurrentIndex(i => i + 1)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(239,68,68,0.12)", border: "2px solid rgba(239,68,68,0.3)", color: "#F87171" }}>
                ✕
              </button>
              <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                ↩
              </button>
              <button onClick={() => { setLiked(p => [...p, remaining[0].id]); setCurrentIndex(i => i + 1); }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95"
                style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 8px 25px rgba(0,102,255,0.4)" }}>
                ⚓
              </button>
            </div>

            <p className="text-xs mt-3 text-center" style={{ color: "rgba(255,255,255,0.2)" }}>
              Swipe rechts → Anfragen · Swipe links → Weiter
            </p>
          </>
        ) : (
          <div className="text-center py-16 max-w-xs">
            <div className="text-5xl mb-4">⚓</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>Alle gesehen!</h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Passe die Filter an oder komm später nochmal vorbei.</p>
            <button onClick={() => setCurrentIndex(0)}
              className="px-6 py-3 rounded-2xl font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)" }}>
              Nochmal von vorne
            </button>
          </div>
        )}
      </div>

      <FilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </div>
  );
}
