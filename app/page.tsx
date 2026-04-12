import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <Navbar />

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center px-8 py-32 flex-1"
        style={{ backgroundColor: "#0A2342" }}
      >
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Kreuzfahrt neu gedacht
        </h1>
        <p className="text-lg text-gray-400 mb-10 max-w-xl">
          Buche einzelne Kreuzfahrt-Segmente ab €249 für 2 Tage
        </p>
        <Link
          href="/segmente"
          className="px-8 py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0EA5E9" }}
        >
          Segmente entdecken
        </Link>
      </section>

      {/* Cards Section */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-3xl mb-4">⚓</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexibel reisen
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Wähle nur die Abschnitte, die zu deinem Zeitplan passen – ohne
              eine komplette Reise buchen zu müssen.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-3xl mb-4">💶</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Günstig einsteigen
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Erlebe Kreuzfahrten zu einem Bruchteil des Preises – perfekt für
              Erstbucher und Kurzurlauber.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Neue Zielgruppen
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              CruiseSplit öffnet die Kreuzfahrtwelt für junge Reisende,
              Berufstätige und alle, die Flexibilität schätzen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
