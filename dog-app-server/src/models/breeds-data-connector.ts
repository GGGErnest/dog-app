import { Breed } from '../types/breed';
import { CacheKey, isMemoryCacheIdRequestkey, isMemoryCacheRangeRequestKey, MemoryCacheIdRequestkey, MemoryCacheRangeRequestKey } from '../types/interfaces/cache';
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

export class BreedDataConnector implements CacheDataConnector {
	private readonly _baseUrl = 'https://dog.ceo/api/';

	private async getAllBreeds(cacheKey: MemoryCacheRangeRequestKey): Promise<GetAllReturValue<Breed> | undefined> {
		const url = `${this._baseUrl}breeds/list/all`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllBreedsResponse;
			console.log('Start and end', cacheKey.start, cacheKey.end);

			if (result.status === 'success') {
				// TODO: This parsing could be extracted to a function
				const returnValue: GetAllReturValue<Breed> = { data: [], total: 0 };
				const breeds: Breed[] = [];
				Object.keys(result.message).forEach((breed) => {
					const subbreeds = result.message[breed];
					if (subbreeds.length > 0) {
						subbreeds.forEach((subbreed) => {
							breeds.push({ breed, subbreed })
						});
						return;
					}

					breeds.push({ breed })
				});


				returnValue.data = breeds.sort((first: Breed, second: Breed) => {
					const sortDirComparation = (first: string, second: string, sortDir: string) => {
						if (sortDir === 'asc') {
							return first.toLowerCase() < second.toLowerCase() ? 1 : -1;
						}
						return first.toLowerCase() < second.toLowerCase() ? -1 : 1;
					};

					const sortByKey = cacheKey.sort as keyof Breed;
					if (first[sortByKey] !== undefined && second[sortByKey] !== undefined) {
						const firstBreed = first[sortByKey].toLowerCase();
						const secondBreed = second[sortByKey].toLowerCase();
						return sortDirComparation(firstBreed, secondBreed, cacheKey.sortDir)
					}

					return sortDirComparation(first.breed, second.breed, cacheKey.sortDir)
				}).filter((_value, index) => index >= cacheKey.start && index <= cacheKey.end);

				returnValue.total = breeds.length;

				return returnValue;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}

	private async getBreedById(cacheKey: MemoryCacheIdRequestkey): Promise<Breed | undefined> {
		const url = `${this._baseUrl}breed/${cacheKey.id}/list`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllSubBreedsResponse;

			if (result.status === 'success') {
				const subbreed = result.message.find((value) => value === cacheKey.id);

				if (subbreed) {
					const returnValue: Breed = {
						breed: cacheKey.id,
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


	public async retrive(memoryCacheKey: CacheKey): Promise<GetAllReturValue<Breed> | Breed | undefined> {
		if (isMemoryCacheIdRequestkey(memoryCacheKey)) {
			return this.getBreedById(memoryCacheKey);
		}

		if (isMemoryCacheRangeRequestKey(memoryCacheKey)) {
			return this.getAllBreeds(memoryCacheKey);
		}

		return undefined;
	}

}
