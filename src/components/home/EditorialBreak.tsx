import FadeIn from "@/components/ui/FadeIn";

export default function EditorialBreak() {
  return (
    <section
      className="relative h-[70vh] overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Animated radial gradient — barely perceptible breathing effect */}
      <div
        className="editorial-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.015) 0%, transparent 60%)",
        }}
      />

      {/* Centred atmospheric line */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <FadeIn direction="none" delay={0.1}>
          <p className="font-display italic text-[15px] md:text-[17px] text-citadel-text-muted/60 tracking-[0.08em] text-center">
            Where precision meets permanence.
          </p>
        </FadeIn>
      </div>

      <style>{`
        @keyframes editorial-drift {
          0%   { transform: translate(0%,   0%)   scale(1);    }
          50%  { transform: translate(5%,   5%)   scale(1.08); }
          100% { transform: translate(0%,   0%)   scale(1);    }
        }
        .editorial-glow {
          animation: editorial-drift 12s ease-in-out infinite alternate;
        }
      `}</style>
    </section>
  );
}
