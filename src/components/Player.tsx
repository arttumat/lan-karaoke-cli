import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import Song from './Song';
import { prepareSong } from '../karaokeText';

const song = prepareSong(null);

const Player = () => {
  return (
    <Box flexDirection="column">
      <Text>
        <Text color="red">{`Currently playing: ${song.title}, by ${song.artist}`}</Text>
        <Newline />
        <Newline />
        <Song song={song} />
      </Text>
    </Box>
  );
};

export default Player;
