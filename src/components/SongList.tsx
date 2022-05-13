import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import React, { useState } from 'react';
import { useQueue } from '../context/queue';
import { getMetadata } from '../lib/helpers';

interface Item {
  label: string;
  value: string;
}

interface SongListProps {
  onFinish: () => void;
}

const SongList = (props: SongListProps) => {
  const songs = getMetadata();
  const { queue, addToQueue } = useQueue();

  const [performerName, setPerformerName] = useState<string>('');
  const [selectedSong, setSelectedSong] = useState<Item | null>(null);

  const selectItems: Item[] = songs.map((song) => {
    return {
      label: `${song.lyrics.meta.name} - ${song.lyrics.meta.artists[0]}`,
      value: song.filePath,
    };
  });

  const handleSelect = (item: Item) => {
    setSelectedSong(item);
  };

  useInput((input, key) => {
    if (key.return && selectedSong && performerName) {
      addToQueue({ performerName });
      setSelectedSong(null);
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
