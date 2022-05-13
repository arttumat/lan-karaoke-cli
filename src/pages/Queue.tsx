import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';

import { useQueue } from '../context/queue';
import chalk from 'chalk';

const Queue = () => {
  const { queue } = useQueue();

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
