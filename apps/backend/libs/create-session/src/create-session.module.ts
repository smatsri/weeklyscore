import { Module } from '@nestjs/common';
import { CreateSessionService } from './create-session.service';

@Module({
  providers: [CreateSessionService],
  exports: [CreateSessionService],
})
export class CreateSessionModule {}
