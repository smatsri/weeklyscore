import { CommandManager } from "..";
import { InMemoryCache } from "./mocks/cache";
import { CommandTracker } from "../../command-tracker/command-tracker";
import { Config } from "../../types";
import { TestPublisher } from "./mocks/publisher";
import { CommandResult } from "../types";

const config: Config = {
  COMMAND_TOPIC: 'command-topic',
  DEAD_LETTERS_TOPIC: 'dead-letters-topic',
  EVENT_TOPIC: 'event-topic',
  CACHE_TTL_SECONDS: 100,
};


export const createServices = <C, E>() => {
  const cache = new InMemoryCache();
  const publisher = new TestPublisher();
  const tracker = new CommandTracker(cache, config);

  const commandManager = new CommandManager<C, E>(
    publisher,
    tracker,
    config,
  );

  return { tracker, commandManager, cache, publisher };
};

export type Services = ReturnType<typeof createServices>;

type TestOp =
  | ['publish', any]
  | ['set-result', any]
  | ['get-result']
  | ['clear']




export const run = async <C, R>(...ops: TestOp[]) => {

  const { commandManager } = createServices<C, R>();

  const correlationId = 'correlationId';

  for (const op of ops) {
    switch (op[0]) {
      case 'publish':
        commandManager.publishCmd(correlationId, op[1]);
        break;
      case 'set-result': {
        await commandManager.publishResult(correlationId, op[1]);
        break;
      }

      case 'clear': {
        commandManager.clear(correlationId);
        break;
      }
    }
  }


  const result = await commandManager.getResult<R>(correlationId);

  return result;
}

export const runResult = async <C, R>(...ops: TestOp[]): Promise<CommandResult<R>> => {
  return await run<C, R>(...ops, ['get-result']);
}