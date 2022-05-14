import React, { useEffect, useState } from 'react';
import { render, Box, Text } from 'ink';

import AnimatedLine from './AnimatedLine';
import { prepareSong } from '../karaokeText';

interface NowPlayingProps {
  songJson: any;
}

const NowPlaying = ({ songJson }: NowPlayingProps) => {
  const [counter, setCounter] = useState(0);
  const [index, setIndex] = useState<number>(0);

  const song = prepareSong(songJson);

  const lineEnds = song.lines.map((line) => line.end / 50);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1);
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const i = lineEnds.filter((time) => time <= counter).length;
    setIndex(i);
  }, [counter]);

  return (
    <Box flexDirection="column">
      <Text color="red">{`Currently playing: ${song.title}, by ${song.artist}`}</Text>
      <Box alignItems="center" justifyContent="center" height="100%" width="100%">
        <AnimatedLine line={song.lines[index]} currentTime={counter} />
      </Box>
    </Box>
  );
};

export default NowPlaying;
