import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(17);
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');

// Sandboxes without egress to Remotion's Chromium mirror can point at a local
// Chrome/Chromium build instead:  CHROMIUM_PATH=/path/to/chrome npm run render
if (process.env.CHROMIUM_PATH) {
  Config.setBrowserExecutable(process.env.CHROMIUM_PATH);
}
