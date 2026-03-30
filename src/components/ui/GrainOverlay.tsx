"use client";

export default function GrainOverlay() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          pointerEvents: "none",
          opacity: 0.04,
          filter: "url(#grain-filter)",
          animation: "grain 0.5s steps(1) infinite",
        }}
      />

      <style>{`
        @keyframes grain {
          0%  { transform: translate(0px, 0px); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-1px, 3px); }
          40% { transform: translate(3px, -1px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(1px, -3px); }
          70% { transform: translate(-3px, 1px); }
          80% { transform: translate(2px, 2px); }
          90% { transform: translate(-1px, -2px); }
          100%{ transform: translate(0px, 0px); }
        }
      `}</style>
    </>
  );
}
