export interface ServerResponse<Type> {
  result: Type[];
  error?: string;
}
