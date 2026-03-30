"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SMOOTH, DURATION, STAGGER, REVEAL } from "@/lib/motion";
import FadeIn from "@/components/ui/FadeIn";

const tiers = [
  {
    name:        "Essential",
    description: "Secured custody with core protection.",
    price:       "From £750/month",
    featured:    false,
  },
  {
    name:        "Concierge",
    description: "Full custody with active vehicle management.",
    price:       "From £1,000/month",
    featured:    true,
  },
  {
    name:        "Vault",
    description: "Complete custody. Total discretion. Priority everything.",
    price:       "From £1,500/month",
    featured:    false,
  },
];

export default function TiersPreview() {
  return (
    <section className="bg-citadel-black py-section">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <FadeIn direction="up" className="text-center mb-16">
          <p className="font-body text-eyebrow tracking-[0.25em] uppercase text-citadel-gold mb-4">
            Membership Tiers
          </p>
          <h2 className="font-display text-display-md text-citadel-text-primary leading-[1.2]">
            Select Your Level of Custody
          </h2>
        </FadeIn>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={REVEAL.fadeUp}
              transition={{
                duration: DURATION.medium,
                ease: EASE_SMOOTH,
                delay: i * STAGGER.normal,
              }}
              className={`
                group relative flex flex-col gap-6 p-10 rounded-sm
                border transition-all duration-300
                ${tier.featured
                  ? "border-citadel-gold bg-citadel-charcoal scale-[1.02] shadow-[0_0_40px_rgba(201,169,110,0.08)]"
                  : "border-citadel-border bg-citadel-charcoal hover:border-citadel-gold"}
              `}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-citadel-gold text-citadel-black font-body text-[10px] tracking-[0.15em] uppercase">
                  Recommended
                </span>
              )}

              <h3 className="font-display text-[20px] tracking-[0.1em] uppercase text-citadel-text-primary">
                {tier.name}
              </h3>

              <p className="font-body text-body text-citadel-text-body leading-[1.7]">
                {tier.description}
              </p>

              <p className="font-body text-[15px] text-citadel-gold font-medium">
                {tier.price}
              </p>

              <Link
                href="/services"
                className="font-body text-[12px] tracking-wider uppercase text-citadel-text-muted hover:text-citadel-gold transition-colors duration-300 mt-auto"
              >
                View Details →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
