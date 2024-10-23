import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SessionEvent } from '@repo/schema/session';

@Controller()
export class CreateSessionController {
  @EventPattern('create_session')
  async createSession(data: SessionEvent) {
    console.debug('create_session called', data);
  }
}
