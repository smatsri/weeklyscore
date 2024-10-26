import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ICache } from '../../core/types';

@Injectable()
export class RedisCache implements ICache, OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  onModuleInit() {
    this.redis.on('connect', () => {
      console.log('Connected to Redis');
    });
    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  onModuleDestroy() {
    this.redis.disconnect();
  }

  async get<T>(key: string): Promise<T | undefined> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (ttl) {
      await this.redis.set(key, stringValue, 'EX', ttl);
    } else {
      await this.redis.set(key, stringValue);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async hasKey(key: string): Promise<boolean> {
    const exists = await this.redis.exists(key);
    return exists === 1;
  }
}
