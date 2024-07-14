import express from 'express';
import { BreedsRoutes } from './breeds-routes';

const breedsRouter = new BreedsRoutes();
export const routes = express.Router();

routes.use(breedsRouter.baseUrl, breedsRouter.router)

