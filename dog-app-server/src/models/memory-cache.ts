import { Settings } from '../types/app-settings';
import { Cache, CachedEntity, CacheKey, isMemoryCacheIdRequestkey, isMemoryCacheRangeRequestKey, SerializedCacheKey } from '../types/interfaces/cache';
import { DataConnector } from '../types/interfaces/cache-data-connectors';
import { deserialiseCacheKey } from '../utils/model-utils';

//TODO: How to invalidate the cache from the cache. Think about mentioning it as an improvement of the solution. Yury 
export function calculateCacheExpirationTime(timeInMinutes: number | undefined): number {
	return timeInMinutes !== undefined ? Date.now() + timeInMinutes * 60_000 : Date.now() + 600_000;
}

export function calculateOldItemsThreshould(timeInHours: number): number {
	return Date.now() - 1000 * 60 * 60 * timeInHours;
}

export class MemoryCache implements Cache {
	private readonly _store = new Map<SerializedCacheKey, CachedEntity<unknown>>();
	private readonly _cleanUpIntervalId = setInterval(() => this._cleanUpCache(), Settings.cacheCleaningFrequency);
	private readonly _dataConnectors = new Map<string, DataConnector>()
	private static _instance?: MemoryCache;
	private _cacheExpiresAfterMinutes = Settings.cacheExpiresAfterMinutes;
	private _cacheLimit = Settings.cacheLimit;
	private _cacheOldItemsThresholdHours = Settings.cacheOldItemsThresholdHours;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() { }

	public static get instance(): MemoryCache {
		if (!MemoryCache._instance) {
			MemoryCache._instance = new MemoryCache();
		}

		return MemoryCache._instance;
	}

	private async _getDataFromConnector(key: CacheKey, dataConnector: DataConnector): Promise<unknown | undefined> {

		if (isMemoryCacheIdRequestkey(key)) {
			return dataConnector.getSingle(key.id);
		}

		if (isMemoryCacheRangeRequestKey(key)) {
			return dataConnector.getRange(key.start, key.end, key.sort, key.sortDir);
		}

		return undefined;
	}

	private _shouldRemoveFromCache(cachedEntity: CachedEntity<unknown>): boolean {
		const twoHoursAgo = calculateOldItemsThreshould(this._cacheOldItemsThresholdHours);
		const lowUsageThreshold = 10;
		if (this._store.size > this._cacheLimit && (cachedEntity.usageCount < lowUsageThreshold || cachedEntity.lastUsed < twoHoursAgo)) {
			return true;
		}

		return false;
	}

	private async _addToCache(entityKey: string): Promise<void> {
		const entityKeyObject = deserialiseCacheKey(entityKey);
		if (entityKeyObject) {
			const connector = this._dataConnectors.get(entityKeyObject.entityName);
			if (connector) {
				try {
					const toCacheEntity = await this._getDataFromConnector(entityKeyObject, connector);
					if (toCacheEntity) {
						const newCachedEntity: CachedEntity<unknown> = {
							data: toCacheEntity,
							expiresIn: calculateCacheExpirationTime(this._cacheExpiresAfterMinutes),
							lastUsed: Date.now(),
							usageCount: 1
						};
						this._store.set(entityKey, newCachedEntity)
					}
				} catch (error) {
					throw `Error in the Data connector associated to the entity ${entityKeyObject.entityName}`;
				}
			}

		}
	}

	private async _updateCache(entityKey: string, entity: CachedEntity<unknown>): Promise<void> {
		const entityKeyObject = deserialiseCacheKey(entityKey);
		if (entityKeyObject) {
			const connector = this._dataConnectors.get(entityKeyObject.entityName);
			if (connector) {
				const updatedEntities = await this._getDataFromConnector(entityKeyObject, connector);
				entity.data = updatedEntities;
				entity.expiresIn = calculateCacheExpirationTime(this._cacheExpiresAfterMinutes);
			}

		}
	}

	private async _cleanUpCache(): Promise<void> {
		this._store.forEach((value, key) => {
			if (this._shouldRemoveFromCache(value)) {
				this._store.delete(key)
			}

			if (value.expiresIn < Date.now()) {
				this._updateCache(key, value);
			}
		});
	}

	async read<Type>(entityKey: SerializedCacheKey): Promise<Type | undefined> {
		const requestedData = this._store.get(entityKey);
		if (!requestedData) {
			await this._addToCache(entityKey);
			return this._store.get(entityKey)?.data as Type;
		}

		requestedData.lastUsed = Date.now();
		requestedData.usageCount = requestedData.usageCount + 1;

		return requestedData.data as Type;
	}

	public registerConnector(connectorId: string, connector: DataConnector): void {
		this._dataConnectors.set(connectorId, connector)
	}

	public destroy(): void {
		clearInterval(this._cleanUpIntervalId);
		MemoryCache._instance = undefined;
	}
}
