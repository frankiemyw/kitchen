import React from 'react';
import {noise} from './lib';

/* ------------------------------------------------------------------ *
 *  A tiny skeletal rig.  Everything is authored in a local space where
 *  the pelvis sits at (0,0), -y is up, and the figure is ~185 tall.
 *  Angles are degrees from straight-up, positive = toward screen-right.
 * ------------------------------------------------------------------ */

export type P = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;

/** Walk `len` from `p` in the direction `deg` (0 = up). */
const go = (p: P, deg: number, len: number): P => [
  p[0] + Math.sin(rad(deg)) * len,
  p[1] - Math.cos(rad(deg)) * len,
];

export type Pose = {
  lean: number;
  headTilt: number;
  /** [upperArm, forearm] for the near (camera-side) and far arm. */
  armNear: [number, number];
  armFar: [number, number];
  legNear: [number, number];
  legFar: [number, number];
  hair: number;
  cape: number;
};

export const blendPose = (a: Pose, b: Pose, k: number): Pose => {
  const m = (x: number, y: number) => x + (y - x) * k;
  const m2 = (x: [number, number], y: [number, number]): [number, number] => [
    m(x[0], y[0]),
    m(x[1], y[1]),
  ];
  return {
    lean: m(a.lean, b.lean),
    headTilt: m(a.headTilt, b.headTilt),
    armNear: m2(a.armNear, b.armNear),
    armFar: m2(a.armFar, b.armFar),
    legNear: m2(a.legNear, b.legNear),
    legFar: m2(a.legFar, b.legFar),
    hair: m(a.hair, b.hair),
    cape: m(a.cape, b.cape),
  };
};

/* ---------------------------- pose presets ---------------------------- */

export const POSES: Record<string, Pose> = {
  /** Feet planted, weight low, braced. */
  stand: {
    lean: 2,
    headTilt: -2,
    armNear: [168, 172],
    armFar: [190, 196],
    legNear: [176, 179],
    legFar: [186, 183],
    hair: 0,
    cape: 0,
  },
  /** Hovering, legs trailing, arms loose — the Phoenix idle. */
  hover: {
    lean: -6,
    headTilt: -8,
    armNear: [152, 158],
    armFar: [206, 200],
    legNear: [193, 168],
    legFar: [176, 154],
    hair: 0,
    cape: 0,
  },
  /** One arm out flat — the telekinetic STOP. */
  halt: {
    lean: -10,
    headTilt: -6,
    armNear: [92, 88],
    armFar: [200, 214],
    legNear: [196, 170],
    legFar: [178, 152],
    hair: 0,
    cape: 0,
  },
  /** Both arms forward, channelling. */
  cast: {
    lean: 7,
    headTilt: -8,
    armNear: [84, 76],
    armFar: [99, 90],
    legNear: [168, 176],
    legFar: [200, 192],
    hair: 0,
    cape: 0,
  },
  /** Arms wrenched apart, chest open — ripping the ground up. */
  rip: {
    lean: -4,
    headTilt: -14,
    armNear: [122, 148],
    armFar: [238, 212],
    legNear: [200, 162],
    legFar: [172, 148],
    hair: 0,
    cape: 0,
  },
  /** Full throw-through, body torqued. */
  hurl: {
    lean: 18,
    headTilt: 10,
    armNear: [64, 46],
    armFar: [212, 176],
    legNear: [160, 172],
    legFar: [206, 186],
    hair: 0,
    cape: 0,
  },
  /** Knocked back, spine arched, limbs thrown out. */
  reel: {
    lean: -34,
    headTilt: -26,
    armNear: [46, 24],
    armFar: [292, 268],
    legNear: [214, 236],
    legFar: [156, 132],
    hair: 0,
    cape: 0,
  },
  /** Arms flung wide, head back — the loss of control. */
  ascend: {
    lean: -12,
    headTilt: -30,
    armNear: [50, 34],
    armFar: [310, 326],
    legNear: [188, 170],
    legFar: [172, 154],
    hair: 0,
    cape: 0,
  },
  /** Crouched behind a raised guard. */
  brace: {
    lean: 16,
    headTilt: 8,
    armNear: [58, 96],
    armFar: [66, 104],
    legNear: [156, 190],
    legFar: [208, 198],
    hair: 0,
    cape: 0,
  },
};

/* ------------------------------------------------------------------ */

type FigureProps = {
  pose: Pose;
  /** Screen position of the pelvis, in composition pixels. */
  x: number;
  y: number;
  scale: number;
  /** true = facing screen-left. */
  flip?: boolean;
  /** Rim-light colour bleeding around the silhouette. */
  glow: string;
  /** Rim intensity 0–1. */
  rim?: number;
  /** Long cape (Wanda) vs. torn sash (Jean). */
  cape?: 'cape' | 'sash' | 'none';
  /** Drives hair/cloth turbulence. */
  frame: number;
  seed: string;
  opacity?: number;
  rotate?: number;
};

/** Builds the geometry once so the glow pass and the black pass agree. */
const build = (pose: Pose, frame: number, seed: string) => {
  const hipC: P = [0, 0];
  const chest = go(hipC, pose.lean, 54);
  const neck = go(chest, pose.lean, 22);
  const head = go(neck, pose.lean + pose.headTilt, 17);

  const perp = pose.lean + 90;
  const shN = go(chest, perp, 22);
  const shF = go(chest, perp, -19);
  const hipN = go(hipC, perp, 13);
  const hipF = go(hipC, perp, -12);

  const limb = (root: P, a: [number, number], l1: number, l2: number) => {
    const j = go(root, a[0], l1);
    return {r: root, j, e: go(j, a[1], l2)};
  };

  const aN = limb(shN, pose.armNear, 42, 40);
  const aF = limb(shF, pose.armFar, 42, 40);
  const lN = limb(hipN, pose.legNear, 54, 52);
  const lF = limb(hipF, pose.legFar, 54, 52);

  // Torso as a tapered slab rather than a stroke — reads as a body.
  const waistN = go(hipC, perp, 17);
  const waistF = go(hipC, perp, -15);
  const torso = `M${shN[0]},${shN[1]} Q${(shN[0] + waistN[0]) / 2 + 4},${
    (shN[1] + waistN[1]) / 2
  } ${waistN[0]},${waistN[1]} L${waistF[0]},${waistF[1]} Q${
    (shF[0] + waistF[0]) / 2 - 4
  },${(shF[1] + waistF[1]) / 2} ${shF[0]},${shF[1]} Z`;

  // Hair: a swept mass off the back of the skull with a few loose strands
  // riding on top of it.  Local space faces +x, so behind is 270deg.
  const hs = pose.hair * 0.35;
  const hn = noise(frame * 0.09, `${seed}-hm`) * 10;
  const hTop = go(head, 318, 22);
  const hLow = go(head, 186, 20);
  const hTip = go(head, 214 + hs + hn, 146);
  const hBul = go(head, 250 + hs, 74);
  const hairMass =
    `M${hTop[0]},${hTop[1]} ` +
    `C${hBul[0] + 10},${hBul[1] - 34} ${hTip[0] + 20},${hTip[1] - 44} ${hTip[0]},${hTip[1]} ` +
    `C${hTip[0] - 6},${hTip[1] + 24} ${hLow[0] - 44},${hLow[1] + 30} ${hLow[0]},${hLow[1]} Z`;

  const strands: string[] = [hairMass];
  for (let i = 0; i < 3; i++) {
    const spread = -11 + i * 11;
    const n = noise(frame * 0.13 + i * 2.1, `${seed}-hair${i}`);
    const len = 92 + (i % 2 ? 26 : 0) + n * 16;
    const base = go(head, 258 + spread, 18);
    const dir = 212 + spread * 1.4 + hs + n * 16;
    const mid = go(base, dir - 22, len * 0.5);
    const tip = go(mid, dir + 26, len * 0.62);
    strands.push(`M${base[0]},${base[1]} Q${mid[0]},${mid[1]} ${tip[0]},${tip[1]}`);
  }

  return {hipC, chest, neck, head, shN, shF, aN, aF, lN, lF, torso, strands, perp};
};

const clothPath = (
  g: ReturnType<typeof build>,
  pose: Pose,
  frame: number,
  seed: string,
  kind: 'cape' | 'sash'
) => {
  const n1 = noise(frame * 0.09, `${seed}-c1`);
  const n2 = noise(frame * 0.13 + 3, `${seed}-c2`);
  const sway = pose.cape;
  const len = kind === 'cape' ? 118 : 92;
  const spread = kind === 'cape' ? 24 : 18;

  // Anchored at the shoulder blades and streaming back off the figure.
  const a = go(g.shN, pose.lean + 90, -10);
  const b = go(g.shF, pose.lean + 90, 2);
  const tipA = go(a, 198 + sway + n1 * 20, len * (0.86 + n2 * 0.12));
  const tipB = go(b, 214 + sway + n2 * 24, len * (1.0 + n1 * 0.12));
  const flareA = go(tipA, 128 + sway, spread);
  const flareB = go(tipB, 262 + sway, spread * 0.8);

  return `M${a[0]},${a[1]}
    C${a[0] + n1 * 28},${a[1] + len * 0.4} ${flareA[0]},${flareA[1] - 40} ${flareA[0]},${flareA[1]}
    Q${(flareA[0] + flareB[0]) / 2},${(flareA[1] + flareB[1]) / 2 + 34} ${flareB[0]},${flareB[1]}
    C${flareB[0]},${flareB[1] - 50} ${b[0] + n2 * 22},${b[1] + len * 0.4} ${b[0]},${b[1]} Z`;
};

/* ------------------------------------------------------------------ *
 *  World-space joint lookup, so effects can be pinned to hands, chest
 *  and head instead of being eyeballed against the silhouette.
 * ------------------------------------------------------------------ */
export type Joints = {
  hand: P;
  handFar: P;
  chest: P;
  head: P;
  pelvis: P;
  footNear: P;
};

export const jointsOf = (
  pose: Pose,
  frame: number,
  seed: string,
  x: number,
  y: number,
  scale: number,
  flip: boolean,
  rotate: number
): Joints => {
  const g = build(pose, frame, seed);
  const th = rad(rotate);
  const cs = Math.cos(th);
  const sn = Math.sin(th);
  const w = (p: P): P => {
    const lx = flip ? -p[0] : p[0];
    const ly = p[1];
    return [x + (lx * cs - ly * sn) * scale, y + (lx * sn + ly * cs) * scale];
  };
  return {
    hand: w(g.aN.e),
    handFar: w(g.aF.e),
    chest: w(g.chest),
    head: w(g.head),
    pelvis: [x, y],
    footNear: w(g.lN.e),
  };
};

export const Figure: React.FC<FigureProps> = ({
  pose,
  x,
  y,
  scale,
  flip,
  glow,
  rim = 1,
  cape = 'none',
  frame,
  seed,
  opacity = 1,
  rotate = 0,
}) => {
  const g = build(pose, frame, seed);
  const cloth = cape === 'none' ? null : clothPath(g, pose, frame, seed, cape);

  const limbPath = (l: {r: P; j: P; e: P}) =>
    `M${l.r[0]},${l.r[1]} L${l.j[0]},${l.j[1]} L${l.e[0]},${l.e[1]}`;

  const body = (stroke: string, fill: string, grow: number) => (
    <g
      stroke={stroke}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="nonzero"
    >
      {cloth ? <path d={cloth} stroke={stroke} strokeWidth={4 + grow} /> : null}
      {g.strands.map((d, i) => (
        <path
          key={i}
          d={d}
          fill={i === 0 ? fill : 'none'}
          stroke={stroke}
          strokeWidth={i === 0 ? 3 + grow : 9 + grow}
        />
      ))}
      <path d={limbPath(g.lF)} fill="none" strokeWidth={19 + grow} />
      <path d={limbPath(g.aF)} fill="none" strokeWidth={12 + grow} />
      <path d={g.torso} strokeWidth={10 + grow} />
      <path d={limbPath(g.lN)} fill="none" strokeWidth={22 + grow} />
      <path
        d={`M${g.neck[0]},${g.neck[1]} L${g.head[0]},${g.head[1]}`}
        fill="none"
        strokeWidth={13 + grow}
      />
      <circle cx={g.head[0]} cy={g.head[1]} r={17 + grow / 2} />
      <path d={limbPath(g.aN)} fill="none" strokeWidth={13 + grow} />
    </g>
  );

  return (
    <svg
      viewBox="-260 -300 520 560"
      width={520 * scale}
      height={560 * scale}
      style={{
        position: 'absolute',
        left: x - 260 * scale,
        top: y - 300 * scale,
        overflow: 'visible',
        opacity,
        transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${flip ? -rotate : rotate}deg)`,
        transformOrigin: '50% 53.5%',
      }}
    >
      {/* Rim pass — the energy behind the body bleeding around the edge. */}
      <g style={{filter: `blur(30px)`, opacity: 0.3 * rim}}>{body(glow, glow, 22)}</g>
      <g style={{filter: `blur(11px)`, opacity: 0.6 * rim}}>{body(glow, glow, 8)}</g>
      <g style={{filter: `blur(2.5px)`, opacity: 0.9 * rim}}>{body(glow, glow, 2.5)}</g>
      {/* Solid pass — the silhouette itself. */}
      {body('#04060c', '#04060c', 0)}
    </svg>
  );
};
