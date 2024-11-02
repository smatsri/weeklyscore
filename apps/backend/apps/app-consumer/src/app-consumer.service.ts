import { Controller, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AppConsumerService {
  async start() {
    console.log('App consumer started');
    const redis = new Redis('redis://localhost:6379');
    const subscriber = redis.duplicate();
    redis.on('connect', () => {
      console.log('Connected to Redis');
    });
    redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    await subscriber.psubscribe('command.*');

    subscriber.on('pmessage', (pattern, channel, message) => {
      const [, sessionId] = channel.split('.');
      console.log(
        `Received message from pattern ${pattern} on channel ${channel}: ${message}`,
      );

      const response = JSON.stringify({
        success: true,
        data: 'not implemented',
      });

      redis.publish(`event.${sessionId}`, response);
    });
  }
}
