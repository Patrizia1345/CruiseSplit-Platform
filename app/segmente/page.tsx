"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const PORTS = [
  "Barcelona", "Marseille", "Genua", "Rom", "Neapel",
  "Santorin", "Athen", "Dubrovnik", "Split", "Venedig",
  "Palma de Mallorca", "Valencia", "Nizza", "Pisa (Livorno)",
];

type Cabin = "Innenkabine" | "Außenkabine" | "Balkonkabine";

interface Segment {
  id: number;
  leg: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  date: string;
  days: number;
  airline: string;
  cabins: Record<Cabin, number>;
  image: string;
  highlights: string[];
}

const ALL_SEGMENTS: Segment[] = [
  { id: 1, leg: "Leg 1", from: "Barcelona", to: "Marseille", departure: "08:00", arrival: "18:00", date: "12. Mai 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 }, image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80", highlights: ["Sagrada Família", "Las Ramblas", "Alter Hafen Marseille"] },
  { id: 2, leg: "Leg 2", from: "Marseille", to: "Genua", departure: "09:30", arrival: "20:00", date: "14. Mai 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 249, Außenkabine: 309, Balkonkabine: 399 }, image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80", highlights: ["Côte d'Azur", "Nizza Promenade", "Genua Altstadt"] },
  { id: 3, leg: "Leg 3", from: "Genua", to: "Rom", departure: "07:00", arrival: "19:30", date: "16. Mai 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 279, Außenkabine: 349, Balkonkabine: 439 }, image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80", highlights: ["Kolosseum", "Vatikan", "Cinque Terre"] },
  { id: 4, leg: "Leg 4", from: "Rom", to: "Santorin", departure: "10:00", arrival: "16:00", date: "18. Mai 2025", days: 3, airline: "Norwegian Cruise Line", cabins: { Innenkabine: 419, Außenkabine: 519, Balkonkabine: 649 }, image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", highlights: ["Oia Sonnenuntergang", "Caldera", "Neapel Küste"] },
  { id: 5, leg: "Leg 5", from: "Santorin", to: "Athen", departure: "11:00", arrival: "20:00", date: "21. Mai 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 }, image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80", highlights: ["Akropolis", "Plaka", "Mykonos"] },
  { id: 6, leg: "Leg 6", from: "Athen", to: "Dubrovnik", departure: "08:00", arrival: "21:00", date: "23. Mai 2025", days: 3, airline: "MSC Cruises", cabins: { Innenkabine: 389, Außenkabine: 479, Balkonkabine: 599 }, image: "https://images.unsplash.com/photo-1555990538-c4f0ebe673c2?w=800&q=80", highlights: ["Altstadtmauern", "Game of Thrones", "Korfu"] },
  { id: 7, leg: "Leg 7", from: "Dubrovnik", to: "Split", departure: "09:00", arrival: "15:00", date: "26. Mai 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 219, Außenkabine: 279, Balkonkabine: 359 }, image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=800&q=80", highlights: ["Diokletianpalast", "Dalmatinische Inseln", "Hvar"] },
  { id: 8, leg: "Leg 8", from: "Split", to: "Venedig", departure: "10:00", arrival: "22:00", date: "28. Mai 2025", days: 2, airline: "Norwegian Cruise Line", cabins: { Innenkabine: 299, Außenkabine: 369, Balkonkabine: 469 }, image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80", highlights: ["Markusplatz", "Gondeln", "Rialtobrücke"] },
  { id: 9, leg: "Leg 9", from: "Venedig", to: "Genua", departure: "08:30", arrival: "20:00", date: "30. Mai 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 259, Außenkabine: 319, Balkonkabine: 409 }, image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80", highlights: ["Lagunenstadt", "Cinque Terre", "Ligurische Küste"] },
  { id: 10, leg: "Leg 10", from: "Barcelona", to: "Palma de Mallorca", departure: "09:00", arrival: "14:00", date: "15. Jun 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 199, Außenkabine: 249, Balkonkabine: 329 }, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", highlights: ["Kathedrale La Seu", "Strand Es Trenc", "Soller Tal"] },
  { id: 11, leg: "Leg 11", from: "Palma de Mallorca", to: "Valencia", departure: "11:00", arrival: "19:00", date: "17. Jun 2025", days: 2, airline: "Norwegian Cruise Line", cabins: { Innenkabine: 229, Außenkabine: 289, Balkonkabine: 369 }, image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80", highlights: ["Stadt der Künste", "Paella-Heimat", "Ibiza Stopp"] },
  { id: 12, leg: "Leg 12", from: "Nizza", to: "Pisa (Livorno)", departure: "10:00", arrival: "18:30", date: "20. Jun 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 249, Außenkabine: 309, Balkonkabine: 399 }, image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80", highlights: ["Promenade des Anglais", "Monaco", "Schiefer Turm"] },
];

const CABIN_TYPES: Cabin[] = ["Innenkabine", "Außenkabine", "Balkonkabine"];
const REEDEREIEN = ["MSC Cruises", "Costa Cruises", "Norwegian Cruise Line"];
const DURATION_OPTIONS = ["Alle", "2 Tage", "3 Tage", "5+ Tage"];

function AirlineBadge({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 3);
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: "#0A2342" }}>
      {initials}
    </div>
  );
}

function CabinSelector({ cabins, selected, onSelect }: { cabins: Record<Cabin, number>; selected: Cabin; onSelect: (c: Cabin) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CABIN_TYPES.map((cabin) => (
        <button key={cabin} onClick={() => onSelect(cabin)}
          className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-medium transition-all ${selected === cabin ? "border-[#0EA5E9] bg-sky-50 text-[#0EA5E9]" : "border-gray-200 text-gray-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"}`}>
          <span className="font-semibold text-sm">€{cabins[cabin]}</span>
          <span>{cabin}</span>
        </button>
      ))}
    </div>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
      <input type="checkbox" checked={checked} onChange={onChange} className="rounded accent-[#0EA5E9]" />
      {label}
    </label>
  );
}

function SegmenteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (searchParams.get("access") === "denied") {
      setAccessDenied(true);
      window.history.replaceState({}, "", "/segmente");
    }
  }, [searchParams]);

  const [from, setFrom] = useState("Alle");
  const [to, setTo] = useState("Alle");
  const [date, setDate] = useState("");
  const [persons, setPersons] = useState(2);
  const [searched, setSearched] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("Alle");
  const [priceMax, setPriceMax] = useState(700);
  const [selectedCabinFilters, setSelectedCabinFilters] = useState<Set<Cabin>>(new Set());
  const [selectedReederei, setSelectedReederei] = useState<Set<string>>(new Set());
  const [selectedCabins, setSelectedCabins] = useState<Record<number, Cabin>>(
    Object.fromEntries(ALL_SEGMENTS.map((s) => [s.id, "Innenkabine"]))
  );

  const toggleCabinFilter = (c: Cabin) => {
    setSelectedCabinFilters((prev) => { const next = new Set(prev); next.has(c) ? next.delete(c) : next.add(c); return next; });
  };
  const toggleReederei = (r: string) => {
    setSelectedReederei((prev) => { const next = new Set(prev); next.has(r) ? next.delete(r) : next.add(r); return next; });
  };

  const results = searched ? ALL_SEGMENTS.filter((s) => {
    if (from !== "Alle" && s.from !== from) return false;
    if (to !== "Alle" && s.to !== to) return false;
    if (selectedDuration !== "Alle") {
      if (selectedDuration === "5+ Tage") { if (s.days < 5) return false; }
      else if (s.days !== parseInt(selectedDuration)) return false;
    }
    const activeCabin = selectedCabins[s.id];
    if (s.cabins[activeCabin] > priceMax) return false;
    if (selectedCabinFilters.size > 0 && !selectedCabinFilters.has(activeCabin)) return false;
    if (selectedReederei.size > 0 && !selectedReederei.has(s.airline)) return false;
    return true;
  }) : [];

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />

      {accessDenied && (
        <div className="bg-red-50 border-b border-red-100 px-8 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-red-600 flex items-center gap-2">
            <span>⛔</span> Kein Zugriff — Dieser Bereich ist nur für Partner zugänglich.
          </p>
          <button onClick={() => setAccessDenied(false)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
        </div>
      )}

      <div style={{ backgroundColor: "#0A2342" }} className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">Kreuzfahrt-Segmente buchen</h1>
          <p className="text-blue-200 text-sm mb-6">Wähle dein Wunschsegment und buche direkt. Routen entdecken? <a href="/routen" className="text-white underline">Zur Routenübersicht →</a></p>
          <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-3 items-end shadow-lg">
            <div className="flex flex-col gap-1 min-w-[140px] flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Von</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50">
                <option value="Alle">Alle Häfen</option>
                {PORTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <button onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }} className="mb-0.5 p-2 rounded-full border border-gray-200 text-gray-400 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">⇄</button>
            <div className="flex flex-col gap-1 min-w-[140px] flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nach</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50">
                <option value="Alle">Alle Häfen</option>
                {PORTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1 min-w-[160px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Datum</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50" />
            </div>
            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Personen</label>
              <select value={persons} onChange={(e) => setPersons(Number(e.target.value))} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50">
                {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Person" : "Personen"}</option>)}
              </select>
            </div>
            <button onClick={() => setSearched(true)} className="px-7 py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap" style={{ backgroundColor: "#0EA5E9" }}>
              Suchen
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-8 py-8 flex gap-6 flex-1">
        <aside className="w-56 shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "#0A2342" }}>Preis</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-gray-400"><span>€0</span><span>€{priceMax}</span></div>
              <input type="range" min={0} max={700} step={10} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#0EA5E9]" />
              <p className="text-xs text-gray-500">Max. €{priceMax} pro Person</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "#0A2342" }}>Dauer</h3>
            <div className="flex flex-col gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                  <input type="radio" name="duration" checked={selectedDuration === opt} onChange={() => setSelectedDuration(opt)} className="accent-[#0EA5E9]" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "#0A2342" }}>Kabinen-Typ</h3>
            <div className="flex flex-col gap-2">
              {CABIN_TYPES.map((c) => <FilterCheckbox key={c} label={c} checked={selectedCabinFilters.has(c)} onChange={() => toggleCabinFilter(c)} />)}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: "#0A2342" }}>Reederei</h3>
            <div className="flex flex-col gap-2">
              {REEDEREIEN.map((r) => <FilterCheckbox key={r} label={r} checked={selectedReederei.has(r)} onChange={() => toggleReederei(r)} />)}
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{results.length} Segment{results.length !== 1 ? "e" : ""} gefunden</p>
            <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white">
              <option>Günstigste zuerst</option>
              <option>Schnellste zuerst</option>
              <option>Empfohlen</option>
            </select>
          </div>

          {results.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 py-24 text-center">
              <span className="text-5xl mb-4">🚢</span>
              <p className="text-gray-500 text-lg font-medium">Keine Segmente gefunden</p>
              <p className="text-gray-400 text-sm mt-1">Passe die Filter an oder starte eine neue Suche.</p>
            </div>
          )}

          {results.map((segment) => (
            <div key={segment.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40 w-full overflow-hidden">
                <img src={segment.image} alt={`${segment.from} nach ${segment.to}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-2 flex-wrap">
                  {segment.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/30">{h}</span>
                  ))}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-white text-gray-700 font-semibold px-3 py-1 rounded-full shadow">{segment.days} Tage</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <AirlineBadge name={segment.airline} />
                  <div className="flex-1 flex flex-wrap gap-6 items-center">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-gray-900">{segment.departure}</span>
                      <span className="text-sm text-gray-500">{segment.from}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px]">
                      <div className="w-full flex items-center gap-1">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-gray-300">🚢</span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <span className="text-xs text-gray-400">{segment.leg} · {segment.date}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold text-gray-900">{segment.arrival}</span>
                      <span className="text-sm text-gray-500">{segment.to}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-2xl font-bold" style={{ color: "#0A2342" }}>
                      €{segment.cabins[selectedCabins[segment.id]]}
                    </span>
                    <span className="text-xs text-gray-400">pro Person</span>
                    <button
                      onClick={() => router.push(`/booking?segment=${segment.id}&cabin=${selectedCabins[segment.id]}&persons=${persons}`)}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#0EA5E9" }}>
                      Auswählen →
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <CabinSelector
                    cabins={segment.cabins}
                    selected={selectedCabins[segment.id]}
                    onSelect={(c) => setSelectedCabins((prev) => ({ ...prev, [segment.id]: c }))}
                  />
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span>🚢</span>{segment.airline}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SegmentePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">Laden…</div>}>
      <SegmenteContent />
    </Suspense>
  );
}
