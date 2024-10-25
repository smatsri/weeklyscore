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

  async setResult(correlationId: string, value: unknown) {
    const item = await this.cache.get<CacheItem>(correlationId);
    if (!item) return false;

    const newItem = CacheItem.next(item, value);

    this.setItem(correlationId, newItem);
    return true;
  }

  async getResult(correlationId: string) {
    const isActive = await this.isActive(correlationId);
    if (!isActive) return TrackResult.NotFound();

    const item = await this.cache.get<CacheItem>(correlationId);
    return item.value;
  }

  async isActive(correlationId: string) {
    const item = await this.cache.get<CacheItem>(correlationId);
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
