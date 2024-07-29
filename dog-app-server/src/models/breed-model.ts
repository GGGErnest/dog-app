import { Cache, MemoryCache, serializeCacheKey } from '../features/cache/index';
import { Breed } from '../types/breed';
import { ConsoleLogger } from '../types/console-logger';
import { SortDir } from '../types/data';
import { RetrieveRange } from '../types/interfaces/breed-data-connector';
import { AllValue, EMPTY_ALL_VALUE, EMPTY_GET_VALUE, Model } from '../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat } from '../utils/model-utils';

export class BreedModel implements Model<Breed> {
	public static readonly entityId = 'DogsAPI';

	constructor(private readonly _cache: Cache = MemoryCache.getInstance(), private readonly _logger = ConsoleLogger.instance) {
	}

	async allWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<AllValue<Breed> | typeof EMPTY_ALL_VALUE> {
		const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
		const action: RetrieveRange = {
			sort: sort as keyof Breed,
			sortDir,
			start: params[0],
			end: params[1]
		};
		const cacheId = serializeCacheKey(BreedModel.entityId, action);
		try {
			const breedsInTheRange = await this._cache.read(cacheId);
			return breedsInTheRange as AllValue<Breed>;
		} catch (error) {
			this._logger.error('BreedModel allWithPagination', error);
			return EMPTY_ALL_VALUE;
		}
	}

	async get(id: string): Promise<Breed | typeof EMPTY_GET_VALUE> {
		const cacheId = serializeCacheKey(BreedModel.entityId, { id });
		try {
			const breed = await this._cache.read(cacheId);
			return breed as Breed;
		} catch (error) {
			this._logger.error('BreedModel allWithPagination', error);
			return EMPTY_GET_VALUE;
		}
	}
}
