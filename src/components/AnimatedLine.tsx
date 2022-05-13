import React, { useState, useEffect } from 'react';
import { Box } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import { Line } from '../karaokeText';

type Props = {
  line: Line;
  currentTime: number;
};

const AnimatedLine = ({ line, currentTime }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const startTimes = line.words.map((w) => Math.floor(w.start / 10));
  useEffect(() => {
    const i = startTimes.filter((time) => time < currentTime).length;
    setIndex(i);
  }, [currentTime]);

  return (
    <Box flexDirection="row">
      {line.words.map(({ asString }, i) => {
        const done = i < index;
        return done ? (
          <Gradient name="rainbow">
            <BigText text={`${asString} `} />
          </Gradient>
        ) : (
          <BigText text={`${asString} `} />
        );
      })}
    </Box>
  );
};
export default AnimatedLine;
