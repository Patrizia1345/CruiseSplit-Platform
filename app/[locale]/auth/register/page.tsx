"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

type UserType = "private" | "partner";

export default function RegisterPage() {
  const t = useTranslations("register");
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<UserType>("private");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
          company_name: userType === "partner" ? company : null,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push(userType === "partner" ? "/reederei-dashboard" : "/segmente");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col min-h-full font-sans bg-gray-50">
        <Navbar />
        <div className="flex flex-1 items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#0A2342" }}>
              {t("successHeading")}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t("successText")}
            </p>
            <Link href="/auth/login" className="mt-6 inline-block text-sm font-semibold" style={{ color: "#0EA5E9" }}>
              {t("successLink")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const accountTypeOptions = [
    { value: "private" as const, label: t("private"), icon: "👤" },
    { value: "partner" as const, label: t("partner"), sublabel: t("partnerSubtitle"), icon: "🏢" },
  ];

  return (
    <div className="flex flex-col min-h-full font-sans bg-gray-50">
      <Navbar />
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold" style={{ color: "#0A2342" }}>{t("heading")}</h1>
            <p className="text-sm text-gray-400 mt-1">
              <a href="/auth/login" className="font-semibold hover:underline" style={{ color: "#0EA5E9" }}>{t("loginLink")}</a>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("firstName")}</label>
                <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t("firstNamePlaceholder")}
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("lastName")}</label>
                <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t("lastNamePlaceholder")}
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("email")}</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")}
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("password")}</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("passwordPlaceholder")} minLength={8}
                className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("accountType")}</span>
              <div className="grid grid-cols-2 gap-3">
                {accountTypeOptions.map((opt) => (
                  <label key={opt.value} className={`flex flex-col gap-0.5 border rounded-xl px-4 py-3 cursor-pointer transition-all ${userType === opt.value ? "border-[#0EA5E9] bg-sky-50" : "border-gray-200 hover:border-[#0EA5E9]"}`}>
                    <input type="radio" name="userType" value={opt.value} checked={userType === opt.value} onChange={() => setUserType(opt.value)} className="sr-only" />
                    <span className="text-lg">{opt.icon}</span>
                    <span className="text-sm font-semibold" style={{ color: userType === opt.value ? "#0EA5E9" : "#0A2342" }}>{opt.label}</span>
                    {"sublabel" in opt && opt.sublabel && <span className="text-xs text-gray-400">{opt.sublabel}</span>}
                  </label>
                ))}
              </div>
            </div>
            {userType === "partner" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t("company")}</label>
                <input required type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t("companyPlaceholder")}
                  className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] bg-gray-50 placeholder:text-gray-300" />
              </div>
            )}
            {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#0EA5E9" }}>
              {loading ? t("loading") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}