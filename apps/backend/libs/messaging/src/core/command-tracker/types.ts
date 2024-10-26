import { TrackResult } from '../types';

export type CacheItem<T> = {
  value: TrackResult<T>;
  date: Date;
};

export const CacheItem = <T>(
  value: TrackResult<T>,
  date: Date,
): CacheItem<T> => ({
  value,
  date,
});

CacheItem.next = <T>(current: CacheItem<T>, value: T): CacheItem<T> => {
  const date = new Date();
  switch (current.value.type) {
    case 'track-pending':
      return CacheItem(TrackResult.Complete(value), date);
    case 'track-complete':
      return CacheItem(
        TrackResult.CompleteMultiple([current.value.value, value]),
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
