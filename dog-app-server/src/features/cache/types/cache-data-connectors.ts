export type SortDir = 'asc' | 'desc';
export type DataConnectorAction = object | string;

export interface DataConnector {
  read(action: object | string): Promise<unknown | undefined>;
}
