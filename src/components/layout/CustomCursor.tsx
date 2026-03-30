"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only on fine pointer devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button") ||
        target.closest("[data-cursor='hover']")
      ) {
        setHovered(true);
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button") ||
        target.closest("[data-cursor='hover']")
      ) {
        setHovered(false);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    const tick = () => {
      const lerp = 0.15;
      pos.current.x += (mouse.current.x - pos.current.x) * lerp;
      pos.current.y += (mouse.current.y - pos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(calc(-50% + ${pos.current.x}px), calc(-50% + ${pos.current.y}px))`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9998,
        width: hovered ? "48px" : "20px",
        height: hovered ? "48px" : "20px",
        borderRadius: "50%",
        border: "1.5px solid #C9A96E",
        backgroundColor: hovered ? "rgba(201,169,110,0.08)" : "transparent",
        transition: "width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out",
      }}
    />
  );
}
