import IntroSequence    from "@/components/home/IntroSequence";
import Hero             from "@/components/home/Hero";
import BrandStatement   from "@/components/home/BrandStatement";
import ThreePillars     from "@/components/home/ThreePillars";
import EditorialImage   from "@/components/home/EditorialImage";
import AssetIntelligence from "@/components/home/AssetIntelligence";
import TrustBand        from "@/components/home/TrustBand";
import TiersPreview     from "@/components/home/TiersPreview";
import ClosingCTA       from "@/components/home/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <Hero />
      <BrandStatement />
      <ThreePillars />
      <EditorialImage />
      <AssetIntelligence />
      <TrustBand />
      <TiersPreview />
      <ClosingCTA />
    </>
  );
}
