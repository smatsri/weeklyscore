import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { COMMAND_NAME } from '../config';
import { validateCommandMessage } from '../validation';

@Controller()
export class CommandListenerController {
  constructor() {}

  @EventPattern(COMMAND_NAME)
  handle(data: any) {
    const valRes = validateCommandMessage(data);
    if (valRes.type === 'invalid') {
      console.debug('invalid event', valRes.error);
    } else {
      console.debug('new event called', valRes.value.data);
    }
  }
}
