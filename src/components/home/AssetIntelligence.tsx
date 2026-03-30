"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SMOOTH, DURATION, STAGGER, REVEAL } from "@/lib/motion";
import FadeIn from "@/components/ui/FadeIn";

const dataCards = [
  { label: "Intake Status",   value: "Complete",         gold: false },
  { label: "Condition",       value: "Documented",       gold: true  },
  { label: "Last Report",     value: "14 Mar 2026",      gold: false },
  { label: "Climate",         value: "Monitored",        gold: false },
  { label: "Insurance",       value: "Active",           gold: false },
];

// Alternating float offsets so cards move independently
const floatOffsets = [
  { y: [0, -4, 0], duration: 4.0 },
  { y: [0,  4, 0], duration: 4.4 },
  { y: [0, -3, 0], duration: 3.8 },
  { y: [0,  5, 0], duration: 5.0 },
  { y: [0, -4, 0], duration: 4.2 },
];

export default function AssetIntelligence() {
  return (
    <section className="py-section" style={{ backgroundColor: "#101010" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <div>
            <FadeIn direction="up" delay={0}>
              <p className="font-body text-eyebrow tracking-[0.25em] uppercase text-citadel-gold mb-4">
                Beyond Physical Custody
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h2 className="font-display text-display-lg text-citadel-text-primary leading-[1.15] tracking-[-0.01em] mb-8">
                Every Vehicle. Fully Documented. Continuously Monitored.
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="flex flex-col gap-5 font-body text-body text-citadel-text-body leading-[1.7]">
                <p>
                  From the moment your vehicle enters Citadel, it receives a
                  comprehensive digital intake — exterior and interior condition
                  documented to forensic detail.
                </p>
                <p>
                  Ongoing condition reports, service records, and maintenance
                  alerts are compiled into a living custody record accessible
                  through your private client portal.
                </p>
                <p>
                  This is not storage with paperwork. This is institutional-grade
                  asset stewardship applied to vehicles.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Link
                href="/smartvault"
                className="inline-flex items-center gap-2 mt-8 font-body text-[13px] tracking-wider uppercase text-citadel-gold hover:text-citadel-gold-light transition-colors duration-300"
              >
                Discover SmartVault
                <span aria-hidden="true">→</span>
              </Link>
            </FadeIn>
          </div>

          {/* Right: Data visualization */}
          <div
            className="relative rounded-sm overflow-hidden"
            style={{
              backgroundColor: "#111111",
              minHeight: "420px",
              backgroundImage:
                "linear-gradient(rgba(26,26,26,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            {/* Grid overlay fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, #111111 90%)",
              }}
            />

            {/* Data cards */}
            <div className="relative z-10 flex flex-col gap-4 p-8 pt-12">
              {dataCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={REVEAL.fadeIn}
                  transition={{
                    duration: DURATION.medium,
                    ease: EASE_SMOOTH,
                    delay: i * STAGGER.tight,
                  }}
                >
                  <motion.div
                    animate={{ y: floatOffsets[i].y }}
                    transition={{
                      duration: floatOffsets[i].duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`
                      inline-flex items-center gap-4 px-5 py-3
                      border rounded-sm
                      ${card.gold
                        ? "border-citadel-gold bg-citadel-charcoal/80"
                        : "border-citadel-border bg-citadel-black/60"}
                    `}
                  >
                    <span className="font-mono text-[11px] tracking-[0.1em] text-citadel-text-muted uppercase">
                      {card.label}:
                    </span>
                    <span
                      className={`font-mono text-[11px] tracking-[0.05em] ${
                        card.gold ? "text-citadel-gold" : "text-citadel-text-primary"
                      }`}
                    >
                      {card.value}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-16 h-px bg-gradient-to-r from-transparent to-citadel-gold opacity-40" />
            <div className="absolute top-4 right-4 h-16 w-px bg-gradient-to-b from-citadel-gold to-transparent opacity-40" />
          </div>
        </div>
      </div>
    </section>
  );
}
