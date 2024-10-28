import { Injectable } from '@nestjs/common';
import { CommandManager, Config, CommandTracker } from '@app/messaging';
import { RedisPublisher } from '@app/messaging/redis/publisher.service';
import { RedisCache } from '@app/messaging/redis/cache.service';
import { config } from './config';
import { Command, Event } from './messages';


@Injectable()
export class NewSessionManager extends CommandManager<Command, Event> {
  constructor(publisher: RedisPublisher, cache: RedisCache) {

    const tracker = new CommandTracker(cache, config);
    super(publisher, tracker, config);
  }
}
