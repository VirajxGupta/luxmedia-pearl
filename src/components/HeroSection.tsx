"use client";

import React from "react";
import { motion } from "framer-motion";
import HeroCaustics from "./canvas/HeroCaustics";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-pearl-bg">
      {/* Ambient Caustics Canvas Background */}
      <HeroCaustics />

      {/* Decorative Subtle Vignette & Light Layer */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-pearl-bg/30 to-pearl-bg/70 pointer-events-none" />

      {/* Main Content Center */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-[10px] md:text-xs font-sans tracking-ultra uppercase text-pearl-gold font-medium">
            Fine Jewellery — Soho, New York
          </span>
        </motion.div>

        {/* Serif Logotype Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extralight tracking-widest leading-none text-pearl-espresso mb-8 selection:bg-pearl-gold selection:text-pearl-bg"
        >
          PEARL
        </motion.h1>

        {/* Minimal Editorial Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-sm md:text-base font-sans font-light tracking-wide text-pearl-taupe leading-relaxed text-center font-normal"
        >
          Quiet elegance. Sculpted in single-origin 18k warm gold and rare South Sea pearls.
        </motion.p>
      </div>

      {/* Subtle Scroll Cue Indicator at Bottom */}
      <motion.a
        href="#piece"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 group cursor-pointer z-10"
      >
        <span className="text-[9px] font-sans tracking-ultra uppercase text-pearl-taupe-muted group-hover:text-pearl-gold transition-colors duration-300">
          Scroll to Discover
        </span>
        <div className="w-[1px] h-10 bg-pearl-gold/30 relative overflow-hidden">
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-1/2 bg-pearl-gold"
          />
        </div>
      </motion.a>
    </section>
  );
}
