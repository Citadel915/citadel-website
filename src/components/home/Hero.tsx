"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const content   = contentRef.current;
    const scrollInd = scrollIndRef.current;
    if (!section || !content || !scrollInd) return;

    // Scroll indicator fades out over first 200px of scroll
    const indTrigger = ScrollTrigger.create({
      start: "top top",
      end: "200px top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(scrollInd, { opacity: 1 - self.progress });
      },
    });

    // Content parallax + fade as hero scrolls out
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(content, {
          y: self.progress * -40,
          opacity: 1 - self.progress * 0.7,
        });
      },
    });

    return () => {
      indTrigger.kill();
      parallaxTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-citadel-black" />
      <div
        className="absolute inset-0 hero-bg-anim"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(201,169,110,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(13,13,20,0.5) 0%, transparent 50%)
          `,
        }}
      />

      {/* Noise grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full pt-[80px]"
      >
        <div className="pl-6 md:pl-10 lg:pl-20 xl:pl-[10%] max-w-[650px]
                        max-lg:mx-auto max-lg:text-center max-lg:px-6">

          {/* Eyebrow */}
          <TextReveal
            text="Vehicle Custody & Asset Intelligence"
            as="p"
            splitBy="word"
            triggerOnScroll={false}
            delay={0.2}
            staggerAmount={0.04}
            className="font-body text-eyebrow uppercase tracking-[0.3em] text-citadel-gold"
          />

          {/* H1 */}
          <TextReveal
            text="Protection Beyond Storage"
            as="h1"
            splitBy="word"
            triggerOnScroll={false}
            delay={0.5}
            staggerAmount={0.06}
            className="mt-6 font-display text-display-xl text-citadel-text"
          />

          {/* Subheading */}
          <FadeIn direction="up" delay={0.9} className="mt-8">
            <p className="font-body text-body-lg text-citadel-text-body leading-relaxed">
              Citadel provides custody-grade care, condition intelligence, and
              concierge services for vehicles of distinction.
            </p>
            <p className="mt-2 font-body text-body-lg text-citadel-text-muted">
              Secured facility. West London.
            </p>
          </FadeIn>

          {/* CTA */}
          <FadeIn direction="up" delay={1.1} className="mt-10">
            <Button href="/contact" variant="primary">
              Enquire About Custody
            </Button>
          </FadeIn>

          {/* Secondary link */}
          <FadeIn direction="up" delay={1.2} className="mt-5">
            <Link
              href="/services"
              className="font-body text-[13px] text-citadel-text-muted underline underline-offset-4 decoration-citadel-border hover:text-citadel-text hover:decoration-citadel-text-muted transition-all duration-300"
              data-cursor="hover"
            >
              Explore Our Services
            </Link>
          </FadeIn>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-citadel-text-muted">
          Scroll
        </span>
        <div className="relative w-px h-6 bg-citadel-border overflow-hidden">
          <div className="scroll-line-dot absolute top-0 left-0 w-full bg-citadel-gold" />
        </div>
      </div>

      <style>{`
        /* Background gradient animation */
        @keyframes hero-bg-shift {
          0%   { opacity: 1;    transform: scale(1)    translate(0, 0);       }
          50%  { opacity: 0.85; transform: scale(1.04) translate(1.5%, 1%);   }
          100% { opacity: 1;    transform: scale(1)    translate(0, 0);       }
        }
        .hero-bg-anim {
          animation: hero-bg-shift 12s ease-in-out infinite alternate;
        }

        /* Scroll line dot travelling down */
        @keyframes scroll-dot {
          0%   { top: -100%; height: 100%; opacity: 1; }
          100% { top: 100%;  height: 100%; opacity: 0; }
        }
        .scroll-line-dot {
          height: 100%;
          animation: scroll-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
