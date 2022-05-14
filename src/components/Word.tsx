import React, { useState, useEffect } from 'react';
import { Word } from '../karaokeText';
import { Text } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';

type Props = {
  word: Word;
  start: number;
};

const Word = ({ word, start }: Props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setActive(true);
    }, start);

    return () => {
      clearTimeout(startTimer);
    };
  }, []);

  return <Text color={active ? 'red' : 'green'}>{word.asString + ' '}</Text>;
};

export default Word;
