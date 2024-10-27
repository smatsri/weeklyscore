import { Config, ICache, TrackResult } from '../types';
import { CacheItem } from './types';

export class CommandTracker {
  constructor(
    private readonly cache: ICache,
    private readonly config: Config,
  ) { }

  startTrack(correlationId: string): void {
    const item = CacheItem(TrackResult.Pending(), new Date());
    this.setItem(correlationId, item);
  }

  async setResult<T>(correlationId: string, value: T) {
    const item = await this.cache.get<CacheItem<T>>(correlationId);
    if (!item) return false;

    const newItem = CacheItem.next(item, value);

    this.setItem(correlationId, newItem);
    return true;
  }

  async getResult<T>(correlationId: string) {
    const isActive = await this.isActive(correlationId);
    if (!isActive) return TrackResult.NotFound();

    const item = await this.cache.get<CacheItem<T>>(correlationId);
    return item.value;
  }

  async isActive(correlationId: string) {
    return await this.cache.hasKey(correlationId);
  }

  stopTracking(correlationId: string): void {
    this.cache.del(correlationId);
  }

  private setItem<T>(correlationId: string, item: CacheItem<T>): void {
    this.cache.set(correlationId, item, this.config.CACHE_TTL);
  }
}
