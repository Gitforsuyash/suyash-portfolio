import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mouse } from "./mouse";

const N = 7000;

/** Even point distribution on a sphere (Fibonacci spiral). */
function sphereTargets(n: number, radius: number) {
  const out = new Float32Array(n * 3);
  const offset = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    out[i * 3] = Math.cos(phi) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(phi) * r * radius;
  }
  return out;
}

/** Sample n target points from the shape of a phrase, rendered to an offscreen canvas. */
function textTargets(text: string, n: number) {
  const W = 900;
  const H = 240;
  const out = new Float32Array(n * 3);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  if (!ctx) return out;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let fontSize = 170;
  const setFont = () =>
    (ctx.font = `600 ${fontSize}px 'Space Grotesk', Arial, sans-serif`);
  setFont();
  while (ctx.measureText(text).width > W * 0.9 && fontSize > 24) {
    fontSize -= 5;
    setFont();
  }
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const lit: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4] > 128) lit.push(x, y);
    }
  }

  // target world width ~4.8 units for a full-width phrase
  const scale = 4.8 / (0.9 * W);
  for (let i = 0; i < n; i++) {
    let px = W / 2;
    let py = H / 2;
    if (lit.length) {
      const j = Math.floor(Math.random() * (lit.length / 2)) * 2;
      px = lit[j];
      py = lit[j + 1];
    }
    out[i * 3] = (px - W / 2) * scale;
    out[i * 3 + 1] = -(py - H / 2) * scale;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

function Morph({ phrases }: { phrases: string[] }) {
  const ref = useRef<THREE.Points>(null!);
  const phase = useRef(0);
  const elapsed = useRef(0);
  const rot = useRef(0);

  const { positions, colors, sequence, sphereFlag } = useMemo(() => {
    const sphere = sphereTargets(N, 2.0);
    const sequence: Float32Array[] = [sphere];
    const sphereFlag: boolean[] = [true];
    for (const p of phrases) {
      sequence.push(textTargets(p, N));
      sphereFlag.push(false);
    }
    const positions = new Float32Array(sphere);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const v = 0.5 + Math.random() * 0.5;
      colors[i * 3] = v;
      colors[i * 3 + 1] = v;
      colors[i * 3 + 2] = v;
    }
    return { positions, colors, sequence, sphereFlag };
  }, [phrases]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;

    const isSphere = sphereFlag[phase.current];
    elapsed.current += delta;
    const hold = isSphere ? 2.2 : 2.6;
    if (elapsed.current > hold) {
      elapsed.current = 0;
      phase.current = (phase.current + 1) % sequence.length;
    }

    const target = sequence[phase.current];
    const arr = pts.geometry.attributes.position.array as Float32Array;
    const k = 1 - Math.pow(0.003, delta);

    // cursor position in world units at the particle plane
    const mx = mouse.x * (state.viewport.width / 2);
    const my = mouse.y * (state.viewport.height / 2);
    const R = 0.58;
    const R2 = R * R;

    for (let i = 0; i < N; i++) {
      const ix = i * 3;
      let x = arr[ix] + (target[ix] - arr[ix]) * k;
      let y = arr[ix + 1] + (target[ix + 1] - arr[ix + 1]) * k;
      const z = arr[ix + 2] + (target[ix + 2] - arr[ix + 2]) * k;

      // cursor-reactive repulsion
      const dx = x - mx;
      const dy = y - my;
      const d2 = dx * dx + dy * dy;
      if (d2 < R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = (1 - d / R) * 0.6;
        x += (dx / d) * f;
        y += (dy / d) * f;
      }

      arr[ix] = x;
      arr[ix + 1] = y;
      arr[ix + 2] = z;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    if (isSphere) {
      rot.current += delta * 0.16;
    } else {
      const twoPi = Math.PI * 2;
      const nearest = Math.round(rot.current / twoPi) * twoPi;
      rot.current += (nearest - rot.current) * Math.min(1, delta * 3);
    }
    pts.rotation.y = rot.current;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Pull the camera back on narrow viewports so phrases always fit horizontally. */
function Rig() {
  const { camera, size } = useThree();
  useEffect(() => {
    const aspect = size.width / size.height;
    (camera as THREE.PerspectiveCamera).position.z = Math.max(6, 6.6 / aspect);
    camera.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

export default function ParticleMorph({ phrases }: { phrases?: string[] }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Rig />
      <Morph
        phrases={
          phrases ?? [
            "Hey there",
            "this is Suyash",
            "I design",
            "I build",
            "AI Systems",
          ]
        }
      />
    </Canvas>
  );
}
