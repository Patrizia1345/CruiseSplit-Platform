"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import HomeSearchBar from "./HomeSearchBar";

const SYNE = "var(--font-syne), 'DM Sans', system-ui, sans-serif";

export default function HomeHero() {
  const t = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.5;
    video.oncanplay = () => setVideoLoaded(true);
  }, []);

  const trustItems = [
    t("trustCancellation"),
    t("trustBestPrice"),
    t("trustSecure"),
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "95vh", display: "flex", alignItems: "center" }}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-[2000ms]"
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {!videoLoaded && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #0A1628 0%, #0A2342 50%, #0d3060 100%)",
            }}
          />
        )}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "linear-gradient(135deg, #0066FF 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
        <h1
          className="text-center mb-4 leading-none text-white"
          style={{
            fontFamily: SYNE,
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          {t("titleLine1")}
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("titleLine2")}
          </span>
        </h1>

        <p
          className="text-center mb-10 max-w-lg mx-auto"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.6,
          }}
        >
          {t("subtitle")}
          <br />
        </p>

        <HomeSearchBar />

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {trustItems.map((item) => (
            <span
              key={item}
              className="text-xs font-medium"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div
          className="w-px animate-pulse"
          style={{
            height: "40px",
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))",
          }}
        />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </section>
  );
}
