import React from 'react';
import {random} from 'remotion';
import {B, W, H, ip, clamp, mix, noise, rr, hit, easeOut, easeIn, easeInOut, easeExpo, PHOENIX, WITCH} from './lib';
import {GROUND, jeanState, wandaState, jeanJoints, wandaJoints} from './cast';
import {Glow, Beam, Ring, Bolt, Sparks, Vortex, Warp, Flash} from './fx';

const between = (f: number, a: number, b: number) => f >= a && f < b;

/* =================================================================== *
 *  ACT IV — 0:17–0:23   Reality warp, disintegration, teleport strike
 * =================================================================== */

/** Wanda rewriting the space the slabs are flying through. */
export const RealityWarp: React.FC<{frame: number}> = ({frame}) => {
  const amt = ip(frame, [B.warpStart, B.warpStart + 26], [0, 1], easeOut) * ip(frame, [B.disintegrate, B.disintegrate + 34], [1, 0]);
  if (amt <= 0.02) return null;
  const cx = 900;
  const cy = 470;
  const R = 430 * amt;
  return (
    <>
      <Warp x={cx} y={cy} r={R} frame={frame} strength={amt * 1.5} seed="field" />
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen', opacity: amt}}>
        {/* nested rotating polygons — the geometry of the world being edited */}
        {new Array(5).fill(0).map((_, i) => {
          const sides = 6;
          const rad = R * (0.32 + i * 0.17);
          const spin = frame * (i % 2 ? -1.5 : 1.9) + i * 18;
          const pts = new Array(sides)
            .fill(0)
            .map((__, k) => {
              const a = ((k / sides) * 360 + spin) * (Math.PI / 180);
              return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad * 0.92}`;
            })
            .join(' ');
          return (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke={i % 2 ? WITCH.hot : WITCH.mid}
              strokeWidth={1.6 + (i % 2)}
              opacity={0.32 + (i % 2) * 0.2}
            />
          );
        })}
      </svg>
      <Glow x={cx} y={cy} r={R * 1.15} pal={{...WITCH, core: WITCH.mid, hot: WITCH.deep, mid: WITCH.dark, deep: '#160008', dark: '#000'}} opacity={0.5 * amt} hardness={0} />
      {/* the mass of the slabs, unmade into drifting motes */}
      <Sparks
        count={150}
        seed="unmake"
        frame={frame}
        color={WITCH.hot}
        hot={WITCH.core}
        place={(i, r) => {
          const born = B.warpStart + 14 + r('t') * 46;
          const age = frame - born;
          if (age < 0 || age > 90) return null;
          const a = r('a') * Math.PI * 2;
          const rad = 60 + r('r') * 300;
          return {
            x: cx + Math.cos(a) * rad + age * (r('vx') - 0.5) * 3.4,
            y: cy + Math.sin(a) * rad * 0.8 - age * (0.6 + r('vy') * 1.9),
            size: (1.6 + r('s') * 4) * clamp(1 - age / 90),
            opacity: clamp(1 - age / 90) * 0.9 * amt,
          };
        }}
      />
    </>
  );
};

/** The fold: she collapses out of one place and unfolds in another. */
const Fold: React.FC<{x: number; y: number; k: number; frame: number}> = ({x, y, k, frame}) => {
  const slit = Math.sin(k * Math.PI);
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x - 6,
          top: y - 210 * (0.3 + slit),
          width: 12,
          height: 420 * (0.3 + slit),
          borderRadius: 8,
          background: `linear-gradient(180deg, rgba(0,0,0,0), ${WITCH.core}, rgba(0,0,0,0))`,
          opacity: slit,
          mixBlendMode: 'screen',
          filter: 'blur(3px)',
          transform: `scaleX(${0.3 + (1 - slit) * 2.4})`,
        }}
      />
      <Glow x={x} y={y} r={90 + slit * 150} pal={WITCH} opacity={slit * 0.95} hardness={0.7} ax={0.35} />
      <Ring x={x} y={y} r={(1 - k) * 260 + 30} thickness={6} color={WITCH.hot} opacity={slit * 0.8} squash={1.5} />
      <Sparks
        count={48}
        seed={`fold${Math.round(x)}`}
        frame={frame}
        color={WITCH.mid}
        hot={WITCH.core}
        place={(i, r) => {
          const a = r('a') * Math.PI * 2;
          const rad = mix(220, 12, k) * (0.3 + r('r'));
          return {
            x: x + Math.cos(a) * rad * 0.5,
            y: y + Math.sin(a) * rad,
            size: 1.6 + r('s') * 3,
            opacity: slit * 0.85,
            stretch: 0.4,
          };
        }}
      />
    </>
  );
};

export const Teleport: React.FC<{frame: number}> = ({frame}) => {
  const out = between(frame, B.teleportOut - 8, B.teleportOut + 10);
  const inn = between(frame, B.teleportIn - 8, B.teleportIn + 12);
  if (!out && !inn) return null;
  const w = wandaState(B.teleportOut - 1);
  const w2 = wandaState(B.teleportIn + 2);
  return (
    <>
      {out ? <Fold x={w.x} y={w.y - 40} k={ip(frame, [B.teleportOut - 8, B.teleportOut + 10], [0, 1])} frame={frame} /> : null}
      {inn ? <Fold x={w2.x} y={w2.y - 40} k={ip(frame, [B.teleportIn - 8, B.teleportIn + 12], [1, 0])} frame={frame} /> : null}
    </>
  );
};

/** Point-blank blast into Jean's back. */
export const TeleportStrike: React.FC<{frame: number}> = ({frame}) => {
  if (!between(frame, B.wandaStrike - 12, B.wandaStrike + 46)) return null;
  const src = wandaJoints(Math.min(frame, B.wandaStrike + 6)).hand;
  const jt = jeanState(Math.max(frame, B.wandaStrike));
  const charge = ip(frame, [B.wandaStrike - 12, B.wandaStrike], [0, 1], easeIn);
  const fire = ip(frame, [B.wandaStrike, B.wandaStrike + 10], [0, 1], easeOut) * ip(frame, [B.wandaStrike + 14, B.wandaStrike + 34], [1, 0]);
  const boom = hit(frame, B.wandaStrike + 2, 40, 1);
  return (
    <>
      <Glow x={src[0]} y={src[1]} r={40 + charge * 90} pal={WITCH} opacity={charge} hardness={0.9} />
      {fire > 0.01 ? (
        <>
          <Beam x1={src[0]} y1={src[1]} x2={jt.x + 40} y2={jt.y - 20} width={120 * fire} pal={WITCH} opacity={fire} />
          <Bolt x1={src[0]} y1={src[1]} x2={jt.x + 40} y2={jt.y - 20} seed="strike" frame={frame} amp={34} width={4} color={WITCH.core} glow={WITCH.hot} opacity={fire} />
        </>
      ) : null}
      {boom > 0.01 ? (
        <>
          <Glow x={jt.x + 30} y={jt.y - 10} r={140 + boom * 320} pal={WITCH} opacity={boom} hardness={0.7} />
          <Ring x={jt.x + 30} y={jt.y - 10} r={(1 - boom) * 620 + 40} thickness={16 * boom + 3} color={WITCH.core} opacity={boom * 0.9} />
          <Ring x={jt.x + 30} y={jt.y - 10} r={(1 - boom) * 420 + 30} thickness={9 * boom + 2} color={WITCH.hot} opacity={boom * 0.7} squash={0.5} rot={-24} />
          <Sparks
            count={90}
            seed="strikeSpark"
            frame={frame}
            color={WITCH.hot}
            hot={'#fff'}
            place={(i, r) => {
              const age = frame - (B.wandaStrike + 2);
              if (age < 0) return null;
              const a = r('a') * Math.PI * 2;
              const sp = 6 + r('v') * 26;
              return {
                x: jt.x + 30 + Math.cos(a) * sp * age,
                y: jt.y - 10 + Math.sin(a) * sp * age + age * age * 0.05,
                size: 2 + r('s') * 5,
                opacity: clamp(1 - age / 40) * 0.95,
                stretch: 2.2,
                rot: (a * 180) / Math.PI,
              };
            }}
          />
        </>
      ) : null}
    </>
  );
};

/* =================================================================== *
 *  ACT V — 0:23–0:27   Dark Phoenix
 * =================================================================== */

/** The wings.  Fourteen flame feathers per side, off the shoulder blades. */
const feather = (
  rootX: number,
  rootY: number,
  ang: number,
  len: number,
  width: number,
  curve: number
) => {
  const a = (ang * Math.PI) / 180;
  const tipX = rootX + Math.cos(a) * len;
  const tipY = rootY + Math.sin(a) * len;
  const px = -Math.sin(a);
  const py = Math.cos(a);
  const mx = rootX + Math.cos(a) * len * 0.5 + px * curve;
  const my = rootY + Math.sin(a) * len * 0.5 + py * curve;
  return `M${rootX + px * width},${rootY + py * width}
    Q${mx + px * width * 0.8},${my + py * width * 0.8} ${tipX},${tipY}
    Q${mx - px * width * 0.8},${my - py * width * 0.8} ${rootX - px * width},${rootY - py * width} Z`;
};

export const PhoenixWings: React.FC<{frame: number}> = ({frame}) => {
  const open = ip(frame, [B.wingsOpen, B.wingsOpen + 42], [0, 1], easeOut);
  const flare = 1 + hit(frame, B.phoenixBlast, 40, 0.22) + ip(frame, [B.phoenixBlast, B.clash], [0, 0.1]);
  if (open <= 0.01) return null;
  const j = jeanState(frame);
  const rootY = j.y - 46 * j.scale;
  const beat = Math.sin(frame * 0.13) * 0.05 + 1;
  const S = j.scale * open * beat * flare;

  /* The leading edge: shoulder -> elbow -> wrist, as a quadratic arc.
     Feathers hang off it, short and downward at the root, long and
     swept back at the tip — which is what makes it a wing and not a sun. */
  const bone = (sign: number, u: number): [number, number] => {
    const c: [number, number] = [sign * 210 * S, -230 * S];
    const e: [number, number] = [sign * 560 * S, -120 * S];
    const m = 1 - u;
    return [m * m * 0 + 2 * m * u * c[0] + u * u * e[0], m * m * 0 + 2 * m * u * c[1] + u * u * e[1]];
  };

  const N = 13;
  const wing = (sign: number) =>
    new Array(N).fill(0).map((_, i) => {
      const u = 0.1 + (i / (N - 1)) * 0.9;
      const [bx, by] = bone(sign, u);
      const flick = 1 + noise(frame * 0.15 + i * 0.9, `wf${sign}${i}`) * 0.12;
      const jag = 0.82 + random(`wj${sign}${i}`) * 0.34;
      // Downward at the shoulder, sweeping outward and back at the primaries.
      const base = mix(104, 34, u) + (random(`wa${sign}${i}`) - 0.5) * 9;
      const ang = sign > 0 ? base : 180 - base;
      const len = mix(140, 390, Math.sin(u * 1.5)) * S * flick * jag;
      const wid = mix(46, 27, u) * S * (0.8 + random(`ww${sign}${i}`) * 0.5);
      const curve = -sign * mix(20, 110, u) * open;
      return {x: bx, y: by, ang, len, wid, curve};
    });

  const passes = [
    {grow: 26, col: PHOENIX.dark, blur: 34, op: 0.4},
    {grow: 9, col: PHOENIX.deep, blur: 16, op: 0.5},
    {grow: 0, col: PHOENIX.mid, blur: 6, op: 0.45},
    {grow: -11, col: PHOENIX.hot, blur: 2, op: 0.3},
  ];

  return (
    <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen'}}>
      <g transform={`translate(${j.x},${rootY})`}>
        {passes.map((p, pi) => (
          <g key={pi} style={{filter: `blur(${p.blur}px)`}} opacity={p.op}>
            {[1, -1].map((sign) =>
              wing(sign).map((f, i) => (
                <path
                  key={`${sign}-${i}`}
                  d={feather(f.x, f.y, f.ang, f.len * (pi === 3 ? 0.82 : 1), Math.max(3, f.wid + p.grow), f.curve)}
                  fill={p.col}
                />
              ))
            )}
          </g>
        ))}
        {/* burning leading edge */}
        <g opacity={0.6} style={{filter: 'blur(3px)'}}>
          {[1, -1].map((sign) => (
            <path
              key={sign}
              d={`M0,0 Q${sign * 210 * S},${-230 * S} ${sign * 560 * S},${-120 * S}`}
              fill="none"
              stroke={PHOENIX.hot}
              strokeWidth={7 * S}
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>
    </svg>
  );
};

/** Corona building around her as control slips. */
export const DarkPhoenixCorona: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.phoenixTurn, B.phoenixBlast], [0, 1], easeIn);
  if (k <= 0.01) return null;
  const j = jeanState(frame);
  const pulse = 1 + Math.sin(frame * 0.3) * 0.06;
  return (
    <>
      <Glow
        x={j.x}
        y={j.y - 30}
        r={(180 + k * 320) * pulse}
        pal={{core: PHOENIX.hot, hot: PHOENIX.mid, mid: PHOENIX.deep, deep: PHOENIX.dark, dark: '#000'}}
        opacity={0.4 + k * 0.35}
        hardness={0.1}
      />
      <Glow x={j.x} y={j.y - 30} r={(60 + k * 80) * pulse} pal={PHOENIX} opacity={0.55 + k * 0.25} hardness={0.6} />
      {new Array(4).fill(0).map((_, i) => (
        <Ring
          key={i}
          x={j.x}
          y={j.y - 30}
          r={((frame * 7 + i * 130) % 520) * k + 40}
          thickness={3}
          color={PHOENIX.mid}
          opacity={k * 0.3 * (1 - (((frame * 7 + i * 130) % 520) / 520))}
          squash={0.42}
          rot={-12}
        />
      ))}
    </>
  );
};

/** The blast itself — a wall of cosmic fire crossing the battlefield. */
export const PhoenixBlast: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.phoenixBlast, B.phoenixBlast + 22], [0, 1], easeOut);
  if (k <= 0.01) return null;
  const j = jeanJoints(frame);
  const w = wandaState(frame);
  // The front stalls at the shield once it is up.
  const reach = ip(frame, [B.phoenixBlast, B.shieldUp], [0, 1], easeOut);
  const frontX = mix(j.hand[0], w.x + 210, Math.min(1, reach));
  const frontY = mix(j.hand[1], w.y - 60, Math.min(1, reach));
  const width = mix(90, 300, k) * (1 + Math.sin(frame * 0.5) * 0.04);
  return (
    <>
      <Beam x1={j.hand[0] + 30} y1={j.hand[1]} x2={frontX} y2={frontY} width={width} pal={{core: PHOENIX.hot, hot: PHOENIX.mid, mid: PHOENIX.deep, deep: PHOENIX.dark, dark: '#000'}} opacity={0.7 * k} />
      <Beam x1={j.hand[0] + 30} y1={j.hand[1]} x2={frontX} y2={frontY} width={width * 0.3} pal={PHOENIX} opacity={0.85 * k} />
      <Glow x={j.hand[0]} y={j.hand[1]} r={150 * k} pal={PHOENIX} opacity={0.85 * k} hardness={0.85} />
      <Glow x={frontX} y={frontY} r={220 * k} pal={{core: PHOENIX.hot, hot: PHOENIX.mid, mid: PHOENIX.deep, deep: PHOENIX.dark, dark: '#000'}} opacity={0.7 * k} hardness={0.4} />
      {new Array(5).fill(0).map((_, i) => {
        const p = ((frame * 0.05 + i * 0.2) % 1);
        const x = mix(j.hand[0], frontX, p);
        const y = mix(j.hand[1], frontY, p);
        return <Ring key={i} x={x} y={y} r={width * (0.5 + p * 0.5)} thickness={5} color={PHOENIX.hot} opacity={(1 - p) * 0.3 * k} squash={1} rot={-14} />;
      })}
      <Sparks
        count={120}
        seed="blast"
        frame={frame}
        color={PHOENIX.mid}
        hot={PHOENIX.core}
        place={(i, r) => {
          const p = (frame * (0.02 + r('v') * 0.05) + r('p')) % 1;
          const off = (r('o') - 0.5) * width * 1.1;
          return {
            x: mix(j.hand[0], frontX, p) + (r('j') - 0.5) * 60,
            y: mix(j.hand[1], frontY, p) + off,
            size: 2 + r('s') * 6,
            opacity: (1 - Math.abs(off) / (width * 0.6)) * 0.9 * k,
            stretch: 3,
          };
        }}
      />
    </>
  );
};

/* =================================================================== *
 *  ACT VI — 0:27–0:30   The shield, the clash, the stare
 * =================================================================== */

export const ChaosShield: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.shieldUp, B.shieldUp + 14], [0, 1], easeOut);
  if (k <= 0.01) return null;
  const w = wandaState(frame);
  const strain = ip(frame, [B.clash, B.whiteout], [0, 1]);
  const cx = w.x + 190;
  const cy = w.y - 40;
  const R = 300 * k * (1 + strain * 0.12);
  const jitter = noise(frame * 1.6, 'shield') * 7 * strain;
  return (
    <>
      <svg style={{position: 'absolute', inset: 0, width: W, height: H, overflow: 'visible', mixBlendMode: 'screen'}}>
        <g transform={`translate(${cx + jitter},${cy}) scale(0.52,1)`} opacity={0.95}>
          <circle r={R} fill={WITCH.dark} opacity={0.5 + strain * 0.2} />
          {new Array(4).fill(0).map((_, i) => (
            <circle
              key={i}
              r={R * (1 - i * 0.19)}
              fill="none"
              stroke={i === 0 ? WITCH.hot : WITCH.mid}
              strokeWidth={(i === 0 ? 6 : 2.4) * (1 + strain)}
              opacity={0.4 + strain * 0.35}
              style={{filter: `blur(${i === 0 ? 3 : 6}px)`}}
            />
          ))}
          {/* the face taking the blast burns brightest */}
          <path
            d={`M0,${-R * 0.96} A${R},${R} 0 0 1 0,${R * 0.96}`}
            fill="none"
            stroke={WITCH.core}
            strokeWidth={7 + strain * 12}
            opacity={0.55 + strain * 0.45}
            style={{filter: `blur(${5 + strain * 8}px)`}}
          />
          {/* hex lattice */}
          {new Array(16).fill(0).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={Math.cos(a) * R * 0.16}
                y1={Math.sin(a) * R * 0.16}
                x2={Math.cos(a) * R}
                y2={Math.sin(a) * R}
                stroke={WITCH.mid}
                strokeWidth={2.2}
                opacity={0.3 + strain * 0.4}
              />
            );
          })}
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          left: cx - R * 0.55,
          top: cy - R,
          width: R * 1.1,
          height: R * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${WITCH.deep} 0%, rgba(176,2,39,0.25) 55%, rgba(0,0,0,0) 74%)`,
          mixBlendMode: 'screen',
          opacity: 0.55 + strain * 0.35,
        }}
      />
    </>
  );
};

export const Clash: React.FC<{frame: number}> = ({frame}) => {
  const k = ip(frame, [B.clash, B.clash + 12], [0, 1], easeOut);
  if (k <= 0.01) return null;
  const w = wandaState(frame);
  const push = Math.sin(frame * 0.22) * 34 + noise(frame * 0.9, 'push') * 18;
  const cx = w.x + 210 + push;
  const cy = w.y - 50;
  const grow = ip(frame, [B.clash, B.whiteout], [0, 1]);
  return (
    <>
      <Glow x={cx} y={cy} r={(120 + grow * 130) * k} pal={{...PHOENIX, core: '#ffffff'}} opacity={0.95 * k} hardness={0.85} />
      <Glow x={cx} y={cy} r={(300 + grow * 300) * k} pal={{core: PHOENIX.hot, hot: PHOENIX.mid, mid: WITCH.mid, deep: WITCH.deep, dark: '#000'}} opacity={0.5 * k} hardness={0.12} />
      {new Array(7).fill(0).map((_, i) => {
        const p = ((frame * 0.045 + i / 7) % 1);
        return (
          <Ring
            key={i}
            x={cx}
            y={cy}
            r={p * (760 + grow * 520)}
            thickness={12 * (1 - p) + 2}
            color={i % 2 ? PHOENIX.mid : WITCH.mid}
            opacity={(1 - p) * 0.4 * k}
            squash={0.72}
          />
        );
      })}
      {new Array(6).fill(0).map((_, i) => (
        <Bolt
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos((i / 6) * 6.28 + frame * 0.05) * (420 + grow * 260)}
          y2={cy + Math.sin((i / 6) * 6.28 + frame * 0.05) * (300 + grow * 200)}
          seed={`clash${i}`}
          frame={frame}
          amp={50}
          width={3}
          color={i % 2 ? PHOENIX.hot : WITCH.hot}
          glow={i % 2 ? PHOENIX.deep : WITCH.deep}
          opacity={k * 0.6}
        />
      ))}
      <Sparks
        count={170}
        seed="clashSpark"
        frame={frame}
        color={PHOENIX.hot}
        hot="#ffffff"
        place={(i, r) => {
          const life = (frame * (0.03 + r('v') * 0.05) + r('p')) % 1;
          const a = r('a') * Math.PI * 2;
          const sp = (200 + r('r') * 900) * life;
          return {
            x: cx + Math.cos(a) * sp,
            y: cy + Math.sin(a) * sp * 0.75 - life * 60,
            size: 2 + r('s') * 6,
            opacity: (1 - life) * 0.95 * k,
            stretch: 2.6,
            rot: (a * 180) / Math.PI,
          };
        }}
      />
      {/* the ground giving up under the contact point */}
      <Glow x={cx} y={GROUND} r={(240 + grow * 300) * k} pal={{core: PHOENIX.hot, hot: PHOENIX.mid, mid: WITCH.mid, deep: WITCH.dark, dark: '#000'}} opacity={0.45 * k} ay={0.2} hardness={0.15} />
    </>
  );
};
