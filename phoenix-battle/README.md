# Dark Phoenix vs. Scarlet Witch

A 30-second cinematic superhero battle, rendered programmatically with
[Remotion](https://remotion.dev). 1920×1080, 30fps, 900 frames, silent.

Jean Grey as the Dark Phoenix fights Wanda Maximoff as the Scarlet Witch across a
ruined city at night. Neither wins.

## The visual language

Remotion renders React in a headless browser, so photoreal humans are off the
table. Instead both characters are **backlit silhouettes** — solid black bodies
rimmed by their own energy, Jean in crimson-and-orange Phoenix fire and Wanda in
deep red chaos magic. Everything else is real cinematography: parallax camera
moves, hard cuts hidden under flash frames, impact-driven screen shake,
volumetric haze, ember fields, and a film-grain grade.

## Beat sheet

| Time | Frames | Beat |
|---|---|---|
| 0:00–0:05 | 0–150 | Wide establishing shot. Debris hangs in the air, the ground begins to shake, Wanda launches a wave of chaos magic. |
| 0:05–0:10 | 150–300 | Jean stops it dead with one hand, compresses it into a sphere, and hurls it back — driving Wanda through three walls of rubble. |
| 0:10–0:17 | 300–510 | Wanda's barrage. Jean weaves between the blasts at speed, trailing fire, then rips slabs of the street up and throws them. |
| 0:17–0:23 | 510–690 | Wanda unmakes the slabs mid-air, folds out of reality, and reappears behind Jean to strike her point-blank. |
| 0:23–0:27 | 690–810 | Jean loses control. Wings of cosmic fire open behind her and the battlefield lights up. |
| 0:27–0:30 | 810–900 | Wanda's shield takes the blast. The clash whites out the frame, then holds on the two of them staring through the storm. |

## Layout

| File | What lives there |
|---|---|
| `src/lib.ts` | Beat sheet, easing/noise helpers, camera shot list, screen shake, palettes |
| `src/figure.tsx` | Skeletal rig — poses are joint angles; renders as a rim-lit silhouette |
| `src/cast.tsx` | Both characters' full 30-second blocking and performance as keyframe tracks |
| `src/world.tsx` | Procedural ruined skyline, ground, suspended debris, dust, light shafts |
| `src/fx.tsx` | Energy primitives: glows, beams, rings, bolts, particle fields, vortices, warps |
| `src/acts.tsx` | Acts I–III effects |
| `src/acts2.tsx` | Acts IV–VI effects, including the Phoenix wings |
| `src/closeup.tsx` | The closing two-profile shot |
| `src/Scene.tsx` | Layer order, camera transform, cut flashes, colour grade |

Nothing is imported from disk — every frame is drawn from code, so the whole
piece is deterministic and scrubbable.

## Running it

```bash
npm install
npm run studio          # live editor at localhost:3000
npm run render          # -> out/phoenix-vs-scarlet-witch.mp4
```

If the sandbox has no egress to Remotion's Chromium mirror, point at a local
Chrome build instead:

```bash
CHROMIUM_PATH=/path/to/chrome npm run render
```

## Tuning

Retiming is the cheapest edit: every beat is a frame number in the `B` object in
`src/lib.ts`, and the camera is a flat list of shots in `SHOTS` just below it.
Character motion is keyframe tracks in `src/cast.tsx` — add or move a `{f, v}`
entry and everything anchored to that character (hand glows, beams, trails)
follows, because effects read joint positions from the rig rather than
hard-coded coordinates.
