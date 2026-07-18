"use client";

import { useEffect, useRef } from "react";
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

const desktopCount = 88;
const mobileCount = 48;
const maxCount = desktopCount;
const mobileBreakpoint = 640;
const cameraZ = 15;
const cameraFov = 45;
const palette = [0x2a1b14, 0x5d3c2a, 0x7a583e, 0xb98562, 0xe2b992, 0xf6f1ea];

type WorldBounds = {
  x: number;
  y: number;
  minZ: number;
  maxZ: number;
};

type Simulation = {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  mesh: InstancedMesh;
  geometry: SphereGeometry;
  material: MeshPhysicalMaterial;
  environment: WebGLRenderTarget;
  positions: Float32Array;
  velocities: Float32Array;
  radii: Float32Array;
  phases: Float32Array;
  bounds: WorldBounds;
  activeCount: number;
  initialized: boolean;
  lastTime: number | null;
};

function createRandom(seed = 932_741) {
  let value = seed;

  return () => {
    value = (value * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return value / 4_294_967_296;
  };
}

function getWorldBounds(camera: PerspectiveCamera): WorldBounds {
  const height = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z;

  return {
    x: (height * camera.aspect) / 2,
    y: height / 2,
    minZ: -3.2,
    maxZ: 2.4,
  };
}

function initializeBodies(simulation: Simulation) {
  const random = createRandom();
  const { positions, velocities, radii, phases, bounds } = simulation;

  for (let index = 0; index < maxCount; index += 1) {
    const offset = index * 3;
    const radius = 0.32 + random() * 0.42 + (index < 8 ? 0.18 : 0);
    let x = 0;
    let y = 0;
    let z = 0;

    for (let attempt = 0; attempt < 80; attempt += 1) {
      x = MathUtils.lerp(-bounds.x + radius, bounds.x - radius, random());
      y = MathUtils.lerp(-bounds.y + radius, bounds.y - radius, random());
      z = MathUtils.lerp(bounds.minZ + radius, bounds.maxZ - radius, random());

      let overlaps = false;
      for (let other = 0; other < index; other += 1) {
        const otherOffset = other * 3;
        const minimumDistance = radius + radii[other] + 0.05;
        const dx = x - positions[otherOffset];
        const dy = y - positions[otherOffset + 1];
        const dz = z - positions[otherOffset + 2];

        if (dx * dx + dy * dy + dz * dz < minimumDistance * minimumDistance) {
          overlaps = true;
          break;
        }
      }

      if (!overlaps) break;
    }

    radii[index] = radius;
    phases[index] = random() * Math.PI * 2;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    velocities[offset] = (random() - 0.5) * 0.018;
    velocities[offset + 1] = (random() - 0.5) * 0.018;
    velocities[offset + 2] = (random() - 0.5) * 0.012;
  }

  simulation.initialized = true;
}

function resizeSimulation(simulation: Simulation, width: number, height: number) {
  if (width <= 0 || height <= 0) return;

  const previousBounds = simulation.bounds;
  simulation.camera.aspect = width / height;
  simulation.camera.updateProjectionMatrix();
  simulation.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  simulation.renderer.setSize(width, height, false);
  simulation.bounds = getWorldBounds(simulation.camera);
  simulation.activeCount = width <= mobileBreakpoint ? mobileCount : desktopCount;
  simulation.mesh.count = simulation.activeCount;

  if (!simulation.initialized) {
    initializeBodies(simulation);
    return;
  }

  const scaleX = simulation.bounds.x / previousBounds.x;
  const scaleY = simulation.bounds.y / previousBounds.y;

  for (let index = 0; index < maxCount; index += 1) {
    const offset = index * 3;
    simulation.positions[offset] *= scaleX;
    simulation.positions[offset + 1] *= scaleY;
  }
}

function updateSimulation(simulation: Simulation, pointer: Vector3 | null, time: number, delta: number) {
  const { positions, velocities, radii, phases, bounds, activeCount } = simulation;
  const step = Math.min(2, Math.max(0.4, delta / 16.67));

  for (let index = 0; index < activeCount; index += 1) {
    const offset = index * 3;
    const radius = radii[index];
    const mass = radius * radius * radius;

    velocities[offset] += Math.sin(time / 1_800 + phases[index]) * 0.00045 * step;
    velocities[offset + 1] += (-0.0018 + Math.cos(time / 2_100 + phases[index]) * 0.00035) * step;
    velocities[offset + 2] += Math.sin(time / 2_400 + phases[index] * 0.7) * 0.00025 * step;

    if (pointer) {
      const dx = positions[offset] - pointer.x;
      const dy = positions[offset + 1] - pointer.y;
      const dz = positions[offset + 2] - pointer.z;
      const distance = Math.hypot(dx, dy, dz) || 0.001;
      const influenceRadius = radius + 2.15;

      if (distance < influenceRadius) {
        const force = ((1 - distance / influenceRadius) ** 2 * 0.026 * step) / Math.max(0.2, mass);
        velocities[offset] += (dx / distance) * force;
        velocities[offset + 1] += (dy / distance) * force;
        velocities[offset + 2] += (dz / distance) * force;
      }
    }
  }

  for (let index = 0; index < activeCount; index += 1) {
    const offset = index * 3;
    const radius = radii[index];
    const inverseMass = 1 / Math.max(0.2, radius * radius * radius);

    for (let other = index + 1; other < activeCount; other += 1) {
      const otherOffset = other * 3;
      const dx = positions[otherOffset] - positions[offset];
      const dy = positions[otherOffset + 1] - positions[offset + 1];
      const dz = positions[otherOffset + 2] - positions[offset + 2];
      const minimumDistance = radius + radii[other];
      const distanceSquared = dx * dx + dy * dy + dz * dz;

      if (distanceSquared >= minimumDistance * minimumDistance) continue;

      const distance = Math.sqrt(distanceSquared) || 0.001;
      const nx = dx / distance;
      const ny = dy / distance;
      const nz = dz / distance;
      const otherInverseMass = 1 / Math.max(0.2, radii[other] ** 3);
      const inverseMassTotal = inverseMass + otherInverseMass;
      const correction = ((minimumDistance - distance) * 0.72) / inverseMassTotal;

      positions[offset] -= nx * correction * inverseMass;
      positions[offset + 1] -= ny * correction * inverseMass;
      positions[offset + 2] -= nz * correction * inverseMass;
      positions[otherOffset] += nx * correction * otherInverseMass;
      positions[otherOffset + 1] += ny * correction * otherInverseMass;
      positions[otherOffset + 2] += nz * correction * otherInverseMass;

      const relativeVelocity =
        (velocities[otherOffset] - velocities[offset]) * nx +
        (velocities[otherOffset + 1] - velocities[offset + 1]) * ny +
        (velocities[otherOffset + 2] - velocities[offset + 2]) * nz;

      if (relativeVelocity < 0) {
        const impulse = (-(1 + 0.82) * relativeVelocity) / inverseMassTotal;
        velocities[offset] -= nx * impulse * inverseMass;
        velocities[offset + 1] -= ny * impulse * inverseMass;
        velocities[offset + 2] -= nz * impulse * inverseMass;
        velocities[otherOffset] += nx * impulse * otherInverseMass;
        velocities[otherOffset + 1] += ny * impulse * otherInverseMass;
        velocities[otherOffset + 2] += nz * impulse * otherInverseMass;
      }
    }
  }

  for (let index = 0; index < activeCount; index += 1) {
    const offset = index * 3;
    const radius = radii[index];
    const damping = Math.pow(0.994, step);

    velocities[offset] *= damping;
    velocities[offset + 1] *= damping;
    velocities[offset + 2] *= damping;

    positions[offset] += velocities[offset] * step;
    positions[offset + 1] += velocities[offset + 1] * step;
    positions[offset + 2] += velocities[offset + 2] * step;

    if (positions[offset] < -bounds.x + radius) {
      positions[offset] = -bounds.x + radius;
      velocities[offset] = Math.abs(velocities[offset]) * 0.92;
    } else if (positions[offset] > bounds.x - radius) {
      positions[offset] = bounds.x - radius;
      velocities[offset] = -Math.abs(velocities[offset]) * 0.92;
    }

    if (positions[offset + 1] < -bounds.y + radius) {
      positions[offset + 1] = -bounds.y + radius;
      velocities[offset + 1] = Math.abs(velocities[offset + 1]) * 0.92;
    } else if (positions[offset + 1] > bounds.y - radius) {
      positions[offset + 1] = bounds.y - radius;
      velocities[offset + 1] = -Math.abs(velocities[offset + 1]) * 0.92;
    }

    if (positions[offset + 2] < bounds.minZ + radius) {
      positions[offset + 2] = bounds.minZ + radius;
      velocities[offset + 2] = Math.abs(velocities[offset + 2]) * 0.9;
    } else if (positions[offset + 2] > bounds.maxZ - radius) {
      positions[offset + 2] = bounds.maxZ - radius;
      velocities[offset + 2] = -Math.abs(velocities[offset + 2]) * 0.9;
    }
  }
}

function updateInstances(simulation: Simulation, matrix: Matrix4, position: Vector3) {
  for (let index = 0; index < simulation.activeCount; index += 1) {
    const offset = index * 3;
    const radius = simulation.radii[index];

    position.set(simulation.positions[offset], simulation.positions[offset + 1], simulation.positions[offset + 2]);
    matrix.makeScale(radius, radius, radius);
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
  });
  const mesh = new InstancedMesh(geometry, material, maxCount);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);

  const random = createRandom(184_221);
  const color = new Color();
  for (let index = 0; index < maxCount; index += 1) {
    color.setHex(palette[Math.floor(random() * palette.length)]);
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
    positions: new Float32Array(maxCount * 3),
    velocities: new Float32Array(maxCount * 3),
    radii: new Float32Array(maxCount),
    phases: new Float32Array(maxCount),
    bounds: { x: 1, y: 1, minZ: -3.2, maxZ: 2.4 },
    activeCount: desktopCount,
    initialized: false,
    lastTime: null,
  };
}

export function HeroBubbles() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerWorld = new Vector3();
    const projectedPointer = new Vector3();
    const instancePosition = new Vector3();
    const instanceMatrix = new Matrix4();
    let simulation: Simulation | null = null;
    let frame: number | null = null;
    let isVisible = true;
    let reduceMotion = motionQuery.matches;
    let activePointerId: number | null = null;
    let pointerActive = false;
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
      if (!simulation) return;

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
      updateSimulation(simulation, pointerActive ? pointerWorld : null, time, delta);
      updateInstances(simulation, instanceMatrix, instancePosition);
      simulation.renderer.render(simulation.scene, simulation.camera);
      frame = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (!simulation || reduceMotion || !isVisible || document.hidden || frame !== null) return;
      frame = requestAnimationFrame(renderFrame);
    };

    const measure = () => {
      if (!simulation) return;
      resizeSimulation(simulation, root.clientWidth, root.clientHeight);
      updateInstances(simulation, instanceMatrix, instancePosition);
      simulation.renderer.render(simulation.scene, simulation.camera);
    };

    const initialize = () => {
      if (disposed || reduceMotion || contextFailed || simulation) return;

      try {
        simulation = createSimulation(canvas);
        if (!simulation) {
          contextFailed = true;
          return;
        }
        root.dataset.ballpitActive = "true";
        measure();
        start();
      } catch {
        contextFailed = true;
        destroySimulation();
      }
    };

    const updatePointer = (event: PointerEvent) => {
      if (!simulation) return;
      const bounds = root.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const withinBounds = x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;

      if (!withinBounds) {
        if (event.pointerType === "mouse" || event.pointerId === activePointerId) pointerActive = false;
        return;
      }

      if (event.pointerType !== "mouse" && event.pointerId !== activePointerId) return;

      projectedPointer.set((x / bounds.width) * 2 - 1, -(y / bounds.height) * 2 + 1, 0.5);
      projectedPointer.unproject(simulation.camera);
      projectedPointer.sub(simulation.camera.position).normalize();
      const distance = -simulation.camera.position.z / projectedPointer.z;
      pointerWorld.copy(simulation.camera.position).addScaledVector(projectedPointer, distance);
      pointerActive = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        return;
      }

      activePointerId = event.pointerId;
      updatePointer(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerId === activePointerId) updatePointer(event);
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return;
      activePointerId = null;
      pointerActive = false;
    };

    const onWindowBlur = () => {
      activePointerId = null;
      pointerActive = false;
    };

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
      isVisible = entry.isIntersecting;
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
      window.removeEventListener("blur", onWindowBlur);
      motionQuery.removeEventListener("change", onMotionChange);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      destroySimulation();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="hero-ballpit pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="hero-ballpit__canvas h-full w-full" />
    </div>
  );
}
