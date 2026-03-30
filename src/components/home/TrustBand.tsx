"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_SMOOTH, DURATION, STAGGER, REVEAL } from "@/lib/motion";

const stats = [
  { value: "25+", label: "Vehicle Capacity",       countTo: 25, suffix: "+" },
  { value: "DP3", label: "Security Specification",  countTo: null,           },
  { value: "24/7",label: "Monitored Facility",      countTo: null,           },
  { value: "Specialist", label: "Motor Trade Insurance", countTo: null,      },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustBand() {
  return (
    <section className="bg-citadel-dark py-section-sm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-citadel-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={REVEAL.fadeUp}
              transition={{
                duration: DURATION.medium,
                ease: EASE_SMOOTH,
                delay: i * STAGGER.tight,
              }}
              className="flex flex-col items-center text-center gap-3 py-10 lg:py-6 px-4"
            >
              <span className="font-display text-[36px] md:text-[44px] text-citadel-text-primary leading-none">
                {stat.countTo !== null ? (
                  <CountUp to={stat.countTo} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </span>
              <span className="font-body text-[13px] tracking-[0.15em] uppercase text-citadel-text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
