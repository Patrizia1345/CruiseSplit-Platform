"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const DESTINATION_KEYS = [
  "mediterranean",
  "rhine",
  "danube",
  "caribbean",
  "northSea",
  "adriatic",
  "baltic",
  "atlantic",
  "northCape",
  "canary",
] as const;

const DURATION_KEYS = ["short", "medium", "long", "extended"] as const;

const POPULAR_KEYS = [
  "mediterraneanCheap",
  "rhineCruise",
  "shortTrip",
  "under500",
  "adriaticCroatia",
  "amsterdamBasel",
] as const;

export default function HomeSearchBar() {
  const t = useTranslations("home.search");

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [persons, setPersons] = useState(2);
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.6)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div
          className="flex flex-col px-5 py-4 cursor-pointer transition-colors"
          style={{
            background:
              focused === "dest" ? "rgba(0,102,255,0.04)" : "transparent",
          }}
          onClick={() => setFocused("dest")}
        >
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            {t("destinationLabel")}
          </label>
          <select
            className="text-sm font-medium text-gray-800 bg-transparent border-none outline-none cursor-pointer"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={() => setFocused("dest")}
            onBlur={() => setFocused(null)}
          >
            <option value="">{t("destinationPlaceholder")}</option>
            {DESTINATION_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`destinations.${key}`)}
              </option>
            ))}
          </select>
        </div>

        <div
          className="flex flex-col px-5 py-4 cursor-pointer transition-colors"
          style={{
            background:
              focused === "dur" ? "rgba(0,102,255,0.04)" : "transparent",
          }}
          onClick={() => setFocused("dur")}
        >
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            {t("durationLabel")}
          </label>
          <select
            className="text-sm font-medium text-gray-800 bg-transparent border-none outline-none cursor-pointer"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            onFocus={() => setFocused("dur")}
            onBlur={() => setFocused(null)}
          >
            <option value="">{t("durationPlaceholder")}</option>
            {DURATION_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`durations.${key}`)}
              </option>
            ))}
          </select>
        </div>

        <div
          className="flex flex-col px-5 py-4"
          style={{
            background:
              focused === "per" ? "rgba(0,102,255,0.04)" : "transparent",
          }}
        >
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
            {t("personsLabel")}
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPersons(Math.max(1, persons - 1))}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-sm"
            >
              −
            </button>
            <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
              {persons}
            </span>
            <button
              type="button"
              onClick={() => setPersons(Math.min(12, persons + 1))}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors text-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <Link
          href="/routen"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, #0066FF 0%, #0044CC 100%)",
            boxShadow: "0 4px 15px rgba(0,102,255,0.4)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM14 14l-3-3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {t("submit")}
        </Link>
      </div>

      <div className="px-5 pb-4 flex flex-wrap gap-2">
        <span className="text-xs text-gray-400">{t("popularLabel")}</span>
        {POPULAR_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            {t(`popular.${key}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
