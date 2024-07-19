import { expect } from 'chai';
import sinon, { SinonStubbedInstance } from 'sinon';
import { BreedController } from '../../dist/controllers/breeds-controller';
import { BreedModel } from '../../dist/models/breed-model';
import { Logger } from '../../dist/types/interfaces/logger';
import { ConsoleLogger } from '../../dist/types/console-logger.js';

describe('BreedsController', () => {

	let breedsController: BreedController;
	let breedModelStub: SinonStubbedInstance<BreedModel>;
	let loggerStub: SinonStubbedInstance<Logger>;
	const page = 1;
	const pageSize = 10;
	const sortBy = 'id';
	const sortDir = 'desc';
	const id = '1';


	beforeEach(() => {
		loggerStub = sinon.createStubInstance(ConsoleLogger)
		breedModelStub = sinon.createStubInstance(BreedModel);
		breedsController = new BreedController(breedModelStub, loggerStub);
	})

	it('should create an instance using its constructor', () => {
		expect(breedsController, 'example should exist').to.exist;
	});

	describe('findAllWithPagination', () => {

		it('calls the findAllWithPagination method in the model', () => {
			breedsController.findAllWithPagination(page, pageSize, sortBy, sortDir);
			sinon.assert.calledOnceWithExactly(breedModelStub.allWithPagination, page, pageSize, sortBy, sortDir)
		});

		it('logs any error from the model', async () => {
			breedModelStub.allWithPagination.rejects();
			await breedsController.findAllWithPagination(page, pageSize, sortBy, sortDir);
			sinon.assert.calledOnce(loggerStub.error);
		})

		it('returns null in case of an error', async () => {
			breedModelStub.allWithPagination.rejects();
			const resut = await breedsController.findAllWithPagination(page, pageSize, sortBy, sortDir);
			expect(resut).equal(null);
		})
	})

	describe('getById', () => {

		it('calls the method get in the model', async () => {
			const id = '1';
			await breedsController.getById(id);
			sinon.assert.calledOnceWithExactly(breedModelStub.get, id)
		});

		it('returns null in case of an error', async () => {
			breedModelStub.get.rejects();
			const resut = await breedsController.getById(id);
			expect(resut).equal(null);
		})

		it('logs any error from the model', async () => {
			breedModelStub.get.rejects();
			await breedsController.getById(id);
			sinon.assert.calledOnce(loggerStub.error);
		})
	})
});
