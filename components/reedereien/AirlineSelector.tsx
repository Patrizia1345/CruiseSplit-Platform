"use client";

import { motion } from "framer-motion";
import type { Airline } from "@/lib/reedereien/types";

interface Props {
  airlines: Airline[];
  active: string;
  onSelect: (id: string) => void;
}

export default function AirlineSelector({ airlines, active, onSelect }: Props) {
  return (
    <div
      className="sticky top-16 z-40 flex items-center gap-3 px-8 md:px-20 py-3 overflow-x-auto"
      style={{
        backgroundColor: "rgba(8,8,8,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {airlines.map((a) => {
        const isActive = active === a.id;
        return (
          <motion.button
            key={a.id}
            onClick={() => onSelect(a.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors duration-300"
            style={{
              backgroundColor: isActive ? `${a.color}30` : "rgba(255,255,255,0.04)",
              color: isActive ? "white" : "rgba(255,255,255,0.35)",
              border: `1px solid ${isActive ? a.accentColor + "80" : "rgba(255,255,255,0.07)"}`,
            }}
          >
            {/* Logo dot */}
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0"
              style={{
                fontSize: "9px",
                fontWeight: 700,
                backgroundColor: isActive ? a.accentColor : "rgba(255,255,255,0.12)",
              }}
            >
              {a.logoLetter}
            </div>
            {a.name.split(" ")[0]}

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${a.accentColor}50` }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}

      {/* Coming soon */}
      <div
        className="flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest whitespace-nowrap"
        style={{
          color: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span style={{ fontSize: "10px" }}>+</span>
        Weitere folgen
      </div>
    </div>
  );
}
