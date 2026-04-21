import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0A2342" }}>Impressum</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
            <p>CruiseSplit<br />
            vertreten durch Patrizia Kröger<br />
            Köln, Deutschland</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Kontakt</h2>
            <p>E-Mail: <a href="mailto:patrizia.kroeger@gmx.com" className="text-[#0EA5E9] hover:underline">patrizia.kroeger@gmx.com</a><br />
            Telefon: +49 178 175 8089</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Plattform der EU-Kommission zur Online-Streitbeilegung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">https://ec.europa.eu/consumers/odr</a><br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Haftung für Inhalte</h2>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Haftung für Links</h2>
            <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
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
