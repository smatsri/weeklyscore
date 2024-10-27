import Redis from 'ioredis';
import { Observable, Observer, Subscription } from 'rxjs';
import { IPublisher, Message } from '@app/messaging';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { RedisSubscriptionManager } from './subscribe-manager';

@Injectable()
export class RedisPublisher implements IPublisher, OnModuleDestroy {
  private readonly redis: Redis;
  private readonly subManager: RedisSubscriptionManager;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.subManager = new RedisSubscriptionManager(this.redis);

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async publish<T>(topic: string, message: Message<T>): Promise<void> {
    await this.redis.publish(topic, JSON.stringify(message));
  }

  subscribe<T>(topic: string, obs: Observer<Message<T>>): Subscription {
    return this.subManager.subscribe(topic).subscribe(obs);
  }

  getEvents<T>(topic: string) {
    return this.subManager.subscribe<T>(topic)
  }


  onModuleDestroy() {
    this.subManager.quit();
    this.redis.quit();
  }
}
