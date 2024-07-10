import { Cache, CachedEntity } from "../types/interfaces/cache";
import { CacheDataConnector } from "../types/interfaces/cache-data-connectors";
import { Settings } from "../types/interfaces/settings";

function calculateCacheExpirationTime(timeInMinutes: string | undefined): number {
  return timeInMinutes !== undefined ? Date.now() + parseInt(timeInMinutes) * 60_000 : Date.now() + 600_000;
}

export class MemoryCache implements Cache {
  private readonly _store = new Map<string, CachedEntity<unknown>>();
  private readonly _updateIntervalId = setInterval(() => this._updateCache());
  private readonly _cacheExpiresAfterMinutes;
  private readonly _dataConnectors = new Map<string, CacheDataConnector<unknown>>()

  constructor() {
    this._cacheExpiresAfterMinutes = calculateCacheExpirationTime(Settings.cacheExpiresAfterMinutes);
  }


  // TODO: Think about that we might miss some data updates if there is incoming request and at that time the requested entity is been updated 
  // it could be possible to delay returning the requested data until the update finishes but I think that will introduce some more waiting time
  //  and I think for this use case is not necessary to have such complexity, and missing one update is not a big of a deal
  private async _updateCache(): Promise<void> {
    this._store.forEach(async (value, key) => {
      if (value.updated > this._cacheExpiresAfterMinutes) {
        const connector = this._dataConnectors.get(key);
        if (connector) {
          const updatedEntities = await connector?.retrive(value.entities.length);
          if (updatedEntities.length > 0) {
            value.entities = updatedEntities;
            value.updated = Date.now();
          }
        }
      }
    });
  }

  read<Type>(dataId: string, count: number): Type[] {
    const returnValue = this._store.get(dataId)?.entities.slice(0, count);
    return returnValue as Type[] ?? [];
  }

  registerConnector<Type>(connectorId: string, connector: CacheDataConnector<Type>): void {
    this._dataConnectors.set(connectorId, connector)
  }
  destroy(): void {
    clearInterval(this._updateIntervalId);
  }
}
