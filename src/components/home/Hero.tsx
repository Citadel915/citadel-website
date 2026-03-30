"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SMOOTH, DURATION } from "@/lib/motion";

// Staggered reveal that begins after the 3s intro
const INTRO_DELAY = 3.1;

const heroItems = [
  { delay: 0.0,  duration: 0.6  }, // eyebrow
  { delay: 0.2,  duration: 0.7  }, // h1
  { delay: 0.4,  duration: 0.6  }, // subheading
  { delay: 0.6,  duration: 0.5  }, // CTA button
  { delay: 0.7,  duration: 0.4  }, // secondary link
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: heroItems[i].duration,
      ease: EASE_SMOOTH,
      delay: heroItems[i].delay,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient (placeholder — replace with <Image> when photography is ready) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #0C0C0C 0%, #0f0f1a 40%, #111118 60%, #0C0C0C 100%)",
        }}
      />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Bottom gradient for legibility */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 w-full pt-[72px]">
        <div className="max-w-[680px]">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-eyebrow tracking-[0.25em] uppercase text-citadel-gold mb-6"
          >
            Vehicle Custody &amp; Asset Intelligence
          </motion.p>

          {/* H1 */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-display-xl text-citadel-text-primary leading-[1.1] tracking-[-0.02em] mb-6"
          >
            Protection Beyond Storage
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-body text-body-lg text-citadel-text-body leading-[1.75] mb-10 max-w-[540px]"
          >
            Citadel provides custody-grade care, condition intelligence, and
            concierge services for vehicles of distinction. Secured facility.
            West London.
          </motion.p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-citadel-gold text-citadel-black font-body text-[13px] tracking-wider uppercase hover:bg-citadel-gold-light transition-colors duration-300"
              >
                Enquire About Custody →
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/services"
                className="font-body text-[13px] tracking-wider uppercase text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 1.2, duration: DURATION.medium, ease: EASE_SMOOTH }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-citadel-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-citadel-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
