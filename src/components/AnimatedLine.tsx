import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
// import BigText from 'ink-big-text';

import { Line } from '../karaokeText';

type Props = {
  line: Line;
  currentTime: number;
};

const AnimatedLine = ({ line, currentTime }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const startTimes = line.words.map((w) => Math.floor(w.start / 100));
  useEffect(() => {
    const i = startTimes.filter((time) => time < currentTime).length;
    setIndex(i);
  }, [currentTime]);

  return (
    <Box flexDirection="row">
      {line.words.map(({ asString }, i) => {
        const color = i < index ? 'red' : 'green';
        return <Text color={color}>{`${asString} `}</Text>;
      })}
    </Box>
  );
};
export default AnimatedLine;
