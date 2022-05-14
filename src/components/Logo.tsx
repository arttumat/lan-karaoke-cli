import React from 'react';
import { Box, Text } from 'ink';
import figlet from 'figlet';

const Logo = () => {
  return (
    <Box paddingX={4} paddingY={2} width="100%" justifyContent="center">
      <Text>{figlet.textSync('KALLE - KAraoke just suLLE')}</Text>
    </Box>
  );
};

export default Logo;
