"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const STORAGE_KEY = "citadel-intro-seen";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);

  // Preloader refs
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);

  // Intro refs
  const introRef  = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);
  const titleRef  = useRef<HTMLSpanElement>(null);
  const subRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    // setTimeout(0) is the correct StrictMode fix:
    // StrictMode unmounts immediately → clearTimeout fires → nothing starts.
    // The second (real) mount queues a fresh timeout and runs cleanly.
    const timer = setTimeout(() => {
      const preloader = preloaderRef.current;
      const progress  = progressRef.current;
      const intro     = introRef.current;
      const line      = lineRef.current;
      const title     = titleRef.current;
      const sub       = subRef.current;
      if (!preloader || !progress || !intro || !line || !title || !sub) return;

      const skipIntro = !!sessionStorage.getItem(STORAGE_KEY);

    // Set intro initial states (hidden until needed)
    gsap.set(intro,  { autoAlpha: 0 });
    gsap.set(line,   { scaleX: 0, transformOrigin: "center center" });
    gsap.set(title,  { autoAlpha: 0, y: 8 });
    gsap.set(sub,    { autoAlpha: 0, y: 6 });

    const finish = () => {
      window.scrollTo(0, 0);
      setVisible(false);
      onComplete();
    };

    // ── Phase 1: Preloader ──────────────────────────────
    tl = gsap.timeline();

    tl.to(progress, {
      width: "80%",
      duration: 1.2,
      ease: "power2.out",
    });

    tl.add(() => {
      document.fonts.ready.then(() => {
        gsap.to(progress, {
          width: "100%",
          duration: 0.25,
          ease: "power2.out",
          onComplete: () => {
            if (skipIntro) {
              // Fade out preloader and go directly to site
              gsap.to(preloader, {
                autoAlpha: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out",
                onComplete: finish,
              });
            } else {
              // ── Phase 2: Cross-fade to intro ──────────────
              gsap.to(preloader, {
                autoAlpha: 0,
                duration: 0.4,
                delay: 0.2,
                ease: "power2.out",
                onComplete: () => {
                  // Show intro panel
                  gsap.set(intro, { autoAlpha: 1 });

                  // Lock scroll
                  document.body.style.overflow = "hidden";

                  const introTl = gsap.timeline();

                  introTl
                    .to(line, {
                      scaleX: 1,
                      duration: 0.8,
                      delay: 0.3,
                      ease: "power3.inOut",
                    })
                    .to(title, {
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.6,
                      ease: "power3.out",
                    }, "-=0.2")
                    .to(sub, {
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.5,
                      ease: "power3.out",
                    }, "+=0.05")
                    .to(intro, {
                      autoAlpha: 0,
                      duration: 0.6,
                      delay: 0.9,
                      ease: "power2.out",
                      onComplete: () => {
                        sessionStorage.setItem(STORAGE_KEY, "true");
                        document.body.style.overflow = "";
                        finish();
                      },
                    });

                  // Scroll-to-skip
                  const skip = () => {
                    introTl.kill();
                    gsap.to(intro, {
                      autoAlpha: 0,
                      duration: 0.3,
                      onComplete: () => {
                        sessionStorage.setItem(STORAGE_KEY, "true");
                        document.body.style.overflow = "";
                        finish();
                      },
                    });
                  };
                  window.addEventListener("scroll", skip, { once: true, passive: true });
                },
              });
            }
          },
        });
      });
    });

    }, 0); // end setTimeout

    return () => {
      clearTimeout(timer);
      tl?.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <>
      {/* Preloader panel */}
      <div
        ref={preloaderRef}
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
      </div>

      {/* Intro panel */}
      <div
        ref={introRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          backgroundColor: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          visibility: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span
            ref={titleRef}
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

          <div
            ref={lineRef}
            style={{
              width: "35vw",
              height: "1px",
              backgroundColor: "#C9A96E",
            }}
          />

          <span
            ref={subRef}
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

      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
