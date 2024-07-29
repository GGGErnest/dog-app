import { BreedModel } from '../models/breed-model';
import { Breed } from '../types/breed';
import { SortDir } from '../types/data';
import { Controller } from '../types/interfaces/controler';
import { AllValue } from '../types/interfaces/model';

export class BreedController implements Controller<Breed> {

	constructor(private readonly _breedModel = new BreedModel()) {
	}

	public async findAllWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<AllValue<Breed> | null> {
		return await this._breedModel.allWithPagination(page, pageSize, sort, sortDir);
	}

	public async getById(breedId: string): Promise<Breed | null> {
		return await this._breedModel.get(breedId);
	}
}
