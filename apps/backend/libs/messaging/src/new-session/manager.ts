import { Injectable } from '@nestjs/common';
import { CommandManager, Config } from '@app/messaging/core';
import { CommandTracker } from '@app/messaging/core/command-tracker/command-tracker';
import { RedisPublisher } from '@app/messaging/redis/publisher.service';
import { RedisCache } from '@app/messaging/redis/cache.service';
import { config } from '@app/messaging/new-session/config';
import { Command, Event } from '@app/domain/new-session';


@Injectable()
export class NewSessionManager extends CommandManager<Command, Event> {
  constructor(publisher: RedisPublisher, cache: RedisCache) {

    const tracker = new CommandTracker(cache, config);
    super(publisher, tracker, config);
  }
}
