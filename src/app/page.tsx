"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RingShowcaseSection from "@/components/RingShowcaseSection";
import CraftSection from "@/components/CraftSection";
import CollectionSection from "@/components/CollectionSection";
import FooterSection from "@/components/FooterSection";
import InquiryModal from "@/components/InquiryModal";

interface Piece {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  materials: string;
  image: string;
  description: string;
}

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  const handleOpenInquiry = (piece?: Piece) => {
    if (piece) {
      setSelectedPiece(piece);
    } else {
      setSelectedPiece(null);
    }
    setIsInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setIsInquiryOpen(false);
    setSelectedPiece(null);
  };

  return (
    <main className="min-h-screen bg-pearl-bg text-pearl-espresso selection:bg-pearl-gold selection:text-pearl-bg relative">
      {/* 0. Floating Quiet Header Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* 1. Hero Section (Full Viewport with Ambient Light Caustics) */}
      <HeroSection />

      {/* 2. The 3D Piece Section (Interactive R3F Scroll-Linked Ring) */}
      <RingShowcaseSection />

      {/* 3. Craft & Philosophy Section (Materials, Handcrafted Soho Atelier) */}
      <CraftSection />

      {/* 4. Collection Highlights Section (4 Spare Grid Cards) */}
      <CollectionSection onSelectPiece={handleOpenInquiry} />

      {/* 5. Closing / Contact Atelier Footer */}
      <FooterSection onOpenInquiry={() => handleOpenInquiry()} />

      {/* Private Appointment & Bespoke Piece Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={handleCloseInquiry}
        selectedPiece={selectedPiece}
      />
    </main>
  );
}
