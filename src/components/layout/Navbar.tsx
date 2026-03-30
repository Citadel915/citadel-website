"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Services",   href: "/services" },
  { label: "Facility",   href: "/facility" },
  { label: "SmartVault", href: "/smartvault" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #222222" : "1px solid transparent",
        }}
      >
        <div
          className="flex items-center justify-between px-8 md:px-12 lg:px-16"
          style={{ height: "80px", alignItems: "center" }}
        >
          {/* Logo */}
          <Link href="/" data-cursor="hover" className="block">
            <Image
              src="/logo.png"
              alt="Citadel by Gold Standard"
              width={120}
              height={120}
              className="object-contain w-auto"
              style={{
                height: "56px",
                mixBlendMode: "screen",
              }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className="font-body text-[12px] tracking-[0.15em] uppercase text-citadel-text-muted hover:text-citadel-text transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              data-cursor="hover"
              className="ml-8 border border-citadel-gold text-citadel-gold font-body text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 hover:bg-citadel-gold/10 transition-all duration-300"
            >
              Enquire
            </Link>
          </nav>

          {/* Mobile hamburger — large hit area, bigger lines */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center gap-[7px]"
            style={{ width: "44px", height: "44px" }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              style={{
                display: "block",
                width: "28px",
                height: "2px",
                backgroundColor: "#EDEDEB",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(9px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "28px",
                height: "2px",
                backgroundColor: "#EDEDEB",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "28px",
                height: "2px",
                backgroundColor: "#EDEDEB",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "translateY(-9px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-citadel-black flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    data-cursor="hover"
                    className="font-display text-[28px] tracking-[0.05em] text-citadel-text hover:text-citadel-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: links.length * 0.08 }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  data-cursor="hover"
                  className="border border-citadel-gold text-citadel-gold font-body text-[13px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-citadel-gold/10 transition-all duration-300"
                >
                  Enquire
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
