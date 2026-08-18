import React from 'react';
import {AbsoluteFill, useCurrentFrame, random} from 'remotion';
import {B, W, H, ip, clamp, hit, cameraAt, shake, CUTS, PHOENIX, WITCH, easeOut} from './lib';
import {World} from './world';
import {Jean, Wanda} from './cast';
import {
  GroundCracks,
  WandaCharge,
  ChaosWave,
  TelekineticCatch,
  SphereReturn,
  RubbleWalls,
  Barrage,
  PhoenixTrail,
  Embers,
  ConcreteHurl,
  WitchAura,
} from './acts';
import {
  RealityWarp,
  Teleport,
  TeleportStrike,
  PhoenixWings,
  DarkPhoenixCorona,
  PhoenixBlast,
  ChaosShield,
  Clash,
} from './acts2';
import {CloseUp} from './closeup';
import {Flash} from './fx';

/* Film grain, generated once by the browser and merely offset per frame. */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)'/></svg>\")";

const Grade: React.FC<{frame: number}> = ({frame}) => {
  const heat = ip(frame, [B.phoenixTurn, B.phoenixBlast], [0, 1]);
  return (
    <>
      {/* bloom haze */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 46%, rgba(255,150,70,${0.05 + heat * 0.1}) 0%, rgba(120,10,40,0.05) 48%, rgba(0,0,0,0) 72%)`,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.82) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* cool/warm edge separation, a cheap stand-in for lens dispersion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(40,90,255,0.07) 0%, rgba(0,0,0,0) 14%, rgba(0,0,0,0) 86%, rgba(255,60,40,0.07) 100%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
      {/* grain */}
      <div
        style={{
          position: 'absolute',
          inset: -260,
          backgroundImage: GRAIN,
          backgroundPosition: `${Math.round(random(`gx${frame}`) * 240)}px ${Math.round(
            random(`gy${frame}`) * 240
          )}px`,
          opacity: 0.055,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

export const Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = cameraAt(frame);
  const sh = shake(frame);

  /* Every hard cut is covered by a one-beat flash + smear. */
  let cutFlash = 0;
  let cutBlur = 0;
  for (const c of CUTS) {
    cutFlash += hit(frame, c - 1, 7, 0.5);
    cutBlur += hit(frame, c - 1, 5, 7);
  }

  const whiteout =
    ip(frame, [B.whiteout - 10, B.whiteout], [0, 1], easeOut) *
    ip(frame, [B.whiteout, B.closeUp + 12], [1, 0]);

  /* Impact flashes that wash the whole frame. */
  const flash =
    hit(frame, B.waveCaught, 12, 0.45) +
    hit(frame, B.wandaHit, 16, 0.6) +
    hit(frame, B.wandaStrike + 2, 18, 0.65) +
    hit(frame, B.wingsOpen, 22, 0.3) +
    hit(frame, B.phoenixBlast, 20, 0.42) +
    hit(frame, B.clash, 18, 0.45);

  const stageOut = ip(frame, [B.closeUp - 6, B.closeUp + 10], [1, 0]);

  return (
    <AbsoluteFill style={{backgroundColor: '#01030a', overflow: 'hidden'}}>
      {stageOut > 0.004 ? (
        <AbsoluteFill
          style={{
            transformOrigin: '50% 50%',
            transform: `rotate(${cam.r + sh.r}deg) scale(${cam.z}) translate(${
              -cam.x / cam.z + sh.x
            }px, ${-cam.y / cam.z + sh.y}px)`,
            filter: cutBlur > 0.05 ? `blur(${cutBlur}px)` : undefined,
            opacity: stageOut,
          }}
        >
          <World frame={frame} cam={cam} />

          <GroundCracks frame={frame} />
          <PhoenixTrail frame={frame} />
          <PhoenixWings frame={frame} />
          <DarkPhoenixCorona frame={frame} />

          <WitchAura frame={frame} />

          <RubbleWalls frame={frame} />
          <ConcreteHurl frame={frame} />
          <PhoenixBlast frame={frame} />

          <Wanda frame={frame} />
          <Jean frame={frame} />

          <WandaCharge frame={frame} />
          <ChaosWave frame={frame} />
          <TelekineticCatch frame={frame} />
          <SphereReturn frame={frame} />
          <Barrage frame={frame} />

          <RealityWarp frame={frame} />
          <Teleport frame={frame} />
          <TeleportStrike frame={frame} />

          <Embers frame={frame} />
          <ChaosShield frame={frame} />
          <Clash frame={frame} />
        </AbsoluteFill>
      ) : null}

      <CloseUp frame={frame} />

      <Grade frame={frame} />
      <Flash color={PHOENIX.core} opacity={clamp(flash + cutFlash, 0, 0.9)} />
      <Flash color="#ffffff" opacity={whiteout} blend="normal" />
    </AbsoluteFill>
  );
};
