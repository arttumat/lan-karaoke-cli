import { Box } from 'ink';
import React from 'react';
import SongList from '../components/SongList';

interface AddSongsProps {
  onFinish: () => void;
}

const AddSongs = (props: AddSongsProps) => {
  return (
    <Box>
      <SongList onFinish={props.onFinish} />
    </Box>
  );
};

export default AddSongs;
