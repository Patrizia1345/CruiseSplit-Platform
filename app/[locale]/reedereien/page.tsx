"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import { AIRLINES } from "@/lib/reedereien/data";
import AirlineSelector from "@/components/reedereien/AirlineSelector";
import VideoHero from "@/components/reedereien/VideoHero";
import FeatureSection from "@/components/reedereien/FeatureSection";
import CTASection from "@/components/reedereien/CTASection";
import GrainOverlay from "@/components/GrainOverlay";
import { Link } from "@/i18n/navigation";

export default function ReedereienPage() {
  const tFooter = useTranslations("footer");
  const [activeId, setActiveId] = useState(AIRLINES[0].id);
  const airline = AIRLINES.find((a) => a.id === activeId) ?? AIRLINES[0];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#080808" }}>
      {/* Film grain overlay – fixed, over everything */}
      <GrainOverlay />

      {/* Global Navbar */}
      <Navbar />

      {/* Sticky airline selector */}
      <AirlineSelector
        airlines={AIRLINES}
        active={activeId}
        onSelect={setActiveId}
      />

      {/* Cinematic video hero */}
      <VideoHero airline={airline} />

      {/* Interactive feature section */}
      <FeatureSection airline={airline} />

      {/* Booking CTA */}
      <CTASection airline={airline} />

      {/* Footer */}
      <div
        className="px-8 md:px-20 py-8 flex items-center justify-between flex-wrap gap-4"
        style={{
          backgroundColor: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          className="text-xs uppercase tracking-[0.15em]"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {tFooter("copyright")}
        </p>
        <div className="flex gap-6">
          {[
            { label: tFooter("impressum"), href: "/impressum" },
            { label: tFooter("privacy"), href: "/datenschutz" },
            { label: tFooter("terms"), href: "/agb" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.12em] transition-colors duration-300 hover:text-white/50"
              style={{ color: "rgba(255,255,255,0.15)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
