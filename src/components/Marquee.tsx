import React, { useEffect, useState } from 'react';
import { Text } from 'ink';

// Doesn't work bu I tried

interface MarqueeProps {
  text: string;
  width?: number;
  direction?: 'ltr' | 'rtl';
  speed?: number;
  repeat?: boolean;
  color?: 'red' | 'green' | 'blue' | 'magenta' | 'cyan' | 'yellow' | 'white';
}

const Marquee = ({
  text,
  width = process.stdout.columns,
  direction = 'rtl',
  speed = 500,
  repeat = true,
  color = 'green',
}: MarqueeProps) => {
  const [chars, setChars] = useState('');
  const [pos, setPos] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    updateChars();
    startTimer();

    return () => {
      clearTimer();
    };
  }, []);

  const updateChars = () => {
    let tmp;
    if (pos < width) {
      tmp = ' '.repeat(width - pos) + text;
    } else {
      tmp = text.slice(pos - width, width + pos);
    }
    tmp = tmp.slice(0, width).padEnd(width, ' ');

    const chars = direction === 'ltr' ? tmp.split('').reverse().join('') : tmp;

    setChars(chars);
    setPos((prevPos) => prevPos + 1);

    if (pos >= width + text.length) {
      clearTimer();

      if (repeat) startTimer();
    }
  };

  const startTimer = () => {
    const interval = setInterval(updateChars, speed);
    setTimer(interval);
  };

  const clearTimer = () => {
    if (!timer) return;
    clearInterval(timer);
    setTimer(null);
  };

  const style = { [color]: true };
  return <Text {...style}>{chars}</Text>;
};

export default Marquee;
