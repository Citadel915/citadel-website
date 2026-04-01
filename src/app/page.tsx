"use client";

import { useState } from "react";
import Preloader from "@/components/home/Preloader";
import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import HorizontalPillars from "@/components/home/HorizontalPillars";
import EditorialBreak from "@/components/home/EditorialBreak";
import AssetIntelligence from "@/components/home/AssetIntelligence";
import TrustBand from "@/components/home/TrustBand";
import TiersPreview from "@/components/home/TiersPreview";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function HomePage() {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <Preloader onComplete={() => setDone(true)} />}
      {done && (
        <>
          <Hero />
          <BrandStatement />
          <HorizontalPillars />
          <EditorialBreak />
          <AssetIntelligence />
          <TrustBand />
          <TiersPreview />
          <ClosingCTA />
        </>
      )}
    </>
  );
}
