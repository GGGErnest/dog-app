import { expect } from 'chai';
import sinon, { SinonFakeTimers, SinonStubbedInstance } from 'sinon';
import { BreedDataConnector } from '../../../models/breeds-data-connector';
import { Settings } from '../../../types/app-settings';
import { Breed } from '../../../types/breed';
import { AllValue } from '../../../types/interfaces/model';
import { converPageAndPageSizeToStartAndEndFormat } from '../../../utils/model-utils';
import { SortDir } from '../types/cache-data-connectors';
import { MemoryCache } from './memory-cache';
import { serializeCacheKey } from '../utils/utils';
import { RetrieveRange } from '../../../types/interfaces/breed-data-connector';

function createCacheKey(entityId = 'breed', page = 1, pageSize = 10, sortBy = 'id', sortDir: SortDir = 'desc') {
	const params = converPageAndPageSizeToStartAndEndFormat(page, pageSize);
	const action: RetrieveRange = {
		sort: sortBy as keyof Breed,
		sortDir,
		start: params[0],
		end: params[1]
	};

	return serializeCacheKey(entityId, action);
}
describe('MemoryCache', () => {

	let cache: MemoryCache;
	let dataConnector: SinonStubbedInstance<BreedDataConnector>;
	let clock: SinonFakeTimers;

	const entityId = 'breed';
	const page = 1;
	const pageSize = 10;
	const sortBy = 'id';
	const sortDir = 'desc';

	// configuring settings for the MemoryCache 
	const cacheCleaningFrequency = 1000;
	const cacheLimit = 2;
	const cacheExpiresAfterMinutes = 3 * 60;
	const cacheOldItemsThresholdHours = 1;


	beforeEach(() => {
		clock = sinon.useFakeTimers({ shouldClearNativeTimers: true, now: Date.now() });
		dataConnector = sinon.createStubInstance(BreedDataConnector);
		cache = MemoryCache.getInstance(cacheExpiresAfterMinutes, cacheLimit, cacheOldItemsThresholdHours, cacheCleaningFrequency);
	})

	afterEach(() => {
		cache.destroy();
		clock.restore();
	})

	it('should create an instance using its constructor', () => {
		expect(cache).to.exist;
	})


	describe('registerConnector', () => {
		it('should register a DataConnector', async () => {
			cache.registerConnector(entityId, dataConnector);
			const cacheId = createCacheKey(entityId);
			await cache.read(cacheId);
			sinon.assert.calledOnce(dataConnector.read);
		})
	})

	describe('read', () => {
		beforeEach(() => {
			cache.registerConnector(entityId, dataConnector);
		})

		it('remove items that expired and try to retrieve them again from the connector', async () => {
			const cacheId = createCacheKey(entityId, page, pageSize, sortBy, sortDir);
			const mockData: AllValue<Breed> = {
				data: [
					{ id: 'akita', subbreeds: [], },
					{ id: 'appenzeller', subbreeds: [], },
					{
						id: 'australian', subbreeds: [
							{ id: 'kelpie' },
							{ id: 'shepherd' },
						],
					},
					{
						id: 'bakharwal', subbreeds: [
							{ id: 'indian' },
						],
					}
				],
				total: 59
			};

			dataConnector.read.resolves(mockData)
			await cache.read(cacheId);

			// fast forward 3 hours since is the defined expired period for an element in the cache
			clock.tick('03:00:00');
			// waiting for the cleanUp interval to finish
			clock.tick(Settings.cache.cleaningFrequencyMs);

			sinon.assert.calledTwice(dataConnector.read);
		})

		it('remove elements older than two hours from the cache if its limit was reached', async () => {
			const createMockData = (id: string): AllValue<Breed> => ({
				data: [{ id, subbreeds: [] }],
				total: 1
			});

			const mockData1 = createMockData('akita');
			const mockData2 = createMockData('beagle');
			const mockData3 = createMockData('collie');

			dataConnector.read.onFirstCall().resolves(mockData1);
			dataConnector.read.onSecondCall().resolves(mockData2);
			dataConnector.read.onThirdCall().resolves(mockData3);

			// add first item to cache
			await cache.read(createCacheKey(entityId, 1));
			expect(dataConnector.read.callCount).to.equal(1);

			// move time forward by 1 hour
			clock.tick('01:00:00');

			// add second item to cache
			await cache.read(createCacheKey(entityId, 2));
			expect(dataConnector.read.callCount).to.equal(2);

			// move time forward by 1.5 hours (now 2.5 hours from start)
			clock.tick('01:30:00');

			// add third item to cache, this should trigger removal of old items
			await cache.read(createCacheKey(entityId, 3));
			expect(dataConnector.read.callCount).to.equal(3);

			// wait for cache cleaning interval
			clock.tick(Settings.cache.cleaningFrequencyMs + 1000);

			// try to read the first item again, it should have been removed and require a new fetch
			await cache.read(createCacheKey(entityId, 1));
			expect(dataConnector.read.callCount).to.equal(4);

			// the second item should still be in cache and no additional call to the connector
			await cache.read(createCacheKey(entityId, 2));
			expect(dataConnector.read.callCount).to.equal(4); // 

			// the third item should be in cache and no additional call to the connector
			await cache.read(createCacheKey(entityId, 3));
			expect(dataConnector.read.callCount).to.equal(4);
		})

		it('should handle range requests correctly', async () => {
			const mockData: AllValue<Breed> = {
				data: [{ id: 'akita', subbreeds: [] }, { id: 'beagle', subbreeds: [] }],
				total: 2
			};

			dataConnector.read.resolves(mockData);
			const cacheKey = createCacheKey(entityId);
			const result = await cache.read(cacheKey);
			expect(result).to.deep.equal(mockData);
			expect(dataConnector.read.calledOnce).to.be.true;
		});

		it('should handle errors from data connector', async () => {
			dataConnector.read.rejects(new Error('Database error'));

			const cacheKey = createCacheKey(entityId);

			try {
				await cache.read(cacheKey);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				expect(error).to.equal(`Error in the Data connector associated to the entity ${entityId}`);
			}
		});
	})

});


