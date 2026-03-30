"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress  = progressRef.current;
    if (!container || !progress) return;

    // Animate to 80% while waiting for fonts
    gsap.to(progress, { width: "80%", duration: 1.5, ease: "power2.out" });

    document.fonts.ready.then(() => {
      // Snap to 100%
      gsap.to(progress, {
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Hold briefly, then fade out
          gsap.to(container, {
            opacity: 0,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
            onComplete,
          });
        },
      });
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 70,
        backgroundColor: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Pulsing text */}
      <span
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "12px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "#8A8A8A",
          animation: "preloader-pulse 2s ease-in-out infinite",
        }}
      >
        CITADEL
      </span>

      {/* Progress bar */}
      <div
        style={{
          marginTop: "24px",
          width: "120px",
          height: "1px",
          backgroundColor: "#222222",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={progressRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "1px",
            width: "0%",
            backgroundColor: "#C9A96E",
          }}
        />
      </div>

      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
