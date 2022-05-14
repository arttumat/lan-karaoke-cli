import * as fs from 'fs';
import * as glob from 'glob';
import player from 'node-wav-player';
import path from 'path';
import * as synth from 'synth-js';

// directory path
const songsDir = path.join(__dirname, '../../assets/');

export const midi2wav = (midiFilePath: string): string => {
  const midi = fs.readFileSync(midiFilePath);
  const wav = synth.midiToWav(midi).toBuffer();
  const returnFilePath = midiFilePath.replace('.mid', '.wav');
  fs.writeFileSync(returnFilePath, wav, { encoding: 'binary' });
  return returnFilePath;
};

export const playFile = (filePath: string, callback: () => void): void => {
  player
    .play({
      path: filePath.replace('.mid', '.wav'),
    })
    .then(() => {
      // Do something after the sound has started playing
      callback();
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export const stop = (): void => {
  player.stop();
};

export const getMetadata = (): any[] => {
  const res = glob.sync(`${songsDir}/*.json`);
  const metadataObjects = res.map((filePath: string) => {
    const metadata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    metadata.filePath = filePath.replace('.json', '.mid');
    return metadata;
  });
  return metadataObjects;
};
