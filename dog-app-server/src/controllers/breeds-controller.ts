import { Request, Response } from 'express';
import { BreedModel } from '../models/breed-model';
import { Controller } from '../types/interfaces/controler';
import { Settings } from '../types/interfaces/settings';
import { ServerResponse } from '../types/interfaces/response';
import { Breed } from '../types/breed';

export class BreedController implements Controller {
	private readonly _breedMode = new BreedModel();
	private readonly _defaultPaginationSize = Settings.defaultPaginationSize;
	private readonly _defaultPage = 1;

	public async getAll(req: Request, resp: Response): Promise<void> {
		const page = req.query.page ? parseInt(req.query.page.toString()) : this._defaultPage;
		const pageSize = req.query.size ? parseInt(req.query.size.toString()) : this._defaultPaginationSize;
		const result = await this._breedMode.getAll(page, pageSize);

		console.log('Breeds getAll', page, pageSize);
		console.log('Breeds All endpoint hit:', result)

		const response: ServerResponse<Breed> = {
			result
		}

		resp.send(response).status(200)
	}

	public async get(req: Request, resp: Response): Promise<void> {
		const breedId = req.params.id;

		if (breedId === null) {
			resp.send({ result: [], error: 'Wrong breed id' }).status(400)
		}

		const result = await this._breedMode.get(breedId);
		const response: ServerResponse<Breed> = {
			result: result
		}

		resp.send(response).status(200)

	}

}
