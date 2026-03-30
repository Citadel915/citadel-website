import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function ClosingCTA() {
  return (
    <section className="bg-citadel-dark py-section-lg">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <FadeIn direction="up" className="flex flex-col items-center text-center max-w-[600px] mx-auto gap-6">
          <h2 className="font-display text-display-md text-citadel-text-primary leading-[1.2]">
            Begin a Conversation
          </h2>

          <p className="font-body text-body-lg text-citadel-text-body leading-[1.75]">
            Custody arrangements are tailored to each client and vehicle.
            Contact us to discuss your requirements.
          </p>

          <div className="flex flex-col items-center gap-4 mt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-citadel-gold text-citadel-black font-body text-[13px] tracking-wider uppercase hover:bg-citadel-gold-light hover:scale-[1.02] transition-all duration-300"
            >
              Enquire Now →
            </Link>

            <p className="font-body text-[13px] text-citadel-text-muted">
              Or call directly:{" "}
              <a
                href="tel:+44000000000"
                className="hover:text-citadel-text-primary transition-colors duration-300"
              >
                +44 (0) XXXX XXXXXX
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
