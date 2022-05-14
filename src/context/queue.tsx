import React, { FC, createContext, useState, useContext } from 'react';

interface QueueItem {
  performerName: string;
  jsonFilePath: string;
  songName: string;
}

type QueueContextType = {
  queue: QueueItem[];
  addToQueue: (item: QueueItem) => void;
  removeFromQueue: (item: QueueItem) => void;
};

const QueueContext = createContext<QueueContextType>({
  queue: [],
  addToQueue: () => {},
  removeFromQueue: () => {},
});

export const QueueProvider: FC = ({ children }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const addToQueue = (item: QueueItem) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  };

  const removeFromQueue = (item: QueueItem) => {
    setQueue((prevQueue) => prevQueue.filter((queueItem) => queueItem !== item));
  };

  return (
    <QueueContext.Provider value={{ queue, addToQueue, removeFromQueue }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);

  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }

  return context;
};
