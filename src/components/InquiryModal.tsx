"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface Piece {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  materials: string;
  image: string;
  description: string;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPiece?: Piece | null;
}

export default function InquiryModal({
  isOpen,
  onClose,
  selectedPiece,
}: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-pearl-espresso/40 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-pearl-bg rounded-2xl p-8 sm:p-10 shadow-2xl border border-pearl-gold/30 z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-pearl-taupe hover:text-pearl-espresso transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-12 h-12 rounded-full bg-pearl-gold/20 text-pearl-gold flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-pearl-espresso font-light">
                  Appointment Requested
                </h3>
                <p className="text-xs font-sans text-pearl-taupe max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name || "valued guest"}. Our Soho atelier concierge will review your schedule and contact you within 24 hours to confirm your private salon viewing.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-pearl-gold text-xs font-sans uppercase tracking-widest text-pearl-espresso hover:bg-pearl-gold hover:text-pearl-bg transition-all duration-300"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[9px] font-sans tracking-ultra uppercase text-pearl-gold font-medium block mb-2">
                  Soho Atelier Concierge
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-pearl-espresso font-light mb-2">
                  {selectedPiece ? `Inquire: ${selectedPiece.name}` : "Private Appointment"}
                </h3>
                <p className="text-xs font-sans font-light text-pearl-taupe mb-8">
                  {selectedPiece
                    ? selectedPiece.description
                    : "Schedule a private consultation at 482 Broome Street, New York, or via virtual salon video."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="block text-[10px] tracking-ultra uppercase text-pearl-taupe-muted mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="E.g. Clara Vance"
                      className="w-full px-4 py-3 rounded-lg bg-pearl-surface border border-pearl-gold/25 focus:border-pearl-gold text-pearl-espresso focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-ultra uppercase text-pearl-taupe-muted mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="clara@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-pearl-surface border border-pearl-gold/25 focus:border-pearl-gold text-pearl-espresso focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-ultra uppercase text-pearl-taupe-muted mb-1 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (212)..."
                        className="w-full px-4 py-3 rounded-lg bg-pearl-surface border border-pearl-gold/25 focus:border-pearl-gold text-pearl-espresso focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-ultra uppercase text-pearl-taupe-muted mb-1 font-medium">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-pearl-surface border border-pearl-gold/25 focus:border-pearl-gold text-pearl-espresso focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-ultra uppercase text-pearl-taupe-muted mb-1 font-medium">
                      Bespoke Notes / Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Mention ring size, specific pearl preferences, or custom engraving requests..."
                      className="w-full px-4 py-3 rounded-lg bg-pearl-surface border border-pearl-gold/25 focus:border-pearl-gold text-pearl-espresso focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-pearl-gold hover:bg-pearl-gold-dark text-pearl-bg text-xs font-sans tracking-ultra uppercase font-medium transition-all duration-300 shadow-sm"
                    >
                      Submit Reservation Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
