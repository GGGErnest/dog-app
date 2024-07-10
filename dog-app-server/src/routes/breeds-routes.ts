import express, { Request, Response, Router } from 'express';
import { BreedController } from '../controllers/breeds-controller';

export class BreedRoutes {
	private readonly _baseUrl = '/breeds';
	private readonly _breedController = new BreedController();

	constructor(public router: Router = express.Router()) {
		this._register();
	}

	private _register(): void {
		this.router.get(this._baseUrl, (req: Request, res: Response) => this._breedController.getAll());
	}
}
