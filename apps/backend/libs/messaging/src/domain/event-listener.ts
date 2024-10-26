import { CommandTracker } from './command-tracker/command-tracker';
import { Config, IPublisher, Message } from './types';
import { CallOnlyOnce } from './utils';

export abstract class EventListener implements Disposable {
  private readonly _dispose: () => void;

  constructor(
    private readonly publisher: IPublisher,
    private readonly tracker: CommandTracker,
    private readonly config: Config,
  ) {
    const subscription = publisher.subscribe(config.EVENT_TOPIC, {
      next: (msg: Message<unknown>) => this.onEvent(msg),
      error: (err) => console.error('Error handling event', err),
      complete: () => console.log('Event stream completed'),
    });

    this._dispose = CallOnlyOnce(subscription.unsubscribe);
  }

  private onEvent(evt: Message<unknown>) {
    const { correlationId } = evt.headers;
    if (this.tracker.isActive(correlationId)) {
      this.tracker.setResult(correlationId, evt.payload);
    } else {
      this.publisher.publish(this.config.DEAD_LETTERS_TOPIC, evt);
    }
  }

  dispose() {
    this._dispose();
  }

  [Symbol.dispose](): void {
    this.dispose();
  }
}
