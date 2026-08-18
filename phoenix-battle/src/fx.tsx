import React from 'react';
import {random} from 'remotion';
import {noise, rr} from './lib';

type Pal = {core: string; hot: string; mid: string; deep: string; dark: string};

const px = (n: number) => `${n}px`;

/* ------------------------------------------------------------------ *
 *  Soft volumetric glow.  The workhorse — cheap radial gradients
 *  composited in `screen`, which is what makes light look additive.
 * ------------------------------------------------------------------ */
export const Glow: React.FC<{
  x: number;
  y: number;
  r: number;
  pal: Pal;
  opacity?: number;
  /** Horizontal stretch — >1 makes a lens-flare bar. */
  ax?: number;
  ay?: number;
  rot?: number;
  /** 0 = soft haze, 1 = hard hot core. */
  hardness?: number;
  blend?: React.CSSProperties['mixBlendMode'];
}> = ({x, y, r, pal, opacity = 1, ax = 1, ay = 1, rot = 0, hardness = 0.5, blend = 'screen'}) => {
  const a = 4 + hardness * 14;
  const b = a + 10 + hardness * 12;
  const c = b + 12 + (1 - hardness) * 12;
  return (
    <div
      style={{
        position: 'absolute',
        left: px(x - r),
        top: px(y - r),
        width: px(r * 2),
        height: px(r * 2),
        borderRadius: '50%',
        opacity,
        mixBlendMode: blend,
        transform: `rotate(${rot}deg) scale(${ax}, ${ay})`,
        background: `radial-gradient(circle at 50% 50%, ${pal.core} 0%, ${pal.hot} ${a}%, ${pal.mid} ${b}%, ${pal.deep} ${c}%, ${pal.dark} ${(c + 100) * 0.42}%, rgba(0,0,0,0) 100%)`,
      }}
    />
  );
};

/* ------------------------------------------------------------------ *
 *  A tapered beam running from (x1,y1) to (x2,y2).
 * ------------------------------------------------------------------ */
export const Beam: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  pal: Pal;
  opacity?: number;
  /** Fraction of the beam that has actually arrived, 0–1. */
  head?: number;
}> = ({x1, y1, x2, y2, width, pal, opacity = 1, head = 1}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) * head;
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (
    <div
      style={{
        position: 'absolute',
        left: px(x1),
        top: px(y1 - width / 2),
        width: px(len),
        height: px(width),
        transform: `rotate(${ang}deg)`,
        transformOrigin: `0px ${width / 2}px`,
        opacity,
        mixBlendMode: 'screen',
        borderRadius: px(width / 2),
        background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${pal.deep} 6%, ${pal.mid} 30%, ${pal.hot} 68%, ${pal.core} 96%)`,
        filter: `blur(${Math.max(1, width * 0.07)}px)`,
      }}
    />
  );
};

/* ------------------------------------------------------------------ *
 *  Expanding shock ring.
 * ------------------------------------------------------------------ */
export const Ring: React.FC<{
  x: number;
  y: number;
  r: number;
  thickness: number;
  color: string;
  opacity?: number;
  squash?: number;
  rot?: number;
}> = ({x, y, r, thickness, color, opacity = 1, squash = 1, rot = 0}) => (
  <div
    style={{
      position: 'absolute',
      left: px(x - r),
      top: px(y - r),
      width: px(r * 2),
      height: px(r * 2),
      borderRadius: '50%',
      border: `${px(thickness)} solid ${color}`,
      opacity,
      mixBlendMode: 'screen',
      transform: `rotate(${rot}deg) scaleY(${squash})`,
      filter: `blur(${px(thickness * 0.55)})`,
      boxShadow: `0 0 ${px(thickness * 4)} ${color}`,
    }}
  />
);

/* ------------------------------------------------------------------ *
 *  Jagged arc of energy between two points.
 * ------------------------------------------------------------------ */
export const Bolt: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  seed: string;
  frame: number;
  amp?: number;
  width?: number;
  color: string;
  glow: string;
  opacity?: number;
  segments?: number;
}> = ({x1, y1, x2, y2, seed, frame, amp = 40, width = 3, color, glow, opacity = 1, segments = 9}) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = -dy;
  const ny = dx;
  const nl = Math.hypot(nx, ny) || 1;
  let d = `M${x1},${y1}`;
  for (let i = 1; i <= segments; i++) {
    const k = i / segments;
    const env = Math.sin(k * Math.PI);
    const j = noise(frame * 0.9 + i * 2.3, `${seed}-${i}`) * amp * env;
    d += ` L${x1 + dx * k + (nx / nl) * j},${y1 + dy * k + (ny / nl) * j}`;
  }
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        mixBlendMode: 'screen',
        opacity,
      }}
    >
      <path d={d} fill="none" stroke={glow} strokeWidth={width * 5} style={{filter: 'blur(7px)'}} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
    </svg>
  );
};

/* ------------------------------------------------------------------ *
 *  Particle field.  `place` maps a particle's identity + life to a
 *  position, so callers own the motion and this owns the look.
 * ------------------------------------------------------------------ */
export const Sparks: React.FC<{
  count: number;
  seed: string;
  frame: number;
  place: (i: number, r: (k: string) => number) => {
    x: number;
    y: number;
    size: number;
    opacity: number;
    stretch?: number;
    rot?: number;
  } | null;
  color: string;
  hot?: string;
}> = ({count, seed, frame, place, color, hot}) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    const r = (k: string) => random(`${seed}-${i}-${k}`);
    const p = place(i, r);
    if (!p || p.opacity <= 0.004) continue;
    out.push(
      <div
        key={i}
        style={{
          position: 'absolute',
          left: px(p.x - p.size),
          top: px(p.y - p.size),
          width: px(p.size * 2),
          height: px(p.size * 2),
          borderRadius: '50%',
          opacity: p.opacity,
          mixBlendMode: 'screen',
          transform: `rotate(${p.rot ?? 0}deg) scaleX(${p.stretch ?? 1})`,
          background: `radial-gradient(circle, ${hot ?? '#ffffff'} 0%, ${color} 38%, rgba(0,0,0,0) 70%)`,
        }}
      />
    );
  }
  return <>{out}</>;
};

/* ------------------------------------------------------------------ *
 *  Full-frame flash / colour wash.
 * ------------------------------------------------------------------ */
export const Flash: React.FC<{color: string; opacity: number; blend?: React.CSSProperties['mixBlendMode']}> = ({
  color,
  opacity,
  blend = 'screen',
}) =>
  opacity <= 0.002 ? null : (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: color,
        opacity,
        mixBlendMode: blend,
        pointerEvents: 'none',
      }}
    />
  );

/* ------------------------------------------------------------------ *
 *  Chaos vortex — Wanda's signature: concentric counter-rotating arcs.
 * ------------------------------------------------------------------ */
export const Vortex: React.FC<{
  x: number;
  y: number;
  r: number;
  frame: number;
  pal: Pal;
  opacity?: number;
  arcs?: number;
  seed?: string;
}> = ({x, y, r, frame, pal, opacity = 1, arcs = 7, seed = 'vx'}) => (
  <svg
    style={{
      position: 'absolute',
      left: px(x - r * 1.6),
      top: px(y - r * 1.6),
      width: px(r * 3.2),
      height: px(r * 3.2),
      overflow: 'visible',
      mixBlendMode: 'screen',
      opacity,
    }}
    viewBox="-100 -100 200 200"
  >
    {new Array(arcs).fill(0).map((_, i) => {
      const rr0 = 26 + (i / arcs) * 72;
      const dir = i % 2 ? -1 : 1;
      const spin = frame * (1.9 + i * 0.55) * dir + rr(`${seed}-${i}`, 0, 360);
      const sweep = 90 + random(`${seed}-s${i}`) * 130;
      const a0 = (spin * Math.PI) / 180;
      const a1 = ((spin + sweep) * Math.PI) / 180;
      const large = sweep > 180 ? 1 : 0;
      return (
        <path
          key={i}
          d={`M${Math.cos(a0) * rr0},${Math.sin(a0) * rr0} A${rr0},${rr0} 0 ${large} 1 ${
            Math.cos(a1) * rr0
          },${Math.sin(a1) * rr0}`}
          fill="none"
          stroke={i % 4 === 0 ? pal.hot : i % 4 === 1 ? pal.mid : pal.deep}
          strokeWidth={0.7 + (i % 3) * 0.5}
          strokeLinecap="round"
          opacity={0.4 + (i % 3) * 0.14}
        />
      );
    })}
  </svg>
);

/* ------------------------------------------------------------------ *
 *  Heat / reality distortion — a warped translucent lens.
 * ------------------------------------------------------------------ */
export const Warp: React.FC<{
  x: number;
  y: number;
  r: number;
  frame: number;
  strength: number;
  seed?: string;
}> = ({x, y, r, frame, strength, seed = 'w'}) =>
  strength <= 0.003 ? null : (
    <div
      style={{
        position: 'absolute',
        left: px(x - r),
        top: px(y - r),
        width: px(r * 2),
        height: px(r * 2),
        borderRadius: '50%',
        backdropFilter: `blur(${strength * 9}px) hue-rotate(${
          noise(frame * 0.1, seed) * 60 * strength
        }deg) saturate(${1 + strength * 1.6})`,
        transform: `scale(${1 + noise(frame * 0.13, `${seed}b`) * 0.09 * strength}, ${
          1 - noise(frame * 0.11, `${seed}c`) * 0.09 * strength
        })`,
        maskImage: 'radial-gradient(circle, #000 40%, rgba(0,0,0,0) 72%)',
        WebkitMaskImage: 'radial-gradient(circle, #000 40%, rgba(0,0,0,0) 72%)',
      }}
    />
  );
