import { expect } from 'chai';
import sinon from 'sinon';
import { BreedDataConnector } from '../../dist/models/breeds-data-connector';
import { MemoryCache } from '../../dist/models/memory-cache';
import { serializeMemoryCacheRangeRequestKey } from '../../dist/utils/model-utils';
import { Settings } from '../../dist/types/interfaces/settings';

describe('MemoryCache', () => {

	let cache: MemoryCache;
	const entityId = 'breeds';
	Settings.cacheExpiresAfterMinutes = 0.1;
	Settings.cacheLimit = 3;
	Settings.cacheCleaningFrequency = 1;

	beforeEach(() => {
		cache = MemoryCache.cache;
	})

	it('should create an instance using its constructor', () => {
		expect(cache, 'example should exist').to.exist;
	});

	it('should register a DataConnector', async () => {
		const connector = sinon.createStubInstance(BreedDataConnector);
		cache.registerConnector(entityId, connector as unknown as BreedDataConnector);

		const entityKey = serializeMemoryCacheRangeRequestKey(entityId, 1, 10);
		await cache.read(entityKey)

		sinon.assert.calledOnce(connector.retrive)
	})

	it('remove items that expired and try to retrieve them again from the connector')
	it(`executes the cache clean up every ${Settings.cacheCleaningFrequency} ms`)
	it('remove elements older than two hours from the cache if its limit was reached')
	it('remove elements with low usage(less than 10 times) from the cache if its limit was reached')
	it('retrives data from the connector if it does not exist in the cache')
	it('returns the cached data')
	it('returns empty array in case there is nothing in the cache nor could be retrieved from the connector')
	it('returns an array for range and single requests to the cache')
	it('calling destroy will stop the cleanUp interval execution and set to undefined the Cache')
});
