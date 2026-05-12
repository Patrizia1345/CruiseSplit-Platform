export const dynamic = "force-dynamic";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";

export default async function PartnerPendingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("partnerPending");

  const steps = [
    { step: "1", label: t("step1"), done: true },
    { step: "2", label: t("step2"), done: false, active: true },
    { step: "3", label: t("step3"), done: false },
  ];

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-lg w-full text-center">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            🕐
          </div>

          {/* Status badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {t("status")}
          </span>

          {/* Heading */}
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#0A2342" }}>
            {t("heading")}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            {t("description")}
          </p>

          {/* Steps */}
          <div className="flex flex-col gap-3 text-left mb-8">
            {steps.map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    item.done
                      ? "bg-emerald-100 text-emerald-600"
                      : item.active
                      ? "text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  style={item.active ? { backgroundColor: "#0EA5E9" } : {}}
                >
                  {item.done ? "✓" : item.step}
                </div>
                <span
                  className={`text-sm font-medium ${
                    item.done
                      ? "text-emerald-600"
                      : item.active
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 mb-1">{t("supportHeading")}</p>
            <a
              href="mailto:partner@cruisesplit.com"
              className="text-sm font-semibold hover:underline"
              style={{ color: "#0EA5E9" }}
            >
              {t("supportEmail")}
            </a>
          </div>

          {/* Back link */}
          <div className="mt-6">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {t("backToHome")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
