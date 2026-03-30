import FadeIn from "@/components/ui/FadeIn";

export default function BrandStatement() {
  return (
    <section className="bg-citadel-dark border-y border-citadel-border py-section-sm">
      <FadeIn direction="none" className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <p className="font-display italic text-[22px] md:text-[26px] text-citadel-gold text-center leading-relaxed">
          &ldquo;Custody-grade protection for vehicles valued as assets, not possessions.&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
