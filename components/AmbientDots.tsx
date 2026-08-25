"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// Deterministic pseudo-random for stable server/client render
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type Dot = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

export default function AmbientDots() {
  const reduce = useReducedMotion();

  const dots = useMemo<Dot[]>(() => {
    const rand = seeded(1337);
    const count = 40;
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2,
      delay: rand() * 8,
      duration: 6 + rand() * 8,
      drift: 10 + rand() * 20,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-teal"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          initial={{ opacity: 0 }}
          animate={
            reduce
              ? { opacity: 0.18 }
              : {
                  opacity: [0, 0.35, 0.12, 0.35, 0],
                  y: [0, -d.drift, 0],
                  x: [0, d.drift / 2, 0],
                }
          }
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(23,168,154,0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
