"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const PORT_COORDS: Record<string, { x: number; y: number }> = {
  "Barcelona":         { x: 130, y: 160 },
  "Palma de Mallorca": { x: 175, y: 185 },
  "Valencia":          { x: 145, y: 195 },
  "Marseille":         { x: 215, y: 148 },
  "Nizza":             { x: 240, y: 145 },
  "Genua":             { x: 255, y: 148 },
  "Pisa (Livorno)":    { x: 265, y: 162 },
  "Rom":               { x: 285, y: 185 },
  "Neapel":            { x: 300, y: 198 },
  "Santorin":          { x: 400, y: 230 },
  "Athen":             { x: 390, y: 210 },
  "Dubrovnik":         { x: 340, y: 175 },
  "Split":             { x: 325, y: 162 },
  "Venedig":           { x: 295, y: 145 },
};

const RHINE_COORDS: Record<string, { x: number; y: number }> = {
  "Amsterdam":  { x: 60,  y: 30  },
  "Kinderdijk": { x: 80,  y: 55  },
  "Köln":       { x: 110, y: 90  },
  "Koblenz":    { x: 135, y: 120 },
  "Rüdesheim":  { x: 155, y: 145 },
  "Speyer":     { x: 170, y: 170 },
  "Straßburg":  { x: 178, y: 195 },
  "Breisach":   { x: 182, y: 215 },
  "Basel":      { x: 185, y: 235 },
};

const RHINE_PORTS = ["Amsterdam", "Kinderdijk", "Köln", "Koblenz", "Rüdesheim", "Speyer", "Straßburg", "Breisach", "Basel"];

const OCEAN_ROUTES = [
  {
    id: "mittelmeer-klassik",
    name: "Mittelmeer Klassik",
    description: "Die beliebteste Route – von Barcelona bis Athen entlang der schönsten Küsten Europas.",
    from: "Barcelona", to: "Athen",
    days: 11, segments: 5, priceFrom: 249,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    ports: ["Barcelona", "Marseille", "Genua", "Rom", "Santorin", "Athen"],
    highlights: ["Sagrada Família", "Kolosseum", "Oia Sonnenuntergang", "Akropolis"],
    tag: "Beliebt", href: "/segmente",
  },
  {
    id: "adria-kroatien",
    name: "Adria & Kroatien",
    description: "Entdecke die dalmatinische Küste – von Athen über Dubrovnik bis Venedig.",
    from: "Athen", to: "Venedig",
    days: 7, segments: 3, priceFrom: 219,
    image: "https://images.unsplash.com/photo-1555990538-c4f0ebe673c2?w=800&q=80",
    ports: ["Athen", "Dubrovnik", "Split", "Venedig"],
    highlights: ["Game of Thrones Drehorte", "Diokletianpalast", "Markusplatz"],
    tag: "Neu", href: "/segmente",
  },
  {
    id: "westliches-mittelmeer",
    name: "Westliches Mittelmeer",
    description: "Balearen, Valencia und zurück – entspannt entlang der spanischen Küste.",
    from: "Barcelona", to: "Valencia",
    days: 5, segments: 2, priceFrom: 199,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ports: ["Barcelona", "Palma de Mallorca", "Valencia"],
    highlights: ["Kathedrale La Seu", "Paella-Heimat", "Ibiza Stopp"],
    tag: "Kurztrip", href: "/segmente",
  },
  {
    id: "riviera-toskana",
    name: "Riviera & Toskana",
    description: "Von der Côte d'Azur durch Ligurien bis zur Toskana.",
    from: "Nizza", to: "Pisa (Livorno)",
    days: 4, segments: 2, priceFrom: 249,
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
    ports: ["Nizza", "Genua", "Pisa (Livorno)"],
    highlights: ["Monaco", "Cinque Terre", "Schiefer Turm von Pisa"],
    tag: "Romantik", href: "/segmente",
  },
];

const RIVER_ROUTES = [
  {
    id: "rhine-getaway",
    name: "Rhine Getaway",
    partner: "Viking River Cruises",
    partnerColor: "#B22222",
    description: "Die klassische Rheinroute – von Amsterdam durch Deutschland und Frankreich bis Basel. 4 Länder, 8 Segmente, unvergessliche Kultur.",
    from: "Amsterdam", to: "Basel",
    days: 16, segments: 8, priceFrom: 379,
    image: "https://images.unsplash.com/photo-1513029158935-de3c4dd9a3e4?w=800&q=80",
    ports: RHINE_PORTS,
    coords: RHINE_COORDS,
    highlights: ["Kölner Dom", "Marksburg Burg", "Elsässische Küche", "Schwarzwald"],
    tag: "NEU · Fluss", href: "/viking",
    isRiver: true,
  },
];

function OceanRouteMap({ ports }: { ports: string[] }) {
  return (
    <svg viewBox="0 0 520 280" className="w-full" style={{ height: 160 }}>
      <rect width="520" height="280" fill="#EFF6FF" rx="12" />
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="10" y1={y} x2="510" y2={y} stroke="#BFDBFE" strokeWidth="0.5" strokeDasharray="4 8" />
      ))}
      {ports.slice(0, -1).map((port, i) => {
        const from = PORT_COORDS[port];
        const to = PORT_COORDS[ports[i + 1]];
        if (!from || !to) return null;
        return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#0EA5E9" strokeWidth="2" strokeDasharray="5 4" />;
      })}
      {ports.map((port) => {
        const coords = PORT_COORDS[port];
        if (!coords) return null;
        const isEnd = port === ports[0] || port === ports[ports.length - 1];
        return (
          <g key={port}>
            <circle cx={coords.x} cy={coords.y} r={isEnd ? 7 : 5} fill={isEnd ? "#0EA5E9" : "#1E40AF"} stroke="white" strokeWidth="2" />
            <text x={coords.x} y={coords.y + 16} textAnchor="middle" fontSize="8" fill="#1E3A5F" fontWeight="500">{port.split(" ")[0]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function RiverRouteMap({ ports, coords, color }: { ports: string[]; coords: Record<string, { x: number; y: number }>; color: string }) {
  return (
    <svg viewBox="0 0 260 270" className="w-full" style={{ height: 160 }}>
      <rect width="260" height="270" fill="#F0FDF4" rx="12" />
      <polyline
        points={ports.map((p) => coords[p] ? `${coords[p].x},${coords[p].y}` : "").filter(Boolean).join(" ")}
        fill="none" stroke="#86EFAC" strokeWidth="3" strokeLinejoin="round"
      />
      <polyline
        points={ports.map((p) => coords[p] ? `${coords[p].x},${coords[p].y}` : "").filter(Boolean).join(" ")}
        fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round"
      />
      {ports.map((port) => {
        const c = coords[port];
        if (!c) return null;
        const isEnd = port === ports[0] || port === ports[ports.length - 1];
        return (
          <g key={port}>
            <circle cx={c.x} cy={c.y} r={isEnd ? 7 : 4} fill={isEnd ? color : "#16A34A"} stroke="white" strokeWidth="2" />
            <text x={c.x + 10} y={c.y + 4} fontSize="8" fill="#14532D" fontWeight="500">{port}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RoutenPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Header */}
      <div style={{ backgroundColor: "#0A2342" }} className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Routen entdecken</h1>
          <p className="text-blue-200">Wähle deine Route und buche einzelne Segmente – so flexibel wie du es willst.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-12">

        {/* ── Flusskreuzfahrten ── */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold" style={{ color: "#0A2342" }}>Flusskreuzfahrten</h2>
              <span className="text-xs px-2 py-1 rounded-full text-white font-semibold" style={{ backgroundColor: "#B22222" }}>NEU</span>
            </div>
            <p className="text-sm text-gray-400">Flusskreuzfahrt und mehr – segmentweise buchbar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RIVER_ROUTES.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl shadow-sm border-2 overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: route.partnerColor }}>
                {/* Hero Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1467573736999-4a0f80dc0c25?w=800&q=80"
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: route.partnerColor }}>
                      {route.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: route.partnerColor }}>V</div>
                      <span className="text-white/80 text-xs">{route.partner}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{route.name}</h3>
                    <p className="text-sm text-white/80">{route.from} → {route.to}</p>
                  </div>
                </div>

                {/* Map */}
                <div className="px-4 pt-4">
                  <RiverRouteMap ports={route.ports} coords={route.coords} color={route.partnerColor} />
                </div>

                {/* Details */}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4">{route.description}</p>
                  <div className="flex gap-3 mb-4">
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: "#0A2342" }}>{route.days}</span>
                      <span className="text-xs text-gray-400">Tage gesamt</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: "#0A2342" }}>{route.segments}</span>
                      <span className="text-xs text-gray-400">Segmente</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: route.partnerColor }}>ab €{route.priceFrom}</span>
                      <span className="text-xs text-gray-400">pro Person</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.highlights.map((h) => (
                      <span key={h} className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#FEE2E2", color: route.partnerColor }}>{h}</span>
                    ))}
                  </div>
                  <Link
                    href={route.href}
                    className="block w-full text-center py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: route.partnerColor }}>
                    Segmente entdecken →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Hochseekreuzfahrten</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ── Hochseekreuzfahrten ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ backgroundColor: "#0EA5E9" }}>🚢</div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#0A2342" }}>Hochseekreuzfahrten</h2>
              <p className="text-sm text-gray-400">Mittelmeer und mehr – segmentweise buchbar</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OCEAN_ROUTES.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#0EA5E9" }}>{route.tag}</span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{route.name}</h3>
                    <p className="text-sm text-white/80">{route.from} → {route.to}</p>
                  </div>
                </div>
                <div className="px-4 pt-4">
                  <OceanRouteMap ports={route.ports} />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-4">{route.description}</p>
                  <div className="flex gap-3 mb-4">
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: "#0A2342" }}>{route.days}</span>
                      <span className="text-xs text-gray-400">Tage gesamt</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: "#0A2342" }}>{route.segments}</span>
                      <span className="text-xs text-gray-400">Segmente</span>
                    </div>
                    <div className="flex flex-col items-center bg-gray-50 rounded-xl px-4 py-2 flex-1">
                      <span className="text-lg font-bold" style={{ color: "#0EA5E9" }}>ab €{route.priceFrom}</span>
                      <span className="text-xs text-gray-400">pro Person</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {route.highlights.map((h) => (
                      <span key={h} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                  <Link href={route.href}
                    className="block w-full text-center py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0EA5E9" }}>
                    Segmente buchen →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
