import { BreedModel } from '../models/breed-model';
import { Breed } from '../types/breed';
import { ConsoleLogger } from '../types/console-logger';
import { SortDir } from '../types/data';
import { Controller } from '../types/interfaces/controler';
import { Logger } from '../types/interfaces/logger';
import { AllValue } from '../types/interfaces/model';

export class BreedController implements Controller<Breed> {

	constructor(private readonly _breedModel = new BreedModel(), private readonly _logger: Logger = ConsoleLogger.instance) {
	}

	public async findAllWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<AllValue<Breed> | null> {
		try {
			return await this._breedModel.allWithPagination(page, pageSize, sort, sortDir);
		} catch (error) {
			this._logger.error('BreedController findAllWithPagination', error);
			return null;
		}
	}

	public async getById(breedId: string): Promise<Breed | null> {
		try {
			return await this._breedModel.get(breedId);
		} catch (error) {
			this._logger.error('BreedController getById', error);
			return null;
		}
	}
}
