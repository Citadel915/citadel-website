"use client";

import { useState } from "react";
import Preloader from "@/components/home/Preloader";

export default function HomePage() {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <Preloader onComplete={() => setDone(true)} />}

      {done && (
        <main className="min-h-screen flex items-center justify-center">
          <p className="font-body text-[13px] tracking-[0.2em] uppercase text-citadel-text-muted">
            Homepage content will go here
          </p>
        </main>
      )}
    </>
  );
}
