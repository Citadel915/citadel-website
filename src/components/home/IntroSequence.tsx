"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

const SESSION_KEY = "citadel_intro_seen";

export default function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only run on client — check sessionStorage
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDone(true);
      return;
    }
    setVisible(true);

    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Total intro runtime: 3.0s — then fade out (0.5s) = 3.5s until unmount
    const timer = setTimeout(() => {
      dismissIntro();
    }, 3000);

    // Allow scroll-to-skip
    const onScroll = () => dismissIntro();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dismissIntro() {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "";
    setVisible(false);
    // Give the fade-out (0.5s) time to finish before unmounting
    setTimeout(() => setDone(true), 600);
  }

  if (done) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
          onClick={dismissIntro}
        >
          <div className="flex flex-col items-center gap-0">
            {/* "CITADEL" — appears at T+0.8s */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.8 }}
              className="font-display text-[14px] tracking-[0.35em] uppercase text-citadel-text-primary mb-3 block"
            >
              CITADEL
            </motion.span>

            {/* Gold line — draws from T+0.3s */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.3 }}
              style={{ originX: 0.5 }}
              className="h-px bg-citadel-gold w-[40vw] max-w-[320px]"
            />

            {/* "by Gold Standard" — appears at T+1.2s */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 1.2 }}
              className="font-body text-[11px] tracking-[0.25em] uppercase text-citadel-gold mt-3 block"
            >
              by Gold Standard
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
