"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FadeIn from "@/components/ui/FadeIn";

// ── Copy ─────────────────────────────────────────────────────────────────────

const H2_WORDS = "Every Vehicle. Fully Documented. Continuously Monitored.".split(" ");

const PARA_1 =
  "From the moment your vehicle enters Citadel, it receives a comprehensive digital intake — exterior and interior condition documented to forensic detail.";

const PARA_2 =
  "Ongoing condition reports, service records, and maintenance alerts are compiled into a living custody record accessible through your private client portal.";

const PARA_3 =
  "This is not storage with paperwork. This is institutional-grade asset stewardship applied to vehicles.";

// ── Data cards ────────────────────────────────────────────────────────────────

interface DataCard {
  label: string;
  value: string;
  gold?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  floatDelay: string;
}

const DATA_CARDS: DataCard[] = [
  {
    label: "Intake Status",
    value: "Complete",
    top: "6%",
    left: "4%",
    floatDelay: "0s",
  },
  {
    label: "Condition",
    value: "Documented",
    top: "8%",
    right: "4%",
    floatDelay: "1.3s",
  },
  {
    label: "Last Report",
    value: "14 March 2026",
    top: "38%",
    left: "26%",
    floatDelay: "0.7s",
  },
  {
    label: "Climate",
    value: "Monitored — 18°C",
    gold: true,
    bottom: "22%",
    left: "4%",
    floatDelay: "2s",
  },
  {
    label: "Insurance",
    value: "Active — Specialist",
    bottom: "8%",
    right: "4%",
    floatDelay: "0.4s",
  },
];

// ── Mobile stat card (no absolute positioning) ───────────────────────────────

function MobileCard({ card }: { card: DataCard }) {
  return (
    <div
      className={`p-3 ${card.gold ? "border border-citadel-gold" : "border border-citadel-border"}`}
      style={{ backgroundColor: "#161616" }}
    >
      <p className="font-body text-micro uppercase text-citadel-text-muted">
        {card.label}
      </p>
      <p className="font-mono text-caption text-citadel-text tracking-normal mt-1">
        {card.value}
      </p>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AssetIntelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);
  const para1Ref   = useRef<HTMLParagraphElement>(null);
  const para2Ref   = useRef<HTMLParagraphElement>(null);
  const para3Ref   = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLAnchorElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    // ── Set initial hidden states ──────────────────────────────────────────
    gsap.set(
      [eyebrowRef.current, para1Ref.current, para2Ref.current, para3Ref.current, ctaRef.current],
      { autoAlpha: 0, y: 20 }
    );

    if (h2Ref.current) {
      gsap.set(h2Ref.current.querySelectorAll("span"), { autoAlpha: 0, y: 15 });
    }

    cardRefs.current.forEach((card) => {
      if (card) gsap.set(card, { autoAlpha: 0 });
    });

    // ── Timeline ──────────────────────────────────────────────────────────
    // Total "duration": 7 units → maps to 250% of vh scroll distance.
    // Positions below correspond to the spec's scroll-% ranges
    // (multiply spec % by 7 to get timeline position).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=250%",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Left-column text
    tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 1.4 }, 0);

    const h2Spans = h2Ref.current?.querySelectorAll("span");
    if (h2Spans?.length) {
      tl.to(
        h2Spans,
        { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8 },
        1.05
      );
    }

    tl.to(para1Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, 2.1);
    tl.to(para2Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, 3.15);
    tl.to(para3Ref.current, { autoAlpha: 1, y: 0, duration: 1 }, 4.2);
    tl.to(ctaRef.current,   { autoAlpha: 1, y: 0, duration: 0.8 }, 4.9);

    // Right-column cards (opacity only — CSS handles the float)
    const cardPositions = [0.7, 1.75, 2.8, 3.85, 4.9];
    cardRefs.current.forEach((card, i) => {
      if (card) tl.to(card, { autoAlpha: 1, duration: 0.8 }, cardPositions[i]);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // ── JSX helpers ──────────────────────────────────────────────────────────

  const leftCol = (
    <div
      style={{
        width: "50%",
        paddingRight: "6%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p
        ref={eyebrowRef}
        className="font-body text-eyebrow uppercase tracking-[0.3em] text-citadel-gold"
      >
        Beyond Physical Custody
      </p>

      <h2
        ref={h2Ref}
        className="font-display text-display-lg text-citadel-text"
        style={{ marginTop: "20px" }}
      >
        {H2_WORDS.map((word, i) => (
          <span
            key={i}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </span>
        ))}
      </h2>

      <p
        ref={para1Ref}
        className="font-body text-body-lg text-citadel-text-body"
        style={{ marginTop: "24px", maxWidth: "480px" }}
      >
        {PARA_1}
      </p>

      <p
        ref={para2Ref}
        className="font-body text-body-lg text-citadel-text-body"
        style={{ marginTop: "16px", maxWidth: "480px" }}
      >
        {PARA_2}
      </p>

      <p
        ref={para3Ref}
        className="font-body text-body-lg text-citadel-text"
        style={{ marginTop: "16px", maxWidth: "480px" }}
      >
        {PARA_3}
      </p>

      <Link
        ref={ctaRef}
        href="/smartvault"
        className="font-body text-caption text-citadel-gold hover:text-citadel-gold-light transition-colors duration-300 tracking-normal"
        style={{ marginTop: "28px", display: "inline-block" }}
        data-cursor="hover"
      >
        Discover SmartVault →
      </Link>
    </div>
  );

  const rightCol = (
    <div
      style={{
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Visualization container */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          aspectRatio: "4 / 3",
          backgroundColor: "#0E0E0E",
          border: "1px solid rgba(34,34,34,0.5)",
          position: "relative",
          overflow: "hidden",
          /* CSS grid lines */
          backgroundImage: `
            repeating-linear-gradient(0deg,   transparent, transparent 39px, rgba(255,255,255,0.02) 40px),
            repeating-linear-gradient(90deg,  transparent, transparent 39px, rgba(255,255,255,0.02) 40px)
          `,
        }}
      >
        {/* SVG connecting lines */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <line x1="18%" y1="14%" x2="48%" y2="47%" stroke="rgba(34,34,34,0.4)" strokeWidth="1" />
          <line x1="78%" y1="16%" x2="52%" y2="47%" stroke="rgba(34,34,34,0.4)" strokeWidth="1" />
          <line x1="48%" y1="53%" x2="18%" y2="70%" stroke="rgba(34,34,34,0.4)" strokeWidth="1" />
          <line x1="52%" y1="53%" x2="78%" y2="72%" stroke="rgba(34,34,34,0.4)" strokeWidth="1" />
        </svg>

        {/* Absolutely positioned data cards */}
        {DATA_CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`card-float ${card.gold ? "border border-citadel-gold" : "border border-citadel-border"}`}
            style={{
              position: "absolute",
              top:    card.top,
              left:   card.left,
              right:  card.right,
              bottom: card.bottom,
              backgroundColor: "#161616",
              padding: "10px 14px",
              minWidth: "160px",
              animationDelay: card.floatDelay,
            }}
          >
            <p className="font-body text-micro uppercase text-citadel-text-muted">
              {card.label}
            </p>
            <p className="font-mono text-caption text-citadel-text tracking-normal mt-1">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Desktop — pinned ─────────────────────────────────────────────── */}
      <div
        ref={sectionRef}
        className="hidden lg:flex"
        style={{ height: "100vh", backgroundColor: "#111111", alignItems: "center", willChange: "transform" }}
      >
        <div
          className="px-6 md:px-10 lg:px-20"
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          {leftCol}
          {rightCol}
        </div>
      </div>

      {/* ── Mobile — stacked ─────────────────────────────────────────────── */}
      <div
        className="lg:hidden px-6 py-20"
        style={{ backgroundColor: "#111111" }}
      >
        <FadeIn direction="up">
          <p className="font-body text-eyebrow uppercase tracking-[0.3em] text-citadel-gold">
            Beyond Physical Custody
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h2
            className="font-display text-display-md text-citadel-text"
            style={{ marginTop: "20px" }}
          >
            Every Vehicle. Fully Documented. Continuously Monitored.
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p
            className="font-body text-body-lg text-citadel-text-body"
            style={{ marginTop: "20px" }}
          >
            {PARA_1}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.25}>
          <p
            className="font-body text-body-lg text-citadel-text-body"
            style={{ marginTop: "16px" }}
          >
            {PARA_2}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <p
            className="font-body text-body-lg text-citadel-text"
            style={{ marginTop: "16px" }}
          >
            {PARA_3}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.35}>
          <Link
            href="/smartvault"
            className="font-body text-[14px] text-citadel-gold hover:text-citadel-gold-light transition-colors duration-300"
            style={{ marginTop: "24px", display: "inline-block" }}
            data-cursor="hover"
          >
            Discover SmartVault →
          </Link>
        </FadeIn>

        {/* Mobile data cards — 2-col grid */}
        <FadeIn direction="up" delay={0.4}>
          <div
            className="grid grid-cols-2 gap-3"
            style={{ marginTop: "40px" }}
          >
            {DATA_CARDS.map((card, i) => (
              <MobileCard key={i} card={card} />
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes card-float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-3px); }
        }
        .card-float {
          animation: card-float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
