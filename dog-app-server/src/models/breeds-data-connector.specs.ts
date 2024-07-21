import { assert, expect } from 'chai';
import sinon, { SinonStub, SinonStubbedInstance } from 'sinon';
import { BreedDataConnector } from '../../dist/models/breeds-data-connector';
import { Breed } from '../../dist/types/breed.js';
import { ConsoleLogger } from '../../dist/types/console-logger';
import { DataConnector } from '../../dist/features/cache';
import { Logger } from '../../dist/types/interfaces/logger';
import { AllValue } from '../../dist/types/interfaces/model';
import { fakeFetchResponse, MOCK_DATA_RESPONSE } from './data-connector-test-data';

describe('BreedDataConnector', () => {

	let dataConnector: DataConnector;
	let httpClientStub: SinonStub;
	let loggerStub: SinonStubbedInstance<Logger>;

	beforeEach(() => {
		httpClientStub = sinon.stub();
		loggerStub = sinon.createStubInstance(ConsoleLogger);
		dataConnector = new BreedDataConnector(httpClientStub, loggerStub);
	})

	it('should create an instance using its constructor', () => {
		expect(dataConnector, 'example should exist').to.exist;
	});

	describe('getRange', () => {

		it('returns a list of objects from the selected range and the total amount of objects in the server or DB', async () => {
			httpClientStub.resolves(fakeFetchResponse(MOCK_DATA_RESPONSE));
			const result = await dataConnector.getRange(3, 6, 'id', 'desc');
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

			assert.deepEqual(result, mockData)
		});

		it('returns undefined in case of a http error', async () => {
			httpClientStub.rejects();
			const result = await dataConnector.getRange(3, 6, 'id', 'desc');
			assert.equal(result, undefined);
		})

		it('returns undefined in case of the response "ok" property is false', async () => {
			httpClientStub.resolves({ ok: false });
			const result = await dataConnector.getRange(3, 6, 'id', 'desc');
			assert.equal(result, undefined);
		})

		it('returns undefined if the response from the server was not successful', async () => {
			// creating a shallow copy of the MockData so changing the status property won't affect other tests
			const clonedMockData: Partial<typeof MOCK_DATA_RESPONSE> = {};
			Object.assign(clonedMockData, MOCK_DATA_RESPONSE)
			clonedMockData.status = 'failed';

			httpClientStub.resolves(fakeFetchResponse(clonedMockData));
			const result = await dataConnector.getRange(3, 6, 'id', 'desc');
			assert.deepEqual(result, undefined);
		})

		it('the results are sorted correctly depending of othe sort direction', async () => {
			httpClientStub.resolves(fakeFetchResponse(MOCK_DATA_RESPONSE));
			const result = await dataConnector.getRange(0, 2, 'id', 'asc');
			const mockData: AllValue<Breed> = {
				data: [
					{
						id: 'mudhol', subbreeds: [
							{ id: 'indian' },
						],
					},
					{
						id: 'mountain', subbreeds: [
							{ id: 'bernese' },
							{ id: 'swiss' },
						],
					},
					{ id: 'mix', subbreeds: [], },
				],
				total: 59
			};

			assert.deepEqual(result, mockData)

			const result2 = await dataConnector.getRange(0, 2, 'id', 'desc');
			const mockData2: AllValue<Breed> = {
				data: [
					{
						id: 'affenpinscher', subbreeds: [
						],
					},
					{
						id: 'african', subbreeds: [
						],
					},
					{ id: 'airedale', subbreeds: [], },
				],
				total: 59
			};
			assert.deepEqual(result2, mockData2)
		})
	})
});

