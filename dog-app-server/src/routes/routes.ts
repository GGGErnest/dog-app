import express from 'express';
import { BreedsRoutes } from './breeds-routes';

const breedsRouter = new BreedsRoutes();
export const routes = express.Router();

routes.use('/breeds', breedsRouter.router)

