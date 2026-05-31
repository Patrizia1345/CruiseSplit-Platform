"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface CrewMember {
  id: number;
  name: string;
  age: number;
  from: string;
  flag: string;
  photo: string;
  experience: string;
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
  memberSince: string;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const CREW: CrewMember[] = [
  {
    id: 1, name: "Jana M.", age: 27, from: "Hamburg", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    experience: "Mittel", experienceYears: 3,
    languages: ["Deutsch", "Englisch"],
    looking: ["Mittelmeer", "Karibik", "Atlantik"],
    skills: ["Kochen", "Navigation", "Fotografie", "Erste Hilfe"],
    about: "Leidenschaftliche Seglerin mit 3 Jahren Erfahrung. Zuverlässig, hilfsbereit und gute Energie an Bord. Suche langfristige Törnpartner für Mittelmeer und Atlantik.",
    available: "Jun – Sep 2026", rating: 4.9, reviews: 12, verified: true,
    licenses: ["SKS"], memberSince: "2024",
  },
  {
    id: 2, name: "Leon K.", age: 31, from: "München", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    experience: "Erfahren", experienceYears: 8,
    languages: ["Deutsch", "Englisch", "Spanisch"],
    looking: ["Atlantik", "Nordsee", "Ostsee"],
    skills: ["Navigation", "Wache", "Motorkenntnisse", "Meteorologie"],
    about: "SKS und SHS Inhaber. Zwei Atlantiküberquerungen bereits hinter mir. Suche anspruchsvolle Blauwasser-Törns mit erfahrenen Skippern.",
    available: "Jul – Dez 2026", rating: 5.0, reviews: 28, verified: true,
    licenses: ["SKS", "SHS", "UBI"], memberSince: "2022",
  },
  {
    id: 3, name: "Mia S.", age: 24, from: "Berlin", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    experience: "Anfänger", experienceYears: 1,
    languages: ["Deutsch", "Englisch", "Französisch"],
    looking: ["Kroatien", "Griechenland", "Türkei"],
    skills: ["Kochen", "Yoga", "Freediving", "Social Media"],
    about: "Neu beim Segeln aber lernbegeistert! Suche geduldige Skipper die Anfängern eine Chance geben. Koche gerne und halte das Schiff sauber.",
    available: "Aug – Sep 2026", rating: 4.8, reviews: 4, verified: false,
    licenses: [], memberSince: "2025",
  },
  {
    id: 4, name: "Thomas W.", age: 45, from: "Kiel", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    experience: "Profi", experienceYears: 20,
    languages: ["Deutsch", "Englisch", "Niederländisch"],
    looking: ["Nordsee", "Atlantik", "Arktis"],
    skills: ["Navigation", "Segelmacherei", "Diesel-Mechanik", "Rettung auf See"],
    about: "Professioneller Skipper mit 20 Jahren Erfahrung. Arktis, Atlantik, Karibik. Suche abenteuerliche Langfahrten mit motivierten Crews.",
    available: "Flexibel", rating: 5.0, reviews: 67, verified: true,
    licenses: ["SKS", "SHS", "SSS", "UBI"], memberSince: "2019",
  },
  {
    id: 5, name: "Sophie B.", age: 29, from: "Köln", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    experience: "Mittel", experienceYears: 4,
    languages: ["Deutsch", "Englisch", "Italienisch"],
    looking: ["Mittelmeer", "Adria", "Sizilien"],
    skills: ["Navigation", "Wache", "Tauchen", "Medizin"],
    about: "Ärztin die ihre freie Zeit auf dem Meer verbringt. Mittelmeer-Fan mit Fokus auf Italien und Kroatien. Bringe medizinisches Know-how an Bord.",
    available: "Mai – Aug 2026", rating: 4.9, reviews: 19, verified: true,
    licenses: ["SKS"], memberSince: "2023",
  },
  {
    id: 6, name: "Max R.", age: 35, from: "Frankfurt", flag: "🇩🇪",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    experience: "Erfahren", experienceYears: 10,
    languages: ["Deutsch", "Englisch"],
    looking: ["Atlantik", "Karibik", "Mittelmeer"],
    skills: ["Navigation", "Segelmacher", "Elektrik", "Wache"],
    about: "10 Jahre Segelerfahrung auf verschiedenen Bootstypen. War in der Karibik und auf dem Atlantik. Sehr teamorientiert und zuverlässig.",
    available: "Sep – Dez 2026", rating: 4.7, reviews: 33, verified: true,
    licenses: ["SKS", "SHS"], memberSince: "2021",
  },
];

const EXP_STYLES: Record<string, { bg: string; color: string; dot: string }> = {
  "Anfänger": { bg: "#ECFDF5", color: "#059669", dot: "#10B981" },
  "Mittel": { bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
  "Erfahren": { bg: "#F5F3FF", color: "#6D28D9", dot: "#7C3AED" },
  "Profi": { bg: "#FFFBEB", color: "#B45309", dot: "#F59E0B" },
};

const DESTINATIONS = ["Alle", "Mittelmeer", "Atlantik", "Karibik", "Nordsee", "Ostsee", "Kroatien", "Griechenland", "Arktis"];
const EXPERIENCE_LEVELS = ["Alle", "Anfänger", "Mittel", "Erfahren", "Profi"];

// ── Crew Card – BlaBlaCar Style ───────────────────────────────────────────────

function CrewCard({ person, onClick }: { person: CrewMember; onClick: () => void }) {
  const exp = EXP_STYLES[person.experience] ?? EXP_STYLES["Mittel"];

  return (
    <div
      onClick={onClick}
      className="flex gap-4 p-5 rounded-2xl cursor-pointer transition-all"
      style={{
        background: "white",
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img src={person.photo} alt={person.name} className="w-16 h-16 rounded-2xl object-cover" />
        {person.verified && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
            style={{ background: "#0066FF", fontSize: "10px" }}>✓</div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3 className="font-bold text-gray-900 text-base">{person.name}, {person.age}</h3>
            <p className="text-sm text-gray-500">{person.flag} {person.from}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 justify-end">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="font-bold text-gray-900 text-sm">{person.rating}</span>
            </div>
            <p className="text-xs text-gray-400">{person.reviews} Bewertungen</p>
          </div>
        </div>

        {/* Experience badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: exp.bg, color: exp.color }}>
            {person.experience} · {person.experienceYears} Jahre
          </span>
          {person.licenses.slice(0, 2).map(l => (
            <span key={l} className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "#FEF9C3", color: "#854D0E" }}>{l}</span>
          ))}
        </div>

        {/* Route (like BlaBlaCar from → to) */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: exp.dot }} />
            <span className="text-sm font-medium text-gray-700">{person.from}</span>
          </div>
          <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
            <path d="M0 4h18M14 1l4 3-4 3" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-gray-700">{person.looking[0]}{person.looking.length > 1 ? ` +${person.looking.length - 1}` : ""}</span>
          </div>
        </div>

        {/* About preview */}
        <p className="text-sm text-gray-500 line-clamp-1 mb-2">{person.about}</p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-xs text-gray-400">{person.available}</span>
          </div>
          <span className="text-xs text-gray-400">Mitglied seit {person.memberSince}</span>
        </div>
      </div>
    </div>
  );
}

// ── Profile Modal ─────────────────────────────────────────────────────────────

function ProfileModal({ person, onClose }: { person: CrewMember; onClose: () => void }) {
  const exp = EXP_STYLES[person.experience] ?? EXP_STYLES["Mittel"];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div
        className="w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-y-auto"
        style={{ background: "white", maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="relative">
          <img src={person.photo} alt={person.name} className="w-full h-52 object-cover object-top" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)" }} />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              {person.name}, {person.age}
            </h2>
            <p className="text-white/70 text-sm">{person.flag} {person.from}</p>
          </div>
        </div>

        <div className="p-5">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mb-5">
            {person.verified && (
              <span className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: "#EFF6FF", color: "#1D4ED8" }}>✓ Verifiziert</span>
            )}
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: exp.bg, color: exp.color }}>
              {person.experience} · {person.experienceYears} Jahre
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "#F9FAFB", color: "#374151" }}>
              ★ {person.rating} ({person.reviews})
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-3 p-4 rounded-2xl mb-5" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
            <div className="flex flex-col items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: exp.dot }} />
              <div className="w-px h-8 bg-gray-200" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Von</p>
                <p className="text-sm font-semibold text-gray-800">{person.from}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Sucht Törns in</p>
                <p className="text-sm font-semibold text-gray-800">{person.looking.join(", ")}</p>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-400 mb-0.5">Verfügbar</p>
              <p className="text-sm font-semibold text-gray-800">{person.available}</p>
            </div>
          </div>

          {/* About */}
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Über mich</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{person.about}</p>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {person.skills.map(s => (
                <span key={s} className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: "#F3F4F6", color: "#374151" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Licenses */}
          {person.licenses.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Scheine</h3>
              <div className="flex flex-wrap gap-2">
                {person.licenses.map(l => (
                  <span key={l} className="text-xs px-3 py-1.5 rounded-full font-bold"
                    style={{ background: "#FEF9C3", color: "#854D0E", border: "1px solid #FDE68A" }}>{l}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Sprachen</h3>
            <p className="text-sm text-gray-600">{person.languages.join(" · ")}</p>
          </div>

          {/* CTA */}
          <button className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 4px 15px rgba(0,102,255,0.3)" }}>
            Anfrage senden →
          </button>
          <p className="text-xs text-center text-gray-400 mt-2">Du musst eingeloggt sein um eine Anfrage zu senden.</p>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CrewSearchPage() {
  const [from, setFrom] = useState("");
  const [destination, setDestination] = useState("Alle");
  const [experience, setExperience] = useState("Alle");
  const [selectedPerson, setSelectedPerson] = useState<CrewMember | null>(null);
  const [, setSearched] = useState(false);

  const results = CREW.filter(p => {
    if (destination !== "Alle" && !p.looking.includes(destination)) return false;
    if (experience !== "Alle" && p.experience !== experience) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ background: "#F9FAFB", fontFamily: "var(--font-outfit), system-ui, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 bg-white" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#0A0A0A", textDecoration: "none" }}>
            Cruise<span style={{ color: "#0066FF" }}>Split</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/sailing/onboarding/owner" className="text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              style={{ color: "#0066FF", border: "1px solid #0066FF" }}>
              Törn anbieten
            </Link>
            <Link href="/auth/login" className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
              style={{ background: "#0066FF" }}>
              Einloggen
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SEARCH ── */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #0D2044 100%)" }} className="py-12 px-5">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white mb-2" style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Crew finden
          </h1>
          <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            Finde erfahrene Mitsegler für deinen nächsten Törn
          </p>

          {/* BlaBlaCar-style search card */}
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "white" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#F3F4F6" }}>

              {/* Von */}
              <div className="px-5 py-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Von</label>
                <input
                  type="text"
                  placeholder="Dein Starthafen"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent placeholder-gray-300"
                />
              </div>

              {/* Destination */}
              <div className="px-5 py-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Zielgebiet</label>
                <select
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Experience */}
              <div className="px-5 py-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Erfahrung</label>
                <select
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full text-sm font-semibold text-gray-800 outline-none bg-transparent cursor-pointer"
                >
                  {EXPERIENCE_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
            </div>

            {/* Search button */}
            <div className="px-4 py-3" style={{ borderTop: "1px solid #F3F4F6" }}>
              <button
                onClick={() => setSearched(true)}
                className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0066FF, #0044CC)", boxShadow: "0 4px 15px rgba(0,102,255,0.3)" }}
              >
                Crew suchen →
              </button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["Mittelmeer", "Atlantik", "Kroatien", "Karibik", "Nordsee"].map(d => (
              <button key={d}
                onClick={() => { setDestination(d); setSearched(true); }}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:bg-white/20"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="max-w-3xl mx-auto px-5 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Link href="/crew/search"
            className="px-5 py-2.5 rounded-full text-sm font-bold"
            style={{ background: "#0066FF", color: "white" }}>
            👥 Crew finden
          </Link>
          <Link href="/boat/search"
            className="px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }}>
            ⛵ Boot finden
          </Link>
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-700">
            <span className="font-bold text-gray-900">{results.length}</span> Crewmitglieder
            {destination !== "Alle" && <span className="text-gray-500"> · {destination}</span>}
          </p>
          <button className="text-sm font-medium text-blue-600">Sortieren</button>
        </div>

        {/* Cards list */}
        <div className="flex flex-col gap-3">
          {results.map(person => (
            <CrewCard key={person.id} person={person} onClick={() => setSelectedPerson(person)} />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Keine Ergebnisse</h3>
            <p className="text-sm text-gray-500">Passe die Filter an um mehr Crew zu finden.</p>
          </div>
        )}

        {/* CTA für Skipper */}
        <div className="mt-10 p-6 rounded-2xl" style={{ background: "#EFF6FF", border: "1px solid #DBEAFE" }}>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">Du bist Skipper?</h3>
              <p className="text-sm text-gray-500">Schreibe deinen Törn aus und finde die perfekte Crew.</p>
            </div>
            <Link href="/sailing/onboarding/owner"
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white flex-shrink-0"
              style={{ background: "#0066FF" }}>
              Törn ausschreiben →
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedPerson && (
        <ProfileModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
      )}
    </div>
  );
}
