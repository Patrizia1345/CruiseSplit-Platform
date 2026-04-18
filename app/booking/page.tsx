"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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
  { id: 1, leg: "Leg 1", from: "Barcelona", to: "Marseille", departure: "08:00", arrival: "18:00", date: "12. Mai 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 } },
  { id: 2, leg: "Leg 2", from: "Marseille", to: "Genua", departure: "09:30", arrival: "20:00", date: "14. Mai 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 249, Außenkabine: 309, Balkonkabine: 399 } },
  { id: 3, leg: "Leg 3", from: "Genua", to: "Rom", departure: "07:00", arrival: "19:30", date: "16. Mai 2025", days: 2, airline: "MSC Cruises", cabins: { Innenkabine: 279, Außenkabine: 349, Balkonkabine: 439 } },
  { id: 4, leg: "Leg 4", from: "Rom", to: "Santorin", departure: "10:00", arrival: "16:00", date: "18. Mai 2025", days: 3, airline: "Norwegian Cruise Line", cabins: { Innenkabine: 419, Außenkabine: 519, Balkonkabine: 649 } },
  { id: 5, leg: "Leg 5", from: "Santorin", to: "Athen", departure: "11:00", arrival: "20:00", date: "21. Mai 2025", days: 2, airline: "Costa Cruises", cabins: { Innenkabine: 269, Außenkabine: 329, Balkonkabine: 419 } },
];

const CABIN_TYPES: Cabin[] = ["Innenkabine", "Außenkabine", "Balkonkabine"];
const CABIN_ICONS: Record<Cabin, string> = { Innenkabine: "🛏️", Außenkabine: "🪟", Balkonkabine: "🌊" };
const CABIN_DESC: Record<Cabin, string> = { Innenkabine: "Komfortabel, kein Fenster", Außenkabine: "Natürliches Licht, Meerblick", Balkonkabine: "Privater Balkon, Panoramablick" };
const STEPS = ["Segment", "Reisende", "Zahlung"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < current ? "bg-green-500 text-white" : i === current ? "text-white" : "bg-gray-200 text-gray-400"
              }`}
              style={i === current ? { backgroundColor: "#0EA5E9" } : {}}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium ${i === current ? "text-[#0EA5E9]" : i < current ? "text-green-500" : "text-gray-400"}`}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-16 h-0.5 mb-4 mx-1 transition-all ${i < current ? "bg-green-500" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const segmentId = Number(searchParams.get("segment") ?? 1);
  const initialCabin = (searchParams.get("cabin") as Cabin) ?? "Innenkabine";
  const initialPersons = Number(searchParams.get("persons") ?? 2);

  const segment = ALL_SEGMENTS.find((s) => s.id === segmentId) ?? ALL_SEGMENTS[0];

  const [step, setStep] = useState(0);
  const [cabin, setCabin] = useState<Cabin>(initialCabin);
  const [persons, setPersons] = useState(initialPersons);
  const [travellers, setTravellers] = useState(
    Array.from({ length: initialPersons }, () => ({ firstName: "", lastName: "", birthDate: "", passportNumber: "" }))
  );
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "", email: "", acceptTerms: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTravellers(
      Array.from({ length: persons }, (_, i) => ({
        firstName: travellers[i]?.firstName ?? "",
        lastName: travellers[i]?.lastName ?? "",
        birthDate: travellers[i]?.birthDate ?? "",
        passportNumber: travellers[i]?.passportNumber ?? "",
      }))
    );
  }, [persons]);

  const pricePerPerson = segment.cabins[cabin];
  const totalPrice = pricePerPerson * persons;
  const serviceFee = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + serviceFee;

  function updateTraveller(index: number, field: string, value: string) {
    setTravellers((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  }

  function validateTravellers() {
    const newErrors: Record<string, string> = {};
    travellers.forEach((t, i) => {
      if (!t.firstName) newErrors[`firstName_${i}`] = "Pflichtfeld";
      if (!t.lastName) newErrors[`lastName_${i}`] = "Pflichtfeld";
      if (!t.birthDate) newErrors[`birthDate_${i}`] = "Pflichtfeld";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validatePayment() {
    const newErrors: Record<string, string> = {};
    if (!payment.email || !payment.email.includes("@")) newErrors.email = "Gültige E-Mail erforderlich";
    if (!payment.cardName) newErrors.cardName = "Pflichtfeld";
    if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Gültige Kartennummer erforderlich";
    if (!payment.expiry) newErrors.expiry = "Pflichtfeld";
    if (!payment.cvv || payment.cvv.length < 3) newErrors.cvv = "Pflichtfeld";
    if (!payment.acceptTerms) newErrors.acceptTerms = "Bitte akzeptiere die AGB";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePayment() {
    if (!validatePayment()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    const ref = "CS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    router.push(`/booking/confirmation?ref=${ref}&segment=${segmentId}&cabin=${cabin}&persons=${persons}&total=${grandTotal}`);
  }

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link href="/segmente" className="text-sm text-gray-400 hover:text-[#0EA5E9] flex items-center gap-1 transition-colors">
            ← Zurück zu den Segmenten
          </Link>
        </div>
        <StepIndicator current={step} />
        <div className="flex gap-6 items-start">
          <div className="flex-1">

            {/* STEP 0: Segment & Kabine */}
            {step === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-1" style={{ color: "#0A2342" }}>Dein Segment</h2>
                <p className="text-sm text-gray-400 mb-6">Wähle deine Kabinenkategorie und Personenzahl</p>
                <div className="rounded-xl border border-gray-200 p-4 mb-6 bg-gray-50">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{segment.leg}</span>
                  <div className="flex items-center gap-4 mt-2">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{segment.departure}</div>
                      <div className="text-sm text-gray-500">{segment.from}</div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-xs text-gray-400">{segment.days} Tage</div>
                      <div className="flex items-center gap-1 w-full">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span>🚢</span>
                        <div className="h-px flex-1 bg-gray-300" />
                      </div>
                      <div className="text-xs text-gray-400">{segment.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{segment.arrival}</div>
                      <div className="text-sm text-gray-500">{segment.to}</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-400">🚢 {segment.airline}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Kabinenkategorie</label>
                  <div className="grid grid-cols-3 gap-3">
                    {CABIN_TYPES.map((c) => (
                      <button key={c} onClick={() => setCabin(c)}
                        className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${cabin === c ? "border-[#0EA5E9] bg-sky-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <span className="text-2xl mb-2">{CABIN_ICONS[c]}</span>
                        <span className={`font-bold text-sm ${cabin === c ? "text-[#0EA5E9]" : "text-gray-800"}`}>{c}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{CABIN_DESC[c]}</span>
                        <span className={`text-lg font-bold mt-2 ${cabin === c ? "text-[#0EA5E9]" : "text-gray-900"}`}>€{segment.cabins[c]}</span>
                        <span className="text-xs text-gray-400">pro Person</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Anzahl Reisende</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setPersons((p) => Math.max(1, p - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">−</button>
                    <span className="text-2xl font-bold w-8 text-center text-gray-900">{persons}</span>
                    <button onClick={() => setPersons((p) => Math.min(6, p + 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">+</button>
                    <span className="text-sm text-gray-400 ml-2">{persons === 1 ? "Person" : "Personen"}</span>
                  </div>
                </div>
                <button onClick={() => setStep(1)}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#0EA5E9" }}>
                  Weiter zu den Reisedaten →
                </button>
              </div>
            )}

            {/* STEP 1: Reisende */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-1" style={{ color: "#0A2342" }}>Reisende</h2>
                <p className="text-sm text-gray-400 mb-6">Bitte gib die Daten aller {persons} {persons === 1 ? "Person" : "Personen"} ein</p>
                {travellers.map((t, i) => (
                  <div key={i} className="mb-6 p-4 rounded-xl border border-gray-100 bg-gray-50">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">
                      Reisende {i + 1} {i === 0 && <span className="text-xs text-gray-400">(Hauptkontakt)</span>}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Vorname *</label>
                        <input type="text" value={t.firstName} onChange={(e) => updateTraveller(i, "firstName", e.target.value)}
                          placeholder="Max"
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors[`firstName_${i}`] ? "border-red-400" : "border-gray-200"}`} />
                        {errors[`firstName_${i}`] && <p className="text-xs text-red-400 mt-1">{errors[`firstName_${i}`]}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Nachname *</label>
                        <input type="text" value={t.lastName} onChange={(e) => updateTraveller(i, "lastName", e.target.value)}
                          placeholder="Mustermann"
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors[`lastName_${i}`] ? "border-red-400" : "border-gray-200"}`} />
                        {errors[`lastName_${i}`] && <p className="text-xs text-red-400 mt-1">{errors[`lastName_${i}`]}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Geburtsdatum *</label>
                        <input type="date" value={t.birthDate} onChange={(e) => updateTraveller(i, "birthDate", e.target.value)}
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors[`birthDate_${i}`] ? "border-red-400" : "border-gray-200"}`} />
                        {errors[`birthDate_${i}`] && <p className="text-xs text-red-400 mt-1">{errors[`birthDate_${i}`]}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Reisepass-Nr. (optional)</label>
                        <input type="text" value={t.passportNumber} onChange={(e) => updateTraveller(i, "passportNumber", e.target.value)}
                          placeholder="C01X00T47"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]" />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)}
                    className="flex-1 py-3.5 rounded-xl font-semibold text-base border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">← Zurück</button>
                  <button onClick={() => { if (validateTravellers()) setStep(2); }}
                    className="flex-1 py-3.5 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#0EA5E9" }}>Weiter zur Zahlung →</button>
                </div>
              </div>
            )}

            {/* STEP 2: Zahlung */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold mb-1" style={{ color: "#0A2342" }}>Zahlung</h2>
                <p className="text-sm text-gray-400 mb-6">Sichere Zahlung mit SSL-Verschlüsselung 🔒</p>
                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-1 block">E-Mail für Buchungsbestätigung *</label>
                  <input type="email" value={payment.email} onChange={(e) => setPayment((p) => ({ ...p, email: e.target.value }))}
                    placeholder="max@beispiel.de"
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] ${errors.email ? "border-red-400" : "border-gray-200"}`} />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
                <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Kartendaten</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Name auf der Karte *</label>
                      <input type="text" value={payment.cardName} onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))}
                        placeholder="Max Mustermann"
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white ${errors.cardName ? "border-red-400" : "border-gray-200"}`} />
                      {errors.cardName && <p className="text-xs text-red-400 mt-1">{errors.cardName}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Kartennummer *</label>
                      <input type="text" value={payment.cardNumber}
                        onChange={(e) => setPayment((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                        placeholder="1234 5678 9012 3456" maxLength={19}
                        className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white ${errors.cardNumber ? "border-red-400" : "border-gray-200"}`} />
                      {errors.cardNumber && <p className="text-xs text-red-400 mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Ablaufdatum *</label>
                        <input type="text" value={payment.expiry}
                          onChange={(e) => { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2); setPayment((p) => ({ ...p, expiry: v })); }}
                          placeholder="MM/JJ" maxLength={5}
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white ${errors.expiry ? "border-red-400" : "border-gray-200"}`} />
                        {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">CVV *</label>
                        <input type="text" value={payment.cvv}
                          onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          placeholder="123" maxLength={4}
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-white ${errors.cvv ? "border-red-400" : "border-gray-200"}`} />
                        {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <label className="flex items-start gap-3 mb-6 cursor-pointer">
                  <input type="checkbox" checked={payment.acceptTerms}
                    onChange={(e) => setPayment((p) => ({ ...p, acceptTerms: e.target.checked }))}
                    className="mt-0.5 accent-[#0EA5E9]" />
                  <span className="text-xs text-gray-500">
                    Ich akzeptiere die <span className="text-[#0EA5E9] underline cursor-pointer">AGB</span> und <span className="text-[#0EA5E9] underline cursor-pointer">Datenschutzerklärung</span> von CruiseSplit.
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-xs text-red-400 -mt-4 mb-4">{errors.acceptTerms}</p>}
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl font-semibold text-base border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">← Zurück</button>
                  <button onClick={handlePayment} disabled={loading}
                    className="flex-1 py-3.5 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#0EA5E9" }}>
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Wird verarbeitet…</>
                    ) : (
                      <>🔒 Jetzt €{grandTotal} bezahlen</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#0A2342" }}>Deine Buchung</h3>
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: "#0A2342" }}>
                  {segment.airline.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{segment.from} → {segment.to}</div>
                  <div className="text-xs text-gray-400">{segment.date} · {segment.days} Tage</div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm mb-4 pb-4 border-b border-gray-100">
                <div className="flex justify-between text-gray-600"><span>{cabin}</span><span>€{pricePerPerson}</span></div>
                <div className="flex justify-between text-gray-600"><span>× {persons} {persons === 1 ? "Person" : "Personen"}</span><span>€{totalPrice}</span></div>
                <div className="flex justify-between text-gray-400 text-xs"><span>Service-Gebühr (5%)</span><span>€{serviceFee}</span></div>
              </div>
              <div className="flex justify-between font-bold text-base" style={{ color: "#0A2342" }}>
                <span>Gesamt</span><span>€{grandTotal}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-400"><span>🔒</span><span>SSL-verschlüsselte Zahlung</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-400"><span>✓</span><span>Kostenlose Stornierung bis 48h vorher</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-400"><span>✓</span><span>Sofortige Buchungsbestätigung</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-400 text-sm">Laden…</div>}>
      <BookingContent />
    </Suspense>
  );
}
