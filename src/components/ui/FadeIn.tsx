"use client";

import { useEffect, useRef, ElementType, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromMap: Record<Direction, gsap.TweenVars> = {
      up:    { y: 30,  opacity: 0 },
      down:  { y: -30, opacity: 0 },
      left:  { x: -30, opacity: 0 },
      right: { x: 30,  opacity: 0 },
      none:  { opacity: 0 },
    };

    gsap.set(el, fromMap[direction]);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          x: 0,
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power3.out",
        }),
    });

    return () => trigger.kill();
  }, [direction, delay, duration]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
