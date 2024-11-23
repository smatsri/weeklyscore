import { Socket } from 'socket.io';
import { RedisService } from './redis.service';
import { CommandSchema } from '@weeklyscore/schema';
export class Session {
  constructor(
    private readonly userId: string,
    private readonly socket: Socket,
    private readonly redisService: RedisService,
  ) {
    console.log(`Session created for user: ${userId}`);
  }

  public async init() {
    this.socket.on('message', (message) => {
      console.log(`Received message from user: ${this.userId}`);
      const data = JSON.parse(message);
      const valRes = CommandSchema.safeParse(data);
      if (!valRes.success) {
        console.error('Invalid message received: ', valRes.error.message);
      } else {
        this.redisService.publish(`command.${this.userId}`, valRes.data);
      }
    });

    await this.redisService.subscribe(`event.${this.userId}`, (message) => {
      console.log(`Sending message to user: ${this.userId}`);
      this.socket.emit('message', message);
    });
  }

  async cleanup() {
    console.log(`Cleaning up session for user: ${this.userId}`);
    try {
      await this.redisService.unsubscribe(`events.${this.userId}`);
      this.socket.disconnect();
    } catch (error) {
      console.error(error);
    }
  }
}
