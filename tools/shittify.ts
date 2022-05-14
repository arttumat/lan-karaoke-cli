const spawn = require('child_process').spawn;
import * as glob from 'glob';
import path from 'path';

const songsDir = path.join(__dirname, '../assets/');

const convert = async (mp3filePath: string): Promise<void> => {
  const child = spawn('ffmpeg', [
    '-i',
    mp3filePath,
    // '-ar',
    // '8000',
    // '-ac',
    // '1',
    // '-acodec',
    // 'pcm_u8',
    mp3filePath.replace('.mp3', '.wav'),
  ]);

  await new Promise((resolve, reject) => {
    child.on('close', resolve);
  });
};

const files = glob.sync(`${songsDir}/*.mp3`);

files.forEach(async (filePath: string) => {
  await convert(filePath);
});
