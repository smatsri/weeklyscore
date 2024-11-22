import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

export abstract class RedisConsumerBase
  implements OnModuleInit, OnModuleDestroy
{
  protected readonly redis: Redis;
  protected readonly subscriber: Redis;

  constructor() {
    this.redis = new Redis('redis://localhost:6379');
    this.subscriber = this.redis.duplicate();
  }

  onModuleInit() {
    this.start();
  }

  onModuleDestroy() {
    this.dispose();
  }

  public async start() {
    console.log('Redis consumer started');

    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    await this.subscriber.psubscribe('command.*');
    this.subscriber.on(
      'pmessage',
      async (pattern, channel, message) =>
        await this.onMessage(pattern, channel, message),
    );
  }

  protected abstract onMessage(
    pattern: string,
    channel: string,
    message: string,
  ): Promise<void>;

  protected publishEvent(sessionId: string, event: any) {
    try {
      const response = JSON.stringify(event);
      return this.redis.publish(`event.${sessionId}`, response);
    } catch (error) {
      console.error('Failed to publish event:', error);
    }
  }

  dispose() {
    this.redis.disconnect();
    this.subscriber.disconnect();
  }
}
