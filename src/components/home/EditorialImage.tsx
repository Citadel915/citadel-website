"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

export default function EditorialImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: image moves at 90% of scroll speed (10% differential)
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <FadeIn direction="none">
      <div
        ref={ref}
        className="relative overflow-hidden"
        style={{ height: "70vh" }}
        aria-hidden="true"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y, scale: 1.1 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(45deg, #0A0A0A 0%, #0e0e16 25%, #121218 50%, #0e0e16 75%, #0A0A0A 100%)",
              filter: "saturate(0.8) brightness(0.85)",
            }}
          />
        </motion.div>

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.6) 80%, rgba(10,10,10,0.9) 100%)",
          }}
        />

        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>
    </FadeIn>
  );
}
