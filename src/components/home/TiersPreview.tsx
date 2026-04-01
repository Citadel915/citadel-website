import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import FadeIn from "@/components/ui/FadeIn";

interface TierCardProps {
  name: string;
  body: string;
  price: string;
  featured?: boolean;
  delay: number;
}

function TierCard({ name, body, price, featured = false, delay }: TierCardProps) {
  return (
    <FadeIn direction="up" delay={delay}>
      <div
        className={`group relative p-8 md:p-10 lg:p-12 h-full flex flex-col
                   bg-citadel-charcoal border transition-colors duration-300
                   hover:border-citadel-gold
                   ${featured ? "border-citadel-gold" : "border-citadel-border"}`}
        style={{
          boxShadow: featured ? "0 0 40px rgba(201,169,110,0.05)" : "none",
        }}
        data-cursor="hover"
      >
        {/* Recommended badge */}
        {featured && (
          <span
            className="absolute top-6 right-6 font-body text-[10px] uppercase
                       tracking-[0.2em] text-citadel-gold bg-citadel-gold/10 px-3 py-1.5"
          >
            Recommended
          </span>
        )}

        {/* Tier name */}
        <p className="font-display text-heading-sm text-citadel-text">{name}</p>

        {/* Divider */}
        <div
          className="bg-citadel-border"
          style={{ width: "40px", height: "1px", margin: "24px 0" }}
        />

        {/* Body — flex-1 so price/link always anchors to bottom */}
        <p className="font-body text-body text-citadel-text-body flex-1">{body}</p>

        {/* Price */}
        <p
          className="font-body text-caption text-citadel-gold tracking-normal"
          style={{ marginTop: "32px" }}
        >
          {price}
        </p>

        {/* Link */}
        <Link
          href="/services"
          className="font-body text-caption text-citadel-text-muted tracking-normal
                     hover:text-citadel-gold transition-colors duration-300
                     inline-block"
          style={{ marginTop: "16px" }}
          data-cursor="hover"
        >
          View Details →
        </Link>
      </div>
    </FadeIn>
  );
}

export default function TiersPreview() {
  return (
    <SectionWrapper padding="standard" className="bg-citadel-black">
      {/* Heading */}
      <FadeIn direction="up">
        <div className="text-center mb-16">
          <p className="font-body text-eyebrow uppercase tracking-[0.3em] text-citadel-gold">
            Membership
          </p>
          <h2
            className="font-display text-display-md text-citadel-text"
            style={{ marginTop: "16px" }}
          >
            Select Your Level of Custody
          </h2>
        </div>
      </FadeIn>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TierCard
          name="Essential"
          body="Secured custody with core protection and climate-aware storage."
          price="From £750/month"
          delay={0.1}
        />
        <TierCard
          name="Concierge"
          body="Full custody with active vehicle management, concierge coordination, and priority scheduling."
          price="From £1,000/month"
          featured
          delay={0.25}
        />
        <TierCard
          name="Vault"
          body="Complete custody. Total discretion. Dedicated account management. Priority everything."
          price="From £1,500/month"
          delay={0.4}
        />
      </div>
    </SectionWrapper>
  );
}
