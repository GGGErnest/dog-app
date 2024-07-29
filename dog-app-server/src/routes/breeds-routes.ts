import express, { Request, Response } from 'express';
import { BreedController } from '../controllers/breeds-controller';
import { SortDir } from '../types/data';
import { Settings } from '../types/app-settings';
import { ServerResponse } from '../types/interfaces/response';
import { Breed } from '../types/breed';
import { AllValue } from '../types/interfaces/model';

export class BreedsRoutes {
	private readonly _breedController = new BreedController();

	constructor(public router = express.Router(), private readonly _defaultPaginationSize = Settings.defaultPaginationSize,
    private readonly _defaultSortDir = Settings.defaultSortDir
	) {
		this._registerRoutes();
	}

	private async getAllWithPagination(req: Request, res: Response): Promise<void> {
		const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
		const pageSize = req.query.size ? parseInt(req.query.size.toString()) : this._defaultPaginationSize;
		const sort = req.query.sort ? req.query.sort.toString() : '';
		const sortDir = req.query.sortDir ? req.query.sortDir : this._defaultSortDir;
		const result = await this._breedController.findAllWithPagination(page, pageSize, sort, sortDir as SortDir);

		const response: ServerResponse<AllValue<Breed>> = {
			result: result ?? { data: [], total: 0 }
		}

		res.send(response).status(200)
	}

	private async getById(req: Request, res: Response): Promise<void> {
		const breedId = req.params.id;

		if (breedId === null) {
			res.send({ result: [], error: 'Wrong breed id' }).status(400)
			return;
		}

		const result = await this._breedController.getById(breedId);
		const response: ServerResponse<Breed> = {
			result
		}

		res.send(response).status(200)
	}

	private _registerRoutes(): void {
		this.router.get('/list/all', this.getAllWithPagination.bind(this));
		this.router.get('/detail/:id', this.getById.bind(this));
	}
}

