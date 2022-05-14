import React, { useEffect, useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { Line } from '../karaokeText';

type Props = {
  line: Line;
  start: number;
  end: number;
  fade: number;
};

const Line = ({ line, start, end, fade }: Props) => {
  const [displayLine, setDisplayLine] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setDisplayLine(true);
    }, start);

    const endTimer = setTimeout(() => {
      setDisplayLine(false);
    }, end);

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, fade);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  return displayLine ? (
    <Text>
      <Text color={fadeOut ? 'gray' : 'green'}>{line.asString}</Text>
      <Newline />
    </Text>
  ) : null;
};

export default Line;
