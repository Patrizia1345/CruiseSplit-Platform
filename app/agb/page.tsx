import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0A2342" }}>Allgemeine Geschäftsbedingungen (AGB)</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 1 Geltungsbereich</h2>
            <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Buchungen über die Plattform CruiseSplit (cruisesplit.de), betrieben durch Patrizia Kröger, Köln. Mit der Buchung eines Segments akzeptiert der Nutzer diese AGB.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 2 Leistungsbeschreibung</h2>
            <p>CruiseSplit ist eine Buchungsplattform für einzelne Kreuzfahrt-Segmente. CruiseSplit vermittelt Buchungen zwischen Reisenden und Reedereien. CruiseSplit ist selbst kein Reiseveranstalter im Sinne des Reisevertragsrechts, sondern agiert als Vermittler.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 3 Buchung und Vertragsschluss</h2>
            <p>Mit dem Absenden einer Buchung gibt der Nutzer ein verbindliches Angebot ab. Der Vertrag kommt mit Zugang der Buchungsbestätigung per E-Mail zustande. In der Beta-Phase werden Buchungen manuell bestätigt. Der Nutzer wird per E-Mail über den Status seiner Buchung informiert.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 4 Preise und Zahlung</h2>
            <p>Alle angezeigten Preise sind Endpreise pro Person in Euro inkl. gesetzlicher MwSt. Die Zahlung erfolgt zum Zeitpunkt der Buchung. In der aktuellen Beta-Phase werden Zahlungsdetails nach Buchungseingang per E-Mail kommuniziert.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 5 Stornierung und Widerruf</h2>
            <p>Kostenlose Stornierung ist bis 48 Stunden vor Abfahrt möglich. Bei Stornierung weniger als 48 Stunden vor Abfahrt wird eine Stornogebühr von 50% des Buchungspreises erhoben. Stornierungen sind per E-Mail an patrizia.kroeger@gmx.com zu richten.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 6 Haftung</h2>
            <p>CruiseSplit haftet nicht für Leistungen der Reedereien, Verspätungen, Ausfälle oder sonstige Umstände, die außerhalb des Einflussbereichs von CruiseSplit liegen. Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 7 Datenschutz</h2>
            <p>Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer <Link href="/datenschutz" className="text-[#0EA5E9] hover:underline">Datenschutzerklärung</Link>.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">§ 8 Anwendbares Recht</h2>
            <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Köln.</p>
          </section>

          <p className="text-xs text-gray-400">Stand: April 2026</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#0EA5E9] hover:underline">← Zurück zur Startseite</Link>
        </div>
      </div>
    </div>
  );
}
