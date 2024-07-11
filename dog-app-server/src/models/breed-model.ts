import { Breed } from '../types/breed';
import { Model } from '../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat, serializeMemoryCacheIdRequestkey, serializeMemoryCacheRangeRequestKey } from '../utils/model-utils';
import { MemoryCache } from './memory-cache';


export class BreedModel implements Model<Breed> {
	private readonly _entityId = 'breed';
	private readonly _cache = MemoryCache.cache;

	async getAll(page: number, pageSize: number): Promise<Breed[]> {
		const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
		const cacheId = serializeMemoryCacheRangeRequestKey(this._entityId, ...params);
		const returnValue = await this._cache.read(cacheId);
		return returnValue as Breed[] ?? [];

	}

	async get(id: string): Promise<Breed[]> {
		const cacheId = serializeMemoryCacheIdRequestkey(this._entityId, id);
		const returnValue = await this._cache.read(cacheId);
		return returnValue as Breed[] ?? [];
	}

}
