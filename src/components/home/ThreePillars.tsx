"use client";

import { motion } from "framer-motion";
import { EASE_SMOOTH, DURATION, STAGGER, REVEAL } from "@/lib/motion";

const pillars = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M24 4L6 12v12c0 10.5 7.7 20.3 18 22.5C35.3 44.3 42 34.5 42 24V12L24 4z" />
        <polyline points="17 24 22 29 31 20" />
      </svg>
    ),
    title: "Secured Storage",
    body: "Your vehicle resides in a DP3-specification facility with 24/7 monitoring, climate awareness, and specialist motor trade insurance. Individual bays. Controlled access. Complete peace of mind.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 36c0-6.6 5.4-12 12-12s12 5.4 12 12" />
        <circle cx="24" cy="18" r="6" />
        <path d="M6 42h36" />
        <path d="M18 36v6M30 36v6" />
      </svg>
    ),
    title: "Specialist Detailing",
    body: "Correction, protection, and ongoing maintenance delivered by trained technicians. Each vehicle receives a documented care programme tailored to its materials and finish.",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="20" cy="28" r="8" />
        <path d="M28 28h6a2 2 0 002-2V18l-4-8H8a2 2 0 00-2 2v14a2 2 0 002 2h4" />
        <circle cx="20" cy="28" r="3" />
        <path d="M36 20h-4" />
      </svg>
    ),
    title: "Concierge Services",
    body: "Collection, delivery, MOT coordination, servicing logistics, and event preparation. Your vehicle is ready when you are, wherever you need it.",
  },
];

export default function ThreePillars() {
  return (
    <section className="bg-citadel-dark py-section">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-citadel-border">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={REVEAL.fadeUp}
              transition={{
                duration: DURATION.medium,
                ease: EASE_SMOOTH,
                delay: i * STAGGER.normal,
              }}
              className="flex flex-col gap-6 px-0 py-12 lg:py-0 lg:px-12 first:pl-0 last:pr-0"
            >
              {/* Icon */}
              <div>{pillar.icon}</div>

              {/* Title */}
              <h3 className="font-display text-[15px] tracking-[0.2em] uppercase text-citadel-text-primary">
                {pillar.title}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-citadel-gold" />

              {/* Body */}
              <p className="font-body text-body text-citadel-text-body leading-[1.7]">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
