"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeIn from "@/components/ui/FadeIn";

// Counter item — animates a number on scroll
function CounterItem({
  target,
  suffix,
  label,
  divider,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  divider: boolean;
  delay: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          delay,
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, suffix, delay]);

  return (
    <div
      className={`text-center ${divider ? "md:border-r md:border-citadel-border" : ""}`}
    >
      <p className="font-display text-stat text-citadel-text">
        <span ref={numRef}>0{suffix}</span>
      </p>
      <p className="font-body text-caption uppercase text-citadel-text-muted mt-2">
        {label}
      </p>
    </div>
  );
}

// Static stat item
function StatItem({
  value,
  label,
  divider,
  delay,
}: {
  value: string;
  label: string;
  divider: boolean;
  delay: number;
}) {
  return (
    <FadeIn direction="none" delay={delay}>
      <div
        className={`text-center ${divider ? "md:border-r md:border-citadel-border" : ""}`}
      >
        <p className="font-display text-stat text-citadel-text">
          {value}
        </p>
        <p className="font-body text-caption uppercase text-citadel-text-muted mt-2">
          {label}
        </p>
      </div>
    </FadeIn>
  );
}

export default function TrustBand() {
  return (
    <SectionWrapper padding="compact" className="bg-citadel-dark">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        <CounterItem
          target={25}
          suffix="+"
          label="Vehicle Capacity"
          divider
          delay={0}
        />
        <StatItem
          value="DP3"
          label="Security Specification"
          divider
          delay={0.1}
        />
        <StatItem
          value="24/7"
          label="Monitored Facility"
          divider
          delay={0.2}
        />
        <StatItem
          value="Specialist"
          label="Motor Trade Insurance"
          divider={false}
          delay={0.3}
        />
      </div>
    </SectionWrapper>
  );
}
