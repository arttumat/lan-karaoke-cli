import React, { useState, useEffect } from 'react';
import { Box } from 'ink';
import BigText from 'ink-big-text';

type Props = {
  words: {
    word: string;
    start: number;
  }[];
  currentTime: number;
};

const AnimatedLine = ({ words, currentTime }: Props) => {
  const startTimes = words.map((w) => w.start);
  const [doned, setDoned] = useState<number>(0);

  useEffect(() => {
    const asd = startTimes.filter((time) => time < currentTime);
    setDoned(asd.length);
  }, [currentTime]);

  return (
    <Box flexDirection="row">
      {words.map(({ word }, i) => {
        const bgColor = doned - 1 <= i ? 'red' : 'black';
        return <BigText backgroundColor={bgColor} text={word} />;
      })}
    </Box>
  );
};

export default AnimatedLine;
