import React from 'react';
import {random} from 'remotion';
import {B, ip, noise, rr, NIGHT, PHOENIX, WITCH, W, H} from './lib';
import {GROUND, jeanState, wandaState} from './cast';
import {Glow, Sparks} from './fx';

/* ------------------------------------------------------------------ *
 *  A ruined skyline, generated once and reused every frame.
 * ------------------------------------------------------------------ */

type Building = {
  x: number;
  w: number;
  h: number;
  top: [number, number][];
  lean: number;
  windows: [number, number][];
};

const makeLayer = (seed: string, count: number, minH: number, maxH: number, winP: number): Building[] => {
  const out: Building[] = [];
  let x = -160;
  for (let i = 0; i < count; i++) {
    const w = rr(`${seed}-w${i}`, 70, 210);
    const h = rr(`${seed}-h${i}`, minH, maxH);
    // Ruined tops: a jagged, broken-off profile instead of a clean roof.
    const teeth = Math.round(rr(`${seed}-t${i}`, 3, 7));
    const top: [number, number][] = [];
    for (let k = 0; k <= teeth; k++) {
      top.push([(w * k) / teeth, random(`${seed}-j${i}-${k}`) * Math.min(90, h * 0.28)]);
    }
    const windows: [number, number][] = [];
    for (let wy = 26; wy < h - 12; wy += 30) {
      for (let wx = 12; wx < w - 12; wx += 26) {
        if (random(`${seed}-win${i}-${wx}-${wy}`) < winP) windows.push([wx, wy]);
      }
    }
    out.push({x, w, h, top, lean: rr(`${seed}-l${i}`, -2.4, 2.4), windows});
    x += w + rr(`${seed}-g${i}`, 6, 62);
  }
  return out;
};

const FAR = makeLayer('far', 22, 190, 430, 0.05);
const MID = makeLayer('mid', 15, 300, 640, 0.045);
const NEAR = makeLayer('near', 8, 430, 880, 0.03);

const Skyline: React.FC<{
  layer: Building[];
  seed: string;
  fill: string;
  baseY: number;
  depth: number;
  cam: {x: number; y: number; z: number};
  frame: number;
  spread: number;
  winColor: string;
}> = ({layer, seed, fill, baseY, depth, cam, frame, spread, winColor}) => (
  <svg
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: W,
      height: H,
      overflow: 'visible',
      transform: `translate(${-cam.x * depth}px, ${-cam.y * depth}px) scale(${
        1 + (cam.z - 1) * (1 - depth * 0.8)
      })`,
      transformOrigin: '50% 40%',
    }}
  >
    {layer.map((b, i) => {
      const bx = b.x * spread + (W - layer.length * 120) * 0.1;
      const flick = random(`${seed}-f${i}`) > 0.88 ? (Math.sin(frame * 0.6 + i) > 0.2 ? 1 : 0.15) : 1;
      return (
        <g key={i} transform={`translate(${bx},${baseY}) rotate(${b.lean},${b.w / 2},0)`}>
          <path
            d={`M0,0 L0,${-b.h} ${b.top
              .map(([tx, ty]) => `L${tx},${ty - b.h}`)
              .join(' ')} L${b.w},0 Z`}
            fill={fill}
          />
          {b.windows.map(([wx, wy], k) => (
            <rect
              key={k}
              x={wx}
              y={-b.h + wy}
              width={7}
              height={11}
              fill={winColor}
              opacity={0.5 * flick}
            />
          ))}
        </g>
      );
    })}
  </svg>
);

/* ------------------------------------------------------------------ *
 *  Ground: a broken slab with a torn upper edge.
 * ------------------------------------------------------------------ */
const groundPath = () => {
  let d = `M-200,${H + 200} L-200,${GROUND + 10}`;
  for (let x = -200; x <= W + 200; x += 60) {
    const y = GROUND + noise(x * 0.02, 'ground') * 16 + random(`g-${x}`) * 12;
    d += ` L${x},${y}`;
  }
  d += ` L${W + 200},${H + 200} Z`;
  return d;
};
const GROUND_D = groundPath();

/* Foreground rubble chunks resting on the plane. */
const RUBBLE = new Array(26).fill(0).map((_, i) => ({
  x: rr(`rb-x${i}`, -60, W + 60),
  y: GROUND + rr(`rb-y${i}`, -6, 44),
  s: rr(`rb-s${i}`, 16, 62),
  r: rr(`rb-r${i}`, -30, 30),
  n: Math.round(rr(`rb-n${i}`, 4, 7)),
}));

const chunkPath = (seed: string, n: number, s: number) => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rad = s * (0.55 + random(`${seed}-${i}`) * 0.65);
    d += `${i === 0 ? 'M' : 'L'}${Math.cos(a) * rad},${Math.sin(a) * rad * 0.72} `;
  }
  return d + 'Z';
};

/* ------------------------------------------------------------------ *
 *  Suspended debris — the telekinetic field never lets it land.
 * ------------------------------------------------------------------ */
const DEBRIS = new Array(38).fill(0).map((_, i) => ({
  x0: rr(`d-x${i}`, -100, W + 100),
  y0: rr(`d-y${i}`, 160, GROUND + 30),
  s: rr(`d-s${i}`, 6, 34),
  spin: rr(`d-sp${i}`, -1.1, 1.1),
  rise: rr(`d-r${i}`, 0.05, 0.42),
  phase: rr(`d-p${i}`, 0, 100),
  n: Math.round(rr(`d-n${i}`, 4, 7)),
}));

export const Debris: React.FC<{frame: number; lift: number}> = ({frame, lift}) => (
  <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible'}}>
    {DEBRIS.map((d, i) => {
      const y = d.y0 - frame * d.rise * (0.4 + lift) - noise(frame * 0.03 + d.phase, `d-b${i}`) * 12;
      const x = d.x0 + noise(frame * 0.025 + d.phase, `d-a${i}`) * 26 * (0.5 + lift);
      const rot = d.phase * 3 + frame * d.spin * (0.5 + lift);
      const near = d.s > 22;
      return (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}>
          <path d={chunkPath(`dbg-${i}`, d.n, d.s)} fill={near ? '#05080f' : '#0a0f1c'} />
          <path
            d={chunkPath(`dbg-${i}`, d.n, d.s)}
            fill="none"
            stroke={x > W * 0.55 ? PHOENIX.deep : WITCH.deep}
            strokeWidth={1.2}
            opacity={0.22}
          />
        </g>
      );
    })}
  </svg>
);

/* ------------------------------------------------------------------ *
 *  Airborne dust, lit by whichever combatant is closer.
 * ------------------------------------------------------------------ */
export const Dust: React.FC<{frame: number; count?: number; energy: number}> = ({
  frame,
  count = 200,
  energy,
}) => {
  const j = jeanState(frame);
  const w = wandaState(frame);
  return (
    <Sparks
      count={count}
      seed="dust"
      frame={frame}
      color={WITCH.deep}
      hot={PHOENIX.hot}
      place={(i, r) => {
        const x = r('x') * (W + 300) - 150 + noise(frame * 0.02 + i, `dx${i}`) * 40;
        const y =
          ((r('y') * H + frame * (0.25 + r('v') * 0.9) * (0.4 + energy)) % (H + 200)) - 100;
        const dj = Math.hypot(x - j.x, y - j.y);
        const dw = Math.hypot(x - w.x, y - w.y);
        const lit = Math.max(0, 1 - Math.min(dj, dw) / 620);
        return {
          x,
          y,
          size: 0.7 + r('s') * 1.8,
          opacity: (0.05 + lit * 0.4) * (0.45 + energy * 0.55),
        };
      }}
    />
  );
};

/* ------------------------------------------------------------------ *
 *  Out-of-focus foreground wreckage, to give the frame depth and to
 *  stop the bottom of the shot from reading as an empty slab.
 * ------------------------------------------------------------------ */
const FG = new Array(9).fill(0).map((_, i) => ({
  x: -80 + i * 250 + rr(`fg-x${i}`, -60, 60),
  y: H + rr(`fg-y${i}`, -210, -110),
  s: rr(`fg-s${i}`, 170, 340),
  r: rr(`fg-r${i}`, -22, 22),
  n: Math.round(rr(`fg-n${i}`, 5, 8)),
}));

const Foreground: React.FC<{frame: number; cam: {x: number; y: number; z: number}}> = ({cam}) => (
  <svg
    style={{
      position: 'absolute',
      inset: 0,
      width: W,
      height: H,
      overflow: 'visible',
      filter: 'blur(9px)',
      transform: `translate(${cam.x * 0.22}px, ${cam.y * 0.22}px) scale(${1 + (cam.z - 1) * 0.4})`,
      transformOrigin: '50% 100%',
    }}
  >
    {FG.map((f, i) => (
      <g key={i} transform={`translate(${f.x},${f.y}) rotate(${f.r})`}>
        <path d={chunkPath(`fgp-${i}`, f.n, f.s)} fill="#010207" />
      </g>
    ))}
  </svg>
);

/* ------------------------------------------------------------------ *
 *  The full environment.
 * ------------------------------------------------------------------ */
export const World: React.FC<{frame: number; cam: {x: number; y: number; z: number}}> = ({
  frame,
  cam,
}) => {
  const j = jeanState(frame);
  const w = wandaState(frame);
  const blastLight = ip(frame, [B.phoenixTurn, B.phoenixBlast], [0, 1]);
  const lift = ip(frame, [B.tremorStart, B.phoenixBlast], [0.1, 1.2]);

  return (
    <>
      {/* night sky */}
      <div
        style={{
          position: 'absolute',
          inset: -400,
          background: `linear-gradient(180deg, ${NIGHT.sky0} 0%, ${NIGHT.sky1} 42%, ${NIGHT.sky2} 74%, #16203c 100%)`,
        }}
      />
      {/* ambient bounce from the two energy sources onto the sky */}
      <Glow x={w.x} y={w.y} r={1040} pal={{core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#20030c', dark: '#000'}} opacity={0.95 + blastLight * 0.2} hardness={0} />
      <Glow x={j.x} y={j.y} r={1040} pal={{core: PHOENIX.mid, hot: PHOENIX.deep, mid: PHOENIX.dark, deep: '#2a0d05', dark: '#000'}} opacity={0.85 + blastLight * 0.35} hardness={0} />

      <Skyline layer={FAR} seed="far" fill="#080d1a" baseY={GROUND - 6} depth={0.86} cam={cam} frame={frame} spread={1.02} winColor="#ffb86b" />
      <Skyline layer={MID} seed="mid" fill="#050912" baseY={GROUND + 4} depth={0.62} cam={cam} frame={frame} spread={1.5} winColor="#ff9a4d" />

      {/* atmospheric haze band sitting in front of the mid skyline */}
      <div
        style={{
          position: 'absolute',
          left: -200,
          right: -200,
          top: GROUND - 320,
          height: 420,
          background: `linear-gradient(180deg, rgba(27,36,64,0) 0%, rgba(31,41,72,0.3) 45%, rgba(16,21,40,0.6) 100%)`,
          filter: 'blur(2px)',
        }}
      />

      <Skyline layer={NEAR} seed="near" fill="#02040a" baseY={GROUND + 16} depth={0.34} cam={cam} frame={frame} spread={2.35} winColor="#ff7a2b" />

      {/* ground slab */}
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible'}}>
        <path d={GROUND_D} fill="#02040a" />
        {RUBBLE.map((r, i) => (
          <g key={i} transform={`translate(${r.x},${r.y}) rotate(${r.r})`}>
            <path d={chunkPath(`rbg-${i}`, r.n, r.s)} fill="#010308" />
          </g>
        ))}
      </svg>

      {/* wet-ground reflections of the two combatants */}
      <Glow x={w.x} y={GROUND + 24} r={190} pal={{...WITCH, core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#12000a', dark: '#000'}} opacity={0.5} ay={0.16} hardness={0} />
      <Glow x={j.x} y={GROUND + 28} r={230} pal={{...PHOENIX, core: PHOENIX.deep, hot: PHOENIX.dark, mid: '#2a0d05', deep: '#120503', dark: '#000'}} opacity={0.55 + blastLight * 0.3} ay={0.15} hardness={0} />

      {/* shafts of light raking between the towers */}
      {[0.2, 0.44, 0.68, 0.86].map((fx, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: W * fx - 150,
            top: -240,
            width: 300,
            height: GROUND + 300,
            transform: `rotate(${i % 2 ? 7 : -6}deg)`,
            background: `linear-gradient(180deg, ${i > 1 ? 'rgba(255,140,50,0.09)' : 'rgba(212,16,47,0.09)'} 0%, rgba(0,0,0,0) 82%)`,
            filter: 'blur(28px)',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      <Debris frame={frame} lift={lift} />
      <Dust frame={frame} energy={0.35 + lift * 0.5} />

      <Foreground frame={frame} cam={cam} />
    </>
  );
};
