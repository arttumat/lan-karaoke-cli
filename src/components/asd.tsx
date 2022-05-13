#!/usr/bin/env node
import React, { useEffect, useState } from 'react';
import { render, Box, Text } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import FullScreen from './FullScreen';
import AnimatedLine from './AnimatedLine';
import { prepareSong } from '../karaokeText';

const argv = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string' },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

const song = prepareSong(null);

const Counter = () => {
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
      <AnimatedLine line={song.lines[index]} currentTime={counter} />
    </Box>
  );
};

export default Counter;
