import { DataConnectorAction } from '../../features/cache';
import { Breed } from '../breed';
import { SortDir } from '../data';

export type RetrieveRange = {
  sort: keyof Breed,
  sortDir: SortDir,
  start: number;
  end: number;
};

export type RetrieveSingle = {
  id: string;
};

export function isDataConnectorRangeAction(action: DataConnectorAction): action is RetrieveRange {
	return typeof action !== 'string' && 'start' in action && 'end' in action;
}

export function isDataConnectorSingleAction(action: DataConnectorAction): action is RetrieveSingle {
	return typeof action !== 'string' && 'id' in action;
}


export type AllBreedsResponse = {
  message: {
    [key: string]: string[]
  }
  status: string;
};

export type AllSubBreedsResponse = {
  message: string[]
  status: string;
}

export type SubbreedImagesResponse = {
  message: string[],
  status: string,
}


