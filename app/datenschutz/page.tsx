import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0A2342" }}>Datenschutzerklärung</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-semibold mb-1">Allgemeine Hinweise</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">2. Verantwortlicher</h2>
            <p>CruiseSplit, vertreten durch Patrizia Kröger<br />
            Köln, Deutschland<br />
            E-Mail: patrizia.kroeger@gmx.com</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">3. Datenerfassung auf dieser Website</h2>
            <h3 className="font-semibold mb-1">Cookies</h3>
            <p>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen.</p>

            <h3 className="font-semibold mt-3 mb-1">Server-Log-Dateien</h3>
            <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>

            <h3 className="font-semibold mt-3 mb-1">Buchungsdaten</h3>
            <p>Wenn Sie eine Buchung durchführen, erheben wir die von Ihnen eingegebenen Daten (Name, Geburtsdatum, E-Mail-Adresse, Reisepass-Nummer) zur Durchführung der Buchung. Diese Daten werden ausschließlich zur Abwicklung Ihrer Buchung verwendet und nicht an Dritte weitergegeben, außer an die jeweilige Reederei zur Durchführung der Reise.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">4. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">5. Hosting</h2>
            <p>Diese Website wird bei Vercel Inc., 340 Pine Street Suite 701, San Francisco, California 94104, USA gehostet. Weitere Informationen finden Sie in der Datenschutzerklärung von Vercel: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">https://vercel.com/legal/privacy-policy</a></p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">6. Widerrufsrecht</h2>
            <p>Buchungen können bis 48 Stunden vor Abfahrt kostenlos storniert werden. Zur Ausübung des Widerrufsrechts wenden Sie sich bitte an: patrizia.kroeger@gmx.com</p>
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
