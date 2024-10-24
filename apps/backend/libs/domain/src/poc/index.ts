import { Observer, Subscription } from 'rxjs';

const CallOnlyOnce = (fn: () => void) => {
  let called = false;

  return () => {
    if (!called) {
      fn();
      called = true;
    }
  };
};

type Message<T> = {
  headers: {
    correlationId: string;
  };
  payload: T;
};

function createMessage<T>(correlationId: string, payload: T): Message<T> {
  return {
    headers: { correlationId },
    payload,
  };
}

interface IPublisher {
  publish: (topic: string, message: Message<unknown>) => void;
  subscribe: (topic: string, obs: Observer<Message<unknown>>) => Subscription;
}

type Timed<T> = {
  date: Date;
  value: T;
};

type TrackPending = { type: 'track-pending' };
type TrackCompleted = { type: 'track-complete'; value: Timed<unknown> };
type TrackCompletedMultiple = {
  type: 'track-complete-multiple';
  values: Timed<unknown>[];
};
type TrackResult = TrackPending | TrackCompleted | TrackCompletedMultiple;

interface CommandTracker {
  startTrack(correlationId: string): void;
  setResult(correlationId: string, result: unknown): void;
  getResult(correlationId: string): TrackResult;
  isActive(correlationId: string): boolean;
  stopTracking(correlationId: string): void;
}

type NotFound = { type: 'not-found' };
type StillPending = { type: 'still-pending' };
type Completed = { type: 'completed'; result: Timed<unknown> };
type CompletedMultiple = {
  type: 'completed-multiple';
  results: Timed<unknown>[];
};

export type CommandResult =
  | NotFound
  | StillPending
  | Completed
  | CompletedMultiple;

type Config = {
  COMMAND_TOPIC: string;
  EVENT_TOPIC: string;
  DEAD_LETTERS_TOPIC: string;
};

export class CommandManager<TCmd> {
  constructor(
    private publisher: IPublisher,
    private tracker: CommandTracker,
    private config: Config,
  ) {}

  publishCmd(correlationId: string, cmd: TCmd, track = true) {
    const msg = createMessage(correlationId, cmd);

    this.publisher.publish(this.config.COMMAND_TOPIC, msg);

    if (track) {
      this.tracker.startTrack(correlationId);
    }
  }

  getResult(correlationId: string, keepTracking = true): CommandResult {
    if (!this.tracker.isActive(correlationId)) {
      return { type: 'not-found' };
    }

    const trackingRes = this.tracker.getResult(correlationId);

    switch (trackingRes.type) {
      case 'track-pending':
        return { type: 'still-pending' };

      case 'track-complete':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed', result: trackingRes.value };

      case 'track-complete-multiple':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed-multiple', results: trackingRes.values };
    }
  }
}

export class EventManager<TEvt> {
  constructor(
    private publisher: IPublisher,
    private config: Config,
  ) {}

  publishEvent(correlationId: string, event: TEvt) {
    const msg = createMessage(correlationId, event);
    this.publisher.publish(this.config.EVENT_TOPIC, msg);
  }
}

export class EventListener implements Disposable {
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
