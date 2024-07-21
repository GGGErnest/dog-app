import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { MemoryCache } from '../../dist/features/cache';
import { BreedModel } from '../../dist/models/breed-model';
import { BreedDataConnector } from '../../dist/models/breeds-data-connector';
import { ConsoleLogger } from '../../dist/types/console-logger';
import { Logger } from '../../dist/types/interfaces/logger';
import { EMPTY_ALL_VALUE } from '../../dist/types/interfaces/model';

describe('BreedsModel', () => {

	let breedsModel: BreedModel;
	let cacheStub: SinonStubbedInstance<MemoryCache>;
	let dataConnectorStub: SinonStubbedInstance<BreedDataConnector>;
	let loggerStub: SinonStubbedInstance<Logger>;
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

