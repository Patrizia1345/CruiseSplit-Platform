import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/home/HomeHero";
import { Link } from "@/i18n/navigation";

const SYNE = "var(--font-syne), 'DM Sans', system-ui, sans-serif";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tFooter = await getTranslations("footer");

  const trustStats = [
    { value: t("stats.partnersValue"), label: t("stats.partnersLabel") },
    { value: t("stats.ratingValue"), label: t("stats.ratingLabel") },
    { value: t("stats.priceValue"), label: t("stats.priceLabel") },
    { value: t("stats.supportValue"), label: t("stats.supportLabel") },
  ];

  const steps = [
    {
      step: "01",
      icon: "🔍",
      title: t("howItWorks.step1Title"),
      text: t("howItWorks.step1Text"),
      color: "#EEF5FF",
      accent: "#0066FF",
    },
    {
      step: "02",
      icon: "⚡",
      title: t("howItWorks.step2Title"),
      text: t("howItWorks.step2Text"),
      color: "#F5F0FF",
      accent: "#7C3AFF",
    },
    {
      step: "03",
      icon: "🚢",
      title: t("howItWorks.step3Title"),
      text: t("howItWorks.step3Text"),
      color: "#FFF0EE",
      accent: "#FF6432",
    },
  ];

  const whyUs = [
    { icon: "⚡", title: t("whyUs.fastTitle"), text: t("whyUs.fastText") },
    { icon: "💸", title: t("whyUs.bestPriceTitle"), text: t("whyUs.bestPriceText") },
    { icon: "🎯", title: t("whyUs.forYouTitle"), text: t("whyUs.forYouText") },
    { icon: "🛡️", title: t("whyUs.secureTitle"), text: t("whyUs.secureText") },
  ];

  const footerLinks = [
    { label: tFooter("impressum"), href: "/impressum" as const },
    { label: tFooter("privacy"), href: "/datenschutz" as const },
    { label: tFooter("terms"), href: "/agb" as const },
    { label: tFooter("about"), href: "/ueber-uns" as const },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#FAFAFA" }}>
      <Navbar />

      <HomeHero />

      {/* ── STATS ── */}
      <section
        className="py-14 px-6"
        style={{
          background: "white",
          borderTop: "1px solid #F0F0F0",
          borderBottom: "1px solid #F0F0F0",
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustStats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div
                className="font-black mb-1"
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  background: "linear-gradient(135deg, #0066FF, #7C3AFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: SYNE,
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 leading-tight whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6" style={{ background: "#FAFAFA" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">
              {t("howItWorks.kicker")}
            </p>
            <h2
              className="font-black leading-none"
              style={{
                fontFamily: SYNE,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              {t("howItWorks.heading")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-7 relative overflow-hidden"
                style={{
                  background: item.color,
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="absolute top-4 right-4 font-black opacity-10"
                  style={{
                    fontSize: "64px",
                    color: item.accent,
                    fontFamily: SYNE,
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "#0A0A0A" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CRUISESPLIT ── */}
      <section className="py-20 px-6" style={{ background: "white" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">
              {t("whyUs.kicker")}
            </p>
            <h2
              className="font-black leading-none"
              style={{
                fontFamily: SYNE,
                fontSize: "clamp(28px, 4vw, 48px)",
                color: "#0A0A0A",
                letterSpacing: "-0.02em",
              }}
            >
              {t("whyUs.headingLine1")}
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0066FF 0%, #7C3AFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("whyUs.headingLine2")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl transition-all hover:shadow-md"
                style={{ background: "#FAFAFA", border: "1px solid #F0F0F0" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "white", border: "1px solid #F0F0F0" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#0A0A0A" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER CTA ── */}
      <section className="py-20 px-6" style={{ background: "#FAFAFA" }}>
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
            style={{
              background: "linear-gradient(135deg, #0066FF 0%, #7C3AFF 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            <div className="relative z-10">
              <div className="text-4xl mb-4">🤝</div>
              <h2
                className="font-black text-white mb-4 leading-none"
                style={{
                  fontFamily: SYNE,
                  fontSize: "clamp(24px, 4vw, 42px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("partnerCta.heading")}
              </h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                {t("partnerCta.text")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/ueber-uns"
                  className="px-8 py-3.5 rounded-xl bg-white font-bold text-sm transition-all hover:scale-105"
                  style={{ color: "#0066FF" }}
                >
                  {t("partnerCta.ctaPrimary")}
                </Link>
                <Link
                  href="/reedereien"
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  {t("partnerCta.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMING SOON SEGMENT TEASER ── */}
      <section
        className="py-12 px-6"
        style={{ background: "white", borderTop: "1px solid #F0F0F0" }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "#F8F8F8", border: "2px dashed #E0E0E0" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "white", border: "1px solid #E0E0E0" }}
              >
                ✂️
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                    style={{ background: "#0066FF" }}
                  >
                    {t("comingSoon.badge")}
                  </span>
                </div>
                <h3 className="font-bold text-base" style={{ color: "#0A0A0A" }}>
                  {t("comingSoon.title")}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t("comingSoon.subtitle")}
                </p>
              </div>
            </div>
            <a
              href={`mailto:patrizia@cruisesplit.com?subject=${encodeURIComponent(
                t("comingSoon.mailtoSubject")
              )}`}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #0066FF, #7C3AFF)",
                color: "white",
              }}
            >
              {t("comingSoon.cta")}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 py-8"
        style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="font-black text-lg text-white"
              style={{ fontFamily: SYNE }}
            >
              CruiseSplit
            </span>
            <span className="text-gray-600 text-xs">{t("footerCopyright")}</span>
          </div>
          <div className="flex gap-6">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
