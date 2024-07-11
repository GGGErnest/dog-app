import { Breed } from '../types/breed';
import { CacheKey, isMemoryCacheIdRequestkey, isMemoryCacheRangeRequestKey, MemoryCacheIdRequestkey, MemoryCacheRangeRequestKey } from '../types/interfaces/cache';
import { CacheDataConnector } from '../types/interfaces/cache-data-connectors';

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


export class BreedDataConnector implements CacheDataConnector<Breed> {
	private readonly _baseUrl = 'https://dog.ceo/api/';

	private async getAllBreeds(cacheKey: MemoryCacheRangeRequestKey): Promise<Breed[] | undefined> {
		const url = `${this._baseUrl}breeds/list/all`;

		try {
			const response = await fetch(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllBreedsResponse;

			if (result.status === 'success') {
				const returnValue: Breed[] = [];
				Object.keys(result.message).filter((_value, index) => index >= cacheKey.start && index <= cacheKey.end).forEach((breed) => {
					const subbreeds = result.message[breed];
					if (subbreeds.length > 0) {
						subbreeds.forEach((subbreed) => {
							returnValue.push({ breed, subbreed })
						});
						return;
					}

					returnValue.push({ breed })
				});

				return returnValue;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}

	private async getBreedById(cacheKey: MemoryCacheIdRequestkey): Promise<Breed[] | undefined> {
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

					return [returnValue];
				}


				return undefined;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}


	public async retrive(memoryCacheKey: CacheKey): Promise<Breed[] | undefined> {
		if (isMemoryCacheIdRequestkey(memoryCacheKey)) {
			return this.getBreedById(memoryCacheKey);
		}

		if (isMemoryCacheRangeRequestKey(memoryCacheKey)) {
			return this.getAllBreeds(memoryCacheKey);
		}

		return undefined;
	}

}
