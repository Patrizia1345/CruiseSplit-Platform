"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const PORTS = [
  "Barcelona",
  "Marseille",
  "Genua",
  "Rom",
  "Neapel",
  "Santorin",
  "Athen",
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
}

const ALL_SEGMENTS: Segment[] = [
  {
    id: 1,
    leg: "Leg 1",
    from: "Barcelona",
    to: "Marseille",
    departure: "08:00",
    arrival: "18:00",
    date: "12. Mai 2025",
    days: 2,
    airline: "MSC Cruises",
    cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 },
  },
  {
    id: 2,
    leg: "Leg 2",
    from: "Marseille",
    to: "Genua",
    departure: "09:30",
    arrival: "20:00",
    date: "14. Mai 2025",
    days: 2,
    airline: "Costa Cruises",
    cabins: { Innenkabine: 249, Außenkabine: 309, Balkonkabine: 399 },
  },
  {
    id: 3,
    leg: "Leg 3",
    from: "Genua",
    to: "Rom",
    departure: "07:00",
    arrival: "19:30",
    date: "16. Mai 2025",
    days: 2,
    airline: "MSC Cruises",
    cabins: { Innenkabine: 279, Außenkabine: 349, Balkonkabine: 439 },
  },
  {
    id: 4,
    leg: "Leg 4",
    from: "Rom",
    to: "Santorin",
    departure: "10:00",
    arrival: "16:00",
    date: "18. Mai 2025",
    days: 3,
    airline: "Norwegian Cruise Line",
    cabins: { Innenkabine: 419, Außenkabine: 519, Balkonkabine: 649 },
  },
  {
    id: 5,
    leg: "Leg 5",
    from: "Santorin",
    to: "Athen",
    departure: "11:00",
    arrival: "20:00",
    date: "21. Mai 2025",
    days: 2,
    airline: "Costa Cruises",
    cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 },
  },
];

const CABIN_TYPES: Cabin[] = ["Innenkabine", "Außenkabine", "Balkonkabine"];
const REEDEREIEN = ["MSC Cruises", "Costa Cruises", "Norwegian Cruise Line"];
const DURATION_OPTIONS = ["Alle", "2 Tage", "3 Tage", "5+ Tage"];

function AirlineBadge({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
      style={{ backgroundColor: "#0A2342" }}
    >
      {initials}
    </div>
  );
}

function CabinSelector({
  cabins,
  selected,
  onSelect,
}: {
  cabins: Record<Cabin, number>;
  selected: Cabin;
  onSelect: (c: Cabin) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CABIN_TYPES.map((cabin) => (
        <button
          key={cabin}
          onClick={() => onSelect(cabin)}
          className={`flex flex-col items-center px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
            selected === cabin
              ? "border-[#0EA5E9] bg-sky-50 text-[#0EA5E9]"
              : "border-gray-200 text-gray-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9]"
          }`}
        >
          <span className="font-semibold text-sm">€{cabins[cabin]}</span>
          <span>{cabin}</span>
        </button>
      ))}
    </div>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded accent-[#0EA5E9]"
      />
      {label}
    </label>
  );
}

export default function Segmente() {
  const searchParams = useSearchParams();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (searchParams.get("access") === "denied") {
      setAccessDenied(true);
      // Remove the query param from the URL without reloading
      window.history.replaceState({}, "", "/segmente");
    }
  }, [searchParams]);

  const [from, setFrom] = useState("Barcelona");
  const [to, setTo] = useState("Athen");
  const [date, setDate] = useState("2025-05-12");
  const [persons, setPersons] = useState(2);
  const [searched, setSearched] = useState(true);

  // Filters
  const [selectedDuration, setSelectedDuration] = useState("Alle");
  const [priceMax, setPriceMax] = useState(700);
  const [selectedCabinFilters, setSelectedCabinFilters] = useState<Set<Cabin>>(
    new Set()
  );
  const [selectedReederei, setSelectedReederei] = useState<Set<string>>(
    new Set()
  );

  // Per-card cabin selection
  const [selectedCabins, setSelectedCabins] = useState<Record<number, Cabin>>(
    Object.fromEntries(ALL_SEGMENTS.map((s) => [s.id, "Innenkabine"]))
  );

  const toggleCabinFilter = (c: Cabin) => {
    setSelectedCabinFilters((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  };

  const toggleReederei = (r: string) => {
    setSelectedReederei((prev) => {
      const next = new Set(prev);
      next.has(r) ? next.delete(r) : next.add(r);
      return next;
    });
  };

  const results = searched
    ? ALL_SEGMENTS.filter((s) => {
        if (selectedDuration !== "Alle") {
          const d = parseInt(selectedDuration);
          if (selectedDuration === "5+ Tage") {
            if (s.days < 5) return false;
          } else if (s.days !== d) return false;
        }
        const activeCabin = selectedCabins[s.id];
        if (s.cabins[activeCabin] > priceMax) return false;
        if (selectedCabinFilters.size > 0 && !selectedCabinFilters.has(activeCabin))
          return false;
        if (selectedReederei.size > 0 && !selectedReederei.has(s.airline))
          return false;
        return true;
      })
    : [];

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />

      {/* Access-denied banner */}
      {accessDenied && (
        <div className="bg-red-50 border-b border-red-100 px-8 py-3 flex items-center justify-between">
          <p className="text-sm font-medium text-red-600 flex items-center gap-2">
            <span>⛔</span>
            Kein Zugriff — Dieser Bereich ist nur für Partner zugänglich.
          </p>
          <button
            onClick={() => setAccessDenied(false)}
            className="text-red-400 hover:text-red-600 text-lg leading-none"
            aria-label="Schließen"
          >
            ×
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ backgroundColor: "#0A2342" }} className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">
            Kreuzfahrt-Segmente suchen
          </h1>
          <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-3 items-end shadow-lg">
            {/* Von */}
            <div className="flex flex-col gap-1 min-w-[140px] flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Von
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50"
              >
                {PORTS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Swap icon */}
            <button
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              className="mb-0.5 p-2 rounded-full border border-gray-200 text-gray-400 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors"
              title="Tauschen"
            >
              ⇄
            </button>

            {/* Nach */}
            <div className="flex flex-col gap-1 min-w-[140px] flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Nach
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50"
              >
                {PORTS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Datum */}
            <div className="flex flex-col gap-1 min-w-[160px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Datum
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50"
              />
            </div>

            {/* Personen */}
            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Personen
              </label>
              <select
                value={persons}
                onChange={(e) => setPersons(Number(e.target.value))}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Person" : "Personen"}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={() => setSearched(true)}
              className="px-7 py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              Segmente suchen
            </button>
          </div>
        </div>
      </div>

      {/* Content: Filter + Results */}
      <div className="max-w-6xl mx-auto w-full px-8 py-8 flex gap-6 flex-1">
        {/* Filter Sidebar */}
        <aside className="w-56 shrink-0 flex flex-col gap-6">
          {/* Preis */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#0A2342" }}
            >
              Preis
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>€0</span>
                <span>€{priceMax}</span>
              </div>
              <input
                type="range"
                min={0}
                max={700}
                step={10}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#0EA5E9]"
              />
              <p className="text-xs text-gray-500">Max. €{priceMax} pro Person</p>
            </div>
          </div>

          {/* Dauer */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#0A2342" }}
            >
              Dauer
            </h3>
            <div className="flex flex-col gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                >
                  <input
                    type="radio"
                    name="duration"
                    checked={selectedDuration === opt}
                    onChange={() => setSelectedDuration(opt)}
                    className="accent-[#0EA5E9]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Kabinen-Typ */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#0A2342" }}
            >
              Kabinen-Typ
            </h3>
            <div className="flex flex-col gap-2">
              {CABIN_TYPES.map((c) => (
                <FilterCheckbox
                  key={c}
                  label={c}
                  checked={selectedCabinFilters.has(c)}
                  onChange={() => toggleCabinFilter(c)}
                />
              ))}
            </div>
          </div>

          {/* Reederei */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3
              className="text-sm font-bold mb-4 uppercase tracking-wider"
              style={{ color: "#0A2342" }}
            >
              Reederei
            </h3>
            <div className="flex flex-col gap-2">
              {REEDEREIEN.map((r) => (
                <FilterCheckbox
                  key={r}
                  label={r}
                  checked={selectedReederei.has(r)}
                  onChange={() => toggleReederei(r)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {results.length} Segment{results.length !== 1 ? "e" : ""} gefunden
            </p>
            <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white">
              <option>Günstigste zuerst</option>
              <option>Schnellste zuerst</option>
              <option>Empfohlen</option>
            </select>
          </div>

          {results.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 py-24 text-center">
              <span className="text-5xl mb-4">🚢</span>
              <p className="text-gray-500 text-lg font-medium">
                Keine Segmente gefunden
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Passe die Filter an oder starte eine neue Suche.
              </p>
            </div>
          )}

          {results.map((segment) => (
            <div
              key={segment.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Top row */}
              <div className="flex items-start gap-4">
                <AirlineBadge name={segment.airline} />

                <div className="flex-1 flex flex-wrap gap-6 items-center">
                  {/* Departure */}
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-gray-900">
                      {segment.departure}
                    </span>
                    <span className="text-sm text-gray-500">{segment.from}</span>
                  </div>

                  {/* Duration line */}
                  <div className="flex flex-col items-center gap-1 flex-1 min-w-[120px]">
                    <span className="text-xs text-gray-400">
                      {segment.days} Tage
                    </span>
                    <div className="w-full flex items-center gap-1">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-gray-300">🚢</span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <span className="text-xs text-gray-400">{segment.leg}</span>
                  </div>

                  {/* Arrival */}
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold text-gray-900">
                      {segment.arrival}
                    </span>
                    <span className="text-sm text-gray-500">{segment.to}</span>
                  </div>
                </div>

                {/* Price + Book */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-gray-400">{segment.date}</span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#0A2342" }}
                  >
                    €{segment.cabins[selectedCabins[segment.id]]}
                  </span>
                  <span className="text-xs text-gray-400">pro Person</span>
                  <button
                    className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0EA5E9" }}
                  >
                    Auswählen
                  </button>
                </div>
              </div>

              {/* Cabin selector + airline */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                <CabinSelector
                  cabins={segment.cabins}
                  selected={selectedCabins[segment.id]}
                  onSelect={(c) =>
                    setSelectedCabins((prev) => ({ ...prev, [segment.id]: c }))
                  }
                />
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span>🚢</span>
                  {segment.airline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
