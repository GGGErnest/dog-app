import { SortDir } from '../data';
import { GetAllReturValue } from './model';

export interface Controller<Type> {
  findAllWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<GetAllReturValue<Type> | null>;
  getById(id: string): Promise<Type | null>;
}
