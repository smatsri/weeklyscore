import { Observable, Subscription } from 'rxjs';

type CreateSession = {
  type: 'create-session';
  playingGroupId: string;
};

type CreatePlayer = {
  type: 'create-player';
  name: string;
};

type Cmd = CreateSession | CreatePlayer;

type SessionCreated = {
  type: 'session-created';
  id: string;
};

type PlayerCreated = {
  type: 'player-created';
  id: string;
};

type Evt = SessionCreated | PlayerCreated;

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

interface ICommandPublisher {
  publish: (topic: string, message: Message<Cmd>) => void;
  events: Observable<Message<Evt>>;
}

type TrackPending = { type: 'pending' };
type TrackComplete = { type: 'complete'; result: unknown };
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

class CommandManager {
  private readonly subscription: Subscription;

  constructor(
    private publisher: ICommandPublisher,
    private tracker: CommandTracker,
  ) {
    this.subscription = this.publisher.events.subscribe({
      next: this.onEvent.bind(this),
      error: (err) => console.error('Error handling event', err),
      complete: () => console.log('Event stream completed'),
    });
  }

  publishCmd(correlationId: string, cmd: Cmd, track = true) {
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

    const result = this.tracker.getResult(correlationId);

    switch (result.type) {
      case 'pending':
        return { type: 'still-pending' };

      case 'complete':
        if (!keepTracking) {
          this.tracker.stopTracking(correlationId);
        }
        return { type: 'completed', result: result.result };
    }
  }

  private onEvent(evt: Message<Evt>) {
    const { correlationId } = evt.headers;
    if (this.tracker.isActive(correlationId)) {
      this.tracker.setResult(correlationId, evt.payload);
    }
  }

  dispose() {
    this.subscription.unsubscribe();
  }
}
