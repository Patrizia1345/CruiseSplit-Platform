"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string;
  label: string;
  icon: string;
};

type BookingStatus = "Bestätigt" | "Ausstehend";

type Booking = {
  id: string;
  segment: string;
  cabin: string;
  passenger: string;
  date: string;
  price: number;
  status: BookingStatus;
};

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "uebersicht", label: "Übersicht", icon: "◼" },
  { id: "buchungen", label: "Buchungen", icon: "📋" },
  { id: "segmente", label: "Segmente", icon: "🗺" },
  { id: "inventar", label: "Inventar", icon: "📦" },
  { id: "einstellungen", label: "Einstellungen", icon: "⚙" },
];

const BOOKINGS: Booking[] = [
  {
    id: "CS-10041",
    segment: "Barcelona → Marseille",
    cabin: "Balkonkabine",
    passenger: "Müller, Anna",
    date: "12. Mai 2025",
    price: 419,
    status: "Bestätigt",
  },
  {
    id: "CS-10042",
    segment: "Marseille → Genua",
    cabin: "Innenkabine",
    passenger: "Becker, Jonas",
    date: "14. Mai 2025",
    price: 249,
    status: "Ausstehend",
  },
  {
    id: "CS-10043",
    segment: "Genua → Rom",
    cabin: "Außenkabine",
    passenger: "Schmidt, Laura",
    date: "16. Mai 2025",
    price: 349,
    status: "Bestätigt",
  },
  {
    id: "CS-10044",
    segment: "Rom → Santorin",
    cabin: "Innenkabine",
    passenger: "Weber, Markus",
    date: "18. Mai 2025",
    price: 419,
    status: "Bestätigt",
  },
  {
    id: "CS-10045",
    segment: "Santorin → Athen",
    cabin: "Balkonkabine",
    passenger: "Fischer, Sophie",
    date: "21. Mai 2025",
    price: 419,
    status: "Ausstehend",
  },
];

const WEEKLY_DATA = [
  { day: "Mo", bookings: 8 },
  { day: "Di", bookings: 14 },
  { day: "Mi", bookings: 11 },
  { day: "Do", bookings: 19 },
  { day: "Fr", bookings: 23 },
  { day: "Sa", bookings: 17 },
  { day: "So", bookings: 12 },
];

const KPI_CARDS = [
  {
    label: "Buchungen heute",
    value: "12",
    unit: "",
    trend: "+3 vs. gestern",
    up: true,
    icon: "📋",
  },
  {
    label: "Auslastung",
    value: "78",
    unit: "%",
    trend: "+5% vs. Vorwoche",
    up: true,
    icon: "📊",
  },
  {
    label: "Revenue heute",
    value: "4.320",
    unit: "€",
    trend: "+€480 vs. gestern",
    up: true,
    icon: "💶",
  },
  {
    label: "Offene Kabinen",
    value: "23",
    unit: "",
    trend: "−4 vs. gestern",
    up: false,
    icon: "🛏",
  },
];

const MAX_BOOKINGS = Math.max(...WEEKLY_DATA.map((d) => d.bookings));

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: BookingStatus }) {
  const confirmed = status === "Bestätigt";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
        confirmed
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${confirmed ? "bg-emerald-500" : "bg-amber-400"}`} />
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReedereIDashboard() {
  const [activeNav, setActiveNav] = useState("uebersicht");

  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
      {/* ── Sidebar ── */}
      <aside
        className="w-60 shrink-0 flex flex-col h-full shadow-lg"
        style={{ backgroundColor: "#0A2342" }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <span className="text-white font-bold text-lg leading-tight block">
            CruiseSplit
          </span>
          <span className="text-xs font-medium" style={{ color: "#0EA5E9" }}>
            Partner Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all ${
                  active
                    ? "text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
                style={active ? { backgroundColor: "#0EA5E9" } : {}}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom user card */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              MS
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                MSC Cruises
              </p>
              <p className="text-white/40 text-xs truncate">partner@msc.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#0A2342" }}>
              Willkommen, MSC Cruises
            </h1>
            <p className="text-sm text-gray-400">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative p-2 rounded-xl border border-gray-200 hover:border-[#0EA5E9] transition-colors text-gray-500 hover:text-[#0EA5E9]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#0EA5E9" }}
              />
            </button>
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: "#0A2342" }}
            >
              MS
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {KPI_CARDS.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {card.label}
                  </span>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="flex items-end gap-1">
                  {card.unit === "€" && (
                    <span className="text-lg font-bold text-gray-400 mb-0.5">€</span>
                  )}
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#0A2342" }}
                  >
                    {card.value}
                  </span>
                  {card.unit && card.unit !== "€" && (
                    <span className="text-xl font-semibold text-gray-400 mb-0.5">
                      {card.unit}
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    card.up ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {card.up ? "↑" : "↓"} {card.trend}
                </span>
              </div>
            ))}
          </div>

          {/* ── Bottom Grid: Table + Chart ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Bookings Table */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-base" style={{ color: "#0A2342" }}>
                  Aktuelle Buchungen
                </h2>
                <button
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 text-white"
                  style={{ backgroundColor: "#0EA5E9" }}
                >
                  Alle anzeigen
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 text-left font-semibold">Buchungs-Nr.</th>
                      <th className="px-6 py-3 text-left font-semibold">Segment</th>
                      <th className="px-6 py-3 text-left font-semibold">Kabine</th>
                      <th className="px-6 py-3 text-left font-semibold">Passagier</th>
                      <th className="px-6 py-3 text-left font-semibold">Datum</th>
                      <th className="px-6 py-3 text-right font-semibold">Preis</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {BOOKINGS.map((b) => (
                      <tr
                        key={b.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-6 py-4 font-mono font-semibold text-xs" style={{ color: "#0EA5E9" }}>
                          {b.id}
                        </td>
                        <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">
                          {b.segment}
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {b.cabin}
                        </td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                          {b.passenger}
                        </td>
                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                          {b.date}
                        </td>
                        <td className="px-6 py-4 text-right font-bold" style={{ color: "#0A2342" }}>
                          €{b.price}
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={b.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <h2 className="font-bold text-base mb-1" style={{ color: "#0A2342" }}>
                Buchungen diese Woche
              </h2>
              <p className="text-xs text-gray-400 mb-6">Gesamtbuchungen pro Tag</p>

              {/* Bar chart */}
              <div className="flex-1 flex items-end gap-2">
                {WEEKLY_DATA.map((d) => {
                  const heightPct = Math.round((d.bookings / MAX_BOOKINGS) * 100);
                  const isToday = d.day === "Fr"; // highlight Friday as "today"
                  return (
                    <div
                      key={d.day}
                      className="flex-1 flex flex-col items-center gap-1.5"
                    >
                      <span className="text-xs font-semibold text-gray-500">
                        {d.bookings}
                      </span>
                      <div className="w-full flex items-end" style={{ height: 120 }}>
                        <div
                          className="w-full rounded-t-lg transition-all"
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: isToday ? "#0EA5E9" : "#0A2342",
                            opacity: isToday ? 1 : 0.2,
                          }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isToday ? "font-bold" : "text-gray-400"
                        }`}
                        style={isToday ? { color: "#0EA5E9" } : {}}
                      >
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: "#0EA5E9" }}
                  />
                  Heute
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: "#0A2342", opacity: 0.2 }}
                  />
                  Vorherige Tage
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
      </div>
    </div>
  );
}
