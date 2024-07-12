import { Express } from 'express';
import { registerBreedRoutes } from './breeds-routes';


export function registerRoutes(app: Express): void {
	app.all('/', function (req, res, next) {
		console.log('We got a request')
		next();
	});
	registerBreedRoutes(app)
}
