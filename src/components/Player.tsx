import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import Song from './Song';
import { prepareSong } from '../karaokeText';

const song = prepareSong(null);

const Player = () => {
  const [counter, setCounter] = useState(0);
  const [index, setIndex] = useState<number>(0);
  const lineEnds = song.lines.map((line) => line.end / 10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const i = lineEnds.filter((time) => time <= counter).length;
    setIndex(i);
  }, [counter]);

  return (
    <Box flexDirection="column">
      <Text color="green">{chalk.green(figlet.textSync('Kalle'))}</Text>
      <Text color="red">{`Currently playing: ${song.title}, by ${song.artist}`}</Text>
      <Song song={song} />
    </Box>
  );
};

export default Player;
