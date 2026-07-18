"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshPhysicalMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type WebGLRenderTarget,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const desktopCount = 56;
const mobileCount = 44;
const maxCount = desktopCount;
const mobileBreakpoint = 640;
const cameraZ = 15;
const cameraFov = 45;
const depthRange = 0.8;
const frameDuration = 1000 / 60;
const maxStep = 1.5;
const maxSpeed = 9;
const velocityDamping = 0.84;
const spinDamping = 0.7;
const wallBounce = 0.32;
const verticalPlayfieldInset = 0.16;
const pointerBaseRadius = 124;
const sameDepthCollisionThreshold = 0.18;
const collisionIterations = 2;
const collisionSlop = 0.25;
const collisionRestitution = 0.12;
const palette = [0x2a1b14, 0x5d3c2a, 0x7a583e, 0xb98562, 0xe2b992, 0xf6f1ea];

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

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

type Simulation = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  mesh: InstancedMesh;
  geometry: SphereGeometry;
  material: MeshPhysicalMaterial;
  environment: WebGLRenderTarget;
  states: BubbleState[];
  bounds: Bounds;
  activeCount: number;
  lastTime: number | null;
};

function createRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return value / 4_294_967_296;
  };
}

const goldenAngle = Math.PI * (3 - Math.sqrt(5));
const random = createRandom(24_681_357);
const bubbles: BubbleConfig[] = Array.from({ length: desktopCount }, (_, index) => {
  const ring = Math.sqrt((index + 0.7) / desktopCount);
  const angle = index * goldenAngle + random() * 0.75;
  const depth = random() * 2 - 1;
  const largeBubbleBoost = index < 7 ? 20 - index * 1.8 : 0;
  const size = 34 + random() * 58 + (1 - ring) * 34 + depth * 10 + largeBubbleBoost;

  return {
    id: index,
    left: 50 + Math.cos(angle) * ring * 24 + (random() - 0.5) * 4,
    top: 50 + Math.sin(angle) * ring * 14 + (random() - 0.5) * 3,
    size: Math.max(24, size),
    depth,
    phase: random() * Math.PI * 2,
    hue: 10 + random() * 24,
    opacity: 0.38 + (depth + 1) * 0.2 + random() * 0.16,
    rotate: -30 + random() * 60,
    mobileExtra: index > 43,
  };
});

const getSafeDistance = (bubble: BubbleState) => bubble.size * 0.58 + 36 + bubble.depth * 8;
const formatValue = (value: number, precision = 4) => value.toFixed(precision);
const getMass = (bubble: BubbleState) => Math.max(0.9, bubble.size / 82);

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
  });
}

function clampVelocity(bubble: BubbleState) {
  const speed = Math.hypot(bubble.vx, bubble.vy);

  if (speed > maxSpeed) {
    const scale = maxSpeed / speed;
    bubble.vx *= scale;
    bubble.vy *= scale;
  }
}

function getVisualGeometry(bubble: BubbleState, pointer: PointerState, bounds: Bounds, time: number) {
  const pointerOffsetX = pointer.active ? (pointer.x / bounds.width - 0.5) * bubble.depth * -12 : 0;
  const pointerOffsetY = pointer.active ? (pointer.y / bounds.height - 0.5) * bubble.depth * -8 : 0;
  const driftX = Math.sin(time / 1700 + bubble.phase) * (0.9 + bubble.depth);
  const driftY = Math.cos(time / 1900 + bubble.phase) * (1 + bubble.depth);
  const speed = Math.hypot(bubble.vx, bubble.vy);
  const visualScale = 1 + bubble.depth * 0.14 + Math.min(speed, 10) * 0.003;

  return {
    centerX: bubble.x + pointerOffsetX + driftX,
    centerY: bubble.y + pointerOffsetY + driftY,
    radius: bubble.size * 0.5 * visualScale,
  };
}

function constrainBubbleToBounds(bubble: BubbleState, bounds: Bounds) {
  const radius = bubble.size * 0.5 * (1 + bubble.depth * 0.14);
  const minX = radius;
  const maxX = Math.max(minX, bounds.width - radius);
  const minY = Math.max(radius, bounds.height * verticalPlayfieldInset);
  const maxY = Math.max(minY, Math.min(bounds.height - radius, bounds.height * (1 - verticalPlayfieldInset)));

  if (bubble.x < minX) {
    bubble.x = minX;
    bubble.vx = Math.abs(bubble.vx) * wallBounce;
  } else if (bubble.x > maxX) {
    bubble.x = maxX;
    bubble.vx = -Math.abs(bubble.vx) * wallBounce;
  }

  if (bubble.y < minY) {
    bubble.y = minY;
    bubble.vy = Math.abs(bubble.vy) * wallBounce;
  } else if (bubble.y > maxY) {
    bubble.y = maxY;
    bubble.vy = -Math.abs(bubble.vy) * wallBounce;
  }
}

function resolveBubbleCollisions(simulation: Simulation, pointer: PointerState, time: number) {
  const { states, bounds, activeCount } = simulation;

  for (let iteration = 0; iteration < collisionIterations; iteration += 1) {
    for (let index = 0; index < activeCount; index += 1) {
      const bubble = states[index];

      for (let nextIndex = index + 1; nextIndex < activeCount; nextIndex += 1) {
        const other = states[nextIndex];
        if (Math.abs(bubble.depth - other.depth) > sameDepthCollisionThreshold) continue;

        const bubbleVisual = getVisualGeometry(bubble, pointer, bounds, time);
        const otherVisual = getVisualGeometry(other, pointer, bounds, time);
        const dx = otherVisual.centerX - bubbleVisual.centerX;
        const dy = otherVisual.centerY - bubbleVisual.centerY;
        const distance = Math.hypot(dx, dy);
        const minDistance = bubbleVisual.radius + otherVisual.radius;
        const penetration = minDistance - distance;

        if (penetration <= collisionSlop) continue;

        const fallbackAngle = (bubble.id * 17 + other.id * 31) * goldenAngle;
        const nx = distance > 0.001 ? dx / distance : Math.cos(fallbackAngle);
        const ny = distance > 0.001 ? dy / distance : Math.sin(fallbackAngle);
        const bubbleInverseMass = 1 / getMass(bubble);
        const otherInverseMass = 1 / getMass(other);
        const inverseMassTotal = bubbleInverseMass + otherInverseMass;
        const correction = (penetration - collisionSlop) / inverseMassTotal;

        bubble.x -= nx * correction * bubbleInverseMass;
        bubble.y -= ny * correction * bubbleInverseMass;
        other.x += nx * correction * otherInverseMass;
        other.y += ny * correction * otherInverseMass;

        const relativeVelocity = (other.vx - bubble.vx) * nx + (other.vy - bubble.vy) * ny;
        if (relativeVelocity < 0) {
          const impulse = (-(1 + collisionRestitution) * relativeVelocity) / inverseMassTotal;
          bubble.vx -= nx * impulse * bubbleInverseMass;
          bubble.vy -= ny * impulse * bubbleInverseMass;
          other.vx += nx * impulse * otherInverseMass;
          other.vy += ny * impulse * otherInverseMass;
        }
      }
    }

    for (let index = 0; index < activeCount; index += 1) {
      constrainBubbleToBounds(states[index], bounds);
    }
  }
}

function updateSimulation(simulation: Simulation, pointer: PointerState, time: number, delta: number) {
  const { states, bounds, activeCount } = simulation;
  const step = Math.min(maxStep, Math.max(0, delta / frameDuration));

  for (let index = 0; index < activeCount; index += 1) {
    const bubble = states[index];
    const homeStrength = 0.004 + (1 - bubble.depth) * 0.0006;
    const floatForceX = Math.sin(time / 2100 + bubble.phase) * 0.008;
    const floatForceY = Math.cos(time / 2300 + bubble.phase) * 0.008;

    bubble.vx += ((bubble.homeX - bubble.x) * homeStrength + floatForceX) * step;
    bubble.vy += ((bubble.homeY - bubble.y) * homeStrength + floatForceY) * step;

    if (pointer.active) {
      const dx = bubble.x - pointer.x;
      const dy = bubble.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 0.001;
      const nx = dx / distance;
      const ny = dy / distance;
      const safeDistance = getSafeDistance(bubble);
      const influenceRadius = bubble.size * 1.6 + pointerBaseRadius + bubble.depth * 12;
      const mass = getMass(bubble);

      if (distance < influenceRadius) {
        const influence = 1 - distance / influenceRadius;
        const force = influence ** 1.7 * (1.5 + bubble.depth * 0.2);
        const swirl = influence ** 1.6 * 0.34 * (bubble.id % 2 === 0 ? 1 : -1);

        bubble.vx += ((nx * force - ny * swirl) / mass) * step;
        bubble.vy += ((ny * force + nx * swirl) / mass) * step;
        bubble.vSpin += (swirl * 0.16 * step) / mass;
      }

      if (distance < safeDistance) {
        const correction = Math.min((safeDistance - distance) * 0.055, 1.25) * step;
        bubble.x += nx * correction;
        bubble.y += ny * correction;
      }
    }
  }

  const velocityDecay = Math.pow(velocityDamping, step);
  const spinDecay = Math.pow(spinDamping, step);

  for (let index = 0; index < activeCount; index += 1) {
    const bubble = states[index];
    bubble.vx *= velocityDecay;
    bubble.vy *= velocityDecay;
    bubble.vSpin *= spinDecay;
    clampVelocity(bubble);

    bubble.x += bubble.vx * step;
    bubble.y += bubble.vy * step;
    bubble.spin += bubble.vSpin * step;
    constrainBubbleToBounds(bubble, bounds);
  }

  resolveBubbleCollisions(simulation, pointer, time);
}

function updateInstances(simulation: Simulation, matrix: Matrix4, position: Vector3, scale: Vector3, pointer: PointerState, time: number) {
  const { camera, bounds, states, activeCount } = simulation;
  if (bounds.width <= 0 || bounds.height <= 0) return;

  for (let index = 0; index < activeCount; index += 1) {
    const bubble = states[index];
    const z = bubble.depth * depthRange;
    const worldHeight = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - z);
    const worldWidth = worldHeight * camera.aspect;
    const worldPerPixel = worldHeight / bounds.height;
    const visual = getVisualGeometry(bubble, pointer, bounds, time);
    const radius = visual.radius * worldPerPixel;

    position.set((visual.centerX / bounds.width - 0.5) * worldWidth, (0.5 - visual.centerY / bounds.height) * worldHeight, z);
    scale.set(radius, radius, radius);
    matrix.makeRotationZ(MathUtils.degToRad(bubble.spin));
    matrix.scale(scale);
    matrix.setPosition(position);
    simulation.mesh.setMatrixAt(index, matrix);
  }

  simulation.mesh.instanceMatrix.needsUpdate = true;
}

function createSimulation(canvas: HTMLCanvasElement): Simulation | null {
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  if (!context) return null;

  const renderer = new WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new Scene();
  const camera = new PerspectiveCamera(cameraFov, 1, 0.1, 50);
  camera.position.set(0, 0, cameraZ);

  const room = new RoomEnvironment();
  const environmentGenerator = new PMREMGenerator(renderer);
  const environment = environmentGenerator.fromScene(room);
  room.dispose();
  environmentGenerator.dispose();
  scene.environment = environment.texture;

  scene.add(new AmbientLight(0xfff6e9, 1.4));
  const keyLight = new PointLight(0xffe2c3, 115);
  keyLight.position.set(-4, 6, 8);
  scene.add(keyLight);
  const fillLight = new PointLight(0x9d6346, 90);
  fillLight.position.set(6, -4, 5);
  scene.add(fillLight);

  const geometry = new SphereGeometry(1, 28, 20);
  const material = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.08,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.15,
    transparent: false,
    opacity: 1,
    depthTest: true,
    depthWrite: true,
  });
  const mesh = new InstancedMesh(geometry, material, maxCount);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);

  const colorRandom = createRandom(184_221);
  const color = new Color();
  for (let index = 0; index < maxCount; index += 1) {
    color.setHex(palette[Math.floor(colorRandom() * palette.length)]);
    mesh.setColorAt(index, color);
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  scene.add(mesh);

  return {
    renderer,
    scene,
    camera,
    mesh,
    geometry,
    material,
    environment,
    states: [],
    bounds: { width: 0, height: 0 },
    activeCount: desktopCount,
    lastTime: null,
  };
}

function resizeSimulation(simulation: Simulation, width: number, height: number) {
  if (width <= 0 || height <= 0) return;

  simulation.camera.aspect = width / height;
  simulation.camera.updateProjectionMatrix();
  simulation.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  simulation.renderer.setSize(width, height, false);
  simulation.activeCount = width <= mobileBreakpoint ? mobileCount : desktopCount;
  simulation.mesh.count = simulation.activeCount;
  simulation.bounds = { width, height };

  if (!simulation.states.length) simulation.states = createStates(simulation.bounds);
  else updateHomes(simulation.states, simulation.bounds);
}

export function HeroBubbles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const instancePosition = new Vector3();
    const instanceScale = new Vector3();
    const instanceMatrix = new Matrix4();
    const pointer: PointerState = { x: 0, y: 0, active: false };
    let simulation: Simulation | null = null;
    let frame: number | null = null;
    let isVisible = true;
    let reduceMotion = motionQuery.matches;
    let activePointerId: number | null = null;
    let disposed = false;
    let contextFailed = false;

    const stop = () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      if (simulation) simulation.lastTime = null;
    };

    const destroySimulation = (loseContext = true) => {
      stop();
      if (!simulation) {
        delete root.dataset.ballpitActive;
        return;
      }

      simulation.scene.remove(simulation.mesh);
      simulation.geometry.dispose();
      simulation.material.dispose();
      simulation.environment.dispose();
      simulation.renderer.dispose();
      if (loseContext) simulation.renderer.forceContextLoss();
      simulation = null;
      delete root.dataset.ballpitActive;
    };

    const renderFrame = (time: number) => {
      frame = null;
      if (!simulation || reduceMotion || !isVisible || document.hidden) return;

      const delta = simulation.lastTime === null ? 16.67 : time - simulation.lastTime;
      simulation.lastTime = time;
      updateSimulation(simulation, pointer, time, delta);
      updateInstances(simulation, instanceMatrix, instancePosition, instanceScale, pointer, time);
      simulation.renderer.render(simulation.scene, simulation.camera);
      frame = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (!simulation || !simulation.states.length || reduceMotion || !isVisible || document.hidden || frame !== null) return;
      frame = requestAnimationFrame(renderFrame);
    };

    const measure = () => {
      if (!simulation) return;
      const bounds = root.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;

      resizeSimulation(simulation, bounds.width, bounds.height);
      updateInstances(simulation, instanceMatrix, instancePosition, instanceScale, pointer, simulation.lastTime ?? performance.now());
      simulation.renderer.render(simulation.scene, simulation.camera);
      root.dataset.ballpitActive = "true";
      start();
    };

    const initialize = () => {
      if (disposed || reduceMotion || contextFailed || simulation) return;

      try {
        simulation = createSimulation(canvas);
        if (!simulation) {
          contextFailed = true;
          return;
        }
        measure();
        start();
      } catch {
        contextFailed = true;
        destroySimulation();
      }
    };

    const resetPointer = () => {
      activePointerId = null;
      pointer.x = 0;
      pointer.y = 0;
      pointer.active = false;
    };

    const updatePointer = (event: PointerEvent) => {
      if (!simulation) return;
      if (event.pointerType !== "mouse" && event.pointerId !== activePointerId) return;

      const bounds = root.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
        if (event.pointerType === "mouse" || event.pointerId === activePointerId) resetPointer();
        return;
      }

      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;

      activePointerId = event.pointerId;
      updatePointer(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerId === activePointerId) updatePointer(event);
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId === activePointerId) resetPointer();
    };

    const onPointerLeave = () => resetPointer();
    const onWindowBlur = () => resetPointer();

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (reduceMotion) destroySimulation(false);
      else initialize();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextFailed = true;
      destroySimulation(false);
    };

    const resizeObserver = new ResizeObserver(measure);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? false;
      if (isVisible) start();
      else stop();
    });

    resizeObserver.observe(root);
    intersectionObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerEnd, { passive: true });
    window.addEventListener("pointercancel", onPointerEnd, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onWindowBlur);
    motionQuery.addEventListener("change", onMotionChange);
    canvas.addEventListener("webglcontextlost", onContextLost);
    initialize();

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onWindowBlur);
      motionQuery.removeEventListener("change", onMotionChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      destroySimulation();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="hero-ballpit pointer-events-none absolute inset-x-0 top-0 bottom-20 z-0 overflow-hidden sm:bottom-24">
      <div className="hero-ballpit__fallback absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,243,0.42),transparent_58%)]" />
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="hero-bubble absolute select-none"
            data-mobile-extra={bubble.mobileExtra ? "true" : undefined}
            style={
              {
                left: `${formatValue(bubble.left)}%`,
                top: `${formatValue(bubble.top)}%`,
                width: `${formatValue(bubble.size)}px`,
                height: `${formatValue(bubble.size)}px`,
                filter: `blur(${formatValue(Math.max(0, (0.8 - bubble.depth) * 0.32), 6)}px) saturate(${formatValue(1.08 + bubble.depth * 0.06, 6)})`,
                zIndex: String(Math.round(100 + bubble.depth * 80 + bubble.top * 0.2)),
                transform: `translate3d(-50%, -50%, 0px) rotate(${formatValue(bubble.rotate)}deg) scale(${formatValue(1 + bubble.depth * 0.14, 6)})`,
                "--bubble-hue": formatValue(bubble.hue, 6),
                "--bubble-depth": formatValue(bubble.depth, 6),
                "--bubble-inner-opacity": formatValue(0.42 + bubble.depth * 0.12, 6),
                "--bubble-radius": "51% 49% 54% 46% / 46% 48% 55% 52%",
              } as CSSProperties
            }
          >
            <span className="hero-bubble__rim" />
            <span className="hero-bubble__shine" />
          </span>
        ))}
      </div>
      <canvas ref={canvasRef} className="hero-ballpit__canvas h-full w-full" />
    </div>
  );
}
