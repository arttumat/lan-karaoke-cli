import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';

import { getFileNames } from '../lib/helpers';
import { useQueue } from '../context/queue';

interface Item {
  label: string;
  value: string;
}

interface SongListProps {
  onFinish: () => void;
}

const SongList = (props: SongListProps) => {
  const songs = getFileNames();
  const { queue, addToQueue } = useQueue();

  const [performerName, setPerformerName] = useState<string>('');
  const [selectedSong, setSelectedSong] = useState<string>('');

  const selectItems: Item[] = songs.map((song) => {
    return {
      label: song.split('assets/')[1].split('.')[0],
      value: song,
    };
  });

  const handleSelect = (item: Item) => {
    setSelectedSong(item.value);
  };

  useInput((input, key) => {
    if (key.return && selectedSong && performerName) {
      addToQueue({ performerName });
      setSelectedSong('');
      setPerformerName('');
      props.onFinish();
    }
  });

  if (!selectedSong) {
    return (
      <Box>
        <SelectInput items={selectItems} onSelect={handleSelect} />
      </Box>
    );
  }

  return (
    <Box>
      <Box marginRight={1}>
        <Text>Enter your name:</Text>
      </Box>
      <TextInput value={performerName} onChange={setPerformerName} />
    </Box>
  );
};

export default SongList;
