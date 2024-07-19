import { Breed } from '../types/breed';
import { ConsoleLogger } from '../types/console-logger';
import { SortDir } from '../types/data';
import { Cache } from '../types/interfaces/cache';
import { DataConnector } from '../types/interfaces/cache-data-connectors';
import { Logger } from '../types/interfaces/logger';
import { AllValue, EMPTY_ALL_VALUE, EMPTY_GET_VALUE, Model } from '../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat, serializeMemoryCacheIdRequestkey, serializeMemoryCacheRangeRequestKey } from '../utils/model-utils';
import { BreedDataConnector } from './breeds-data-connector';
import { MemoryCache } from './memory-cache';


export class BreedModel implements Model<Breed> {
	private readonly _entityId = 'breed';

	constructor(private readonly _dataConnector: DataConnector = new BreedDataConnector(), private _cache: Cache = MemoryCache.instance,
    private readonly _logger: Logger = ConsoleLogger.instance) {
		this._cache.registerConnector(this._entityId, this._dataConnector)
	}

	async allWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<AllValue<Breed> | typeof EMPTY_ALL_VALUE> {
		const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
		const cacheId = serializeMemoryCacheRangeRequestKey(this._entityId, params[0], params[1], sort, sortDir);
		try {
			const breedsInTheRange = await this._cache.read(cacheId);
			return breedsInTheRange as AllValue<Breed>;
		} catch (error) {
			this._logger.error('BreedModel allWithPagination', error);
			return EMPTY_ALL_VALUE;
		}
	}

	async get(id: string): Promise<Breed | typeof EMPTY_GET_VALUE> {
		const cacheId = serializeMemoryCacheIdRequestkey(this._entityId, id);
		try {
			const breed = await this._cache.read(cacheId);
			return breed as Breed;
		} catch (error) {
			this._logger.error('BreedModel allWithPagination', error);
			return EMPTY_GET_VALUE;
		}
	}

}
