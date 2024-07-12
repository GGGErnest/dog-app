import { Breed } from '../types/breed';
import { Cache } from '../types/interfaces/cache';
import { Model } from '../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat, serializeMemoryCacheIdRequestkey, serializeMemoryCacheRangeRequestKey } from '../utils/model-utils';
import { BreedDataConnector } from './breeds-data-connector';
import { MemoryCache } from './memory-cache';


export class BreedModel implements Model<Breed> {
	private readonly _entityId = 'breed';
	private readonly _dataConnector = new BreedDataConnector();

	constructor(private _cache: Cache = MemoryCache.instance) {
		this._cache.registerConnector(this._entityId, this._dataConnector)
	}

	async getAll(page: number, pageSize: number): Promise<Breed[]> {
		const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
		const cacheId = serializeMemoryCacheRangeRequestKey(this._entityId, ...params);
		const returnValue = await this._cache.read(cacheId);

		console.log('BreedModel getAll', cacheId, returnValue);
		return returnValue as Breed[] ?? [];

	}

	async get(id: string): Promise<Breed[]> {
		const cacheId = serializeMemoryCacheIdRequestkey(this._entityId, id);
		const returnValue = await this._cache.read(cacheId);
		return returnValue as Breed[] ?? [];
	}

}
