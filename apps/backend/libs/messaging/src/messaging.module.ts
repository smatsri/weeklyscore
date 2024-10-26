import { Module } from '@nestjs/common';
import { RedisCache } from './services/cache';
import { RedisPublisher } from './services/publisher';
import { NewSessionManager } from './services/new-session/manager';
import { NewSessionListener } from './services/new-session/listener';

// restart
@Module({
  providers: [RedisCache, RedisPublisher, NewSessionManager],
  exports: [RedisCache, RedisPublisher, NewSessionManager],
})
export class MessagingModule { }


@Module({
  imports: [
    MessagingModule
  ],
  providers: [NewSessionListener],
  exports: [NewSessionListener],
})
export class ConsumerModule { }