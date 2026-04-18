"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const SEGMENT_DATA: Record<string, { from: string; to: string; date: string; days: number; airline: string }> = {
  "1": { from: "Barcelona", to: "Marseille", date: "12. Mai 2025", days: 2, airline: "MSC Cruises" },
  "2": { from: "Marseille", to: "Genua", date: "14. Mai 2025", days: 2, airline: "Costa Cruises" },
  "3": { from: "Genua", to: "Rom", date: "16. Mai 2025", days: 2, airline: "MSC Cruises" },
  "4": { from: "Rom", to: "Santorin", date: "18. Mai 2025", days: 3, airline: "Norwegian Cruise Line" },
  "5": { from: "Santorin", to: "Athen", date: "21. Mai 2025", days: 2, airline: "Costa Cruises" },
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "CS-XXXXXX";
  const segmentId = searchParams.get("segment") ?? "1";
  const cabin = searchParams.get("cabin") ?? "Innenkabine";
  const persons = searchParams.get("persons") ?? "2";
  const total = searchParams.get("total") ?? "0";
  const seg = SEGMENT_DATA[segmentId] ?? SEGMENT_DATA["1"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4" style={{ backgroundColor: "#dcfce7" }}>✓</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#0A2342" }}>Buchung bestätigt!</h1>
          <p className="text-gray-500">Deine Buchungsbestätigung wurde per E-Mail versendet.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#0A2342" }}>
            <div>
              <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Buchungsnummer</p>
              <p className="text-2xl font-bold text-white font-mono">{ref}</p>
            </div>
            <div className="text-4xl">🚢</div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="text-2xl font-bold text-gray-900">{seg.from}</div>
              <div className="flex flex-col items-center flex-1">
                <div className="text-xs text-gray-400">{seg.days} Tage</div>
                <div className="flex items-center gap-1 w-full">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span>🚢</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{seg.to}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div><p className="text-xs text-gray-400 mb-1">Datum</p><p className="text-sm font-semibold text-gray-800">{seg.date}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Reederei</p><p className="text-sm font-semibold text-gray-800">{seg.airline}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Kabine</p><p className="text-sm font-semibold text-gray-800">{cabin}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Reisende</p><p className="text-sm font-semibold text-gray-800">{persons} {Number(persons) === 1 ? "Person" : "Personen"}</p></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-gray-500 font-medium">Gesamtbetrag</span>
              <span className="text-2xl font-bold" style={{ color: "#0A2342" }}>€{total}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Nächste Schritte</h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: "📧", title: "Buchungsbestätigung", desc: "Schau in deinem E-Mail-Postfach nach der Bestätigung." },
              { icon: "🎫", title: "Digitales Boarding", desc: "Dein Boarding Pass wird 48h vor Abfahrt per E-Mail zugeschickt." },
              { icon: "🧳", title: "Einchecken", desc: "Check-in ist 2 Stunden vor Abfahrt im Hafen möglich." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/segmente" className="flex-1 py-3.5 rounded-xl text-center font-semibold text-base border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            Weitere Segmente buchen
          </Link>
          <Link href="/" className="flex-1 py-3.5 rounded-xl text-center text-white font-semibold text-base transition-opacity hover:opacity-90" style={{ backgroundColor: "#0A2342" }}>
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">Laden…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
