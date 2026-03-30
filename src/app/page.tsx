export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <h1
          className="font-display text-citadel-text tracking-[0.15em] uppercase"
          style={{ fontSize: "clamp(5rem, 16vw, 14rem)", lineHeight: 1 }}
        >
          CITADEL
        </h1>
        <p className="font-body uppercase text-citadel-gold tracking-[0.5em]"
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
    </main>
  );
}
