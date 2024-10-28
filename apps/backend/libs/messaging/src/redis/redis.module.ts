import { Module } from '@nestjs/common';
import { RedisCache } from './cache.service';
import { RedisPublisher } from './publisher.service';

// restart
@Module({
  providers: [RedisCache, RedisPublisher],
  exports: [RedisCache, RedisPublisher],
})
export class MessagingRedisModule { }
