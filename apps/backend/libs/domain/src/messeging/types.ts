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
  publish: (topic: string, message: Message<unknown>) => void;
  subscribe: (topic: string, obs: Observer<Message<unknown>>) => Subscription;
}

type TrackPending = { type: 'track-pending' };
type TrackCompleted = { type: 'track-complete'; value: unknown };
type TrackCompletedMultiple = {
  type: 'track-complete-multiple';
  values: unknown[];
};
type TrackNotFound = { type: 'track-not-found' };

export type TrackResult =
  | TrackPending
  | TrackCompleted
  | TrackCompletedMultiple
  | TrackNotFound;

export const TrackResult = {
  Pending: (): TrackPending => ({ type: 'track-pending' }),
  Complete: (value: unknown): TrackCompleted => ({
    type: 'track-complete',
    value,
  }),
  CompleteMultiple: (values: unknown[]): TrackCompletedMultiple => ({
    type: 'track-complete-multiple',
    values: values,
  }),
  NotFound: (): TrackNotFound => ({ type: 'track-not-found' }),
};

export interface ICache {
  get: <T>(key: string) => T | undefined;
  set: <T>(key: string, value: T, ttl?: number) => void;
  del: (key: string) => void;
  hasKey: (key: string) => boolean;
}
