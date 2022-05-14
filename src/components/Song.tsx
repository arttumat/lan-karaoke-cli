import React from 'react';
import { Box } from 'ink';
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
        const nextLineEnd = lineArray[i + 2] ? lineArray[i + 2].start : line.end;

        const end = line.end + 3000 < nextLineEnd ? line.end + 3000 : nextLineEnd;

        return (
          <Line key={line.start + 'line'} line={line} start={line.start} end={end} delay={2000} />
        );
      })}
    </Box>
  );
};

export default Song;
