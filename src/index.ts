#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import { midi2wav, playFile } from './lib/midi2wav';

const argv = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string' },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

console.info(argv);

console.info(chalk.green('Green text'));

console.log(chalk.green(figlet.textSync('LAN Karaoke CLI')));

const wavPath = midi2wav('./src/assets/rick.mid');

playFile(wavPath);
