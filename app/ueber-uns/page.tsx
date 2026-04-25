import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function UeberUns() {
  return (
    <div className="flex flex-col min-h-full font-sans">
      <Navbar />

      {/* ── Hero mit Video ── */}
      <section className="relative flex items-center justify-center text-center px-8 py-28 min-h-[60vh]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ueber-uns-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10" style={{ color: "#0EA5E9" }}>
            Über CruiseSplit
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Wir revolutionieren die Kreuzfahrtindustrie
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            CruiseSplit macht Kreuzfahrten flexibel, erschwinglich und spontan buchbar
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-white px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0A2342" }}>
            Unsere Mission
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Die Kreuzfahrtindustrie verkauft seit Jahrzehnten nur Komplettrouten
            von 7–14 Tagen. Wir ändern das. CruiseSplit ist die erste Plattform,
            die einzelne Kreuzfahrt-Segmente buchbar macht — für Reisende, die
            flexibel bleiben wollen, und für Reedereien, die unverkaufte Kabinen
            monetarisieren möchten.
          </p>
        </div>
      </section>

      {/* ── Problem & Lösung ── */}
      <section className="bg-gray-50 px-8 py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Das Problem */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-xl">
                ⚠️
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#0A2342" }}>
                Das Problem
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                "Nur Komplettrouten von 7–14 Tagen buchbar",
                "Hohe Einstiegspreise ab €1.500 schrecken ab",
                "Spontanreisen kaum möglich",
                "Unverkaufte Kabinen verursachen Verluste",
                "Junge Reisende & Berufstätige werden ausgeschlossen",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-50 text-red-400 flex items-center justify-center text-xs font-bold shrink-0">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Die Lösung */}
          <div
            className="rounded-2xl shadow-sm p-8"
            style={{ backgroundColor: "#0A2342" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: "rgba(14,165,233,0.2)" }}
              >
                ✦
              </div>
              <h3 className="text-xl font-bold text-white">Die Lösung</h3>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                "Segment-Buchungen ab 2 Tagen",
                "Einstiegspreise ab €249 pro Person",
                "Spontan & flexibel — Last-Minute buchbar",
                "Revenue-Share-Modell für Reedereien",
                "Neue Zielgruppen: 18–35 Jahre & Geschäftsreisende",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{ backgroundColor: "#0EA5E9" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── Team ── */}
      <section className="bg-gray-50 px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-3"
            style={{ color: "#0A2342" }}
          >
            Das Team
          </h2>
          <p className="text-center text-gray-400 text-sm mb-12">
            Erfahrene Köpfe aus Travel-Tech, Schifffahrt und Start-ups
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* CEO — Patrizia Kröger */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-4">
              <Image
                src="/patrizia.jpg"
                alt="Patrizia Kröger"
                width={160}
                height={160}
                className="rounded-full object-cover object-top w-40 h-40"
              />
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#0EA5E9" }}
                >
                  CEO
                </div>
                <div className="text-base font-bold" style={{ color: "#0A2342" }}>
                  Patrizia Kröger
                </div>
                <div className="text-xs text-gray-400 mt-1">CEO & Co-Founder</div>
              </div>
            </div>

            {/* CTO — Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                👤
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#0EA5E9" }}
                >
                  CTO
                </div>
                <div className="text-base font-bold" style={{ color: "#0A2342" }}>
                  Coming Soon
                </div>
                <div className="text-xs text-gray-400 mt-1">CTO & Co-Founder</div>
              </div>
            </div>

            {/* COO — Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl">
                👤
              </div>
              <div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#0EA5E9" }}
                >
                  COO
                </div>
                <div className="text-base font-bold" style={{ color: "#0A2342" }}>
                  Coming Soon
                </div>
                <div className="text-xs text-gray-400 mt-1">COO & Co-Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kontakt / CTA ── */}
      <section
        className="px-8 py-20 text-center"
        style={{ backgroundColor: "#0A2342" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "#0EA5E9" }}
        >
          Partnerschaft
        </p>
        <h2 className="text-3xl font-bold text-white mb-4">
          Interesse an einer Partnerschaft?
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          Ob Reederei, Reisebüro oder Investor — wir freuen uns auf das
          Gespräch. Schreib uns und wir melden uns innerhalb von 24 Stunden.
        </p>
        <a
          href="https://cruisesplit.netlify.app/#kontakt"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0EA5E9" }}
        >
          Gespräch vereinbaren
        </a>
      </section>
    </div>
  );
}
