import { TrackResult } from '../types';

export type CacheItem = {
  value: TrackResult;
  date: Date;
};

export const CacheItem = (value: TrackResult, date: Date): CacheItem => ({
  value,
  date,
});

CacheItem.next = (current: CacheItem, value: unknown): CacheItem => {
  const date = new Date();
  switch (current.value.type) {
    case 'track-pending':
      return CacheItem(TrackResult.Complete(value), date);
    case 'track-complete':
      return CacheItem(
        TrackResult.CompleteMultiple([current.value, value]),
        date,
      );
    case 'track-complete-multiple':
      return CacheItem(
        TrackResult.CompleteMultiple([...current.value.values, value]),
        date,
      );
    default:
      return current;
  }
};
