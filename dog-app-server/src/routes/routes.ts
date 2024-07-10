import { BreedRoutes } from './breeds-routes';
import express, { Router } from 'express';
const breedsRouter = new BreedRoutes();

export const router: Router = express.Router();

router.use(breedsRouter.router)
