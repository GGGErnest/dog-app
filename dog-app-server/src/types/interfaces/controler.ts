import { SortDir } from '../data';
import { AllValue } from './model';

export interface Controller<Type> {
  findAllWithPagination(page: number, pageSize: number, sort: string, sortDir: SortDir): Promise<AllValue<Type> | null>;
  getById(id: string): Promise<Type | null>;
}
