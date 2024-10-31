import { NewSessionManager } from '@app/weeklyscore/new-session';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import Redis from 'ioredis';

@Controller()
export class AppConsumerController {
  private readonly redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  @EventPattern('commands.*')
  handleCommand(@Payload() data: any, @Ctx() context: RmqContext) {
    const pattern = context.getPattern();
    const sessionId = pattern.split('.')[1]; // Extract session-id from the topic name

    console.log('handleCommand called', data);
    console.log('Session ID:', sessionId);
    this.redis.publish(`events.${sessionId}`, JSON.stringify(data));
  }
}
