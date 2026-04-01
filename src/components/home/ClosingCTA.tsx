import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import GoldLine from "@/components/ui/GoldLine";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function ClosingCTA() {
  return (
    <SectionWrapper padding="large" className="bg-citadel-dark">
      <div className="text-center max-w-[600px] mx-auto">
        {/* Gold line — centered (GoldLine anchors left by default, override) */}
        <FadeIn direction="none">
          <div className="flex justify-center mb-12">
            <GoldLine width="60px" />
          </div>
        </FadeIn>

        {/* H2 */}
        <TextReveal
          text="Begin a Conversation"
          as="h2"
          splitBy="word"
          className="font-display text-display-md text-citadel-text"
        />

        {/* Body */}
        <FadeIn direction="up" delay={0.2}>
          <p
            className="font-body text-body-lg text-citadel-text-body"
            style={{ marginTop: "24px" }}
          >
            Custody arrangements are tailored to each client and vehicle.
            Contact us to discuss your requirements.
          </p>
        </FadeIn>

        {/* Primary CTA */}
        <FadeIn direction="up" delay={0.4}>
          <div style={{ marginTop: "40px" }}>
            <Button href="/contact" variant="primary">
              Enquire Now
            </Button>
          </div>
        </FadeIn>

        {/* Phone */}
        <FadeIn direction="up" delay={0.5}>
          <p
            className="font-body text-caption text-citadel-text-muted"
            style={{ marginTop: "24px" }}
          >
            Or call directly: +44 (0) XXXX XXXXXX
          </p>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
