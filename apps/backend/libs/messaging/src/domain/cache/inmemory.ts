import { ICache } from '../types';

export class InMemoryCache implements ICache {
  private cache: Map<string, unknown> = new Map();

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T;
  }

  async set(key: string, value: unknown) {
    this.cache.set(key, value);
  }

  async del(key: string) {
    this.cache.delete(key);
  }

  async hasKey(key: string) {
    return this.cache.has(key);
  }
}
