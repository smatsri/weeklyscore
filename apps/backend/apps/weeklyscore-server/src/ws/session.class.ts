import { Socket } from 'socket.io';
import { RedisService } from './redis.service';

export class Session {
  constructor(
    private readonly userId: string,
    private readonly socket: Socket,
    private readonly redisService: RedisService,
  ) {
    console.log(`Session created for user: ${userId}`);
    this.initSubscription();
  }

  private async initSubscription() {
    this.socket.on('message', (message) => {
      console.log(`Received message from user: ${this.userId}`);
      this.redisService.publish(`command.${this.userId}`, message);
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
