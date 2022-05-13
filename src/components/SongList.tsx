import { Box } from 'ink';
import SelectInput from 'ink-select-input';
import React from 'react';
import { getFileNames } from '../lib/helpers';

interface Item {
  label: string;
  value: string;
}

const SongList = () => {
  const songs = getFileNames();
  const selectItems: Item[] = songs.map((song) => {
    return {
      label: song.split('assets/')[1].split('.')[0],
      value: song,
    };
  });

  const handleSelect = (item: Item) => {
    console.log('kukkuu');
  };

  return (
    <Box>
      <SelectInput items={selectItems} onSelect={handleSelect} />
    </Box>
  );
};

export default SongList;
