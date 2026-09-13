"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Piece {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  materials: string;
  image: string;
  description: string;
}

const COLLECTION: Piece[] = [
  {
    id: "solstice-ring",
    name: "The Solstice Ring",
    subtitle: "Edition 01",
    price: "$3,800",
    materials: "18k Warm Gold • 12mm Australian South Sea Pearl",
    image: "/images/solstice-ring.png",
    description:
      "A hand-burnished 18k yellow gold band holding a single untreated 12mm South Sea pearl in an organic bezel setting. Crafted in our Soho Atelier.",
  },
  {
    id: "meridian-choker",
    name: "The Meridian Choker",
    subtitle: "Edition 02",
    price: "$4,600",
    materials: "18k Solid Gold Wire • Baroque South Sea Pearl",
    image: "/images/meridian-pendant.png",
    description:
      "A seamless 18k gold wire choker supporting a single hand-selected baroque pearl chosen for its natural teardrop silhouette.",
  },
  {
    id: "aurelia-earrings",
    name: "The Aurelia Earrings",
    subtitle: "Edition 03",
    price: "$2,950",
    materials: "18k Gold Wire • Twin South Sea Drop Pearls",
    image: "/images/aurelia-earrings.png",
    description:
      "Fluid 18k gold drop wires anchored by twin natural white pearls that catch light with every subtle movement.",
  },
  {
    id: "continuum-cuff",
    name: "The Continuum Cuff",
    subtitle: "Edition 04",
    price: "$5,200",
    materials: "18k Sculpted Gold • Inset Seed Pearls",
    image: "/images/continuum-cuff.png",
    description:
      "A heavy hand-sculpted gold cuff with micro-inset natural seed pearls along the soft inner bezel edge.",
  },
];

interface CollectionSectionProps {
  onSelectPiece: (piece: Piece) => void;
}

export default function CollectionSection({ onSelectPiece }: CollectionSectionProps) {
  return (
    <section id="collection" className="relative w-full bg-pearl-bg py-32 md:py-44">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-[10px] font-sans tracking-ultra uppercase text-pearl-gold font-medium block mb-3"
          >
            03 / Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-light text-pearl-espresso tracking-wide mb-4"
          >
            Permanent Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xs md:text-sm font-sans font-light text-pearl-taupe tracking-wide leading-relaxed"
          >
            Each piece is produced in limited annual runs in our New York atelier.
          </motion.p>
        </div>

        {/* Spare 4-Item Grid with Generous Gutters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {COLLECTION.map((piece, index) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 1.4,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectPiece(piece)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Frame with Scale on Hover */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-pearl-surface border border-pearl-gold/15 mb-6 shadow-sm">
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-pearl-espresso/0 group-hover:bg-pearl-espresso/10 transition-colors duration-500" />
                
                <div className="absolute top-4 right-4 bg-pearl-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-pearl-gold/20 text-[10px] font-sans tracking-widest text-pearl-espresso uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Inquire
                </div>
              </div>

              {/* Product Info */}
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-serif text-2xl font-light text-pearl-espresso group-hover:text-pearl-gold transition-colors duration-300">
                  {piece.name}
                </h3>
                <span className="font-serif text-lg text-pearl-taupe font-light">
                  {piece.price}
                </span>
              </div>

              <p className="text-[11px] font-sans tracking-wide text-pearl-taupe-muted font-light">
                {piece.materials}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
