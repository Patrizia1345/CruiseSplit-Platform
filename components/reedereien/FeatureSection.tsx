"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Airline } from "@/lib/reedereien/types";

interface Props {
  airline: Airline;
}

export default function FeatureSection({ airline }: Props) {
  const [activeFeature, setActiveFeature] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div
      className="relative py-32 md:py-40 px-8 md:px-20"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Seamless top transition from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #080808, transparent)",
          zIndex: 1,
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.25em] mb-4"
              style={{ color: airline.accentColor }}
            >
              Ausstattung & Highlights
            </p>
            <h2
              className="leading-none"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: "white",
              }}
            >
              Was macht
              <br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>Viking besonders?</span>
            </h2>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed md:text-right"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {airline.description}
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* Left: Feature list */}
          <motion.div
            className="flex flex-col gap-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {airline.features.map((feature, i) => {
              const isActive = activeFeature === i;
              return (
                <motion.button
                  key={feature.number}
                  variants={itemVariants}
                  onClick={() => setActiveFeature(i)}
                  className="text-left w-full"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="rounded-xl p-5 md:p-6 transition-colors duration-300 border"
                    style={{
                      backgroundColor: isActive
                        ? `${airline.color}18`
                        : "rgba(255,255,255,0.025)",
                      borderColor: isActive
                        ? `${airline.accentColor}60`
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Number */}
                      <span
                        className="text-xs font-mono shrink-0 mt-0.5 transition-colors duration-300"
                        style={{
                          color: isActive
                            ? airline.accentColor
                            : "rgba(255,255,255,0.18)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {feature.number}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-semibold transition-colors duration-300"
                          style={{
                            color: isActive ? "white" : "rgba(255,255,255,0.4)",
                            fontSize: "14px",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {feature.title}
                        </h3>

                        {/* Animated description */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.p
                              key="desc"
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: "8px" }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                              className="text-sm leading-relaxed overflow-hidden"
                              style={{ color: "rgba(255,255,255,0.45)" }}
                            >
                              {feature.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Arrow icon */}
                      <motion.span
                        className="shrink-0 text-base"
                        style={{ color: airline.accentColor }}
                        animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.25 }}
                        transition={{ duration: 0.3 }}
                      >
                        ↗
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right: Image panel */}
          <motion.div
            className="relative rounded-2xl overflow-hidden order-first lg:order-last"
            style={{ minHeight: "460px" }}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={airline.features[activeFeature].image}
                  alt={airline.features[activeFeature].title}
                  className="w-full h-full object-cover"
                />
                {/* Bottom gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.3) 40%, transparent 70%)",
                  }}
                />
                {/* Caption */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.p
                    className="text-xs uppercase tracking-[0.2em] mb-1.5"
                    style={{ color: airline.accentColor }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {airline.features[activeFeature].number} —{" "}
                    {airline.features[activeFeature].title}
                  </motion.p>
                  <motion.p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {airline.features[activeFeature].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation pills */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
              {airline.features.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  animate={{
                    width: activeFeature === i ? "20px" : "8px",
                    backgroundColor:
                      activeFeature === i ? airline.accentColor : "rgba(255,255,255,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
