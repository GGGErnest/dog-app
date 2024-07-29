import { CacheKey } from '../types/cache';
import { DataConnectorAction } from '../types/cache-data-connectors';

export function serializeCacheKey(entityId: string, action: DataConnectorAction): string {
	const entityKey: CacheKey = {
		entityId: entityId,
		action
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

