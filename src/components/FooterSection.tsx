"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FooterSectionProps {
  onOpenInquiry: () => void;
}

export default function FooterSection({ onOpenInquiry }: FooterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-pearl-surface text-pearl-espresso pt-28 pb-16 border-t border-pearl-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main CTA Line */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium block mb-4"
          >
            04 / Soho Atelier
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-extralight tracking-wide leading-tight mb-8"
          >
            By Private Appointment
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xs md:text-sm font-sans font-light text-pearl-taupe max-w-lg mx-auto mb-10 tracking-wide leading-relaxed"
          >
            We invite you to experience our permanent collection and discuss bespoke commissions in our quiet Soho sanctuary.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            onClick={onOpenInquiry}
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-sans text-xs tracking-ultra uppercase text-pearl-espresso transition-all duration-500 border border-pearl-gold rounded-full shadow-sm hover:border-pearl-gold-dark"
          >
            <span className="relative z-10 group-hover:text-pearl-bg transition-colors duration-300">
              Request Appointment
            </span>
            <span className="absolute inset-0 bg-pearl-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-out" />
          </motion.button>
        </div>

        {/* 3-Column Restrained Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-pearl-gold/15 text-xs font-sans font-light text-pearl-taupe">
          {/* Column 1: Location */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra uppercase text-pearl-gold font-medium block">
              Location
            </span>
            <p className="leading-relaxed text-pearl-espresso">
              PEARL Atelier<br />
              482 Broome Street, Suite 4B<br />
              Soho, New York, NY 10013
            </p>
            <p className="text-[11px] text-pearl-taupe-muted">
              Tuesday — Saturday, 11am to 6pm EST
            </p>
          </div>

          {/* Column 2: Inquiries */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra uppercase text-pearl-gold font-medium block">
              Inquiries
            </span>
            <p className="leading-relaxed text-pearl-espresso">
              atelier@pearl-ny.com<br />
              +1 (212) 555-0198
            </p>
            <div className="flex space-x-6 pt-2 text-[10px] tracking-ultra uppercase">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pearl-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-pearl-gold transition-colors"
              >
                Journal
              </a>
              <a
                href="#"
                className="hover:text-pearl-gold transition-colors"
              >
                Press
              </a>
            </div>
          </div>

          {/* Column 3: The Pearl Register */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-ultra uppercase text-pearl-gold font-medium block">
              The Pearl Register
            </span>
            <p className="leading-relaxed">
              Private dispatches on rare pearl harvests and salon showcases.
            </p>

            {subscribed ? (
              <p className="text-pearl-gold font-serif text-sm italic pt-2">
                You have been entered into the register.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border-b border-pearl-gold/30 py-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent text-xs font-sans text-pearl-espresso focus:outline-none w-full placeholder:text-pearl-taupe-muted"
                />
                <button
                  type="submit"
                  className="text-[10px] tracking-ultra uppercase text-pearl-gold hover:text-pearl-gold-dark font-medium transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans tracking-widest text-pearl-taupe-muted border-t border-pearl-gold/10">
          <p>© {new Date().getFullYear()} PEARL FINE JEWELLERY LLC. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 uppercase">
            <a href="#" className="hover:text-pearl-taupe transition-colors">Privacy</a>
            <a href="#" className="hover:text-pearl-taupe transition-colors">Terms of Atelier</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
