export const Settings = {
	apiVersion: process.env.API_VERSION ?? 'v1',
	port: parseInt(process.env.PORT ?? '300'),
	defaultPaginationSize: parseInt(process.env.DEFAULT_PAGINATION_SIZE ?? '10'),
	cacheExpiresAfterMinutes: parseInt(process.env.CACHE_EXPIRES_AFTER_MINUTES ?? '10'),
	cacheLimit: parseInt(process.env.CACHE_LIMIT ?? '200'),
	cacheCleaningFrequency: parseInt(process.env.CACHE_CLEANING_FREQUENCY ?? '1000')
}