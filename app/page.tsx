import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <Navbar />

      {/* Hero Section – alles in einem Block */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 min-h-screen">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl w-full">

          {/* Badge */}
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10">
            Die erste Segment-Buchungsplattform
          </span>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            Kreuzfahrt neu gedacht
          </h1>

          {/* Subline */}
          <p className="text-lg text-gray-300 max-w-xl">
            Buche einzelne Kreuzfahrt-Segmente ab €249 für 2 Tage –
            flexibel, günstig und spontan.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/segmente"
              className="px-8 py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              Segmente entdecken
            </Link>
            <Link
              href="/routen"
              className="px-8 py-3 rounded-full font-semibold text-base transition-all hover:bg-white/20 border border-white/40 text-white"
            >
              Routen ansehen
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-2 flex-wrap justify-center">
            {[
              { value: "12+", label: "Segmente" },
              { value: "4", label: "Routen" },
              { value: "ab €249", label: "pro Person" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Drei Karten über dem Video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
            {[
              {
                icon: "⚓",
                title: "Flexibel reisen",
                text: "Wähle nur die Abschnitte, die zu deinem Zeitplan passen – ohne eine komplette Reise buchen zu müssen.",
              },
              {
                icon: "💶",
                title: "Günstig einsteigen",
                text: "Erlebe Kreuzfahrten zu einem Bruchteil des Preises – perfekt für Erstbucher und Kurzurlauber.",
              },
              {
                icon: "🌍",
                title: "Neue Zielgruppen",
                text: "CruiseSplit öffnet die Kreuzfahrtwelt für junge Reisende, Berufstätige und alle, die Flexibilität schätzen.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6 text-left"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section für Reedereien */}
      <section style={{ backgroundColor: "#0A2342" }} className="py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">
            Bist du eine Reederei?
          </h2>
          <p className="text-blue-200 mb-8">
            Monetarisiere unverkaufte Kabinen ohne operativen Mehraufwand.
            75% Revenue Share, keine Fixkosten.
          </p>
          <Link
            href="/ueber-uns"
            className="px-8 py-3 rounded-full font-semibold text-base transition-opacity hover:opacity-90 text-white border border-white/40 hover:bg-white/10"
          >
            Partnerschaft anfragen →
          </Link>
        </div>
      </section>
    </div>
  );
}
