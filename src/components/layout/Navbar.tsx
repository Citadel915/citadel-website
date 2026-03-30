"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SMOOTH, DURATION, STAGGER } from "@/lib/motion";

const navLinks = [
  { label: "Services",          href: "/services" },
  { label: "Facility",          href: "/facility" },
  { label: "SmartVault",        href: "/smartvault" },
  { label: "About",             href: "/about" },
  { label: "Contact",           href: "/contact" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? "bg-citadel-dark/95 backdrop-blur-md border-b border-citadel-border"
            : "bg-transparent border-b border-transparent"}
        `}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group" aria-label="Citadel home">
            <span className="font-display text-[16px] tracking-[0.3em] uppercase text-citadel-text-primary leading-none">
              CITADEL
            </span>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-citadel-gold leading-none mt-[3px]">
              by Gold Standard
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-[13px] tracking-wider uppercase text-citadel-text-muted hover:text-citadel-text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="ml-4 px-5 py-2 border border-citadel-gold text-citadel-gold font-body text-[12px] tracking-wider uppercase hover:bg-citadel-gold hover:text-citadel-black transition-all duration-300"
            >
              Enquire
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-px bg-citadel-text-primary transition-all duration-300 origin-right ${
                menuOpen ? "w-6 rotate-[-45deg] translate-y-[4px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-citadel-text-primary transition-all duration-300 ${
                menuOpen ? "opacity-0 w-4" : "opacity-100 w-4"
              }`}
            />
            <span
              className={`block h-px bg-citadel-text-primary transition-all duration-300 origin-right ${
                menuOpen ? "w-6 rotate-[45deg] translate-y-[-4px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_SMOOTH }}
            className="fixed inset-0 z-40 bg-citadel-black flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.medium,
                    ease: EASE_SMOOTH,
                    delay: i * STAGGER.normal,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-[28px] text-citadel-text-primary hover:text-citadel-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.medium,
                  ease: EASE_SMOOTH,
                  delay: navLinks.length * STAGGER.normal,
                }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 px-8 py-3 border border-citadel-gold text-citadel-gold font-body text-[13px] tracking-wider uppercase hover:bg-citadel-gold hover:text-citadel-black transition-all duration-300"
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
