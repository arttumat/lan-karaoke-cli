import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { Song } from '../karaokeText';
import Line from './Line';

type Props = {
  song: Song;
};

const Song = ({ song }: Props) => {
  return (
    <Box flexDirection="row">
      <Text>
        {song.lines.map((line, i, lineArray) => {
          return (
            <Line
              line={line}
              start={line.start}
              end={lineArray[i + 2] ? lineArray[i + 2].end : line.end}
              fade={lineArray[i + 2] ? lineArray[i + 2].start : line.end}
            />
          );
        })}
      </Text>
    </Box>
  );
};

export default Song;
