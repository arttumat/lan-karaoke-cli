var player = require("play-sound")((opts = {}));

const song = "kukkuu";

const { lyrics } = require(`./${song}.json`);
const { lines } = lyrics.singers[0];

lines.forEach(({ words }) => {
  words.map(({ syllables }) => {
    const word = syllables.map(({ text }) => text).join("");
    const { start } = syllables[0];
    const offset = 2000;

    setTimeout(() => console.log(word), start-offset);
  });
});

player.play(`${song}.mp3`, function (err) {
  if (err) throw err;
});
