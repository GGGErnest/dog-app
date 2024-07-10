import { Breed } from '../types/breed';
import { Model } from '../types/interfaces/model';

export class BreedModel implements Model<Breed> {
	getAll(page: number, pageSize: number): Breed[] {
		throw new Error('Method not implemented.');
	}
	get(id: string): Breed {
		throw new Error('Method not implemented.');
	}

}
