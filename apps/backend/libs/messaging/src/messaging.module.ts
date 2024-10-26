import { Module } from '@nestjs/common';
import { NewSessionManager } from './services/new-session/manager';
import { MessagingRedisModule } from './redis';

@Module({
  imports: [MessagingRedisModule],
  providers: [NewSessionManager],
  exports: [NewSessionManager],
})
export class MessagingModule {}
