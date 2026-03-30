"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface TextRevealProps {
  text: string;
  as?: Tag;
  splitBy?: "word" | "char";
  className?: string;
  delay?: number;
  staggerAmount?: number;
  triggerOnScroll?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = "p",
  splitBy = "word",
  className = "",
  delay = 0,
  staggerAmount = 0.04,
  triggerOnScroll = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const units = splitBy === "char"
    ? text.split("")
    : text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const inners = container.querySelectorAll<HTMLSpanElement>(".text-reveal-inner");

    gsap.set(inners, { yPercent: 100, opacity: 0 });

    const animProps = {
      yPercent: 0,
      opacity: 1,
      stagger: staggerAmount,
      delay,
      ease: "power3.out",
      duration: 0.8,
    };

    if (triggerOnScroll) {
      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.to(inners, animProps),
      });
      return () => trigger.kill();
    } else {
      gsap.to(inners, animProps);
    }
  }, [delay, staggerAmount, triggerOnScroll]);

  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLHeadingElement>} className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", lineHeight: "inherit" }}
        >
          <span className="text-reveal-inner" style={{ display: "inline-block" }}>
            {unit}
          </span>
          {splitBy === "word" && i < units.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
