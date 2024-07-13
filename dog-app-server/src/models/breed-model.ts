import { Breed } from '../types/breed';
import { SortDir } from '../types/data';
import { Cache } from '../types/interfaces/cache';
import { GetAllReturValue, Model } from '../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat, serializeMemoryCacheIdRequestkey, serializeMemoryCacheRangeRequestKey } from '../utils/model-utils';
import { BreedDataConnector } from './breeds-data-connector';
import { MemoryCache } from './memory-cache';


export class BreedModel implements Model<Breed> {
	private readonly _entityId = 'breed';
	private readonly _dataConnector = new BreedDataConnector();

	constructor(private _cache: Cache = MemoryCache.instance) {
		this._cache.registerConnector(this._entityId, this._dataConnector)
	}

	async getRange(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<GetAllReturValue<Breed>> {
		const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
		const cacheId = serializeMemoryCacheRangeRequestKey(this._entityId, params[0], params[1], sort, sortDir);
		const returnValue = await this._cache.read(cacheId);

		console.log('BreedModel getAll', cacheId, returnValue);
		return returnValue as GetAllReturValue<Breed> ?? { data: [], total: 0 }
	}

	async get(id: string): Promise<Breed | null> {
		const cacheId = serializeMemoryCacheIdRequestkey(this._entityId, id);
		const returnValue = await this._cache.read(cacheId);
		return returnValue as Breed ?? null;
	}

}
