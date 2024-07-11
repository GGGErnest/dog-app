import { CacheDataConnector } from './cache-data-connectors';

export interface Cache {
  read(dataId: SerializedCacheKey): Promise<unknown[]>;
  registerConnector<Type>(connectorId: string, connector: CacheDataConnector<Type>): void;
}

export interface CachedEntity<Type> {
  expiresIn: number;
  entities: Type[];
  lasUsed: number;
  usageCount: number;
}

export interface CacheKey {
  entityName: string;
}

export interface MemoryCacheRangeRequestKey extends CacheKey {
  start: number;
  end: number;
}

export interface MemoryCacheIdRequestkey extends CacheKey {
  id: string;
}

export type SerializedCacheKey = string;

export function isMemoryCacheRangeRequestKey(cacheKey: CacheKey): cacheKey is MemoryCacheRangeRequestKey {
  return 'start' in cacheKey && 'end' in cacheKey;
}

export function isMemoryCacheIdRequestkey(cacheKey: CacheKey): cacheKey is MemoryCacheIdRequestkey {
  return 'id' in cacheKey;
} 
