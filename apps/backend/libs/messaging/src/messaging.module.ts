import { Module } from '@nestjs/common';
import { RedisCache } from './services/cache';
import { RedisPublisher } from './services/publisher';

// restart
@Module({
  providers: [RedisCache, RedisPublisher],
  exports: [RedisCache, RedisPublisher],
})
export class MessagingModule { }
