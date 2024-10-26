import { Injectable } from '@nestjs/common';

import { CommandManager, Config } from '@app/messaging/core';
import { CommandTracker } from '@app/messaging/core/command-tracker/command-tracker';
import { RedisCache } from '../cache/redis';
import { RedisPublisher } from '../publisher';
import { config } from '@app/messaging/config';

type Command = string;
type Result = number;

@Injectable()
export class NewSessionManager extends CommandManager<Command, Result> {
  constructor(publisher: RedisPublisher, cache: RedisCache) {

    const tracker = new CommandTracker(cache, config);
    super(publisher, tracker, config);
  }
}
