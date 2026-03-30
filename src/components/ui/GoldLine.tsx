"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface GoldLineProps {
  width?: string;
  className?: string;
  animate?: boolean;
}

export default function GoldLine({
  width = "60px",
  className = "",
  animate = true,
}: GoldLineProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;

    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
        }),
    });

    return () => trigger.kill();
  }, [animate]);

  return (
    <div
      ref={ref}
      className={`bg-citadel-gold ${className}`}
      style={{ width, height: "1px" }}
    />
  );
}
