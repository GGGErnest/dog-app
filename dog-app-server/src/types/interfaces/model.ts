export type GetAllReturValue<Type> = {
  data: Type[],
  total: number
}

export interface Model<Type> {
  getRange(page: number, pageSize: number, sort: string, sortDir: string): Promise<GetAllReturValue<Type>>;
  get(id: string): Promise<Type | null>;
}
