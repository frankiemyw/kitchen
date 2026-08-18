import React from 'react';
import {Composition} from 'remotion';
import {Scene} from './Scene';
import {DURATION, FPS, W, H} from './lib';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="PhoenixVsWitch"
    component={Scene}
    durationInFrames={DURATION}
    fps={FPS}
    width={W}
    height={H}
  />
);
