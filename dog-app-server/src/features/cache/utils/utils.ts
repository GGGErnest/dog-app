import { CacheKey, MemoryCacheIdRequestkey, MemoryCacheRangeRequestKey, MemoryCacheTotalAmountRequestkey } from "../types/cache";
import { SortDir } from "../types/cache-data-connectors";

export function serializeMemoryCacheRangeRequestKey(entityId: string, start: number, end: number, sort: string, sortDir: SortDir): string {
  const entityKey: MemoryCacheRangeRequestKey = {
    entityName: entityId,
    start,
    end,
    sort,
    sortDir
  }

  return JSON.stringify(entityKey);
}

export function serializeMemoryCacheIdRequestkey(entityId: string, id: string): string {
  const entityKey: MemoryCacheIdRequestkey = {
    entityName: entityId,
    id,
  }
  return JSON.stringify(entityKey);
}

export function serializeMemoryCacheTotalAmountResqueKey(entityId: string): string {
  const entityKey: MemoryCacheTotalAmountRequestkey = {
    entityName: entityId,
    total: true
  }
  return JSON.stringify(entityKey);
}

export function deserialiseCacheKey(key: string): CacheKey | undefined {
  try {
    const deserialisedKey = JSON.parse(key);
    return deserialisedKey as CacheKey;
  } catch (error) {
    return undefined
  }
}

