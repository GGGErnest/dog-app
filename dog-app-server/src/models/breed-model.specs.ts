import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { BreedModel } from '../../dist/models/breed-model';
import { BreedDataConnector } from '../../dist/models/breeds-data-connector';
import { MemoryCache } from '../../dist/models/memory-cache';
import { ConsoleLogger } from '../../dist/types/console-logger';
import { Logger } from '../../dist/types/interfaces/logger';
import { EMPTY_ALL_VALUE } from '../../dist/types/interfaces/model.js';
import { serializeMemoryCacheIdRequestkey } from '../../dist/utils/model-utils';
import { createCacheKey } from './memory-cache.specs';

describe('BreedsModel', () => {

	let breedsModel: BreedModel;
	let cacheStub: SinonStubbedInstance<MemoryCache>;
	let dataConnectorStub: SinonStubbedInstance<BreedDataConnector>;
	let loggerStub: SinonStubbedInstance<Logger>;
	const entityId = 'breed';
	const page = 1;
	const pageSize = 10;
	const sortBy = 'id';
	const sortDir = 'desc';
	const id = '1';


	beforeEach(() => {
		cacheStub = sinon.createStubInstance(MemoryCache);
		dataConnectorStub = sinon.createStubInstance(BreedDataConnector);
		loggerStub = sinon.createStubInstance(ConsoleLogger);
		breedsModel = new BreedModel(dataConnectorStub, cacheStub, loggerStub);
	})

	it('should create an instance using its constructor', () => {
		expect(breedsModel, 'example should exist').to.exist;
	});

	describe('findAllWithPagination', () => {

		it('calls the findAllWithPagination method in the cache', () => {
			breedsModel.allWithPagination(page, pageSize, sortBy, sortDir);
			const cacheId = createCacheKey(entityId);
			sinon.assert.calledOnceWithExactly(cacheStub.read, cacheId);
		});

		it('logs any error from the cache', async () => {
			cacheStub.read.rejects();
			await breedsModel.allWithPagination(page, pageSize, sortBy, sortDir);
			sinon.assert.calledOnce(loggerStub.error);
		})

		it('returns a default response in case of an error', async () => {
			cacheStub.read.rejects();
			const resut = await breedsModel.allWithPagination(page, pageSize, sortBy, sortDir);
			expect(resut).equal(EMPTY_ALL_VALUE);
		})
	})

	describe('get', () => {

		it('calls the method read in the cache', async () => {
			const cacheId = serializeMemoryCacheIdRequestkey('breed', id);
			await breedsModel.get(id);
			sinon.assert.calledOnceWithExactly(cacheStub.read, cacheId)
		});

		it('returns null in case of an error', async () => {
			cacheStub.read.rejects();
			const resut = await breedsModel.get(id);
			expect(resut).equal(null);
		})

		it('logs any error from the model', async () => {
			cacheStub.read.rejects();
			await breedsModel.get(id);
			sinon.assert.calledOnce(loggerStub.error);
		})
	})
});

