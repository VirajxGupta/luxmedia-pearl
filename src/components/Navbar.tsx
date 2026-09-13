"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  onOpenInquiry: () => void;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "glass-nav py-4 border-b border-pearl-gold/15 shadow-sm"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Navigation Left Links */}
        <nav className="hidden md:flex items-center space-x-10 text-xs tracking-ultra font-sans uppercase text-pearl-espresso/70">
          <a
            href="#piece"
            className="hover:text-pearl-gold transition-colors duration-300"
          >
            01 / The Piece
          </a>
          <a
            href="#craft"
            className="hover:text-pearl-gold transition-colors duration-300"
          >
            02 / Craft
          </a>
          <a
            href="#collection"
            className="hover:text-pearl-gold transition-colors duration-300"
          >
            03 / Collection
          </a>
        </nav>

        {/* Wordmark Center Logo */}
        <a
          href="#"
          className="font-serif text-2xl md:text-3xl tracking-widest text-pearl-espresso hover:text-pearl-gold transition-colors duration-500 font-light text-center"
        >
          PEARL
          <span className="block text-[9px] font-sans tracking-ultra text-pearl-taupe-muted uppercase font-normal -mt-1">
            New York
          </span>
        </a>

        {/* Action Right */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden font-sans text-xs tracking-ultra uppercase text-pearl-espresso transition-all duration-500 border border-pearl-gold/40 hover:border-pearl-gold rounded-full"
          >
            <span className="relative z-10 group-hover:text-pearl-bg transition-colors duration-300">
              Private Appointment
            </span>
            <span className="absolute inset-0 bg-pearl-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
