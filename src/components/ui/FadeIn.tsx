"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";
import { EASE_SMOOTH, DURATION, REVEAL } from "@/lib/motion";

interface FadeInProps extends MotionProps {
  children: ReactNode;
  direction?: "up" | "left" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION.medium,
  className = "",
  ...rest
}: FadeInProps) {
  const variantMap = {
    up:   REVEAL.fadeUp,
    left: REVEAL.slideInLeft,
    none: REVEAL.fadeIn,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variantMap[direction]}
      transition={{ duration, ease: EASE_SMOOTH, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
