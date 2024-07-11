import { Cache, CachedEntity, CacheKey, SerializedCacheKey } from '../types/interfaces/cache';
import { CacheDataConnector } from '../types/interfaces/cache-data-connectors';
import { Settings } from '../types/interfaces/settings';

function calculateCacheExpirationTime(timeInMinutes: number | undefined): number {
	return timeInMinutes !== undefined ? Date.now() + timeInMinutes * 60_000 : Date.now() + 600_000;
}

export class MemoryCache implements Cache {
	private readonly _store = new Map<SerializedCacheKey, CachedEntity<unknown>>();
	private readonly _cleanUpIntervalId = setInterval(() => this._cleanUpCache(), Settings.cacheCleaningFrequency);
	private readonly _dataConnectors = new Map<string, CacheDataConnector<unknown>>()
	private static _instance?: MemoryCache;
	private _cacheExpiresAfterMinutes = Settings.cacheExpiresAfterMinutes;
	private _cacheLimit = Settings.cacheLimit;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() { }

	public static get cache(): MemoryCache {
		if (!MemoryCache._instance) {
			MemoryCache._instance = new MemoryCache();
		}

		return MemoryCache._instance;
	}

	private _shouldRemoveFromCache(cachedEntity: CachedEntity<unknown>): boolean {
		//TODO: Fix this calculation there should be a better way to do this
		const twoHoursAgo = Date.now() - 1000 * 60 * 60 * 2;
		const lowUsageThreshold = 10;

		if (this._store.size > this._cacheLimit && (cachedEntity.usageCount < lowUsageThreshold || cachedEntity.lasUsed < twoHoursAgo)) {
			return true;
		}

		return false;
	}

	private async _addToCache(entityKey: string): Promise<void> {
		const entityKeyObject: CacheKey = JSON.parse(entityKey) as CacheKey;
		const connector = this._dataConnectors.get(entityKeyObject.entityName);
		const toCacheEntity = await connector?.retrive(entityKeyObject);

		// creates and stores a new entity in the cache
		if (toCacheEntity) {
			const newCachedEntity: CachedEntity<unknown> = {
				entities: toCacheEntity,
				expiresIn: calculateCacheExpirationTime(this._cacheExpiresAfterMinutes),
				lasUsed: Date.now(),
				usageCount: 1
			};
			this._store.set(entityKey, newCachedEntity)
		}
	}

	private async _updateCache(entityKey: string, entity: CachedEntity<unknown>): Promise<void> {
		const entityKeyObject: CacheKey = JSON.parse(entityKey) as CacheKey;
		const connector = this._dataConnectors.get(entityKeyObject.entityName);
		const updatedEntities = await connector?.retrive(entityKeyObject);

		// update the entities in the cache if it expired 
		if (entity && updatedEntities) {
			entity.entities = updatedEntities;
			entity.expiresIn = Date.now();
			return;
		}
	}

	private async _cleanUpCache(): Promise<void> {
		this._store.forEach(async (value, key) => {
			if (this._shouldRemoveFromCache(value)) {
				this._store.delete(key)
				return;
			}

			if (value.expiresIn > this._cacheExpiresAfterMinutes) {
				this._updateCache(key, value);
			}
		});
	}

	async read<Type>(entityKey: SerializedCacheKey): Promise<Type[]> {
		const returnValue = this._store.get(entityKey);

		if (returnValue === undefined) {
			await this._addToCache(entityKey)
		}

		return this._store.get(entityKey)?.entities as Type[] ?? [];
	}

	public registerConnector<Type>(connectorId: string, connector: CacheDataConnector<Type>): void {
		this._dataConnectors.set(connectorId, connector)
	}

	public destroy(): void {
		clearInterval(this._cleanUpIntervalId);
		MemoryCache._instance = undefined;
	}
}
