import { Module } from '@nestjs/common';
import { RedisCache } from './services/cache';
import { RedisPublisher } from './services/publisher';

@Module({
  providers: [RedisCache, RedisPublisher],
  exports: [],
})
export class MessagingModule {}
