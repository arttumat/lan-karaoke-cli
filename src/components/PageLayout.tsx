import React from 'react';
import { Box } from 'ink';

const PageLayout: React.FC = ({ children }) => {
  return <Box margin={4}>{children}</Box>;
};

export default PageLayout;
