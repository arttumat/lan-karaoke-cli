import React, { useState, useEffect } from 'react';
import { Word } from '../karaokeText';
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

  return active ? (
    <Gradient name="rainbow">
      <BigText text={`${word.asString} `} />
    </Gradient>
  ) : (
    <BigText text={`${word.asString} `} />
  );
};

export default Word;
