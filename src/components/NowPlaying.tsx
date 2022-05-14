import React from 'react';
import { Box, Text } from 'ink';

import { prepareSong } from '../karaokeText';
import Song from './Song';
import { useQueue } from '../context/queue';

interface NowPlayingProps {
  songJson: any;
  performerName: string;
}

const NowPlaying = ({ songJson, performerName }: NowPlayingProps) => {
  const song = prepareSong(songJson);
  const { queue } = useQueue();

  return (
    <Box flexDirection="column">
      <Text color="greenBright">{`${performerName} is singing: ${song.title}, by ${song.artist}`}</Text>
      <Box alignItems="center" justifyContent="center" height="100%" width="100%">
        <Song song={song} />
      </Box>
      <Text color="yellowBright">
        Next:{' '}
        {queue
          .slice(0, 5)
          .map((item) => `${item.performerName} - ${item.songName}`)
          .join(' \\,,/ ')}
      </Text>
    </Box>
  );
};

export default NowPlaying;
