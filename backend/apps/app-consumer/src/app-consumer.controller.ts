import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppConsumerController {
  constructor() {}

  @EventPattern('test_consumer')
  getHello() {
    console.debug('test_consumer called');
  }
}
