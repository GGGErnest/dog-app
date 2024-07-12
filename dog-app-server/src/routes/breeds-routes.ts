import { Express, Request, Response } from 'express';
import { BreedController } from '../controllers/breeds-controller';

const breedController = new BreedController();

export function registerBreedRoutes(app: Express): void {
	app.get('/breeds/list/all', (req: Request, res: Response) =>
		breedController.getAll(req, res)
	);
	app.get('/breeds/detail/:id', (req: Request, res: Response) => breedController.get(req, res));
}
