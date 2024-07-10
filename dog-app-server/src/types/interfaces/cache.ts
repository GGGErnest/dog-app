import { CacheDataConnector } from './cache-data-connectors';

export interface Cache {
  read(dataId: string, count: number): unknown;
  registerConnector<Type>(connectorId: string, connector: CacheDataConnector<Type>): void;
}

export interface CachedEntity<Type> {
  updated: number;
  entities: Type[]
}
