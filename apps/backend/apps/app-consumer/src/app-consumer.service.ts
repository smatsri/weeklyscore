import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CommandService } from './command';
import { parseMessage } from './validattion';
import { isNone } from './validattion/option';

@Injectable()
export class AppConsumerService {
  private readonly redis: Redis;
  private readonly subscriber: Redis;

  constructor(private readonly commandService: CommandService) {
    this.redis = new Redis('redis://localhost:6379');
    this.subscriber = this.redis.duplicate();

    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async start() {
    console.log('App consumer started');
    await this.subscriber.psubscribe('command.*');
    this.subscriber.on('pmessage', async (pattern, channel, message) =>
      this.onMessage(pattern, channel, message),
    );
  }

  private async onMessage(pattern: string, channel: string, message: string) {
    const cmd = parseMessage(channel, message);

    if (isNone(cmd)) {
      return;
    }

    const { sessionId, command } = cmd.value;
    const evt = await this.commandService.handle(command);

    const response = JSON.stringify(evt);

    this.redis.publish(`event.${sessionId}`, response);
  }
}
