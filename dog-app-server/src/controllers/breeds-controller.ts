import { BreedModel } from '../models/breed-model';
import { Breed } from '../types/breed';
import { SortDir } from '../types/data';
import { Controller } from '../types/interfaces/controler';
import { GetAllReturValue } from '../types/interfaces/model';

export class BreedController implements Controller<Breed> {
	private readonly _breedModel = new BreedModel();

	public async findAllWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<GetAllReturValue<Breed> | null> {
		try {
			return await this._breedModel.allWithPagination(page, pageSize, sort, sortDir);

		} catch (error) {
			//TODO: error handling here please
			return null;
		}
	}

	public async getById(breedId: string): Promise<Breed | null> {
		try {
			return await this._breedModel.get(breedId);
		} catch (error) {
			//TODO: error handling here please
			return null;
		}
	}
}
