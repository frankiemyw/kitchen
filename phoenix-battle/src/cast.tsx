import React from 'react';
import {B, clamp, easeInOut, easeOut, easeIn, mix, noise, ip, PHOENIX, WITCH} from './lib';
import {Figure, Pose, POSES, blendPose, jointsOf} from './figure';

/* ------------------------------------------------------------------ *
 *  Keyframe tracks.  The whole performance for both characters lives
 *  here so continuity is decided in one place; the acts only add FX.
 * ------------------------------------------------------------------ */

type Key<T> = {f: number; v: T; e?: (n: number) => number};

const surround = <T,>(keys: Key<T>[], f: number) => {
  let i = 0;
  while (i < keys.length - 1 && f >= keys[i + 1].f) i++;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const span = b.f - a.f;
  const k = span <= 0 ? 1 : (b.e ?? easeInOut)(clamp((f - a.f) / span));
  return {a, b, k};
};

const trackN = (keys: Key<number>[], f: number) => {
  const {a, b, k} = surround(keys, f);
  return mix(a.v, b.v, k);
};

const trackP = (keys: Key<Pose>[], f: number) => {
  const {a, b, k} = surround(keys, f);
  return blendPose(a.v, b.v, k);
};

const P = POSES;

/** Ground plane of the stage, in composition pixels at zoom 1. */
export const GROUND = 838;

/* ------------------------------------------------------------------ *
 *  JEAN GREY — Dark Phoenix.  Screen-right, airborne, facing left.
 * ------------------------------------------------------------------ */

const jeanX: Key<number>[] = [
  {f: 0, v: 1372},
  {f: 150, v: 1352},
  {f: 240, v: 1338},
  {f: 300, v: 1318},
  {f: 330, v: 1300},
  // the weave — she crosses the frame twice at speed
  {f: 352, v: 980, e: easeIn},
  {f: 372, v: 640, e: easeOut},
  {f: 392, v: 1120, e: easeInOut},
  {f: 412, v: 1330, e: easeOut},
  {f: 420, v: 1336},
  {f: 462, v: 1310},
  {f: 510, v: 1330},
  {f: 596, v: 1318},
  {f: 626, v: 1312},
  // struck from behind and thrown
  {f: 646, v: 1010, e: easeOut},
  {f: 668, v: 1046},
  {f: 690, v: 1120},
  {f: 762, v: 1258, e: easeInOut},
  {f: 872, v: 1276},
];

const jeanY: Key<number>[] = [
  {f: 0, v: 432},
  {f: 150, v: 418},
  {f: 240, v: 430},
  {f: 300, v: 452},
  {f: 330, v: 440},
  {f: 352, v: 300, e: easeIn},
  {f: 372, v: 512, e: easeOut},
  {f: 392, v: 268, e: easeInOut},
  {f: 412, v: 424, e: easeOut},
  {f: 420, v: 416},
  {f: 462, v: 402},
  {f: 510, v: 428},
  {f: 596, v: 420},
  {f: 626, v: 414},
  {f: 646, v: 600, e: easeOut},
  {f: 668, v: 664},
  {f: 690, v: 620},
  {f: 714, v: 452, e: easeOut},
  {f: 762, v: 388, e: easeInOut},
  {f: 872, v: 396},
];

const jeanScale: Key<number>[] = [
  {f: 0, v: 0.94},
  {f: 300, v: 0.96},
  {f: 352, v: 0.8},
  {f: 372, v: 1.14},
  {f: 392, v: 0.76},
  {f: 412, v: 0.98},
  {f: 690, v: 1.0},
  {f: 762, v: 1.1},
  {f: 872, v: 1.1},
];

const jeanRot: Key<number>[] = [
  {f: 0, v: 0},
  {f: 340, v: 0},
  {f: 356, v: -26},
  {f: 376, v: 22},
  {f: 396, v: -20},
  {f: 416, v: 0},
  {f: 626, v: 0},
  {f: 640, v: 38},
  {f: 660, v: 16},
  {f: 690, v: 0},
];

const jeanPose: Key<Pose>[] = [
  {f: 0, v: P.hover},
  {f: 140, v: P.hover},
  {f: 168, v: P.halt, e: easeOut},
  {f: 232, v: P.halt},
  {f: 244, v: P.hurl, e: easeIn},
  {f: 268, v: P.hover, e: easeOut},
  {f: 340, v: P.hover},
  {f: 418, v: P.rip, e: easeOut},
  {f: 452, v: P.rip},
  {f: 470, v: P.hurl, e: easeIn},
  {f: 500, v: P.hover, e: easeOut},
  {f: 620, v: P.hover},
  {f: 636, v: P.reel, e: easeOut},
  {f: 676, v: P.hover, e: easeInOut},
  {f: 700, v: P.ascend, e: easeOut},
  {f: 756, v: P.ascend},
  {f: 776, v: P.cast, e: easeInOut},
  {f: 872, v: P.cast},
];

export const jeanState = (f: number) => {
  const bob = noise(f * 0.055, 'jean-bob') * 11;
  const drift = noise(f * 0.04, 'jean-drift') * 7;
  const fury = ip(f, [B.phoenixTurn, B.wingsOpen], [0, 1]);
  const pose = trackP(jeanPose, f);
  return {
    x: trackN(jeanX, f) + drift,
    y: trackN(jeanY, f) + bob * (1 - fury * 0.5),
    scale: trackN(jeanScale, f),
    rot: trackN(jeanRot, f) + noise(f * 0.07, 'jean-rot') * 2.5,
    pose: {
      ...pose,
      hair: 6 + noise(f * 0.12, 'jean-h') * 12 + fury * 16,
      cape: -18 + noise(f * 0.1, 'jean-c') * 16 - fury * 20,
    },
  };
};

/* ------------------------------------------------------------------ *
 *  WANDA MAXIMOFF — Scarlet Witch.  Screen-left, grounded, facing right.
 * ------------------------------------------------------------------ */

const STAND_Y = GROUND - 122;

const wandaX: Key<number>[] = [
  {f: 0, v: 556},
  {f: 132, v: 548},
  {f: 264, v: 540},
  // hurled back through the rubble
  {f: 284, v: 236, e: easeOut},
  {f: 300, v: 224},
  {f: 322, v: 430, e: easeInOut},
  {f: 340, v: 512},
  {f: 462, v: 520},
  {f: 510, v: 508},
  {f: 592, v: 516},
  // teleport: reappears behind Jean, screen-right
  {f: 596, v: 1560},
  {f: 626, v: 1548},
  {f: 646, v: 1536},
  {f: 656, v: 1500},
  {f: 660, v: 470},
  {f: 690, v: 486},
  {f: 872, v: 496},
];

const wandaY: Key<number>[] = [
  {f: 0, v: STAND_Y},
  {f: 264, v: STAND_Y},
  {f: 284, v: STAND_Y + 66, e: easeOut},
  {f: 300, v: STAND_Y + 78},
  {f: 322, v: STAND_Y - 40, e: easeOut},
  {f: 340, v: STAND_Y},
  {f: 510, v: STAND_Y},
  {f: 540, v: STAND_Y - 46, e: easeOut},
  {f: 592, v: STAND_Y - 52},
  {f: 596, v: 392},
  {f: 626, v: 404},
  {f: 646, v: 420},
  {f: 656, v: 440},
  {f: 660, v: STAND_Y - 90},
  {f: 690, v: STAND_Y},
  {f: 872, v: STAND_Y},
];

const wandaScale: Key<number>[] = [
  {f: 0, v: 0.98},
  {f: 264, v: 0.98},
  {f: 300, v: 0.9},
  {f: 340, v: 0.98},
  {f: 592, v: 0.98},
  {f: 596, v: 0.9},
  {f: 656, v: 0.9},
  {f: 660, v: 1.0},
  {f: 872, v: 1.05},
];

const wandaRot: Key<number>[] = [
  {f: 0, v: 0},
  {f: 264, v: 0},
  {f: 282, v: -34},
  {f: 300, v: -22},
  {f: 330, v: 0},
  {f: 656, v: 0},
  {f: 660, v: 10},
  {f: 690, v: 0},
];

const wandaPose: Key<Pose>[] = [
  {f: 0, v: P.stand},
  {f: 90, v: P.stand},
  {f: 118, v: P.cast, e: easeOut},
  {f: 150, v: P.cast},
  {f: 180, v: P.stand, e: easeInOut},
  {f: 258, v: P.stand},
  {f: 274, v: P.reel, e: easeOut},
  {f: 306, v: P.reel},
  {f: 332, v: P.stand, e: easeOut},
  {f: 344, v: P.cast, e: easeOut},
  {f: 420, v: P.cast},
  {f: 440, v: P.stand, e: easeInOut},
  {f: 516, v: P.rip, e: easeOut},
  {f: 580, v: P.rip},
  {f: 596, v: P.cast},
  {f: 622, v: P.hurl, e: easeIn},
  {f: 652, v: P.hover, e: easeOut},
  {f: 690, v: P.stand, e: easeOut},
  {f: 800, v: P.stand},
  {f: 818, v: P.brace, e: easeOut},
  {f: 872, v: P.brace},
];

export const wandaState = (f: number) => {
  const breathe = noise(f * 0.06, 'w-breathe') * 4;
  const airborne = f >= 592 && f < 660;
  const pose = trackP(wandaPose, f);
  return {
    x: trackN(wandaX, f),
    y: trackN(wandaY, f) + (airborne ? noise(f * 0.09, 'w-air') * 8 : breathe),
    scale: trackN(wandaScale, f),
    rot: trackN(wandaRot, f) + noise(f * 0.05, 'w-rot') * 1.6,
    pose: {
      ...pose,
      hair: 8 + noise(f * 0.1, 'w-h') * 14,
      cape: 6 + noise(f * 0.08, 'w-c') * 14,
    },
  };
};

/** Wanda's visibility — 0 while she is folded out of reality. */
export const wandaAlpha = (f: number) => {
  if (f < B.teleportOut) return 1;
  if (f < B.teleportOut + 4) return ip(f, [B.teleportOut, B.teleportOut + 4], [1, 0]);
  if (f < B.teleportIn) return 0;
  return ip(f, [B.teleportIn, B.teleportIn + 5], [0, 1]);
};

/** World-space joints, for pinning effects to hands and chest. */
export const jeanJoints = (f: number) => {
  const s = jeanState(f);
  return jointsOf(s.pose, f, 'jean', s.x, s.y, s.scale, true, s.rot);
};

export const wandaJoints = (f: number) => {
  const s = wandaState(f);
  return jointsOf(s.pose, f, 'wanda', s.x, s.y, s.scale, f >= B.teleportIn && f < 658, s.rot);
};

/* ------------------------------------------------------------------ */

export const Jean: React.FC<{frame: number}> = ({frame}) => {
  const s = jeanState(frame);
  const heat =
    0.7 +
    ip(frame, [B.compressStart, B.compressEnd], [0, 0.25]) +
    ip(frame, [B.phoenixTurn, B.phoenixBlast], [0, 0.6]);
  return (
    <Figure
      pose={s.pose}
      x={s.x}
      y={s.y}
      scale={s.scale}
      flip
      rotate={s.rot}
      glow={PHOENIX.mid}
      rim={Math.min(1.35, heat)}
      cape="sash"
      frame={frame}
      seed="jean"
    />
  );
};

export const Wanda: React.FC<{frame: number}> = ({frame}) => {
  const s = wandaState(frame);
  const a = wandaAlpha(frame);
  if (a <= 0.01) return null;
  const heat = 0.62 + ip(frame, [B.wandaCharge, B.waveLaunch], [0, 0.3]) +
    ip(frame, [B.warpStart, B.disintegrate], [0, 0.25]) +
    ip(frame, [B.shieldUp, B.clash], [0, 0.35]);
  return (
    <Figure
      pose={s.pose}
      x={s.x}
      y={s.y}
      scale={s.scale}
      flip={frame >= B.teleportIn && frame < 658}
      rotate={s.rot}
      glow={WITCH.mid}
      rim={Math.min(1.3, heat) * a}
      cape="cape"
      frame={frame}
      seed="wanda"
      opacity={a}
    />
  );
};
