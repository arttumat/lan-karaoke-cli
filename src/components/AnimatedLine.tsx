import React, { useState, useEffect } from 'react';
import { Box } from 'ink';
import BigText from 'ink-big-text';

import { Line } from '../karaokeText';

type Props = {
  line: Line;
  currentTime: number;
};

const AnimatedLine = ({ line, currentTime }: Props) => {
  const startTimes = line.words.map((w) => w.start);
  const [doned, setDoned] = useState<number>(0);

  useEffect(() => {
    const asd = startTimes.filter((time) => time < currentTime);
    setDoned(asd.length);
  }, [currentTime]);

  return (
    <Box flexDirection="row">
      {line.words.map(({ asString }, i) => {
        const bgColor = doned - 1 <= i ? 'red' : 'black';
        return <BigText backgroundColor={bgColor} text={asString} />;
      })}
    </Box>
  );
};

export default AnimatedLine;
