import { Config, ICache, TrackResult } from '../types';
import { CacheItem } from './types';

export class CommandTracker {
  constructor(
    private readonly cache: ICache,
    private readonly config: Config,
  ) {}

  startTrack(correlationId: string): void {
    const item = CacheItem(TrackResult.Pending(), new Date());
    this.setItem(correlationId, item);
  }

  setResult(correlationId: string, value: unknown) {
    const item = this.cache.get<CacheItem>(correlationId);
    if (!item) return false;

    const newItem = CacheItem.next(item, value);

    this.setItem(correlationId, newItem);
    return true;
  }

  getResult(correlationId: string): TrackResult {
    if (!this.isActive(correlationId)) return TrackResult.NotFound();

    const item = this.cache.get<CacheItem>(correlationId);
    return item.value;
  }

  isActive(correlationId: string): boolean {
    const item = this.cache.get<CacheItem>(correlationId);
    return (
      !!item &&
      Date.now() - item.date.getTime() < this.config.CACHE_TTL_SECONDS * 1000
    );
  }

  stopTracking(correlationId: string): void {
    this.cache.del(correlationId);
  }

  private setItem(correlationId: string, item: CacheItem): void {
    this.cache.set(correlationId, item, this.config.CACHE_TTL_SECONDS * 1000);
  }
}
