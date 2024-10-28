import { MessagingRedisModule } from '@app/messaging/redis';
import { Module } from '@nestjs/common';
import { NewSessionManager } from './manager';


@Module({
  imports: [MessagingRedisModule],
  providers: [NewSessionManager],
  exports: [NewSessionManager],
})
export class NewSessionModule { }