#!/usr/bin/env node
import React, { useEffect, useState, ReactElement } from 'react';
import { render, Box, Text } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import { Tab, Tabs } from 'ink-tab';

import FullScreen from './components/FullScreen';
import Logo from './components/Logo';

import Queue from './pages/Queue';
import AddSongs from './pages/AddSongs';
import PageLayout from './components/PageLayout';
import Asd from './components/asd';

const argv = yargs.options({
  a: { type: 'boolean', default: false },
  b: { type: 'string' },
  c: { type: 'number', alias: 'chill' },
  d: { type: 'array' },
  e: { type: 'count' },
  f: { choices: ['1', '2', '3'] },
}).argv;

const App = () => {
  const [activeTabName, setActiveTabName] = useState<string>('queue');

  const handleTabChange = (name: string, activeTab: ReactElement<typeof Tab>): void => {
    setActiveTabName(name);
  };

  return (
    <FullScreen>
      <Asd />
      {/* <Box flexDirection="column">
        <Logo />
        <Tabs defaultValue="queue" onChange={handleTabChange}>
          <Tab name="queue">Queue</Tab>
          <Tab name="add-songs">Add songs</Tab>
        </Tabs>

        <PageLayout>
          {activeTabName === 'queue' && <Queue />}
          {activeTabName === 'add-songs' && <AddSongs />}
        </PageLayout>
      </Box> */}
    </FullScreen>
  );
};

render(<App />);
