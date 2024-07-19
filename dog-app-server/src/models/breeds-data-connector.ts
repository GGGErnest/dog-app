import { Breed, Subbreed } from '../types/breed';
import { ConsoleLogger } from '../types/console-logger';
import { SortDir } from '../types/data';
import { DataConnector } from '../types/interfaces/cache-data-connectors';
import { Logger } from '../types/interfaces/logger';
import { AllValue } from '../types/interfaces/model';
import { isPromiseSettledResultFulfilled } from '../utils/type-guards';


export type AllBreedsResponse = {
  message: {
    [key: string]: string[]
  }
  status: string;
};

export type AllSubBreedsResponse = {
  message: string[]
  status: string;
}

export type SubbreedImagesResponse = {
  message: string[],
  status: string,
}

export function parseAllSubBreedsResponse(response: AllBreedsResponse): Breed[] {
	const breeds: Breed[] = [];
	Object.keys(response.message).forEach((breed: string) => {
		const subbreeds: Subbreed[] = response.message[breed].map<Subbreed>((id: string) => { return { id } });
		breeds.push({ id: breed, subbreeds })
	});

	return breeds;

}

function applySort(first: Breed, second: Breed, sortByKey: 'id', sortDir: SortDir) {
	return breedsComparation(first.id, second.id, sortDir)
}

function breedsComparation(first: string, second: string, sortDir: string): number {
	if (sortDir === 'asc') {
		return first.toLowerCase() < second.toLowerCase() ? 1 : -1;
	}
	return first.toLowerCase() < second.toLowerCase() ? -1 : 1;
}

export class BreedDataConnector implements DataConnector {
	private readonly _baseUrl = 'https://dog.ceo/api/';
	private readonly _defaultAmountOfImagesToRetrive = 20;
	constructor(private readonly _httpClient = fetch, private readonly _logger: Logger = ConsoleLogger.instance) {

	}

	private async _getBreedImages(breed: string, subbreed?: string): Promise<string[]> {
		let images: string[] = [];
		const url = subbreed ? `${this._baseUrl}breed/${breed}/${subbreed}/images/random/${this._defaultAmountOfImagesToRetrive}` : `${this._baseUrl}breed/${breed}/images/random/${this._defaultAmountOfImagesToRetrive}`;

		try {

			const response = await this._httpClient(url);

			if (response.ok) {
				const result: SubbreedImagesResponse = await response.json() as SubbreedImagesResponse;
				if (result.status === 'success') {
					// There is a weird case in the Dog API that if a breed doesn't have any subbreed it will return a single 
					// image from the breed but not in an array
					images = Array.isArray(result.message) ? result.message : [result.message];
				}
			}

		} catch (error) {
			// TODO: add error handling here, log the error with the logger, something
			this._logger.error('BreedDataConnector _getBreedImages', error);
		}

		return images;
	}

	public async getRange(start: number, end: number, _sortByKey: keyof Breed, sortDir: SortDir): Promise<AllValue<Breed> | undefined> {
		const url = `${this._baseUrl}breeds/list/all`;

		try {
			const response = await this._httpClient(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllBreedsResponse;

			if (result.status === 'success') {
				const breedsInTheRange: AllValue<Breed> = { data: [], total: 0 };
				const breeds = parseAllSubBreedsResponse(result);

				breedsInTheRange.data = breeds.sort((first: Breed, second: Breed) => applySort(first, second, 'id', sortDir))
					.filter((_value, index) => index >= start && index <= end);

				breedsInTheRange.total = breeds.length;

				return breedsInTheRange;
			}

			return undefined;

		} catch (error) {

			return undefined;
		}
	}

	public async getSingle(id: string): Promise<Breed | undefined> {
		const url = `${this._baseUrl}breed/${id}/list`;

		try {
			const response = await this._httpClient(url);
			if (!response.ok) {
				return undefined;
			}

			const result = (await response.json()) as AllSubBreedsResponse;

			if (result.status === 'success') {
				const breed: Breed = {
					id: id,
				};

				if (result.message.length > 0) {
					const subbreedsPromises = result.message.map(async (subbreed) => {
						const imagesUrl = await this._getBreedImages(id, subbreed);
						return { id: subbreed, subbreeds: subbreed, imagesUrl } as Subbreed;
					});

					const subbreedsPromiseSettled = await Promise.allSettled(subbreedsPromises);

					const fulfilledPromises = subbreedsPromiseSettled.filter(isPromiseSettledResultFulfilled);
					const subbreeds = fulfilledPromises.map<Subbreed>((settledPromised) => settledPromised.value);
					breed.subbreeds = subbreeds;
					return breed;
				}

				const breedImages = await this._getBreedImages(id);
				breed.imagesUrl = breedImages;

				return breed;
			}

			return undefined;
		} catch (error) {
			return undefined;
		}
	}

}
