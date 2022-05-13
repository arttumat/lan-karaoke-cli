import * as fs from 'fs';
import * as synth from 'synth-js';
const player = require('node-wav-player');

export const midi2wav = (midiFilePath: string): string => {
  const midi = fs.readFileSync(midiFilePath);
  const wav = synth.midiToWav(midi).toBuffer();
  const returnFilePath = midiFilePath.replace('.mid', '.wav');
  fs.writeFileSync(returnFilePath, wav, { encoding: 'binary' });
  return returnFilePath;
};

export const playFile = (filePath: string): void => {
  player
    .play({
      path: filePath,
    })
    .then(() => {
      console.log('The wav file started to be played successfully.');
    })
    .catch((error: any) => {
      console.error(error);
    });
};
