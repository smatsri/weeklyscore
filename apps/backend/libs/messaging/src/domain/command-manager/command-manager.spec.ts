import { describe, expect, it, jest } from '@jest/globals';
import { CommandManager, Config, IPublisher, ICache } from '..';
import { InMemoryCache } from '../cache/inmemory';
import { CommandTracker } from '../command-tracker/command-tracker';

const cache = new InMemoryCache();

const publisher = {
  publish: jest.fn(),
  subscribe: jest.fn(),
};

// mock config
const config: Config = {
  COMMAND_TOPIC: 'command-topic',
  DEAD_LETTERS_TOPIC: 'dead-letters-topic',
  EVENT_TOPIC: 'event-topic',
  CACHE_TTL_SECONDS: 100,
};

// create command manager as a funciton
const createServices = () => {
  const tracker = new CommandTracker(cache, config);
  const commandManager = new CommandManager(
    publisher as IPublisher,
    tracker,
    config as Config,
  );

  return { tracker, commandManager };
};

describe('CommandManager', () => {
  it('after publish should be pending', async () => {
    const { commandManager, tracker } = createServices();
    commandManager.publishCmd('correlationId', 'command');
    //tracker.setResult('correlationId', 'result');
    const res = await commandManager.getResult('correlationId');

    expect(res.type).toBe('still-pending');
  });

  it('after responding should be completed', async () => {
    const { commandManager, tracker } = createServices();
    commandManager.publishCmd('correlationId', 'whats up?');
    tracker.setResult('correlationId', 'all good');
    const res = await commandManager.getResult('correlationId');

    expect(res.type).toBe('completed');
  });
});
