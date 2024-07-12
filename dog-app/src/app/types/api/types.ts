export interface ServerResponse<Type> {
  result: Type;
  error?: string;
}

export type GetAllReturValue<Type> = {
  data: Type[] | null,
  total: number
}

