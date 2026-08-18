import React from 'react';
import {B, W, H, ip, clamp, mix, noise, easeOut, easeInOut, PHOENIX, WITCH, NIGHT} from './lib';
import {Glow, Sparks, Ring, Bolt} from './fx';

/* ------------------------------------------------------------------ *
 *  Hand-authored profile.  Drawn facing screen-right; mirrored for the
 *  figure on the right of frame.  Origin sits at the eye.
 * ------------------------------------------------------------------ */
const PROFILE = `
  M-18,-114
  C18,-116 46,-100 54,-74
  C58,-58 55,-44 52,-32
  C50,-26 48,-22 54,-16
  C63,-6 78,6 80,14
  C82,20 76,23 66,22
  C59,21 57,23 59,30
  C62,37 68,41 68,46
  C68,51 61,52 56,54
  C51,56 50,60 53,66
  C58,74 55,84 44,93
  C33,101 15,108 2,110
  L6,148
  C10,168 38,182 80,200
  C128,220 164,248 178,320
  L178,560
  L-268,560
  L-268,320
  C-254,244 -218,198 -180,170
  C-148,146 -122,134 -106,112
  C-90,90 -98,54 -102,22
  C-107,-18 -108,-60 -88,-86
  C-72,-106 -46,-113 -18,-114
  Z`;

/** Loose hair mass behind the head, drifting in the storm. */
const hairMass = (frame: number, seed: string) => {
  const n = (k: number, s: string) => noise(frame * 0.07 + k, `${seed}-${s}`);
  return `
    M-34,-116
    C-118,-110 -172,-52 ${-188 + n(0, 'a') * 14},${30 + n(1, 'b') * 16}
    C${-204 + n(2, 'c') * 22},${112 + n(3, 'd') * 20} ${-256 + n(4, 'e') * 30},${186} -284,268
    C-300,330 -296,560 -296,560
    L-116,560
    C-128,300 -120,182 -98,134
    C-82,98 -76,18 -72,-42
    Z`;
};

const Profile: React.FC<{
  x: number;
  y: number;
  scale: number;
  flip: boolean;
  color: string;
  hot: string;
  frame: number;
  seed: string;
  eyeGlow: number;
  tilt: number;
}> = ({x, y, scale, flip, color, hot, frame, seed, eyeGlow, tilt}) => (
  <svg
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 1000 * scale,
      height: 940 * scale,
      overflow: 'visible',
      transform: `translate(-50%,-50%) ${flip ? 'scaleX(-1) ' : ''}rotate(${tilt}deg)`,
    }}
    viewBox="-330 -200 660 620"
  >
    {/* rim light — outline only, so it reads as light wrapping an edge */}
    <g style={{filter: 'blur(18px)'}} opacity={0.75}>
      <path d={hairMass(frame, seed)} fill="none" stroke={color} strokeWidth={26} />
      <path d={PROFILE} fill="none" stroke={color} strokeWidth={30} />
    </g>
    <g style={{filter: 'blur(5px)'}} opacity={0.85}>
      <path d={hairMass(frame, seed)} fill="none" stroke={color} strokeWidth={7} />
      <path d={PROFILE} fill="none" stroke={hot} strokeWidth={6} />
    </g>
    <g style={{filter: 'blur(1px)'}} opacity={0.6}>
      <path d={PROFILE} fill="none" stroke="#fff6ea" strokeWidth={1.6} />
    </g>
    {/* solid silhouette */}
    <path d={hairMass(frame, seed)} fill="#03050b" />
    <path d={PROFILE} fill="#03050b" />
    {/* the eye — the only thing that is not dark */}
    <g opacity={eyeGlow}>
      <ellipse cx={31} cy={-28} rx={30} ry={13} fill={color} style={{filter: 'blur(13px)'}} />
      <ellipse cx={31} cy={-28} rx={16} ry={6} fill={hot} style={{filter: 'blur(2px)'}} />
      <path d="M22,-28 C27,-33 37,-33 41,-28 C37,-24 27,-24 22,-28 Z" fill="#fff3e0" opacity={0.95} />
    </g>
  </svg>
);

/* ------------------------------------------------------------------ *
 *  Neither of them beaten.  Held, breathing, unresolved.
 * ------------------------------------------------------------------ */
export const CloseUp: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.closeUp - 4, B.closeUp + 16], [0, 1], easeOut);
  if (k <= 0.005) return null;
  const push = ip(frame, [B.closeUp, B.end], [0, 1], easeInOut);
  const breathe = Math.sin(frame * 0.11) * 5;
  const eye = 0.75 + Math.sin(frame * 0.3) * 0.12;

  return (
    <div style={{position: 'absolute', inset: 0, opacity: k, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(105deg, #12030a 0%, #1a0608 38%, #1c0a05 62%, #200c04 100%)`,
        }}
      />
      {/* the storm still burning between them */}
      <Glow x={W * 0.5} y={H * 0.5} r={880 + push * 120} pal={{core: PHOENIX.mid, hot: PHOENIX.deep, mid: WITCH.deep, deep: WITCH.dark, dark: '#000'}} opacity={0.72} hardness={0} />
      <Glow x={W * 0.34} y={H * 0.58} r={620} pal={{core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#180008', dark: '#000'}} opacity={0.6} hardness={0} ax={1.25} ay={0.85} />
      <Glow x={W * 0.68} y={H * 0.46} r={660} pal={{core: PHOENIX.mid, hot: PHOENIX.deep, mid: PHOENIX.dark, deep: '#1c0703', dark: '#000'}} opacity={0.62} hardness={0} ax={1.2} ay={0.9} />
      <Glow x={W * 0.5} y={H * 0.5} r={280} pal={{core: '#ffe7c2', hot: PHOENIX.hot, mid: PHOENIX.deep, deep: WITCH.dark, dark: '#000'}} opacity={0.55} hardness={0.25} />

      <Sparks
        count={130}
        seed="storm"
        frame={frame}
        color={PHOENIX.mid}
        hot={'#fff'}
        place={(i, r) => {
          const life = (frame * (0.008 + r('v') * 0.02) + r('p')) % 1;
          return {
            x: W * (0.24 + r('x') * 0.52) + noise(frame * 0.03 + i, `sx${i}`) * 70,
            y: H * (1.05 - life * 1.15) + noise(frame * 0.04 + i, `sy${i}`) * 50,
            size: 1.3 + r('s') * 3.4,
            opacity: Math.sin(life * Math.PI) * 0.8,
          };
        }}
      />

      {/* Wanda, screen-left, facing in */}
      <Profile
        x={W * 0.255 - push * 22}
        y={H * 0.66 + breathe}
        scale={1.02 + push * 0.05}
        tilt={3.5}
        flip={false}
        color={WITCH.mid}
        hot={WITCH.hot}
        frame={frame}
        seed="cw"
        eyeGlow={eye}
      />
      {/* Jean, screen-right, facing in */}
      <Profile
        x={W * 0.75 + push * 22}
        y={H * 0.61 - breathe}
        scale={1.1 + push * 0.05}
        tilt={-2.5}
        flip
        color={PHOENIX.mid}
        hot={PHOENIX.hot}
        frame={frame}
        seed="cj"
        eyeGlow={eye}
      />

      {/* embers crossing in front of both faces — depth */}
      <Sparks
        count={60}
        seed="fg"
        frame={frame}
        color={PHOENIX.hot}
        hot="#fff"
        place={(i, r) => {
          const life = (frame * (0.012 + r('v') * 0.03) + r('p')) % 1;
          return {
            x: r('x') * W + noise(frame * 0.05 + i, `fx${i}`) * 120,
            y: H * (1.1 - life * 1.25),
            size: 3 + r('s') * 9,
            opacity: Math.sin(life * Math.PI) * 0.34,
          };
        }}
      />

      {/* residual arcs of magic still cracking the air between them */}
      {new Array(3).fill(0).map((_, i) =>
        Math.sin(frame * 0.4 + i * 2) > 0.65 ? (
          <Bolt
            key={i}
            x1={W * 0.4}
            y1={H * (0.32 + i * 0.18)}
            x2={W * 0.62}
            y2={H * (0.4 + i * 0.14)}
            seed={`cub${i}`}
            frame={frame}
            amp={60}
            width={2.2}
            color={i % 2 ? WITCH.core : PHOENIX.core}
            glow={i % 2 ? WITCH.mid : PHOENIX.mid}
            opacity={0.7}
          />
        ) : null
      )}

      {/* heavy atmosphere sitting between camera and subjects */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 55%, rgba(255,140,60,0.12) 0%, rgba(120,10,30,0.14) 45%, rgba(0,0,0,0.55) 100%)`,
        }}
      />
    </div>
  );
};
