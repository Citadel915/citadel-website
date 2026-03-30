"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const STORAGE_KEY = "citadel-intro-seen";
const EASE = [0.25, 0, 0.15, 1] as const;

interface IntroSequenceProps {
  isReady: boolean;
  onComplete: () => void;
}

export default function IntroSequence({ isReady, onComplete }: IntroSequenceProps) {
  const [show, setShow] = useState(false);

  const containerRef  = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const citadelRef    = useRef<HTMLSpanElement>(null);
  const byRef         = useRef<HTMLSpanElement>(null);
  const timelineRef   = useRef<gsap.core.Timeline | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      onComplete();
    } else {
      setShow(true);
    }
  }, [onComplete]);

  // Lock scroll while intro is showing
  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  // Start animation only when preloader is done and this component should show
  useEffect(() => {
    if (!isReady || !show) return;

    const line    = lineRef.current;
    const citadel = citadelRef.current;
    const by      = byRef.current;
    const container = containerRef.current;
    if (!line || !citadel || !by || !container) return;

    // Set initial states
    gsap.set(line,    { scaleX: 0, transformOrigin: "center center" });
    gsap.set(citadel, { opacity: 0, y: 8 });
    gsap.set(by,      { opacity: 0, y: 6 });

    const complete = () => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      document.body.style.overflow = "";
      onComplete();
    };

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl
      .to(line, {
        scaleX: 1,
        duration: 0.8,
        delay: 0.3,
        ease: `cubic-bezier(${EASE.join(",")})`,
      })
      .to(citadel, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: `cubic-bezier(${EASE.join(",")})`,
      }, "-=0.1")
      .to(by, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: `cubic-bezier(${EASE.join(",")})`,
      }, "+=0.0")
      .to(container, {
        opacity: 0,
        duration: 0.5,
        delay: 0.8,
        ease: "power2.out",
        onComplete: complete,
      });

    return () => { tl.kill(); };
  }, [isReady, show, onComplete]);

  // Scroll-to-skip
  useEffect(() => {
    if (!show || !isReady) return;

    const skip = () => {
      timelineRef.current?.kill();
      sessionStorage.setItem(STORAGE_KEY, "true");
      document.body.style.overflow = "";
      onComplete();
    };

    window.addEventListener("scroll", skip, { once: true, passive: true });
    return () => window.removeEventListener("scroll", skip);
  }, [show, isReady, onComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        backgroundColor: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* CITADEL — above the line */}
        <span
          ref={citadelRef}
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "13px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#EDEDEB",
            marginBottom: "16px",
            display: "block",
          }}
        >
          CITADEL
        </span>

        {/* Gold line */}
        <div
          ref={lineRef}
          style={{
            width: "35vw",
            height: "1px",
            backgroundColor: "#C9A96E",
          }}
        />

        {/* by Gold Standard — below the line */}
        <span
          ref={byRef}
          style={{
            fontFamily: "var(--font-dm-sans), Helvetica Neue, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#C9A96E",
            marginTop: "12px",
            display: "block",
          }}
        >
          by Gold Standard
        </span>
      </div>
    </div>
  );
}
