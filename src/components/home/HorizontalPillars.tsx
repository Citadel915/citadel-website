"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FadeIn from "@/components/ui/FadeIn";

// ── Icons ────────────────────────────────────────────────────────────────────

function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M20 5L7 11v9c0 8.4 5.6 16.3 13 18.8C27.4 36.3 33 28.4 33 20v-9L20 5z"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M20 6l4.2 8.6 9.5 1.4-6.9 6.7 1.6 9.5L20 27.8l-8.4 4.4 1.6-9.5L6.3 16l9.5-1.4L20 6z"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="15" cy="19" r="7.5" stroke="#C9A96E" strokeWidth="1.5" />
      <path
        d="M21 19h13M30 19v4"
        stroke="#C9A96E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS = [ShieldIcon, StarIcon, KeyIcon];

// ── Panel data ───────────────────────────────────────────────────────────────

const panels = [
  {
    title: "Secured Storage",
    body: "Your vehicle resides in a DP3-specification facility with 24/7 monitoring, climate awareness, and specialist motor trade insurance. Individual bays. Controlled access.",
    href: "/services#storage",
    gradient: "radial-gradient(ellipse at 60% 50%, #0F0F18 0%, #0A0A12 100%)",
  },
  {
    title: "Specialist Detailing",
    body: "Correction, protection, and ongoing maintenance delivered by trained technicians. Each vehicle receives a documented care programme tailored to its materials and finish.",
    href: "/services#detailing",
    gradient: "radial-gradient(ellipse at 60% 50%, #12100C 0%, #0F0D0A 100%)",
  },
  {
    title: "Concierge Services",
    body: "Collection, delivery, MOT coordination, servicing logistics, and event preparation. Your vehicle is ready when you are, wherever you need it.",
    href: "/services#concierge",
    gradient: "radial-gradient(ellipse at 60% 50%, #110F0B 0%, #0D0C0A 100%)",
  },
];

// ── Panel content (shared between desktop + mobile) ──────────────────────────

function PanelContent({ panel, index }: { panel: typeof panels[0]; index: number }) {
  const Icon = ICONS[index];
  return (
    <>
      <Icon />
      <h3
        className="font-display text-display-md text-citadel-text"
        style={{ marginTop: "24px" }}
      >
        {panel.title}
      </h3>
      <p
        className="font-body text-body-lg text-citadel-text-body"
        style={{ marginTop: "16px", maxWidth: "400px" }}
      >
        {panel.body}
      </p>
      <Link
        href={panel.href}
        className="font-body text-caption text-citadel-gold hover:text-citadel-gold-light transition-colors duration-300"
        style={{ marginTop: "32px", display: "inline-block" }}
        data-cursor="hover"
      >
        Learn More →
      </Link>
    </>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function HorizontalPillars() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const anim = gsap.to(track, {
      x: () => -(window.innerWidth * 2),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${window.innerWidth * 2}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(Math.min(panels.length - 1, Math.floor(self.progress * panels.length)));
        },
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div
        ref={sectionRef}
        className="hidden lg:block relative"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Horizontal track: three 100vw panels side by side */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: "300vw",
            height: "100vh",
            willChange: "transform",
          }}
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                backgroundColor: "#0A0A0A",
                flexShrink: 0,
              }}
            >
              {/* Left — content */}
              <div
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: "10%",
                  paddingRight: "4%",
                }}
              >
                <PanelContent panel={panel} index={i} />
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  backgroundColor: "#222222",
                  alignSelf: "stretch",
                  margin: "0 48px",
                  flexShrink: 0,
                }}
              />

              {/* Right — atmospheric gradient placeholder */}
              <div style={{ flex: 1, background: panel.gradient }} />
            </div>
          ))}
        </div>

        {/* Progress indicator — stays fixed in the pinned section */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {panels.map((_, j) => (
            <div
              key={j}
              style={{
                height: "2px",
                width: active === j ? "32px" : "16px",
                backgroundColor: active === j ? "#C9A96E" : "#222222",
                transition: "width 0.4s ease, background-color 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile — stacked ────────────────────────────────────────────── */}
      <div className="lg:hidden" style={{ backgroundColor: "#0A0A0A" }}>
        {panels.map((panel, i) => (
          <FadeIn key={i} direction="up">
            <div
              style={{
                padding: "64px 24px",
                borderBottom: i < panels.length - 1 ? "1px solid #222222" : "none",
              }}
            >
              <PanelContent panel={panel} index={i} />
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
