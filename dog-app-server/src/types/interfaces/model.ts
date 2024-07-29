export interface AllValue<Type> {
  data: Type[],
  total: number
}

export interface Model<Type> {
  allWithPagination(page: number, pageSize: number, sort: string, sortDir: string): Promise<AllValue<Type>>;
  get(id: string): Promise<Type | null>;
}

export const EMPTY_ALL_VALUE = { data: [], total: 0 };
export const EMPTY_GET_VALUE = null;
