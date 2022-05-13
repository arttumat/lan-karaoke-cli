const { lyrics } = require("./kukkuu.json");
const { lines } = lyrics.singers[0];

lines.map(({ words }) => {
  words.map(({ syllables }) => {
    const word = syllables.map(({ text }) => text).join("");
    const { start } = syllables[0];

    setTimeout(() => console.log(word), start);
  });
});
