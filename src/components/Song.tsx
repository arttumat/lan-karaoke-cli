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
    <Text>
      {lines.map((line, i, lineArray) => {
        return (
          <Line
            key={line.start + 'line'}
            line={line}
            start={line.start}
            end={lineArray[i + 2] ? lineArray[i + 2].end : line.end}
            delay={2000}
            // fade={lineArray[i + 2] ? lineArray[i + 2].start : line.end}
          />
        );
      })}
    </Text>
  );
};

export default Song;
