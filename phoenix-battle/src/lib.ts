import {interpolate, Easing, random} from 'remotion';

/* ------------------------------------------------------------------ *
 *  Global format
 * ------------------------------------------------------------------ */
export const FPS = 30;
export const DURATION = 900; // 30 seconds
export const W = 1920;
export const H = 1080;

/* ------------------------------------------------------------------ *
 *  Beat sheet.  Every number is a frame at 30fps.
 * ------------------------------------------------------------------ */
export const B = {
  /* 0–5s — standoff, tremor, Wanda launches the chaos wave */
  establish: 0,
  tremorStart: 48,
  wandaCharge: 96,
  waveLaunch: 132,

  /* 5–10s — Jean catches it, compresses it, hurls it back */
  waveTravel: 150,
  waveCaught: 176,
  compressStart: 186,
  compressEnd: 232,
  sphereThrown: 240,
  wandaHit: 264,
  rubbleBurst: 268,

  /* 10–17s — Wanda's barrage, Jean's flight, the concrete hurl */
  wandaRises: 300,
  barrageStart: 330,
  barrageEnd: 420,
  concreteRip: 420,
  concreteHurl: 462,

  /* 17–23s — reality warp, disintegration, teleport, strike */
  warpStart: 510,
  disintegrate: 556,
  teleportOut: 596,
  teleportIn: 614,
  wandaStrike: 626,
  jeanReels: 640,

  /* 23–27s — Dark Phoenix loses control */
  phoenixTurn: 690,
  wingsOpen: 714,
  phoenixBlast: 762,

  /* 27–30s — the shield, the clash, the stare */
  shieldUp: 810,
  clash: 828,
  whiteout: 858,
  closeUp: 866,
  end: 900,
} as const;

/* ------------------------------------------------------------------ *
 *  Math helpers
 * ------------------------------------------------------------------ */
export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** Normalised 0→1 progress of `f` across [a,b], clamped. */
export const t = (f: number, a: number, b: number) => clamp((f - a) / (b - a));

export const mix = (a: number, b: number, k: number) => a + (b - a) * k;

export const easeOut = Easing.out(Easing.cubic);
export const easeIn = Easing.in(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);
export const easeExpo = Easing.out(Easing.exp);
export const easeBack = Easing.out(Easing.back(1.8));

/** interpolate with clamping on by default — the 95% case here. */
export const ip = (
  f: number,
  input: number[],
  output: number[],
  easing?: (n: number) => number
) =>
  interpolate(f, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

/** Deterministic random in a range. */
export const rr = (seed: string | number, lo: number, hi: number) =>
  lo + random(seed) * (hi - lo);

/** Smooth deterministic 1-D noise built from summed sines. */
export const noise = (x: number, seed: string | number) => {
  const p1 = random(`${seed}-a`) * 100;
  const p2 = random(`${seed}-b`) * 100;
  const p3 = random(`${seed}-c`) * 100;
  return (
    Math.sin(x * 1.0 + p1) * 0.55 +
    Math.sin(x * 2.31 + p2) * 0.3 +
    Math.sin(x * 4.77 + p3) * 0.15
  );
};

/** A decaying impact — spikes to 1 at `at`, dies over `len` frames. */
export const hit = (f: number, at: number, len: number, power = 1) => {
  if (f < at) return 0;
  const k = clamp((f - at) / len);
  return power * (1 - k) * (1 - k);
};

/** Screen-shake offset. Combines every impact in the timeline. */
export const shake = (f: number) => {
  const impacts: [number, number, number][] = [
    // [frame, decayLength, power]
    [B.waveLaunch, 30, 10],
    [B.waveCaught, 26, 16],
    [B.sphereThrown, 20, 12],
    [B.wandaHit, 46, 34],
    [B.barrageStart, 18, 8],
    [B.barrageStart + 22, 18, 8],
    [B.barrageStart + 46, 18, 9],
    [B.concreteRip, 40, 18],
    [B.concreteHurl, 22, 10],
    [B.disintegrate, 24, 7],
    [B.wandaStrike, 44, 30],
    [B.phoenixTurn, 60, 14],
    [B.wingsOpen, 40, 20],
    [B.phoenixBlast, 90, 40],
    [B.clash, 70, 46],
  ];
  let amp = 0;
  for (const [at, len, pw] of impacts) amp += hit(f, at, len, pw);

  // Low, constant dread — the ground never stops moving once it starts.
  const tremor = ip(f, [B.tremorStart, B.tremorStart + 40], [0, 2.4]);
  amp += tremor + ip(f, [B.phoenixTurn, B.wingsOpen], [0, 5]);

  return {
    x: noise(f * 0.9, 'shake-x') * amp,
    y: noise(f * 1.07, 'shake-y') * amp * 0.7,
    r: noise(f * 0.6, 'shake-r') * amp * 0.05,
  };
};

/* ------------------------------------------------------------------ *
 *  Camera.  A list of shots; hard cuts are covered by flash/whip.
 * ------------------------------------------------------------------ */
type Cam = {z: number; x: number; y: number; r: number};

type Shot = {
  start: number;
  end: number;
  from: Cam;
  to: Cam;
  ease?: (n: number) => number;
};

const c = (z: number, x: number, y: number, r = 0): Cam => ({z, x, y, r});

export const SHOTS: Shot[] = [
  // 0–5s  wide establishing, a slow relentless push-in
  {start: 0, end: 150, from: c(1.14, 0, 40), to: c(1.32, -30, 16), ease: easeInOut},
  // 5–10s  in tight on Jean's raised hand, then whip to Wanda's impact
  {start: 150, end: 240, from: c(1.9, 300, 40, -1.5), to: c(1.5, 200, 10, 0.5), ease: easeOut},
  {start: 240, end: 300, from: c(1.45, -260, 40), to: c(1.18, -120, 20), ease: easeOut},
  // 10–17s  the barrage — mobile, roaming
  {start: 300, end: 420, from: c(1.3, -140, 30, 1.2), to: c(1.1, 120, -10, -0.8), ease: easeInOut},
  {start: 420, end: 510, from: c(1.34, 180, 70), to: c(1.08, -40, 10), ease: easeOut},
  // 17–23s  reality warp then the teleport strike
  {start: 510, end: 596, from: c(1.45, -170, -20, -1), to: c(1.25, -60, 10, 0.6), ease: easeInOut},
  {start: 596, end: 690, from: c(1.75, 260, -40, 2), to: c(1.3, 150, 20, -1), ease: easeOut},
  // 23–27s  Dark Phoenix — pull back to contain the wings
  {start: 690, end: 762, from: c(1.6, 210, 40), to: c(1.0, 60, -30), ease: easeInOut},
  {start: 762, end: 810, from: c(1.0, 60, -30), to: c(1.08, 0, -10), ease: easeOut},
  // 27–30s  clash, whiteout, the stare
  {start: 810, end: 866, from: c(1.12, -40, 10), to: c(1.34, 20, 0), ease: easeInOut},
  {start: 866, end: 900, from: c(2.5, 0, 30), to: c(2.16, 0, 22), ease: easeOut},
];

export const cameraAt = (f: number): Cam => {
  let shot = SHOTS[0];
  for (const s of SHOTS) if (f >= s.start) shot = s;
  const k = (shot.ease ?? easeInOut)(clamp((f - shot.start) / (shot.end - shot.start)));
  return {
    z: mix(shot.from.z, shot.to.z, k),
    x: mix(shot.from.x, shot.to.x, k),
    y: mix(shot.from.y, shot.to.y, k),
    r: mix(shot.from.r, shot.to.r, k),
  };
};

/** Frames where the camera hard-cuts — used to hide the seam. */
export const CUTS = SHOTS.slice(1).map((s) => s.start);

/* ------------------------------------------------------------------ *
 *  Palettes
 * ------------------------------------------------------------------ */
export const PHOENIX = {
  core: '#fff8e2',
  hot: '#ffd166',
  mid: '#ff8c1a',
  deep: '#ec3c0b',
  dark: '#8e1103',
  rim: 'rgba(255,168,54,',
};

export const WITCH = {
  core: '#ffd2dc',
  hot: '#ff3355',
  mid: '#d4102f',
  deep: '#87021d',
  dark: '#3d0010',
  rim: 'rgba(212,16,47,',
};

export const NIGHT = {
  sky0: '#01030a',
  sky1: '#070c1c',
  sky2: '#101a33',
  haze: '#1b2440',
};
