import { expect } from 'chai';
import sinon from 'sinon';
import { BreedDataConnector } from '../dist/models/breeds-data-connector';
import { MemoryCache } from '../dist/models/memory-cache';
import { serializeMemoryCacheRangeRequestKey } from '../dist/utils/model-utils';

describe('MemoryCache', () => {

	let cache: MemoryCache;
	const entityId = 'breeds';

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
	it('remove oldest and less used items from the cache if its limit was reached')
	it('')

	it('calling "retrive" will cache the values for the specific request if not present in the cache', () => {

	})
});
