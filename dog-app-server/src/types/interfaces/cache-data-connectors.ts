export interface CacheDataConnector<Type> {
  retrive(amountOfItems: number): Promise<Type[]>;
}
