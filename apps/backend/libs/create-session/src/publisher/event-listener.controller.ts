import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EVENTS_TOPIC } from '../config';
import { validateEventMessage } from '../validation';

@Controller()
export class EventsListenerController {
  constructor() {}

  @EventPattern(EVENTS_TOPIC)
  handle(data: any) {
    const valRes = validateEventMessage(data);
    if (valRes.type === 'invalid') {
      console.debug('invalid event', valRes.error);
    } else {
      console.debug('new event called', valRes.value);
    }
  }
}
