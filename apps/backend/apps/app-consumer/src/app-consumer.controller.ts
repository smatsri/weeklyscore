import { TestEvent } from '@app/domain/events';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppConsumerController {
  constructor() {}

  @EventPattern('test_consumer')
  getHello(data: TestEvent) {
    console.debug('test_consumer called', data.message);
  }
}
