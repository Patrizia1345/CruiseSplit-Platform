"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Airline } from "@/lib/reedereien/types";

interface Props {
  airline: Airline;
}

const STATS = (a: Airline) => [
  { label: "Gegründet", value: a.founded },
  { label: "Longships", value: a.ships },
  { label: "Routen", value: a.routes },
  { label: "Ab Preis", value: `€${a.priceFrom}` },
];

export default function VideoHero({ airline }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0px", "-40px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.92]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.4;
    const onReady = () => setVideoReady(true);
    video.addEventListener("canplay", onReady);
    return () => video.removeEventListener("canplay", onReady);
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">

      {/* ── Video Layer ── */}
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y: videoY, scale: 1.1 }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-opacity duration-[1500ms]"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          <source src={airline.heroVideo} type="video/mp4" />
        </video>

        {!videoReady && (
          <img
            src={airline.heroImage}
            alt={airline.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: airline.color, opacity: 0.12 }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 50%, rgba(8,8,8,1) 100%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end px-8 md:px-20 pb-16 md:pb-24"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-2xl"
            style={{ backgroundColor: airline.color, fontSize: "15px" }}
          >
            {airline.logoLetter}
          </div>
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              CruiseSplit Partner
            </p>
            <p className="text-sm text-white font-medium">{airline.name}</p>
          </div>
        </motion.div>

        <motion.h1
          className="mb-6 leading-none"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white block">VIKING</span>
          <span
            className="block"
            style={{
              color: airline.accentColor,
              WebkitTextStroke: "1px " + airline.accentColor,
            }}
          >
            RIVER CRUISES
          </span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-md"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {airline.tagline}
        </motion.p>

        <motion.div
          className="flex gap-8 md:gap-12 flex-wrap mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {STATS(airline).map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="text-xs uppercase tracking-[0.2em] mb-1"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {stat.label}
              </span>
              <span
                className="font-semibold"
                style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              className="w-px bg-white/20"
              animate={{ height: ["16px", "32px", "16px"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: airline.accentColor }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <span
            className="text-xs uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Scrollen
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
