import Link from "next/link";

const navLinks = [
  { label: "Services",   href: "/services" },
  { label: "Facility & Security", href: "/facility" },
  { label: "SmartVault", href: "/smartvault" },
  { label: "About",      href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-citadel-black border-t border-citadel-border">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col">
              <span className="font-display text-[15px] tracking-[0.3em] uppercase text-citadel-text-primary leading-none">
                CITADEL
              </span>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-citadel-gold leading-none mt-[4px]">
                by Gold Standard
              </span>
            </div>
            <p className="mt-6 font-body text-[13px] text-citadel-text-muted leading-relaxed max-w-[200px]">
              Custody-grade care for vehicles of distinction.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[11px] tracking-[0.15em] uppercase text-citadel-text-muted mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13px] text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[11px] tracking-[0.15em] uppercase text-citadel-text-muted mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:enquiries@citadelbygoldstandard.co.uk"
                  className="font-body text-[13px] text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
                >
                  enquiries@citadelbygoldstandard.co.uk
                </a>
              </li>
              <li>
                <a
                  href="tel:+44000000000"
                  className="font-body text-[13px] text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
                >
                  +44 (0) XXXX XXXXXX
                </a>
              </li>
              <li>
                <span className="font-body text-[13px] text-citadel-text-muted">
                  West London, TW8
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-body text-[11px] tracking-[0.15em] uppercase text-citadel-text-muted mb-5">
              Legal
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/privacy"
                  className="font-body text-[13px] text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-body text-[13px] text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="font-body text-[13px] text-citadel-text-muted">
                  © 2026 Gold Standard Ltd
                </span>
              </li>
              <li>
                <span className="font-body text-[13px] text-citadel-text-muted">
                  Company No. XXXXXXXX
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-citadel-border">
          <p className="font-body text-[12px] text-citadel-text-muted text-center">
            Citadel by Gold Standard Ltd — Vehicle Custody &amp; Asset Intelligence — West London
          </p>
        </div>
      </div>
    </footer>
  );
}
