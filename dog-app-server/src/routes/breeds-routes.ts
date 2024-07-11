import express, { Request, Response, Router } from 'express';
import { BreedController } from '../controllers/breeds-controller';

export class BreedRoutes {
	private readonly _baseUrl = '/breeds';
	private readonly _breedController = new BreedController();

	constructor(public router: Router = express.Router()) {
		this._registerRoutes();
	}

	private _registerRoutes(): void {
		this.router.get(`${this._baseUrl}/list/all`, (req: Request, res: Response) => this._breedController.getAll(req, res));
		this.router.get(`${this._baseUrl}/detail/:id`, (req: Request, res: Response) => this._breedController.get(req, res));
	}
}
