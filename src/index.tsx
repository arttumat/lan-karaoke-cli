#!/usr/bin/env node
import React, { useEffect, useState } from 'react';
import { render, Box, Text } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import FullScreen from './components/FullScreen';

const argv = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string' },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box flexDirection="column">
      <Text>{chalk.yellowBright(figlet.textSync(counter.toString()))}</Text>
      <Text color="green">{chalk.green(figlet.textSync('LAN Karaoke CLI'))}</Text>
      <Text color="red">Arguments: {JSON.stringify(argv, null, 2)}</Text>
    </Box>
  );
};

const App = () => (
  <FullScreen>
    <Counter />
  </FullScreen>
);

render(<App />);
