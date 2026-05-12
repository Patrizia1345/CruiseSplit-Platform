"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";

const SEGMENT_DATA: Record<string, { from: string; to: string; date: string; days: number; airline: string }> = {
  "1": { from: "Barcelona", to: "Marseille", date: "12. Mai 2025", days: 2, airline: "MSC Cruises" },
  "2": { from: "Marseille", to: "Genua", date: "14. Mai 2025", days: 2, airline: "Costa Cruises" },
  "3": { from: "Genua", to: "Rom", date: "16. Mai 2025", days: 2, airline: "MSC Cruises" },
  "4": { from: "Rom", to: "Santorin", date: "18. Mai 2025", days: 3, airline: "Norwegian Cruise Line" },
  "5": { from: "Santorin", to: "Athen", date: "21. Mai 2025", days: 2, airline: "Costa Cruises" },
};

function ConfirmationContent() {
  const t = useTranslations("confirmation");
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "CS-XXXXXX";
  const segmentId = searchParams.get("segment") ?? "1";
  const cabin = searchParams.get("cabin") ?? "Innenkabine";
  const persons = searchParams.get("persons") ?? "2";
  const total = searchParams.get("total") ?? "0";
  const seg = SEGMENT_DATA[segmentId] ?? SEGMENT_DATA["1"];
  const personsNum = Number(persons);

  const nextSteps = [
    { icon: "📧", title: t("step1Title"), desc: t("step1Desc") },
    { icon: "🎫", title: t("step2Title"), desc: t("step2Desc") },
    { icon: "🧳", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4" style={{ backgroundColor: "#dcfce7" }}>✓</div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#0A2342" }}>{t("heading")}</h1>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "#0A2342" }}>
            <div>
              <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold">{t("bookingNumber")}</p>
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
              <div><p className="text-xs text-gray-400 mb-1">{t("date")}</p><p className="text-sm font-semibold text-gray-800">{seg.date}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">{t("airline")}</p><p className="text-sm font-semibold text-gray-800">{seg.airline}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">{t("cabin")}</p><p className="text-sm font-semibold text-gray-800">{cabin}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">{t("persons")}</p><p className="text-sm font-semibold text-gray-800">{t(personsNum === 1 ? "personOne" : "personOther", { count: personsNum })}</p></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-gray-500 font-medium">{t("total")}</span>
              <span className="text-2xl font-bold" style={{ color: "#0A2342" }}>€{total}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">{t("nextStepsHeading")}</h3>
          <div className="flex flex-col gap-3">
            {nextSteps.map((item) => (
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
            {t("bookMore")}
          </Link>
          <Link href="/" className="flex-1 py-3.5 rounded-xl text-center text-white font-semibold text-base transition-opacity hover:opacity-90" style={{ backgroundColor: "#0A2342" }}>
            {t("home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ConfirmationFallback() {
  const t = useTranslations("confirmation");
  return <div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">{t("loading")}</div>;
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <ConfirmationContent />
    </Suspense>
  );
}
