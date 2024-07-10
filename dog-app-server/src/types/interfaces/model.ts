export interface Model<Type> {
  getAll(page: number, pageSize: number): Type[];
  get(id: string): Type;
}
