export interface Model<Type> {
  getAll(page: number, pageSize: number): Promise<Type[]>;
  get(id: string): Promise<Type[]>;
}
