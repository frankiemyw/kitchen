import React from 'react';
import {random} from 'remotion';
import {B, W, H, ip, t, clamp, mix, noise, rr, hit, easeOut, easeIn, easeInOut, easeExpo, PHOENIX, WITCH} from './lib';
import {GROUND, jeanState, wandaState, jeanJoints, wandaJoints} from './cast';
import {Glow, Beam, Ring, Bolt, Sparks, Vortex, Warp, Flash} from './fx';

const between = (f: number, a: number, b: number) => f >= a && f < b;

/* =================================================================== *
 *  ACT I — 0:00–0:05   The standoff, the tremor, the chaos wave
 * =================================================================== */

/** Fissures crawling out from under Wanda as the ground gives way. */
const CRACKS = new Array(9).fill(0).map((_, i) => {
  const dir = rr(`ck-d${i}`, -1, 1);
  const pts: [number, number][] = [[0, 0]];
  let x = 0;
  let y = 0;
  for (let k = 0; k < 7; k++) {
    x += dir * rr(`ck-x${i}-${k}`, 24, 74);
    y += rr(`ck-y${i}-${k}`, -12, 16);
    pts.push([x, y]);
  }
  return pts;
});

export const GroundCracks: React.FC<{frame: number}> = ({frame}) => {
  const grow = ip(frame, [B.tremorStart, B.waveLaunch], [0, 1], easeOut);
  const fire = ip(frame, [B.phoenixTurn, B.wingsOpen], [0, 1]);
  if (grow <= 0.01) return null;
  const w = wandaState(frame);
  const j = jeanState(frame);
  const pulse = 0.6 + Math.sin(frame * 0.24) * 0.18;
  return (
    <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen'}}>
      {CRACKS.map((pts, i) => {
        const src = i % 2 === 0 ? [w.x, GROUND + 14] : [j.x, GROUND + 22];
        const col = i % 2 === 0 ? WITCH.deep : PHOENIX.deep;
        const hotc = i % 2 === 0 ? WITCH.mid : PHOENIX.mid;
        const n = Math.max(2, Math.round(pts.length * grow));
        const d = pts
          .slice(0, n)
          .map((p, k) => `${k === 0 ? 'M' : 'L'}${src[0] + p[0]},${src[1] + p[1] * 0.6}`)
          .join(' ');
        const op = (0.55 + fire * 0.45) * pulse * (i % 2 === 0 ? 1 : 0.7 + fire * 0.5);
        return (
          <g key={i}>
            <path d={d} stroke={col} strokeWidth={13} fill="none" opacity={op * 0.55} style={{filter: 'blur(10px)'}} />
            <path d={d} stroke={hotc} strokeWidth={1.6} fill="none" opacity={op * 0.75} />
          </g>
        );
      })}
    </svg>
  );
};

/** Wanda spinning up chaos magic in both hands. */
export const WandaCharge: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.wandaCharge, B.waveLaunch], [0, 1], easeIn) * ip(frame, [B.waveLaunch, B.waveLaunch + 12], [1, 0]);
  const cast = ip(frame, [B.barrageStart - 20, B.barrageStart], [0, 1]) * ip(frame, [B.barrageEnd, B.barrageEnd + 14], [1, 0]);
  const warp = ip(frame, [B.warpStart - 14, B.warpStart], [0, 1]) * ip(frame, [B.disintegrate, B.disintegrate + 20], [1, 0]);
  const tele = ip(frame, [B.teleportIn, B.teleportIn + 6], [0, 1]) * ip(frame, [B.wandaStrike, B.wandaStrike + 8], [1, 0]);
  const amt = Math.max(k, Math.max(cast, Math.max(warp, tele)));
  if (amt <= 0.02) return null;
  const jt = wandaJoints(frame);
  return (
    <>
      {[jt.hand, jt.handFar].map((h, i) => (
        <React.Fragment key={i}>
          <Glow x={h[0]} y={h[1]} r={70 * amt + 26} pal={WITCH} opacity={0.9 * amt} hardness={0.8} />
          <Vortex x={h[0]} y={h[1]} r={44 * amt + 12} frame={frame + i * 20} pal={WITCH} opacity={0.85 * amt} seed={`wch${i}`} />
        </React.Fragment>
      ))}
      <Sparks
        count={46}
        seed="wcharge"
        frame={frame}
        color={WITCH.mid}
        hot={WITCH.core}
        place={(i, r) => {
          const h = i % 2 ? jt.hand : jt.handFar;
          const a = r('a') * Math.PI * 2 + frame * 0.06;
          const life = (frame * (0.02 + r('v') * 0.03) + r('p')) % 1;
          const rad = mix(150, 6, easeOut(life)) * (0.4 + r('s'));
          return {
            x: h[0] + Math.cos(a) * rad,
            y: h[1] + Math.sin(a) * rad * 0.85,
            size: 1.4 + r('s') * 3,
            opacity: amt * (1 - life) * 0.9,
          };
        }}
      />
    </>
  );
};

/** The wave: a crescent of chaos magic crossing the frame. */
export const ChaosWave: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.waveLaunch, B.compressStart + 6)) return null;
  const wj = wandaJoints(B.waveLaunch);
  const jj = jeanJoints(B.waveCaught);
  const travel = ip(frame, [B.waveLaunch, B.waveCaught], [0, 1], easeIn);
  // After the catch it stalls dead against her palm and shudders.
  const stall = ip(frame, [B.waveCaught, B.compressStart + 6], [0, 1]);
  const p = Math.min(travel, 1);
  const x = mix(wj.hand[0], jj.hand[0] - 120, p);
  const y = mix(wj.hand[1], jj.hand[1] + 10, p);
  const size = mix(90, 330, easeOut(p)) * (1 - stall * 0.16);
  const ang = (Math.atan2(jj.hand[1] - wj.hand[1], jj.hand[0] - wj.hand[0]) * 180) / Math.PI;
  const shudder = stall > 0 ? noise(frame * 1.4, 'stall') * 9 * (1 - stall) : 0;

  return (
    <>
      {/* trailing wake back toward Wanda */}
      <Beam
        x1={wj.hand[0]}
        y1={wj.hand[1]}
        x2={x}
        y2={y}
        width={size * 0.85}
        pal={WITCH}
        opacity={0.42 * (1 - stall * 0.7)}
      />
      {/* crescent face of the wave */}
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen'}}>
        <g transform={`translate(${x + shudder},${y}) rotate(${ang})`}>
          {new Array(6).fill(0).map((_, i) => {
            const s = 1 - i * 0.13;
            const n = noise(frame * 0.5 + i, `wv${i}`) * 14;
            return (
              <path
                key={i}
                d={`M${-size * 0.35},${-size * s} Q${size * 0.62 + n},0 ${-size * 0.35},${size * s}`}
                fill="none"
                stroke={i < 2 ? WITCH.core : i < 4 ? WITCH.hot : WITCH.mid}
                strokeWidth={mix(16, 3, i / 5)}
                opacity={mix(0.95, 0.4, i / 5)}
                style={{filter: `blur(${i < 2 ? 1 : 4}px)`}}
              />
            );
          })}
        </g>
      </svg>
      <Glow x={x} y={y} r={size * 1.05} pal={WITCH} opacity={0.9} hardness={0.62} ax={0.78} rot={ang} />
      <Sparks
        count={70}
        seed="wave"
        frame={frame}
        color={WITCH.hot}
        hot={WITCH.core}
        place={(i, r) => {
          const back = r('b') * 340;
          const a = (r('a') - 0.5) * 1.5;
          return {
            x: x - Math.cos((ang * Math.PI) / 180) * back + Math.sin(a) * size * 0.7,
            y: y - Math.sin((ang * Math.PI) / 180) * back + Math.cos(a) * size * 0.7 * (r('c') - 0.5) * 2,
            size: 2 + r('s') * 5,
            opacity: (1 - back / 340) * 0.8,
            stretch: 2.4,
            rot: ang,
          };
        }}
      />
    </>
  );
};

/* =================================================================== *
 *  ACT II — 0:05–0:10   Telekinetic catch, compression, return fire
 * =================================================================== */

export const TelekineticCatch: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.waveCaught - 6, B.sphereThrown + 6)) return null;
  const jj = jeanJoints(frame);
  const impact = hit(frame, B.waveCaught, 26, 1);
  // Compression: everything collapses into a sphere at her palm.
  const comp = ip(frame, [B.compressStart, B.compressEnd], [0, 1], easeInOut);
  const r = mix(190, 40, comp);
  const cx = jj.hand[0] - mix(150, 46, comp);
  const cy = jj.hand[1] + mix(10, 0, comp);
  const bake = comp; // red bleeds to phoenix orange as she takes it over

  const pal = {
    core: '#ffffff',
    hot: comp > 0.45 ? PHOENIX.hot : WITCH.core,
    mid: comp > 0.35 ? mixHex(WITCH.mid, PHOENIX.mid, bake) : WITCH.mid,
    deep: mixHex(WITCH.deep, PHOENIX.deep, bake),
    dark: WITCH.dark,
  };

  return (
    <>
      {/* the palm's TK plane — a flat disc of force */}
      <Ring
        x={jj.hand[0] - 30}
        y={jj.hand[1]}
        r={70 + impact * 110}
        thickness={4 + impact * 8}
        color={PHOENIX.hot}
        opacity={0.3 + impact * 0.5}
        squash={2.2}
        rot={-72}
      />
      <Glow x={jj.hand[0]} y={jj.hand[1]} r={56 + impact * 80} pal={PHOENIX} opacity={0.7 + impact * 0.3} hardness={0.85} />

      {/* the captured mass */}
      <Glow x={cx} y={cy} r={r} pal={pal} opacity={0.95} hardness={0.4 + comp * 0.5} />
      <Vortex x={cx} y={cy} r={r * 0.72} frame={frame * (1 + comp * 2.4)} pal={pal} opacity={0.9} arcs={9} seed="cap" />
      {comp > 0.05 ? (
        <Ring x={cx} y={cy} r={r * 1.25} thickness={3} color={pal.hot} opacity={0.5 * comp} squash={0.34} rot={frame * 3} />
      ) : null}

      {/* magic being wrung inward */}
      <Sparks
        count={90}
        seed="crush"
        frame={frame}
        color={pal.mid}
        hot={pal.core}
        place={(i, r0) => {
          const a = r0('a') * Math.PI * 2;
          const life = (frame * (0.024 + r0('v') * 0.03) + r0('p')) % 1;
          const rad = mix(mix(230, 90, comp), r * 0.5, easeIn(life));
          return {
            x: cx + Math.cos(a) * rad,
            y: cy + Math.sin(a) * rad,
            size: 1.6 + r0('s') * 3.4,
            opacity: (1 - life) * 0.85,
            stretch: 1.8,
            rot: (a * 180) / Math.PI,
          };
        }}
      />
    </>
  );
};

/** Hex mix so red can visibly become fire as Jean takes the magic over. */
function mixHex(a: string, b: string, k: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const c = (x: number, y: number) => Math.round(mix(x, y, clamp(k)));
  return `rgb(${c(r1, r2)},${c(g1, g2)},${c(b1, b2)})`;
}

export const SphereReturn: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.sphereThrown, B.wandaHit + 4)) return null;
  const from = jeanJoints(B.sphereThrown).hand;
  const to = wandaState(B.wandaHit);
  const p = ip(frame, [B.sphereThrown, B.wandaHit], [0, 1], easeIn);
  const x = mix(from[0], to.x, p);
  const y = mix(from[1], to.y - 40, p);
  const stretch = mix(1, 3.4, Math.sin(p * Math.PI));
  const ang = (Math.atan2(to.y - 40 - from[1], to.x - from[0]) * 180) / Math.PI;
  return (
    <>
      <Beam x1={from[0]} y1={from[1]} x2={x} y2={y} width={92} pal={PHOENIX} opacity={0.5 * (1 - p * 0.4)} />
      <Glow x={x} y={y} r={78} pal={PHOENIX} opacity={1} hardness={0.9} ax={stretch} ay={0.9} rot={ang} />
      <Glow x={x} y={y} r={150} pal={PHOENIX} opacity={0.55} hardness={0.2} />
      <Sparks
        count={54}
        seed="ret"
        frame={frame}
        color={PHOENIX.mid}
        hot={PHOENIX.core}
        place={(i, r) => {
          const back = r('b') * 300;
          return {
            x: x - Math.cos((ang * Math.PI) / 180) * back + (r('o') - 0.5) * 70,
            y: y - Math.sin((ang * Math.PI) / 180) * back + (r('q') - 0.5) * 70,
            size: 2 + r('s') * 4,
            opacity: (1 - back / 300) * 0.85,
            stretch: 2.6,
            rot: ang,
          };
        }}
      />
    </>
  );
};

/** Three walls of rubble Wanda is driven through, shattering in sequence. */
const WALLS = [430, 316, 214].map((x, i) => ({
  x,
  at: B.rubbleBurst + i * 9,
  chunks: new Array(16).fill(0).map((_, k) => ({
    y: GROUND - rr(`wl${i}-y${k}`, 10, 260),
    s: rr(`wl${i}-s${k}`, 14, 52),
    vx: -rr(`wl${i}-vx${k}`, 2, 13),
    vy: -rr(`wl${i}-vy${k}`, 1, 9),
    sp: rr(`wl${i}-sp${k}`, -8, 8),
    n: Math.round(rr(`wl${i}-n${k}`, 4, 7)),
  })),
}));

const poly = (seed: string, n: number, s: number) => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rad = s * (0.5 + random(`${seed}-${i}`) * 0.7);
    d += `${i === 0 ? 'M' : 'L'}${Math.cos(a) * rad},${Math.sin(a) * rad * 0.8} `;
  }
  return d + 'Z';
};

export const RubbleWalls: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.wandaHit - 4, B.wandaRises + 40)) return null;
  return (
    <>
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible'}}>
        {WALLS.map((wall, i) => {
          const age = frame - wall.at;
          const standing = age < 0;
          return (
            <g key={i}>
              {standing ? (
                <rect x={wall.x - 34} y={GROUND - 280} width={68} height={290} fill="#02040a" />
              ) : (
                wall.chunks.map((c, k) => {
                  const a = age;
                  const cx = wall.x + c.vx * a + (random(`o${i}${k}`) - 0.5) * 40;
                  const cy = c.y + c.vy * a + 0.22 * a * a * 0.5;
                  if (cy > GROUND + 90) return null;
                  return (
                    <g key={k} transform={`translate(${cx},${cy}) rotate(${c.sp * a})`}>
                      <path d={poly(`wc${i}${k}`, c.n, c.s)} fill="#03060d" />
                      <path d={poly(`wc${i}${k}`, c.n, c.s)} fill="none" stroke={WITCH.deep} strokeWidth={1.5} opacity={0.65} />
                    </g>
                  );
                })
              )}
            </g>
          );
        })}
      </svg>
      {WALLS.map((wall, i) => {
        const b = hit(frame, wall.at, 30, 1);
        if (b <= 0.01) return null;
        return (
          <React.Fragment key={i}>
            <Glow x={wall.x} y={GROUND - 150} r={210 * b + 60} pal={PHOENIX} opacity={b * 0.9} hardness={0.55} />
            <Ring x={wall.x} y={GROUND - 150} r={(1 - b) * 420 + 40} thickness={10 * b + 2} color={PHOENIX.hot} opacity={b * 0.8} />
          </React.Fragment>
        );
      })}
      {/* dust kicked up along the drag line */}
      <Sparks
        count={80}
        seed="wallDust"
        frame={frame}
        color="#4a3b3f"
        hot="#8a6f70"
        place={(i, r) => {
          const born = B.rubbleBurst + r('t') * 40;
          const age = frame - born;
          if (age < 0 || age > 60) return null;
          return {
            x: mix(520, 150, r('x')) + age * (r('vx') - 0.7) * 2.4,
            y: GROUND - r('y') * 240 - age * r('vy') * 1.6,
            size: 12 + r('s') * 46,
            opacity: clamp(1 - age / 60) * 0.28,
          };
        }}
      />
    </>
  );
};

/* =================================================================== *
 *  ACT III — 0:10–0:17   Barrage, Phoenix flight, the concrete hurl
 * =================================================================== */

const SHOTS_FIRED = [330, 352, 374, 396, 412];

export const Barrage: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.barrageStart - 4, B.concreteRip + 30)) return null;
  return (
    <>
      {SHOTS_FIRED.map((at, i) => {
        const p = ip(frame, [at, at + 16], [0, 1], easeIn);
        if (frame < at || p >= 1) {
          // linger as a burst behind her after it passes
          const burst = hit(frame, at + 16, 22, 1);
          if (burst <= 0.01) return null;
          const miss = jeanState(at - 8);
          return (
            <Glow key={i} x={miss.x + rr(`ms${i}`, 90, 300)} y={miss.y - rr(`msy${i}`, 60, 190)} r={130 * burst + 30} pal={WITCH} opacity={burst * 0.75} hardness={0.5} />
          );
        }
        const src = wandaJoints(at).hand;
        const tgt = jeanState(at + 4);
        const x = mix(src[0], tgt.x + rr(`ai${i}`, -40, 60), p);
        const y = mix(src[1], tgt.y + rr(`aiy${i}`, -30, 40), p);
        return (
          <React.Fragment key={i}>
            <Beam x1={src[0]} y1={src[1]} x2={x} y2={y} width={mix(70, 30, p)} pal={{core: WITCH.hot, hot: WITCH.mid, mid: WITCH.deep, deep: WITCH.dark, dark: '#000'}} opacity={0.8} />
            <Beam x1={src[0]} y1={src[1]} x2={x} y2={y} width={mix(20, 9, p)} pal={WITCH} opacity={0.95} />
            <Glow x={x} y={y} r={52} pal={WITCH} opacity={0.95} hardness={0.85} />
            <Glow x={x} y={y} r={150} pal={{core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#12000a', dark: '#000'}} opacity={0.5} hardness={0.1} />
          </React.Fragment>
        );
      })}
    </>
  );
};

/** The Phoenix trail — she leaves fire in the air behind her. */
export const PhoenixTrail: React.FC<{frame: number}> = ({frame}) => {
  const intensity =
    ip(frame, [B.barrageStart - 10, B.barrageStart + 6], [0.12, 1]) *
      ip(frame, [B.barrageEnd - 6, B.barrageEnd + 20], [1, 0.18]) +
    0.18;
  const samples = 20;
  const pts: [number, number][] = [];
  for (let i = 0; i < samples; i++) {
    const s = jeanState(frame - i * 1.35);
    pts.push([s.x, s.y]);
  }
  const speed = Math.hypot(pts[0][0] - pts[2][0], pts[0][1] - pts[2][1]);
  const power = clamp(speed / 34) * intensity;
  if (power <= 0.03) return null;
  return (
    <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen'}}>
      {[
        {w: 132, c: PHOENIX.dark, o: 0.85, b: 22},
        {w: 84, c: PHOENIX.deep, o: 0.85, b: 12},
        {w: 44, c: PHOENIX.mid, o: 0.8, b: 6},
        {w: 18, c: PHOENIX.hot, o: 0.8, b: 2},
        {w: 5, c: PHOENIX.core, o: 0.85, b: 0},
      ].map((band, bi) => (
        <g key={bi} style={{filter: `blur(${band.b}px)`}}>
          {pts.slice(0, samples - 1).map((p, i) => {
            const k = 1 - i / samples;
            const wob = noise(frame * 0.4 + i, `tr${bi}${i}`) * 16 * (1 - k);
            return (
              <line
                key={i}
                x1={p[0]}
                y1={p[1] + wob}
                x2={pts[i + 1][0]}
                y2={pts[i + 1][1] + wob}
                stroke={band.c}
                strokeWidth={band.w * k * power}
                strokeLinecap="round"
                opacity={band.o * k * power}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
};

/** Embers constantly shedding off Jean. */
export const Embers: React.FC<{frame: number}> = ({frame}) => {
  const j = jeanState(frame);
  const fury = 0.35 + ip(frame, [B.phoenixTurn, B.phoenixBlast], [0, 1.4]);
  return (
    <Sparks
      count={110}
      seed="ember"
      frame={frame}
      color={PHOENIX.mid}
      hot={PHOENIX.core}
      place={(i, r) => {
        const life = (frame * (0.012 + r('v') * 0.026) + r('p')) % 1;
        const born = jeanState(frame - life * 44);
        const a = r('a') * Math.PI * 2;
        const spread = (54 + life * (60 + r('sp') * 240)) * (0.6 + fury);
        return {
          x: born.x + Math.cos(a) * spread * 1.1,
          y: born.y + Math.sin(a) * spread * 0.8 - life * 90 * fury,
          size: (1.2 + r('s') * 3) * (0.6 + fury * 0.5),
          opacity: Math.sin(life * Math.PI) * 0.8 * clamp(fury),
        };
      }}
    />
  );
};

/** Slabs of the street torn up and thrown. */
const SLABS = new Array(7).fill(0).map((_, i) => ({
  x0: rr(`sl-x${i}`, 640, 1240),
  s: rr(`sl-s${i}`, 52, 128),
  spin: rr(`sl-sp${i}`, -3.4, 3.4),
  delay: i * 5,
  arc: rr(`sl-a${i}`, -120, 90),
  n: Math.round(rr(`sl-n${i}`, 5, 8)),
}));

export const ConcreteHurl: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.concreteRip - 6, B.disintegrate + 30)) return null;
  const tgt = wandaState(B.warpStart + 20);
  return (
    <>
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible'}}>
        {SLABS.map((s, i) => {
          const rise = ip(frame, [B.concreteRip + s.delay, B.concreteHurl - 4], [0, 1], easeOut);
          const fly = ip(frame, [B.concreteHurl + s.delay, B.warpStart + 26], [0, 1], easeIn);
          // Reality-warped out of existence, one by one.
          const kill = ip(frame, [B.warpStart + 10 + i * 6, B.disintegrate + i * 3], [0, 1]);
          if (kill >= 1) return null;
          const hover = GROUND - 40 - rise * (170 + i * 26);
          const x = mix(s.x0, tgt.x + s.arc, fly);
          const y = mix(hover, tgt.y - 30 + s.arc * 0.3, fly) - Math.sin(fly * Math.PI) * 90;
          const scale = (1 - kill * 0.75) * (1 + fly * 0.25);
          const rot = frame * s.spin * (0.3 + fly * 2);
          return (
            <g key={i} transform={`translate(${x},${y}) rotate(${rot}) scale(${scale})`} opacity={1 - kill}>
              <path d={poly(`slb${i}`, s.n, s.s)} fill="#03060e" />
              <path
                d={poly(`slb${i}`, s.n, s.s)}
                fill="none"
                stroke={kill > 0.05 ? WITCH.hot : PHOENIX.mid}
                strokeWidth={2.6}
                opacity={0.85}
                style={{filter: 'blur(1.5px)'}}
              />
            </g>
          );
        })}
      </svg>
      {/* TK aura around each slab while Jean is holding them */}
      {SLABS.map((s, i) => {
        const rise = ip(frame, [B.concreteRip + s.delay, B.concreteHurl - 4], [0, 1], easeOut);
        const fly = ip(frame, [B.concreteHurl + s.delay, B.warpStart + 26], [0, 1], easeIn);
        const kill = ip(frame, [B.warpStart + 10 + i * 6, B.disintegrate + i * 3], [0, 1]);
        if (kill >= 1 || rise <= 0.02) return null;
        const hover = GROUND - 40 - rise * (170 + i * 26);
        const x = mix(s.x0, tgt.x + s.arc, fly);
        const y = mix(hover, tgt.y - 30 + s.arc * 0.3, fly) - Math.sin(fly * Math.PI) * 90;
        const pal = kill > 0.05 ? WITCH : PHOENIX;
        return (
          <React.Fragment key={i}>
            <Glow x={x} y={y} r={s.s * 2.1} pal={pal} opacity={(0.45 + fly * 0.3) * (1 - kill * 0.4)} hardness={0.25} />
            {kill > 0.02 ? <Warp x={x} y={y} r={s.s * 2.6} frame={frame} strength={kill * (1 - kill) * 4} seed={`wp${i}`} /> : null}
          </React.Fragment>
        );
      })}
      {/* the ground opening where the slabs came from */}
      <Glow x={940} y={GROUND - 10} r={ip(frame, [B.concreteRip, B.concreteHurl], [40, 420])} pal={PHOENIX} opacity={ip(frame, [B.concreteRip, B.concreteHurl, B.warpStart], [0, 0.55, 0.1])} ay={0.28} hardness={0.15} />
    </>
  );
};

/** Wanda is never idle — chaos magic idles around her the whole fight. */
export const WitchAura: React.FC<{frame: number}> = ({frame}) => {
  const w = wandaState(frame);
  const base = 0.5 + ip(frame, [B.tremorStart, B.waveLaunch], [0, 0.35]);
  const peak =
    Math.max(
      ip(frame, [B.warpStart - 20, B.warpStart], [0, 0.5]) * ip(frame, [B.disintegrate, B.disintegrate + 24], [1, 0]),
      ip(frame, [B.shieldUp - 16, B.shieldUp], [0, 0.6])
    );
  const amt = base + peak;
  return (
    <>
      <Glow
        x={w.x}
        y={w.y - 20}
        r={200 + amt * 130}
        pal={{core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#1a0008', dark: '#000'}}
        opacity={0.5 + amt * 0.3}
        hardness={0}
      />
      <Sparks
        count={40}
        seed="aura"
        frame={frame}
        color={WITCH.mid}
        hot={WITCH.hot}
        place={(i, r) => {
          const a = r('a') * Math.PI * 2 + frame * (0.006 + r('v') * 0.014);
          const rad = 70 + r('r') * 150;
          return {
            x: w.x + Math.cos(a) * rad,
            y: w.y - 10 + Math.sin(a) * rad * 0.9 + noise(frame * 0.03 + i, `au${i}`) * 20,
            size: 1.2 + r('s') * 2.6,
            opacity: (0.25 + r('o') * 0.5) * amt,
          };
        }}
      />
    </>
  );
};
