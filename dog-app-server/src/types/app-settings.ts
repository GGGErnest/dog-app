export const Settings = {
	port: parseInt(process.env.PORT ?? '300'),
	defaultPaginationSize: parseInt(process.env.DEFAULT_PAGINATION_SIZE ?? '10'),
	defaultSortDir: process.env.DEFAULT_SORT_DIR ?? 'desc',
	cache: {
		expiresAfterMin: parseInt(process.env.CACHE_EXPIRES_AFTER_MINUTES ?? '10'),
		limit: parseInt(process.env.CACHE_LIMIT ?? '200'),
		cleaningFrequencyMs: parseInt(process.env.CACHE_CLEANING_FREQUENCY_MS ?? '1000'),
		oldItemsThresholdHours: parseInt(process.env.CACHE_OLD_ITEMS_THRESHOLD_HOURS ?? '2')
	}
}
