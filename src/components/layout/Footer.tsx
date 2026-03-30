import Link from "next/link";

const navLinks = [
  { label: "Services",             href: "/services" },
  { label: "Facility & Security",  href: "/facility" },
  { label: "SmartVault",           href: "/smartvault" },
  { label: "About",                href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const labelClass = "font-body text-[11px] tracking-[0.2em] uppercase text-citadel-text-muted mb-6";
const linkClass  = "font-body text-[14px] text-citadel-text-body hover:text-citadel-text transition-colors duration-300";

export default function Footer() {
  return (
    <footer className="bg-citadel-black border-t border-citadel-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1 — Brand */}
          <div className="border-b border-citadel-border pb-8 mb-8 md:border-0 md:pb-0 md:mb-0">
            <div className="flex flex-col">
              <span className="font-display text-[14px] tracking-[0.3em] uppercase text-citadel-text leading-none">
                CITADEL
              </span>
              <span className="font-body text-[9px] tracking-[0.2em] uppercase text-citadel-gold mt-1">
                by Gold Standard
              </span>
            </div>
            <p className="mt-6 font-body text-[13px] text-citadel-text-muted leading-relaxed">
              Custody-grade vehicle care. Brentford, West London.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="border-b border-citadel-border pb-8 mb-8 md:border-0 md:pb-0 md:mb-0">
            <p className={labelClass}>Navigation</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass} data-cursor="hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div className="border-b border-citadel-border pb-8 mb-8 md:border-0 md:pb-0 md:mb-0">
            <p className={labelClass}>Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:enquiries@citadelbygoldstandard.co.uk" className={linkClass} data-cursor="hover">
                  enquiries@citadelbygoldstandard.co.uk
                </a>
              </li>
              <li>
                <a href="tel:+440000000000" className={linkClass} data-cursor="hover">
                  +44 (0) XXXX XXXXXX
                </a>
              </li>
              <li>
                <span className="font-body text-[14px] text-citadel-text-body">
                  Brentford, West London, TW8
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <div>
            <p className={labelClass}>Legal</p>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass} data-cursor="hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-body text-[12px] text-citadel-text-muted">© 2026 Gold Standard Ltd</p>
              <p className="font-body text-[12px] text-citadel-text-muted mt-1">Company No. XXXXXXXX</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
