import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';

const Logo = () => {
  return (
    <Text>
      <Box>
        <Text>{figlet.textSync('LAN Karaoke CLI')}</Text>
      </Box>
    </Text>
  );
};

export default Logo;
