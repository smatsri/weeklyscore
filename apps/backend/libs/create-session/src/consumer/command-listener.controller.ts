import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { COMMAND_NAME } from '../config';
import { validateEventMessage } from '../validation';

@Controller()
export class CommandListenerController {
  constructor() {}

  @EventPattern(COMMAND_NAME)
  handle(data: any) {
    const valRes = validateEventMessage(data);
    if (valRes.type === 'invalid') {
      console.debug('invalid event', valRes.error);
    } else {
      console.debug('new event called', valRes.value);
    }
  }
}
