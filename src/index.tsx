#!/usr/bin/env node
import React, { useEffect, useState, ReactElement } from 'react';
import { render, Box, Text } from 'ink';
import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';
import { Tab, Tabs } from 'ink-tab';

import { QueueProvider } from './context/queue';

import FullScreen from './components/FullScreen';
import Logo from './components/Logo';

import Queue from './pages/Queue';
import AddSongs from './pages/AddSongs';
import PageLayout from './components/PageLayout';

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
      <QueueProvider>
        <Box flexDirection="column">
          <Logo />
          <Box width="100%" justifyContent="center">
            <Tabs defaultValue="queue" onChange={handleTabChange}>
              <Tab name="queue">Queue</Tab>
              <Tab name="add-songs">Add songs</Tab>
            </Tabs>
          </Box>

          <PageLayout>
            {activeTabName === 'queue' && <Queue />}
            {activeTabName === 'add-songs' && (
              <AddSongs onFinish={() => setActiveTabName('queue')} />
            )}
          </PageLayout>
        </Box>
      </QueueProvider>
    </FullScreen>
  );
};

render(<App />);
