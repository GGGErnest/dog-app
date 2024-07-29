import { DataConnector, DataConnectorAction } from './cache-data-connectors';

export interface Cache {
  cleanCache(): void;
  read(dataId: SerializedCacheKey): Promise<unknown>;
  registerConnector(connectorId: string, connector: DataConnector): void;
}

export interface CachedEntity<Type> {
  expiresIn: number;
  data: Type;
  lastUsed: number;
  usageCount: number;
}

export interface CacheKey {
  entityId: string;
  action: DataConnectorAction;
}

export interface MemoryCacheTotalAmountRequestkey extends CacheKey {
  total: true;
}

export type SerializedCacheKey = string;

