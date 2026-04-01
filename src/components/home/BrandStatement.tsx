import TextReveal from "@/components/ui/TextReveal";

export default function BrandStatement() {
  return (
    <section
      style={{
        backgroundColor: "#111111",
        borderTop: "1px solid #222222",
        borderBottom: "1px solid #222222",
      }}
      className="py-16 md:py-24"
    >
      <div
        style={{ maxWidth: "800px", margin: "0 auto" }}
        className="px-6"
      >
        <TextReveal
          text="Custody-grade protection for vehicles valued as assets, not possessions."
          as="p"
          splitBy="word"
          className="font-display italic text-body-lg md:text-display-md text-citadel-gold text-center leading-snug"
        />
      </div>
    </section>
  );
}
