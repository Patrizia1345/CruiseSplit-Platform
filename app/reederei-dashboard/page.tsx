"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

type NavItem = { id: string; label: string; icon: string };
type BookingStatus = "Bestätigt" | "Ausstehend" | "Storniert";
type Booking = {
  id: string;
  segment: string;
  cabin: string;
  passenger: string;
  date: string;
  price: number;
  status: BookingStatus;
  persons: number;
  airline: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: "uebersicht", label: "Übersicht", icon: "◼" },
  { id: "buchungen", label: "Buchungen", icon: "📋" },
  { id: "segmente", label: "Segmente", icon: "🗺" },
  { id: "inventar", label: "Inventar", icon: "📦" },
  { id: "einstellungen", label: "Einstellungen", icon: "⚙" },
];

const ALL_BOOKINGS: Booking[] = [
  { id: "CS-10041", segment: "Barcelona → Marseille", cabin: "Balkonkabine", passenger: "Müller, Anna", date: "12. Mai 2025", price: 419, status: "Bestätigt", persons: 2, airline: "MSC Cruises" },
  { id: "CS-10042", segment: "Marseille → Genua", cabin: "Innenkabine", passenger: "Becker, Jonas", date: "14. Mai 2025", price: 249, status: "Ausstehend", persons: 1, airline: "Costa Cruises" },
  { id: "CS-10043", segment: "Genua → Rom", cabin: "Außenkabine", passenger: "Schmidt, Laura", date: "16. Mai 2025", price: 349, status: "Bestätigt", persons: 2, airline: "MSC Cruises" },
  { id: "CS-10044", segment: "Rom → Santorin", cabin: "Innenkabine", passenger: "Weber, Markus", date: "18. Mai 2025", price: 419, status: "Bestätigt", persons: 3, airline: "Norwegian Cruise Line" },
  { id: "CS-10045", segment: "Santorin → Athen", cabin: "Balkonkabine", passenger: "Fischer, Sophie", date: "21. Mai 2025", price: 419, status: "Ausstehend", persons: 2, airline: "Costa Cruises" },
  { id: "CS-10046", segment: "Athen → Dubrovnik", cabin: "Außenkabine", passenger: "Wagner, Tom", date: "23. Mai 2025", price: 479, status: "Bestätigt", persons: 2, airline: "MSC Cruises" },
  { id: "CS-10047", segment: "Dubrovnik → Split", cabin: "Innenkabine", passenger: "Hoffmann, Lisa", date: "26. Mai 2025", price: 219, status: "Storniert", persons: 1, airline: "Costa Cruises" },
  { id: "CS-10048", segment: "Split → Venedig", cabin: "Balkonkabine", passenger: "Braun, Felix", date: "28. Mai 2025", price: 469, status: "Bestätigt", persons: 2, airline: "Norwegian Cruise Line" },
  { id: "CS-10049", segment: "Barcelona → Marseille", cabin: "Innenkabine", passenger: "Schulz, Maria", date: "12. Mai 2025", price: 269, status: "Ausstehend", persons: 2, airline: "MSC Cruises" },
  { id: "CS-10050", segment: "Venedig → Genua", cabin: "Außenkabine", passenger: "Koch, Peter", date: "30. Mai 2025", price: 319, status: "Bestätigt", persons: 1, airline: "MSC Cruises" },
  { id: "CS-10051", segment: "Rom → Santorin", cabin: "Balkonkabine", passenger: "Richter, Clara", date: "18. Mai 2025", price: 649, status: "Bestätigt", persons: 2, airline: "Norwegian Cruise Line" },
  { id: "CS-10052", segment: "Nizza → Pisa", cabin: "Innenkabine", passenger: "Klein, David", date: "20. Jun 2025", price: 249, status: "Ausstehend", persons: 2, airline: "MSC Cruises" },
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
  { label: "Buchungen heute", value: "12", unit: "", trend: "+3 vs. gestern", up: true, icon: "📋" },
  { label: "Auslastung", value: "78", unit: "%", trend: "+5% vs. Vorwoche", up: true, icon: "📊" },
  { label: "Revenue heute", value: "4.320", unit: "€", trend: "+€480 vs. gestern", up: true, icon: "💶" },
  { label: "Offene Kabinen", value: "23", unit: "", trend: "−4 vs. gestern", up: false, icon: "🛏" },
];

const MAX_BOOKINGS = Math.max(...WEEKLY_DATA.map((d) => d.bookings));

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    "Bestätigt": "bg-emerald-50 text-emerald-700",
    "Ausstehend": "bg-amber-50 text-amber-700",
    "Storniert": "bg-red-50 text-red-600",
  };
  const dots = {
    "Bestätigt": "bg-emerald-500",
    "Ausstehend": "bg-amber-400",
    "Storniert": "bg-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

function UebersichtView() {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500 font-medium">{card.label}</span>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div className="flex items-end gap-1">
              {card.unit === "€" && <span className="text-lg font-bold text-gray-400 mb-0.5">€</span>}
              <span className="text-3xl font-bold" style={{ color: "#0A2342" }}>{card.value}</span>
              {card.unit && card.unit !== "€" && <span className="text-xl font-semibold text-gray-400 mb-0.5">{card.unit}</span>}
            </div>
            <span className={`text-xs font-semibold ${card.up ? "text-emerald-600" : "text-amber-600"}`}>
              {card.up ? "↑" : "↓"} {card.trend}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-base" style={{ color: "#0A2342" }}>Aktuelle Buchungen</h2>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: "#0EA5E9" }}>
              Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-semibold">Nr.</th>
                  <th className="px-6 py-3 text-left font-semibold">Segment</th>
                  <th className="px-6 py-3 text-left font-semibold">Passagier</th>
                  <th className="px-6 py-3 text-right font-semibold">Preis</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ALL_BOOKINGS.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-xs" style={{ color: "#0EA5E9" }}>{b.id}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">{b.segment}</td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{b.passenger}</td>
                    <td className="px-6 py-4 text-right font-bold" style={{ color: "#0A2342" }}>€{b.price}</td>
                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h2 className="font-bold text-base mb-1" style={{ color: "#0A2342" }}>Buchungen diese Woche</h2>
          <p className="text-xs text-gray-400 mb-6">Gesamtbuchungen pro Tag</p>
          <div className="flex-1 flex items-end gap-2">
            {WEEKLY_DATA.map((d) => {
              const heightPct = Math.round((d.bookings / MAX_BOOKINGS) * 100);
              const isToday = d.day === "Fr";
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-500">{d.bookings}</span>
                  <div className="w-full flex items-end" style={{ height: 120 }}>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height: `${heightPct}%`, backgroundColor: isToday ? "#0EA5E9" : "#0A2342", opacity: isToday ? 1 : 0.2 }} />
                  </div>
                  <span className="text-xs font-medium" style={isToday ? { color: "#0EA5E9", fontWeight: "bold" } : { color: "#9CA3AF" }}>{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#0EA5E9" }} />Heute</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#0A2342", opacity: 0.2 }} />Vorherige Tage</span>
          </div>
        </div>
      </div>
    </>
  );
}

function BuchungenView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Alle" | BookingStatus>("Alle");
  const [bookings, setBookings] = useState<Booking[]>(ALL_BOOKINGS);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.passenger.toLowerCase().includes(search.toLowerCase()) ||
      b.segment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Alle" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function changeStatus(id: string, newStatus: BookingStatus) {
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
    if (selectedBooking?.id === id) setSelectedBooking((prev) => prev ? { ...prev, status: newStatus } : null);
  }

  const totalRevenue = filtered.reduce((sum, b) => sum + b.price * b.persons, 0);
  const confirmed = filtered.filter((b) => b.status === "Bestätigt").length;
  const pending = filtered.filter((b) => b.status === "Ausstehend").length;
  const cancelled = filtered.filter((b) => b.status === "Storniert").length;

  return (
    <div className="flex gap-6 flex-1">
      <div className="flex-1 flex flex-col gap-4">
        {/* Summary Pills */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Gesamt", value: filtered.length, color: "#0A2342" },
            { label: "Bestätigt", value: confirmed, color: "#059669" },
            { label: "Ausstehend", value: pending, color: "#D97706" },
            { label: "Storniert", value: cancelled, color: "#DC2626" },
            { label: "Revenue", value: `€${totalRevenue.toLocaleString("de-DE")}`, color: "#0EA5E9" },
          ].map((pill) => (
            <div key={pill.label} className="bg-white rounded-xl border border-gray-100 px-4 py-2.5 flex items-center gap-2 shadow-sm">
              <span className="text-xs text-gray-400 font-medium">{pill.label}</span>
              <span className="text-sm font-bold" style={{ color: pill.color }}>{pill.value}</span>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buchungs-Nr., Passagier oder Segment suchen…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] text-gray-800"
            />
          </div>
          <div className="flex gap-2">
            {(["Alle", "Bestätigt", "Ausstehend", "Storniert"] as const).map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${statusFilter === s ? "text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                style={statusFilter === s ? { backgroundColor: "#0EA5E9" } : {}}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 text-left font-semibold">Buchungs-Nr.</th>
                  <th className="px-6 py-3 text-left font-semibold">Segment</th>
                  <th className="px-6 py-3 text-left font-semibold">Kabine</th>
                  <th className="px-6 py-3 text-left font-semibold">Passagier</th>
                  <th className="px-6 py-3 text-left font-semibold">Datum</th>
                  <th className="px-6 py-3 text-center font-semibold">Pers.</th>
                  <th className="px-6 py-3 text-right font-semibold">Preis</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-400 text-sm">
                      Keine Buchungen gefunden
                    </td>
                  </tr>
                )}
                {filtered.map((b) => (
                  <tr key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-mono font-semibold text-xs" style={{ color: "#0EA5E9" }}>{b.id}</td>
                    <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">{b.segment}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{b.cabin}</td>
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{b.passenger}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{b.date}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{b.persons}</td>
                    <td className="px-6 py-4 text-right font-bold" style={{ color: "#0A2342" }}>€{b.price}</td>
                    <td className="px-6 py-4"><StatusBadge status={b.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {b.status === "Ausstehend" && (
                          <button onClick={(e) => { e.stopPropagation(); changeStatus(b.id, "Bestätigt"); }}
                            className="text-xs px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors">
                            ✓ Bestätigen
                          </button>
                        )}
                        {b.status !== "Storniert" && (
                          <button onClick={(e) => { e.stopPropagation(); changeStatus(b.id, "Storniert"); }}
                            className="text-xs px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors">
                            ✕ Stornieren
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedBooking && (
        <div className="w-72 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 self-start sticky top-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm" style={{ color: "#0A2342" }}>Buchungsdetails</h3>
            <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">Buchungs-Nr.</span>
            <span className="font-mono font-bold text-sm" style={{ color: "#0EA5E9" }}>{selectedBooking.id}</span>
          </div>

          <div className="h-px bg-gray-100" />

          {[
            { label: "Segment", value: selectedBooking.segment },
            { label: "Passagier", value: selectedBooking.passenger },
            { label: "Kabine", value: selectedBooking.cabin },
            { label: "Datum", value: selectedBooking.date },
            { label: "Personen", value: `${selectedBooking.persons}` },
            { label: "Preis/Person", value: `€${selectedBooking.price}` },
            { label: "Gesamt", value: `€${selectedBooking.price * selectedBooking.persons}` },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className="text-xs font-semibold text-gray-700">{row.value}</span>
            </div>
          ))}

          <div className="h-px bg-gray-100" />

          <div>
            <span className="text-xs text-gray-400 block mb-2">Status ändern</span>
            <div className="flex flex-col gap-2">
              {(["Bestätigt", "Ausstehend", "Storniert"] as BookingStatus[]).map((s) => (
                <button key={s} onClick={() => changeStatus(selectedBooking.id, s)}
                  className={`w-full py-2 rounded-xl text-xs font-semibold border transition-all ${selectedBooking.status === s ? "text-white border-transparent" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  style={selectedBooking.status === s ? { backgroundColor: s === "Bestätigt" ? "#059669" : s === "Ausstehend" ? "#D97706" : "#DC2626" } : {}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReedereIDashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("uebersicht");
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.push("/auth/login"); return; }
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      const role = profile?.role ?? session.user.user_metadata?.user_type;
      if (role !== "partner") { router.push("/segmente?access=denied"); return; }
      setSessionChecked(true);
    }
    checkAccess();
  }, []);

  const today = new Date().toLocaleDateString("de-DE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  if (!sessionChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#0EA5E9", borderTopColor: "transparent" }} />
          <p className="text-sm text-gray-400">Wird geladen…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 shrink-0 flex flex-col h-full shadow-lg" style={{ backgroundColor: "#0A2342" }}>
          <div className="px-6 py-6 border-b border-white/10">
            <span className="text-white font-bold text-lg leading-tight block">CruiseSplit</span>
            <span className="text-xs font-medium" style={{ color: "#0EA5E9" }}>Partner Portal</span>
          </div>
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = activeNav === item.id;
              return (
                <button key={item.id} onClick={() => setActiveNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all ${active ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                  style={active ? { backgroundColor: "#0EA5E9" } : {}}>
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="px-4 py-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: "#0EA5E9" }}>MS</div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">MSC Cruises</p>
                <p className="text-white/40 text-xs truncate">partner@msc.com</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#0A2342" }}>
                {activeNav === "uebersicht" && "Übersicht"}
                {activeNav === "buchungen" && "Buchungen"}
                {activeNav === "segmente" && "Segmente"}
                {activeNav === "inventar" && "Inventar"}
                {activeNav === "einstellungen" && "Einstellungen"}
              </h1>
              <p className="text-sm text-gray-400">{today}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl border border-gray-200 hover:border-[#0EA5E9] transition-colors text-gray-500 hover:text-[#0EA5E9]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: "#0EA5E9" }} />
              </button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#0A2342" }}>MS</div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
            {activeNav === "uebersicht" && <UebersichtView />}
            {activeNav === "buchungen" && <BuchungenView />}
            {(activeNav === "segmente" || activeNav === "inventar" || activeNav === "einstellungen") && (
              <div className="flex flex-col items-center justify-center flex-1 py-24 text-center">
                <span className="text-5xl mb-4">🚧</span>
                <p className="text-gray-500 text-lg font-medium">In Entwicklung</p>
                <p className="text-gray-400 text-sm mt-1">Dieser Bereich wird bald verfügbar sein.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
