import { Observer, Subscription } from 'rxjs';

export type Timed<T> = {
  date: Date;
  value: T;
};

export type Config = {
  COMMAND_TOPIC: string;
  EVENT_TOPIC: string;
  DEAD_LETTERS_TOPIC: string;
};

export type Message<T> = {
  headers: {
    correlationId: string;
  };
  payload: T;
};

export function Message<T>(correlationId: string, payload: T): Message<T> {
  return {
    headers: { correlationId },
    payload,
  };
}

export interface IPublisher {
  publish: (topic: string, message: Message<unknown>) => void;
  subscribe: (topic: string, obs: Observer<Message<unknown>>) => Subscription;
}

type TrackPending = { type: 'track-pending' };
type TrackCompleted = { type: 'track-complete'; value: Timed<unknown> };
type TrackCompletedMultiple = {
  type: 'track-complete-multiple';
  values: Timed<unknown>[];
};
export type TrackResult =
  | TrackPending
  | TrackCompleted
  | TrackCompletedMultiple;

export interface ICommandTracker {
  startTrack(correlationId: string): void;
  setResult(correlationId: string, result: unknown): void;
  getResult(correlationId: string): TrackResult;
  isActive(correlationId: string): boolean;
  stopTracking(correlationId: string): void;
}
