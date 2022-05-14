import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';

const Logo = () => {
  return (
    <Box>
      <Text>{figlet.textSync('LAN Karaoke CLI')}</Text>
    </Box>
  );
};

export default Logo;
