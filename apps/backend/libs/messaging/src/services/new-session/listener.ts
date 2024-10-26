import { EventListener } from "@app/messaging/core";
import { RedisPublisher } from "../publisher";
import { RedisCache } from "../cache";
import { CommandTracker } from "@app/messaging/core/command-tracker/command-tracker";
import { config } from "@app/messaging/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NewSessionListener extends EventListener {
  constructor(publisher: RedisPublisher, cache: RedisCache) {
    const tracker = new CommandTracker(cache, config);
    super(publisher, tracker, config);
  }
}