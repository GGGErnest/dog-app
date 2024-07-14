import { Request, Response } from 'express';
import { BreedModel } from '../models/breed-model';
import { Controller } from '../types/interfaces/controler';
import { Settings } from '../types/app-settings';
import { ServerResponse } from '../types/interfaces/response';
import { Breed } from '../types/breed';
import { GetAllReturValue } from '../types/interfaces/model';
import { SortDir } from '../types/data';

export class BreedController implements Controller {
  private readonly _breedModel = new BreedModel();
  private readonly _defaultPaginationSize = Settings.defaultPaginationSize;
  private readonly _defaultPage = 1;
  private readonly _defaultSortDirection: SortDir = 'desc';

  public async getAll(req: Request, resp: Response): Promise<void> {
    const page = req.query.page ? parseInt(req.query.page.toString()) : this._defaultPage;
    const pageSize = req.query.size ? parseInt(req.query.size.toString()) : this._defaultPaginationSize;
    const sort = req.query.sort ? req.query.sort.toString() : '';
    const sortDir = req.query.sortDir ? req.query.sortDir as SortDir : this._defaultSortDirection;
    const result = await this._breedModel.allWithPagination(page, pageSize, sort, sortDir);

    console.log('Breeds getAll', req.query);
    console.log('Breeds All endpoint hit:', result)

    const response: ServerResponse<GetAllReturValue<Breed>> = {
      result: result
    }

    resp.send(response).status(200)
  }

  public async get(req: Request, resp: Response): Promise<void> {
    const breedId = req.params.id;

    if (breedId === null) {
      resp.send({ result: [], error: 'Wrong breed id' }).status(400)
    }

    const result = await this._breedModel.get(breedId);
    const response: ServerResponse<Breed> = {
      result
    }

    resp.send(response).status(200)

  }

}
