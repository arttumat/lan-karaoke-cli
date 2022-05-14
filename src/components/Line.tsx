import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { Line } from '../karaokeText';
import Word from './Word';

type Props = {
  line: Line;
  start: number;
  end: number;
  delay: number;
};

const Line = ({ line, start, end, delay }: Props) => {
  const [displayLine, setDisplayLine] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setDisplayLine(true);
    }, start - delay);

    const endTimer = setTimeout(() => {
      setDisplayLine(false);
    }, end);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, []);
  return displayLine ? (
    <Box flexDirection="row" alignItems="center" justifyContent="center" width="100%">
      {line.words.map((word) => {
        return (
          <Word key={word.start + 'word'} word={word} start={word.start - line.start + delay} />
        );
      })}
      <Newline />
    </Box>
  ) : null;
};

export default Line;
