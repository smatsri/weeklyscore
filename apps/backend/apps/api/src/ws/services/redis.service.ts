import { Redis } from 'ioredis';

export class RedisService {
  private readonly subscriberClient: Redis;

  constructor(private readonly client: Redis) {
    this.subscriberClient = this.client.duplicate();
    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async publish(channel: string, message: any) {
    try {
      await this.client.publish(channel, JSON.stringify(message));
      console.log(`Published message to channel ${channel}`);
    } catch (error) {
      console.error(error);
    }
  }

  async subscribe(channelPattern: string, callback: (message: any) => void) {
    await this.subscriberClient.psubscribe(
      channelPattern,
      (message, channel) => {
        callback(message);
      },
    );

    this.subscriberClient.on('pmessage', (pattern, channel, message) => {
      callback(message);
    });
  }

  async unsubscribe(channelPattern: string) {
    await this.subscriberClient.punsubscribe(channelPattern);
  }

  async quit() {
    await this.client.quit();
    await this.subscriberClient.quit();
  }
}
