"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CraftSection() {
  return (
    <section id="craft" className="relative w-full bg-pearl-surface py-32 md:py-44 border-y border-pearl-gold/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium block mb-4">
              02 / Craft & Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-pearl-espresso tracking-wide max-w-2xl leading-tight">
              True luxury is whispered. Sculpted by hand in Soho.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-sans font-light text-pearl-taupe max-w-xs mt-6 md:mt-0 tracking-wide leading-relaxed"
          >
            Every piece begins with single-origin pearls hand-selected for their deep nacre, paired with solid 18k recycled gold.
          </motion.p>
        </div>

        {/* Grid Editorial Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Reveal with Upward Translate */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative h-[450px] md:h-[580px] w-full rounded-2xl overflow-hidden shadow-sm border border-pearl-gold/20 group"
          >
            <Image
              src="/images/craftsmanship.png"
              alt="Artisan holding 18k gold ring band and raw South Sea pearl in Soho Atelier"
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pearl-espresso/30 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-pearl-bg text-xs font-sans tracking-widest uppercase">
              <span>Soho Atelier — 482 Broome St</span>
              <span>18K / AAA Nacre</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="border-l border-pearl-gold/40 pl-6 space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-pearl-espresso">
                Organic Imperfection
              </h3>
              <p className="text-xs md:text-sm font-sans font-light text-pearl-taupe leading-relaxed">
                No two pearls are ever identical. We reject factory symmetry in favor of natural character — embracing the subtle organic variations born from ocean currents over seven years.
              </p>
            </div>

            <div className="border-l border-pearl-gold/40 pl-6 space-y-4">
              <h3 className="font-serif text-2xl md:text-3xl font-light text-pearl-espresso">
                Ethical Single-Origin Gold
              </h3>
              <p className="text-xs md:text-sm font-sans font-light text-pearl-taupe leading-relaxed">
                Our 18-karat gold is 100% recycled and alloyed in-house to achieve our signature warm champagne hue. Zero mining waste, eternal value.
              </p>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-pearl-gold/15">
              <div>
                <span className="block font-serif text-3xl text-pearl-espresso font-light">
                  100%
                </span>
                <span className="text-[10px] font-sans tracking-ultra uppercase text-pearl-taupe-muted">
                  Recycled 18K Gold
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-pearl-espresso font-light">
                  AAA
                </span>
                <span className="text-[10px] font-sans tracking-ultra uppercase text-pearl-taupe-muted">
                  Grade Pearl Nacre
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
