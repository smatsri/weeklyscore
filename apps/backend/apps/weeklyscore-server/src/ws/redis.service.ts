import { createClient, RedisClientType } from 'redis';

export class RedisService {
  private readonly client: RedisClientType;
  private readonly subscriberClient: RedisClientType;

  constructor() {
    this.client = createClient({ url: 'redis://localhost:6379' });
    this.subscriberClient = this.client.duplicate();
  }

  async publish(channel: string, message: any) {
    await this.client.publish(channel, JSON.stringify(message));
  }

  async subscribe(
    channelPattern: string,
    callback: (message: any, channel: string) => void,
  ) {
    await this.subscriberClient.pSubscribe(
      channelPattern,
      (message, channel) => {
        callback(JSON.parse(message), channel);
      },
    );
  }

  async unsubscribe(channelPattern: string) {
    await this.subscriberClient.pUnsubscribe(channelPattern);
  }

  async quit() {
    await this.client.quit();
    await this.subscriberClient.quit();
  }
}
