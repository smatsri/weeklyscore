import { Observable, Subscription } from 'rxjs';

type Command = {
  type: string;
  payload: unknown;
};

type Event = {
  type: string;
  payload: unknown;
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

interface ICommandPublisher<C extends Command, E extends Event> {
  publish: (topic: string, message: Message<C>) => void;
  events: Observable<Message<E>>;
}

type TrackPending = { type: 'pending' };
type TrackComplete = { type: 'complete'; value: unknown };
type TrackResult = TrackPending | TrackComplete;

interface CommandTracker {
  startTrack(correlationId: string): void;
  setResult(correlationId: string, result: unknown): void;
  getResult(correlationId: string): TrackResult;
  isActive(correlationId: string): boolean;
  stopTracking(correlationId: string): void;
}

type NotFound = { type: 'not-found' };
type StillPending = { type: 'still-pending' };
type Completed = { type: 'completed'; result: unknown };
type CommandResult = NotFound | StillPending | Completed;

class CommandManager<C extends Command, E extends Event> {
  private readonly subscription: Subscription;

  constructor(
    private publisher: ICommandPublisher<C, E>,
    private tracker: CommandTracker,
  ) {
    this.subscription = this.publisher.events.subscribe({
      next: this.onEvent.bind(this),
      error: (err) => console.error('Error handling event', err),
      complete: () => console.log('Event stream completed'),
    });
  }

  publishCmd(correlationId: string, cmd: C, track = true) {
    const msg = createMessage(correlationId, cmd);

    this.publisher.publish('cmd', msg);

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
      case 'pending':
        return { type: 'still-pending' };

      case 'complete':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed', result: trackingRes.value };
    }
  }

  private onEvent(evt: Message<E>) {
    const { correlationId } = evt.headers;
    if (this.tracker.isActive(correlationId)) {
      this.tracker.setResult(correlationId, evt.payload);
    }
  }

  dispose() {
    this.subscription.unsubscribe();
  }
}

type CreateSession = {
  type: 'create-session';
  payload: {
    playingGroupId: string;
  };
};

type CreatePlayer = {
  type: 'create-player';
  payload: {
    name: string;
  };
};

type SessionCreated = {
  type: 'session-created';
  payload: {
    id: string;
  };
};

type PlayerCreated = {
  type: 'player-created';
  payload: {
    id: string;
  };
};

type SessionCmd = CreateSession | CreatePlayer;
type SessionEvent = SessionCreated | PlayerCreated;
