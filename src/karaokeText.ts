import fallbackSong from './kukkuu.json';

interface Song {
  lines: Line[];
  start: number;
  end: number;
}

interface Line {
  asString: string;
  words: Word[];
  start: number;
  end: number;
}

interface Word {
  asString: string;
  syllables: Syllable[];
  start: number;
  end: number;
}

interface Syllable {
  text: string;
  start: number;
  end: number;
}

/**
 * Prepares a song object
 * @param songJson in format from singa
 * @returns
 */
export function prepareSong(songJson: any): Song {
  const { lyrics } = songJson ? songJson : fallbackSong;
  const song: Song = {
    lines: createLines(lyrics.singers[0].lines),
    start: lyrics.meta.start,
    end: lyrics.meta.end,
  };

  return song;
  /*
  This shit is for testing
  const { lines } = song;

  lines.map((line) => {
    const { start } = line;

    setTimeout(() => console.log(line.asString), start);
  });

  
  lines.map(({ words }: { words: any }) => {
    words.map(({ syllables }: { syllables: any }) => {
      const word = syllables.map(({ text }: { text: any }) => text).join('');
      const { start } = syllables[0];

      setTimeout(() => console.log(word), start);
    });
  });
  */
}

function createLines(linesJson: any[]): Line[] {
  const lines: Line[] = [];

  linesJson.forEach((lineJson) => {
    const words: Word[] = createWords(lineJson.words);
    const line: Line = {
      asString: words.map((word: Word) => word.asString).join(' '),
      words: words,
      start: findStart(lineJson.words),
      end: findEnd(lineJson.words),
    };
    lines.push(line);
  });

  return lines;
}

function createWords(wordsJson: any[]): Word[] {
  const words: Word[] = [];

  wordsJson.forEach((wordJson) => {
    const syllables: Syllable[] = createSyllables(wordJson.syllables);
    const word: Word = {
      asString: syllables.map((syllable: Syllable) => syllable.text).join(''),
      syllables: syllables,
      start: findStart(wordJson.syllables),
      end: findEnd(wordJson.syllables),
    };
    words.push(word);
  });

  return words;
}

function createSyllables(syllablesJson: any[]): Syllable[] {
  return syllablesJson.map((syllableJson: any) => {
    return {
      text: syllableJson.text,
      end: syllableJson.end,
      start: syllableJson.start,
    };
  });
}

function findStart(timingArray: any[]): number {
  return findTiming(timingArray, true);
}

function findEnd(timingArray: any[]): number {
  return findTiming(timingArray, false);
}

function findTiming(timingArray: any[], isStart: boolean): number {
  const index = isStart ? 0 : timingArray.length - 1;
  const timingKey = isStart ? 'start' : 'end';
  const item = timingArray[index];

  for (let key in item) {
    const value = item[key];

    if (key === timingKey) {
      return value;
    }

    if (Array.isArray(value)) {
      return findTiming(value, isStart);
    }
  }

  return -1;
}
