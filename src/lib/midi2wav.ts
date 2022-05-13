import * as fs from 'fs';
import * as synth from 'synth-js';

const midi2wav = (midiFilePath: string): string => {
  const midi = fs.readFileSync(midiFilePath);
  const wav = synth.midiToWav(midi).toBuffer();
  const returnFilePath = midiFilePath.replace('.mid', '.wav');
  fs.writeFileSync(returnFilePath, wav, { encoding: 'binary' });
  return returnFilePath;
};

export default midi2wav;
