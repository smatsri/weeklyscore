import { Observer, Subscription } from 'rxjs';

export type Timed<T> = {
  date: Date;
  value: T;
};

export const Timed = {
  getValue: <T>(value: Timed<T>): T => value.value,
};

export type Config = {
  COMMAND_TOPIC: string;
  EVENT_TOPIC: string;
  DEAD_LETTERS_TOPIC: string;
  CACHE_TTL_SECONDS: number;
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
  publish<T>(topic: string, message: Message<T>): void;
  subscribe<T>(topic: string, obs: Observer<Message<T>>): Subscription;
}

type TrackPending = { type: 'track-pending' };
type TrackCompleted<T> = { type: 'track-complete'; value: T };
type TrackCompletedMultiple<T> = {
  type: 'track-complete-multiple';
  values: T[];
};
type TrackNotFound = { type: 'track-not-found' };

export type TrackResult<T> =
  | TrackPending
  | TrackCompleted<T>
  | TrackCompletedMultiple<T>
  | TrackNotFound;

export const TrackResult = {
  Pending: (): TrackPending => ({ type: 'track-pending' }),
  Complete: <T>(value: T): TrackCompleted<T> => ({
    type: 'track-complete',
    value,
  }),
  CompleteMultiple: <T>(values: T[]): TrackCompletedMultiple<T> => ({
    type: 'track-complete-multiple',
    values: values,
  }),
  NotFound: (): TrackNotFound => ({ type: 'track-not-found' }),
};

export interface ICache {
  get: <T>(key: string) => Promise<T | undefined>;
  set: <T>(key: string, value: T, ttl?: number) => Promise<void>;
  del: (key: string) => Promise<void>;
  hasKey: (key: string) => Promise<boolean>;
}
