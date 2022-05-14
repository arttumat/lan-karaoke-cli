import * as fs from 'fs';
import path from 'path';
import axios from 'axios';

require('dotenv').config();

const bearerToken = process.env.BEARER_TOKEN;

const assetsPath = path.join(__dirname, '../assets');

import songs from '../song-list.json';

const main = async () => {
  const promises = songs.map(async (songItem) => {
    const { name, song, variant } = songItem;

    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all([downloadFile(name, song, variant), downloadLyrics(name, song, variant)]);
        console.log(`${name} downloaded`);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  });

  await Promise.all(promises);
  console.log('done');
};

async function downloadLyrics(name: string, song: string, variant: string) {
  try {
    const response = await axios.get(
      `https://api.singa.com/v1.4/songs/${song}/variants/${variant}/lyrics`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          Accept: 'application/json',
        },
      },
    );

    fs.writeFileSync(`${assetsPath}/${name}.json`, JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

async function downloadFile(name: string, song: string, variant: string) {
  const writer = fs.createWriteStream(`${assetsPath}/${name}.mp3`);

  const response = await axios.get(
    `https://api.singa.com/v1.4/songs/${song}/variants/${variant}/audio/?pitch=0`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        Accept: 'application/json, text/plain, */*',
      },
    },
  );

  const mp3url = response.data.results[0].file;

  return axios({
    method: 'get',
    url: mp3url,
    responseType: 'stream',
  }).then((response) => {
    //ensure that the user can call `then()` only when the file has
    //been downloaded entirely.

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error: Error | null = null;
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}

main();
