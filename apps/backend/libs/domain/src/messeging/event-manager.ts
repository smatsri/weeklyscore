import { Config, IPublisher, Message } from './types';

export class EventManager<TEvt> {
  constructor(
    private publisher: IPublisher,
    private config: Config,
  ) {}

  publishEvent(correlationId: string, event: TEvt) {
    const msg = Message(correlationId, event);
    this.publisher.publish(this.config.EVENT_TOPIC, msg);
  }
}
