"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Airline } from "@/lib/reedereien/types";

interface Props {
  airline: Airline;
}

const STATS = [
  { value: "8", label: "Buchbare Segmente" },
  { value: "ab 1 Tag", label: "Mindestbuchung" },
  { value: "€249", label: "Ab Preis / Person" },
  { value: "75%", label: "Revenue für Viking" },
];

export default function CTASection({ airline }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img
          src={airline.heroImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.12 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${airline.color}20 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Top border line */}
      <div
        className="absolute top-0 left-8 md:left-20 right-8 md:right-20 h-px"
        style={{ background: `linear-gradient(to right, ${airline.accentColor}40, transparent)` }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-xs uppercase tracking-[0.25em] mb-5"
              style={{ color: airline.accentColor }}
            >
              Jetzt buchen
            </p>
            <h2
              className="mb-5 leading-none"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "white",
              }}
            >
              Dein Rhein-Segment
              <br />
              <span style={{ color: "rgba(255,255,255,0.3)" }}>wartet auf dich.</span>
            </h2>
            <p
              className="max-w-md text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              8 Segmente auf der Rhine Getaway Route – einzeln buchbar ab 1 Tag.
              Flexible Reisen, neue Zielgruppen, gemeinsames Wachstum.
            </p>
          </motion.div>

          {/* Right: Buttons */}
          <motion.div
            className="flex flex-col gap-3 lg:items-end shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={airline.segmentsHref}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: airline.accentColor, color: "white" }}
            >
              <span>Segmente entdecken</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>

            <Link
              href="/routen"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest transition-all duration-300 hover:bg-white/5"
              style={{
                color: "rgba(255,255,255,0.45)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Alle Routen ansehen
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 md:mt-20 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
            >
              <p
                className="font-bold mb-1"
                style={{
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: "white",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs uppercase tracking-[0.15em]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
