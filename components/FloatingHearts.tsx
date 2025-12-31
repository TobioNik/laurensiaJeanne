"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type FloatingHeartsProps = {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  opacity?: number;
};

export default function FloatingHearts({
  count = 15,
  minSize = 10,
  maxSize = 28,
  minDuration = 8,
  maxDuration = 18,
  opacity = 0.25,
}: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: count }, (_, i) => i));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((i) => {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const duration =
          Math.random() * (maxDuration - minDuration) + minDuration;

        return (
          <div
            key={i}
            className="absolute animate-heart-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity,
            }}
          >
            <Heart size={size} fill="currentColor" className="text-primary" />
          </div>
        );
      })}
    </div>
  );
}
