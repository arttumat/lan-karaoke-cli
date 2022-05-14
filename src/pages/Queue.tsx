import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import figlet from 'figlet';
import chalk from 'chalk';
import * as fs from 'fs';

import { useQueue } from '../context/queue';
import { playFile, midi2wav } from '../lib/helpers';
import NowPlaying from '../components/NowPlaying';

const Queue = () => {
  const { queue } = useQueue();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyrics, setCurrentLyrics] = useState<object | null>(null);
  const [performerName, setPerformerName] = useState('');

  useInput((input, key) => {
    if (key.delete) {
      // Get lyrics from json
      const lyricsJsonString = fs.readFileSync(queue[0].jsonFilePath, 'utf8');
      const lyricsJson = JSON.parse(lyricsJsonString);
      setCurrentLyrics(lyricsJson);
      setPerformerName(queue[0].performerName);

      playFile(queue[0].jsonFilePath, () => {
        setIsPlaying(true);
      });
    }
  });

  if (!isPlaying && currentLyrics) {
    return (
      <Box alignItems="center" justifyContent="center">
        <Text>{figlet.textSync('Loading...', '4Max')}</Text>
      </Box>
    );
  }

  if (isPlaying) {
    return <NowPlaying songJson={currentLyrics} performerName={performerName} />;
  }

  return (
    <Box flexDirection="column">
      <Text>
        {chalk.cyan(
          figlet.textSync(
            queue.length > 0 ? `Next 5 in queue, total ${queue.length}` : 'No queue',
            'Thin',
          ),
        )}
      </Text>
      <Box flexDirection="column">
        {queue.slice(0, 5).map((item, index) => (
          <Box
            key={item.performerName}
            flexDirection="row"
            borderColor="green"
            borderStyle="single"
            padding={1}
          >
            <Text bold>{index + 1}. </Text>
            <Text>
              {item.performerName} - {item.songName}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Queue;
