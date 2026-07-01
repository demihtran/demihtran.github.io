"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

type BubbleConfig = {
  id: number;
  left: number;
  top: number;
  size: number;
  depth: number;
  phase: number;
  hue: number;
  opacity: number;
  rotate: number;
  mobileExtra: boolean;
};

type BubbleState = BubbleConfig & {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  spin: number;
  vSpin: number;
};

type Bounds = {
  width: number;
  height: number;
};

const bubbleCount = 56;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));

const random = (() => {
  let seed = 24681357;

  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
})();

const bubbles: BubbleConfig[] = Array.from({ length: bubbleCount }, (_, index) => {
  const ring = Math.sqrt((index + 0.7) / bubbleCount);
  const angle = index * goldenAngle + random() * 0.75;
  const clusterRadiusX = 22;
  const clusterRadiusY = 17;
  const depth = random() * 2 - 1;
  const largeBubbleBoost = index < 7 ? 20 - index * 1.8 : 0;
  const size = 34 + random() * 58 + (1 - ring) * 34 + depth * 10 + largeBubbleBoost;

  return {
    id: index,
    left: 50 + Math.cos(angle) * ring * clusterRadiusX + (random() - 0.5) * 4,
    top: 55 + Math.sin(angle) * ring * clusterRadiusY + (random() - 0.5) * 4,
    size: Math.max(24, size),
    depth,
    phase: random() * Math.PI * 2,
    hue: 10 + random() * 24,
    opacity: 0.38 + (depth + 1) * 0.2 + random() * 0.16,
    rotate: -30 + random() * 60,
    mobileExtra: index > 43,
  };
});

const getSafeDistance = (bubble: BubbleState) => bubble.size * 0.58 + 54 + bubble.depth * 10;

function createStates(bounds: Bounds) {
  return bubbles.map<BubbleState>((bubble) => {
    const homeX = (bubble.left / 100) * bounds.width;
    const homeY = (bubble.top / 100) * bounds.height;

    return {
      ...bubble,
      x: homeX,
      y: homeY,
      homeX,
      homeY,
      vx: 0,
      vy: 0,
      spin: bubble.rotate,
      vSpin: 0,
    };
  });
}

function updateHomes(states: BubbleState[], bounds: Bounds) {
  states.forEach((bubble) => {
    bubble.homeX = (bubble.left / 100) * bounds.width;
    bubble.homeY = (bubble.top / 100) * bounds.height;
    bubble.x += (bubble.homeX - bubble.x) * 0.18;
    bubble.y += (bubble.homeY - bubble.y) * 0.18;
  });
}

function clampVelocity(bubble: BubbleState) {
  const speed = Math.hypot(bubble.vx, bubble.vy);
  const maxSpeed = 18;

  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;
    bubble.vx *= scale;
    bubble.vy *= scale;
  }
}

export function HeroBubbles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statesRef = useRef<BubbleState[]>([]);
  const boundsRef = useRef<Bounds>({ width: 0, height: 0 });
  const rootOffsetRef = useRef({ left: 0, top: 0 });
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const bounds = root.getBoundingClientRect();
      boundsRef.current = { width: bounds.width, height: bounds.height };
      rootOffsetRef.current = { left: bounds.left + window.scrollX, top: bounds.top + window.scrollY };

      if (!statesRef.current.length) {
        statesRef.current = createStates(boundsRef.current);
      } else {
        updateHomes(statesRef.current, boundsRef.current);
      }
    };

    const applyBubble = (bubble: BubbleState, index: number, time = 0) => {
      const element = bubbleRefs.current[index];
      if (!element) return;

      const pointer = pointerRef.current;
      const bounds = boundsRef.current;
      const pointerOffsetX = pointer.active ? (pointer.x / bounds.width - 0.5) * bubble.depth * -12 : 0;
      const pointerOffsetY = pointer.active ? (pointer.y / bounds.height - 0.5) * bubble.depth * -8 : 0;
      const driftX = Math.sin(time / 1700 + bubble.phase) * (0.9 + bubble.depth);
      const driftY = Math.cos(time / 1900 + bubble.phase) * (1 + bubble.depth);
      const speed = Math.hypot(bubble.vx, bubble.vy);
      const scale = 1 + bubble.depth * 0.14 + Math.min(speed, 10) * 0.003;
      const rotate = bubble.spin + bubble.vx * 0.32 - bubble.vy * 0.18;

      element.style.transform = `translate3d(${bubble.x + pointerOffsetX + driftX}px, ${bubble.y + pointerOffsetY + driftY}px, 0) translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`;
    };

    const applyStaticLayout = () => {
      statesRef.current.forEach((bubble, index) => {
        applyBubble(bubble, index);
      });
    };

    measure();
    applyStaticLayout();

    if (reduceMotion) return;

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    const animate = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const dt = Math.min(2, Math.max(0.5, (time - lastTime) / 16.67));
      const bounds = boundsRef.current;
      const pointer = pointerRef.current;
      const states = statesRef.current;

      lastTimeRef.current = time;

      states.forEach((bubble) => {
        const homeStrength = 0.006 + (1 - bubble.depth) * 0.001;
        const floatForceX = Math.sin(time / 1900 + bubble.phase) * 0.012;
        const floatForceY = Math.cos(time / 2100 + bubble.phase) * 0.012;

        bubble.vx += (bubble.homeX - bubble.x) * homeStrength + floatForceX;
        bubble.vy += (bubble.homeY - bubble.y) * homeStrength + floatForceY;

        if (pointer.active) {
          const dx = bubble.x - pointer.x;
          const dy = bubble.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 0.001;
          const nx = dx / distance;
          const ny = dy / distance;
          const safeDistance = getSafeDistance(bubble);
          const influenceRadius = bubble.size * 2.6 + 150 + bubble.depth * 18;

          if (distance < influenceRadius) {
            const influence = 1 - distance / influenceRadius;
            const force = influence ** 1.7 * (5.8 + bubble.depth * 1.2);
            const swirl = influence ** 1.5 * (1.8 + bubble.depth * 0.6) * (bubble.id % 2 === 0 ? 1 : -1);
            const mass = Math.max(0.9, bubble.size / 82);

            bubble.vx += (nx * force + -ny * swirl) / mass;
            bubble.vy += (ny * force + nx * swirl) / mass;
            bubble.vSpin += swirl * 0.9;
          }

          if (distance < safeDistance) {
            const push = (safeDistance - distance) * 0.22;
            bubble.x += nx * push;
            bubble.y += ny * push;
            bubble.vx += nx * 4.5;
            bubble.vy += ny * 4.5;
          }
        }
      });

      for (let index = 0; index < states.length; index += 1) {
        const bubble = states[index];

        for (let nextIndex = index + 1; nextIndex < states.length; nextIndex += 1) {
          const other = states[nextIndex];
          const dx = other.x - bubble.x;
          const dy = other.y - bubble.y;
          const distance = Math.hypot(dx, dy) || 0.001;
          const nx = dx / distance;
          const ny = dy / distance;
          const minDistance = (bubble.size + other.size) * 0.28;
          const linkDistance = minDistance + 72;

          if (distance < minDistance) {
            const overlap = (minDistance - distance) / minDistance;
            const force = overlap ** 1.4 * 2.4;
            const bubbleMass = Math.max(0.8, bubble.size / 72);
            const otherMass = Math.max(0.8, other.size / 72);

            bubble.vx -= (nx * force) / bubbleMass;
            bubble.vy -= (ny * force) / bubbleMass;
            other.vx += (nx * force) / otherMass;
            other.vy += (ny * force) / otherMass;
            bubble.vSpin -= force * 2;
            other.vSpin += force * 2;
          } else if (distance < linkDistance) {
            const tension = (1 - distance / linkDistance) * 0.01;
            const relativeVelocity = (other.vx - bubble.vx) * nx + (other.vy - bubble.vy) * ny;
            const transfer = relativeVelocity * 0.008;

            bubble.vx += nx * tension + nx * transfer;
            bubble.vy += ny * tension + ny * transfer;
            other.vx -= nx * tension + nx * transfer;
            other.vy -= ny * tension + ny * transfer;
          }
        }
      }

      states.forEach((bubble, index) => {
        bubble.vx *= 0.78;
        bubble.vy *= 0.78;
        bubble.vSpin *= 0.72;
        clampVelocity(bubble);

        bubble.x += bubble.vx * dt;
        bubble.y += bubble.vy * dt;
        bubble.spin += bubble.vSpin * dt;

        const padding = bubble.size * 0.45;
        if (bubble.x < -padding) {
          bubble.x = -padding;
          bubble.vx *= -0.35;
        } else if (bubble.x > bounds.width + padding) {
          bubble.x = bounds.width + padding;
          bubble.vx *= -0.35;
        }

        if (bubble.y < -padding) {
          bubble.y = -padding;
          bubble.vy *= -0.35;
        } else if (bubble.y > bounds.height + padding) {
          bubble.y = bounds.height + padding;
          bubble.vy *= -0.35;
        }

        applyBubble(bubble, index, time);
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = boundsRef.current;
      const offset = rootOffsetRef.current;
      const x = event.pageX - offset.left;
      const y = event.pageY - offset.top;

      pointerRef.current = {
        x,
        y,
        active: x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: 0, y: 0, active: false };
    };

    resizeObserver.observe(root);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [perspective:900px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,243,0.42),transparent_58%)]" />
      {bubbles.map((bubble, index) => (
        <span
          key={bubble.id}
          ref={(element) => {
            bubbleRefs.current[index] = element;
          }}
          className="hero-bubble absolute select-none"
          data-mobile-extra={bubble.mobileExtra ? "true" : undefined}
          style={
            {
              left: 0,
              top: 0,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: Math.min(0.82, Math.max(0.24, bubble.opacity + bubble.depth * 0.08)),
              filter: `blur(${Math.max(0, (0.8 - bubble.depth) * 0.32)}px) saturate(${1.08 + bubble.depth * 0.06})`,
              zIndex: Math.round(100 + bubble.depth * 80 + bubble.top * 0.2),
              transform: `translate3d(-50%, -50%, 0) rotate(${bubble.rotate}deg) scale(${1 + bubble.depth * 0.14})`,
              "--bubble-hue": bubble.hue,
              "--bubble-depth": bubble.depth,
              "--bubble-inner-opacity": 0.42 + bubble.depth * 0.12,
              "--bubble-radius": "51% 49% 54% 46% / 46% 48% 55% 52%",
            } as CSSProperties
          }
        >
          <span className="hero-bubble__rim" />
          <span className="hero-bubble__shine" />
        </span>
      ))}
    </div>
  );
}
