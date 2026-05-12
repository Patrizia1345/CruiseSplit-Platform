import Navbar from "@/components/Navbar";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impressum");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0A2342" }}>{t("heading")}</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("tmgHeading")}</h2>
            <p className="whitespace-pre-line">{t("tmgBody")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("contactHeading")}</h2>
            <p>E-Mail: <a href={`mailto:${t("contactEmail")}`} className="text-[#0EA5E9] hover:underline">{t("contactEmail")}</a><br />
            Telefon: +49 178 175 8089</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("disputeHeading")}</h2>
            <p>{t("disputeBody")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("liabilityHeading")}</h2>
            <p>{t("liabilityBody")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("linksHeading")}</h2>
            <p>{t("linksBody")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("copyrightHeading")}</h2>
            <p>{t("copyrightBody")}</p>
          </section>

          <p className="text-xs text-gray-400">{t("lastUpdated")}</p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#0EA5E9] hover:underline">{t("backToHome")}</Link>
        </div>
      </div>
    </div>
  );
}
