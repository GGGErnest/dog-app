export interface ServerResponse<Type> {
  result: Type | null;
  error?: string;
}
