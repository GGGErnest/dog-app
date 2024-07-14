import express, { Request, Response } from 'express';
import { BreedController } from '../controllers/breeds-controller';

export class BreedsRoutes {
	private _breedController = new BreedController();
	baseUrl = '/breeds';


	constructor(public router = express.Router()) {
		this._registerRoutes();
	}

	private _registerRoutes(): void {
		this.router.get('/list/all', (req: Request, res: Response) =>
			this._breedController.getAll(req, res)
		);
		this.router.get('/detail/:id', (req: Request, res: Response) => this._breedController.get(req, res));
	}
}

