import { BreedController } from '../controllers/breeds-controller';
import { Routes } from '../types/routes';
import { Express } from 'express';

export class BreedRoutes implements Routes {

	private breedController = new BreedController();

	constructor(private app: Express) {
		this.register();
	}

	register(): void {
		throw new Error('Method not implemented.');
	}

}
