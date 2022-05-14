import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { Song } from '../karaokeText';
import Line from './Line';

type Props = {
  song: Song;
};

const Song = ({ song }: Props) => {
  const { lines } = song;

  return (
    <Box flexDirection="column" justifyContent="center" width="100%">
      {lines.map((line, i, lineArray) => {
        return (
          <Line
            key={line.start + 'line'}
            line={line}
            start={line.start}
            end={line.end + 3000}
            delay={2000}
            // fade={lineArray[i + 2] ? lineArray[i + 2].start : line.end}
          />
        );
      })}
    </Box>
  );
};

export default Song;
