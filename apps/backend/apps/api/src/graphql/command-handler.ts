
import { Command, CommandSchema } from '@weeklyscore/schema';
import { RedisPubSub } from '../redis/pubsub.service';
import Redis from 'ioredis';

export class CommandHandler {
  constructor(
    private readonly redisClient: Redis,
  ) {
  }

  public async getReply(cmd: Command, { timeout = 5000 }: { timeout: number }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const subscriber = this.redisClient.duplicate();
      const corrlationId = Math.random().toString(36).substring(7);

      subscriber.subscribe(`event.${corrlationId}`, (error, message) => {
        resolve(message);
      });

      await subscriber.publish(`command.${corrlationId}`, JSON.stringify(cmd));

      setTimeout(() => {
        subscriber.unsubscribe(`event.${corrlationId}`);
        subscriber.disconnect();
        reject(new Error('Request timed out'));
      }, timeout);
    });




  }


}
