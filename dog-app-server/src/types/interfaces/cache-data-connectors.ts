import { CacheKey } from './cache';

export interface CacheDataConnector<Type> {
  /*
   * @return In case of undefined then the cache won't be updated
   */
  retrive(cacheKey: CacheKey): Promise<Type[] | undefined>;
}
