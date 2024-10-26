import { Injectable } from "@nestjs/common";
import { CommandManager } from "@app/messaging";
import { Config } from "@app/messaging/domain";
import { CommandTracker } from "@app/messaging/domain/command-tracker/command-tracker";
import { RedisCache } from "@app/messaging/services/cache";
import { RedisPublisher } from "@app/messaging/services/publisher";


type Command = string
type Result = number

@Injectable()
export class NewSessionManager extends CommandManager<Command, Result> {
  constructor(
    publisher: RedisPublisher,
    cache: RedisCache
  ) {
    const config: Config = {
      CACHE_TTL_SECONDS: 10,
      COMMAND_TOPIC: 'new-session-command',
      EVENT_TOPIC: 'new-session-event',
      DEAD_LETTERS_TOPIC: 'dead-letters',
    }
    const tracker = new CommandTracker(cache, config);
    super(publisher, tracker, config);

  }
}
