const sections = [
  { label: "Section 1", bg: "#0A0A0A" },
  { label: "Section 2", bg: "#111111" },
  { label: "Section 3", bg: "#0A0A0A" },
  { label: "Section 4", bg: "#111111" },
  { label: "Section 5", bg: "#0A0A0A" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="flex flex-col items-center gap-3">
          <h1
            className="font-display text-citadel-text tracking-[0.15em] uppercase"
            style={{ fontSize: "clamp(5rem, 16vw, 14rem)", lineHeight: 1 }}
          >
            CITADEL
          </h1>
          <p
            className="font-body uppercase text-citadel-gold tracking-[0.5em]"
            style={{ fontSize: "clamp(0.6rem, 1.4vw, 0.95rem)" }}
          >
            by Gold Standard
          </p>
        </div>

        <div className="w-16 h-px bg-citadel-gold opacity-60 my-2" />

        <p
          className="font-display italic text-citadel-text-body text-center"
          style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "0.02em" }}
        >
          A new standard in vehicle custody
        </p>
      </section>

      {/* Scroll test sections */}
      {sections.map((s, i) => (
        <section
          key={i}
          className="min-h-screen flex flex-col items-center justify-center gap-4"
          style={{ backgroundColor: s.bg }}
        >
          <p className="font-body text-citadel-text-muted tracking-[0.3em] uppercase text-sm">
            {s.label}
          </p>
          <p className="font-display text-citadel-text-body italic"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Scroll is working
          </p>
        </section>
      ))}
    </main>
  );
}
