import React from 'react';
import { Box, Text } from 'ink';

import { prepareSong } from '../karaokeText';
import Song from './Song';

interface NowPlayingProps {
  songJson: any;
}

const NowPlaying = ({ songJson }: NowPlayingProps) => {
  const song = prepareSong(songJson);

  return (
    <Box flexDirection="column">
      <Text color="red">{`Currently playing: ${song.title}, by ${song.artist}`}</Text>
      <Box alignItems="center" justifyContent="center" height="100%" width="100%">
        <Song song={song} />
      </Box>
    </Box>
  );
};

export default NowPlaying;
