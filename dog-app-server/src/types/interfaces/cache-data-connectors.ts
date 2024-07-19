import { SortDir } from '../data';

export interface DataConnector {
  getRange(start: number, end: number, sort: string, sortDir: SortDir): Promise<unknown | undefined>;

  getSingle(id: string): Promise<unknown | undefined>;
}
