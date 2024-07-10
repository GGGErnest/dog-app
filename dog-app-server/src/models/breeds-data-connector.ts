import { Breed } from '../types/breed';
import { CacheDataConnector } from '../types/interfaces/cache-data-connectors';

export class BreedDataConnector implements CacheDataConnector<Breed> {
	public async retrive(amountOfItems: number): Promise<Breed[]> {
		throw new Error('Method not implemented.');
	}

}
