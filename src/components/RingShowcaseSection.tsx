"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for client-side R3F Canvas rendering with zero SSR issues
const RingCanvas = dynamic(() => import("./canvas/RingCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-pearl-bg">
      <div className="w-8 h-8 rounded-full border border-pearl-gold/30 border-t-pearl-gold animate-spin" />
    </div>
  ),
});

export default function RingShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<"yellow" | "rose" | "white">("yellow");
  const [isMobile, setIsMobile] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress within this 200vh section container for full scroll rotation sync
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [rawScrollProgress, setRawScrollProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setRawScrollProgress(v);
    });
  }, [scrollYProgress]);

  // Transform scroll progress for UI reveals
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.25], [30, 0]);

  return (
    <section
      id="piece"
      ref={containerRef}
      className="relative w-full min-h-[140vh] bg-pearl-bg py-24 flex flex-col items-center justify-between"
    >
      {/* Background Soft Glow Radial */}
      <div className="absolute inset-0 bg-radial-gradient from-pearl-surface/80 via-pearl-bg to-pearl-bg pointer-events-none" />

      {/* Header Info Top */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-8">
        <motion.span
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium block mb-3"
        >
          01 / The Masterpiece
        </motion.span>
        <motion.h2
          style={{ opacity: titleOpacity, y: titleY }}
          className="font-serif text-4xl md:text-6xl font-light text-pearl-espresso tracking-wide mb-4"
        >
          The Empire Pearl Ring
        </motion.h2>
        <motion.p
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-xs md:text-sm font-sans font-light text-pearl-taupe max-w-md mx-auto tracking-wide leading-relaxed"
        >
          {isMobile
            ? "Touch & drag to inspect the 360° curvature and physical luster."
            : "Scroll to rotate the sculpted 18k band and single-origin South Sea pearl."}
        </motion.p>
      </div>

      {/* 3D Ring Interactive Canvas Container */}
      <div className="relative w-full h-[60vh] md:h-[72vh] max-w-6xl my-4 flex items-center justify-center">
        <RingCanvas
          scrollProgress={rawScrollProgress}
          finish={finish}
          isMobile={isMobile}
        />

        {/* Floating Hotspots Callouts (Desktop & Tablet) */}
        {!isMobile && (
          <>
            {/* Hotspot 1: Pearl Quality */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute left-6 md:left-16 top-1/4 z-20 glass-panel p-4 rounded-xl max-w-[220px] shadow-sm text-left border border-pearl-gold/20"
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pearl-gold animate-ping" />
                <span className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium">
                  Material
                </span>
              </div>
              <h4 className="font-serif text-lg text-pearl-espresso leading-snug">
                12mm South Sea Pearl
              </h4>
              <p className="text-[11px] font-sans text-pearl-taupe-muted font-light mt-1 leading-relaxed">
                Untreated natural luster with deep rose-white iridescence.
              </p>
            </motion.div>

            {/* Hotspot 2: Gold Band */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute right-6 md:right-16 bottom-1/3 z-20 glass-panel p-4 rounded-xl max-w-[220px] shadow-sm text-left border border-pearl-gold/20"
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pearl-gold" />
                <span className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium">
                  Craft
                </span>
              </div>
              <h4 className="font-serif text-lg text-pearl-espresso leading-snug">
                18k Sculpted Gold
              </h4>
              <p className="text-[11px] font-sans text-pearl-taupe-muted font-light mt-1 leading-relaxed">
                Single-origin recycled gold, hand-burnished in our Soho studio.
              </p>
            </motion.div>
          </>
        )}
      </div>

      {/* Bottom Finish Switcher & Details */}
      <div className="relative z-20 max-w-xl mx-auto px-6 text-center flex flex-col items-center space-y-6">
        {/* Finish Selector Buttons */}
        <div className="flex items-center space-x-4 bg-pearl-surface/80 p-1.5 rounded-full border border-pearl-gold/25 shadow-sm">
          <button
            onClick={() => setFinish("yellow")}
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              finish === "yellow"
                ? "bg-pearl-gold text-pearl-bg font-medium shadow-sm"
                : "text-pearl-taupe hover:text-pearl-espresso"
            }`}
          >
            18k Yellow Gold
          </button>
          <button
            onClick={() => setFinish("rose")}
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              finish === "rose"
                ? "bg-[#C89B84] text-pearl-bg font-medium shadow-sm"
                : "text-pearl-taupe hover:text-pearl-espresso"
            }`}
          >
            Rose Gold
          </button>
          <button
            onClick={() => setFinish("white")}
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
              finish === "white"
                ? "bg-[#8E9B9E] text-pearl-bg font-medium shadow-sm"
                : "text-pearl-taupe hover:text-pearl-espresso"
            }`}
          >
            White Gold
          </button>
        </div>

        <p className="text-xs font-sans tracking-widest text-pearl-taupe-muted uppercase">
          Edition 01 — Made to order in New York City
        </p>
      </div>
    </section>
  );
}
