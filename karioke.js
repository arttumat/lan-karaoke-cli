var player = require("play-sound")((opts = {}));

const song = "kukkuu";

const { lyrics } = require(`./${song}.json`);
const { lines } = lyrics.singers[0];

lines.map(({ words }) => {
  words.map(({ syllables }) => {
    const word = syllables.map(({ text }) => text).join("");
    const { start } = syllables[0];

    setTimeout(() => console.log(word), start);
  });
});

player.play("kukkuu.mp3", function (err) {
  if (err) throw err;
});
