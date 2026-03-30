"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  className?: string;
  onClick?: () => void;
}

const base =
  "group inline-flex items-center gap-2 font-body font-medium text-[13px] tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300 cursor-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-citadel-gold text-citadel-black hover:bg-citadel-gold-light hover:scale-[1.02]",
  outline:
    "border border-citadel-gold text-citadel-gold bg-transparent hover:bg-citadel-gold/10",
};

function Arrow() {
  return (
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  );
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} data-cursor="hover">
        {children}
        <Arrow />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} data-cursor="hover">
      {children}
      <Arrow />
    </button>
  );
}
