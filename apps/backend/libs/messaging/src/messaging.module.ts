import { Module } from '@nestjs/common';
import { RedisCache } from './services/cache';
import { RedisPublisher } from './services/publisher';
import { NewSessionManager } from './services/managers/new-session';

// restart
@Module({
  providers: [RedisCache, RedisPublisher, NewSessionManager],
  exports: [RedisCache, RedisPublisher, NewSessionManager],
})
export class MessagingModule { }
