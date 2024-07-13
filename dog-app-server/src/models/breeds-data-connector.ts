import { Breed } from '../types/breed';
import { SortDir } from '../types/data';
import { CacheDataConnector } from '../types/interfaces/cache-data-connectors';
import { GetAllReturValue } from '../types/interfaces/model';

type AllBreedsResponse = {
  message: {
    [key: string]: string[]
  }
  status: string;
};

type AllSubBreedsResponse = {
  message: string[]
  status: string;
}

function parseAllSubBreedsResponse(response: AllBreedsResponse): Breed[] {
	const breeds: Breed[] = [];
	Object.keys(response.message).forEach((breed: string) => {
		const subbreeds = response.message[breed];
		if (subbreeds.length > 0) {
			subbreeds.forEach((subbreed: string) => {
				breeds.push({ breed, subbreed })
			});
			return;
		}

		breeds.push({ breed })
	});

	return breeds;

}

function applySort(first: Breed, second: Breed, sortByKey: keyof Breed, sortDir: SortDir) {
	if (first[sortByKey] !== undefined && second[sortByKey] !== undefined) {
		const firstBreed = first[sortByKey].toLowerCase();
		const secondBreed = second[sortByKey].toLowerCase();
		return breedsComparation(firstBreed, secondBreed, sortDir)
	}
	return breedsComparation(first.breed, second.breed, sortDir)
}

function breedsComparation(first: string, second: string, sortDir: string): number {
	if (sortDir === 'asc') {
		return first.toLowerCase() < second.toLowerCase() ? 1 : -1;
	}
	return first.toLowerCase() < second.toLowerCase() ? -1 : 1;
}

export class BreedDataConnector implements CacheDataConnector {
	private readonly _baseUrl = 'https://dog.ceo/api/';

	public async getRange(start: number, end: number, sortByKey: keyof Breed, sortDir: SortDir): Promise<GetAllReturValue<Breed> | undefined> {
		const url = `${this._baseUrl}breeds/list/all`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllBreedsResponse;
			console.log('Start and end', start, end);

			if (result.status === 'success') {
				const returnValue: GetAllReturValue<Breed> = { data: [], total: 0 };
				const breeds = parseAllSubBreedsResponse(result);

				returnValue.data = breeds.sort((first: Breed, second: Breed) => applySort(first, second, sortByKey, sortDir))
					.filter((_value, index) => index >= start && index <= end);

				returnValue.total = breeds.length;

				return returnValue;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}

	public async getSingle(id: string): Promise<Breed | undefined> {
		const url = `${this._baseUrl}breed/${id}/list`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllSubBreedsResponse;

			if (result.status === 'success') {
				const subbreed = result.message.find((value) => value === id);

				if (subbreed) {
					const returnValue: Breed = {
						breed: id,
						subbreed
					}

					return returnValue;
				}

				return undefined;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}

}
