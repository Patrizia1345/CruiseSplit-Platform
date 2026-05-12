import Navbar from "@/components/Navbar";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#0A2342" }}>{t("heading")}</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s1Heading")}</h2>
            <h3 className="font-semibold mb-1">{t("s1Sub")}</h3>
            <p>{t("s1Body")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s2Heading")}</h2>
            <p className="whitespace-pre-line">{t("s2Body")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s3Heading")}</h2>
            <h3 className="font-semibold mb-1">{t("s3CookiesSub")}</h3>
            <p>{t("s3CookiesBody")}</p>

            <h3 className="font-semibold mt-3 mb-1">{t("s3LogsSub")}</h3>
            <p>{t("s3LogsBody")}</p>

            <h3 className="font-semibold mt-3 mb-1">{t("s3BookingSub")}</h3>
            <p>{t("s3BookingBody")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s4Heading")}</h2>
            <p>{t("s4Body")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s5Heading")}</h2>
            <p>{t("s5Body")}</p>
          </section>

          <section>
            <h2 className="font-bold text-gray-900 mb-2">{t("s6Heading")}</h2>
            <p>{t("s6Body")}</p>
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
