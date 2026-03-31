"use client";

import { useState } from "react";
import Preloader from "@/components/home/Preloader";
import Hero from "@/components/home/Hero";

export default function HomePage() {
  const [done, setDone] = useState(false);

  return (
    <>
      {!done && <Preloader onComplete={() => setDone(true)} />}
      {done && <Hero />}
    </>
  );
}
