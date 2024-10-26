import Redis from 'ioredis';
import { Subject } from 'rxjs';

export class RedisSubscriptionManager {
  private subscriber: Redis;
  private subjects: Map<string, Subject<any>> = new Map();

  constructor(private readonly redis: Redis) {
    this.subscriber = this.redis.duplicate();
    this.subscriber.on('error', (error) => {
      console.error('Redis subscriber error:', error);
    });
  }

  subscribe<T>(channel: string): Subject<T> {
    if (!this.subjects.has(channel)) {
      const subject = new Subject<T>();
      this.subjects.set(channel, subject);

      this.subscriber.subscribe(channel);

      this.subscriber.on('message', (msgChannel, message) => {
        if (msgChannel === channel) {
          subject.next(JSON.parse(message));
        }
      });
    }

    return this.subjects.get(channel)!;
  }

  unsubscribe(channel: string): void {
    if (this.subjects.has(channel)) {
      const subject = this.subjects.get(channel);
      subject?.complete();
      this.subscriber.unsubscribe(channel);
      this.subjects.delete(channel);
    }
  }

  quit() {
    this.subscriber.quit();
  }
}
