import { Request, Response } from 'express';

export interface Controller {
  getAll(req: Request, resp: Response): void;
  get(req: Request, resp: Response): void;
}
