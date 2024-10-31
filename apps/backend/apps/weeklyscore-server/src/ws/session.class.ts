import { Socket } from 'socket.io';
import { RedisService } from './redis.service';

export class Session {
  constructor(
    private readonly userId: string,
    private readonly socket: Socket,
    private readonly redisService: RedisService,
  ) {
    this.initSubscription();
  }

  private async initSubscription() {
    this.socket.on('message', (message) => {
      this.handleMessage(message);
    });

    await this.redisService.subscribe(`events.${this.userId}_*`, (message) => {
      this.socket.emit('message', message);
    });
  }

  handleMessage(message: string) {
    this.redisService.publish(`command.${this.userId}`, message);
  }

  async cleanup() {
    try {
      await this.redisService.unsubscribe(`events.${this.userId}`);
      this.redisService.quit();
      this.socket.disconnect();
    } catch (error) {
      // write error to log
      console.error(error);
    }
  }
}
