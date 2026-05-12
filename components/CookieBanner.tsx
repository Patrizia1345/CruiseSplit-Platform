"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const STORAGE_KEY = "cs-cookie-consent-v1";

type Consent = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  timestamp: string;
};

function loadConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(consent: Omit<Consent, "necessary" | "timestamp">) {
  const payload: Consent = {
    necessary: true,
    statistics: consent.statistics,
    marketing: consent.marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("cs-consent-change", { detail: payload }));
}

export default function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = loadConsent();
    if (!existing) setVisible(true);

    const reopen = () => {
      const current = loadConsent();
      if (current) {
        setStatistics(current.statistics);
        setMarketing(current.marketing);
      }
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener("cs-open-cookie-settings", reopen);
    return () => window.removeEventListener("cs-open-cookie-settings", reopen);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    saveConsent({ statistics: true, marketing: true });
    setVisible(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    saveConsent({ statistics: false, marketing: false });
    setVisible(false);
    setShowSettings(false);
  };

  const saveSelection = () => {
    saveConsent({ statistics, marketing });
    setVisible(false);
    setShowSettings(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-[100] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <h2
          id="cookie-banner-title"
          className="font-[var(--font-playfair)] text-lg font-semibold text-[#0A2342] sm:text-xl"
        >
          {t("heading")}
        </h2>
        <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-slate-700">
          {t("description")}
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-[#0A2342]">
            {t("privacyLink")}
          </Link>
          {t("descriptionSuffix")}
        </p>

        {showSettings && (
          <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start justify-between gap-4 opacity-70">
              <span>
                <span className="block text-sm font-medium text-slate-900">{t("categories.necessary.label")}</span>
                <span className="block text-xs text-slate-600">
                  {t("categories.necessary.description")}
                </span>
              </span>
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-[#0A2342]" />
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium text-slate-900">{t("categories.statistics.label")}</span>
                <span className="block text-xs text-slate-600">
                  {t("categories.statistics.description")}
                </span>
              </span>
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0A2342]"
              />
            </label>

            <label className="flex items-start justify-between gap-4">
              <span>
                <span className="block text-sm font-medium text-slate-900">{t("categories.marketing.label")}</span>
                <span className="block text-xs text-slate-600">
                  {t("categories.marketing.description")}
                </span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#0A2342]"
              />
            </label>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          {!showSettings && (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {t("buttons.settings")}
            </button>
          )}
          <button
            type="button"
            onClick={rejectAll}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            {t("buttons.rejectAll")}
          </button>
          {showSettings && (
            <button
              type="button"
              onClick={saveSelection}
              className="rounded-full border border-[#0A2342] px-4 py-2 text-sm font-medium text-[#0A2342] hover:bg-slate-50"
            >
              {t("buttons.saveSelection")}
            </button>
          )}
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-full bg-[#0A2342] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a2342e6]"
          >
            {t("buttons.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
