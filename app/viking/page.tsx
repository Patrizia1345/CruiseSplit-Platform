"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Cabin = "Standardkabine" | "Veranda-Kabine" | "Suite";

interface Segment {
  id: number;
  leg: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  date: string;
  days: number;
  cabins: Record<Cabin, number>;
  image: string;
  highlights: string[];
  description: string;
}

const CABIN_TYPES: Cabin[] = ["Standardkabine", "Veranda-Kabine", "Suite"];

const CABIN_ICONS: Record<Cabin, string> = {
  "Standardkabine": "🛏️",
  "Veranda-Kabine": "🌊",
  "Suite": "👑",
};

const CABIN_DESC: Record<Cabin, string> = {
  "Standardkabine": "Elegant, 135 qm, beheizter Boden",
  "Veranda-Kabine": "Privater Balkon, 205 qm, Panoramablick",
  "Suite": "Wohnzimmer, 270+ qm, Butler-Service",
};

const SEGMENTS: Segment[] = [
  {
    id: 101,
    leg: "Leg 1",
    from: "Amsterdam",
    to: "Kinderdijk",
    departure: "09:00",
    arrival: "14:00",
    date: "12. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 499, "Veranda-Kabine": 699, "Suite": 1099 },
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80",
    highlights: ["Grachten & Museen", "Rijksmuseum", "UNESCO Windmühlen"],
    description: "Starte in der Weltstadt Amsterdam und entdecke die ikonischen Windmühlen von Kinderdijk.",
  },
  {
    id: 102,
    leg: "Leg 2",
    from: "Kinderdijk",
    to: "Köln",
    departure: "08:00",
    arrival: "19:00",
    date: "14. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 449, "Veranda-Kabine": 649, "Suite": 999 },
    image: "https://images.unsplash.com/photo-1513029158935-de3c4dd9a3e4?w=800&q=80",
    highlights: ["Kölner Dom", "Brauhaus Kultur", "Rheinufer"],
    description: "Vorbei an malerischen Rheinlandschaften in die Domstadt Köln – das Herz von NRW.",
  },
  {
    id: 103,
    leg: "Leg 3",
    from: "Köln",
    to: "Koblenz",
    departure: "09:00",
    arrival: "17:00",
    date: "16. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 429, "Veranda-Kabine": 629, "Suite": 979 },
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    highlights: ["Deutsches Eck", "Marksburg Burg", "Mittelrhein UNESCO"],
    description: "Das romantischste Stück des Rheins – vorbei an mittelalterlichen Burgen bis zum Deutschen Eck.",
  },
  {
    id: 104,
    leg: "Leg 4",
    from: "Koblenz",
    to: "Rüdesheim",
    departure: "08:30",
    arrival: "15:00",
    date: "18. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 399, "Veranda-Kabine": 599, "Suite": 949 },
    image: "https://images.unsplash.com/photo-1555990793-da11153b2473?w=800&q=80",
    highlights: ["Rheingau Weine", "Drosselgasse", "Loreley Felsen"],
    description: "Die Weinregion Rheingau – Riesling verkosten an der berühmten Drosselgasse in Rüdesheim.",
  },
  {
    id: 105,
    leg: "Leg 5",
    from: "Rüdesheim",
    to: "Speyer",
    departure: "09:00",
    arrival: "18:00",
    date: "20. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 419, "Veranda-Kabine": 619, "Suite": 969 },
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    highlights: ["Heidelberg Schloss", "Speyerer Dom", "Technik Museum"],
    description: "Von der Weinlandschaft ins kulturelle Herz der Pfalz – Heidelberg und der romanische Dom zu Speyer.",
  },
  {
    id: 106,
    leg: "Leg 6",
    from: "Speyer",
    to: "Straßburg",
    departure: "08:00",
    arrival: "16:00",
    date: "22. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 449, "Veranda-Kabine": 649, "Suite": 999 },
    image: "https://images.unsplash.com/photo-1562448283-6c3e2a6e2db9?w=800&q=80",
    highlights: ["Straßburger Münster", "Elsässische Küche", "Petite France"],
    description: "Über die Grenze ins Elsass – Straßburg verbindet deutsch-französische Kultur und Weltküche.",
  },
  {
    id: 107,
    leg: "Leg 7",
    from: "Straßburg",
    to: "Breisach",
    departure: "09:00",
    arrival: "13:00",
    date: "24. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 379, "Veranda-Kabine": 579, "Suite": 899 },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    highlights: ["Schwarzwald", "Colmar Altstadt", "Badische Weine"],
    description: "Durch das Elsass nach Breisach – Tor zum Schwarzwald und zum charmanten Colmar.",
  },
  {
    id: 108,
    leg: "Leg 8",
    from: "Breisach",
    to: "Basel",
    departure: "10:00",
    arrival: "16:00",
    date: "26. Mai 2026",
    days: 2,
    cabins: { "Standardkabine": 399, "Veranda-Kabine": 599, "Suite": 929 },
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    highlights: ["Art Basel", "Altstadt Basel", "Drei-Länder-Eck"],
    description: "Das Finale der Rheinreise: Basel – wo Deutschland, Frankreich und die Schweiz zusammentreffen.",
  },
];

const PORT_COORDS: Record<string, { x: number; y: number }> = {
  "Amsterdam":  { x: 60,  y: 40  },
  "Kinderdijk": { x: 80,  y: 70  },
  "Köln":       { x: 120, y: 110 },
  "Koblenz":    { x: 150, y: 150 },
  "Rüdesheim":  { x: 175, y: 175 },
  "Speyer":     { x: 195, y: 210 },
  "Straßburg":  { x: 205, y: 240 },
  "Breisach":   { x: 210, y: 265 },
  "Basel":      { x: 215, y: 290 },
};

const ROUTE_PORTS = ["Amsterdam", "Kinderdijk", "Köln", "Koblenz", "Rüdesheim", "Speyer", "Straßburg", "Breisach", "Basel"];

function RhineMap({ activeSegment }: { activeSegment: number | null }) {
  const active = activeSegment ? SEGMENTS.find((s) => s.id === activeSegment) : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-base" style={{ color: "#0A2342" }}>🗺️ Rhine Getaway Route</h3>
          <p className="text-xs text-gray-400 mt-0.5">Amsterdam → Basel · 8 Segmente · 16 Tage</p>
        </div>
        {active && (
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: "#B22222" }}>{active.from} → {active.to}</p>
            <p className="text-xs text-gray-400">{active.days} Tage · {active.date}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <svg viewBox="0 0 280 340" className="shrink-0" style={{ width: 140, height: 170 }}>
          <rect width="280" height="340" fill="#EFF6FF" rx="8" />
          <polyline
            points={ROUTE_PORTS.map((p) => `${PORT_COORDS[p].x},${PORT_COORDS[p].y}`).join(" ")}
            fill="none" stroke="#93C5FD" strokeWidth="3" strokeLinejoin="round"
          />
          {active && PORT_COORDS[active.from] && PORT_COORDS[active.to] && (
            <line
              x1={PORT_COORDS[active.from].x} y1={PORT_COORDS[active.from].y}
              x2={PORT_COORDS[active.to].x} y2={PORT_COORDS[active.to].y}
              stroke="#B22222" strokeWidth="4"
            />
          )}
          {ROUTE_PORTS.map((port) => {
            const c = PORT_COORDS[port];
            const isActive = active && (active.from === port || active.to === port);
            const isEnd = port === "Amsterdam" || port === "Basel";
            return (
              <g key={port}>
                <circle cx={c.x} cy={c.y} r={isActive ? 8 : isEnd ? 6 : 4}
                  fill={isActive ? "#B22222" : isEnd ? "#0A2342" : "#3B82F6"}
                  stroke="white" strokeWidth="2" />
                <text x={c.x + 10} y={c.y + 4} fontSize="9" fill="#1E3A5F" fontWeight="500">
                  {port}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-col gap-1.5 flex-1 justify-center">
          {SEGMENTS.map((seg) => (
            <div key={seg.id}
              className={`text-xs px-2 py-1 rounded-lg font-medium transition-all ${activeSegment === seg.id ? "text-white" : "bg-gray-50 text-gray-600"}`}
              style={activeSegment === seg.id ? { backgroundColor: "#B22222" } : {}}>
              {seg.from} → {seg.to}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CabinSelector({ cabins, selected, onSelect }: { cabins: Record<Cabin, number>; selected: Cabin; onSelect: (c: Cabin) => void }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CABIN_TYPES.map((cabin) => (
        <button key={cabin} onClick={() => onSelect(cabin)}
          className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-medium transition-all ${selected === cabin ? "text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
          style={selected === cabin ? { backgroundColor: "#B22222" } : {}}>
          <span className="font-semibold text-sm">€{cabins[cabin]}</span>
          <span>{cabin}</span>
        </button>
      ))}
    </div>
  );
}

export default function VikingPage() {
  const router = useRouter();
  const [selectedCabins, setSelectedCabins] = useState<Record<number, Cabin>>(
    Object.fromEntries(SEGMENTS.map((s) => [s.id, "Veranda-Kabine"]))
  );
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [persons, setPersons] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="/rhine-cruise.jpg"
          alt="Viking Rhein"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,35,66,0.85), rgba(10,35,66,0.4))" }} />
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: "#B22222" }}>V</div>
            <div>
              <span className="text-white font-bold text-lg">Viking River Cruises</span>
              <span className="text-white/60 text-xs block">× CruiseSplit Demo</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Rhine Getaway</h1>
          <p className="text-white/80 text-lg mb-4">Amsterdam → Basel · 8 Segmente · Ab €379 pro Person</p>
          <div className="flex gap-3 flex-wrap">
            {["16 Tage Gesamtroute", "4 Länder", "8 buchbare Segmente", "Inklusive Landausflug"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full text-white border border-white/30 bg-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8 flex gap-6">

        {/* Left: Map + Info */}
        <div className="w-72 shrink-0 flex flex-col gap-4">
          <RhineMap activeSegment={activeSegment} />

          {/* Personen */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold mb-3" style={{ color: "#0A2342" }}>Reisende</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => setPersons((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:border-red-700 hover:text-red-700 transition-colors">−</button>
              <span className="text-xl font-bold text-gray-900 w-6 text-center">{persons}</span>
              <button onClick={() => setPersons((p) => Math.min(6, p + 1))}
                className="w-9 h-9 rounded-full border-2 border-gray-200 text-gray-600 font-bold hover:border-red-700 hover:text-red-700 transition-colors">+</button>
              <span className="text-sm text-gray-400">{persons === 1 ? "Person" : "Personen"}</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-2xl border p-4 text-xs" style={{ backgroundColor: "#FFF5F5", borderColor: "#FCA5A5" }}>
            <p className="font-bold mb-1" style={{ color: "#B22222" }}>🚢 Viking Longship</p>
            <p className="text-gray-600">Alle Kabinen mit Panoramafenstern, beheiztem Boden & Aquavit Terrace. Inklusive: Landausflug, Frühstück & Abendessen.</p>
          </div>
        </div>

        {/* Right: Segments */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg" style={{ color: "#0A2342" }}>
              8 buchbare Segmente
            </h2>
            <p className="text-sm text-gray-400">Wähle ein oder mehrere Segmente</p>
          </div>

          {SEGMENTS.map((segment) => (
            <div
              key={segment.id}
              onMouseEnter={() => setActiveSegment(segment.id)}
              onMouseLeave={() => setActiveSegment(null)}
              className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-md ${activeSegment === segment.id ? "border-red-700 shadow-md" : "border-gray-100"}`}
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img src={segment.image} alt={`${segment.from} → ${segment.to}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex gap-2 flex-wrap">
                  {segment.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/30">{h}</span>
                  ))}
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: "#B22222" }}>
                    {segment.leg}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-white text-gray-700 font-semibold px-3 py-1 rounded-full shadow">{segment.days} Tage</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-bold text-gray-900">{segment.departure}</span>
                      <span className="text-gray-400 font-medium">{segment.from}</span>
                      <div className="flex items-center gap-1 flex-1">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-gray-300 text-sm">🚢</span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <span className="text-gray-400 font-medium">{segment.to}</span>
                      <span className="text-xl font-bold text-gray-900">{segment.arrival}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{segment.date}</p>
                    <p className="text-xs text-gray-500">{segment.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-2xl font-bold" style={{ color: "#0A2342" }}>
                      €{segment.cabins[selectedCabins[segment.id]]}
                    </span>
                    <span className="text-xs text-gray-400">pro Person</span>
                    <button
                      onClick={() => router.push(`/booking?segment=${segment.id}&cabin=${selectedCabins[segment.id]}&persons=${persons}`)}
                      className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#B22222" }}>
                      Buchen →
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <CabinSelector
                    cabins={segment.cabins}
                    selected={selectedCabins[segment.id]}
                    onSelect={(c) => setSelectedCabins((prev) => ({ ...prev, [segment.id]: c }))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-gray-200 bg-white mt-6 px-8 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg" style={{ color: "#0A2342" }}>Interesse an einer Partnerschaft?</h3>
            <p className="text-gray-500 text-sm">Reedereien verdienen 75% Revenue Share – ohne operativen Mehraufwand.</p>
          </div>
          <a href="mailto:patrizia.kroeger@gmx.com?subject=CruiseSplit Partner Anfrage"
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#B22222" }}>
            Gespräch vereinbaren →
          </a>
        </div>
      </div>
    </div>
  );
}
