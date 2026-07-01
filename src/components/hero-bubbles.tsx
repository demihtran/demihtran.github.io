"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Bubble = {
  left: number;
  top: number;
  size: number;
  drift: number;
  rotate: number;
  opacity: number;
};

const bubbles: Bubble[] = [
  { left: 5, top: 17, size: 130, drift: 0, rotate: -16, opacity: 0.55 },
  { left: 17, top: 63, size: 86, drift: 1.7, rotate: 18, opacity: 0.5 },
  { left: 29, top: 25, size: 104, drift: 3.2, rotate: 8, opacity: 0.45 },
  { left: 42, top: 72, size: 150, drift: 4.6, rotate: -10, opacity: 0.38 },
  { left: 54, top: 16, size: 78, drift: 2.1, rotate: 24, opacity: 0.42 },
  { left: 67, top: 54, size: 118, drift: 5.3, rotate: -22, opacity: 0.5 },
  { left: 80, top: 18, size: 156, drift: 1.1, rotate: 12, opacity: 0.48 },
  { left: 89, top: 68, size: 98, drift: 3.9, rotate: -30, opacity: 0.52 },
  { left: 10, top: 82, size: 58, drift: 6.1, rotate: 34, opacity: 0.36 },
  { left: 93, top: 42, size: 60, drift: 2.8, rotate: 20, opacity: 0.34 },
  { left: 35, top: 88, size: 72, drift: 4.2, rotate: -26, opacity: 0.32 },
  { left: 72, top: 82, size: 70, drift: 0.6, rotate: 30, opacity: 0.35 },
];

export function HeroBubbles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLImageElement | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyStaticLayout = () => {
      bubbleRefs.current.forEach((bubble, index) => {
        if (!bubble) return;
        const item = bubbles[index];
        bubble.style.transform = `translate3d(-50%, -50%, 0) rotate(${item.rotate}deg)`;
      });
    };

    applyStaticLayout();
    if (reduceMotion) return;

    const animate = (time: number) => {
      const bounds = root.getBoundingClientRect();
      const pointer = pointerRef.current;

      bubbleRefs.current.forEach((bubble, index) => {
        if (!bubble) return;

        const item = bubbles[index];
        const centerX = (item.left / 100) * bounds.width;
        const centerY = (item.top / 100) * bounds.height;
        const floatX = Math.sin(time / 1500 + item.drift) * 7;
        const floatY = Math.cos(time / 1800 + item.drift) * 9;
        let x = floatX;
        let y = floatY;
        let rotate = item.rotate + Math.sin(time / 1800 + item.drift) * 4;
        let scale = 1;

        if (pointer.active) {
          const dx = centerX - pointer.x;
          const dy = centerY - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const radius = item.size * 1.45;

          if (distance < radius) {
            const influence = (1 - distance / radius) ** 1.7;
            const push = influence * item.size * 0.58;
            const swirl = influence * item.size * 0.32;
            const nx = dx / distance;
            const ny = dy / distance;

            x += nx * push + -ny * swirl;
            y += ny * push + nx * swirl;
            rotate += influence * 130 * (index % 2 === 0 ? 1 : -1);
            scale += influence * 0.08;
          }
        }

        bubble.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) rotate(${rotate}deg) scale(${scale})`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;

      pointerRef.current = {
        x,
        y,
        active: x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height,
      };
    };

    window.addEventListener("pointermove", onPointerMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,243,0.35),transparent_58%)]" />
      {bubbles.map((bubble, index) => (
        <Image
          key={`${bubble.left}-${bubble.top}`}
          ref={(element) => {
            bubbleRefs.current[index] = element;
          }}
          src="/section-top-balloon.png"
          alt=""
          width={bubble.size}
          height={bubble.size}
          draggable={false}
          className="absolute h-auto select-none drop-shadow-[0_22px_45px_rgba(42,27,20,0.12)] will-change-transform"
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            width: `${bubble.size}px`,
            opacity: bubble.opacity,
          }}
        />
      ))}
    </div>
  );
}
