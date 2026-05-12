import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import { Link } from "@/i18n/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tFooter = await getTranslations("footer");

  const stats = [
    { value: "12+", label: t("stats.segments") },
    { value: "4", label: t("stats.routes") },
    { value: "ab €249", label: t("stats.perPerson") },
  ];

  const cards = [
    { icon: "⚓", title: t("features.flex.title"), text: t("features.flex.text") },
    { icon: "💶", title: t("features.affordable.title"), text: t("features.affordable.text") },
    { icon: "🌍", title: t("features.audience.title"), text: t("features.audience.text") },
  ];

  return (
    <div className="flex flex-col min-h-full font-sans">
      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center px-8 min-h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl w-full">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10">
            {t("badge")}
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
            {t("title")}
          </h1>

          <p className="text-lg text-gray-300 max-w-xl">{t("subtitle")}</p>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/segmente"
              className="px-8 py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0EA5E9" }}
            >
              {t("ctaDiscover")}
            </Link>
            <Link
              href="/routen"
              className="px-8 py-3 rounded-full font-semibold text-base transition-all hover:bg-white/20 border border-white/40 text-white"
            >
              {t("ctaRoutes")}
            </Link>
          </div>

          <div className="flex gap-8 mt-2 flex-wrap justify-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl p-6 text-left"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#0A2342" }} className="py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-3">{t("partnerCta.heading")}</h2>
          <p className="text-blue-200 mb-8">{t("partnerCta.text")}</p>
          <Link
            href="/ueber-uns"
            className="px-8 py-3 rounded-full font-semibold text-base transition-opacity hover:opacity-90 text-white border border-white/40 hover:bg-white/10"
          >
            {t("partnerCta.button")}
          </Link>
        </div>
      </section>

      <footer className="bg-gray-100 border-t border-gray-200 py-6 px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
          <span>{tFooter("copyright")}</span>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-gray-600 transition-colors">
              {tFooter("impressum")}
            </Link>
            <Link href="/datenschutz" className="hover:text-gray-600 transition-colors">
              {tFooter("privacy")}
            </Link>
            <Link href="/agb" className="hover:text-gray-600 transition-colors">
              {tFooter("terms")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
