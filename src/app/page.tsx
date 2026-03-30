import SectionWrapper from "@/components/ui/SectionWrapper";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import GoldLine from "@/components/ui/GoldLine";

export default function HomePage() {
  return (
    <main>
      {/* Hero lockup */}
      <section className="min-h-screen flex flex-col items-center justify-center gap-6 bg-citadel-black">
        <div className="flex flex-col items-center gap-3">
          <h1
            className="font-display text-citadel-text tracking-[0.15em] uppercase"
            style={{ fontSize: "clamp(5rem, 16vw, 14rem)", lineHeight: 1 }}
          >
            CITADEL
          </h1>
          <p
            className="font-body uppercase text-citadel-gold tracking-[0.5em]"
            style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.95rem)" }}
          >
            by Gold Standard
          </p>
        </div>
        <div className="w-16 h-px bg-citadel-gold opacity-60 my-2" />
        <p
          className="font-display italic text-citadel-text-body text-center"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.02em" }}
        >
          A new standard in vehicle custody
        </p>
      </section>

      {/* UI component test */}
      <SectionWrapper className="bg-citadel-dark">
        <div className="flex flex-col items-start gap-10">

          <GoldLine width="60px" />

          <TextReveal
            text="Protection Beyond Storage"
            as="h1"
            className="font-display text-citadel-text [font-size:clamp(2.5rem,5vw,5rem)] leading-[1.05]"
          />

          <TextReveal
            text="Custody-grade care for vehicles of distinction."
            as="p"
            className="font-body text-citadel-text-body text-body-lg max-w-xl"
            delay={0.1}
          />

          <FadeIn delay={0.2} className="max-w-xl">
            <p className="font-body text-body text-citadel-text-muted leading-relaxed">
              From the moment your vehicle enters Citadel, it receives comprehensive
              digital documentation, continuous monitoring, and white-glove care.
              This is institutional-grade asset stewardship applied to vehicles.
            </p>
          </FadeIn>

          <FadeIn delay={0.3} className="flex flex-wrap gap-4">
            <Button href="/contact">Enquire About Custody</Button>
            <Button variant="outline" href="/services">Explore Services</Button>
          </FadeIn>

        </div>
      </SectionWrapper>
    </main>
  );
}
