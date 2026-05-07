"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 });

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 600, mass: 0.2 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 600, mass: 0.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHoverIn = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(2.5)";
        cursorRef.current.style.borderColor = "transparent";
        cursorRef.current.style.backgroundColor = "rgba(10,10,10,0.08)";
      }
    };

    const handleHoverOut = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        cursorRef.current.style.borderColor = "#0A0A0A";
        cursorRef.current.style.backgroundColor = "transparent";
      }
    };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#0A0A0A] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          transition: "background-color 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.25,1,0.5,1)",
        }}
      />
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#0A0A0A] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
        }}
      />
    </>
  );
}
