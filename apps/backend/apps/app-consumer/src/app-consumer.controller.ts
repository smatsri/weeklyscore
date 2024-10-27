import { TestEvent } from '@app/domain/new-session';
import { NewSessionManager } from '@app/messaging/new-session/manager';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppConsumerController {
  constructor(
    private readonly manager: NewSessionManager
  ) { }

  @EventPattern('test_consumer')
  getHello(data: TestEvent) {
    console.debug('test_consumer called', data.message);
  }

  @EventPattern('command-topic')
  handleCommand(data: any) {
    console.log('handleCommand called', data);
    this.manager.publishResult(data.headers.correlationId, 73);
  }
}
