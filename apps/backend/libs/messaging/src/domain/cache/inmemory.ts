import { ICache } from '../types';

export class InMemoryCache implements ICache {
  private cache: Map<string, unknown> = new Map();

  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T;
  }

  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  hasKey(key: string): boolean {
    return this.cache.has(key);
  }
}
