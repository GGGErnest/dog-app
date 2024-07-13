import { SortDir } from '../data';
import { CacheDataConnector } from './cache-data-connectors';

export interface Cache {
  read(dataId: SerializedCacheKey): Promise<unknown>;
  registerConnector(connectorId: string, connector: CacheDataConnector): void;
}

export interface CachedEntity<Type> {
  expiresIn: number;
  data: Type;
  lasUsed: number;
  usageCount: number;
}

export interface CacheKey {
  entityName: string;
}

export interface MemoryCacheRangeRequestKey extends CacheKey {
  sort: string,
  sortDir: SortDir,
  start: number;
  end: number;
}

export interface MemoryCacheIdRequestkey extends CacheKey {
  id: string;
}

export interface MemoryCacheTotalAmountRequestkey extends CacheKey {
  total: true;
}

export type SerializedCacheKey = string;

export function isMemoryCacheRangeRequestKey(cacheKey: CacheKey): cacheKey is MemoryCacheRangeRequestKey {
	return 'start' in cacheKey && 'end' in cacheKey;
}

export function isMemoryCacheIdRequestkey(cacheKey: CacheKey): cacheKey is MemoryCacheIdRequestkey {
	return 'id' in cacheKey;
} 
